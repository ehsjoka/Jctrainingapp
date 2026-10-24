# JC Training — PWA MVP

Installationsbar träningsapp för iPhone byggd med vanlig HTML, CSS och JavaScript.

## MVP
- Fungerar som PWA och kan läggas på iPhones hemskärm
- Offline via service worker
- All data lagras lokalt på enheten
- Obegränsat antal templates
- Tre starttemplates för styrka
- Spinning hög, låg cardio och padel
- Lägg till/ta bort/redigera templates
- Lägg till egna övningar
- Vikt och reps skrivs direkt som siffror
- Visar föregående vikt/reps per set
- Vilotimer
- Träningshistorik och månadskalender
- Senaste 10 tillfällen per övning
- CSV import/export av templates
- JSON backup/restore av all lokal data

## Ingen backend
Appen använder ingen server för användardata och kräver inget konto.

## GitHub Pages
När PWA-branchen är mergad till main:

1. Öppna repository Settings
2. Välj Pages
3. Under Build and deployment välj Deploy from a branch
4. Välj main och /(root)
5. Spara
6. Öppna den publicerade GitHub Pages-adressen i Safari på iPhone
7. Safari: Dela → Lägg till på hemskärmen

Efter första laddningen är appens skal tillgängligt offline.

## Viktigt om lokal data
Träningsdata ligger i Safari/PWA-lagringen på just den enheten. Använd JSON-backup under Data regelbundet innan du rensar webbplatsdata eller byter telefon.

## Native-version
Den tidigare SwiftUI-prototypen finns separat i branchen `feature/mvp-ui`.
