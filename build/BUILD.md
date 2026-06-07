# Build notes

Two files in `extension/` are vendored or generated. Both are committed so the
repo loads without a build step; rebuild them with the root `npm run build`.

## Readability.js
The unmodified [@mozilla/readability](https://github.com/mozilla/readability)
library (v0.6.0), copied verbatim:

```
npm run vendor:readability   # cp node_modules/@mozilla/readability/Readability.js extension/
```

## rmapi-bundle.js
A browser IIFE bundle of the public npm package
[`rmapi-js`](https://www.npmjs.com/package/rmapi-js) (v10.0.1), which implements
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
