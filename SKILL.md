---
name: viral-launch-film
description: Make a launch film for any product by remixing a proven viral launch video. Includes a local library of 68 viral launch films (what each looks like and why it worked), a message-first prompt system, and a canvas film engine that renders 4K in 16:9 and 9:16. Use for "make a launch video", "launch film", "product announcement video", "remix this viral video", "/viral-launch-film".
---

# Viral launch film

You help the user make a short launch film (15 to 30 s) for their product by copying the MAGIC of a launch video that already went viral. Never copy pixels, logos or footage. Copy the structure and the reason it worked.

Folder layout (this skill's folder):
- `questions.md` the brand questions (step 1).
- `library/` the 68 viral launch films: `catalog.json` (product, handle, link, views, likes, length, boost = Organic / Partly boosted / Boosted, format = Landscape / Vertical / Square with w and h, look, why it worked) and `previews/` (the first seconds of each, muted, for reference). Open with `./start.command` (Mac) or `sh start.sh`, then http://localhost:4321/library/
- `prompts/prompts.js` the prompt system (same steps as below), shown in the library.
- `engine/` the film engine: `brand.json` (their brand, read by every film), `shoot.mjs` (real screenshots, desktop 2x and phone 5x), `kit.js` (helpers + components), `films/example.js` (a complete film to copy), `film.html` (live preview with a scrubber), `export.mjs` (4K render), `mix.py` (sounds + music), `sfx/` (CC0 clicks).

## Setup (when the user asks to "set up viral-launch-film", or before the first render)
Do it for them, step by step, and say what you did:
1. Check `node -v` (needs 18 or newer) and `ffmpeg -version`. If either is missing on a Mac with Homebrew: `brew install node ffmpeg`. No Homebrew: give the one-line install from https://brew.sh and wait.
2. Run `npm install` inside this skill's `engine/` folder.
3. Render the example to prove it works: `node export.mjs example` in `engine/`. If Chrome for puppeteer is missing, set `PUPPETEER_EXECUTABLE_PATH` to their Chrome or Brave app.
Tell them: "Ready. Say what your product is."

## The process (always in this order)

0. **Open the library first.** Start it in the background from this skill's folder (`sh start.sh`, or `python3 -m http.server 4321 --bind 127.0.0.1` in this folder) and open http://localhost:4321/library/ for the user. If port 4321 is busy, use the next free port. Hover-to-play, big view counts, filters for category, Organic / Partly boosted / Boosted, and shape (16:9, 9:16, 1:1).
1. **Ask about their brand (once).** If `~/.viral-launch-film/brand.json` exists, load it and only confirm (see `questions.md`). Otherwise send the question block in `questions.md` as ONE message. "go" = the defaults. Then write `engine/brand.json` (name, colours, logo, button text, end-card items) and screenshot their real product with `node shoot.mjs <url> <name>` and `--mobile` (run inside `engine/`). Show them what you picked in 3 lines. Save everything to `~/.viral-launch-film/` (brand.json, brand.md with their answers and notes, shots/) so they never answer twice. Read `brand.md` Notes before every film.
2. **Message first.** Propose 3 one-line takeaways (concrete: a number, a before/after, or one use case). The user picks one. Everything that does not serve it gets cut.
3. **Pick a reference.** Search `library/catalog.json` by category, goal and shape (`format` Landscape for X, Vertical for Reels/TikTok/Shorts). Suggest 2 or 3 films, named exactly as in the library so they can hover and watch. **Prefer `"boost": "Organic"`**: those views were earned, so the idea is proven. `Boosted` and `Partly boosted` films had paid reach; use them for look and polish only, and say so.
4. **Tear it down.** Hook (frame 1 words and picture), first 3 s, every beat with times, camera, type, pace, music feel, ending. Then one sentence: the magic.
5. **Storyboard, then STOP.** Save `storyboard.md`: 6 to 8 boxes with times, what is on screen (their real screenshots), on-screen words (6 words max each) and sound. Wait for the user's sign-off before building.
6. **Build** with the engine: copy `engine/films/example.js` to `engine/films/<name>.js`, keep the timeline shape, use their screenshots with `cover()`. Preview `film.html?f=<name>` and `&v=1`, scrub through both.
7. **Run the check** (prompt 5 in `prompts/prompts.js`). Fix every fail before rendering.
8. **Music and sounds.** Only music the user has a licence for (for example https://www.epidemicsound.com or https://artlist.io). Never ship a preview file. Soft clicks on cuts, never chimes.
9. **Copy.** 4 X posts from proven viral formats (prompt 6) and one caption with hashtags for Reels, TikTok and Shorts.
10. **Render 4K** (`node export.mjs <name>` and `--vertical`, then `python3 mix.py <name> [--vertical] --music <track>`), watch both once start to end, then hand over the files with the copy.

## Rules that make it work (learned the hard way)

- **Frame 1 is the thumbnail on X.** The hook must be readable on frame 1. No fade from black.
- **One use case, shown end to end.** Say it, see it happen, see the result. Two use cases max per film.
- **Every screen is different.** Never show the same page twice in one film or across a series.
- **Real UI.** Use real screenshots of real pages (put them in `engine/shots/`), or a faithful drawing of the actual product. Never a generic mock.
- **Calm camera.** Ease in, hold, read. No zoom yo-yo. Switch pages with a tab click, not a swipe.
- **Text never collides.** Not with the subject, not with props in a photo, not with other text, never off the edge. Small and clean beats big and crowded.
- **9:16 safe zones.** Instagram covers the top 14% and the bottom 35%. Every word sits between 14% and 65% of the height. Press G in the preview to see the zones. Frame the page as a card with an even border (dark texture), never a flat bar on top.
- **The ending clicks.** "[Lead] [item 1]" -> click -> "[item 2]" -> click -> brand alone -> CTA button pops in -> one subline. Each click on a music beat. No glitch, no swipe.
- **Grammar is checked** in every on-screen line.
- **4K by default** (the exporter draws at 2x). Screenshots at 2x (desktop) or 5x (phone) so nothing is upscaled.

## Engine in one minute

A film is one pure function `draw(x, t)`. Same `t`, same frame. That is what makes 4K export exact.

```js
const T={hook:0,screen:2.2,listen:3.4,confirm:6.8,sent:8.6,answer:10.2,end:14.2},DUR=18.2;   // the timeline
film({dur:DUR, events:[{t:T.sent,s:'click_send',v:.4}], draw(x,t){
  glowBg(x,FW,FH,t);                                  // background
  if(t<T.screen) txt(x,'Your hook.',FW/2,FH*.42,{f:`600 96px ${FONT}`,al:'center'});
  if(t>=T.screen&&t<T.end) browser(x,X,Y,w,h,{url:'yourapp.com',content:(x,X,Y,w,h)=>cover(x,IMG.page,X,Y,w,h)});
  if(t>=T.end) endCard(x,FW,FH,t,T.end,{lead:'Built for',items:['Claude Code','Codex'],brand:'YourBrand',cta:'Try it free',sub:'Mac and Windows'});
}});
```

Helpers in `kit.js`: `txt`, `wrap`, `rr`, `cover`, `loadImg`, `spoken` (words appear as you talk), `grain`, `glowBg`, `browser`, `commandCard` (states: listen, confirm, sent, answer), `endCard`, eases `eo eio eb`, `seg(t,a,b)` (0 to 1 between two times). `FW, FH` are 1920x1080, or 1080x1920 with `?v=1`. Load a screenshot with `load:[loadImg('page','shots/page.png')]` in the film definition.

Commands (run inside `engine/`, once: `npm install`, and ffmpeg installed):
```
open http://localhost:4321/engine/film.html?f=myfilm      # preview, scrub, G = safe zones
node export.mjs myfilm                                     # 4K 16:9 -> out/myfilm.mp4
node export.mjs myfilm --vertical                          # 4K 9:16 -> out/myfilm_v.mp4
python3 mix.py myfilm --music my-licensed-track.mp3        # clicks + music -> out/myfilm_final.mp4
```
If Chrome for puppeteer is not installed, set `PUPPETEER_EXECUTABLE_PATH` to your Chrome or Brave app binary.

## Never
- Never download or re-upload someone else's viral video. Link to it.
- Never use music or sounds without a licence. Never post a preview track.
- Never claim what the product cannot do. Say "beta" when it is beta.
