# Drift Barber — driftbarber.lk

Website for **Drift Barber** — *"Your Hair, Your Beauty, Our Craft."*
Barber & beauty salon in **Rajagiriya** (074 131 7373) and **Negombo** (076 677 7373), open **9am – 10.30pm** daily.

The motion design follows the 8am Showcase style, built with GSAP + ScrollTrigger + Flip and Lenis smooth scrolling:

1. **Intro** – dark hero, then tiles fly in at different depths and lock into a mosaic. A center tile tells a short story, then expands into a **first-person walk-in**: a WebGL scene with a barbershop checkerboard floor and warm bokeh lights. Scrolling walks you forward, and the mouse steers the view.
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
- `images/` – put Drift's own photos here

## Adding photos
The site currently uses no photos. To add Drift's own photos, put them in `images/` and add `img: "images/your-photo.jpg"`:
- to a tile in the `TILES` list (intro mosaic), or
- to a card in the `CARDS` list (it appears in that card's story panel).

## Editing the content
Everything you'd normally change is near the top of `script.js`:

| What | Where |
|---|---|
| Phone numbers, map link, Instagram | `PHONE_RAJ`, `PHONE_NEG`, `MAPS`, `IG` |
| Service cards (title, tag, colours, story text, steps) | `CARDS` |
| Intro mosaic tiles | `TILES` |
| Studios accordion | `ACC` |
| Opening hours (open/closed badge) | `isOpenNow()` |
| Text in the hero, intro story and finale | `index.html` |

The card filter groups are set by each card's `cat` (`services`, `groom`, `locations`, `visit`).

## Tuning the scroll speed
- Intro length: `INTRO_VH_PER_UNIT` and the durations in `buildIntro()`.
- Card fan / grid / studios length: the timeline in `buildDeckDesktop()`. The pin length is `deckTL.duration() × 0.6` screens.
- Smooth-scroll feel: `lerp` in `new Lenis({...})`. Lower is smoother and slower.

## Run locally
```bash
python -m http.server 8000
```
Then open http://localhost:8000. You can also use the VS Code **Live Server** extension.

## Deploy (GitHub Pages)
Go to Settings → Pages → Deploy from branch → `main` / root.
For the custom domain, add a `CNAME` file containing `driftbarber.lk` and point the domain's DNS at GitHub Pages.

## History
See [CHANGELOG.md](CHANGELOG.md) for every step of the build.
