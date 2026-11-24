# tools

The local production tools for a hand-built clip (a short in `../short/`, an explainer in
`../explainer/`, a tutorial in `../tutorial/`), run on a Mac. On Windmill, the template's
scripts make the tutorials without them.

`npm install` in `clip-kit/` once (and `npx playwright install chromium` if Playwright has
no Chromium yet): it serves these tools and `../tutorial/`'s. ffmpeg, Python 3 and Bun come
from the system.

| Tool | Does |
|---|---|
| `stills.mjs <scene.html> <t1,t2,…> <prefix>` | JPEG stills at those times, and any page error: review a scene before rendering it |
| `voice.ts <lines.json> <dir>` | Reads the narration in one take (`f/marketing_product_videos/clip_voice`, the project's ElevenLabs voice) into `voice.wav` and `voice.json`, and prints each line's length |
| `render.mjs <scene.html> <prefix> [scale]` | Films the scene with motion blur: `<prefix>.video.mp4` and its sound design `<prefix>.sfx.wav`. Scale 2 is 2560×1440 |
| `mix.py <dir> <out.mp4> [--scene …] [--music …]` | Places each line of the take at its `STARTS`, mixes it with the sound design at -16 LUFS, and writes `<out>.vtt` |
| `thumbnails/render.mjs <set.mjs> <dir> [name…]` | A set's YouTube thumbnails and its square playlist image |

## Making a clip

1. Write the script and get it approved before anything is rendered.
2. Build the scene, check it with `stills.mjs`.
3. `bun voice.ts lines.json <dir>`, then set the scene's `STARTS` from the printed
   lengths (a 1–2 s gap after each line, more where the picture needs time) and
   `DURATION` to the last start plus that line's length and the closing logo.
4. `node render.mjs <dir>/scene.html <dir>/scene 2` (about 10 minutes for 2 minutes of clip).
5. `python3 mix.py <dir> <dir>/clip.mp4`: the YouTube version, with its `.vtt`.
6. To share it where subtitles cannot be turned on, burn the subtitles in a 1080p copy: `ffmpeg -i clip.mp4 -vf
   scale=1920:1080:flags=lanczos -c:v libx264 -crf 18 -c:a copy clip-1080.mp4`, then
   `node ../tutorial/burn_subs.mjs clip-1080.mp4 clip.vtt clip-subs.mp4`.
7. Keep the scene, `voice.json`, the MP4s and the `.vtt` in your workspace storage: the
   scratch copies do not last. The take's music, if any, is under `f/marketing_product_videos/clips/local/`.

YouTube gets the version without burnt-in subtitles plus the `.vtt`, so a viewer can
turn them off or have them translated. Technical explainers have no music.

## Thumbnails

`thumbnails/ai-sessions.mjs` is the AI Sessions playlist; a new set is a module of the
same shape, drawn with `thumbnails/parts.mjs`. The style came out of four rounds of review:

- The title on the left, in Inter 600 (78 px, smaller when a line is too long), up to
  three lines, one phrase in Windmill blue; the logo bottom left; `#f8f9fb`, no gradient.
- On the right, one simple illustration of the idea, drawn with product elements: chat
  bubbles, flow nodes, mono paths, pills, toggles, a short diff, grey bars for filler.
- Not a crop of the video (unreadable once reduced), not a faithful copy of a screen (too
  dense), and no icons in pastel tiles, sparkles or giant icons (they read as AI filler).
  No indigo or violet.
- A tutorial's title says what you will do, verb first: "Build a flow by chatting with
  the AI". Anything shown is real: settings, labels and buttons as the product has them.
- A playlist image is square: YouTube refuses 16:9.
- The blog covers (`thumbnails/blog.mjs`, 1200×630, one entry per post slug) follow the
  same rules, so a post and its video look alike. The blog index shows a cover about 230 px
  wide: keep its title short and the illustration's elements bigger than on YouTube.
