# PROJECT HANDOVER – Kráľovstvo Skalica
Last updated: 2026-01-28
Prepared for: new ChatGPT session (no prior context)

## 1) Čo je projekt
Historický dom Kráľovstvo Skalica na Kráľovskej 14 s Koloniálom, thajskými masážami, bike arénou a ubytovaním pod jednou strechou.

## 2) Aktuálny stav
Live statický web; texty sú zámerne krátke, CTA sú jasné a používajú iba `kralovstvo.sk` doménu.

## 3) Source of truth
- `index.html` (+ ostatné HTML podstránky)
- `SITE_OVERVIEW.md`
- `PROJECT_HANDOVER.md`

## 4) Ako stránka funguje
Homepage je rozcestník „jedny dvere, viac ciest“, na ktorom sú štyri karty (káva, masáže, bike, ubytovanie) a sekcia kontaktu. Každá služba má vlastnú podstránku s detailom a CTA; menu a pätička sú zdieľané. Kontakt na podstránkach smeruje na `index.html#kontakt`.

## 5) Dôležité rozhodnutia
- Texty zostávajú krátke, pokojné, bez marketingovej omáčky.
- Verejné kontakty používajú iba doménu `kralovstvo.sk`.
- Karty na homepage obsahujú iba jedno tlačidlo + jeden kontakt.
- Kontakt link v navigácii musí na podstránkach smerovať na `index.html#kontakt`.

## 6) Posledný cyklus
Bootstrap dokumentácie a nastavenie zdrojov pravdy. Obnovený CTA v ubytovaní a upratané fotky masáží.

## 7) Next steps
1. Doplniť overené otváracie hodiny Koloniálu a bike arény.
2. Získať nové fotografie, ak budú k dispozícii, a aktualizovať hero sekcie.
3. Priebežne kontrolovať, že CTA a kontakty ostávajú v súlade s dokumentáciou.
4. Po každom cykle aktualizovať `SITE_OVERVIEW.md` a `PROJECT_HANDOVER.md`.

## 8) Pokyny pre nový chat
1. Najprv prečítaj `PROJECT_HANDOVER.md`.
2. Potom `SITE_OVERVIEW.md`.
3. Potom `index.html`.
4. Až následne sa pýtaj používateľa na ďalší zámer.
