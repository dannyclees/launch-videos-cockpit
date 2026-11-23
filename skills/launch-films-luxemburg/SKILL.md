---
name: launch-films-luxemburg
description: Launch- und Ankündigungsfilme für Betriebe in Luxemburg (Neueröffnung, neue Leistung, neues Angebot, Förderung wie Klimabonus, neue Website, Jubiläum) mit der Launch-Film-Engine aus dem Repo launch-videos-cockpit – mehrsprachig (Lëtzebuergesch, Französisch, Deutsch, Portugiesisch, Englisch) aus einer Filmdatei, 4K in 16:9 und 9:16, mit Klick-Sounds, gebaut nach den Mustern aus 68 viralen Launch-Videos. Nutzen bei "Launch-Video", "Ankündigungsfilm", "Eröffnungsvideo", "Video in allen Landessprachen", "Film für Kunde X in Luxemburg", "auf Luxemburgisch und Französisch", "Lancement", "neuen Service ankündigen", oder wenn engine/, kit.js, brand.json oder catalog.json erwähnt werden.
---

# Launch-Filme Luxemburg

Du baust kurze Launch-Filme (12–25 s) für Betriebe in Luxemburg – meist Premium-Handwerk, Immobilien und hochpreisige Dienstleistungen, Auftraggeber ist Danny (Clees & Ernster). Ein Film muss in einem Land funktionieren, in dem fast jede zweite Person keinen luxemburgischen Pass hat, fast die Hälfte der Beschäftigten jeden Tag aus Frankreich, Belgien oder Deutschland einpendelt und vier Sprachen nebeneinander leben. Darum: **ein Film, eine Timeline, mehrere Sprachfassungen** – nicht ein Film mit vier Sprachen gleichzeitig im Bild.

Grundlage ist die Engine im Repo `launch-videos-cockpit` (`engine/kit.js`, `film.html`, `export.mjs`, `mix.py`) und die Bibliothek `catalog.json` (68 Launch-Videos von X mit Look und „warum es funktioniert hat“).

## Wissensbasis

- `references/luxemburg.md` – Markt, Zielgruppen (Residenten, Frontaliers, Communautés), Kalender (Congé collectif im Bau!), Kanäle, Zahlen-/Telefon-/Adressformate. **Immer lesen.**
- `references/sprachen.md` – welche Sprache für welche Zielgruppe, Schreibregeln LB/FR/DE/PT, Textlängen, Mini-Glossar Handwerk in 5 Sprachen. **Vor jedem Text lesen.**
- `references/muster.md` – die 9 Muster aus der Bibliothek, übersetzt auf luxemburgische KMU, mit Katalog-IDs. **Beim Konzept lesen.**
- `references/recht.md` – Prüfliste vor der Lieferung (TTC, Maître-Titel, Made-in-Luxembourg-Label, Klimabonus-Aussagen, Bildrechte, Musik, DSGVO/CNPD). **Vor jedem Export lesen.**
- `references/engine.md` – Befehle, Dateien, kit.js-Bausteine, Sprachparameter, Fehlerbilder.

Vorlagen in `assets/`: `lu-launch.js` (Filmvorlage, alle Sprachen), `lu-launch.texts.json` (Beispieltexte in 5 Sprachen), `brand-lu.example.json`. Skripte in `scripts/`: `check_texts.py` (Textprüfung), `render_all.sh` (alle Sprachen × beide Formate).

## Ablauf

### 1. Briefing – Luxemburg-Fragen zuerst

Neben den üblichen Fragen (eine Botschaft, Handlung danach, echte Belege, Logo als SVG/PNG, Markenfarben) klärst du:

1. **Wer soll es sehen?** Residenten luxemburgischer Herkunft / portugiesische Community / französischsprachige Residenten und Frontaliers / Expats. Daraus folgen die Sprachfassungen (Tabelle in `sprachen.md`).
2. **Einzugsgebiet:** welche Gemeinden/Kantone? Die Endkarte nennt sie („Mir sinn do an … Esch-Uelzecht … Ettelbréck“). Echte Orte statt „ganz Luxemburg“, wenn der Betrieb nicht landesweit fährt.
3. **Gibt es einen Anlass im Kalender?** (Rentrée, vor dem Congé collectif, Klimabonus-Änderung, Nationalfeierdag, Schueberfouer, Black Friday) – siehe `luxemburg.md`.
4. **Welche Belege sind echt?** Zahlen, Fristen („Devis in 48 Stunden“), Bewertungen, Titel (Maître artisan), Förderbeträge. Was der Kunde nicht belegen kann, kommt nicht in den Film.

Hol dir selbst, was auffindbar ist (Kunden-Website mit `engine/shoot.mjs` abfotografieren, Memory, vorhandene Brand-Infos). Höchstens eine Rückfrage-Runde. Texte (Hooks, Angebot) kommen aus `copywriter-cockpit`, falls verfügbar – dieser Skill übersetzt und passt sie an Luxemburg an.

### 2. Muster wählen

Wähle aus `references/muster.md` **ein** Muster und nenne die 1–2 Katalog-Videos, auf die du dich beziehst (ID, Produkt, warum). Standard für Handwerk/Dienstleistung ist Muster 1 „Ein Problem, eine Lösung, ein Schritt“ – genau das baut `assets/lu-launch.js`. Für andere Muster die Vorlage umbauen, die Bausteine aus `kit.js` (`glowBg`, `browser`, `cover`, `endCard`, `commandCard`) wiederverwenden.

### 3. Beat-Sheet in allen Sprachen

Eine Tabelle: Zeit | Bild | Text LB | Text FR | Text DE | Text PT | Text EN (nur gewählte Sprachen). So siehst du sofort, welche Sprache zu lang wird. Regeln:

