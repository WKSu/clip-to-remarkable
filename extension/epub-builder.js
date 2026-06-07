/*
 * epub-builder.js — assemble a valid EPUB 3 from an already-cleaned article.
 *
 * Dependency-free: includes a tiny STORE-method ZIP writer (no compression,
 * no eval, no third-party libraries) so the add-on ships no minified code.
 * Works in Node (require) and the browser (global EpubBuilder). Returns a
 * Uint8Array of the .epub bytes.
 *
 * Input: { title, author, lang, identifier, bodyXhtml, images:[{href,mediaType,data}] }
 *   data: Uint8Array | Buffer
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.EpubBuilder = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var enc = new TextEncoder();
  function bytesOf(x) { return typeof x === "string" ? enc.encode(x) : new Uint8Array(x); }

  // ---- CRC-32 ----------------------------------------------------------
  var CRC = (function () {
    var t = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(b) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  // ---- minimal ZIP (all entries STORED, i.e. uncompressed) -------------
  function le(arr, n, bytes) { for (var i = 0; i < bytes; i++) { arr.push(n & 0xFF); n >>>= 8; } }
  function zip(files) {
    var local = [];      // byte arrays for local headers + data
    var central = [];
    var offset = 0;
    files.forEach(function (f) {
      var name = enc.encode(f.name);
      var data = bytesOf(f.data);
      var crc = crc32(data);
      var h = [];
      le(h, 0x04034b50, 4); le(h, 20, 2); le(h, 0, 2); le(h, 0, 2);  // sig, ver, flags, method(0=store)
      le(h, 0, 2); le(h, 0, 2);                                       // time, date
      le(h, crc, 4); le(h, data.length, 4); le(h, data.length, 4);   // crc, comp size, uncomp size
      le(h, name.length, 2); le(h, 0, 2);                            // name len, extra len
      var hb = new Uint8Array(h);
      local.push(hb, name, data);
      var c = [];
      le(c, 0x02014b50, 4); le(c, 20, 2); le(c, 20, 2); le(c, 0, 2); le(c, 0, 2);
      le(c, 0, 2); le(c, 0, 2);
      le(c, crc, 4); le(c, data.length, 4); le(c, data.length, 4);
      le(c, name.length, 2); le(c, 0, 2); le(c, 0, 2);
      le(c, 0, 2); le(c, 0, 2); le(c, 0, 4); le(c, offset, 4);
      central.push(new Uint8Array(c), name);
      offset += hb.length + name.length + data.length;
    });
    var cdStart = offset;
    var cdSize = central.reduce(function (s, a) { return s + a.length; }, 0);
    var e = [];
    le(e, 0x06054b50, 4); le(e, 0, 2); le(e, 0, 2);
    le(e, files.length, 2); le(e, files.length, 2);
    le(e, cdSize, 4); le(e, cdStart, 4); le(e, 0, 2);
    var parts = local.concat(central, [new Uint8Array(e)]);
    var total = parts.reduce(function (s, a) { return s + a.length; }, 0);
    var out = new Uint8Array(total), p = 0;
    parts.forEach(function (a) { out.set(a, p); p += a.length; });
    return out;
  }

  // ---- EPUB assembly ---------------------------------------------------
  function xmlEscape(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function isoUtcNoMs(d) { return new Date(d || Date.now()).toISOString().replace(/\.\d+Z$/, "Z"); }
  function uuid() {
    return "urn:uuid:xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0; return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  var CONTAINER =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">\n' +
    '  <rootfiles>\n    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>\n  </rootfiles>\n</container>\n';

  function opf(meta, images) {
    var items = [
      '<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>',
      '<item id="content" href="content.xhtml" media-type="application/xhtml+xml"/>',
    ];
    images.forEach(function (img, i) {
      items.push('<item id="img' + (i + 1) + '" href="' + xmlEscape(img.href) + '" media-type="' + xmlEscape(img.mediaType) + '"/>');
    });
    var creator = meta.author ? '    <dc:creator>' + xmlEscape(meta.author) + '</dc:creator>\n' : '';
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="' + xmlEscape(meta.lang) + '">\n' +
      '  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n' +
      '    <dc:identifier id="bookid">' + xmlEscape(meta.identifier) + '</dc:identifier>\n' +
      '    <dc:title>' + xmlEscape(meta.title) + '</dc:title>\n' +
      '    <dc:language>' + xmlEscape(meta.lang) + '</dc:language>\n' + creator +
      '    <meta property="dcterms:modified">' + meta.modified + '</meta>\n' +
      '  </metadata>\n  <manifest>\n    ' + items.join("\n    ") + '\n  </manifest>\n' +
      '  <spine>\n    <itemref idref="content"/>\n  </spine>\n</package>\n';
  }
  function navXhtml(meta) {
    return '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="' + xmlEscape(meta.lang) + '" xml:lang="' + xmlEscape(meta.lang) + '">\n' +
      '<head><meta charset="utf-8"/><title>' + xmlEscape(meta.title) + '</title></head>\n<body>\n' +
      '  <nav epub:type="toc" id="toc"><h1>Contents</h1><ol><li><a href="content.xhtml">' + xmlEscape(meta.title) + '</a></li></ol></nav>\n</body>\n</html>\n';
  }
  function contentXhtml(meta, body) {
    var byline = meta.author ? '<p class="byline">' + xmlEscape(meta.author) + '</p>\n' : '';
    return '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="' + xmlEscape(meta.lang) + '" xml:lang="' + xmlEscape(meta.lang) + '">\n' +
      '<head>\n  <meta charset="utf-8"/>\n  <title>' + xmlEscape(meta.title) + '</title>\n' +
      '  <style>img{max-width:100%;height:auto;} .byline{color:#555;font-style:italic;}</style>\n</head>\n<body>\n' +
      '  <h1>' + xmlEscape(meta.title) + '</h1>\n' + byline + body + '\n</body>\n</html>\n';
  }

  function build(input) {
    var meta = {
      title: input.title || "Untitled",
      author: input.author || "",
      lang: input.lang || "en",
      identifier: input.identifier || uuid(),
      modified: isoUtcNoMs(input.published),
    };
    var images = input.images || [];
    var files = [
      { name: "mimetype", data: "application/epub+zip" },   // MUST be first; STORED
      { name: "META-INF/container.xml", data: CONTAINER },
      { name: "OEBPS/content.opf", data: opf(meta, images) },
      { name: "OEBPS/nav.xhtml", data: navXhtml(meta) },
      { name: "OEBPS/content.xhtml", data: contentXhtml(meta, input.bodyXhtml || "") },
    ];
    images.forEach(function (img) { files.push({ name: "OEBPS/" + img.href, data: img.data }); });
    return Promise.resolve(zip(files));
  }

  return { build: build, _xmlEscape: xmlEscape, _zip: zip, _crc32: crc32 };
});
