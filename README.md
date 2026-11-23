# Viral launch film (Claude Code skill)

Make a launch film for anything, by remixing a launch video that already went viral.

## What is inside
- **Library:** 68 viral launch videos from X (10 categories). Hover to play a 6-second preview, filter by Organic / Partly boosted / Boosted, click for what it looks like, why it worked, "Full video on X" and a one-click "Copy remix prompt".
- **Prompt system:** 9 steps, message first, plus copy-paste prompts (also on the library's Prompts tab).
- **Film engine:** draw a film in code, preview it with a scrubber, render 4K in 16:9 and 9:16. Includes a complete example film.

## Set up (2 minutes)
1. Unzip this folder into `~/.claude/skills/` so you have `~/.claude/skills/viral-launch-film/SKILL.md`.
2. Open the library: double-click `start.command` (Mac) or run `sh start.sh`. It opens http://localhost:4321/library/
3. For rendering, you also need Node 18+ and ffmpeg. Run once inside `engine/`: `npm install`

## Your brand, remembered
The first time, Claude asks about your brand: product, audience, the one thing to show, colours, logo, button, feel and music. It screenshots your real product for you. It saves the answers in `~/.viral-launch-film/`, so you answer once. Every film after uses them, and your feedback becomes notes it follows.

## Use it
In Claude Code, type `/viral-launch-film` and say what your product is. Or pick a video in the library, click "Copy remix prompt", fill in your product and paste it into Claude Code.

Example film: open http://localhost:4321/engine/film.html?f=example (add `&v=1` for 9:16). Finished example renders (1080p copies, to keep the download small) are in `examples/`. Your own renders come out in 4K.

## Licences
- The viral videos belong to their creators. The library holds 6-second muted previews for study only, and links to the full post on X. Do not re-upload them.
- Bring your own licensed music (Epidemic Sound, Artlist, or your own).
- `engine/sfx/` click sounds: Kenney (kenney.nl), CC0, free to use.
- Fonts load from Google Fonts (Geist, Geist Mono, SIL Open Font License).
