/* The prompt system. Shown on the library's "How it works" and "Prompts" tabs. Same text as SKILL.md, so people without the skill can still copy it. */
window.PROMPTS={
steps:[
 ['Pick the message','Write the ONE thing a stranger should remember after 20 seconds. Claude proposes 3 takeaways, you pick one. Everything else gets cut.'],
 ['Pick a viral reference','Find a film in the library that already proved a structure like yours. Prefer Organic ones: their views were earned. Copy its magic (the reason it worked), not its pixels.'],
 ['Tear it down','Beat by beat: hook, first 3 seconds, camera, type, pace, music feel, ending. Write down what made it work.'],
 ['Storyboard, then sign off','6 to 8 boxes with timings. One use case, shown end to end, on a real screen. Nothing gets built until you say yes.'],
 ['Build it with the engine','Copy engine/films/example.js, change the words, the page and the brand. Preview at film.html?f=yourfilm and scrub through it.'],
 ['Run the check','Hook readable on frame 1. No repeated screens. Text inside the safe zones on 9:16. Real UI, not a fake one. One clear ending.'],
 ['Music and sounds','Only music you have a licence for (Epidemic Sound, Artlist, your own). Small clicks on every cut, never a ding.'],
 ['Copy from a proven post','Write the X post from a format that already went viral (see the Prompts tab). Wow hook, a number in line 2, no hashtags on X.'],
 ['Render 4K and post','node export.mjs yourfilm (16:9) and --vertical (9:16). Mix with mix.py. Post the 16:9 to X, the 9:16 to Reels, TikTok and Shorts.']
],
remix:`Use the viral-launch-film skill.

REFERENCE (a viral launch film, copy its magic, not its pixels)
- {{product}} by @{{handle}}: {{url}}
- {{views}} views ({{boost}}), {{duration}}, category: {{category}}
- Look: {{look}}
- Why it worked: {{magic}}

MY PRODUCT
- What it is (one line): [ ]
- Who it is for: [ ]
- The ONE use case to show: [ ]
- Brand colour + name: [ ]
- Call to action (e.g. "Try it free"): [ ]

Do this in order and stop for my sign-off after step 3:
1. Propose 3 one-line takeaways. I pick one.
2. Tear down the reference: hook, first 3 s, beats with timings, camera, type, pace, music feel, ending.
3. Storyboard my film on that structure: 6 to 8 boxes with timings, one use case end to end on a real screen.
4. Build it with engine/films/example.js as the base, preview it, run the check, render 4K in 16:9 and 9:16.
5. Write 3 X posts from proven viral formats, plus one caption with hashtags for Reels, TikTok and Shorts.`,
list:[
 ['1. Message first',`Here is my product: [what it is, who it is for].
Before any design, give me 3 different one-line takeaways a stranger should remember after watching a 20-second launch film. Each must be concrete (a number, a before/after, or a single use case). Recommend one and say why.`],
 ['2. Tear down a reference',`Tear down this viral launch film: [link].
Give me: the hook (exact words and what is on screen in frame 1), the first 3 seconds, every beat with start/end times, camera moves, type style and size, pace (cuts per 10 s), music feel (tempo, genre, where it drops), and the ending.
Then in one sentence: the MAGIC, the reason it worked. That is what we copy, not the pixels.`],
 ['3. Storyboard',`Using the teardown and my takeaway "[takeaway]", storyboard a 15 to 25 second launch film for [product].
Rules: hook readable on frame 1; ONE use case shown end to end on a real screen; every screen different (no repeats); one idea per shot; end card = "[lead] [item 1]" -> "[item 2]" -> brand + CTA, each a hard cut on the beat.
Give 6 to 8 boxes: time range, what is on screen, on-screen words (6 words max), sound. Then stop and wait for my sign-off.`],
 ['4. Build',`Build the signed-off storyboard with the film engine in engine/.
Copy engine/films/example.js to engine/films/[name].js. Keep draw(x,t) pure (same t = same frame). Use the timeline object T for every beat, browser() for real pages (screenshots go in engine/shots/ and are drawn with cover()), commandCard() for the product moment, endCard() for the ending.
Open film.html?f=[name] and film.html?f=[name]&v=1, scrub through both, fix anything that overlaps or is too small.`],
 ['5. The check (run before every render)',`Check [name] against this list and fix every fail:
- Frame 1 shows the hook, readable at phone size.
- Text never covers the subject or other text; nothing runs off the edge.
- On 9:16 every word sits between 14% and 65% of the height (press G in the preview to see the dead zones).
- One use case, shown end to end. No screen appears twice.
- The product UI looks real (real page or a faithful drawing), not a generic mock.
- Grammar is right in every line.
- The ending: lead line, the items click on the beat, brand, CTA pops in.
- Sounds: a soft click on each cut, no chimes.`],
 ['6. X post from a viral format',`Write 4 X posts for this film. Copy proven formats almost word for word, only swap the nouns:
1. "[New thing] with @[company] is incredible" + one honest line.
2. "If you want to feel what it's like to [outcome], go to [place] right now and say [line]."
3. "How is this even possible?!" + a 3-line list with numbers.
4. "[Product] just gained [N] new superpowers: [A] + [B]".
Rules: wow hook, a number in line 2, no hashtags, no emoji, no em dashes, nothing you cannot prove.
Then one caption for Reels, TikTok and Shorts: hook line, 2 to 3 short lines on what happens, CTA ("link in bio"), 6 to 8 hashtags.`],
 ['7. Render',`Render [name] in 4K:
node export.mjs [name]          -> out/[name].mp4 (3840x2160)
node export.mjs [name] --vertical -> out/[name]_v.mp4 (2160x3840)
python3 mix.py [name] --music my-licensed-track.mp3
python3 mix.py [name] --vertical --music my-licensed-track.mp3
Then watch both final files once, start to end, before posting.`]
]};
