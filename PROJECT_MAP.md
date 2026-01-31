# PROJECT MAP – Kráľovstvo Skalica
Generated: 2026-01-31 05:06 UTC

## 1. Štruktúra repozitára
```
.
├── assets/ (CSS, JS, ikony, OG obrázky)
├── fotky/ (originálne fotky + podpriečinky podľa témy)
├── docs/ (content-plan.md)
├── _trash/ (archív exportov + auditné podklady)
├── HTML: index, kava, masaze, bike, ubytovanie
├── Dokumenty: README, SITE_OVERVIEW, PROJECT_HANDOVER, AGENTS
├── tatus -sb (git diff dump)
└── tore PROJECT_HANDOVER... (duplicitný git diff dump)
```
- Koreň obsahuje všetky verejné stránky a dokumentáciu; výrobná štruktúra je flat + zdieľané `assets/` a `fotky/`.
- `_trash/_delivery` drží starý audit (CHANGES, GIT_DIFF, atď.) a `_iphone_export` je offline balík so starou kópiou webu.
- Git repo je čisté, build tooly netreba (čisté HTML/CSS/JS).

## 2. Stránky webu (účel, sekcie, CTA)
### index.html – rozcestník
- `<title>` Kráľovstvo Skalica – káva, masáže, bike aréna aj ubytovanie; `<h1>` „Dom na Kráľovskej 14…“.
- Sekcie: hero (#cesty CTA), decision grid (4 články), storytelling „O Kráľovstve“, experience („Ako to funguje dnes“), ubytovanie teaser, bike teaser, kontakt/trust block (#kontakt).
- CTA: Vyber si cestu (#cesty), email `ahoj@…`, preklik na jednotlivé podstránky, hero tel/mail, map link + contact list (mailto/tel), contact CTA pre ubytovanie.
- Navigácia: logo → index, menu položky na `kava/masaze/bike/ubytovanie/#kontakt`.
- Poznámka `TODO` v kontakte pripomína nedoplnené otváracie hodiny.

### kava.html – Koloniál funnel
- `<title>` „Káva Koloniál – Kráľovstvo Skalica“, `<h1>` „Káva Koloniál – pravdivý rituál“.
- Sekcie: hero (kroky CTA), stepper (3 kroky), sekcie krok1/2/3, košík komponent, form, cross-sell bloky.
- CTA: interné pre skrol (#krok1–3), JS košík s mailto `ahoj@…`, hero CTA do sekcií, footer tel/mail.
- Script `assets/js/kava.js` generuje e-mail so súhrnom košíka; nav odkazuje na `index.html#kontakt`.

### masaze.html – Thajské masáže
- `<title>` „Thajské masáže – …“, `<h1>` „Pokojná miestnosť nad Koloniálom“.
- Sekcie: hero split (foto + CTA), tri „masaze-block“ sekcie (Priestor, Trvanie, Objednávka).
- CTA: mailto `masaze@…` so subjectom, tel link, map link na Google Maps.
- Nav rovnaký pattern, Kontakt → `index.html#kontakt`.

### bike.html – Bike aréna
- `<title>` „Bike aréna Zlatnícka dolina – …“, `<h1>` „Bike aréna Kráľovstvo“.
- Sekcie: hero (CTA mail/tel), „Program na mieru“, „Servis & zázemie“, cross-sell (ubytovanie), final CTA.
- CTA: mailto `ahoj@…?subject=Bike aréna`, tel link, cross-sell na `ubytovanie.html`.

### ubytovanie.html – Apartmány
- `<title>` „Ubytovanie na Kráľovskej 14 – …“, `<h1>` rovnaký text.
- Sekcie: hero (mail/tel CTA), grid s „Apartmány & kapacita“, „Vybavenie“, „Pre koho je dom ideálny“, „Rezervácie“ + map link, cross-sell (link späť na index #cesty), final CTA.
- CTA: `mailto:ubytovanie@…` so subjectom, tel, map link.

## 3. Navigačný model a odkazy
- Menu je konzistentné: logo → `index.html`, položky `kava`, `masaze`, `bike`, `ubytovanie`, posledná položka je `#kontakt` na home (na home bez prefixu, na podstránkach `index.html#kontakt`).
- Footer vždy obsahuje kontakty + odkazy na ostatné stránky; káva/bike/masáže/ubytovanie zdieľajú identický footer so `index.html` pre home link.
- Hlavné interné odkazy sú relatívne a existujú (knižnica: `kava.html`, `masaze.html`, `bike.html`, `ubytovanie.html`, `index.html`, interné anchory `#cesty`, `#kontakt`, `#krok1-3`). Žiadne absolútne cesty.

| Stránka | Interné linky | Externé / integračné linky |
| --- | --- | --- |
| index.html | `kava.html`, `masaze.html`, `bike.html`, `ubytovanie.html`, `#cesty`, `#kontakt` | Tel `+421902842251`, mailto `ahoj@…`, `masaze@…`, `ubytovanie@…` (viac variantov so subjectom), Google Maps adresa |
| kava.html | `#krok1`, `#krok2`, `index.html`, `index.html#kontakt`, ostatné podstránky | Tel `+421902842251`, mailto `ahoj@…` (footer) |
| masaze.html | `index.html`, `index.html#kontakt`, `kava.html`, `bike.html`, `ubytovanie.html` | Tel `+421902842251`, mailto `masaze@…`, Google Maps |
| bike.html | `index.html`, `index.html#kontakt`, `kava.html`, `masaze.html`, `ubytovanie.html` | Tel `+421902842251`, mailto `ahoj@…` (vrátane subjectu `Bike aréna`) |
| ubytovanie.html | `index.html`, `index.html#kontakt`, `index.html#cesty`, `kava.html`, `masaze.html`, `bike.html` | Tel `+421902842251`, mailto `ubytovanie@…` (dva subject varianty), Google Maps |

- Kontakty sa opakujú presne podľa dokumentácie; ankrové linky existujú na cieľových stránkach (overené cez `grep href`, `grep src`).

## 4. Externé integrácie a odkazy
- Mailto adresy: `ahoj@kralovstvo.sk` (viac subject variantov pre hero + JS košík), `masaze@kralovstvo.sk`, `ubytovanie@kralovstvo.sk`.
- Telefonický link: `tel:+421902842251` na každej stránke.
- Google Maps odkaz: `https://maps.google.com/?q=Kráľovská+14,+Skalica` (index trust block, masáže, ubytovanie).
- Schema.org JSON-LD (LocalBusiness) je vložený iba v `index.html` a používa OG obrázok `og-home` + GPS koordináty.
- Site manifest `assets/img/site.webmanifest`, ikonky (favicon.ico, apple-touch, PNG) sú linknuté na každej stránke.

## 5. Asset inventár
### assets/
| Súbor | Typ | Veľkosť (B) | Stav použitia |
| --- | --- | --- | --- |
| assets/css/shared.css | CSS | 13 506 | Používané všetkými HTML |
| assets/css/kava.css | CSS | 8 600 | Iba kava.html |
| assets/js/site.js | JS | 1 200 | Všetky stránky |
| assets/js/kava.js | JS | 13 342 | Iba kava.html |
| assets/img/apple-touch-icon.png | PNG | 3 467 | Linknuté v každej stránke |
| assets/img/favicon-{32,192,512}.png + favicon.ico | PNG/ICO | 614–22 382 | Linknuté |
| assets/img/logo.png | PNG | 68 | **Nepoužívané** (textové logo v hlavičke)
| assets/img/og-home.jpg | JPG | 155 214 | Meta `og:image` na index/bike/ubytovanie |
| assets/img/og-kava.jpg | JPG | 93 640 | Iba kava meta |
| assets/img/og-masaze.jpg | JPG | 68 731 | Iba masaze meta |
| assets/img/og-ubytovanie.jpg | JPG | 155 214 | **Nepoužívané** (meta používa og-home)
| assets/img/placeholder.svg | SVG | 279 | **Nepoužívané** |
| assets/img/site.webmanifest | JSON | 410 | Linknutý |

### fotky/
| Súbor | Typ | Veľkosť (B) | Stav použitia |
| --- | --- | --- | --- |
| fotky/chodba/3495388e-bf0b-450a-8cef-a7c85fa04642.jpg | JPG | 266 288 | Použité v shared.css ako hero pozadie |
| fotky/masaze/0557d91d-fdf8-44f0-b8b6-6347955095f2.jpg | JPG | 34 337 | Použité v index + masáže |
| fotky/kava/500091531_1253119006816305_697534955740682492_n.jpg | JPG | 315 989 | Použité v kava hero |
| fotky/kava/{500419636…,502203300…,550221927…}.jpeg | JPEG | 165 723–261 954 | **Nepoužívané** |
| fotky/neprustrelny/Neprustrelny podpis | PNG | 1 481 835 | **Nepoužívané, bez prípony v názve** |
| prázdne priečinky: `fotky/bikearena`, `fotky/servishertlsport`, `fotky/ubytovanie` |

## 6. Riziká a podozrivé zistenia
1. Dokumentácia musí zostať v súlade s reálne existujúcimi HTML súbormi; každá nová podstránka potrebuje jasný zdroj pravdy, inak hrozia 404 pri deployi.
2. Dva súbory `tatus -sb` a `tore PROJECT_HANDOVER…` sú identické farebné `git diff` dumpy (36706 B) uložené s escape sekvenciami; môžu spôsobiť chaos v deploy balíku a mali by žiť mimo koreňa.
3. Viacero assetov je nevyužitých (`assets/img/logo.png`, `og-ubytovanie.jpg`, `placeholder.svg`, 3× káva fotky, „Neprustrelny podpis“), čo nafukuje repo a zvyšuje riziko nesprávneho použitia.
4. V `ubytovanie.html` existujú dva rozdielne subjecty v mailto (`Ubytovanie Kralovska 14` a `Kráľovská 14`); je to konzistentné, ale pôsobí ako duplikát.
5. `TODO` poznámka o otváracích hodinách je stále v produkčnom HTML → viditeľné pre návštevníkov.
6. `_trash/_iphone_export` obsahuje starú kópiu webu; pri ručnom deployi by sa mohol pomýliť cieľový súbor.

## 7. Odporúčané ďalšie kroky (max 10)
1. Udržiavať dokumentáciu len pre existujúce stránky, nové podstránky zapisovať do SITE_OVERVIEW/README až po potvrdení.
2. Presunúť alebo zmazať súbory `tatus -sb` a `tore …` (príp. archivovať v `_trash`).
3. Prečistiť nevyužité assety alebo ich aspoň zdokumentovať (kava fotky, logo.png, og-ubytovanie, placeholder, podpis bez prípony).
4. Doplniť potvrdené otváracie hodiny a odstrániť `TODO` z `index.html`.
5. Zjednotiť mailto subjecty na `ubytovanie.html`, aby sa zabránilo duplikátom v analytike.
6. Overiť, či JSON-LD nepotrebuje aktualizáciu po ďalších obsahových zmenách (kontakty, geodáta).
7. Rozhodnúť o publikovaní brand assetu („Neprustrelny podpis“) alebo ho archivovať mimo produkcie.
8. Zadokumentovať účel `_trash/_iphone_export`, aby sa pri deployi omylom nebrala stará kópia.
9. Pripraviť plán na aktualizáciu hero fotiek (README to žiada) – identifikovať zdroje.
10. Kontrolovať, či `kava.js` mailto funnel funguje na všetkých prehliadačoch (lokálne testy cez `python -m http.server`).

## Quick Wins (3)
1. Presunúť `tatus -sb` a `tore …` do `_trash` alebo ich zmazať – okamžité sprehľadnenie koreňa.
2. Odstrániť `TODO` poznámku z kontaktu, ak sú otváracie hodiny nepotrebné (alebo doplniť údaje).
3. Pridať príponu `.png` k súboru `fotky/neprustrelny/Neprustrelny podpis`, aby sa dal ľahko použiť.

## High Impact (3)
1. Nastaviť proces, ktorý pri každej novej stránke vyžaduje aktualizáciu dokumentácie pred deployom.
2. Aktualizovať fotografie (hero, galéria) podľa README TODO a odstrániť nepoužívané súbory – posilní brand konzistenciu.
3. Vybudovať jednoduchý automatizovaný link-check/test (napr. `npm` skript alebo `html-proofer`) pred deployom, aby sa pri FTP presune nestali 404 chyby.
