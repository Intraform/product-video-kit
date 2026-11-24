// node check_clicks.mjs <scene.html>: seeks every recorded click and checks the cursor's tip is
// on the target, the target is visible, and it is not moving.
import { chromium } from "playwright-core";
import { resolve } from "node:path";
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto(`file://${resolve(process.argv[2])}#capture`);
await p.waitForFunction(() => window.CLIP?.ready === true, null, { timeout: 30000 });
const clicks = await p.evaluate(() => window.CLIP.clicks);
let bad = 0;
for (const { t, sel } of clicks) {
  await p.evaluate((x) => window.seekClip(x - 0.12), t);
  const before = await p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [r.left, r.top]; }, sel);
  await p.evaluate((x) => window.seekClip(x), t);
  const r = await p.evaluate(([s, before]) => {
    const el = document.querySelector(s), c = document.querySelector("#cursor").getBoundingClientRect();
    const tip = [c.left + c.width * 2 / 22, c.top + c.height * 2 / 28];
    // the first element under the tip that the eye can see (invisible layers and the cursor do not count)
    const seen = (e) => { let o = 1; for (let x = e; x; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; };
    const hit = document.elementsFromPoint(tip[0], tip[1]).find((e) => !e.closest("#cursor, #halo") && seen(e) > 0.05 && getComputedStyle(e).visibility !== "hidden");
    let o = 1; for (let e = el; e; e = e.parentElement) o *= +getComputedStyle(e).opacity;
    const r = el.getBoundingClientRect();
    return { on: !!hit && (el === hit || el.contains(hit)), hit: hit ? (hit.id || hit.className?.baseVal || hit.className || hit.tagName) : null, opacity: +o.toFixed(2), moved: Math.hypot(r.left - before[0], r.top - before[1]).toFixed(1) };
  }, [sel, before]);
  const ok = r.on && r.opacity > 0.9 && r.moved < 2;
  if (!ok) bad++;
  console.log(`${ok ? "ok " : "BAD"} ${t.toFixed(2)} ${sel} on=${r.on} hit=${r.hit} opacity=${r.opacity} moved=${r.moved}`);
}
console.log(bad ? `${bad} bad clicks` : `all ${clicks.length} clicks land`);
// the camera: a diagram must never show while the window is zoomed, and a zoom must not linger
const dur = await p.evaluate(() => window.CLIP.duration);
let zoomFrom = null, camBad = 0;
for (let t = 0; t < dur; t += 0.25) {
  await p.evaluate((x) => window.seekClip(x), t);
  const st = await p.evaluate(() => {
    const seen = (e) => { let o = 1; for (let x = e; x; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o * (getComputedStyle(e).display === "none" ? 0 : 1); };
    // text blocks in the chat must not overlap one another
    const els = [...document.querySelectorAll(".chat .um, .chat .trow, .chat .atext, .chat .tcard, .chat .params, .chat .errc")].filter((e) => seen(e) > 0.5 && e.getBoundingClientRect().height > 0);
    const over = [];
    for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
      const a = els[i].getBoundingClientRect(), b = els[j].getBoundingClientRect();
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (w > 4 && h > 4 && !els[i].contains(els[j]) && !els[j].contains(els[i])) over.push(`${els[i].id || els[i].className}×${els[j].id || els[j].className}`);
    }
    // a halo is drawn around something with a real size
    const halo = document.querySelector("#halo"), hr = halo.getBoundingClientRect();
    const flatHalo = seen(halo) > 0.3 && (hr.height < 14 || hr.width < 14);
    const k = +gsap.getProperty("#cam", "scale");
    const dia = [...document.querySelectorAll(".dia, .term")].some((d) => +getComputedStyle(d).opacity > 0.5);
    return { k, dia, over, flatHalo };
  });
  if (st.over.length) { camBad++; console.log(`BAD ${t.toFixed(2)} overlap ${st.over.join(", ")}`); }
  if (st.flatHalo) { camBad++; console.log(`BAD ${t.toFixed(2)} a halo around an element with no size`); }
  if (st.dia && Math.abs(st.k - 1) > 0.02) { camBad++; console.log(`BAD ${t.toFixed(2)} a diagram shows while the camera is at ${st.k.toFixed(2)}`); }
  if (st.k > 1.02) { if (zoomFrom === null) zoomFrom = t; }
  else { if (zoomFrom !== null && t - zoomFrom > 9) { camBad++; console.log(`BAD zoom held ${zoomFrom.toFixed(1)}–${t.toFixed(1)} s`); } zoomFrom = null; }
}
// the camera moves sparingly: after a move ends, it stays still at least 2.5 s before the next one
{
  const moves = []; let prev = null, moving = false, from = 0;
  for (let t = 0; t < dur; t += 0.1) {
    await p.evaluate((x) => window.seekClip(x), t);
    const c = await p.evaluate(() => [+gsap.getProperty("#cam", "scale"), +gsap.getProperty("#cam", "x"), +gsap.getProperty("#cam", "y")]);
    const m = prev && (Math.abs(c[0] - prev[0]) > 0.002 || Math.abs(c[1] - prev[1]) > 0.5 || Math.abs(c[2] - prev[2]) > 0.5);
    if (m && !moving) { moving = true; from = t; }
    if (!m && moving) { moving = false; moves.push([from, t]); }
    prev = c;
  }
  for (let i = 1; i < moves.length; i++) {
    const still = moves[i][0] - moves[i - 1][1];
    if (still < 2.5) { camBad++; console.log(`BAD camera moves chained: ${moves[i - 1][0].toFixed(1)}–${moves[i - 1][1].toFixed(1)} then ${moves[i][0].toFixed(1)} s (${still.toFixed(1)} s still)`); }
  }
  console.log(`${moves.length} camera moves`);
}
console.log(camBad ? `${camBad} picture problems` : "picture ok");
await b.close();
