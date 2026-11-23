# Die Engine (Repo launch-videos-cockpit)

Ein Film ist **eine reine Funktion `draw(x, t)`**, die das Bild zur Zeit t (Sekunden) auf einen Canvas malt. Dieselbe Funktion läuft live im Browser (mit Schieberegler) und wird Bild für Bild in 4K exportiert.

## Dateien

```
engine/
  kit.js            Bausteine (siehe unten), Canvas 1920×1080 bzw. 1080×1920 (?v=1), Export in 2× = 4K
  film.html         Vorschau: lädt brand.json, dann films/<f>.js   (?f=name &v=1 &l=fr)
  brand.json        Marke: name, accent, bg, ink, glow1, glow2, logo, cta, sub, lead, items, lang
  films/<name>.js   der Film
  texts/<name>.json Texte pro Sprache (nur für mehrsprachige Filme wie lu-launch.js)
  shots/            Fotos und Screenshots (Desktop 2×, Handy 5×)
  sfx/              key_1, key_2, click_send, done (.wav)
  export.mjs        node export.mjs <film> [--vertical] [--lang xx]  → out/<film>[_xx][_v].mp4 + .events.json
  mix.py            python3 mix.py <film> [--vertical] [--lang xx] [--music track.mp3] [--offset 0] → out/…_final.mp4
  shoot.mjs         node shoot.mjs <url> <name> [--mobile] [--full] → shots/<name>.png
catalog.json        68 Launch-Videos (Muster-Bibliothek), index.html zum Ansehen
```

Voraussetzungen: Node 18+, ffmpeg, `npm i puppeteer` im Ordner `engine/`. `render_all.sh` erledigt das und nutzt ein vorhandenes Chromium (`PUPPETEER_EXECUTABLE_PATH`, im Cloud-Container `/opt/pw-browsers/chromium-*/chrome-linux64/chrome`), statt Chrome herunterzuladen.

## Bausteine aus kit.js

| Baustein | Wofür |
|---|---|
| `FW, FH, VERT` | Breite/Höhe, ob Hochformat |
| `seg(t,a,b)`, `lerp`, `clamp` | Zeitfenster 0→1, Interpolation |
| `eo`, `eio`, `eb(u,s)` | Easing: aus, ein-aus, mit Überschwingen (für Pop-ins) |
| `txt(x,s,X,Y,{f,c,al,ls,a})` | Text (Font, Farbe, Ausrichtung, Laufweite, Alpha) |
| `wrap(x,s,maxW)` | Zeilen umbrechen |
| `loadImg(key,src)` + `IMG[key]`, `cover(x,img,X,Y,W,H)` | Bilder laden und füllend zeichnen |
| `glowBg(x,W,H,t)` | dunkler Hintergrund mit zwei wandernden Farbschimmern (glow1/glow2 aus brand.json) |
| `browser(x,X,Y,w,h,{url,content})` | Browserfenster mit Inhalt (Screenshot oder gezeichnet) |
| `commandCard(...)` | KI-Befehlskarte (listen → confirm → sent → answer) – für Software-Launches |
| `endCard(x,W,H,t,t0,{lead,items,brand,cta,sub,accent,ink,step,post})` | Endkarte: lead + items klicken im Takt, dann Marke, Button, Unterzeile |
| `spoken(s,u)` | Wörter erscheinen wie gesprochen |
| `grain(x,W,H,t,a)` | Filmkorn |
| `film({dur,events,load,draw})` | registriert den Film; `events` = Sounds `{t,s,v}`, `load` = Promises, auf die gewartet wird |

## lu-launch.js (Vorlage dieses Skills)

- Sprache: `?l=xx` (export `--lang xx`), sonst `brand.json` → `lang`, sonst `lb`.
- Texte: `texts/<filmname>.json`, Schlüssel `hook1 hook2 caption p1 p2 p3 offer offer_sub lead items cta sub`, optional `d1 d2 d3` (Methoden-Schema statt Foto). Fehlende Schlüssel erscheinen sichtbar als `⟦schlüssel⟧`.
- Zeitplan `T = {hook:0, photo:2.3, proof:6.2, offer:10.4, end:12.6}`, Dauer 16,8 s. Länger/kürzer: Werte in T und `dur` gemeinsam verschieben.
- Zu lange Zeilen werden eingepasst, große Zeilen (hook2, offer) brechen ab 20 % Überlänge auf zwei Zeilen um.
- Foto `shots/hero.jpg` mit langsamem Zoom; fehlt es und gibt es `d1`–`d3`, zeigt der Film drei Kacheln mit aufschnappenden Linien und fließenden Punkten (Methode als Beweis); sonst sichtbarer Platzhalter.
- Beispiel für einen fertigen Film aus der Vorlage: `engine/films/clees-ernster.js` mit `engine/texts/clees-ernster.json`.
- Logo (`brand.json` → `logo`, z. B. `shots/logo.png`) erscheint über dem Markennamen auf der Endkarte.
- Sounds passen sich der Zahl der Gemeinden an (`items`).
- Ruhiges Premium (Muster 7): `EV` leer lassen (Push-Zeile entfernen), dann nur Musik.

## Vorschau ohne Desktop-Browser

```js
// Playwright: Standbilder je Sprache/Format prüfen
await page.goto(`http://127.0.0.1:${port}/film.html?f=kunde&l=fr&v=1`);
await page.waitForFunction('window.__ready===true');
await page.evaluate(t => FILM.paint(t), 0.9);   // Hook
await (await page.$('#c')).screenshot({path: 'hook_fr_v.png'});
```
Gute Prüfzeiten für lu-launch: 0,9 (Hook) · 4 (Foto) · 8,5 (Belege) · 11,5 (Angebot) · 13,4 (Gemeinden) · 15,5 (Marke).

## Referenzfilm ce-launch.js (Premium-Niveau)

`engine/films/ce-launch.js` + `engine/texts/ce-launch.json` (LB/DE/FR, 24,6 s): eigene Bausteine `paper()`, `glass()`, `pill()`, `brush()`, `rise()` (Masken-Reveal), `pop()`, `tick()`, Szenen-Router über Zeitmarken `S`, Layout `LY` (Hochformat mittig im sicheren Bereich, Querformat Text links/Bild rechts). Schriften: `engine/fonts/fonts.css` (Montserrat, IBM Plex Mono, lokal – unabhängig vom Netz beim Export). Für neue Kundenfilme: Datei kopieren, Szenen austauschen, Bausteine behalten.

## Fehlerbilder

| Symptom | Ursache / Lösung |
|---|---|
| Schrift sieht nach Systemschrift aus | Geist kommt von Google Fonts; ohne Netz Fallback. Für Lieferung Netz nötig oder Font lokal einbinden |
| `⟦hook1⟧` im Bild | Schlüssel fehlt in `texts/<film>.json` für diese Sprache → `check_texts.py` |
| `FOTO FEHLT` | `shots/hero.jpg` fehlt |
| Export hängt bei `__ready` | Fehler im Film-JS (Konsole: `[page]`-Zeilen) oder Bildpfad falsch |
| Puppeteer findet keinen Browser | `PUPPETEER_EXECUTABLE_PATH` setzen oder `render_all.sh` nutzen |
| Kein Ton im Ergebnis | nur `_final.mp4` hat Ton; `mix.py` mit derselben `--lang`/`--vertical`-Kombination laufen lassen |
| Rendern dauert | ca. 3 Min pro 17-s-Film in 4K; Sprachen nacheinander |
