// clip-kit engine. A scene is its screen (#screen) and its beats; everything the
// house rules fix lives here: the opening, the header, the cursor, the camera, the
// sound, the closing, the loop, the preview player and the recorder contract.
//
//   ClipKit.scene({ kicker, title, duration }, (k) => {
//     k.click(1.25, "#plus");                 // cursor goes there, presses, ripple, click
//     k.tl.fromTo("#menu", {...}, {...}, 1.31); // what the click does, on the same timeline
//     k.type(3.05, "#question", "What does the customer want?");
//     k.result(7.3, "#answer", "tick");        // the payoff: camera lands on it, one cue
//   });
//
// Times are authored seconds on the scene timeline (0 = the screen starts to appear,
// after the opening). PACE slows the whole clip evenly when it plays.
(function () {
  const PACE = 0.8;      // every beat authored at full speed, played at 0.8
  const OFFSET = 1.9;    // the opening, before the scene timeline starts
  const FPS = 30;
  const MAX_ZOOM = 1.08;

  const LOGO = `<svg viewBox="0 0 256 256"><g class="ck-rot"><polygon fill="#3B82F6" points="227.55,69.75 186.61,69.75 101.33,69.75 129.78,119.02 158.16,119.02 228.61,119.02 256,119.02"/><polygon fill="#3B82F6" points="136.93,132.47 116.46,167.93 73.82,241.78 130.71,241.78 144.9,217.2 180.13,156.18 193.82,132.46"/><polygon fill="#3B82F6" points="121.7,131.95 101.23,96.49 58.59,22.63 30.15,71.91 44.34,96.49 79.57,157.5 93.26,181.22"/><polygon fill="#BCD4FC" points="134.78,14.22 114.31,48.21 101.33,69.75 158.22,69.75 177.97,36.95 191.67,14.22"/><polygon fill="#BCD4FC" points="64.81,131.95 25.15,131.21 0,130.74 28.44,180.01 66.73,180.72 93.26,181.21"/><polygon fill="#BCD4FC" points="165.38,181.74 184.58,216.46 196.75,238.47 225.19,189.2 206.66,155.69 193.83,132.46"/></g></svg>`;
  const CURSOR = `<span class="ck-ripple"></span><svg viewBox="0 0 24 24"><path d="M4.04 3.07a.75.75 0 0 1 .97-.97l15.5 6.2a.75.75 0 0 1-.06 1.42l-6.42 1.9-1.9 6.42a.75.75 0 0 1-1.42.06z" fill="#0f172a" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  const ICON_PAUSE = '<svg viewBox="0 0 16 16" fill="currentColor"><rect x="3.5" y="2.5" width="3" height="11" rx="1"/><rect x="9.5" y="2.5" width="3" height="11" rx="1"/></svg>';
  const ICON_PLAY = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // ------------------------------------------------------------ sound
  // Every cue is synthesised except the keystrokes (key-sprite.js), so the same
  // cue list renders identically in the preview and in the recorder.
  function mulberry32(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  async function renderSoundtrack(cues, length) {
    const SR = 48000, ctx = new OfflineAudioContext(2, Math.ceil(length * SR), SR), rand = mulberry32(7);
    const noise = ctx.createBuffer(1, SR * 2, SR);
    const nd = noise.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = rand() * 2 - 1;
    const KS = window.KEY_SPRITE;
    const sprite = KS ? await ctx.decodeAudioData(Uint8Array.from(atob(KS.b64), (c) => c.charCodeAt(0)).buffer) : null;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 3; comp.attack.value = 0.003; comp.release.value = 0.2;
    const out = ctx.createGain(); out.gain.value = 0.9;
    out.connect(comp).connect(ctx.destination);
    const xp = (x) => Math.max(-0.7, Math.min(0.7, (x / 1280) * 2 - 1)) * 0.8;
    const pan = (v) => { const p = ctx.createStereoPanner(); p.pan.value = v; p.connect(out); return p; };
    const env = (t, a, peak, d) => { const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); return g; };
    const envTo = (dest, t, a, peak, d) => { const g = env(t, a, peak, d); g.connect(dest); return g; };
    const noiseInto = (t, dur, node) => { const s = ctx.createBufferSource(); s.buffer = noise; s.loop = true; s.connect(node); s.start(t, rand() * 1.5); s.stop(t + dur + 0.05); };
    const tone = (t, type, f0, f1, glide, a, peak, d, dest) => {
      const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f0, t);
      if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + glide);
      o.connect(env(t, a, peak, d)).connect(dest); o.start(t); o.stop(t + a + d + 0.05);
    };
    const filt = (type, f, q, dest) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; b.connect(dest); return b; };
    const CUE = {
      // A breath under the cursor: band-passed noise that opens with its speed and pans with its x.
      whoosh: ({ t, d, x0, x1, level }) => {
        const p = ctx.createStereoPanner(); p.pan.setValueAtTime(xp(x0), t); p.pan.linearRampToValueAtTime(xp(x1), t + d); p.connect(out);
        const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(level, t + d * 0.5); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.15); g.connect(p);
        const b = ctx.createBiquadFilter(); b.type = "bandpass"; b.Q.value = 0.8;
        b.frequency.setValueAtTime(240, t); b.frequency.exponentialRampToValueAtTime(820, t + d * 0.5); b.frequency.exponentialRampToValueAtTime(190, t + d + 0.12);
        b.connect(g); noiseInto(t, d + 0.2, b);
      },
      // Mouse button: a soft press, a little body, then the softer release. Kept low
      // and dark: with more top end, laptop speakers turn the press into a snap.
      click: ({ t, x }) => {
        const p = pan(xp(x) * 0.7);
        noiseInto(t, 0.04, filt("highpass", 2000, 0, envTo(p, t, 0.0015, 0.26, 0.016)));
        tone(t, "sine", 1700, 1700, 0, 0.001, 0.035, 0.01, p);
        tone(t, "sine", 240, 110, 0.04, 0.001, 0.12, 0.05, p);
        noiseInto(t + 0.085, 0.03, filt("highpass", 2800, 0, envTo(p, t + 0.085, 0.0015, 0.11, 0.012)));
      },
      key: ({ t, x, n }) => {
        const p = pan(xp(x) * 0.5), L = 0.4 * (0.85 + rand() * 0.3);
        if (sprite) {
          // 5 and 12 are coprime: all 12 keystrokes play before one repeats.
          const [o, d] = KS.offsets[(n * 5) % KS.offsets.length];
          const s = ctx.createBufferSource(), g = ctx.createGain();
          s.buffer = sprite; s.playbackRate.value = 0.97 + rand() * 0.06; g.gain.value = 0.32 * L;
          s.connect(g).connect(p); s.start(t, o, d);
        } else {
          noiseInto(t, 0.04, filt("lowpass", 1300 + rand() * 300, 0.7, envTo(p, t, 0.0008, 0.5 * L, 0.016)));
          tone(t, "sine", 330 + rand() * 40, 180, 0.015, 0.001, 0.1 * L, 0.02, p);
        }
      },
      tick: ({ t, x }) => tone(t, "sine", 1320, 1320, 0, 0.003, 0.06, 0.18, pan(xp(x) * 0.6)),
      deny: ({ t, x }) => {
        const p = pan(xp(x) * 0.6);
        tone(t, "triangle", 392, 392, 0, 0.003, 0.07, 0.12, p);
        tone(t + 0.1, "triangle", 311, 311, 0, 0.003, 0.07, 0.2, p);
        tone(t, "sine", 150, 80, 0.15, 0.002, 0.22, 0.18, p);
      },
    };
    cues.forEach((c) => CUE[c.k] && CUE[c.k](c));
    return ctx.startRendering();
  }
  function wav(buf) {
    const ch = buf.numberOfChannels, n = buf.length, dv = new DataView(new ArrayBuffer(44 + n * ch * 2));
    const w = (o, s) => [...s].forEach((c, i) => dv.setUint8(o + i, c.charCodeAt(0)));
    w(0, "RIFF"); dv.setUint32(4, 36 + n * ch * 2, true); w(8, "WAVEfmt "); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, ch, true);
    dv.setUint32(24, buf.sampleRate, true); dv.setUint32(28, buf.sampleRate * ch * 2, true); dv.setUint16(32, ch * 2, true); dv.setUint16(34, 16, true); w(36, "data"); dv.setUint32(40, n * ch * 2, true);
    const data = [...Array(ch)].map((_, c) => buf.getChannelData(c));
    for (let i = 0, o = 44; i < n; i++) for (let c = 0; c < ch; c++, o += 2) dv.setInt16(o, Math.max(-1, Math.min(1, data[c][i])) * 0x7fff, true);
    return dv.buffer;
  }
  function toBase64(ab) { const b = new Uint8Array(ab); let s = ""; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(s); }

  // ------------------------------------------------------------ the scene
  function scene(opts, build) {
    const params = new URLSearchParams(location.hash.slice(1));
    const capture = params.has("capture");
    // Grows to fit the narration once the beats are built.
    let DURATION = opts.duration ?? 11;
    const screen = document.getElementById("screen");
    if (!screen) throw new Error("clip-kit: the scene needs a #screen element");

    // page + stage
    document.body.insertAdjacentHTML("beforeend", `
      <div class="ck-page">
        <div class="ck-head"><h1>${esc(opts.title)}</h1><span class="ck-meta"></span></div>
        <div class="ck-frame" role="img" aria-label="${esc(opts.description ?? `Product clip: ${opts.title}`)}">
          <div class="ck-stage" aria-hidden="true">
            <div class="ck-intro">${LOGO}<span class="ck-wm">Windmill</span></div>
            <div class="ck-push">
              <div class="ck-cam">
                <div class="ck-hdr"><div class="ck-dock"></div></div>
                <div class="ck-cursor">${CURSOR}</div>
              </div>
            </div>
            <div class="ck-dim"></div>
            <div class="ck-caps"></div>
            <div class="ck-veil"></div>
          </div>
        </div>
        <div class="ck-controls">
          <button class="ck-btn ck-play" type="button" aria-label="Pause"></button>
          <input type="range" class="ck-scrub" min="0" step="0.0333" value="0" aria-label="Clip position in seconds">
          <output class="ck-clock">0.00 s</output>
          <button class="ck-btn ck-sound" type="button" aria-pressed="false">Sound off</button>
        </div>
      </div>`);
    if (capture) document.body.classList.add("ck-capture");
    const q = (s) => document.querySelector(s);
    const frame = q(".ck-frame"), stage = q(".ck-stage"), cam = q(".ck-cam");
    cam.insertBefore(screen, q(".ck-cursor"));
    // Product icons from icons.js, filled in before anything is measured. Ids get a
    // suffix per use: a second copy of an icon would otherwise point its gradients at
    // the first, and render blank whenever the first is hidden.
    [...screen.querySelectorAll("[data-icon]")].forEach((el, n) => {
      const svg = window.CLIP_ICONS?.[el.dataset.icon];
      if (!svg) throw new Error(`clip-kit: no icon "${el.dataset.icon}" (the names are at the top of icons.js)`);
      el.classList.add("ck-icon");
      el.innerHTML = svg.replace(/\bid="([^"]+)"/g, `id="$1-${n}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${n})`).replace(/href="#([^"]+)"/g, `href="#$1-${n}"`);
    });
    const fit = () => { const s = Math.min(frame.clientWidth / 1280, frame.clientHeight / 720); stage.style.transform = `scale(${s})`; return s; };
    new ResizeObserver(fit).observe(frame);
    fit();

    // Targets are measured from layout, so build only once the faces are in.
    (document.fonts?.ready ?? Promise.resolve()).then(start, start);

    function start() {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      const $ = (s) => { const el = typeof s === "string" ? screen.querySelector(s) ?? q(s) : s; if (!el) throw new Error(`clip-kit: no element ${s}`); return el; };
      const clicks = [], typings = [], results = [], chapters = [];
      tl.fromTo(screen, { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

      // window.CLIP_GRID, set by the renderer from the music (clip seconds): each beat
      // moves to the nearest grid line within `window`. Beats return the moved time and
      // scenes chain off it, so what a beat triggers moves with it.
      const grid = window.CLIP_GRID;
      const snap = (t) => {
        if (!grid) return t;
        const tc = (OFFSET + t) / PACE;
        const s = grid.phase + Math.round((tc - grid.phase) / grid.period) * grid.period;
        return Math.abs(s - tc) <= (grid.window ?? 0.22) ? s * PACE - OFFSET : t;
      };
      // Chapters open on a full beat of the music, wherever the nearest one is.
      const snapBeat = (t) => {
        if (!grid) return t;
        const g = grid.beat ?? grid, tc = (OFFSET + t) / PACE;
        return Math.max(0, (g.phase + Math.round((tc - g.phase) / g.period) * g.period) * PACE - OFFSET);
      };
      // Narration. window.CLIP_VO, set by the renderer from the voice take, is how long
      // each line runs in seconds, in the order the scene declares them; without it a
      // line is timed from its words, so a draft previews close to how it renders.
      const said = [];
      const say = (t, text, kind) => {
        const d = window.CLIP_VO?.[said.length] ?? 0.3 + text.split(/\s+/).filter(Boolean).length / 2.6;
        said.push({ t, text, kind, d });
        return t + d * PACE;
      };
      const voiceEnd = () => said.reduce((m, s) => Math.max(m, s.t + s.d * PACE), 0);
      // The people k.meet introduced, by first name, as their k.who badge.
      const cast = {};
      let badge = null;
      const k = {
        tl, $,
        // A chapter card: the screen steps back under a veil, the step ("1", "Give it
        // tools") rises word by word at the centre, then lifts to a caption above the
        // window as the screen comes back. Change the screen under the card, not in
        // view. `say` is the chapter's line of narration, spoken as the card rises.
        // Returns when the screen is back.
        chapter(t, text, o = {}) {
          const want = t;
          t = snapBeat(t);
          // Rounding back onto a beat would start the line over the previous one.
          if (o.say && grid && t < want - 0.05) t += (grid.beat ?? grid).period * PACE;
          if (o.say) say(t + 0.36, o.say, "chapter");
          const n = chapters.length + 1, prev = chapters[n - 2];
          const el = document.createElement("div");
          el.className = "ck-cap";
          el.innerHTML = `<span class="ck-num">${n}</span><span class="ck-ws">${text.split(/\s+/).map((w) => `<span class="ck-w"><span>${esc(w)}</span></span>`).join(" ")}</span>`;
          q(".ck-caps").append(el);
          const words = el.querySelectorAll(".ck-w > span");
          if (prev && !prev.gone) tl.to(prev.el, { opacity: 0, y: "-=14", duration: 0.3, ease: "power2.in" }, t);
          tl.to(".ck-dim", { opacity: 0.9, duration: 0.45, ease: "power2.inOut" }, t);
          tl.to(".ck-push", { scale: 0.96, duration: 0.5, ease: "power2.inOut" }, t);
          tl.set(words, { yPercent: 110 }, t);
          tl.set(el, { opacity: 1, y: 360, yPercent: -50, scale: 1 }, t + 0.15);
          tl.fromTo(el.querySelector(".ck-num"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, t + 0.15);
          tl.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", immediateRender: false }, t + 0.22);
          const up = t + 1.35;
          tl.to(el, { y: 82, scale: 0.5, duration: 0.6, ease: "power3.inOut" }, up);
          tl.to(".ck-dim", { opacity: 0, duration: 0.5, ease: "power2.inOut" }, up + 0.05);
          tl.to(".ck-push", { scale: 1, duration: 0.6, ease: "power2.inOut" }, up);
          chapters.push({ t, text, el, end: up + 0.6 });
          return up + 0.6;
        },
        // The opening line, written in full while it is said, one sentence at a time
        // ("\n" separates them): each is a line of narration and arrives whole when the
        // voice starts it; word by word reads badly. `say: false` keeps it silent.
        // `mark` is underlined once the last one is up, and the card clears for the
        // first chapter. Returns when it is gone: start the first chapter there.
        hook(t, text, o = {}) {
          t = snapBeat(t);
          const mark = (o.mark ?? "").toLowerCase().split(/\s+/).filter(Boolean);
          const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, "");
          const el = document.createElement("div");
          el.className = "ck-hook";
          el.innerHTML = text.split("\n").map((line) => {
            const ws = line.split(/\s+/).filter(Boolean), out = [];
            for (let i = 0; i < ws.length; i++) {
              if (mark.length && mark.every((m, j) => norm(ws[i + j] ?? "") === norm(m))) {
                out.push(`<span class="ck-mark">${esc(ws.slice(i, i + mark.length).join(" "))}<i class="ck-ul"></i></span>`);
                i += mark.length - 1;
              } else out.push(esc(ws[i]));
            }
            return `<span class="ck-hl">${out.join(" ")}</span>`;
          }).join("");
          q(".ck-caps").append(el);
          const lines = [...el.querySelectorAll(".ck-hl")];
          const spoken = o.say !== false, sentences = text.split("\n");
          let at = o.at, end = 0;
          if (!at) {
            at = [];
            let next = 0.1;
            for (const s of sentences) {
              at.push(next);
              next = spoken ? say(t + next, s, "hook") - t + 0.25 : next + 1.6;
            }
            end = spoken ? next - 0.25 : 0;
          } else if (spoken) sentences.forEach((s, i) => { end = say(t + at[i], s, "hook") - t; });
          tl.to(".ck-dim", { opacity: 0.92, duration: 0.4, ease: "power2.inOut" }, t);
          tl.to(".ck-push", { scale: 0.96, duration: 0.5, ease: "power2.inOut" }, t);
          tl.set(lines, { opacity: 0, y: 18 }, t);
          tl.set(el, { opacity: 1, yPercent: -50 }, t);
          lines.forEach((ln, i) => tl.to(ln, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, t + at[i]));
          const last = t + at[lines.length - 1];
          tl.fromTo(el.querySelectorAll(".ck-ul"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.inOut", immediateRender: false }, last + (o.markAt ?? 0.8));
          const out = Math.max(last + (o.hold ?? 2.2), t + end + 0.5);
          tl.to(el, { opacity: 0, y: -14, duration: 0.35, ease: "power2.in" }, out);
          chapters.hook = { t, end: out + 0.35, text };
          return out + 0.35;
        },
        // Who the story follows, before it first names them: each person's face (their
        // `photo`, else initials), name and role, big at the centre, while `say`
        // introduces them. Like the hook, it leaves the screen veiled: open a chapter
        // where it returns. Between two chapters, the previous chapter's caption leaves
        // with the screen: left up, it reads as the title of the person's card.
        meet(t, people, o = {}) {
          t = snapBeat(t);
          const prev = chapters[chapters.length - 1];
          if (prev && !prev.gone) {
            tl.to(prev.el, { opacity: 0, y: "-=14", duration: 0.3, ease: "power2.in" }, t);
            prev.gone = true;
          }
          const el = document.createElement("div");
          el.className = "ck-meet";
          el.innerHTML = people.map((p) => {
            const initials = p.initials ?? p.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            const av = p.photo
              ? `<span class="ck-av"><img src="${esc(p.photo)}" alt=""></span>`
              : `<span class="ck-av" style="background:${esc(p.color ?? "#2c9c8f")}">${esc(initials)}</span>`;
            cast[p.name.split(/\s+/)[0]] = `${av}${esc(p.name.split(/\s+/)[0])} <small>· ${esc(p.role)}</small>`;
            return `<div class="ck-pp">${av}<span class="ck-pn">${esc(p.name)}</span><span class="ck-pr">${esc(p.role)}</span></div>`;
          }).join("");
          q(".ck-caps").append(el);
          const cards = [...el.children];
          tl.to(".ck-dim", { opacity: 0.92, duration: 0.4, ease: "power2.inOut" }, t);
          tl.to(".ck-push", { scale: 0.96, duration: 0.5, ease: "power2.inOut" }, t);
          tl.set(cards, { opacity: 0, y: 24 }, t);
          tl.set(el, { opacity: 1, yPercent: -50 }, t);
          cards.forEach((c, i) => tl.to(c, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, t + 0.15 + i * 0.5));
          const spoken = o.say ? say(t + 0.15, o.say, "meet") - t : 0;
          const out = t + Math.max(0.15 + (cards.length - 1) * 0.5 + (o.hold ?? 2.2), spoken + 0.4);
          tl.to(el, { opacity: 0, y: -14, duration: 0.35, ease: "power2.in" }, out);
          return out + 0.35;
        },
        // From `t`, the badge in the top-left corner says who is on screen: a first
        // name `k.meet` introduced, or null for no one. Returns `t`.
        who(t, name) {
          if (name && !cast[name]) throw new Error(`clip-kit: k.who("${name}") needs k.meet to introduce them first`);
          if (badge) tl.to(badge, { opacity: 0, y: -8, duration: 0.3, ease: "power2.in" }, t);
          badge = null;
          if (!name) return t;
          badge = document.createElement("div");
          badge.className = "ck-who ck-who-pin";
          badge.innerHTML = cast[name];
          q(".ck-caps").append(badge);
          tl.fromTo(badge, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, t + 0.2);
          return t;
        },
        click(t, sel, o = {}) { t = snap(t); clicks.push({ t, sel, dx: o.dx ?? 0, dy: o.dy ?? 0 }); return t; },
        // Focuses the field (a click), types `text` into it, returns when typing ends.
        // About 13 characters a second on screen, and never more than 5 s of typing:
        // a longer text is typed faster (watching ten seconds of typing loses people).
        type(t, sel, text, o = {}) {
          const el = $(sel), dt = o.dt ?? Math.min(0.06, (5 * PACE) / Math.max(1, text.length));
          t = snap(t);
          const typed = document.createElement("span"); typed.className = "ck-typed";
          typed.innerHTML = [...text].map((c) => `<span>${esc(c)}</span>`).join("");
          // The caret sits inside the typed text, after its last shown character: as a
          // sibling in a flex field it took a column of its own on the right, and the
          // text wrapped early to leave it room.
          const caret = document.createElement("i"); caret.className = "ck-caret";
          typed.append(caret);
          el.append(typed);
          const ph = el.querySelector(".ph");
          this.click(t, el, { dx: o.dx ?? 60 });
          tl.to(el, { borderColor: "#758ff8", boxShadow: "0 0 0 3px rgba(117,143,248,.25)", duration: 0.15 }, t + 0.05);
          tl.set(caret, { opacity: 1 }, t + 0.06);
          const t0 = t + 0.17;
          if (ph) tl.set(ph, { display: "none" }, t0);
          [...typed.querySelectorAll(":scope > span")].forEach((c, i) => tl.set(c, { display: "inline" }, t0 + i * dt));
          const end = t0 + text.length * dt;
          typings.push({ t, t0, dt, el, caret, n: text.length, end });
          return end;
        },
        result(t, sel, cue = "tick") { t = snap(t); results.push({ t, sel, cue }); return t; },
        // A line of narration at `t`. Returns when the voice is done.
        say(t, text) { return say(t, text, "line"); },
        // The earliest a chapter can follow content that ends at `t`: `gap` later, and
        // never while the previous line is still being said.
        after(t, gap = 0.5) { return Math.max(t + gap, voiceEnd() + 0.25); },
      };
      build(k);
      if (!results.length) throw new Error("clip-kit: a scene ends on k.result(...)");
      DURATION = Math.max(DURATION, voiceEnd() + 0.7, Math.max(...results.map((r) => r.t)) + 2);

      // A field loses focus at the next beat after its typing.
      const beatTimes = clicks.map((c) => c.t).sort((a, b) => a - b);
      for (const ty of typings) {
        const next = beatTimes.find((b) => b > ty.end) ?? ty.end + 0.6;
        tl.set(ty.caret, { opacity: 0 }, next);
        tl.to(ty.el, { borderColor: "#d6dae2", boxShadow: "0 0 0 0px rgba(117,143,248,0)", duration: 0.2 }, next);
      }
      tl.fromTo(".ck-veil", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.in" }, DURATION - 0.55);
      tl.set({}, {}, DURATION);

      // ---- measuring, on the timeline's own layout, while .ck-cam is untransformed
      const center = (el, dx = 0, dy = 0) => {
        const s = fit(), sr = stage.getBoundingClientRect(), r = $(el).getBoundingClientRect();
        return { x: (r.left + r.width / 2 - sr.left) / s + dx, y: (r.top + r.height / 2 - sr.top) / s + dy };
      };
      const at = (t, fn) => { tl.seek(Math.max(0, t), false); const v = fn(); return v; };
      clicks.sort((a, b) => a.t - b.t);
      const pts = clicks.map((c) => ({ ...c, ...at(c.t - 0.001, () => center(c.sel, c.dx, c.dy)) }));
      const res = results[results.length - 1];
      const resPt = at(res.t + 0.5, () => center(res.sel));
      const workPt = typings.length ? at(typings[0].t + 0.3, () => center(typings[0].el)) : pts[1] ?? pts[0];
      tl.seek(0, false);

      // ---- cursor
      tl.fromTo(".ck-cursor", { opacity: 0, x: 1180, y: 700 }, { opacity: 1, duration: 0.2 }, Math.max(0.3, (pts[0]?.t ?? 1) - 0.75));
      let prev = { x: 1180, y: 700 };
      const moves = [];
      for (const p of pts) {
        const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
        const move = Math.min(0.62, Math.max(0.42, dist / 900));
        tl.fromTo(".ck-cursor", { x: prev.x, y: prev.y }, { x: p.x, y: p.y, duration: move, ease: "power2.inOut" }, p.t - move - 0.06);
        tl.fromTo(".ck-cursor svg", { scale: 1 }, { scale: 0.84, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.inOut" }, p.t);
        tl.fromTo(".ck-ripple", { scale: 0.3, opacity: 0.9 }, { scale: 1.5, opacity: 0, duration: 0.45, ease: "power2.out" }, p.t);
        moves.push({ t: p.t - move - 0.06, d: move, x0: prev.x, x1: p.x, dist });
        prev = p;
      }
      const last = pts[pts.length - 1];
      if (last) {
        tl.to(".ck-cursor", { x: last.x + 120, y: last.y + 110, duration: 0.8, ease: "power2.inOut" }, last.t + 0.35);
        moves.push({ t: last.t + 0.35, d: 0.8, x0: last.x, x1: last.x + 120, dist: 160 });
      }

      // ---- camera: barely-there nudges, a still hold between them, never two at once
      const shot = (t, dur, f, s) => tl.to(".ck-cam", {
        x: Math.min(0, Math.max(1280 - 1280 * s, 640 - f.x * s)),
        y: Math.min(0, Math.max(720 - 720 * s, 360 - f.y * s)),
        scale: s, duration: dur, ease: "sine.inOut",
      }, t);
      tl.set(".ck-cam", { x: 0, y: 0, scale: 1 }, 0);
      if (opts.camera !== false) {
        const resStart = res.t - 0.1;
        const workStart = typings.length ? typings[0].t0 - 1.05 : (pts[1]?.t ?? res.t) - 0.95;
        // The first nudge only if it finishes with a still second before the result's.
        if (workPt && workStart > 0.6 && workStart + 0.95 + 0.8 <= resStart) shot(workStart, 0.95, workPt, Math.min(MAX_ZOOM, 1.05));
        shot(resStart, 1.0, resPt, Math.min(MAX_ZOOM, 1.07));
        shot(Math.min(res.t + 2.2, DURATION - 1.7), 1.05, { x: 640, y: 360 }, 1);
      }

      // ---- opening: the mark assembles, the wordmark wipes in, the lockup curves into the corner
      const intro = q(".ck-intro"), dock = q(".ck-dock");
      // The closing lands the lockup back in the centre on a beat of the music when
      // there is one, never earlier than the veil allows.
      let land = OFFSET + DURATION + 0.75;
      if (grid) {
        const g = grid.beat ?? grid, lc = land / PACE;
        land = (g.phase + Math.ceil((lc - g.phase) / g.period) * g.period) * PACE;
      }
      const OUT = land - 1.0;
      // The closing line (`closing`) is said as the lockup comes back; the logo holds
      // until it is done.
      const closingEnd = opts.closing ? say(OUT + 0.3 - OFFSET, opts.closing, "closing") + OFFSET : 0;
      const HOLD_END = Math.max(land + 0.95, closingEnd + 0.35);
      const TOTAL = HOLD_END + 0.5, LENGTH = TOTAL / PACE;
      const sc = fit(), sr = stage.getBoundingClientRect(), ir = intro.getBoundingClientRect(), lr = dock.getBoundingClientRect();
      const iw = ir.width / sc, ih = ir.height / sc;
      const dockX = (lr.left - sr.left) / sc + (lr.width / sc - iw * 0.2), dockY = (lr.top + lr.height / 2 - sr.top) / sc - (ih * 0.2) / 2;
      const blades = [...intro.querySelectorAll("polygon")];
      blades.forEach((p) => {
        const b = p.getBBox(), dx = b.x + b.width / 2 - 129.5, dy = b.y + b.height / 2 - 127.8, l = Math.hypot(dx, dy) || 1;
        p.dataset.dx = dx / l; p.dataset.dy = dy / l;
      });
      const master = gsap.timeline({ paused: true });
      master.set(intro, { x: (1280 - iw) / 2, y: (720 - ih) / 2, scale: 1, opacity: 1, zIndex: 25 }, 0);
      master.fromTo(blades,
        { opacity: 0, scale: 0.5, rotation: -55, x: (i, el) => el.dataset.dx * 150, y: (i, el) => el.dataset.dy * 150, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, rotation: 0, x: 0, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.06 }, 0.1);
      master.fromTo(".ck-rot", { rotation: 0, svgOrigin: "129.5 127.8" }, { rotation: 120, duration: 0.7, ease: "power3.inOut" }, 0.7);
      master.fromTo(".ck-intro .ck-wm", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power3.out" }, 0.78);
      // Two eases on the two axes bend the path into a soft arc.
      master.to(intro, { x: dockX, scale: 0.2, duration: 0.9, ease: "power2.inOut" }, 1.5);
      master.to(intro, { y: dockY, duration: 0.9, ease: "power3.inOut" }, 1.5);
      master.add(tl.paused(false), OFFSET);
      // ---- closing: the screen veils over, the docked lockup curves back to the centre
      // along the same arc, turns once more, holds, and fades to the tint the opening starts on.
      const centre = { x: (1280 - iw) / 2, y: (720 - ih) / 2 };
      const nf = { immediateRender: false };
      master.set(intro, { zIndex: 31 }, OFFSET + DURATION - 0.55);
      master.fromTo(intro, { x: dockX, scale: 0.2 }, { x: centre.x, scale: 1, duration: 1.0, ease: "power2.inOut", ...nf }, OUT);
      master.fromTo(intro, { y: dockY }, { y: centre.y, duration: 1.0, ease: "power3.inOut", ...nf }, OUT);
      master.fromTo(".ck-rot", { rotation: 120 }, { rotation: 240, duration: 0.9, ease: "power3.inOut", ...nf }, OUT + 0.25);
      master.fromTo(intro, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power2.in", ...nf }, HOLD_END);
      master.set({}, {}, TOTAL);
      master.seek(0, false);

      // ---- sound, from the same times as the picture
      const C = (x) => (OFFSET + x) / PACE, M = (x) => x / PACE;
      const cues = [
        ...moves.map((m) => ({ k: "whoosh", t: C(m.t), d: M(m.d), x0: m.x0, x1: m.x1, level: 0.007 + Math.min(0.013, m.dist / 44000) })),
        ...pts.map((p) => ({ k: "click", t: C(p.t), x: p.x })),
        // Keys sound at a calm typist's pace, at most about 8 a second, whatever the
        // speed on screen: one per character read as a rattle.
        ...typings.flatMap((ty) => {
          const keys = [];
          let last = -Infinity;
          for (let i = 0; i < ty.n; i++) {
            const at = C(ty.t0 + i * ty.dt);
            if (at - last < 0.12) continue;
            keys.push({ k: "key", t: at + (((i * 37) % 7) - 3) * 0.004, x: center(ty.el).x, n: keys.length });
            last = at;
          }
          return keys;
        }),
        ...results.map((r) => ({ k: r.cue, t: C(r.t), x: resPt.x })),
      ];
      const soundtrack = () => renderSoundtrack(cues, LENGTH);

      // ---- recorder contract
      window.seekClip = (t) => { master.seek(Math.min(t * PACE, TOTAL - 0.0001), false); };
      // The timeline in clip seconds, for whatever is scored against it (the music).
      const beats = [
        ...pts.map((p) => ({ k: "click", t: C(p.t) })),
        ...typings.map((ty) => ({ k: "type", t: C(ty.t0), end: C(ty.end) })),
        ...results.map((r) => ({ k: "result", t: C(r.t) })),
        ...chapters.map((c) => ({ k: "chapter", t: C(c.t), end: C(c.end), text: c.text })),
        ...(chapters.hook ? [{ k: "hook", t: C(chapters.hook.t), end: C(chapters.hook.end), text: chapters.hook.text }] : []),
        { k: "outro", t: OUT / PACE, land: land / PACE },
      ].sort((a, b) => a.t - b.t);
      // The narration in declaration order (the order CLIP_VO follows), in clip seconds.
      const narration = said.map((s) => ({ k: s.kind, t: C(s.t), d: s.d, text: s.text }));
      window.CLIP = { duration: LENGTH, fps: FPS, ready: true, beats, narration, opening: OFFSET / PACE, audioWav: async () => toBase64(wav(await soundtrack())) };
      q(".ck-meta").textContent = `${LENGTH.toFixed(1)} s · ${FPS} fps · 1280×720`;
      if (capture) return;
      player(LENGTH, soundtrack);
    }

    // ---- preview player (not part of what is filmed)
    function player(LENGTH, soundtrack) {
      const scrub = q(".ck-scrub"), clock = q(".ck-clock"), playBtn = q(".ck-play"), soundBtn = q(".ck-sound");
      scrub.max = LENGTH.toFixed(3);
      let t = 0, playing = true, last = null, actx = null, buf = null, src = null, audioStart = 0, soundOn = false;
      const stopAudio = () => { if (src) { try { src.stop(); } catch (e) {} src.disconnect(); src = null; } };
      // While sound is on the audio clock drives the picture, so they cannot drift apart.
      const startAudio = () => {
        stopAudio();
        if (!soundOn || !playing || !buf) return;
        src = actx.createBufferSource(); src.buffer = buf; src.connect(actx.destination);
        src.start(0, t); audioStart = actx.currentTime - t;
      };
      const draw = () => { window.seekClip(t); scrub.value = t.toFixed(3); scrub.style.setProperty("--p", (t / LENGTH) * 100 + "%"); clock.textContent = t.toFixed(2) + " s"; };
      const setPlaying = (p) => { playing = p; last = null; playBtn.innerHTML = p ? ICON_PAUSE : ICON_PLAY; playBtn.setAttribute("aria-label", p ? "Pause" : "Play"); p ? startAudio() : stopAudio(); };
      playBtn.addEventListener("click", () => setPlaying(!playing));
      scrub.addEventListener("input", () => { setPlaying(false); t = +scrub.value; draw(); });
      soundBtn.addEventListener("click", async () => {
        soundOn = !soundOn;
        soundBtn.textContent = soundOn ? "Sound on" : "Sound off";
        soundBtn.setAttribute("aria-pressed", String(soundOn));
        if (!soundOn) return stopAudio();
        try { actx ??= new AudioContext(); await actx.resume(); buf ??= await soundtrack(); startAudio(); }
        catch (e) { soundOn = false; soundBtn.textContent = "Sound unavailable"; }
      });
      const tick = (now) => {
        if (playing) {
          if (src) { t = actx.currentTime - audioStart; if (t >= LENGTH) { t = 0; startAudio(); } draw(); }
          else if (last !== null) { t = (t + (now - last) / 1000) % LENGTH; draw(); }
          last = now;
        }
        requestAnimationFrame(tick);
      };
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setPlaying(false); t = LENGTH - 2.5; draw(); } else setPlaying(true);
      requestAnimationFrame(tick);
    }
  }

  window.ClipKit = { scene, PACE, OFFSET, FPS };
})();
