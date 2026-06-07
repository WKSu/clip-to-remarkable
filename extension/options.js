const api = globalThis.browser || globalThis.chrome;
const $ = (id) => document.getElementById(id);

function show(msg, kind) {
  const el = $("status");
  el.textContent = msg;
  el.className = "status " + (kind || "muted");
}

async function refreshStatus() {
  const { deviceToken } = await api.storage.local.get("deviceToken");
  if (deviceToken) show("Paired. Clips will upload to your reMarkable.", "ok");
  else show("Not paired yet. Enter a one-time code above.", "muted");
}

$("pair").addEventListener("click", async () => {
  const code = ($("code").value || "").trim().toLowerCase();
  if (code.length !== 8) {
    show("Codes are eight letters — check and try again.", "err");
    return;
  }
  show("Pairing…", "muted");
  try {
    const deviceToken = await RMAPI.register(code);
    await api.storage.local.set({ deviceToken });
    $("code").value = "";
    show("Paired successfully. You're ready to clip.", "ok");
  } catch (e) {
    show("Pairing failed: " + String((e && e.message) || e) + " (codes are single-use — get a fresh one).", "err");
  }
});

$("unpair").addEventListener("click", async () => {
  await api.storage.local.remove("deviceToken");
  show("Unpaired. The stored token was removed.", "muted");
});

refreshStatus();
