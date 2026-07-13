# Build notes

Three files in `extension/` are vendored or generated. All are committed so the
repo loads without a build step; rebuild them with the root `npm run build`.

## Readability.js
The unmodified [@mozilla/readability](https://github.com/mozilla/readability)
library (v0.6.0), copied verbatim:

```
npm run vendor:readability   # cp node_modules/@mozilla/readability/Readability.js extension/
```

## rmapi-bundle.js
A browser IIFE bundle of the public npm package
[`rmapi-js`](https://www.npmjs.com/package/rmapi-js) (v10.1.1), which implements
the reMarkable cloud device-pairing + sync upload protocol. Built with esbuild
(v0.28.0):

```
npm run build:rmapi
# = esbuild build/rmapi-entry.js --bundle --format=iife --platform=browser \
#     --target=firefox121 --outfile=extension/rmapi-bundle.js
```

`build/rmapi-entry.js` is the 3-line entry that imports `register` and
`remarkable` from `rmapi-js` and assigns them to `globalThis.RMAPI`.

### Note on the DANGEROUS_EVAL linter warnings
`rmapi-bundle.js` contains the string `Function("return this")` from core-js's
global-object detection, inlined inside the published rmapi-js bundle. It is a
guarded global lookup, never reached on Firefox (globalThis resolves first), and
evaluates no dynamic input.

## mathjax-bundle.js
A minified browser IIFE bundle of the public npm package
[`mathjax-full`](https://www.npmjs.com/package/mathjax-full) (v3.2.2,
Apache-2.0), used to render TeX and MathML formulas to standalone SVG in the
background page (which then rasterises them to PNG for the EPUB). Built with
esbuild (v0.28.0):

```
npm run build:mathjax
# = esbuild build/mathjax-entry.js --bundle --minify --format=iife --platform=browser \
#     --target=firefox121 --outfile=extension/mathjax-bundle.js
```

`build/mathjax-entry.js` is the short entry that wires MathJax's TeX and MathML
input jax to its SVG output jax (LiteDOM adaptor, `fontCache:"local"`) and
exposes `globalThis.MathRender = { texToSvg, mmlToSvg }`.

### Note on the UNSAFE_VAR_ASSIGNMENT linter warnings
`mathjax-bundle.js` triggers innerHTML/outerHTML warnings from MathJax's
browser-DOM adaptor code paths. The extension only uses the LiteDOM adaptor
(string-based, no live DOM), so those assignments are never reached, and no
MathJax output is ever inserted into a live document — SVGs go straight to an
OffscreenCanvas rasteriser.