- Hook ≤ 24 Zeichen pro Zeile, Frame 1 muss ohne Ton lesbar sein (er ist das Vorschaubild).
- Jede Sprache ist eine **eigene Formulierung**, keine Wort-für-Wort-Übersetzung (Beispiele in `sprachen.md`).
- Ortsnamen in der jeweiligen Sprache: Ettelbréck / Ettelbruck / Ettelbrück.
- Erst die Tabelle zeigen und freigeben lassen, dann bauen.

### 4. Bauen

```bash
cp skills/launch-films-luxemburg/assets/lu-launch.js engine/films/<kunde>.js
cp skills/launch-films-luxemburg/assets/lu-launch.texts.json engine/texts/<kunde>.json   # Texte ersetzen
```

- `engine/brand.json` aus `assets/brand-lu.example.json` schreiben (Name, Akzentfarbe, Logo-Pfad, Standardsprache).
- Echtes Foto nach `engine/shots/hero.jpg` (Baustelle, Team, fertiges Ergebnis – kein Stockfoto). Kein Foto und keine freigegebenen Zahlen? Dann in den Texten `d1`–`d3` setzen (z. B. Werbung → Filter → Termin): die Vorlage zeigt die **Methode als Schema** statt eines Fotos. Ohne beides erscheint sichtbar „FOTO FEHLT“, das ist Absicht.
- Website/Buchungsseite als Beweis? `node engine/shoot.mjs <url> <name> [--mobile]` und mit `browser()` + `cover()` einbauen. Blockiert das Netz die Seite (im Cloud-Container häufig), Screenshot vom Kunden geben lassen oder das Methoden-Schema nehmen – keine fremden Dienste mit Kundendaten füttern, ohne zu fragen.

**Qualitätslatte:** `lu-launch.js` ist nur das Grundgerüst – für einen Film, der als Arbeitsprobe taugt, baust du eigene Szenen wie in `engine/films/ce-launch.js` (Referenz, von Danny als Richtung gewünscht): 8–9 Szenen mit harten Schnitten alle 1,3–2,9 s, Markenschrift lokal aus `engine/fonts/`, Material (Papier-Platten, mattes Glas), Mono-Pills, Pinselstrich unter dem Schlüsselwort, nachgebaute echte Oberflächen (Anzeige im Feed, Formular, Chat, Kalender) statt Symbolen, Satelliten-Chips, ein Kontrastschnitt auf hell als Wende. Story: Hook → Schmerz → Wende → System in 3 Schritten → Ergebnis ohne Zahlen → Claim → Endkarte.

### 5. Prüfen

```bash
python3 skills/launch-films-luxemburg/scripts/check_texts.py engine/texts/<kunde>.json
```

Dann Vorschau: `engine/` lokal ausliefern (`npx serve engine` oder `python3 -m http.server -d engine`) und `film.html?f=<kunde>&l=fr` bzw. `&v=1` für 9:16 öffnen; Taste G zeigt die Safe Zones. Ohne Browser: Standbilder mit Playwright (`FILM.paint(t)`) bei Hook, Belegen, Angebot und Endkarte, je Sprache und Format, und ansehen. Achte auf: geschrumpfte Zeilen (Text kürzen statt winzig), Umlaute/Akzente (ë, é, ç, ã) korrekt, nichts in den Safe Zones (9:16 oben 14 %, unten 35 %).

**Luxemburgischer Text geht nie ungeprüft raus:** Hinweis an Danny, ihn mit spellchecker.lu bzw. einer Muttersprachlerin zu prüfen. Dasselbe für PT, wenn niemand im Team Portugiesisch spricht.

### 6. Exportieren

```bash
bash skills/launch-films-luxemburg/scripts/render_all.sh <kunde> [--langs "lb fr"] [--only 9x16] [--music lizenziert.mp3]
```

Ergebnis pro Sprache: `engine/out/<kunde>_<lang>_final.mp4` (16:9) und `<kunde>_<lang>_v_final.mp4` (9:16), 4K, H.264, Klick-Sounds gemischt. Ein Film dauert etwa 3 Minuten. Musik nur mit Lizenz (siehe `recht.md`).

### 7. Liefern

- Dateien sauber benennen: `<kunde>_<anlass>_<lang>_<format>.mp4`.
- Pro Sprache eine eigene Anzeigengruppe/Ad-Set mit Sprach-Targeting, nicht eine Anzeige für alle (siehe `luxemburg.md`, Kanäle).
- Kurze Übergabe: welche Fassungen, welches Muster und warum, welche Texte noch gegengelesen werden müssen, was nach `recht.md` offen ist.

## Harte Regeln

1. Nie Zahlen, Bewertungen, Fristen, Förderbeträge oder Titel erfinden. `check_texts.py` markiert jede Ziffer – zu jeder brauchst du einen Beleg vom Kunden.
2. Preise für Privatkunden immer TTC (inkl. TVA) – im Text sichtbar machen.
3. Eine Sprache pro Fassung. Ausnahme: ein einzelnes luxemburgisches Signalwort („Moien!“) in einer FR-/DE-Fassung, wenn die Zielgruppe es versteht.
4. Kein Staatswappen, kein „Made in Luxembourg“-Logo, kein „Meeschter/Maître“ ohne Nachweis.
5. Echte Bilder des Betriebs vor schönen Stockbildern. Fehlt etwas, sichtbarer Platzhalter und sagen.
6. Timeline-Form der Vorlage behalten (Hook → Beweis → Angebot → Endkarte); Länge 12–25 s, außer das Muster verlangt mehr.
