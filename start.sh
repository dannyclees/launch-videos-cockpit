#!/bin/sh
# opens the viral launch film library on http://localhost:4321/library/
cd "$(dirname "$0")"
( sleep 1; open "http://localhost:4321/library/" 2>/dev/null || xdg-open "http://localhost:4321/library/" 2>/dev/null ) &
echo "Library running on http://localhost:4321/library/  (press Ctrl+C to stop)"
python3 -m http.server 4321 --bind 127.0.0.1
