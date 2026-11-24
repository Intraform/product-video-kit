# clip-kit (tutorial format)

The video kit used by the **product videos** template on the Windmill Hub: an AI agent plans
and writes a tutorial with you, records the narration with ElevenLabs, builds the screens in
a sandbox (Claude Agent SDK + headless Chromium), checks them, and renders the MP4.

This repository holds the **tutorial format** only:

| Path | What it is |
|---|---|
| `clip-kit/engine.js`, `base.css`, `key-sprite.js`, `icons.js` | The scene engine and its shared assets |
| `clip-kit/tutorial/README.md` | The rules of a tutorial (the agent reads them) |
| `clip-kit/tutorial/generator/` | Turns a tutorial's sources into one scene |
| `clip-kit/tutorial/check_clicks.mjs` | Checks every click lands on its target |
| `clip-kit/tutorial/src/<name>/` | Four finished tutorials, as references |
| `clip-kit/screens/` | The product's screens, rebuilt in HTML: the source of truth for every screen |
| `clip-kit/tools/` | Thumbnails and tooling notes |
| `.claude/skills/` | How a tutorial series and a YouTube script are written |

The product in the examples is [Windmill](https://www.windmill.dev). To make videos of your own
product, fork this repository, replace `clip-kit/screens/` (and the logo in
`clip-kit/tools/thumbnails/mark.svg`) with your product's, and point the template's kit setting
at your fork.
