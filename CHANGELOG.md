# Changelog

## Unreleased
- Rewrote image selection to be document-position based: keeps the lead/hero
  image and in-body figures (including a trailing closing figure) between the
  title and the last paragraph, and excludes related/recirculation modules,
  promos, issue-cover CTAs, author avatars, and site chrome.
- Distinguish art-direction/thumbnail duplicates by rendered `sizes` width.
- Recover lead media held in hydration `<template>`s (e.g. NYT).
- Stronger XHTML sanitising: drop media/embeds/scripts, whitelist attributes,
  strip intra-doc fragment links and empty leftovers, and unwrap block-in-`<p>`.
  Generated EPUBs pass epubcheck with 0 errors across the test corpus.
- Added an extensible image-extraction eval harness (`npm test`) with 7 ground
  -truth cases.

## 0.1.0
- Initial release.
- One-click clip of the current article to EPUB 3 with embedded images.
- Robust image handling: srcset/lazy/`<picture>` resolution, proxy-aware
  dedup, recovery of content images Readability drops, clutter/recirc removal.
- Dependency-free EPUB writer (passes epubcheck with 0 errors).
- reMarkable upload via one-time-code device pairing (rmapi-js); falls back to
  download when unpaired.
