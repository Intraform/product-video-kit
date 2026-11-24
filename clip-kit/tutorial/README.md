# The tutorial format (about 60 to 95 s)

A technical deep dive into one topic, for Windmill's docs and for engineers: not only where to
click, but how it works underneath. It sits next to the narrated clip (`../README.md`, which
sells a feature through a person's story) and the short motion cut (`../short/README.md`, which
makes people want it). Not yet in the engine: `debug.html` ("Debug a failed run with an AI
session") is the first reference; `build.html`, `deploy.html`, `context.html`, `app.html`,
`autonomy.html`, `context-sources.html`, `preview-panel.html`, `resume-session.html`,
`share-artifacts.html` and `admin-settings.html` share its window, cursor, camera and sound
design.

## Who it is for

Engineers evaluating or using Windmill. They want to understand the mechanism (what a draft
is, what Run does, what a fork is) and to see the real artefacts (code, YAML, job results),
not to be sold to.

## The rules

### Content

- **One topic, about a minute.** The title is the topic ("Deploy a session's work to
  production"). About 150 words of narration, at a pace that leaves room to explain: one idea
  per step, the *why* before the *how*.
- **No characters.** No names, no portraits: those belong to the marketing formats. The thread
  is a concrete technical case instead, with real paths (`f/finance/refunds_report`), real code,
  real arguments and a real result.
- **Explain the mechanism behind each action.** The narration says what happens underneath,
  in plain words:
  - a draft is saved on the server, visible only to you, and never runs in production;
  - Run sends a preview job to the queue; a worker runs the draft's code; logs, duration and
    result come back;
  - a fork is a full copy of a workspace (scripts, flows, resources, variables), like a Git
    branch: you deploy there without touching production, then promote through Compare &
    Deploy;
  - Deploy writes a new version of an item, and schedules and triggers run the deployed
    version, never a draft;
  - the AI acts with your own token, on the `u/`, `f/` and `g/` paths you have rights to.
- **Show what engineers want to see.** Each item's code (a script's source, a flow's YAML, an
  app's files, a schedule's cron), the draft-versus-deployed diff, a job's arguments, logs and
  JSON result, references instead of values (`$var:f/finance/slack_webhook`), the AI's tool
  calls (`read_workspace_item`, `write_flow`, `test_run_flow`), and the equivalent outside the
  UI when there is one (the same items as files with `wmill sync pull`, or synced to Git).
- **Motion-design diagrams for what the UI does not show.** A short, plain diagram in Windmill's
  colours when a concept has no screen: a fork branching off its workspace and merging back, a
  job going from the queue to a worker to a result, a draft above the deployed versions. It
  hands over to the UI without a cut, by the short format's rule that the story travels with
  the components.
- **Take the time an overview needs.** A tutorial that covers a whole surface (what a session
  builds) may run past a minute and a half; it is better slow and clear than fast and abrupt.
- **Narration says what the screen shows.** When a line describes a run, the picture is that
  run (the graph lighting step by step), not a different illustration of it. What you give the
  AI shows its effect: a mockup attached to a message is followed by the app redrawn to match
  it, side by side in one shot.
- **Name the breadth when it matters.** A script is not "TypeScript": Windmill runs scripts in
  more than twenty languages, so say so and show them before zooming on the one used.
- **End on something useful.** A one-line conclusion that places the topic in Windmill's whole
  picture (an overview closes on the workspace, everything it built side by side: "build any
  internal software, and keep all of it in one workspace"), then the end card naming the docs
  page.

### Voice and sound

- **the project's ElevenLabs voice, no music.** The narration is read in one take (`f/marketing_product_videos/clip_voice`), and
  the picture is timed to it: each line's start is placed first, from the take's measured
  lengths, and every action lands on the words that name it ("click Run" is the click).
- **Narration that explains.** Second person, direct, technical words used precisely. It names
  the UI's labels and says what the screen cannot (what runs where, what is stored, who can
  see it); it does not read out what the viewer can already read, and it does not sell.
- **Soft sound design.** Clicks and keys only, about 20 LU under the voice (the reference:
  voice −16 LUFS, sound design −38 LUFS).
- **Subtitles burnt into the video, and the same cues as a `.vtt` beside it**, written from the
  same line placement. A narration line is split into cues of at most two short lines (about 84
  characters), cut at a sentence end before a colon, a colon before a comma, and timed in
  proportion to their length. They are drawn in Inter, white on a near-opaque dark box, centred
  at the bottom of the frame. Where the narration spells a symbol out for the voice ("Type
  at"), the subtitle shows the symbol ("Type @").

### Picture

- **A title card first, in the house style.** The topic as a two-line title (66 px, left third,
  the last words in Windmill blue), rising 12 px on an even ease with its lines starting
  hidden, as in the other formats. It stays about 2.5 s and is silent.
- **A lighter, rendered Windmill.** A simplified window: the sidebar with a few greyed entries
  and the page's breadcrumb, enough to know where you are. At each step, draw only what the
  viewer looks at or clicks, and leave the rest out rather than dimming it.
- **Exact words where it matters.** The labels clicked and named are the app's strings, read
  from its code; so is the flow (which page a button opens, what is or is not passed along).
  Write down in the scene any liberty taken.
- **Cursor, halo, camera.** A visible cursor travels to each target; a blue halo marks what it
  is about to press; the camera zooms onto the area of the step and back out between steps.
- **A step label, small.** "n · topic" in the top-left corner, with a white background so it
  stays legible over a zoomed window. It doubles as the video's chapters.
- **Show a run where it really shows.** With a flow's editor open, a test started from the chat
  runs in that editor and paints its graph: steps turn orange while queued or running, then
  green (`getNodeColorClasses`). Show that, not a diagram of a job.
- **Chat messages flow in a column.** Stack the chat's messages in normal flow, not at fixed
  heights, so a bubble that wraps onto two lines pushes what follows instead of covering it.
- **The camera moves sparingly.** At most one zoom per step, kept for what is too small to
  read in the wide shot (typing, a code line, a graph being run, an agent's tools), held while
  it is read, then released. After any camera move the camera stays still at least 2.5 s
  before the next one; a page that changes settles on its own rather than the camera moving
  again. About eight moves in a 90 s tutorial is plenty: chained zooms are hard to follow.
- **The camera never sticks.** A diagram only shows once the camera is back at rest (it resets
  before the diagram fades in), and no zoom lasts more than about nine seconds.
- **Product screens drawn from the code, not from memory.** The flow editor is FlowBuilder's
  (summary, ⋮, Test flow, Deploy; 275×34 nodes on #efeff4; its YAML through ⋮ → Edit in YAML,
  the "OpenFlow" drawer), the pipeline editor is the asset graph's (top-down, Script and Data
  table / Ducklake cards, blue write edges). Anything the scene adds that the app does not
  show (a badge, a toggle) is a liberty to avoid, or to write down.
- **No glitch: every click lands on what it names.** Targets are measured when the click
  happens, not when the timeline is built (a panel still sliding in, or parked off-screen,
  would send the cursor into the void). Before delivery, a check seeks every click and
  confirms the element under the cursor's tip is the target, visible and at rest.

### Process

- **Script before render**, unless the scripts were explicitly delegated.

## Rendering the references

The scenes follow the recorder contract (`window.CLIP.ready`, `window.seekClip(t)`,
`window.CLIP.audioWav()` for the sound design) and load `../icons.js` and `../key-sprite.js`.
Their timeline is built once fonts are in. `STARTS` holds each narration line's start; the
voice take's cuts are placed at those starts, mixed with the sound design (limiter `level=0`),
and the same placement writes the `.vtt`; `python3 chunk_vtt.py <in.vtt> <out.vtt>` splits it
into short cues and `node burn_subs.mjs <in.mp4> <in.vtt> <out.mp4>` burns them in (each cue
drawn by the browser as a transparent PNG, overlaid by ffmpeg for its time range). `window.CLIP.clicks` lists every click (time and
target) for the pre-delivery check: `node check_clicks.mjs <scene.html>` (Playwright) seeks each
one and reports any click whose target is not under the cursor's tip, hidden, or moving; it then
samples the picture every 0.25 s and reports a diagram shown during a zoom, a zoom held too long,
chat text blocks overlapping, a halo drawn around an element with no size, and camera moves
chained with less than 2.5 s of stillness between them.
A frame every two seconds is reviewed by eye before delivery.

## Making a new tutorial

The scenes are generated, not written by hand: `generator/mk_tuto.py` takes `generator/base.html`
(the debug tutorial's frame: window, chat, cursor, camera, title, sound, contract) and fills it
with one tutorial's sources from `src/<name>/`:

| File | Holds |
|---|---|
| `meta.json` | The title's two lines, each narration line's start (`starts`), the length (`duration`), `common: true` to add `generator/common.css`, and `subtitles`: what the voice spells out → what the subtitle shows (`{"Type at,": "Type @"}`) |
| `lines.json`, `voice.json` | The narration, and its take (`../tools/voice.ts`) |
| `pages.html` | The screens the tutorial shows, inside the window (a `<!--CAM-->` part goes outside it, in the camera's layer) |
| `extra.css` | Their styles |
| `steps.js` | The timeline: clicks, typing, camera, with the helpers the generated scene defines (`click`, `near`, `ring`, `moveTo`, `at`, `cam`, `show`, `type`) |

`python3 generator/mk_tuto.py src/<name> <name>.html` writes the scene here. The ten scenes
other than `debug.html` (the frame itself) regenerate byte for byte from their sources. A new icon (a Lucide path) goes into
`generator/symbols.svg`. Then: `node check_clicks.mjs <name>.html`, stills, and render, mix
and subtitles with `../tools/` (its README has the steps). `src/app/` is a good one to start from.

On Windmill, `f/marketing_product_videos/render_tutorial` (chromium workers)
does the same from `src/<name>/` at a branch or commit, or from sources given inline. It
generates the scene, voices it with a kept take (`take`: a storage folder with `voice.wav` and
`voice.json`; the eleven tutorials' takes are under `f/marketing_product_videos/clips/tutorials/<name>/take/`)
or a new one, films it at 1920×1080 and publishes the MP4 with its `.vtt`, in about 3 minutes.
