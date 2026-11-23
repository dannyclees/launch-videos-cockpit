# Muster aus der Bibliothek, übersetzt auf Luxemburg

Quelle: `catalog.json` im Repo (68 Launch-Videos von X, mit Look, „Why it worked“, Dauer, Format, organisch/beworben). Die Bibliothek ist Tech-lastig; die Mechanik dahinter funktioniert für jeden Betrieb. Videos ansehen: `index.html` im Repo öffnen, nach ID oder Produkt suchen.

LB-Beispielsätze in dieser Datei sind ungeprüfte Skizzen – vor Verwendung durch spellchecker.lu.

Was in der Bibliothek fast immer gilt:
- **Frame 1 ist das Vorschaubild.** Eine lesbare Aussage ab der ersten Sekunde.
- **Echt schlägt schön:** echte Oberflächen, echte Leute, keine Schnitttricks (#36, #57, #14).
- **Eine Sache zeigen, ganz.** Ein Anwendungsfall von Anfang bis Ende statt zehn Features.
- **Der Klick auf dem Beat** am Ende (Endkarte) macht es rund und wiedererkennbar.
- Viele organische Hits sind lang (60–200 s), aber das sind Gründer-Posts auf X. Für bezahlte Anzeigen in Luxemburg: 12–25 s.

---

## 1. Ein Problem, eine Lösung, ein Schritt (Standard, = `lu-launch.js`)

Hook benennt den Schmerz → echtes Bild → drei Belege → ein Angebot → Endkarte.
- Vorbilder: #26 CodeRabbit for Slack (Schmerz, den jeder kennt, dann die Lösung im vertrauten Werkzeug), #32 Lemon (kurze Zeilen benennen den Schmerz, ein Schritt erledigt alles), #23 Bouncer (gemeinsamer Feind auf einen Blick, das Produkt ist die Erleichterung), das Beispiel `engine/films/example.js`.
- Luxemburg: „Heizung kapott am Januar?“ → Notdienst. „Klimabonus-Pabeierkram?“ → wir machen den Dossier. „Kee Plombier fënnt Zäit?“ → Termin diese Woche (nur wenn wahr).

## 2. Kleiner Input, großes Ergebnis / Vorher–Nachher

Ein Bild vorher, ein Bild nachher, dazwischen der Weg.
- Vorbilder: #54 Shipper (eine URL rein, eine App raus), #9 Okara (eine Website wird ein ganzes Team), #58 Expect (rot zu grün – das befriedigendste Ende), #62 react-doctor (eine Punktzahl steigt).
- Luxemburg: Bad 1978 → Bad heute. Fassade vor/nach Dämmung. Garten. Umsetzung in der Vorlage: Foto 1 und 2 laden (`loadImg('vorher',…)`, `loadImg('nachher',…)`), Wischblende statt Belegkarten.

## 3. Echte Kunden sprechen

Kunden sagen die Zahl, nicht der Betrieb.
- Vorbilder: #14 Claude Opus 4.6 (Ergebnisse echter Leute prahlen statt der Firma), #41 Viktor (Kunden nennen die Zahlen), #18 Emergent (Gründer setzt die Haltung, Kunden mit Namen beweisen sie), #7 Polar (normale Leute in echten Jobs).
- Luxemburg: Eigentümerin aus Bartreng erzählt auf LB, Untertitel in FR/PT als eigene Fassungen. Name und Gemeinde einblenden (mit schriftlicher Einwilligung). Funktioniert hier besonders, weil Empfehlung alles ist.

## 4. Meister oder Gründer mit Haltung

Eine Person, ein Satz, den sie wirklich glaubt.
- Vorbilder: #40 TerraFirma (klarer Gegner, Gründer auf der Baustelle), #45 Energy (persönlicher Einsatz), #38 Replit (eine Person, eine Zahl, schlichter Dank).
- Luxemburg: „Zënter 1987, an der drëtter Generatioun“ (nur wenn wahr), Jubiläum, Übergabe an die nächste Generation. Titel „Meeschter“ nur mit Brevet de maîtrise (recht.md).

## 5. Ein Wort pro Neuerung

Große Ankündigung in einzelne Wörter oder Karten zerlegt.
- Vorbilder: #5 Stitch (fünf Neuerungen, je ein Wort), #65 Hermes Profile Builder (eine starke Karte pro Schritt), #49 Not Diamond (fetter Text plus ein Schema, kein Sprecher nötig).
- Luxemburg: neuer Showroom, neues Leistungspaket, Saisonstart nach dem Congé collectif: „Plangen. Bauen. Fäerdeg.“ Funktioniert ohne Ton und ist in jeder Sprache leicht anzupassen.

## 6. Teaser / Countdown vor der Eröffnung

Neugier vor dem Ereignis, ohne alles zu zeigen.
- Vorbilder: #6 OpenAI DevDay (Countdown-Zahl, keine Details), #19 Sabi (Produkt versteckt, kühne Aussage), #68 EPTA (ganz ohne Footage, günstig und trotzdem hochwertig), #52 ai.com (Knappheit – nur wenn echt).
- Luxemburg: Eröffnung Showroom oder Filiale: „Nach 5 Deeg“ / „Dans 5 jours“, Adresse und Datum auf der Endkarte. Zwei bis drei Filme in Folge (Teaser, Eröffnung, Danke).

## 7. Ruhiges Premium

Langsam, fast still, Material und Handwerk in Großaufnahme.
- Vorbilder: #63 Sandbar (langsam, hochwertig, fast stumm), #13 Mark II (warme, haptische Bilder), #33 Valar Atomics (das Overlay bleibt stehen, die Zahl sinkt ein, echte Arbeit dahinter beweist sie).
- Luxemburg: Schreinerei, Naturstein, Architektur, Luxusimmobilien. Weniger Text, keine Klick-Sounds (Events leeren), nur Musik mit Lizenz. Endkarte ohne Gemeinde-Klicks (`items` mit einem Eintrag).

## 8. Vertrauen leihen

Ein bekannter Name in der ersten Zeile.
- Vorbilder: #3 Superblocks x AWS (großer Partner zuerst), #44 ChatCut for Codex (reitet auf einer großen Plattform), #30 Vocci Ring (verbindet sich mit dem, was man schon nutzt).
- Luxemburg: zertifizierter Partner eines Herstellers, Mitglied einer Fédération, Gewinner eines Preises – **nur mit Nachweis und ohne fremde Logos ohne Erlaubnis**.

## 9. Humor / Sketch

Ein lokaler Witz, das Produkt ist die Pointe.
- Vorbilder: #2 Wispr Flow (Kinder sagen Erwachsenensätze), #55 CodeRabbit Series C (trockenes, unbeholfenes Spiel), #51 Pocket.
- Luxemburg: Sprachmix-Witz (jemand bestellt auf vier Sprachen), Stau auf der A3/A4, Parkplatzsuche in der Stadt. Nur mit Kunden, die das wollen; braucht echte Darsteller und ist kein Fall für die reine Canvas-Engine – dann mit `motion-designer-cockpit` als Overlay über Footage arbeiten.

---

## Muster wählen in einem Satz

Hat der Kunde ein klares Problem, das er löst → 1. Hat er sichtbare Ergebnisse → 2. Hat er zufriedene Kunden, die reden → 3. Ist der Betrieb die Marke → 4. Viele Neuerungen auf einmal → 5. Ein Datum steht fest → 6. Premium-Material → 7. Ein starker Partner → 8.
