/*
 * background.js — Firefox MV3 event page.
 * Loaded after jszip.min.js and epub-builder.js (see manifest background.scripts),
 * so globals JSZip and EpubBuilder are available.
 *
 * Flow on toolbar click:
 *   1. inject Readability.js + extract.js into the active tab
 *   2. run extractArticle() in the page  -> article + image URL list
 *   3. fetch each image here (host_permissions bypass CORS), sniff media-type
 *   4. build a valid EPUB
 *   5. download it (placeholder until the reMarkable upload is wired)
 */
const api = globalThis.browser || globalThis.chrome;

function notify(title, message) {
  try {
    api.notifications.create({
      type: "basic",
      iconUrl: api.runtime.getURL("icons/48.png"),
      title,
      message,
    });
  } catch (_) {
    /* notifications optional */
  }
}

function sniffMediaType(bytes) {
  const b = bytes;
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47)
    return "image/png";
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.length >= 4 && b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38)
    return "image/gif";
  if (
    b.length >= 12 &&
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  )
    return "image/webp";
  // crude SVG/text sniff
  const head = new TextDecoder().decode(b.slice(0, 64)).trimStart();
  if (head.startsWith("<?xml") || head.startsWith("<svg")) return "image/svg+xml";
  return null;
}

function decodeDataUrl(dataUrl) {
  const m = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(dataUrl);
  if (!m) return null;
  const mediaType = m[1] || "application/octet-stream";
  const isB64 = !!m[2];
  const raw = isB64 ? atob(m[3]) : decodeURIComponent(m[3]);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return { mediaType, bytes };
}

const EXT_BY_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

function withCorrectExt(href, mediaType) {
  const ext = EXT_BY_TYPE[mediaType];
  if (!ext) return href;
  return href.replace(/\.[^.\/]+$/, "." + ext);
}

// reMarkable's EPUB renderer only reliably displays these. Modern sites serve
// WebP/AVIF/SVG, which are fetched and packed fine but render BLANK on-device —
// the symptom of "13 images packed, 1 visible". We transcode the rest to PNG.
const RM_SUPPORTED = { "image/jpeg": 1, "image/png": 1, "image/gif": 1 };
const RM_MAX_WIDTH = 1872; // reMarkable Paper Pro panel width; caps EPUB size

// Decode arbitrary image bytes and re-encode as PNG (optionally downscaled).
// Runs in the Firefox background *page*, so createImageBitmap / OffscreenCanvas
// / Image are all available. Throws on failure so the caller can keep the
// original bytes (which still render in ordinary EPUB readers).
async function transcodeToPng(bytes, mediaType) {
  const blob = new Blob([bytes], { type: mediaType });
  let source, w, h, revoke = null;

  if (mediaType === "image/svg+xml") {
    // createImageBitmap is unreliable for SVG in Firefox — decode via <img>.
    const url = URL.createObjectURL(blob);
    revoke = () => URL.revokeObjectURL(url);
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = () => rej(new Error("svg decode failed"));
      img.src = url;
    });
    source = img;
    w = img.naturalWidth || img.width;
    h = img.naturalHeight || img.height;
  } else {
    source = await createImageBitmap(blob);
    w = source.width;
    h = source.height;
  }

  try {
    if (!w || !h) throw new Error("zero-size image");
    let dw = w, dh = h;
    if (dw > RM_MAX_WIDTH) { dh = Math.max(1, Math.round((dh * RM_MAX_WIDTH) / dw)); dw = RM_MAX_WIDTH; }
    const canvas = new OffscreenCanvas(dw, dh);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(source, 0, 0, dw, dh);
    const outBlob = await canvas.convertToBlob({ type: "image/png" });
    return new Uint8Array(await outBlob.arrayBuffer());
  } finally {
    if (source && source.close) source.close();
    if (revoke) revoke();
  }
}

async function materializeImages(imageList) {
  const out = [];
  for (const img of imageList) {
    let bytes = null, mediaType = null;

    // Try each candidate URL in order until one fetches as a real image.
    for (const url of img.candidates || []) {
      try {
        const resp = await fetch(url, { credentials: "include", redirect: "follow" });
        if (!resp.ok) continue;
        const b = new Uint8Array(await resp.arrayBuffer());
        const mt = sniffMediaType(b) || (resp.headers.get("content-type") || "").split(";")[0].trim();
        if (b.length && mt && mt.startsWith("image/")) { bytes = b; mediaType = mt; break; }
      } catch (_) { /* try next candidate */ }
    }

    // Fall back to an inline data: image if we have one.
    if (!bytes && img.dataUrl) {
      const d = decodeDataUrl(img.dataUrl);
      if (d && d.bytes.length) { bytes = d.bytes; mediaType = sniffMediaType(d.bytes) || d.mediaType; }
    }

    if (!bytes || !mediaType) continue;

    // Transcode formats reMarkable can't render to PNG. On failure keep the
    // original bytes rather than dropping the image (still valid in other
    // readers, and no worse than today on-device).
    if (!RM_SUPPORTED[mediaType]) {
      try {
        const png = await transcodeToPng(bytes, mediaType);
        if (png && png.length) { bytes = png; mediaType = "image/png"; }
      } catch (_) { /* keep original bytes */ }
    }

    out.push({ provisionalHref: img.href, href: withCorrectExt(img.href, mediaType), mediaType, data: bytes });
  }
  return out;
}

