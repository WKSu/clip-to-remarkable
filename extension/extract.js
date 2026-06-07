/*
 * extract.js — runs IN THE PAGE via scripting.executeScript.
 * Readability.js must already be injected so `Readability` is global.
 *
 * Returns: { ok, title, author, lang, bodyXhtml, images:[{href,candidates[],dataUrl?}], error? }
 *
 * Strategy
 *  - Readability gives the clean TEXT body + the article's title/byline and a
 *    set of sample paragraphs used to locate the article in the page.
 *  - IMAGES are chosen independently, by DOCUMENT POSITION: every sizeable
 *    content image between the article title and the last body paragraph is
 *    kept (this captures the lead/hero image, which sits above the body, and
 *    every in-body figure), while images after the body (related / "more in"
 *    / recirculation) and site chrome are excluded. Promo/cover/avatar
 *    containers are filtered by class. Images are then placed back into the
 *    text body in document order (lead at the top; others after the nearest
 *    preceding block).
 */
function extractArticle() {
  try {
    var article = new Readability(document.cloneNode(true)).parse();
    if (!article || !article.content) {
      return { ok: false, error: "Readability could not find an article on this page." };
    }
    var norm = function (t) { return (t || "").replace(/\s+/g, " ").trim(); };
    var key120 = function (t) { return norm(t).slice(0, 120); };

    // ---- live currentSrc lookup (for lazy images) ------------------------
    var liveBySrc = new Map();
    for (var i = 0; i < document.images.length; i++) {
      var lim = document.images[i], real = lim.currentSrc || lim.src;
      if (!real) continue;
      ["src", "data-src", "data-original", "data-lazy-src", "srcset", "data-srcset"].forEach(function (a) {
        var v = lim.getAttribute && lim.getAttribute(a); if (v) liveBySrc.set(v, real);
      });
    }

    // ---- image-url helpers ----------------------------------------------
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
    function absolutize(u) { if (!u) return null; if (u.indexOf("data:") === 0) return u; try { return new URL(u, document.baseURI).href; } catch (e) { return null; } }
    function looksPlaceholder(u) {
      return /^data:image\/(gif|png|svg\+xml);base64,[a-z0-9+/]{0,60}=*$/i.test(u) ||
        /(placeholder|blank|spacer|1x1|transparent|pixel)\b/i.test(u);
    }
    function collectCandidates(img) {
      var raw = [], push = function (a) { var v = img.getAttribute(a); if (v) raw.push(v); };
      push("data-src"); push("data-original"); push("data-lazy-src");
      var ds = img.getAttribute("data-srcset"); if (ds) raw = raw.concat(srcsetCandidates(ds));
      var ss = img.getAttribute("srcset"); if (ss) raw = raw.concat(srcsetCandidates(ss));
      push("src");
      raw.slice().forEach(function (v) { if (liveBySrc.has(v)) raw.unshift(liveBySrc.get(v)); });
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
    function underlying(u) {
      var s = u, fx = s.indexOf("/image/fetch/");
      if (fx !== -1) { var a = s.slice(fx + 13), sl = a.indexOf("/"); return sl !== -1 ? decodeURIComponent(a.slice(sl + 1)) : a; }
      var m = /[?&]url=([^&]+)/i.exec(s); if (m) { try { return decodeURIComponent(m[1]); } catch (e) { return m[1]; } }
      return s;
    }
    function assetKey(u) {
      if (!u) return "";
      try { var s = underlying(u).split("#")[0]; try { var x = new URL(s, document.baseURI); return (x.host + x.pathname).toLowerCase(); } catch (e) { return s.split("?")[0].toLowerCase(); } } catch (e) { return u; }
    }

    // ---- clutter / content classification --------------------------------
    var CLUTTER_RE = /recirc|\brelated\b|\bmore[-_ ]?in\b|read[-_ ]?next|editor.?s.?pick|\bcta\b|magazine-cta|\bpromo\b|paywall|subscribe(?![a-z])|subscription[-_ ]?(widget|box)|newsletter[-_ ]?(signup|form|widget|cta|prompt)|share[-_ ]?(tools|bar|buttons?)|social[-_ ]?(tools|share|bar)|post-ufi|comments?[-_ ]?(page|count)|\bauthor\b|byline|\bavatar\b|\bmasthead\b|\blogo\b|\bcover\b|recommend|footer|\bnav\b/;
    function isClutter(el) {
      while (el && el.nodeType === 1) {
        var tag = el.tagName;
        if (tag === "BODY" || tag === "HTML") break;             // page-level classes aren't clutter containers
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
      var s = img.getAttribute("sizes"); if (!s) return false;     // unknown -> don't exclude
      var big = false, maxPx = 0, m, re = /([\d.]+)(vw|px)/gi;
      while ((m = re.exec(s))) { var v = parseFloat(m[1]); if (/vw/i.test(m[2])) { if (v >= 33) big = true; } else if (v > maxPx) maxPx = v; }
      if (big || maxPx >= 360) return false;
      return maxPx > 0 && maxPx <= 320;                            // only ever rendered small => thumbnail/alt crop
    }
    function isSizeableContentImg(img) {
      var cls = (img.getAttribute("class") || "");
      if (/object-fit-cover/i.test(cls)) return false;
      if (sizesIndicatesSmall(img)) return false;                  // small rendered size => thumbnail / art-direction alt
      var wAttr = img.getAttribute("width") || "";
      var pct = /%\s*$/.test(wAttr) ? parseFloat(wAttr) : null;
      if (pct !== null && pct >= 80) return true;                  // full-width embed / chart (e.g. width="100%")
      var w = pct === null ? (parseInt(wAttr, 10) || 0) : 0;
      if (w && w < 300) return false;                          // small = icon/avatar/thumb
      if (img.closest("figure") || img.closest(".captioned-image-container") || img.closest("picture")) return true;
      if (w >= 400) return true;
      if (/sizing-(normal|large|full)/.test(cls)) return true;
      if (img.getAttribute("srcset") || img.getAttribute("data-srcset")) return true;  // responsive => likely content
      return false;
    }

    // ---- document-order index over the ORIGINAL page ---------------------
    var allEls = document.querySelectorAll("*");
    var pos = new Map();
    for (var pi = 0; pi < allEls.length; pi++) pos.set(allEls[pi], pi);
    var P = function (el) { return pos.has(el) ? pos.get(el) : -1; };

    // Locate the article's paragraph span + title.
    var sampleDom = new DOMParser().parseFromString(article.content, "text/html");
    var outParaSet = {};
    sampleDom.querySelectorAll("p").forEach(function (p) { var t = key120(p.textContent); if (t.length > 25) outParaSet[t] = 1; });
    var origPs = document.querySelectorAll("p");
    var paraPositions = [];
    var matchedParaEls = [];
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
    paraPositions.sort(function (a, b) { return a - b; });

    var firstPos = paraPositions.length ? paraPositions[0] : 0;
    var lastPos = paraPositions.length ? paraPositions[paraPositions.length - 1] : (allEls.length - 1);

    // Title position: the heading whose text matches Readability's title.
    var titlePos = firstPos, titleEl = firstParaEl;
    var wantTitle = key120(article.title || "");
    var heads = document.querySelectorAll("h1,h2");
    var bestTitle = -1;
    for (var hi = 0; hi < heads.length; hi++) {
      var ht = key120(heads[hi].textContent); if (!ht) continue;
      var hp = P(heads[hi]);
      if (hp <= firstPos && (ht === wantTitle || (wantTitle && (wantTitle.indexOf(ht) === 0 || ht.indexOf(wantTitle) === 0)))) {
        if (hp > bestTitle) { bestTitle = hp; titleEl = heads[hi]; }
      }
    }
    if (bestTitle >= 0) titlePos = bestTitle;

    // Container scope = smallest subtree containing the title and the last
    // body paragraph. The hero (above the title) lives inside it; trailing
    // related/recirc modules are excluded by position (> lastPos) and site
    // chrome by not being inside this subtree.
    function lca(a, b) {
      if (!a || !b) return null;
      var anc = new Set(); var e = a; while (e) { anc.add(e); e = e.parentElement; }
      e = b; while (e) { if (anc.has(e)) return e; e = e.parentElement; }
      return null;
    }
    var scope = lca(titleEl, lastParaEl) || lca(firstParaEl, lastParaEl) || document.body;
    var bodyContainer = matchedParaEls.reduce(function (acc, el) { return acc ? lca(acc, el) : el; }, null) || scope;

    // ---- choose images by position, in document order --------------------
    var desired = [];
    var seenAsset = {};
    var imgs = document.querySelectorAll("img");
    for (var ii = 0; ii < imgs.length; ii++) {
      var img = imgs[ii], p = P(img);
      if (!scope.contains(img)) continue;                                  // outside the article subtree
      if (p > lastPos && !(bodyContainer && bodyContainer.contains(img) && (p - lastPos) <= 24)) continue;  // closing in-body figure only
      if (isClutter(img) || !isSizeableContentImg(img)) continue;
      var c = collectCandidates(img);
      if (!c.candidates.length && !c.dataUrl) continue;
      var k = assetKey(c.candidates[0] || c.dataUrl);
      if (k && seenAsset[k]) continue; if (k) seenAsset[k] = 1;
      desired.push({ p: p, lead: p < firstPos, candidates: c.candidates, dataUrl: c.dataUrl,
        alt: img.getAttribute("alt") || "", el: img });
    }
    desired.sort(function (a, b) { return a.p - b.p; });

    // Hydration templates (e.g. React lead media on NYT) hold real content
    // images that aren't in the pre-hydration DOM. The live extension runs
    // after hydration and sees them directly; for completeness we also scan
    // <template> content within the article scope, with the same filters.
    var tpls = document.querySelectorAll("template");
    for (var ti = 0; ti < tpls.length; ti++) {
      var T = tpls[ti], tp = P(T);
      if (!scope.contains(T)) continue;
      if (tp > lastPos && !(bodyContainer && bodyContainer.contains(T) && (tp - lastPos) <= 24)) continue;
      var frag = T.content; if (!frag) continue;
      var timgs = frag.querySelectorAll("img");
      for (var tk2 = 0; tk2 < timgs.length; tk2++) {
        var tg = timgs[tk2];
        if (isClutter(tg) || sizesIndicatesSmall(tg)) continue;
        var tc = collectCandidates(tg);
        var tcu = tc.candidates[0] || tc.dataUrl; if (!tcu) continue;
        var tkey = assetKey(tcu);
        if (tkey && seenAsset[tkey]) continue; if (tkey) seenAsset[tkey] = 1;
        desired.push({ p: tp, lead: tp < firstPos, candidates: tc.candidates, dataUrl: tc.dataUrl, alt: tg.getAttribute("alt") || "", el: T });
      }
    }
    desired.sort(function (a, b) { return a.p - b.p; });

    // ---- build body: Readability text, images stripped then re-placed ----
    var dom = sampleDom;
    dom.querySelectorAll("img,picture,source").forEach(function (n) { n.remove(); });

    var BLOCK = "p,li,h1,h2,h3,h4,h5,h6,blockquote,figcaption";
    var outBlocks = {};
    dom.querySelectorAll(BLOCK).forEach(function (b) { var t = key120(b.textContent); if (t && !(t in outBlocks)) outBlocks[t] = b; });
    var topLevel = function (el) { while (el.parentElement && el.parentElement !== dom.body) el = el.parentElement; return el; };
    function anchorChain(node) {
      var out = [], el = node, steps = 0;
      while (el && steps < 80) {
        var pe = el.previousElementSibling;
        while (pe && steps < 80) {
          steps++;
          if (pe.matches && pe.matches(BLOCK) && pe.textContent.trim()) out.push(key120(pe.textContent));
          else if (pe.querySelectorAll) { var inner = pe.querySelectorAll(BLOCK); if (inner.length) { var last = inner[inner.length - 1]; if (last.textContent.trim()) out.push(key120(last.textContent)); } }
          pe = pe.previousElementSibling;
        }
        el = el.parentElement;
      }
      return out;
    }

    var images = [];
    var n = 0;
    var leadInsertRef = null;       // chains lead images at the very top, in order
    var lastFor = {};
    desired.forEach(function (d) {
      n += 1;
      var href = "images/img" + n + "." + extFor(d.candidates, d.dataUrl);
      var entry = { href: href, candidates: d.candidates };
      if (d.dataUrl) entry.dataUrl = d.dataUrl;
      images.push(entry);
      var nimg = dom.createElement("img");
      nimg.setAttribute("src", href);
      if (d.alt) nimg.setAttribute("alt", d.alt);

      if (d.lead) {
        if (leadInsertRef && leadInsertRef.parentNode) { leadInsertRef.parentNode.insertBefore(nimg, leadInsertRef.nextSibling); }
        else { dom.body.insertBefore(nimg, dom.body.firstChild); }
        leadInsertRef = nimg;
        return;
      }
      var chain = anchorChain(d.el), anchor = null, block = null;
      for (var ci = 0; ci < chain.length; ci++) { if (outBlocks[chain[ci]]) { anchor = chain[ci]; block = outBlocks[anchor]; break; } }
      if (block && block.parentNode) {
        var ref = lastFor[anchor] || topLevel(block);
        ref.parentNode.insertBefore(nimg, ref.nextSibling);
        lastFor[anchor] = nimg;
      } else {
        // no surviving anchor: place after the title region (keep, don't lose)
        if (leadInsertRef && leadInsertRef.parentNode) leadInsertRef.parentNode.insertBefore(nimg, leadInsertRef.nextSibling);
        else dom.body.insertBefore(nimg, dom.body.firstChild);
        leadInsertRef = nimg;
      }
    });

    // ---- sanitize for valid XHTML ----------------------------------------
    // Drop elements that aren't valid EPUB content flow or pull in remote
    // resources (media, embeds, scripts, leftover lazy markup).
    dom.querySelectorAll("script,style,link,meta,noscript,template,iframe,object,embed,audio,video,source,track,canvas,svg,form,input,button,select,textarea,nav,footer,aside").forEach(function (n) { n.remove(); });

    // Attribute whitelist: strip everything that isn't needed, which removes
    // framework/custom attrs (props-*, shadowrootmode, orientation, role,
    // aria-*, data-*, style, id, class) that the EPUB grammar rejects.
    var ATTR_OK = {
      IMG: { src: 1, alt: 1 }, A: { href: 1 }, TD: { colspan: 1, rowspan: 1 },
      TH: { colspan: 1, rowspan: 1 }, OL: { start: 1, type: 1 }, COL: { span: 1 }, COLGROUP: { span: 1 }
    };
    dom.querySelectorAll("*").forEach(function (el) {
      var ok = ATTR_OK[el.tagName] || {};
      var names = [];
      for (var a = 0; a < el.attributes.length; a++) names.push(el.attributes[a].name);
      names.forEach(function (nm) {
        if (nm === "lang" || nm === "dir" || nm === "title" || nm === "colspan" || nm === "rowspan") return;
        if (!ok[nm]) el.removeAttribute(nm);
      });
      // intra-document fragment links have no target here -> drop the href
      if (el.tagName === "A") { var h = el.getAttribute("href"); if (!h || h.charAt(0) === "#" || /^javascript:/i.test(h)) el.removeAttribute("href"); }
    });

    dom.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(function (h) { h.textContent = h.textContent.replace(/\s+/g, " ").trim(); });
    dom.querySelectorAll("a").forEach(function (a) { var im = a.querySelector("img"); if (im && !a.textContent.trim()) a.replaceWith(im); });
    var PHRASING = { A:1,SPAN:1,STRONG:1,EM:1,B:1,I:1,SUP:1,SUB:1,SMALL:1,CODE:1,LABEL:1,CITE:1,Q:1,MARK:1,ABBR:1,U:1,S:1 };
    var hasPhrasingAncestor = function (el) { var p = el.parentElement; while (p) { if (PHRASING[p.tagName]) return true; p = p.parentElement; } return false; };
    var unwrap = function (el) { var p = el.parentNode; while (el.firstChild) p.insertBefore(el.firstChild, el); p.removeChild(el); };
    var BLOCK_IN_P = "p,div,section,figure,figcaption,ol,ul,blockquote,table,hr,h1,h2,h3,h4,h5,h6";
    for (var g = 0; g < 6; g++) {
      var bad = [];
      dom.querySelectorAll("div,section,figure,figcaption,ol,ul,p,blockquote,table,hr").forEach(function (el) { if (hasPhrasingAncestor(el)) bad.push(el); });
      // a <p> may only contain phrasing content: unwrap any <p> holding block children
      dom.querySelectorAll("p").forEach(function (p) { if (p.querySelector(BLOCK_IN_P)) bad.push(p); });
      if (!bad.length) break;
      bad.forEach(function (el) { if (el.parentNode) unwrap(el); });
    }

    // drop empty elements left behind after stripping media/clutter (e.g. an
    // emptied <p> inside a <figure>, which would misplace the <figcaption>)
    for (var ep = 0; ep < 4; ep++) {
      var gone = 0;
      dom.querySelectorAll("p,div,span,figure,figcaption,section,blockquote,li,ul,ol,h1,h2,h3,h4,h5,h6,small,strong,em,b,i,sup,sub,time,q,cite,mark").forEach(function (el) {
        if (!el.querySelector("img") && !el.textContent.trim()) { el.remove(); gone++; }
      });
      if (!gone) break;
    }

    var bodyXhtml = new XMLSerializer().serializeToString(dom.body).replace(/^<body[^>]*>/, "").replace(/<\/body>$/, "");
    return {
      ok: true,
      title: article.title || document.title || "Untitled",
      author: (article.byline || "").trim(),
      lang: document.documentElement.lang || "en",
      bodyXhtml: bodyXhtml,
      images: images,
    };
  } catch (e) {
    return { ok: false, error: String((e && e.message) || e) };
  }
}
