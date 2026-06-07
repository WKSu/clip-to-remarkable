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
- Pair once with a one-time code; uploads thereafter are automatic.
- Produces EPUBs that pass the official W3C **epubcheck** with 0 errors.

## Install

### Quick try (temporary)

1. Download or clone this repo.
2. Open `about:debugging#/runtime/this-firefox` in Firefox.
3. **Load Temporary Add-on** → pick `extension/manifest.json`.

Temporary add-ons are removed when Firefox restarts.

### Permanent install

Normal Firefox only installs signed add-ons. Either:

- **Self-distribution (private):** sign the zip through
  [addons.mozilla.org](https://addons.mozilla.org/developers/) as *unlisted* and
  install the returned `.xpi`. See [`docs/SUBMISSION.md`](docs/SUBMISSION.md).
- **Firefox Developer Edition / Nightly / ESR:** set
  `xpinstall.signatures.required` to `false` in `about:config`, then install the
  packaged `.xpi`.

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

## Build

Only `rmapi-bundle.js` and `Readability.js` are vendored/generated; both are
committed so the repo loads as-is. To rebuild them:

```bash
npm install
npm run build      # vendors Readability + bundles rmapi-js into extension/
npm run lint       # web-ext lint (expect 0 errors)
npm run package    # produces a zip in web-ext-artifacts/
```

`rmapi-bundle.js` is produced by esbuild over the public npm package
[`rmapi-js`](https://www.npmjs.com/package/rmapi-js); exact command and version
pins are in [`build/BUILD.md`](build/BUILD.md).

## Publishing to addons.mozilla.org

See [`docs/SUBMISSION.md`](docs/SUBMISSION.md) for both the private (unlisted)
and public (listed) paths, and [`docs/REVIEWER_NOTES.md`](docs/REVIEWER_NOTES.md)
for the notes to paste into AMO's reviewer field. The validator reports
**0 errors**; the remaining warnings are all in third-party libraries
(Mozilla's Readability `innerHTML`; core-js's global lookup inside the rmapi-js
bundle) and don't block signing.

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

Not affiliated with or endorsed by reMarkable AS.
