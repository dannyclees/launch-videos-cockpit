#!/usr/bin/env bash
# render_all.sh <film> [--music licensed.mp3] [--langs "lb fr"] [--only 16x9|9x16]
# Rendert jede Sprache aus engine/texts/<film>.json in 16:9 und 9:16 und mischt die Klicks (+ Musik) dazu.
# Ergebnis: engine/out/<film>_<lang>_final.mp4 und engine/out/<film>_<lang>_v_final.mp4
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ENGINE="${ENGINE:-$(cd "$HERE/../../.." && pwd)/engine}"
# Skill liegt woanders (z. B. claude.ai)? Dann im Repo-Ordner starten oder ENGINE=/pfad/zu/engine setzen.
[ -f "$ENGINE/kit.js" ] || ENGINE="$PWD/engine"; [ -f "$ENGINE/kit.js" ] || ENGINE="$PWD"
[ -f "$ENGINE/kit.js" ] || { echo "engine/kit.js nicht gefunden – ENGINE=/pfad/zu/engine setzen"; exit 1; }
FILM="${1:?Filmname fehlt}"; shift || true
MUSIC=""; LANGS=""; ONLY=""
while [ $# -gt 0 ]; do case "$1" in
  --music) MUSIC="$2"; shift 2;; --langs) LANGS="$2"; shift 2;; --only) ONLY="$2"; shift 2;; *) echo "unbekannt: $1"; exit 2;; esac; done
cd "$ENGINE"
[ -f "films/$FILM.js" ] || { echo "films/$FILM.js fehlt"; exit 1; }
[ -f "texts/$FILM.json" ] || { echo "texts/$FILM.json fehlt"; exit 1; }
python3 "$HERE/check_texts.py" "texts/$FILM.json"
# Browser: vorhandenes Chromium nutzen statt Puppeteer-Download (Cloud-Container: /opt/pw-browsers)
if [ -z "${PUPPETEER_EXECUTABLE_PATH:-}" ]; then
  for c in /opt/pw-browsers/chromium-*/chrome-linux64/chrome "$(command -v chromium || true)" "$(command -v google-chrome || true)"; do
    [ -n "$c" ] && [ -x "$c" ] && { export PUPPETEER_EXECUTABLE_PATH="$c"; break; }; done; fi
[ -d node_modules/puppeteer ] || PUPPETEER_SKIP_DOWNLOAD=${PUPPETEER_EXECUTABLE_PATH:+1} npm i --no-audit --no-fund puppeteer@23
[ -n "$LANGS" ] || LANGS=$(python3 -c "import json,sys;d=json.load(open('texts/$FILM.json'));print(' '.join(d.get('langs') or [k for k in d if len(k)==2]))")
for L in $LANGS; do
  for V in "" "--vertical"; do
    [ "$ONLY" = "16x9" ] && [ -n "$V" ] && continue; [ "$ONLY" = "9x16" ] && [ -z "$V" ] && continue
    node export.mjs "$FILM" $V --lang "$L"
    python3 mix.py "$FILM" $V --lang "$L" ${MUSIC:+--music "$MUSIC"}
  done
done
ls -lh out/*_final.mp4
