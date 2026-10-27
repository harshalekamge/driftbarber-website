# Drift Barber — driftbarber.lk

Website for **Drift Barber** — *"Your Hair, Your Beauty, Our Craft."*
Barber & beauty salon in **Rajagiriya** (074 131 7373) and **Negombo** (076 677 7373), open **9am – 10.30pm** daily.

The motion design follows the 8am Showcase style, built with GSAP + ScrollTrigger + Flip and Lenis smooth scrolling:

1. **Intro** – dark hero, then tiles fly in at different depths and lock into a mosaic. A center tile tells a short story, then expands to full screen.
2. **Deck** – the service cards fan out like a hand of cards and sweep round as you scroll, deal into a 2×7 grid, then collapse into a mini deck in the corner. That mini deck is clickable and takes you back to the grid.
3. **Filter** – the "I want to …" pill appears in the nav bar when the grid is on screen, and the cards glide into their new layout.
4. **Card story** – clicking a card morphs it into a full-height panel. The story then scrolls sideways, with parallax, through intro → visual → steps → highlight → booking.
5. **Studios** – an accordion of pills (Rajagiriya, Negombo, hours, Instagram, booking).
6. **Finale** – a dark booking panel with floating parallax cards.

On phones (≤ 820px) the deck becomes a scrolling 2-column grid, and the card story scrolls vertically.

## Files
- `index.html` – page structure
- `style.css` – all styling and responsive rules
- `script.js` – content (`CARDS`, `TILES`, `ACC`) and all animation code
- `vendor/` – GSAP, ScrollTrigger, Flip and Lenis, bundled locally, so the site works without a CDN
- `images/` – put your photos here

## Adding real photos
The mosaic tiles and card stories currently use gradients and line art. To use real photos, drop them into `images/` and add `img: "images/your-photo.jpg"`:
- to a tile in the `TILES` list (intro mosaic), or
- to a card in the `CARDS` list (it appears in that card's story panel).

## Run locally
```bash
python -m http.server 8000
```
Then open http://localhost:8000. You can also use the VS Code **Live Server** extension.

## Deploy (GitHub Pages)
Go to Settings → Pages → Deploy from branch → `main` / root.
For the custom domain, add a `CNAME` file containing `driftbarber.lk` and point the domain's DNS at GitHub Pages.
