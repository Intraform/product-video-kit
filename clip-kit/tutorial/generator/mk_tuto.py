"""Builds a tutorial scene from base.html (the debug tutorial's frame): same window, chat,
cursor, camera, title, sound design and recorder contract; each tutorial brings its own
pages, CSS and steps.
    python3 mk_tuto.py <tuto dir> <out.html>
<tuto dir> holds meta.json (title, starts, duration, common), voice.json (from
../../tools/voice.ts), pages.html, steps.js and optionally extra.css: see ../src/, one per tutorial.
Write <out.html> in clip-kit/tutorial/: the scene loads ../icons.js and ../key-sprite.js."""
import json, re, sys, os
T, OUT = sys.argv[1], sys.argv[2]
HERE = os.path.dirname(os.path.abspath(__file__))
base = open(os.path.join(HERE, "base.html")).read()
meta = json.load(open(f"{T}/meta.json"))
voice = json.load(open(f"{T}/voice.json"))
pages = open(f"{T}/pages.html").read()
css = open(f"{T}/extra.css").read() if os.path.exists(f"{T}/extra.css") else ""
COMMON = os.path.join(HERE, "common.css")
if meta.get("common"): css = open(COMMON).read() + css
steps = open(f"{T}/steps.js").read()

def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i)
    return s[:i] + new + s[j:]

s = base
s = s.replace("<title>Debug a failed run</title>", f"<title>{meta['title'][0]} {meta['title'][1]}</title>")
camlayer = ""
if "<!--CAM-->" in pages:
    pages, camlayer = pages.split("<!--CAM-->", 1)
s = cut(s, '      <div class="main">\n', '    <div class="halo" id="halo"></div>', '      <div class="main">\n' + pages + '\n      </div>\n    </div>\n' + camlayer + '\n')
s = re.sub(r'<div class="title" id="h0">.*?</div>', f'<div class="title" id="h0"><span class="ln">{meta["title"][0]}</span><span class="ln acc">{meta["title"][1]}</span></div>', s, count=1)
s = s.replace('<div class="dc">Docs · AI sessions</div>', f'<div class="dc">{meta.get("docs", "Docs · AI sessions")}</div>')
s = s.replace("  /* the tutorial's own layer */", css + "\n  /* the tutorial's own layer */")
# the step label sits over the window when the camera zooms: it keeps its own background
s = s.replace("  .step b {", "  .step { z-index: 60; padding: 5px 11px 5px 6px; border-radius: 8px; background: rgba(255,255,255,.94); box-shadow: 0 6px 18px -10px rgba(29,36,48,.35); }\n  .step b {", 1)
s = re.sub(r"const DURATION = [\d.]+;", f"const DURATION = {meta['duration']};", s)
s = re.sub(r"const STARTS = \[.*?\];", f"const STARTS = {json.dumps(meta['starts'])};", s)
s = re.sub(r"const LINES = \[.*?\];", lambda m: f"const LINES = {json.dumps(voice['lines'])};", s, flags=re.S)
# the steps replace everything between the title card and the end card
s = cut(s, "    // 0. the result first", "    // end card", "    // the step label and the cursor appear with the first step that needs them\n    gsap.set([\"#step\", \"#cursor\"], { opacity: 0 });\n" + steps.rstrip() + "\n\n")
LAZY = """
    // Targets are measured when the action happens, in the camera's space, so a panel that
    // slides or a camera that moves never sends the cursor beside its target.
    const toCam = (r) => { const X = gsap.getProperty("#cam", "x"), Y = gsap.getProperty("#cam", "y"), K = gsap.getProperty("#cam", "scale"); return { x: (r.x - X) / K, y: (r.y - Y) / K, w: r.w / K, h: r.h / K, cx: (r.cx - X) / K, cy: (r.cy - Y) / K }; };
    const at = (sel) => toCam(R(sel));
    const moveTo = (sel, t, d = 0.7) => tl.to("#cursor", { x: () => at(sel).cx - 3, y: () => at(sel).cy - 2, duration: d, ease: "power2.inOut" }, t);
    const near = (sel, dx, dy, t) => tl.set("#cursor", { opacity: 1, x: () => at(sel).cx + dx, y: () => at(sel).cy + dy }, t);
    const haloOn = (sel, t) => { tl.set("#halo", { left: () => at(sel).x - 3, top: () => at(sel).y - 3, width: () => at(sel).w + 6, height: () => at(sel).h + 6 }, t); tl.fromTo("#halo", { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.25, immediateRender: false }, t); };
    const click = (sel, t) => {
      CLICKS.push({ t, sel });
      moveTo(sel, t - 0.75);
      haloOn(sel, t - 0.25);
      tl.to("#cursor", { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1, transformOrigin: "3px 2px" }, t);
      tl.to(sel, { scale: 0.95, duration: 0.08, yoyo: true, repeat: 1 }, t);
      tl.to("#halo", { opacity: 0, duration: 0.3 }, t + 0.35);
      cue("click", t, { x: R(sel).cx });
    };
    const ring = (sel, t, d = 1.2) => { haloOn(sel, t); tl.to("#halo", { opacity: 0, duration: 0.3 }, t + d); };
"""
s = s.replace("    const [L1, L2, L3, L4, L5, L6, L7, L8, L9] = STARTS;", LAZY + "    const [L1, L2, L3, L4, L5, L6, L7, L8, L9] = STARTS;", 1)
# the debug scene's own window state does not apply to other tutorials
s = s.replace('    gsap.set("#drawer", { x: 480 });\n', "")
# every symbol the scene uses, from symbols.svg (Lucide paths: a new icon is added there)
syms = {m.group(1): m.group(0) for m in re.finditer(r'  <symbol id="([^"]+)".*?</symbol>\n', open(os.path.join(HERE, "symbols.svg")).read(), re.S)}
need = sorted(set(re.findall(r'["\']#(i-[a-z0-9]+|mark)["\']', s)))
missing = [k for k in need if k not in syms]
assert not missing, missing
s = re.sub(r'<svg width="0" height="0" style="position:absolute">\n.*?</svg>', lambda m: '<svg width="0" height="0" style="position:absolute">\n' + "".join(syms[k] for k in need) + "</svg>", s, count=1, flags=re.S)
# once the title has left, its (transparent) box must not sit over the window
s = s.replace('tl.to("#h0 .ln", { opacity: 0, y: -6, duration: 0.35, stagger: 0.04, ease: "power1.in" }, 2.2);', 'tl.to("#h0 .ln", { opacity: 0, y: -6, duration: 0.35, stagger: 0.04, ease: "power1.in" }, 2.2);\n    tl.set("#h0", { opacity: 0 }, 2.65);', 1)
assert 'tl.set("#h0", { opacity: 0 }, 2.65)' in s
s = s.replace("const [L1, L2, L3, L4, L5, L6, L7, L8, L9] = STARTS;", "const [L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11, L12] = STARTS;")
# the base's eager cursor helpers give way to the lazy ones above
s = cut(s, "    // the cursor travels to a target", "    const type = ", "")
s = s.replace("  const cues = [];", "  const cues = [];\n  const CLICKS = [];", 1)
s = s.replace("window.CLIP = { duration: DURATION, fps: 30, ready: false, cues,", "window.CLIP = { duration: DURATION, fps: 30, ready: false, cues, clicks: CLICKS,", 1)
assert "clicks: CLICKS" in s and "const CLICKS" in s
s = s.replace("  #cursor { position: absolute;", "  #cursor { pointer-events: none; position: absolute;", 1)
open(OUT, "w").write(s)
print("ok", len(s))
