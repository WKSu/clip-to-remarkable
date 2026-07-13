// Bundle entry for MathJax v3 (TeX / MathML → standalone SVG strings).
// Bundled with esbuild into extension/mathjax-bundle.js — see BUILD.md.
//
// Uses the LiteDOM adaptor so conversion never touches the real DOM; the
// returned SVG is a self-contained string (fontCache:"local" inlines every
// glyph path) suitable for rasterising via <img> in the background page.
import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { MathML } from "mathjax-full/js/input/mathml.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

// One document per input format; each gets its own SVG output jax because the
// output jax keeps per-document font-cache state.
const texDoc = mathjax.document("", {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: "local" }),
});
const mmlDoc = mathjax.document("", {
  InputJax: new MathML(),
  OutputJax: new SVG({ fontCache: "local" }),
});

function exValue(svg, re) {
  const m = re.exec(svg);
  return m ? parseFloat(m[1]) : 0;
}

function convert(doc, source, display) {
  const node = doc.convert(source, {
    display: !!display,
    em: 16,
    ex: 8,
    containerWidth: 80 * 16,
  });
  const html = adaptor.outerHTML(node);
  const err = /data-mjx-error="([^"]*)"/.exec(html);
  if (err) throw new Error("math render error: " + err[1]);
  const m = /<svg[\s\S]*<\/svg>/.exec(html);
  if (!m) throw new Error("no svg in MathJax output");
  const svg = m[0];
  return {
    svg,
    widthEx: exValue(svg, /width="([\d.]+)ex"/),
    heightEx: exValue(svg, /height="([\d.]+)ex"/),
    verticalAlignEx: exValue(svg, /vertical-align:\s*(-?[\d.]+)ex/),
  };
}

globalThis.MathRender = {
  texToSvg(tex, display) {
    return convert(texDoc, String(tex), display);
  },
  mmlToSvg(mml) {
    return convert(mmlDoc, String(mml), /display\s*=\s*["']block["']/.test(mml));
  },
};
