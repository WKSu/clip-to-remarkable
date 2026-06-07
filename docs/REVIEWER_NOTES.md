Notes for AMO reviewers — "Clip to reMarkable (EPUB)"

WHAT IT DOES
On toolbar click, the add-on extracts the current article with Mozilla's
Readability, fetches and inlines the article's images, builds an EPUB
in-memory, and either uploads it to the user's own reMarkable cloud account
or (if not paired) downloads it locally. Pairing uses reMarkable's one-time
device code, entered on the options page.

WHY THE PERMISSIONS
- host_permissions http/https: to fetch article images from arbitrary CDNs
  (cross-origin) and to call the reMarkable cloud API. Image bytes are read
  and embedded into the EPUB; nothing is sent anywhere except the user's own
  reMarkable account.
- scripting/activeTab: inject Readability + the extractor into the active tab
  only when the user clicks the button.
- downloads: save the EPUB when the user isn't paired.
- storage: store the user's reMarkable device token locally (never transmitted
  except to reMarkable for authentication).
No analytics, no tracking, no remote code. data_collection_permissions is
declared as "none".

GENERATED CODE
Only rmapi-bundle.js is generated (esbuild over the public npm package
rmapi-js). Full source + exact build command provided in the source upload
(see BUILD.md). Readability.js is the unmodified @mozilla/readability library.

ABOUT THE 4 LINTER WARNINGS (0 errors)
- 2x UNSAFE_VAR_ASSIGNMENT in Readability.js: innerHTML usage inside Mozilla's
  own Readability library (unmodified), the same engine as Firefox Reader View.
- 2x DANGEROUS_EVAL in rmapi-bundle.js: the string Function("return this")
  from core-js global detection, inlined in the published rmapi-js bundle.
  Guarded; never reached on Firefox; evaluates no dynamic input.
