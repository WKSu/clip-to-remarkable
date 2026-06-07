# Submitting "Clip to reMarkable (EPUB)" to addons.mozilla.org

You have two distribution choices. Both sign the add-on so it installs
permanently in normal Firefox.

## Option A — Self-distribution (unlisted): private, not in the public gallery
Best if you just want it for yourself.
1. Go to https://addons.mozilla.org/developers/ → Submit a New Add-on.
2. Choose "On your own" (unlisted).
3. Upload clip-to-remarkable.zip.
4. The validator runs: expect 0 errors, 4 warnings (all third-party; fine).
5. When prompted for source code, upload clip-to-remarkable-SOURCE.zip
   (required because rmapi-bundle.js is generated).
6. You receive a signed .xpi to install via about:addons → gear → Install
   Add-on From File. Done — no public listing, no review queue wait.

## Option B — Listed (public gallery, human review)
1. Same start, choose "On this site" (listed).
2. Upload clip-to-remarkable.zip, then clip-to-remarkable-SOURCE.zip when
   asked for source.
3. Paste REVIEWER_NOTES.md into the "Notes to reviewer" field.
4. Fill the data-collection form: select "No" / none (matches the manifest).
5. Submit; a human review follows.

## Files
- clip-to-remarkable.zip          → the add-on (upload this first)
- clip-to-remarkable-SOURCE.zip   → source + BUILD.md (upload when asked)
- REVIEWER_NOTES.md               → paste into reviewer notes (Option B)

## Before submitting a real public version
- Bump "version" in manifest.json for each new upload (AMO rejects duplicates).
- The add-on id is clip-to-remarkable@local; change it to something you own
  (e.g. clip-to-remarkable@yourdomain) if you list it publicly.
