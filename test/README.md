# Tests

`npm test` runs the image-extraction evaluation in `run.js`: it feeds saved
article HTML through `extension/extract.js` (the same code the add-on injects)
under jsdom and checks the number of images returned against `cases.json`.

## Adding a case
1. Save the article page as `Some Name.htm` into `test/fixtures/`.
2. Add an entry to `cases.json`:
   ```json
   { "file": "Some Name.htm", "url": "https://site/the-article", "images": 5 }
   ```
3. Run `npm test`.

`test/fixtures/` is gitignored because the pages are copyrighted; keep them
locally. The harness SKIPs any case whose fixture file is absent, so the suite
still runs for whoever clones the repo.
