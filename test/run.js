#!/usr/bin/env node
/*
 * Image-extraction evaluation harness.
 *
 * Runs extension/extract.js (with Mozilla Readability) against saved article
 * HTML under test/fixtures/ in a jsdom DOM, and checks:
 *
 *   1. EXTRACT — the number of images the extractor returns against the
 *      expected counts in test/cases.json.
 *   2. PIPELINE — that every extracted image survives the downstream
 *      background.js body-rewrite and ends up referenced in the built EPUB.
 *      It builds a real EPUB (EpubBuilder) from the extracted images, unzips
 *      OEBPS/content.xhtml + content.opf, and asserts:
 *        - content.xhtml parses as well-formed XML, and
 *        - distinct <img src="images/…"> in content.xhtml
 *            == image items in the OPF manifest
 *            == the extracted image count.
 *      This guards against a logic drop between "extracted" and "packed"
 *      (the class of bug that left only one image visible on reMarkable).
 *      Image fetching and webp→png transcoding need a browser and are verified
 *      on-device, not here.
 *
 * Extend it by dropping a new <name>.htm into test/fixtures/ and adding a
 * { "file", "url", "images" } entry to test/cases.json.
 *
 * Fixtures are gitignored on purpose: they are copyrighted article pages, so
 * they live locally rather than in the public repo. Synthetic fixtures written
 * for this repo (math-synthetic.htm) are committed via .gitignore negations.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
let JSDOM, EpubBuilder, XmlDOMParser;
try {
  ({ JSDOM } = require("jsdom"));
  EpubBuilder = require("../extension/epub-builder.js");
  ({ DOMParser: XmlDOMParser } = require("@xmldom/xmldom"));
} catch (e) {
  console.error("Please `npm install` first (jsdom / @xmldom/xmldom are dependencies).");
  process.exit(2);
}

const ROOT = path.join(__dirname, "..");
const READABILITY = fs.readFileSync(path.join(ROOT, "extension", "Readability.js"), "utf-8");
const EXTRACT = fs.readFileSync(path.join(ROOT, "extension", "extract.js"), "utf-8");
const cases = JSON.parse(fs.readFileSync(path.join(__dirname, "cases.json"), "utf-8")).cases;

function extract(file, url) {
  const html = fs.readFileSync(path.join(__dirname, "fixtures", file), "utf-8");
  const dom = new JSDOM(html, { url, runScripts: "outside-only" });
  const ctx = dom.getInternalVMContext();
  vm.runInContext(READABILITY, ctx);
  vm.runInContext(EXTRACT, ctx);
  const r = vm.runInContext("extractArticle()", ctx);
  if (!r || !r.ok) throw new Error(r && r.error || "extract failed");
  return r;
}

// ── Downstream-pipeline helpers (mirror of extension/background.js) ──────────

const EXT_BY_TYPE = {
  "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif",
  "image/webp": "webp", "image/svg+xml": "svg", "image/avif": "avif",
};
const MT_BY_EXT = {
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif",
  webp: "image/webp", svg: "image/svg+xml", avif: "image/avif",
};

function withCorrectExt(href, mediaType) {
  const ext = EXT_BY_TYPE[mediaType];
  return ext ? href.replace(/\.[^.\/]+$/, "." + ext) : href;
}

// Infer a media type from a candidate URL the way materializeImages would
// (without the network). Good enough to exercise the href-rewrite logic.
function mediaTypeFor(img) {
  if (img.math) return "image/png"; // math is rendered to PNG in background.js
  const u = (img.candidates && img.candidates[0]) || img.dataUrl || "";
  if (u.indexOf("data:image/") === 0) return u.slice(5).split(";")[0] || "image/jpeg";
  const m = /\.([a-z0-9]{2,4})(?:[?#&]|$)/i.exec(u);
  return (m && MT_BY_EXT[m[1].toLowerCase()]) || "image/jpeg";
}

// Replicate background.js: materialize (keep all images here), rewrite the body
// to the corrected hrefs, build the EPUB, and read it back.
async function buildEpubFromExtract(r) {
  const materialized = r.images.map((img) => {
    const mediaType = mediaTypeFor(img);
    return { provisionalHref: img.href, href: withCorrectExt(img.href, mediaType), mediaType, data: new Uint8Array([0]) };
  });

  const finalByProvisional = new Map(materialized.map((i) => [i.provisionalHref, i.href]));
  let body = r.bodyXhtml;
  r.images.forEach((i) => {
    const esc = i.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (finalByProvisional.has(i.href)) {
      body = body.replace(new RegExp(esc, "g"), finalByProvisional.get(i.href));
    }
  });

  const bytes = await EpubBuilder.build({
    title: r.title, author: r.author, lang: r.lang, bodyXhtml: body,
    images: materialized.map((i) => ({ href: i.href, mediaType: i.mediaType, data: i.data })),
  });
  return { bytes, materialized };
}

// Minimal reader for the STORE-only zips EpubBuilder produces.
function unzipStore(buf) {
  const out = {};
  const u16 = (o) => buf[o] | (buf[o + 1] << 8);
  const u32 = (o) => (buf[o] | (buf[o + 1] << 8) | (buf[o + 2] << 16) | (buf[o + 3] * 0x1000000)) >>> 0;
  let i = 0;
  while (i + 4 <= buf.length && u32(i) === 0x04034b50) {
    const compSize = u32(i + 18);
    const nameLen = u16(i + 26);
    const extraLen = u16(i + 28);
    const nameStart = i + 30;
    const name = Buffer.from(buf.slice(nameStart, nameStart + nameLen)).toString("utf-8");
    const dataStart = nameStart + nameLen + extraLen;
    out[name] = Buffer.from(buf.slice(dataStart, dataStart + compSize));
    i = dataStart + compSize;
  }
  return out;
}

function assertWellFormed(label, xml) {
  // @xmldom/xmldom throws a ParseError (fatalError) on malformed XML.
  new XmlDOMParser().parseFromString(xml, "text/xml");
}

// Returns { extracted, packed, bodyRefs } or throws on a structural problem.
async function pipelineCheck(r) {
  const { bytes } = await buildEpubFromExtract(r);
  const files = unzipStore(bytes);
  const xhtml = files["OEBPS/content.xhtml"].toString("utf-8");
  const opf = files["OEBPS/content.opf"].toString("utf-8");
  const nav = files["OEBPS/nav.xhtml"].toString("utf-8");

  assertWellFormed("content.xhtml", xhtml);
  assertWellFormed("content.opf", opf);
  assertWellFormed("nav.xhtml", nav);

  const bodyRefs = new Set(
    [...xhtml.matchAll(/<img\b[^>]*\bsrc="(images\/[^"]+)"/g)].map((m) => m[1])
  );
  const packed = new Set(
    [...opf.matchAll(/<item\b[^>]*\bhref="(images\/[^"]+)"[^>]*media-type="image\//g)].map((m) => m[1])
  );

  return { extracted: r.images.length, packed: packed.size, bodyRefs: bodyRefs.size };
}

// ── Run ─────────────────────────────────────────────────────────────────────

(async () => {
  let pass = 0, fail = 0, skipped = 0;
  console.log("Image-extraction + pipeline eval\n");

  for (const c of cases) {
    const fp = path.join(__dirname, "fixtures", c.file);
    if (!fs.existsSync(fp)) {
      console.log(`  SKIP  (missing fixture)  ${c.file}`);
      skipped++; continue;
    }
    let got, ok = true, note = "";
    try {
      const r = extract(c.file, c.url);
      got = r.images.length;
      if (got !== c.images) { ok = false; }

      const urls = r.images.map((i) => (i.candidates[0] || i.dataUrl || "")).join(" ");
      for (const need of (c.requireAssets || [])) if (!urls.includes(need)) { ok = false; note += ` missing:${need}`; }
      for (const bad of (c.forbidAssets || [])) if (urls.includes(bad)) { ok = false; note += ` forbidden:${bad}`; }

      // Math extraction: expected placeholder count, and no renderer markup
      // (KaTeX / MathJax residue) leaking into the body as garbled text.
      if (c.math !== undefined) {
        const gotMath = r.images.filter((i) => i.math).length;
        if (gotMath !== c.math) { ok = false; note += ` math(got=${gotMath} expected=${c.math})`; }
        if (/<mjx-|<math|<annotation|katex-|math\/tex|MathJax_|mwe-math|latex\.php|equation\?tex|ztext-math/i.test(r.bodyXhtml)) { ok = false; note += " math-residue"; }
      }

      // Downstream guard: every extracted image must survive into the EPUB.
      const p = await pipelineCheck(r);
      if (!(p.extracted === p.packed && p.packed === p.bodyRefs)) {
        ok = false;
        note += ` pipeline(extracted=${p.extracted} packed=${p.packed} body=${p.bodyRefs})`;
      }
    } catch (e) { got = "ERR: " + e.message; ok = false; }
    console.log(`  ${ok ? "PASS" : "FAIL"}  got=${got} expected=${c.images}${note}  ${c.file.slice(0, 60)}`);
    ok ? pass++ : fail++;
  }

  console.log(`\n${pass} passed, ${fail} failed${skipped ? ", " + skipped + " skipped" : ""}`);
  process.exit(fail ? 1 : 0);
})();
