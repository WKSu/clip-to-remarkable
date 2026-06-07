// Bundle entry for the reMarkable cloud client (rmapi-js).
// Bundled with esbuild into addon/rmapi-bundle.js — see SOURCE/BUILD.md.
import { register, remarkable } from "rmapi-js";
globalThis.RMAPI = { register, remarkable };
