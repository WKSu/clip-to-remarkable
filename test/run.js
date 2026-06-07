#!/usr/bin/env node
/*
 * Image-extraction evaluation harness.
 *
 * Runs extension/extract.js (with Mozilla Readability) against saved article
 * HTML under test/fixtures/ in a jsdom DOM, and checks the number of images
 * the extractor returns against the expected counts in test/cases.json.
 *
 * Extend it by dropping a new <name>.htm into test/fixtures/ and adding a
 * { "file", "url", "images" } entry to test/cases.json.
 *
 * Fixtures are gitignored on purpose: they are copyrighted article pages, so
 * they live locally rather than in the public repo.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
let JSDOM;
try { ({ JSDOM } = require("jsdom")); }
catch (e) { console.error("Please `npm install` first (jsdom is a devDependency)."); process.exit(2); }

const ROOT = path.join(__dirname, "..");
const READABILITY = fs.readFileSync(path.join(ROOT, "extension", "Readability.js"), "utf-8");
const EXTRACT = fs.readFileSync(path.join(ROOT, "extension", "extract.js"), "utf-8");
const cases = JSON.parse(fs.readFileSync(path.join(__dirname, "cases.json"), "utf-8")).cases;

function imagesFor(file, url) {
  const html = fs.readFileSync(path.join(__dirname, "fixtures", file), "utf-8");
  const dom = new JSDOM(html, { url, runScripts: "outside-only" });
  const ctx = dom.getInternalVMContext();
  vm.runInContext(READABILITY, ctx);
  vm.runInContext(EXTRACT, ctx);
  const r = vm.runInContext("extractArticle()", ctx);
  if (!r || !r.ok) throw new Error(r && r.error || "extract failed");
  return r.images;
}

let pass = 0, fail = 0, skipped = 0;
console.log("Image-extraction eval\n");
for (const c of cases) {
  const fp = path.join(__dirname, "fixtures", c.file);
  if (!fs.existsSync(fp)) {
    console.log(`  SKIP  (missing fixture)  ${c.file}`);
    skipped++; continue;
  }
  let got, ok, note = "";
  try {
    const imgs = imagesFor(c.file, c.url);
    got = imgs.length; ok = got === c.images;
    const urls = imgs.map(i => (i.candidates[0] || i.dataUrl || "")).join(" ");
    for (const need of (c.requireAssets || [])) if (!urls.includes(need)) { ok = false; note += ` missing:${need}`; }
    for (const bad of (c.forbidAssets || [])) if (urls.includes(bad)) { ok = false; note += ` forbidden:${bad}`; }
  } catch (e) { got = "ERR: " + e.message; ok = false; }
  console.log(`  ${ok ? "PASS" : "FAIL"}  got=${got} expected=${c.images}${note}  ${c.file.slice(0, 60)}`);
  ok ? pass++ : fail++;
}
console.log(`\n${pass} passed, ${fail} failed${skipped ? ", " + skipped + " skipped" : ""}`);
process.exit(fail ? 1 : 0);
