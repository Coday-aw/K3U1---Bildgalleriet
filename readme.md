![CI](https://github.com/coday-aw/githubActions-demo/actions/workflows/ci.yml/badge.svg)
![codecov](https://codecov.io/gh/coday-aw/K3U1---Bildgalleriet/branch/main/graph/badge.svg)

## Bildgalleriet
Ett vanilla JavaScript‑projekt som visar ett dynamiskt bildgalleri med kategorifilter, sökfunktion, lazy‑loading och modalvisning. Projektet använder Jest för automatiska tester, ESLint för kodkvalitet och GitHub Actions för CI/CD.

## Funktioner
- Dynamiskt bildgalleri - Bilder laddas in i batcher och visas med lazy‑loading för bättre prestanda.

- Sökfunktion - Filtrerar bilder baserat på taggar och kategorier.

- Kategorifilter - Fördefinierade kategorier som uppdaterar galleriet direkt.

- Modalvisning - Klicka på en bild för att se den i större format.

- Tillgänglighetsförbättringar - Fokusstyrning, aria‑attribut och semantiska element.

- Automatiska tester med Jest - Logikfunktioner testas för att säkerställa stabilitet.

- CI/CD med GitHub Actions - Kör tester och linting automatiskt vid varje push eller pull request.

## Testning 
Projektet använder Jest. Testerna täcker bland annat:

- söklogik

- kategorifilter

- JSON‑parsing via mockad fetch

### Kör tester lokalt:
npm test


## CI/CD Pipeline
GitHub Actions workflow inkluderar:

installation av dependencies

körning av ESLint

körning av Jest‑tester

statusrapport direkt i GitHub

Det säkerställer att koden alltid är testad och validerad innan merge.

## Projektstruktur
.github/workflows/ci.yml
images
src/
  app.js
  logic.js
  dom.js
styles.css
index.html
gallery.test.js
