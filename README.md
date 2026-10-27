# Drift Barber — driftbarber.lk

Website for **Drift Barber** — *"Your Hair, Your Beauty, Our Craft."*
Barber & beauty salon in **Rajagiriya** (074 131 7373) and **Negombo** (076 677 7373), open **9am – 10.30pm** daily.

Layout follows the 8am Showcase style: a grid of gradient cards, an "I want to …" filter, and full-screen detail stories when a card is opened — plus a sticky nav bar.

## Files
- `index.html` — page structure (nav, intro, showcase grid, about, contact, footer, detail overlay)
- `style.css` — all styling and responsive rules
- `script.js` — card data (`CARDS`), icons, filter, detail overlay, mobile menu, open/closed status

## Editing content
All card text lives in the `CARDS` array at the top of `script.js` — edit titles, taglines, descriptions or add new cards there.
The service list (cuts, fades, beard, shave, colour, styling, facial, kids, treatments) is a starting set — confirm it matches what the studios actually offer.

## Run locally
Open `index.html` in a browser — no build step.

## Deploy (GitHub Pages)
Settings → Pages → Deploy from branch → `main` / root.
To use the domain, add a `CNAME` file containing `driftbarber.lk` and point the domain's DNS at GitHub Pages.
