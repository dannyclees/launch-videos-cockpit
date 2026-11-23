# Brand questions (send the block between the lines as ONE message)

**Remember first.** If `~/.viral-launch-film/brand.json` exists, do NOT ask again. Copy it (and `~/.viral-launch-film/shots/`) into `engine/`, then say in 2 lines: "Using your saved brand: <name>, <accent>, button "<cta>". Change anything?" Only ask the questions they want to change.

Skip anything the person already told you. If they say "go", use the defaults in brackets and say what you picked in one line.

---
Quick questions so the film looks like YOUR brand (answer in any order, or say "go" for my defaults):

1. **Product:** name, and what it does in one line.
2. **Who is it for?** (for example: founders, designers, coaches)
3. **The ONE thing to show working.** One task, start to finish. (default: the main thing it does)
4. **Your real product:** a link I can screenshot, or screenshots you drop in. (default: I screenshot your homepage)
5. **Brand colours:** main colour and accent, as hex codes or words. (default: I take them from your site)
6. **Logo:** a file (SVG or PNG), or say "use the one on my site".
7. **Button text and link** for the ending. (default: "Try it free" + your site)
8. **Where it goes and how long:** X (16:9), Reels / TikTok / Shorts (9:16), or both. 15, 20 or 30 seconds. (default: both, 20 s)
9. **Feel:** calm and premium, bold and loud, playful, or cinematic. Or name a film from the library. (default: calm and premium)
10. **Music:** a track you have a licence for, or none for now. (default: none, clicks only)

Optional, only if you have them:
11. **Brand guidelines or fonts:** a link or file. (default: clean modern font, your colours)
12. **Words you always use, or never use** on screen.
13. **A launch video you love,** from the library or anywhere. I copy its magic, not its pixels.
14. **Proof you can show:** a real number, a customer, a result. (default: the product working is the proof)
---

## What Claude does with the answers
1. Writes `engine/brand.json` (fields below, without `"example"`). Every film reads it.
   **Saves a copy to `~/.viral-launch-film/brand.json`** and the screenshots to `~/.viral-launch-film/shots/`, so the answers survive a skill update and are never asked twice.
   Also writes `~/.viral-launch-film/brand.md`: every answer in their words (audience, the one use case, feel, music, links), plus a "Notes" list. When they give feedback on a film ("too fast", "logo bigger"), add it to Notes and follow it in every film after.
2. Screenshots their real product: `node shoot.mjs <url> <name>` (desktop, 2x) and `node shoot.mjs <url> <name> --mobile` (phone, 5x), into `engine/shots/`.
3. If they gave no colours or logo, read them from their site (CSS colours, the logo in the header or the favicon) and show what was picked.

`engine/brand.json` fields:
```json
{
  "name": "Nimbus",
  "line": "Summarize any thread in one sentence",
  "accent": "#BFF549",
  "bg": "#0b0d0c",
  "ink": "#ffffff",
  "glow1": "#1f6f5a",
  "glow2": "#3b3bd6",
  "logo": "shots/logo.svg",
  "cta": "Try it free",
  "sub": "Mac and Windows",
  "lead": "Built for",
  "items": ["Claude Code", "Codex"],
  "agent": "Claude Code"
}
```
