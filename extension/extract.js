/*
 * extract.js — runs IN THE PAGE via scripting.executeScript.
 * Readability.js must already be injected so `Readability` is global.
 *
 * Returns: { ok, title, author, lang, bodyXhtml, images:[{href,candidates[],dataUrl?}], error? }
 *
 * Strategy
 *  1. Discover candidate images via document-position analysis:
 *     isSizeableContentImg + isClutter heuristics, restricted to the smallest
 *     DOM subtree (LCA) spanning the article title and last body paragraph.
 *  2. Tag each candidate; clone the document; neutralise each tagged <img>
 *     src to a stable marker ("data-clip:ID") so Readability preserves the
 *     surrounding figure/picture structure with its exact DOM position.
 *  3. Run Readability on the neutralised clone.
 *  4. Rehydrate: replace marker srcs with provisional EPUB-internal paths and
 *     restore alt / figcaption text.
 *  5. Prepend any lead/hero images that precede the article body and were
 *     therefore not captured by Readability's content extraction.
 *  6. Also scan <template> content for SSR images (e.g. NYT/React pages).
 *  7. Sanitise the resulting XHTML for EPUB validity.
 */

function extractArticle() {
  try {
    var norm = function (t) { return (t || "").replace(/\s+/g, " ").trim(); };
    var key120 = function (t) { return norm(t).slice(0, 120); };

    // ── 1. Live-DOM currentSrc lookup (resolves lazy-loaded images) ───────
    var liveBySrc = new Map();
    for (var li = 0; li < document.images.length; li++) {
      var lim = document.images[li], real = lim.currentSrc || lim.src;
      if (!real) continue;
      ["src", "data-src", "data-original", "data-lazy-src", "srcset", "data-srcset"].forEach(function (a) {
        var v = lim.getAttribute && lim.getAttribute(a); if (v) liveBySrc.set(v, real);
      });
    }

    // ── 2. Discover candidate images from the ORIGINAL page ───────────────

    // Build a position index over every element
    var allEls = document.querySelectorAll("*");
    var pos = new Map();
    for (var pi = 0; pi < allEls.length; pi++) pos.set(allEls[pi], pi);
    var P = function (el) { return pos.has(el) ? pos.get(el) : -1; };

    // Run Readability on a plain clone to obtain the article text
    var article = new Readability(document.cloneNode(true)).parse();
    if (!article || !article.content) {
      return { ok: false, error: "Readability could not find an article on this page." };
    }

    // Match Readability's paragraphs back to elements in the live DOM to
    // determine the article's start / end positions and its container scope.
    var sampleDom = new DOMParser().parseFromString(article.content, "text/html");
    var outParaSet = {};
    sampleDom.querySelectorAll("p").forEach(function (p) {
      var t = key120(p.textContent); if (t.length > 25) outParaSet[t] = 1;
    });
    var origPs = document.querySelectorAll("p");
    var paraPositions = [], matchedParaEls = [];
    var lastParaEl = null, lastParaP = -1, firstParaEl = null, firstParaP = Infinity;
    for (var j = 0; j < origPs.length; j++) {
      var t = key120(origPs[j].textContent);
      if (t && outParaSet[t]) {
        var pp = P(origPs[j]); if (pp < 0) continue;
        paraPositions.push(pp); matchedParaEls.push(origPs[j]);
        if (pp > lastParaP) { lastParaP = pp; lastParaEl = origPs[j]; }
        if (pp < firstParaP) { firstParaP = pp; firstParaEl = origPs[j]; }
      }
    }
    // CSS-in-JS apps (e.g. archive.ph captures) render all text in <div> elements.
    // When no <p> elements matched, fall back to leaf-div matching for scope detection.
    if (matchedParaEls.length === 0) {
      var divEls = document.querySelectorAll("div,section,li");
      for (var di = 0; di < divEls.length; di++) {
        var dEl = divEls[di];
        if (dEl.children.length > 2) continue; // skip container divs
        var dt = key120(dEl.textContent);
        if (!dt || !outParaSet[dt]) continue;
        var dp = P(dEl); if (dp < 0) continue;
        paraPositions.push(dp); matchedParaEls.push(dEl);
        if (dp > lastParaP) { lastParaP = dp; lastParaEl = dEl; }
        if (dp < firstParaP) { firstParaP = dp; firstParaEl = dEl; }
      }
    }
    paraPositions.sort(function (a, b) { return a - b; });
    var firstPos = paraPositions.length ? paraPositions[0] : 0;
    var lastPos  = paraPositions.length ? paraPositions[paraPositions.length - 1] : (allEls.length - 1);

    // Locate the article title heading
    var titleEl = firstParaEl;
    var wantTitle = key120(article.title || "");
    var heads = document.querySelectorAll("h1,h2"), bestTitle = -1;
    for (var hi = 0; hi < heads.length; hi++) {
      var ht = key120(heads[hi].textContent); if (!ht) continue;
      var hp = P(heads[hi]);
      if (hp <= firstPos && (ht === wantTitle || (wantTitle && (wantTitle.indexOf(ht) === 0 || ht.indexOf(wantTitle) === 0)))) {
        if (hp > bestTitle) { bestTitle = hp; titleEl = heads[hi]; }
      }
    }

    // Smallest DOM subtree that contains the title and the last body paragraph
    function lca(a, b) {
      if (!a || !b) return null;
      var anc = new Set(), e = a; while (e) { anc.add(e); e = e.parentElement; }
      e = b; while (e) { if (anc.has(e)) return e; e = e.parentElement; }
      return null;
    }
    var scope = lca(titleEl, lastParaEl) || lca(firstParaEl, lastParaEl) || document.body;
    var bodyContainer = matchedParaEls.reduce(function (acc, el) { return acc ? lca(acc, el) : el; }, null) || scope;

    // Detect rendered math (KaTeX / MathJax / MathML) before image discovery
    // so math-internal <img>s (e.g. Wikipedia's MathML fallback images) are
    // not registered as ordinary photos.
    var mathData = detectMathNodes(scope, bodyContainer, lastPos, P);

    // Collect every sizeable, non-clutter image within the article scope.
    // Template images (SSR pages like NYT) are collected but NOT tagged in the
    // live DOM since they live in a detached DocumentFragment.
    var imageData = new Map(); // id → { provisionalHref, candidates, alt, caption, dataUrl, elPos }
    var seenAsset = {}, counter = 0;

    function registerImage(img, posVal, canTag, lenient) {
      // Template images (lenient=true) skip the full size heuristic since they
      // live in a DocumentFragment and lack reliable width/srcset attributes.
      if (lenient ? (isClutter(img) || sizesIndicatesSmall(img)) : (isClutter(img) || !isSizeableContentImg(img))) return;
      var c = collectCandidates(img, liveBySrc);
      if (!c.candidates.length && !c.dataUrl) return;
      var mainUrl = c.candidates[0] || "";
      if (urlInferredWidth(mainUrl) > 0 && urlInferredWidth(mainUrl) < 300) return;
      var k = assetKey(c.candidates[0] || c.dataUrl);
      if (k && seenAsset[k]) return; if (k) seenAsset[k] = 1;
      var id = "CLIP_IMG_" + (counter++);
      var fig = img.closest && img.closest("figure");
      imageData.set(id, {
        provisionalHref: "images/" + id + "." + extFor(c.candidates, c.dataUrl),
        candidates: c.candidates,
        alt: img.getAttribute("alt") || "",
        caption: (fig && fig.querySelector("figcaption") || { textContent: "" }).textContent.trim(),
        dataUrl: c.dataUrl,
        elPos: posVal,
      });
      if (canTag) img.setAttribute("data-clip-id", id);
    }

    var imgs = document.querySelectorAll("img");
    for (var ii = 0; ii < imgs.length; ii++) {
      var img0 = imgs[ii], ip = P(img0);
      if (!scope.contains(img0)) continue;
      if (img0.closest && img0.closest("[data-clip-math-id],[data-clip-math-rm]")) continue;
      if (ip > lastPos && !(bodyContainer && bodyContainer.contains(img0) && (ip - lastPos) <= 24)) continue;
      registerImage(img0, ip, true);
    }
    // Scan <template> content for SSR images (NYT / React pages)
    var tpls = document.querySelectorAll("template");
    for (var ti = 0; ti < tpls.length; ti++) {
      var T = tpls[ti], tp = P(T);
      if (!scope.contains(T)) continue;
      if (tp > lastPos && !(bodyContainer && bodyContainer.contains(T) && (tp - lastPos) <= 24)) continue;
      var frag = T.content; if (!frag) continue;
      var timgs = frag.querySelectorAll("img");
      for (var tk = 0; tk < timgs.length; tk++) {
        registerImage(timgs[tk], tp, false, true); // lenient: no width/srcset needed
      }
    }

    // ── 3. Clone & neutralise tagged image sources ────────────────────────
    var clone = document.cloneNode(true);

    // Swap each tagged <img> src for a stable marker so Readability preserves
    // the surrounding figure/picture structure at its exact DOM position.
    clone.querySelectorAll("[data-clip-id]").forEach(function (el) {
      el.setAttribute("src", "data-clip:" + el.getAttribute("data-clip-id"));
      el.removeAttribute("srcset");
      el.removeAttribute("data-srcset");
      el.removeAttribute("sizes");
    });

    // Text inside replaced math nodes (TeX fallback text, KaTeX's duplicated
    // MathML+HTML serialisation) legitimately disappears from the marker pass;
    // it must be discounted when judging whether that pass degraded. On
    // math-heavy pages (e.g. Zhihu) this text can be >80% of the article.
    var mathTextLen = 0;
    document.querySelectorAll("[data-clip-math-id]").forEach(function (el) {
      mathTextLen += el.textContent.length;
    });

    // Swap each tagged math node for a marker <img> so Readability treats it
    // like an inline image. The math class is re-applied at rehydration —
    // Readability strips class attributes.
    clone.querySelectorAll("[data-clip-math-id]").forEach(function (el) {
      var mid = el.getAttribute("data-clip-math-id");
      var mdata = mathData.get(mid);
      if (!mdata || !el.parentNode) { el.removeAttribute("data-clip-math-id"); return; }
      var mimg = clone.createElement("img");
      mimg.setAttribute("src", "data-clip:" + mid);
      if (mdata.alt) mimg.setAttribute("alt", mdata.alt);
      el.parentNode.replaceChild(mimg, el);
    });
    // Drop leftover renderer nodes (MathJax v2 previews / source scripts)
    clone.querySelectorAll("[data-clip-math-rm]").forEach(function (el) { el.remove(); });

    // Remove live-DOM markers immediately
    document.querySelectorAll("[data-clip-id],[data-clip-math-id],[data-clip-math-rm]").forEach(function (el) {
      el.removeAttribute("data-clip-id");
      el.removeAttribute("data-clip-math-id");
      el.removeAttribute("data-clip-math-rm");
    });

    // ── 4. Run Readability on the neutralised clone ───────────────────────
    var article2 = new Readability(clone).parse();
    if (!article2 || !article2.content) {
      article2 = article;
    } else {
      // Neutralising images occasionally degrades Readability's scoring (e.g. on
      // image-heavy magazine articles). Fall back to the plain pass so the full
      // text is preserved; images will still be placed via the fallback mechanism.
      var rawLen1 = article.content.replace(/<[^>]+>/g, "").length;
      var rawLen2 = article2.content.replace(/<[^>]+>/g, "").length;
      if (rawLen2 < (rawLen1 - mathTextLen) * 0.5) article2 = article;
    }

    // ── 5. Rehydrate in-body images ───────────────────────────────────────
    var doc = new DOMParser().parseFromString(
      "<!DOCTYPE html><html><body>" + article2.content + "</body></html>", "text/html"
    );

    var inBodyIds = new Set(), inBodyMathIds = new Set();

    doc.querySelectorAll('img[src^="data-clip:"]').forEach(function (img) {
      var id = img.getAttribute("src").replace("data-clip:", "");

      if (id.indexOf("CLIP_MATH_") === 0) {
        var mdata = mathData.get(id);
        if (!mdata) { img.remove(); return; }
        img.setAttribute("src", mdata.provisionalHref);
        if (mdata.alt) img.setAttribute("alt", mdata.alt);
        img.setAttribute("class", mdata.display ? "math-display" : "math-inline");
        inBodyMathIds.add(id);
        return;
      }

      var data = imageData.get(id);
      if (!data) { (img.closest("figure") || img).remove(); return; }

      img.setAttribute("src", data.provisionalHref);
      if (data.alt) img.setAttribute("alt", data.alt);
      inBodyIds.add(id);

      // Add figcaption when there's a real caption not already present
      var fig = img.closest("figure");
      if (data.caption && fig && !fig.querySelector("figcaption")) {
        var cap = doc.createElement("figcaption");
        cap.textContent = data.caption;
        fig.appendChild(cap);
      }
    });

    // ── 6. Place images not captured by Readability ───────────────────────
    // • Leads (elPos < firstPos): hero/header images above article text
    // • In-body fallbacks (within article span): images Readability filtered
    //   out (low-scoring containers, <noscript> embeds, etc.) — placed at
    //   the proportionally equivalent position in the Readability body
    // • Template images (SSR): treated the same as leads/fallbacks above
    var leads = [], inBodyFallbacks = [];
    imageData.forEach(function (data, id) {
      if (inBodyIds.has(id)) return;
      if (data.elPos < firstPos) {
        leads.push(data);
      } else if (data.elPos <= lastPos || (bodyContainer && (data.elPos - lastPos) <= 24)) {
        inBodyFallbacks.push(data);
      }
    });
    // Unplaced display math re-enters via the same fallback flow. Inline math
    // whose sentence Readability dropped is not re-inserted standalone.
    mathData.forEach(function (data, id) {
      if (inBodyMathIds.has(id) || !data.display) return;
      if (data.elPos >= firstPos && (data.elPos <= lastPos || (bodyContainer && (data.elPos - lastPos) <= 24))) {
        inBodyFallbacks.push(data);
      }
    });
    leads.sort(function (a, b) { return a.elPos - b.elPos; });
    inBodyFallbacks.sort(function (a, b) { return a.elPos - b.elPos; });

    // Prepend leads in document order (advance insertRef after each insertion)
    var leadInsertRef = doc.body.firstChild;
    leads.forEach(function (data) {
      var figure = buildFigure(doc, data);
      doc.body.insertBefore(figure, leadInsertRef);
      leadInsertRef = figure.nextSibling;
    });

    // Insert in-body fallbacks at proportional positions in the Readability body
    var bodyBlocks = doc.body.querySelectorAll("p,h1,h2,h3,h4,h5,h6,figure,blockquote");
    var blockCount = bodyBlocks.length;
    inBodyFallbacks.forEach(function (data) {
      var figure = buildFigure(doc, data);
      if (blockCount === 0) {
        doc.body.appendChild(figure);
      } else {
        var relPos = (data.elPos - firstPos) / Math.max(1, lastPos - firstPos);
        var anchor = bodyBlocks[Math.min(Math.floor(relPos * blockCount), blockCount - 1)];
        anchor.parentNode.insertBefore(figure, anchor.nextSibling);
      }
    });

    // ── 7. Sanitise for EPUB XHTML ────────────────────────────────────────
    // Strip elements that are not valid EPUB content flow.
    doc.querySelectorAll(
      "script,style,link,meta,noscript,template,iframe,object,embed," +
      "audio,video,source,track,canvas,svg,form,input,button,select,textarea," +
      "nav,footer"
    ).forEach(function (n) { n.remove(); });

    // Remove any surviving non-article images (not rehydrated from our set).
    doc.querySelectorAll('img:not([src^="images/"])').forEach(function (n) { n.remove(); });

    // Only math placeholders may keep a class; site classes on photos are noise.
    doc.querySelectorAll("img[class]").forEach(function (el) {
      var mc = el.getAttribute("class");
      if (mc !== "math-inline" && mc !== "math-display") el.removeAttribute("class");
    });

    // Attribute whitelist: only keep what EPUB needs.
    var ATTR_OK = {
      IMG: { src: 1, alt: 1, class: 1 }, A: { href: 1 },
      TD: { colspan: 1, rowspan: 1 }, TH: { colspan: 1, rowspan: 1 },
      OL: { start: 1, type: 1 }, COL: { span: 1 }, COLGROUP: { span: 1 },
    };
    doc.querySelectorAll("*").forEach(function (el) {
      var ok = ATTR_OK[el.tagName] || {};
      var names = [];
      for (var a = 0; a < el.attributes.length; a++) names.push(el.attributes[a].name);
      names.forEach(function (nm) {
        if (nm === "lang" || nm === "dir" || nm === "title") return;
        if (!ok[nm]) el.removeAttribute(nm);
      });
      // Drop intra-page and javascript: links
      if (el.tagName === "A") {
        var h = el.getAttribute("href");
        if (!h || h.charAt(0) === "#" || /^javascript:/i.test(h)) el.removeAttribute("href");
      }
    });

    // Unwrap block elements erroneously nested inside phrasing content
    var PHRASING = { A:1,SPAN:1,STRONG:1,EM:1,B:1,I:1,SUP:1,SUB:1,SMALL:1,CODE:1,LABEL:1,CITE:1,Q:1,MARK:1,ABBR:1,U:1,S:1 };
    var hasPhrasingAncestor = function (el) {
      var p = el.parentElement; while (p) { if (PHRASING[p.tagName]) return true; p = p.parentElement; } return false;
    };
    var unwrap = function (el) {
      var p = el.parentNode; while (el.firstChild) p.insertBefore(el.firstChild, el); p.removeChild(el);
    };
    var BLOCK_IN_P = "p,div,section,figure,figcaption,ol,ul,blockquote,table,hr,h1,h2,h3,h4,h5,h6";
    for (var g = 0; g < 6; g++) {
      var bad = [];
      doc.querySelectorAll("div,section,figure,figcaption,ol,ul,p,blockquote,table,hr").forEach(function (el) {
        if (hasPhrasingAncestor(el)) bad.push(el);
      });
      doc.querySelectorAll("p").forEach(function (p) { if (p.querySelector(BLOCK_IN_P)) bad.push(p); });
      if (!bad.length) break;
      bad.forEach(function (el) { if (el.parentNode) unwrap(el); });
    }

    // Remove elements emptied by the sanitisation passes
    for (var ep = 0; ep < 4; ep++) {
      var gone = 0;
      doc.querySelectorAll(
        "p,div,span,figure,figcaption,section,blockquote,li,ul,ol," +
        "h1,h2,h3,h4,h5,h6,small,strong,em,b,i,sup,sub,time,q,cite,mark"
      ).forEach(function (el) {
        if (!el.querySelector("img") && !el.textContent.trim()) { el.remove(); gone++; }
      });
      if (!gone) break;
    }

    // Build usedImages from the sanitised body so the list exactly matches
    // what is actually referenced in bodyXhtml (no images that sanitisation
    // removed, no duplicates from abnormal DOM structure).
    var hrefToData = new Map();
    imageData.forEach(function (data) { hrefToData.set(data.provisionalHref, data); });
    var mathByHref = new Map();
    mathData.forEach(function (data) { mathByHref.set(data.provisionalHref, data); });
    var usedImages = [], seenUsedHref = {};
    doc.querySelectorAll('img[src^="images/"]').forEach(function (img) {
      var src = img.getAttribute("src");
      if (seenUsedHref[src]) return;
      var data = hrefToData.get(src);
      if (data) {
        seenUsedHref[src] = 1;
        usedImages.push({
          href: data.provisionalHref,
          candidates: data.candidates,
          ...(data.dataUrl ? { dataUrl: data.dataUrl } : {}),
        });
        return;
      }
      var mdata = mathByHref.get(src);
      if (mdata) {
        seenUsedHref[src] = 1;
        usedImages.push({
          href: mdata.provisionalHref,
          candidates: [],
          alt: mdata.alt,
          math: { tex: mdata.tex, mml: mdata.mml, svgText: mdata.svgText, display: mdata.display },
        });
      }
    });

    return {
      ok: true,
      title: article.title || document.title || "Untitled",
      author: (article.byline || "").trim(),
      lang: document.documentElement.lang || "en",
      bodyXhtml: toXhtmlBody(doc.body.innerHTML),
      images: usedImages,
    };
  } catch (e) {
    return { ok: false, error: String((e && e.message) || e) };
  }
}

