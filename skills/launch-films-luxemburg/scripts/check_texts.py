#!/usr/bin/env python3
"""check_texts.py <engine/texts/film.json>  ·  prüft die Filmtexte aller Sprachen vor dem Export.
Fehler (Exit 1): Sprache fehlt, Schlüssel fehlt/leer.  Warnungen: zu lang, Ziffern ohne Beleg, Preis ohne TTC,
Telefon nicht +352, deutsche Wörter/ß im Luxemburgischen, falsche Anführungs-/Fragezeichen-Regeln im Französischen."""
import json, re, sys

MAX = {"hook1": 24, "hook2": 34, "caption": 34, "p1": 30, "p2": 30, "p3": 30,
       "offer": 34, "offer_sub": 44, "lead": 26, "cta": 22, "sub": 44}
LB_DE = r"\b(und|nicht|ist|wir|Sie|Ihnen|Ihr|Ihre|kostenlos|jetzt|bei uns|für)\b"
TTC = {"lb": r"TTC|inkl", "fr": r"TTC", "de": r"inkl\.? ?MwSt|TTC|brutto", "pt": r"IVA|TTC", "en": r"VAT|TTC"}

def main(p):
    d = json.load(open(p, encoding="utf-8"))
    langs = d.get("langs") or [k for k in d if len(k) == 2]
    ref = set().union(*[set(d.get(l, {})) for l in langs])
    err, warn = [], []
    for l in langs:
        b = d.get(l)
        if not isinstance(b, dict): err.append(f"[{l}] Sprachblock fehlt"); continue
        for k in sorted(ref):
            v = b.get(k)
            if v in (None, "", []): err.append(f"[{l}] '{k}' fehlt oder leer"); continue
            for s in (v if isinstance(v, list) else [v]):
                lim = MAX.get(k, 28 if k == "items" else None)
                if lim and len(s) > lim: warn.append(f"[{l}] '{k}' {len(s)} Zeichen > {lim}: {s!r} (wird klein, kürzen)")
                if re.search(r"\d", s) and k not in ("sub",) and k != "items":
                    warn.append(f"[{l}] '{k}' enthält Zahl – Beleg vom Kunden vorhanden? {s!r}")
                if re.search(r"€|\bEUR\b|\bEuro|Präis|\bprix\b|Preis|preço|\bprice", s, re.I) and not re.search(TTC.get(l, "TTC"), s, re.I):
                    warn.append(f"[{l}] '{k}' nennt Preis ohne TTC/inkl. MwSt.: {s!r}")
                if l == "lb":
                    if "ß" in s: warn.append(f"[lb] '{k}' enthält ß – gibt es im Lëtzebuergeschen nicht: {s!r}")
                    m = re.findall(LB_DE, s)
                    if m: warn.append(f"[lb] '{k}' klingt deutsch ({', '.join(set(m))}): {s!r} → spellchecker.lu")
                if l == "fr" and re.search(r"\S[?!:;]", s) and not re.search(r"https?:|\d:\d", s):
                    warn.append(f"[fr] '{k}' vor ? ! : ; gehört ein (schmales) Leerzeichen: {s!r}")
        tel = " ".join(str(x) for x in b.values())
        if re.search(r"\+?\d[\d ]{6,}", tel) and "+352" not in tel:
            warn.append(f"[{l}] Telefonnummer ohne +352 (Frontaliers wählen aus FR/BE/DE)")
    for w in warn: print("WARNUNG", w)
    for e in err: print("FEHLER ", e)
    print(f"{len(langs)} Sprachen, {len(ref)} Schlüssel, {len(err)} Fehler, {len(warn)} Warnungen")
    print("Erinnerung: Jede Sprache von einer Muttersprachlerin/einem Muttersprachler gegenlesen lassen (LB: spellchecker.lu, lod.lu).")
    sys.exit(1 if err else 0)

if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    main(sys.argv[1])
