# SITE OVERVIEW – Kráľovstvo Skalica
Last updated: 2026-01-28

## STATUS
- Live obsah
- Texty sú krátke a vecné; priority sú jasné CTA a jednotná doména.

## STRUCTURE (pages)
- `index.html` – hlavná brána a rozcestník „jedny dvere, viac ciest“ + kontakty/adresa/mapa.
- `kava.html` – Koloniál funnel (výber balíkov, košík v prehliadači, formulár na odoslanie).
- `masaze.html` – stručný popis thajských masáží, ceny 45/90 min, CTA na e-mail/tel.
- `bike.html` – bike aréna v Zlatníckej doline, program na mieru s CTA na mail/tel.
- `ubytovanie.html` – parametre apartmánov (20 lôžok), kontakt na ubytovanie.

## NAVIGATION & LINKS
- Všetky stránky používajú rovnaké menu (logo + odkazy na káva/masáže/bike/ubytovanie + kontakt).
- Na homepage (index.html) vedie „Kontakt“ na `#kontakt`.
- Na podstránkach vedie „Kontakt“ na `index.html#kontakt`, aby anchor vždy fungoval.

## CTA LOGIC
- Koloniál (kava.html) – CTA „Prejsť na kávu / Vybrať balík“ → stránka s košíkom + e-mail `ahoj@kralovstvo.sk`.
- Masáže (masaze.html) – CTA „Rezervovať masáž“ → `mailto:masaze@kralovstvo.sk`; doplnkový tel. link v hero.
- Bike (bike.html) – CTA „Naplánovať výjazd“ → `mailto:ahoj@kralovstvo.sk` + voliteľný tel. kontakt.
- Ubytovanie (ubytovanie.html) – CTA „Overiť termín / Napísať o ubytovaní“ → `ubytovanie@kralovstvo.sk`.
- Homepage karty majú len tlačidlo + jeden kontakt, ďalšie detaily sú v sekcii Kontakt & dôvera.

## CONTACTS
- Telefón: `+421 902 842 251`.
- E-maily: `ahoj@kralovstvo.sk`, `masaze@kralovstvo.sk`, `ubytovanie@kralovstvo.sk`.
- Žiadne odkazy na doménu `nakralovskej.sk` sa nesmú zobrazovať na webe.

## ASSETS
- CSS: `assets/css/shared.css` (globálne), `assets/css/kava.css` (kávová podstránka).
- JS: `assets/js/site.js` (nav toggle, rok v pätičke), `assets/js/kava.js` (logika košíka).
- Fotky: `fotky/` s podpriečinkami (`masaze/`, `kava/`, ...); hero masáží používa `fotky/masaze/0557d91d-fdf8-44f0-b8b6-6347955095f2.jpg`.

## TODO / OPEN QUESTIONS
- Doplniť oficiálne otváracie hodiny Koloniálu a bike arény; po potvrdení odstrániť poznámku z kontakt sekcie.
- V budúcnosti doplniť nové fotografie (podľa dostupnosti).

## WHAT CHANGED (last cycle)
- Initial documentation baseline.
- Obnovený e-mailový CTA pre ubytovanie hero a upratané duplicitné foto masáží.