// Resolve the id of a top-level folder by name, creating it if absent.
async function ensureFolder(rm, name) {
  const items = await rm.listItems();
  const hit = items.find(
    (i) => i.type === "CollectionType" && i.visibleName === name && (i.parent || "") === ""
  );
  if (hit) return hit.id;
  const made = await rm.putFolder(name);
  return made.id;
}

// A freshly web-uploaded doc can take a moment to appear in the sync tree, so
// move() (which looks it up by hash) may miss it on the first try. Retry with a
// forced root-hash refresh before giving up.
async function moveWithRetry(rm, hash, folderId, tries = 3) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try { return await rm.move(hash, folderId, true); }
    catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
  throw lastErr;
}

async function clipActiveTab(tab) {
  if (!tab || !tab.id) return;

  // 1+2: inject Readability and the extractor, then run it.
  await api.scripting.executeScript({ target: { tabId: tab.id }, files: ["Readability.js", "extract.js"] });
  const [{ result }] = await api.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => extractArticle(),
  });

  if (!result || !result.ok) {
    notify("reMarkable clip — failed", (result && result.error) || "Extraction failed.");
    return;
  }

  // 3: fetch and sniff images.
  const images = await materializeImages(result.images || []);

  // Rewrite body refs: corrected href for kept images, remove the rest.
  const finalByProvisional = new Map(images.map((i) => [i.provisionalHref, i.href]));
  let body = result.bodyXhtml;
  (result.images || []).forEach((i) => {
    const esc = i.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (finalByProvisional.has(i.href)) {
      body = body.replace(new RegExp(esc, "g"), finalByProvisional.get(i.href));
    } else {
      // remove the orphaned <img> (and its <figure> wrapper if present)
      body = body.replace(new RegExp('<figure[^>]*>[\\s\\S]*?<img[^>]*src="' + esc + '"[^>]*/?>(?:[\\s\\S]*?)</figure>', "g"), "");
      body = body.replace(new RegExp('<img[^>]*src="' + esc + '"[^>]*/?>','g'), "");
    }
  });

  // Hand the builder the corrected hrefs.
  const epubImages = images.map((i) => ({ href: i.href, mediaType: i.mediaType, data: i.data }));

  // 4: build EPUB (Uint8Array of the .epub bytes).
  const bytes = await EpubBuilder.build({
    title: result.title,
    author: result.author,
    lang: result.lang,
    bodyXhtml: body,
    images: epubImages,
  });

  // 5: upload to reMarkable if paired, else fall back to a download.
  const safe = (result.title || "article").replace(/[^\w\- ]+/g, "").trim().slice(0, 80) || "article";
  const stored = await api.storage.local.get(["deviceToken", "folderName"]);
  const token = stored && stored.deviceToken;
  const folderName = ((stored && stored.folderName) || "Articles").trim();

  if (token) {
    try {
      const rm = await RMAPI.remarkable(token);
      const up = await rm.uploadEpub(result.title || safe, bytes);

      // Relocate into the configured folder (auto-created). If the move fails,
      // the doc still uploaded to the root — never lose the clip.
      let placed = "";
      if (folderName) {
        try {
          const folderId = await ensureFolder(rm, folderName);
          await moveWithRetry(rm, up.hash, folderId);
          placed = ` in "${folderName}"`;
        } catch (_) {
          placed = ` (in root — couldn't reach "${folderName}")`;
        }
      }

      notify("Sent to reMarkable", `"${safe}" uploaded with ${images.length} image(s)${placed}.`);
      return;
    } catch (e) {
      notify("Upload failed — saved instead", String((e && e.message) || e));
      // fall through to download so the work isn't lost
    }
  } else {
    notify("Not paired yet", "Saved an EPUB; open the add-on options to pair with reMarkable.");
    try { await api.runtime.openOptionsPage(); } catch (_) {}
  }

  const url = URL.createObjectURL(new Blob([bytes], { type: "application/epub+zip" }));
  await api.downloads.download({ url, filename: safe + ".epub", saveAs: false });
}

api.action.onClicked.addListener((tab) => {
  clipActiveTab(tab).catch((e) => notify("reMarkable clip — error", String(e)));
});