// ── Image-URL helpers ─────────────────────────────────────────────────────

function srcsetCandidates(s) {
  var tk = s.trim().split(/\s+/).filter(Boolean), out = [];
  for (var i = 0; i < tk.length; i++) {
    var url = tk[i].replace(/,+$/, ""), w = 0, nx = tk[i + 1];
    if (nx && /^[\d.]+[wx],?$/.test(nx)) { w = nx.indexOf("w") !== -1 ? parseInt(nx, 10) : parseFloat(nx) * 1000; i++; }
    if (url) out.push({ url: url, w: w });
  }
  out.sort(function (a, b) { return b.w - a.w; });
  return out.map(function (c) { return c.url; });
}

function absolutize(u) {
  if (!u) return null;
  if (u.indexOf("data:") === 0) return u;
  try { return new URL(u, document.baseURI).href; } catch (e) { return null; }
}

function looksPlaceholder(u) {
  return /^data:image\/(gif|png|svg\+xml);base64,[a-z0-9+/]{0,60}=*$/i.test(u) ||
    /(placeholder|blank|spacer|1x1|transparent|pixel)\b/i.test(u);
}

function collectCandidates(img, liveBySrc) {
  var raw = [], push = function (a) { var v = img.getAttribute(a); if (v) raw.push(v); };
  push("data-src"); push("data-original"); push("data-lazy-src");
  var ds = img.getAttribute("data-srcset"); if (ds) raw = raw.concat(srcsetCandidates(ds));
  var ss = img.getAttribute("srcset"); if (ss) raw = raw.concat(srcsetCandidates(ss));
  push("src");
  // Prefer any live currentSrc we recorded for this attribute value
  raw.slice().forEach(function (v) { if (liveBySrc && liveBySrc.has(v)) raw.unshift(liveBySrc.get(v)); });
  var seen = {}, cand = [], dataUrl = null;
  for (var i = 0; i < raw.length; i++) {
    var r = raw[i]; if (looksPlaceholder(r)) continue;
    var abs = absolutize(r); if (!abs || seen[abs]) continue; seen[abs] = 1;
    if (abs.indexOf("data:") === 0) { if (!dataUrl) dataUrl = abs; } else cand.push(abs);
  }
  return { candidates: cand, dataUrl: dataUrl };
}

