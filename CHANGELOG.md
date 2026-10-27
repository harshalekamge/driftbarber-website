# Changelog — how this site was built

This is a step-by-step record of the work on driftbarber.lk, newest first. Each step matches a commit in this repo's history.

---

## v1.0 — Final (27 Oct 2026)

### Step 8 · Remove the station photo, image-free walk-in scene
- Deleted `images/station.jpg` and `images/station-sm.jpg` and every reference to them.
- Intro mosaic tiles and card-story panels went back to colour gradients with line icons.
- Built a new first-person **walk-in** scene behind *"Until you take a seat at Drift…"*. It's a WebGL shader with no images: a perspective checkerboard barbershop floor plus warm bokeh lights. Scrolling walks forward and the mouse steers the view.

### Step 7 · First-person scene, final polish and bug fixes
- Replaced the Three.js 3D model with a lightweight custom WebGL shader, which removed about 600KB of JavaScript.
- **Fix:** the nav load animation left inline styles behind. These hid the "I want to…" filter pill and pushed the centre nav links off-screen.
- **Fix:** on phones, the studios block rendered above the service cards.
- **Fix:** the headline panel was hidden from screen readers (`aria-hidden`).
- Nav links now stay visible beside the filter on wide screens (≥ 1360px).
- Removed dead styles and code.

### Step 6 · Retimed sections, mini deck design
- Intro, from the center tile onward, is about 40% shorter.
- Card fan and deal are about 40% longer, so there's more time to watch the cards sweep and deal.
- Grid → studios is about 40% shorter.
- Mini deck (bottom-right) became a designed stack: a branded front card with a scissors icon and "14 services", two fanned cards behind it, a hover fan-out and an "All services" tooltip.
- Stopped the "Pick your card" heading from being text-selected while scrolling.

### Step 5 · Faster pacing
- Cut the pinned scroll distances by about 40% overall (intro 4.6 → 3.3 screens, deck 12 → 6.5 screens).

### Step 4 · Studios inside the deck scene, slower transitions
- "Two studios. One craft." now slides up **inside the same pinned scene** while the card grid squeezes into the corner, the way 8am does with its integrations section. This removed the empty stage.
- Softer scrub and smooth-scroll easing.
- Lighter headline typography (thin weight, bold "Drift"), with a kicker line and subline.

### Step 3 · Holographic hover and 8am-style transitions
- **Hover:** a card rises out of the fan while its neighbours ease aside. In the grid, the hovered card lifts. Both get a rainbow foil rim, a holographic sheen that follows the pointer, and a 3D tilt.
- Bigger fan, plus a cascading deal path: cards dip to the lower-left and stream diagonally into the grid.
- Grid exit: the whole grid compacts toward the corner, then piles into the mini deck.
- Studios dims into the finale, and the cards scatter out of the deck across the dark finale.

### Step 2 · 8am Showcase motion system
I studied showcase.8am.com (GSAP + ScrollTrigger + Lenis) and rebuilt its scroll story for Drift:
1. Dark hero with an animated logo reveal.
2. Tiles fly in at different depths and lock into a mosaic.
3. A center tile tells a two-line story, then expands to full screen.
4. Service cards fan out like a hand of playing cards and sweep round as you scroll.
5. Cards deal into a 2×7 grid, and the "I want to…" filter appears in the nav.
6. Filtering glides the cards into a new layout (Flip on phones).
7. Clicking a card morphs it into a full-height panel. The story then scrolls **sideways** through intro → visual → steps → highlight → booking.
8. Studios accordion, a dark finale with a glass booking panel and floating parallax cards, and a split-panel modal menu.

Libraries are bundled locally in `vendor/`, so the site works without a CDN.

### Step 1 · First version
- Created the repo and built a single-page site from the Instagram bio (@driftbarber.lk): tagline, both studio numbers, hours, map link and follower count.
- Card-grid layout inspired by the 8am Showcase, with a nav bar, an "I want to…" filter, full-screen card details, contact tiles and a live open/closed status in Sri Lanka time.

---

## What's on the site (content source)
All facts come from the @driftbarber.lk Instagram bio:
- "Your Hair, Your Beauty, Our Craft."
- Rajagiriya — 074 131 7373
- Negombo — 076 677 7373
- Open 9am – 10.30pm
- 43.4K followers, 2,407 posts
- Map: https://maps.app.goo.gl/58YBZ3KYdZ7eMMZD6

The list of services (cuts, fades, beard, shave, colour, styling, facials, kids, treatments) is a starting set. **Confirm it with the studios** and edit the `CARDS` list in `script.js` to match.

## Ideas for later
- Add Drift's own photos or a short studio video (see "Adding photos" in the README).
- Add a `CNAME` file and turn on GitHub Pages to put the site live on driftbarber.lk.
