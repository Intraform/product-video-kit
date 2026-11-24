---
name: tutorial-series
description: Make a batch of narrated tutorial videos on one Windmill topic (AI Sessions, data pipelines…), from the list of tutorials to private YouTube uploads with subtitles, thumbnails and a playlist. Use whenever asked for a series, batch or playlist of tutorials or tutorial videos on a theme.
---

# A tutorial series

The AI Sessions playlist (11 tutorials, an intro and an overview) is the reference. Each
step ends with something shown to the requester; nothing goes further without their go.

The rules for the content and the picture are in `clip-kit/tutorial/README.md`, the tools and
the thumbnail style in `clip-kit/tools/README.md`. Read both first. This file is the order of
the work and what each step is checked against.

## 1. The list (approval)

6 to 12 tutorials, one topic each, about 60 to 95 s. A title says what the viewer will do,
verb first ("Build a flow by chatting with the AI", "Fix a failed run with AI"). An intro
or an overview video is not a tutorial: it is not numbered.

Check every feature, label and setting in the docs (`windmill-labs/windmilldocs`) and in
the frontend's Svelte components (`windmill-labs/windmill`) before proposing it. Nothing
shown may be invented: a thumbnail once showed three settings that do not exist.

## 2. The scripts (approval)

About 150 words each, rules in the tutorial README (the mechanism underneath, a concrete
technical case, no characters). Send every script in full and wait for the go before any
voice is recorded.

## 3. Voice and scene, one tutorial at a time

- `bun clip-kit/tools/voice.ts lines.json <dir>`: the project's ElevenLabs voice, one take. Changing a line
  means a new take of all of them.
- Start from `clip-kit/tutorial/src/app/`: `pages.html` rebuilt from the real screens
  (`clip-kit/screens/`, the Svelte code), `steps.js` for the clicks, typing and camera,
  `meta.json` with `starts` set from the take's line lengths.
- `python3 clip-kit/tutorial/generator/mk_tuto.py src/<name> <name>.html`, then
  `node check_clicks.mjs <name>.html` until it reports nothing, then stills
  (`clip-kit/tools/stills.mjs`) every two seconds, read by eye.

## 4. Render and review

- `node clip-kit/tools/render.mjs <name>.html <dir>/scene 2`: 2560×1440, for YouTube.
- `python3 clip-kit/tools/mix.py <dir> <dir>/<name>.mp4 --scene <name>.html`: voice and sound
  design, no music, and the `.vtt` (`<dir>` holds the take and the render).
- A 1080p copy with the subtitles burnt in (`burn_subs.mjs`) is the review version. Share it
  only when the requester says so. Iterate on their notes. A fix that only
  changes the picture keeps the take.

## 5. Thumbnails (approval)

A set module like `clip-kit/tools/thumbnails/ai-sessions.mjs`: the title, the phrase in
blue, one simple illustration made of product elements. Render the set, show it as one
contact sheet, iterate. The playlist image is the square `cover` entry.

## 6. YouTube

- The playlist: the requester creates it in Studio and gives its link.
- Each video, from your workspace's repository:
  `wmill script run f/marketing_product_videos/publish_to_youtube` with the clean MP4, the `.vtt`, the
  thumbnail (storage keys), the title `[n/N] <Series> tutorial: <title>`, the description,
  the tags and `playlist_id`. It uploads private: the requester publishes from Studio.
- Quota: about 2,100 units per video (upload, captions, thumbnail, playlist) out of 10,000 a
  day. That is 4 videos a day; the quota resets at midnight Pacific time (9:00 in Paris).
  Send them in batches and say what is left for the next day.

## Keeping it

- Commit the series to your fork of this kit through a PR: `src/<name>/`, the
  generated `<name>.html` and `.vtt`, and the thumbnail set.
- Keep the MP4s, takes and thumbnails in your workspace storage, with the YouTube ids.
  Scratch copies do not last.
- Scratch work stays outside the repositories.
