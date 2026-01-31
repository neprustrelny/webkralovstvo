# Kráľovstvo Skalica – web

Statický web prepájajúci štyri cesty (Koloniál káva, Thajské masáže, Bike aréna, Ubytovanie) v historickom dome na Kráľovskej 14 v Skalici.

## Lokálne spustenie
1. Potrebný je iba ľubovoľný HTTP server (sú to čisté HTML/CSS/JS súbory).
2. V koreňovom adresári spusti napr. `python3 -m http.server 8080` a otvor `http://localhost:8080`.
3. Pri úpravách CSS/JS nie je nutné nič kompilovať – stačí obnoviť stránku.

## Deploy / cutover
- Výsledné súbory skopíruj na hosting (FTP/SFTP) do koreňa domény `kralovstvo.sk`. Zachovaj štruktúru priečinkov `assets/`, `fotky/` a všetky HTML súbory v root-e.
- Pred prepisom zálohuj starý web `nakralovskej.sk`. Po prepnutí domény over, že `index.html`, `kava.html`, `masaze.html`, `bike.html` a `ubytovanie.html` sú dostupné.
- V prípade CDN alebo reverse proxy aktualizuj cache a skontroluj, že canonical (`https://kralovstvo.sk/`) a OG metadáta smerujú na novú doménu.
- Stripe ani iné integračné skripty sa nemenili – stačí nasadiť statické súbory.

## Obsah a TODO
– Kontakty a adresy sú priamo v HTML. Telefón a e-mail používajú doménu `kralovstvo.sk` (napr. `+421 902 842 251`, `ubytovanie@kralovstvo.sk`, `ahoj@kralovstvo.sk`).
- Otváracie hodiny Koloniálu a bike arény zatiaľ nie sú známe – v homepage kontakte je TODO poznámka, ktorú treba po doplnení odstrániť.
- Ďalšie plánované texty / zdroje sú rozpísané v `docs/content-plan.md`.

## Kontrolný zoznam pred ostrým spustením
- Doplniť reálne otváracie hodiny, prípadne ďalšie telefónne čísla pre jednotlivé prevádzky.
- Pridať aktuálne fotografie do priečinka `fotky/` a zmeniť hero backgroundy, ak budú nové vizuály.
- Overiť, že všetky odkazy (`mailto:`, `tel:`, `maps`) smerujú na správne adresy a telefónne čísla.
