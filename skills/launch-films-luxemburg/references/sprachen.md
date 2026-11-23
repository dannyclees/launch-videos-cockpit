# Sprachen: welche, wie, wie lang

## Welche Sprachfassungen?

| Situation | Fassungen (Reihenfolge = Priorität) |
|---|---|
| Handwerk/Renovation, Privatkunden landesweit | LB, FR, PT |
| Premium (Schreinerei, Naturstein, Architektur, Immobilien Luxus) | LB, FR, (EN) |
| Neueröffnung Geschäft/Restaurant in der Stadt | FR, LB, EN |
| Süden (Minett) | FR, PT, LB |
| Norden (Éislek) und Osten (Musel) | LB, DE, FR |
| Expats, Finanz, Tech, B2B international | EN, FR |
| B2B Bau (Architekten, Syndics) | FR, LB/DE |
| Recrutement Handwerk | FR, DE, PT, LB |

Nur so viele Fassungen wie es Zielgruppen mit Budget gibt. Zwei gute Fassungen schlagen fünf mittelmäßige.

## Lëtzebuergesch (LB)

- **Offizielle Rechtschreibung** (Reform 2019): prüfen mit **spellchecker.lu**, Wörter nachschlagen in **lod.lu**. LB-Texte gehen nie ohne Gegenlesen raus – auch dein eigener Text nicht.
- **Buchstaben:** ë, é, ä, keine ß. Substantive groß wie im Deutschen.
- **n-Regel (Eifeler Regel):** Ein -n am Wortende fällt weg vor Konsonanten, bleibt aber vor Vokalen und vor n, d, t, z, h. „Mir komme bei Iech“, aber „Mir kommen an d'Stad“, „Mir këmmeren eis“. Bei Zahlen zählt die Aussprache: „an 48 Stonnen“ (aachtavéierzeg → Vokal, n bleibt), „a 5 Deeg“ (fënnef → Konsonant, n fällt).
- **Anrede:** förmlich „Dir / Iech / Är“ (in Werbung groß), vertraut „du / dech / däin“. Premium-Handwerk für Eigentümer → Dir. Junge Zielgruppe, Recrutement, C&E-eigene Reels → Du/Däin (großgeschrieben).
- **Französische Lehnwörter sind normal** und klingen echter als deutsche Wörter: Devis, Dossier, Rendez-vous, Facture, Garage, Chantier. „Gratis Devis“ statt „Kostenloses Angebot“.
- **Typische Fehler aus deutscher Übersetzung:** „und“ → „an“, „nicht“ → „net“, „ist“ → „ass“, „wir“ → „mir“, „Sie/Ihnen“ → „Dir/Iech“, „jetzt“ → „elo“, „für“ → „fir“, „bei uns“ → „bei eis“. `check_texts.py` warnt bei diesen Wörtern.
- Kurz bleiben: LB ist auf dem Bildschirm etwa so lang wie Deutsch.

## Französisch (FR)

- Vouvoiement („vous“) für Privatkunden und Premium. Tutoiement nur bei jungen Zielgruppen, Recrutement oder sehr lockeren Marken.
- **Schmales Leerzeichen vor ? ! : ;** („Nouveau chauffage ?“) und « Guillemets ». `check_texts.py` warnt.
- Luxemburgisches Französisch = Standardfranzösisch (soixante-dix, nicht septante). „TTC“ ist das übliche Kürzel.
- Für Frontaliers in Frankreich: Werbung, die gezielt in Frankreich läuft, braucht eine französische Fassung (Loi Toubon).

## Deutsch (DE)

- „Sie“, Standarddeutsch. In Luxemburg klingen manche französischen Wörter auch im Deutschen natürlich (Devis wird verstanden), im Zweifel „Angebot“.
- DE ist die längste Sprache – bei der Hook zuerst DE prüfen.

## Portugiesisch (PT)

- **Europäisches Portugiesisch**, nicht brasilianisches: „equipa“ (nicht equipe), „casa de banho“ (nicht banheiro), „marcação“ für Termin, „telemóvel“ (nicht celular).
- Anrede höflich-indirekt: „Tratamos do Klimabonus por si“, „Peça o seu orçamento“. „Você“ wirkt in Portugal oft zu direkt oder brasilianisch.
- Viele in der Community lesen auch FR – die PT-Fassung zeigt Respekt und hebt sich ab, weil fast niemand sie macht.

## Englisch (EN)

- Kurz, direkt, britische oder neutrale Schreibweise. Förderprogramme nicht übersetzen (Klimabonus bleibt Klimabonus).

## Textlängen

Im Vergleich zu Englisch sind DE etwa +25–35 %, FR und PT etwa +15–30 %, LB etwa wie DE. Die Vorlage passt zu lange Zeilen an oder bricht sie um, aber ab ~20 % Schrumpfung sieht es schwach aus → kürzer formulieren.

Grenzen in `check_texts.py`: hook1 24, hook2 34, Belege 30, Angebot 34, CTA 22 Zeichen.

## Eigene Formulierung statt Übersetzung – Beispiel

| | Hook Zeile 1 | Hook Zeile 2 |
|---|---|---|
| LB | Nei Heizung? | Mir këmmeren eis ëm de Klimabonus. |
| FR | Nouveau chauffage ? | On s'occupe du Klimabonus. |
| DE | Neue Heizung? | Wir kümmern uns um den Klimabonus. |
| PT | Aquecimento novo? | Tratamos do Klimabonus por si. |
| EN | New heating? | We handle the Klimabonus. |

## Mini-Glossar Handwerk (Startpunkt, vor Verwendung prüfen)

| DE | LB | FR | PT | EN |
|---|---|---|---|---|
| Kostenloses Angebot | Gratis Devis | Devis gratuit | Orçamento grátis | Free quote |
| Angebot anfragen | Devis ufroen | Demander un devis | Pedir orçamento | Get a quote |
| Rufen Sie uns an | Rufft eis un | Appelez-nous | Ligue-nos | Call us |
| Jetzt | elo | maintenant | já | now |
| Termin | Rendez-vous | rendez-vous | marcação | appointment |
| Beratung bei Ihnen zu Hause | Berodung bei Iech doheem | Conseil chez vous | Aconselhamento em sua casa | Advice at your home |
| Renovierung | Renovatioun | rénovation | renovação | renovation |
| Heizung | Heizung | chauffage | aquecimento | heating |
| Badezimmer | Buedzëmmer | salle de bain | casa de banho | bathroom |
| Küche | Kichen | cuisine | cozinha | kitchen |
| Dach | Daach | toiture | telhado | roof |
| Fenster | Fënsteren | fenêtres | janelas | windows |
| Baustelle | Chantier | chantier | obra | site |
| Familienbetrieb | Familljebetrib | entreprise familiale | empresa familiar | family business |
| Seit 1987 | Zënter 1987 | Depuis 1987 | Desde 1987 | Since 1987 |
| Neu eröffnet | Nei opgemaach | Nouvelle ouverture | Nova abertura | Now open |
| Wir sind für Sie da in | Mir sinn do an | Nous intervenons à | Estamos em | We work in |
| Preise inkl. MwSt. | Präisser TTC | Prix TTC | Preços com IVA | Prices incl. VAT |
| Von A bis Z | vun A bis Z | de A à Z | de A a Z | from A to Z |
