# Clip to reMarkable (EPUB)

A Firefox add-on that turns the article you're reading into a clean **EPUB with
its images** and sends it straight to your **reMarkable** — one click, no
copy-paste, no broken pictures.

It extracts the main article with Mozilla's Readability, fetches and embeds the
images (handling lazy-loading, `srcset`, and CDN proxies), builds a valid
EPUB 3 in the browser, and uploads it to your reMarkable cloud account. If you
haven't paired a device, it downloads the EPUB instead.

## Why this exists

The official "Read on reMarkable" extension is Chrome-only, and its login uses
reMarkable's Auth0 with a fixed callback-URL allowlist that contains only the
official Chrome extension's address — so a sideloaded Firefox port can never
complete login. This add-on sidesteps that entirely by pairing through
reMarkable's **one-time device code** (the same flow CLI tools use) and talking
to the cloud API directly, so no browser-redirect allowlist is involved.

## Features

- One-click clip of the current article to EPUB.
- Images embedded in the EPUB, fetched from the page context so lazy-loaded and
  hotlink-protected images come through.
- Robust `srcset` parsing (handles comma-containing Cloudinary/Substack/Netlify
  proxy URLs), `<picture>`/`<source>` flattening, and tracking-pixel filtering.
- Recovers content images that Readability drops on image-heavy posts, placing
  each back in its own section — while never doing worse than Readability alone.
- Strips recirculation/clutter ("More in…", "Editor's Picks", related posts,
  share bars, subscribe widgets).
- **Math support**: LaTeX/MathML formulas (KaTeX, MathJax v2/v3, native MathML
  as on Wikipedia/arXiv HTML, and TeX-image services like WordPress.com's
  `latex.php` and Zhihu's equation endpoint) are re-rendered to crisp PNG
  images sized to the surrounding text — the reMarkable's EPUB reader can't
  render math markup itself. If a formula can't be rendered, it degrades to
  its TeX source as code.
- Pair once with a one-time code; uploads thereafter are automatic.
- Produces EPUBs that pass the official W3C **epubcheck** with 0 errors.
- Works on **Firefox for Android** (the clip button lives in the browser's
  extensions menu; system notifications may not appear there).

## Install

### Firefox Add-on
Install from the [Firefox Add-On page](https://addons.mozilla.org/en-US/firefox/addon/clip-to-remarkable-unofficial/). 

### Quick try (local)

1. Download or clone this repo.
2. Open `about:debugging#/runtime/this-firefox` in Firefox.
3. **Load Temporary Add-on** → pick `extension/manifest.json`.

Temporary add-ons are removed when Firefox restarts.

## Usage

1. Open the add-on **options** (`about:addons` → this add-on → Preferences).
2. Go to <https://my.remarkable.com/device/browser/connect>, sign in, copy the
   eight-letter one-time code, paste it, and click **Pair**.
3. Open any article and click the toolbar button. You'll get a notification when
   it lands on your reMarkable.

Until you pair, clicking the button downloads the EPUB so you can transfer it
however you like.

## How it works

```
toolbar click
   └─ inject Readability + extractor into the page
        └─ extract article + resolve every image's best URL (+ fallbacks)
challenge: Readability sometimes drops content images
   └─ recovery pass re-adds dropped images, anchored to their section
   └─ background fetches image bytes (host permissions bypass CORS)
   └─ epub-builder zips a valid EPUB 3 (dependency-free zip writer)
        └─ rmapi-js uploads to your reMarkable, or the EPUB is downloaded
```

Files (all in `extension/`):

| File | Role |
| --- | --- |
| `background.js` | Orchestrates: inject, fetch images, build, upload/download |
| `extract.js` | Runs in the page: Readability + image resolution + recovery |
| `epub-builder.js` | Dependency-free EPUB 3 writer (own STORE-zip + CRC-32) |
| `options.html` / `options.js` | One-time-code pairing UI |
| `Readability.js` | Mozilla Readability, unmodified |
| `rmapi-bundle.js` | Generated bundle of `rmapi-js` (reMarkable cloud client) |
| `mathjax-bundle.js` | Generated bundle of MathJax v3 (TeX/MathML → SVG for math rendering) |

## Build

Only `rmapi-bundle.js`, `mathjax-bundle.js`, and `Readability.js` are
vendored/generated; all are committed so the repo loads as-is. To rebuild them:

```bash
npm install
npm run build      # vendors Readability + bundles rmapi-js and MathJax into extension/
npm run lint       # web-ext lint (expect 0 errors)
npm run package    # produces a zip in web-ext-artifacts/
```

`rmapi-bundle.js` and `mathjax-bundle.js` are produced by esbuild over the
public npm packages [`rmapi-js`](https://www.npmjs.com/package/rmapi-js) and
[`mathjax-full`](https://www.npmjs.com/package/mathjax-full); exact commands and
version pins are in [`build/BUILD.md`](build/BUILD.md).


## Limitations

- Needs Firefox 142+ (for the `data_collection_permissions` manifest key).
- The reMarkable upload depends on `rmapi-js` and reMarkable's cloud API, which
  can change; if uploads fail, re-pair (one-time codes are single-use).
- Site coverage is ~the same as Firefox Reader View, plus recovered images.
  A page Reader View can't parse won't clip well either.

## Credits & licenses

This project is MIT-licensed (see [`LICENSE`](LICENSE)). It bundles:

- [Mozilla Readability](https://github.com/mozilla/readability) — Apache-2.0
- [rmapi-js](https://github.com/erikbrinkman/rmapi-js) — MIT (which in turn
  bundles core-js and JSZip)
- [MathJax](https://github.com/mathjax/MathJax-src) (`mathjax-full`) — Apache-2.0

Not affiliated with or endorsed by reMarkable AS.