function extFor(c, d) {
  var p = c[0] || d || "", m = /\.([a-z0-9]{2,4})(?:[?#&]|$)/i.exec(p);
  if (m) { var e = m[1].toLowerCase(); if (/^(png|jpg|jpeg|gif|webp|svg|avif)$/.test(e)) return e; }
  if (d && d.indexOf("data:image/") === 0) return d.slice(11).split(";")[0] || "jpg";
  return "jpg";
}

// Unwrap a proxy URL (Netlify Image CDN, Cloudinary fetch, ?url= patterns) to
// the underlying asset URL, so the deduplication key is stable across CDN variants.
function underlying(u) {
  var fx = u.indexOf("/image/fetch/");
  if (fx !== -1) { var a = u.slice(fx + 13), sl = a.indexOf("/"); return sl !== -1 ? decodeURIComponent(a.slice(sl + 1)) : a; }
  var m = /[?&]url=([^&]+)/i.exec(u); if (m) { try { return decodeURIComponent(m[1]); } catch (e) { return m[1]; } }
  return u;
}

function assetKey(u) {
  if (!u) return "";
  try {
    var s = underlying(u).split("#")[0];
    try { var x = new URL(s, document.baseURI); return (x.host + x.pathname).toLowerCase(); }
    catch (e) { return s.split("?")[0].toLowerCase(); }
  } catch (e) { return u; }
}

// Parse CDN width hints from query params (e.g. ?width=264 or ?w=300).
function urlInferredWidth(url) {
  if (!url) return 0;
  var m = /[?&](?:width|w)=(\d+)/i.exec(url);
  return m ? parseInt(m[1], 10) : 0;
}

// ── Content / clutter classification ─────────────────────────────────────

var CLUTTER_RE = /recirc|\brelated\b|\bmore[-_ ]?in\b|read[-_ ]?next|editor.?s.?pick|\bcta\b|magazine-cta|\bpromo\b|paywall|subscribe(?![a-z])|subscription[-_ ]?(widget|box)|newsletter[-_ ]?(signup|form|widget|cta|prompt)|share[-_ ]?(tools|bar|buttons?)|social[-_ ]?(tools|share|bar)|post-ufi|comments?[-_ ]?(page|count)|\bauthor\b|byline|\bavatar\b|\bmasthead\b|\blogo\b|\bcover\b|recommend|footer|\bnav\b/;

function isClutter(el) {
  while (el && el.nodeType === 1) {
    var tag = el.tagName;
    if (tag === "BODY" || tag === "HTML") break;
    if (tag === "ASIDE" || tag === "NAV" || tag === "FOOTER" || tag === "FORM") return true;
    if (el.getAttribute) {
      var hay = ((el.getAttribute("class") || "") + " " + (el.getAttribute("data-testid") || "") + " " +
        (el.getAttribute("data-component-name") || "") + " " + (el.getAttribute("aria-label") || "")).toLowerCase();
      if (CLUTTER_RE.test(hay)) return true;
    }
    el = el.parentElement;
  }
  return false;
}

function sizesIndicatesSmall(img) {
  var s = img.getAttribute("sizes"); if (!s) return false;
  var big = false, maxPx = 0, m, re = /([\d.]+)(vw|px)/gi;
  while ((m = re.exec(s))) {
    var v = parseFloat(m[1]);
    if (/vw/i.test(m[2])) { if (v >= 33) big = true; } else if (v > maxPx) maxPx = v;
  }
  if (big || maxPx >= 360) return false;
  return maxPx > 0 && maxPx <= 320;
}

function isSizeableContentImg(img) {
  var cls = (img.getAttribute("class") || "");
  if (/object-fit-cover/i.test(cls)) return false;
  if (sizesIndicatesSmall(img)) return false;
  var wAttr = img.getAttribute("width") || "";
  var pct = /%\s*$/.test(wAttr) ? parseFloat(wAttr) : null;
  if (pct !== null && pct >= 80) return true;       // full-width embed / chart
  var w = pct === null ? (parseInt(wAttr, 10) || 0) : 0;
  if (w && w < 300) return false;                   // small = icon / avatar / thumb
  if (img.closest && (img.closest("figure") || img.closest(".captioned-image-container") || img.closest("picture"))) return true;
  if (w >= 400) return true;
  if (/sizing-(normal|large|full)|\bsize-(?:full|large|medium-large)\b/.test(cls)) return true;
  if (img.getAttribute("srcset") || img.getAttribute("data-srcset")) return true;
  return false;
}

// ── XHTML serialisation ───────────────────────────────────────────────────
// innerHTML gives HTML5 syntax; EPUB 3 requires well-formed XML.
// Void elements must be self-closed and &nbsp; is not a valid XML entity.
function toXhtmlBody(html) {
  return html
    .replace(/<(br|hr|img|col|source|wbr)(\s[^>]*)?\/?>/gi,
             function(_, t, a) { return '<' + t + (a || '') + '/>'; })
    .replace(/&nbsp;/g, '&#160;');
}

// ── DOM helpers ───────────────────────────────────────────────────────────

function buildFigure(doc, data) {
  var figure = doc.createElement("figure");
  var img = doc.createElement("img");
  img.setAttribute("src", data.provisionalHref);
  if (data.alt) img.setAttribute("alt", data.alt);
  figure.appendChild(img);
  if (data.caption) {
    var cap = doc.createElement("figcaption");
    cap.textContent = data.caption;
    figure.appendChild(cap);
  }
  return figure;
}

// ── Math detection (KaTeX / MathJax / MathML) ─────────────────────────────
// Finds rendered math within the article scope, extracts the best renderable
// source (TeX > MathML > rendered SVG), and tags each node with
// data-clip-math-id so the clone step can swap it for a marker <img> that
// rides the image pipeline (background.js rasterises the math to PNG).
// Identical formulas share one id and are rendered once.

// Serialise a page-rendered MathJax <svg> so it renders standalone: ensure
// namespaces and inline the glyph <defs> from the page-level font cache
// (fontCache:"global") when the svg references it.
function standaloneMathSvg(svg) {
  var c = svg.cloneNode(true);
  if (!c.getAttribute("xmlns")) c.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  if (!c.getAttribute("xmlns:xlink")) c.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  if (c.querySelector("use") && !c.querySelector("defs")) {
    var cache = document.getElementById("MJX-SVG-global-cache");
    var defs = cache && cache.querySelector("defs");
    if (defs) c.insertBefore(defs.cloneNode(true), c.firstChild);
  }
  return c.outerHTML;
}

// TeX-as-image endpoints: WordPress.com (latex.php?latex=), Zhihu
// (equation?tex=), CodeCogs (png|svg|gif.latex?).
var TEX_IMG_RE = /\/latex\.php\?[^"']*latex=|[?&]tex=|\/(?:png|svg|gif)\.latex\?/;

function texFromImgUrl(src) {
  var m = /\/latex\.php\?[^"']*?latex=([^&]+)/.exec(src) ||
          /[?&]tex=([^&]+)/.exec(src) ||
          /\/(?:png|svg|gif)\.latex\?(.+)$/.exec(src);
  if (!m) return "";
  try { return decodeURIComponent(m[1].replace(/\+/g, " ")); } catch (e) { return ""; }
}

// WordPress prefixes display equations with \displaystyle; Zhihu's editor
// marks block formulas with a trailing \\.
function texLooksDisplay(tex) {
  return /^\s*\\displaystyle/.test(tex) || /\\\\\s*$/.test(tex);
}

function detectMathNodes(scope, bodyContainer, lastPos, P) {
  var mathData = new Map(); // id → {provisionalHref,tex,mml,svgText,display,alt,elPos}
  var byKey = {}, counter = 0;

  function inScope(el) {
    if (!scope.contains(el)) return false;
    var p = P(el);
    if (p < 0) return false;
    return !(p > lastPos && !(bodyContainer && bodyContainer.contains(el) && (p - lastPos) <= 24));
  }

  function register(el, src, display, alt) {
    if (el.hasAttribute("data-clip-math-id")) return;
    var source = src.tex || src.mml || src.svgText || "";
    if (!source.trim()) return;
    var key = source + "|" + (display ? 1 : 0);
    var id = byKey[key];
    if (!id) {
      id = "CLIP_MATH_" + (counter++);
      byKey[key] = id;
      mathData.set(id, {
        provisionalHref: "images/" + id + ".png",
        tex: src.tex || null,
        mml: src.mml || null,
        svgText: src.svgText || null,
        display: !!display,
        alt: (alt || "").replace(/\s+/g, " ").trim().slice(0, 500),
        elPos: P(el),
      });
    }
    el.setAttribute("data-clip-math-id", id);
  }

  // KaTeX: the TeX source ships in the hidden MathML annotation.
  document.querySelectorAll(".katex").forEach(function (k) {
    var target = (k.closest && k.closest(".katex-display")) || k;
    if (target.hasAttribute("data-clip-math-id") || !inScope(target)) return;
    var display = target !== k;
    var ann = k.querySelector('annotation[encoding="application/x-tex"]');
    var mml = k.querySelector(".katex-mathml math");
    if (ann && ann.textContent.trim()) register(target, { tex: ann.textContent }, display, ann.textContent);
    else if (mml) register(target, { mml: mml.outerHTML }, display, mml.getAttribute("alttext") || k.textContent);
  });

  // MathJax v3: prefer the assistive MathML; fall back to the rendered SVG.
  document.querySelectorAll("mjx-container").forEach(function (c) {
    if (c.hasAttribute("data-clip-math-id") || !inScope(c)) return;
    var display = c.getAttribute("display") === "true";
    var mml = c.querySelector("mjx-assistive-mml math");
    if (mml) { register(c, { mml: mml.outerHTML }, display, mml.getAttribute("alttext") || ""); return; }
    var svg = c.querySelector("svg");
    if (svg) register(c, { svgText: standaloneMathSvg(svg) }, display, svg.getAttribute("aria-label") || "");
  });

  // MathJax v2: the TeX source lives in a <script type="math/tex"> whose
  // rendered output (and optional preview) are the preceding siblings.
  document.querySelectorAll('script[type^="math/tex"]').forEach(function (s) {
    var tex = s.textContent || "";
    if (!tex.trim()) return;
    var display = /mode\s*=\s*display/.test(s.getAttribute("type") || "");
    var rendered = null, prev = s.previousElementSibling, hops = 0;
    while (prev && hops < 3) {
      var cls = typeof prev.className === "string" ? prev.className : "";
      if (/(^|\s)MathJax_Preview(\s|$)/.test(cls)) prev.setAttribute("data-clip-math-rm", "1");
      else if (/(^|\s)MathJax(_Display|_SVG|_SVG_Display|_CHTML|_MathML)?(\s|$)/.test(cls)) rendered = prev;
      else break;
      prev = prev.previousElementSibling; hops++;
    }
    var target = rendered || s;
    if (target.hasAttribute("data-clip-math-id") || !inScope(target)) return;
    if (rendered) s.setAttribute("data-clip-math-rm", "1");
    register(target, { tex: tex }, display, tex);
  });

  // Zhihu-style wrappers (.ztext-math / data-tex): the TeX rides in an
  // attribute; the wrapper may contain a rendered equation <img>, the raw TeX
  // as fallback text, or both — replacing the whole wrapper removes the
  // duplicated code text next to the formula.
  document.querySelectorAll(".ztext-math,[data-tex]").forEach(function (el) {
    if (el.hasAttribute("data-clip-math-id") || !inScope(el)) return;
    var tex = el.getAttribute("data-tex") || "";
    if (!tex.trim()) {
      var im = el.querySelector("img");
      if (im) tex = im.getAttribute("alt") || texFromImgUrl(im.getAttribute("src") || "");
    }
    if (!tex.trim()) return;
    // Zhihu marks block formulas with data-eeimg="2" (styled display:block).
    var display = el.getAttribute("data-eeimg") === "2" || texLooksDisplay(tex);
    register(el, { tex: tex }, display, tex);
  });

  // TeX-rendered-as-image services (WordPress.com latex.php, Zhihu equation,
  // CodeCogs): the TeX travels in the alt attribute and/or the URL. These
  // rasters are re-rendered because they dedup-collapse by URL path (all
  // formulas share one path, so only the first used to survive) and their
  // fixed-zoom bitmaps scale badly on-device.
  document.querySelectorAll("img").forEach(function (im) {
    if (im.closest("[data-clip-math-id],[data-clip-math-rm]")) return;
    var src = im.getAttribute("src") || "";
    if (!TEX_IMG_RE.test(src) || !inScope(im)) return;
    var tex = im.getAttribute("alt") || texFromImgUrl(src);
    if (!tex.trim()) return;
    register(im, { tex: tex }, texLooksDisplay(tex), tex);
  });

  // Raw MathML (Wikipedia native math, arXiv HTML, publishers). Skip <math>
  // inside containers already handled above.
  document.querySelectorAll("math").forEach(function (m) {
    if (m.closest(".katex,mjx-container,.MathJax,.MathJax_Display,.MathJax_SVG,.MathJax_MathML,[data-clip-math-id]")) return;
    // Wikipedia wraps math (plus a hidden fallback image) in .mwe-math-element;
    // replace the whole wrapper so the fallback goes with it.
    var target = (m.closest && m.closest(".mwe-math-element")) || m;
    if (target.hasAttribute("data-clip-math-id") || !inScope(target)) return;
    var display = m.getAttribute("display") === "block" || m.getAttribute("mode") === "display" ||
      !!(m.closest && m.closest(".mwe-math-display"));
    register(target, { mml: m.outerHTML }, display, m.getAttribute("alttext") || m.textContent);
  });

  return mathData;
}
