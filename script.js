/* ==========================================================
   Drift Barber — motion engine (GSAP + ScrollTrigger + Flip + Lenis)
   Sections: intro (hero → mosaic → full-screen), deck (fan → grid → mini deck),
   studios (accordion), finale (floating cards), menu, card story.
   ========================================================== */

gsap.registerPlugin(ScrollTrigger, Flip);
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const PHONE_RAJ = { label: "074 131 7373", href: "tel:+94741317373" };
const PHONE_NEG = { label: "076 677 7373", href: "tel:+94766777373" };
const MAPS = "https://maps.app.goo.gl/58YBZ3KYdZ7eMMZD6";
const IG = "https://www.instagram.com/driftbarber.lk/";
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- line icons (100×100) ---------- */
const ICONS = {
  scissors: `<svg viewBox="0 0 100 100"><circle cx="28" cy="72" r="12"/><circle cx="72" cy="72" r="12"/><path d="M36 63 74 14M64 63 26 14"/><circle cx="50" cy="44" r="2.5"/></svg>`,
  clipper: `<svg viewBox="0 0 100 100"><rect x="34" y="30" width="32" height="58" rx="12"/><path d="M30 30h40v-8H30z"/><path d="M34 22v-8M42 22v-8M50 22v-8M58 22v-8M66 22v-8"/><path d="M42 48h16M42 58h16"/><circle cx="50" cy="74" r="4"/></svg>`,
  beard: `<svg viewBox="0 0 100 100"><path d="M24 30c0-12 12-20 26-20s26 8 26 20v14"/><path d="M24 44c0 22 12 44 26 44s26-22 26-44"/><path d="M36 58c6-5 22-5 28 0"/><path d="M38 40h6M56 40h6"/><path d="M44 72c4 3 8 3 12 0"/></svg>`,
  razor: `<svg viewBox="0 0 100 100"><path d="M18 62 62 18l20 20-44 44z"/><path d="M28 72 72 28"/><path d="M38 82l-8 8M30 74l-14 14"/><path d="M50 30h14v14"/></svg>`,
  colour: `<svg viewBox="0 0 100 100"><path d="M50 12c14 18 26 32 26 48a26 26 0 0 1-52 0c0-16 12-30 26-48z"/><path d="M38 62a12 12 0 0 0 12 12"/><path d="M50 40v6M44 50h12"/></svg>`,
  dryer: `<svg viewBox="0 0 100 100"><circle cx="40" cy="38" r="22"/><circle cx="40" cy="38" r="9"/><path d="M62 30h20v16H62"/><path d="M36 60l-6 30h16l4-30"/><path d="M86 34h6M86 42h6"/></svg>`,
  sparkle: `<svg viewBox="0 0 100 100"><path d="M50 14c3 18 10 25 28 28-18 3-25 10-28 28-3-18-10-25-28-28 18-3 25-10 28-28z"/><path d="M78 64c1 7 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-4 11-11z"/><path d="M22 70c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8z"/></svg>`,
  kid: `<svg viewBox="0 0 100 100"><circle cx="50" cy="40" r="20"/><path d="M36 30c6-8 22-8 28 0"/><path d="M42 40h2M56 40h2"/><path d="M44 48c4 3 8 3 12 0"/><path d="M28 90c2-16 12-24 22-24s20 8 22 24"/></svg>`,
  treatment: `<svg viewBox="0 0 100 100"><rect x="34" y="34" width="32" height="54" rx="8"/><path d="M42 34V24h16v10"/><path d="M46 24v-8h14"/><path d="M34 54h32"/><path d="M44 66c3 4 9 4 12 0"/></svg>`,
  pin: `<svg viewBox="0 0 100 100"><path d="M50 90S22 60 22 40a28 28 0 0 1 56 0c0 20-28 50-28 50z"/><circle cx="50" cy="40" r="10"/><path d="M30 92h40"/></svg>`,
  wave: `<svg viewBox="0 0 100 100"><path d="M50 88S24 60 24 42a26 26 0 0 1 52 0c0 18-26 46-26 46z"/><path d="M36 42c5-5 9-5 14 0s9 5 14 0"/><path d="M10 90c8-6 14-6 22 0s14 6 22 0 14-6 22 0 10 4 14 2"/></svg>`,
  clock: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="36"/><path d="M50 26v24l16 10"/><path d="M50 14v4M86 50h-4M50 86v-4M14 50h4"/></svg>`,
  phone: `<svg viewBox="0 0 100 100"><rect x="30" y="10" width="40" height="80" rx="10"/><path d="M44 18h12"/><circle cx="50" cy="80" r="3"/><path d="M76 34c5 5 5 13 0 18M82 28c9 9 9 21 0 30"/></svg>`,
  camera: `<svg viewBox="0 0 100 100"><rect x="16" y="16" width="68" height="68" rx="20"/><circle cx="50" cy="50" r="16"/><circle cx="70" cy="30" r="3"/></svg>`,
  comb: `<svg viewBox="0 0 100 100"><path d="M12 40h76v14H12z"/><path d="M18 54v26M26 54v26M34 54v26M42 54v26M50 54v26M58 54v26M66 54v26M74 54v26M82 54v26"/></svg>`,
  chair: `<svg viewBox="0 0 100 100"><path d="M30 18h40v30H30z"/><path d="M24 48h52v14H24z"/><path d="M20 40v22M80 40v22"/><path d="M50 62v18M32 88h36M50 80v8"/></svg>`,
};
/* small UI icons for the accordion pills */
const UI = {
  pin: `<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
  wave: `<svg viewBox="0 0 24 24"><path d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 1 2 1"/><path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="12" cy="7" r="3"/></svg>`,
  clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  camera: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg>`,
  phone: `<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`,
};

/* ==========================================================
   DATA
   ========================================================== */
const CARDS = [
  { id: "signature-cut", crop: [42, 43, 300], cat: "services", catLabel: "Haircuts", icon: "scissors", title: "Signature Haircut", tag: "Shaped to your face",
    g: "linear-gradient(160deg,#dfe3ff 0%,#eef0ff 45%,#fff2d9 100%)", c1: "#6a6fd8", c2: "#24285e",
    headline: "A cut that’s built around you", sub: "Consult. Cut. Finish.",
    text: "Every cut starts with a quick chat about your hair, your face shape and how you actually style it — then we cut to suit.",
    points: [["Consultation", "Talk through the look you want before the first snip."], ["Precision cut", "Scissor and clipper work tailored to your hair type."], ["Wash & style", "Finished properly, so you leave camera-ready."]],
    stat: ["Over 2,400 looks shared from the Drift chair.", "@driftbarber.lk on Instagram"] },
  { id: "skin-fade", crop: [80, 55, 300], cat: "services", catLabel: "Fades", icon: "clipper", title: "Skin Fade", tag: "Clean blends every time",
    g: "linear-gradient(165deg,#ff8a8a 0%,#ffb0a0 50%,#ffe0c4 100%)", c1: "#e2553f", c2: "#3a1520",
    headline: "Seamless fades, zero harsh lines", sub: "Low, mid, high or taper",
    text: "From a subtle taper to a sharp high skin fade, our barbers blend it smooth and line it up crisp.",
    points: [["Pick your fade", "Low, mid, high, drop or burst — we’ll guide you."], ["Blend & detail", "Gradual transitions with a clean finish."], ["Line-up", "Sharp edges on the hairline and neckline."]],
    stat: ["The most requested cut in both studios.", "Rajagiriya & Negombo"] },
  { id: "beard", crop: [48, 30, 360], cat: "groom", catLabel: "Beard", icon: "beard", title: "Beard Sculpt", tag: "Lines that hold their shape",
    g: "linear-gradient(160deg,#fff7b8 0%,#ffe48a 50%,#f4c04f 100%)", c1: "#d79a2b", c2: "#3a2a10",
    headline: "Your beard, properly shaped", sub: "Trim. Shape. Line.",
    text: "Growing it out or keeping it tight, we shape your beard to balance your face and keep the edges sharp.",
    points: [["Trim & shape", "Length and shape matched to your face."], ["Razor lines", "Clean cheek and neck lines."], ["Finish", "Beard oil or balm so it looks and feels right."]],
    stat: ["A sharp beard line changes the whole look.", "Pair it with any cut"] },
  { id: "shave", crop: [45, 50, 420], cat: "groom", catLabel: "Shave", icon: "razor", title: "Hot Towel Shave", tag: "Old-school smooth",
    g: "linear-gradient(160deg,#ece9ff 0%,#dfe8ff 45%,#c9eef0 100%)", c1: "#4fa3b5", c2: "#14283a",
    headline: "The classic shave, done slowly", sub: "Warm towel. Sharp blade.",
    text: "A proper barber-chair shave: hot towels to prep, a close straight-edge finish and a cooling after-care.",
    points: [["Hot towel prep", "Opens up the skin and softens the hair."], ["Close shave", "Careful straight-edge work."], ["Cool down", "Soothing after-care to finish."]],
    stat: ["Ten minutes in the chair, smooth all day.", "Ask for it with your cut"] },
  { id: "colour", crop: [78, 25, 260], cat: "services", catLabel: "Colour", icon: "colour", title: "Hair Colour", tag: "Bold or barely there",
    g: "linear-gradient(165deg,#ffb347 0%,#ff8a5c 55%,#f0604d 100%)", fg: "#2b1410", c1: "#f0604d", c2: "#2b1410",
    headline: "Colour that makes a statement", sub: "From grey blending to full colour",
    text: "Cover the greys, add depth or go full platinum — talk to the studio about the shade you’re after.",
    points: [["Grey blending", "Natural-looking coverage."], ["Highlights & tones", "Add dimension and character."], ["Fashion colour", "Bleach and bold shades for the brave."]],
    stat: ["From subtle to platinum — your call.", "Consultation included"] },
  { id: "styling", crop: [32, 24, 320], cat: "services", catLabel: "Styling", icon: "dryer", title: "Wash & Style", tag: "Ready for any occasion",
    g: "linear-gradient(160deg,#ffe6d6 0%,#ffd8cc 45%,#bfe6ee 100%)", c1: "#e59a86", c2: "#2a2236",
    headline: "Walk in. Walk out event-ready.", sub: "Blow-dry and finish",
    text: "Wedding, shoot or a big night? A wash, blow-dry and styled finish that holds up all evening.",
    points: [["Wash", "Cleanse and condition."], ["Blow-dry", "Volume and direction set in."], ["Product finish", "Hold and texture to last the night."]],
    stat: ["Open until 10.30pm — perfect before a night out.", "Both studios, every day"] },
  { id: "facial", crop: [66, 12, 300], cat: "groom", catLabel: "Skin", icon: "sparkle", title: "Facial & Skin Care", tag: "Fresh skin, fresh start",
    g: "linear-gradient(165deg,#1d6e8c 0%,#2a93a8 55%,#5ec4c9 100%)", fg: "#ffffff", c1: "#2a93a8", c2: "#0c2430",
    headline: "Look as sharp as your cut", sub: "Cleanse. Refresh. Glow.",
    text: "A grooming facial to clear, refresh and brighten your skin — the perfect add-on to any cut or shave.",
    points: [["Deep cleanse", "Lift away oil, dirt and dead skin."], ["Mask & massage", "Relax while your skin recharges."], ["Hydrate", "Finish fresh and moisturised."]],
    stat: ["Great hair deserves great skin.", "Add on to any service"] },
  { id: "kids", crop: [45, 60, 300], cat: "services", catLabel: "Kids", icon: "kid", title: "Kids’ Cuts", tag: "Little clients, big style",
    g: "linear-gradient(160deg,#fff9c4 0%,#f8f1b8 45%,#d6f2e4 100%)", c1: "#9fcf8f", c2: "#1d3324",
    headline: "Fresh cuts for the little ones", sub: "Patient barbers, happy kids",
    text: "A relaxed, friendly chair for younger clients — so they leave looking smart and wanting to come back.",
    points: [["Gentle approach", "Patient barbers who take it easy."], ["Trend or classic", "Whatever style they’re asking for."], ["Quick & tidy", "In and out without the fuss."]],
    stat: ["Their first great haircut starts here.", "Friendly for all ages"] },
  { id: "treatment", crop: [82, 26, 280], cat: "groom", catLabel: "Treatments", icon: "treatment", title: "Hair Treatment", tag: "Healthier hair, every day",
    g: "linear-gradient(165deg,#2bb39b 0%,#4dc2b0 50%,#8fd3e6 100%)", fg: "#0f2b27", c1: "#2bb39b", c2: "#0d2a29",
    headline: "Bring tired hair back to life", sub: "Nourish & restore",
    text: "Treatments to tame frizz, repair damage and add shine — ask the studio which one suits your hair.",
    points: [["Hair check", "We look at what your hair needs."], ["Treatment", "Nourishing care applied by the pros."], ["Aftercare tips", "Keep it healthy between visits."]],
    stat: ["Healthy hair holds a cut longer.", "Ask your barber"] },
  { id: "rajagiriya", cat: "locations", catLabel: "Studio", icon: "pin", title: "Rajagiriya Studio", tag: "074 131 7373",
    g: "linear-gradient(160deg,#c9f2ff 0%,#aeeadf 50%,#7bd8a8 100%)", c1: "#4fbf8f", c2: "#0f2a22",
    headline: "Drift Barber, Rajagiriya", sub: "Our Colombo-side studio",
    text: "Drop into our Rajagiriya studio any day from 9am until 10.30pm. Call ahead to grab a chair at a time that suits you.",
    actions: [["Call Rajagiriya", PHONE_RAJ.href, "red"], ["Directions", MAPS, "glass"]],
    points: [["Phone", PHONE_RAJ.label], ["Hours", "Every day, 9:00am – 10:30pm"], ["Tip", "Evenings fill up fast — call before you come."]],
    stat: ["074 131 7373", "Call the Rajagiriya studio"] },
  { id: "negombo", cat: "locations", catLabel: "Studio", icon: "wave", title: "Negombo Studio", tag: "076 677 7373",
    g: "linear-gradient(165deg,#ffe9b8 0%,#ffd28a 50%,#ffb36b 100%)", c1: "#f0a04b", c2: "#2e1a0c",
    headline: "Drift Barber, Negombo", sub: "Our coastal studio",
    text: "Same craft, by the coast. Our Negombo studio is open daily from 9am until 10.30pm.",
    actions: [["Call Negombo", PHONE_NEG.href, "red"], ["Directions", MAPS, "glass"]],
    points: [["Phone", PHONE_NEG.label], ["Hours", "Every day, 9:00am – 10:30pm"], ["Tip", "Weekends are busiest — call ahead."]],
    stat: ["076 677 7373", "Call the Negombo studio"] },
  { id: "hours", cat: "visit", catLabel: "Hours", icon: "clock", title: "Open Till Late", tag: "9am – 10.30pm daily",
    g: "linear-gradient(160deg,#ff7b7b 0%,#ffa48a 45%,#fff1c2 100%)", c1: "#ef6a5a", c2: "#2c1420",
    headline: "A fresh cut that fits your schedule", sub: "Open 9am – 10.30pm",
    text: "Early start before work or a late trim after dinner — both studios keep long hours, every day.",
    points: [["Mornings", "Doors open at 9:00am."], ["Evenings", "Last chairs until 10:30pm."], ["Every day", "Both Rajagiriya and Negombo."]],
    stat: ["13½ hours a day, 7 days a week.", "Rajagiriya & Negombo"] },
  { id: "book", cat: "visit", catLabel: "Booking", icon: "phone", title: "Book a Chair", tag: "Call the studio",
    g: "linear-gradient(165deg,#f6f1ff 0%,#e6e0ff 45%,#c8dcff 100%)", c1: "#7b7fe0", c2: "#1a1d45",
    headline: "Skip the wait, book your chair", sub: "One call is all it takes",
    text: "Ring the studio nearest to you, choose a time and you’re set.",
    actions: [["Rajagiriya", PHONE_RAJ.href, "red"], ["Negombo", PHONE_NEG.href, "red"]],
    points: [["Rajagiriya", PHONE_RAJ.label], ["Negombo", PHONE_NEG.label], ["Hours", "9:00am – 10:30pm, daily"]],
    stat: ["One call. One chair. Zero waiting.", "Call either studio"] },
  { id: "instagram", cat: "visit", catLabel: "Instagram", icon: "camera", title: "The Drift Feed", tag: "43.4K following the craft",
    g: "linear-gradient(160deg,#3b2d8f 0%,#a64b8f 55%,#f07a5a 100%)", fg: "#ffffff", c1: "#a64b8f", c2: "#1d1440",
    headline: "2,400+ looks and counting", sub: "@driftbarber.lk",
    text: "Fresh fades, colour transformations and studio moments — see the latest work and find your next look.",
    actions: [["Open Instagram", IG, "red"]],
    points: [["43.4K", "people follow Drift on Instagram"], ["2,407", "posts of real client work"], ["Daily", "new cuts shared from both studios"]],
    stat: ["43.4K followers and growing.", "instagram.com/driftbarber.lk"] },
];

/* Mosaic tiles (desktop rect: left/top/width/height in %; mobile rect optional).
   Add a photo by setting img: "images/your-photo.jpg". */
const PHOTO = "images/station-sm.jpg";
// photo: [focus-x %, focus-y %, zoom %] — crops of the station photo, tinted by the tile gradient
const TILES = [
  { r: [0, -2, 13.5, 55], m: [0, -6, 31, 32], g: "linear-gradient(170deg,#3d2c58,#7a3d4d 60%,#c56b4b)", photo: [50, 55, 260], label: "The Drift station", depth: .9 },
  { r: [0, 55, 13.5, 50], m: [0, 74, 48, 30], g: "linear-gradient(160deg,#20304f,#36577a)", photo: [45, 60, 330], label: "Detail combs", depth: .5 },
  { r: [14.7, -10, 27, 32], m: [33, -6, 34, 32], g: "linear-gradient(140deg,#2a2f5e,#4a4f8f 55%,#8f7ab8)", photo: [42, 43, 300], label: "Precision cuts", depth: .7 },
  { r: [42.9, -10, 13.5, 32], g: "linear-gradient(160deg,#fff7d6,#dff3ea)", light: true, depth: .35 },
  { r: [57.3, -10, 13, 32], m: [69, -6, 31, 32], g: "linear-gradient(170deg,#5a2a2a,#a8553f)", photo: [45, 50, 420], label: "Straight razor", depth: .6 },
  { r: [14.7, 24, 13.2, 52], g: "linear-gradient(170deg,#3a2a1a,#8f5a2c 60%,#d9a05b)", art: "beard", label: "Beard sculpt", depth: 1 },
  { r: [71.3, -6, 20, 39], g: "linear-gradient(150deg,#163a44,#2a7b86 60%,#7fd0c8)", photo: [66, 12, 300], label: "Brushes & dusters", depth: .8 },
  { r: [92.3, -6, 12, 39], g: "linear-gradient(170deg,#45233f,#b04f6c)", art: "colour", label: "Colour", depth: .45 },
  { r: [71.3, 35, 13, 30], g: "linear-gradient(160deg,#fbe9ff,#e6ecff)", light: true, stat: ["43.4K", "Instagram followers"], depth: .65 },
  { r: [85.2, 35, 14, 30], g: "linear-gradient(170deg,#1f2a4a,#3c4f8a)", photo: [80, 55, 300], label: "Skin fades", depth: .55 },
  { r: [14.7, 78, 20, 30], m: [50, 74, 50, 30], g: "linear-gradient(160deg,#fff1dc,#ffd9c9)", light: true, stat: ["9am–10.30pm", "Open every day"], depth: .75 },
  { r: [35.6, 78, 20, 30], g: "linear-gradient(150deg,#2c1e3e,#6c3a6b 60%,#c06a7a)", photo: [32, 24, 320], label: "Wash & style", depth: .9 },
  { r: [56.5, 78, 13.8, 30], g: "linear-gradient(170deg,#203a2e,#3f7a5a)", art: "pin", label: "Rajagiriya", depth: .4 },
  { r: [71.3, 67, 20, 40], g: "linear-gradient(160deg,#2a1d12,#7a4a22 60%,#e0a25a)", photo: [82, 26, 280], label: "Uppercut finishes", depth: .7 },
  { r: [92.3, 67, 12, 40], g: "linear-gradient(170deg,#e9e6ff,#d7f1ff)", light: true, art: "wave", label: "Negombo", depth: .5 },
];

/* ==========================================================
   HELPERS
   ========================================================== */
function splitWords(el) {
  if (!el || el.dataset.splitDone) return;
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span"); w.className = "w";
          const i = document.createElement("span"); i.textContent = part;
          w.appendChild(i); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.classList.contains("w")) walk(n);
    });
  };
  walk(el);
  el.dataset.splitDone = "1";
}
$$("[data-split]").forEach(splitWords);
const words = (sel) => $$(`${sel} .w > span`);

function cardHTML(c, i) {
  return `<button class="card" data-i="${i}" data-cat="${c.cat}" aria-label="${c.title} — ${c.tag}">
    <span class="face" style="--g:${c.g};${c.fg ? `--fg:${c.fg}` : ""}">
      <span class="c-title">${c.title}</span>
      <span class="c-icon" aria-hidden="true">${ICONS[c.icon]}</span>
      <span class="c-foot"><span class="c-tag">${c.tag}</span><span class="c-mark"><b>Drift</b><i>${c.catLabel}</i></span></span>
      <span class="foil" aria-hidden="true"></span><span class="rim" aria-hidden="true"></span>
    </span></button>`;
}

function isOpenNow() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" }));
  const m = now.getHours() * 60 + now.getMinutes();
  return m >= 9 * 60 && m < 22 * 60 + 30;
}
function paintOpenStatus() {
  const open = isOpenNow();
  $$("[data-open-status]").forEach((el) => {
    el.textContent = open ? "● Open now" : "● Closed · opens 9am";
    el.classList.toggle("open", open); el.classList.toggle("closed", !open);
  });
}

/* ==========================================================
   RENDER STATIC MARKUP
   ========================================================== */
// mosaic tiles
const mosaic = $("#mosaic");
mosaic.insertAdjacentHTML("afterbegin", TILES.map((t) => {
  const [l, tp, w, h] = t.r;
  const inner = t.img ? `<img src="${t.img}" alt="" loading="lazy">`
    : t.photo ? `<span class="tile-photo" style="background-image:url(${PHOTO});background-position:${t.photo[0]}% ${t.photo[1]}%;background-size:${t.photo[2]}%"></span>`
    : t.stat ? `<span class="tile-stat"><strong>${t.stat[0]}</strong><span>${t.stat[1]}</span></span>`
    : t.art ? `<span class="tile-art">${ICONS[t.art]}</span>` : "";
  const label = t.label ? `<span class="tile-label">${t.label}</span>` : "";
  const mob = t.m ? `--ml:${t.m[0]}%;--mt:${t.m[1]}%;--mw:${t.m[2]}%;--mh:${t.m[3]}%;` : "";
  return `<div class="tile${t.light ? " light" : ""}${t.photo ? " has-photo" : ""}" data-depth="${t.depth}" data-mobile="${t.m ? 1 : 0}"
    style="--l:${l}%;--t:${tp}%;--w:${w}%;--h:${h}%;${mob}--g:${t.g}">${inner}${label}</div>`;
}).join(""));
// mobile tile positions
const mobileTileCSS = document.createElement("style");
mobileTileCSS.textContent = `@media (max-width:820px){.tile[data-mobile="1"]{left:var(--ml);top:var(--mt);width:var(--mw);height:var(--mh)}}`;
document.head.appendChild(mobileTileCSS);

// cards
const deckCards = $("#deckCards");
deckCards.innerHTML = CARDS.map(cardHTML).join("");
const cardEls = $$(".card", deckCards);
const N = cardEls.length;

// studios accordion
const ACC = [
  { key: "raj", pill: "Studio in <b>Rajagiriya</b>", icon: UI.pin, kicker: "Studio 01", title: "Rajagiriya",
    text: "Our Colombo-side home. Walk in for a fade, a beard sculpt or the full works — or call ahead and your chair will be waiting.",
    big: ["Call", PHONE_RAJ.label], g: "linear-gradient(150deg,#7bd8a8,#2a93a8 60%,#1d3d6e)", art: "pin",
    actions: [["Call Rajagiriya", PHONE_RAJ.href, "dark"], ["Directions", MAPS, "ghost"]] },
  { key: "neg", pill: "Studio in <b>Negombo</b>", icon: UI.wave, kicker: "Studio 02", title: "Negombo",
    text: "Same Drift craft, by the coast. The Negombo studio keeps the same long hours, every day of the week.",
    big: ["Call", PHONE_NEG.label], g: "linear-gradient(150deg,#ffd28a,#f07a5a 60%,#8a2f4f)", art: "wave",
    actions: [["Call Negombo", PHONE_NEG.href, "dark"], ["Directions", MAPS, "ghost"]] },
  { key: "hours", pill: "Open <b>every day</b>", icon: UI.clock, kicker: "Opening hours", title: "9am – 10.30pm",
    text: "Early start before work or a late trim after dinner. Both studios are open seven days a week.",
    status: true, big: ["Every day", "13½ hours"], g: "linear-gradient(150deg,#ff9a8a,#a64b8f 60%,#3b2d8f)", art: "clock",
    actions: [["Book a chair", "#finale", "dark"]] },
  { key: "ig", pill: "Follow on <b>Instagram</b>", icon: UI.camera, kicker: "@driftbarber.lk", title: "43.4K followers",
    text: "Over 2,400 posts of real client work — fresh fades, colour transformations and studio moments. Find your next look.",
    big: ["Posts", "2,407"], g: "linear-gradient(150deg,#3b2d8f,#a64b8f 55%,#f07a5a)", art: "camera",
    actions: [["Open Instagram", IG, "dark"]] },
  { key: "book", pill: "Book a <b>chair</b>", icon: UI.phone, kicker: "Booking", title: "One call away",
    text: "Ring the studio nearest to you, choose a time and you’re set. No apps, no forms.",
    big: ["Rajagiriya · Negombo", "Call now"], g: "linear-gradient(150deg,#c8dcff,#7b7fe0 55%,#24285e)", art: "phone",
    actions: [["Rajagiriya", PHONE_RAJ.href, "dark"], ["Negombo", PHONE_NEG.href, "dark"]] },
];
$("#acc").innerHTML = ACC.map((a, i) => `
  <div class="acc-item${i === 0 ? " active" : ""}" data-k="${a.key}" tabindex="0" role="button" aria-expanded="${i === 0}">
    <div class="acc-pill"><span class="acc-pill-label">${a.pill}</span><span class="acc-pill-icon">${a.icon}</span></div>
    <div class="acc-content">
      <div class="acc-text">
        <div><p class="acc-kicker">${a.kicker}</p><h3>${a.title}</h3></div>
        <p>${a.text}</p>
        ${a.status ? `<span class="open-badge" data-open-status></span>` : ""}
        <div class="acc-actions">${a.actions.map(([l, h, s]) => `<a class="btn btn-${s}" href="${h}"${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${l}</a>`).join("")}</div>
      </div>
      <div class="acc-visual" style="--g:${a.g}">${ICONS[a.art]}<span class="acc-big"><small>${a.big[0]}</small>${a.big[1]}</span></div>
    </div>
  </div>`).join("");

// finale floating cards
const floats = $("#finaleFloats");
const FLOAT_POS = [[4, 8], [16, 62], [28, 20], [8, 84], [47, 4], [52, 78], [64, 30], [72, 86], [86, 12], [90, 56], [36, 92], [78, 50]];
floats.innerHTML = FLOAT_POS.map(([x, y], k) => {
  const c = CARDS[k % N];
  return `<div class="float-card" data-speed="${(0.4 + (k % 5) * 0.25).toFixed(2)}" style="left:${x}%;top:${y}%">
    <div class="fc-fly"><span style="--g:${c.g};--fg:${c.fg || "#141833"};--dur:${7 + (k % 4) * 2}s;--r1:${-8 + (k % 5) * 3}deg;--r2:${6 - (k % 4) * 3}deg"><b>${c.title}</b></span></div></div>`;
}).join("");

$("#year").textContent = new Date().getFullYear();
paintOpenStatus();
setInterval(paintOpenStatus, 60000);

/* ==========================================================
   SMOOTH SCROLL (Lenis) + progress + nav theme
   ========================================================== */
const lenis = new Lenis({ lerp: REDUCED ? 1 : 0.08, smoothWheel: !REDUCED });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => { lenis.raf(t * 1000); if (dLenis) dLenis.raf(t * 1000); });
gsap.ticker.lagSmoothing(0);

const nav = $("#nav");
const bar = $("#progressBar");
function onScroll() {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  // nav colour follows the section under it
  let theme = "light";
  for (const el of document.elementsFromPoint(innerWidth / 2, 40)) {
    if (nav.contains(el)) continue;
    const s = el.closest("[data-theme]");
    if (s) { theme = s.dataset.theme; break; }
  }
  nav.classList.toggle("nav--dark", theme === "dark");
  nav.classList.toggle("show-brand", scrollY > innerHeight * 0.35);
}
lenis.on("scroll", onScroll);
addEventListener("resize", onScroll);

/* ==========================================================
   HERO LOAD ANIMATION
   ========================================================== */
gsap.timeline({ delay: 0.15 })
  .from(".hero-logo > span > span", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.045 })
  .from(".hero-sub", { y: 20, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
  .from(".hero-cue", { y: 14, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.55")
  .from(".hero-corners > *", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.7")
  .from(".nav-ig, .menu-btn, .nav-links", { y: -16, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out", clearProps: "opacity,transform" }, "-=0.8");

/* ==========================================================
   FIRST-PERSON STATION — scroll-driven POV over the barber station photo
   (WebGL shader with depth parallax; CSS fallback when WebGL is unavailable)
   ========================================================== */
const POV = { reveal: 0, travel: 0 };
const STATION_IMG = "images/station.jpg";
function buildStationPOV() {
  const canvas = $("#station3d");
  const darkEl = $(".ct-dark");
  if (!canvas || !darkEl) return;
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener("pointermove", (e) => { ptr.tx = e.clientX / innerWidth - 0.5; ptr.ty = e.clientY / innerHeight - 0.5; }, { passive: true });
  const visible = () => POV.reveal > 0.001 && parseFloat(getComputedStyle(darkEl).opacity) > 0.01;

  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!gl) {
    // fallback: CSS zoom on the photo
    canvas.style.display = "none";
    const fb = document.createElement("div");
    fb.className = "ct-fallback"; fb.style.backgroundImage = `url(${STATION_IMG})`;
    darkEl.prepend(fb);
    (function loop() {
      requestAnimationFrame(loop);
      if (!visible()) return;
      ptr.x += (ptr.tx - ptr.x) * 0.06; ptr.y += (ptr.ty - ptr.y) * 0.06;
      fb.style.transform = `scale(${1.08 + POV.travel * 0.45}) translate(${-ptr.x * 2 - POV.travel * 3}%, ${-ptr.y * 2 + POV.travel * 6}%)`;
      fb.style.opacity = POV.reveal;
    })();
    return;
  }

  const vs = `attribute vec2 p; varying vec2 vUv; void main(){ vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;
  const fs = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform vec2 uRes;
  uniform float uImgAspect, uTravel, uReveal, uTime, uWide;
  uniform vec2 uMouse;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  // hand-tuned depth for this photo: foreground = bottom-left, far end of the station = top-right
  float depthAt(vec2 q){ return clamp((0.66 - q.y) * 1.7 + (0.5 - q.x) * 0.45 + 0.3, 0.0, 1.0); }
  void main(){
    vec2 uv = vUv;
    float sa = uRes.x / uRes.y;
    vec2 focus = mix(vec2(0.5, 0.5), vec2(0.5, 0.52), uWide);
    vec2 sc = sa > uImgAspect ? vec2(1.0, uImgAspect / sa) : vec2(sa / uImgAspect, 1.0);
    vec2 p = (uv - 0.5) * sc;                       // screen in image units, centred
    float t = uTravel;
    // camera: walk forward along the station + mouse look + gentle head sway
    vec2 cam = focus + vec2(0.08, 0.17) * t + uMouse * vec2(0.03, 0.025);
    cam += vec2(sin(uTime * 0.55), cos(uTime * 0.8)) * 0.0035;
    float zoom = 1.1 + t * 0.6 + (1.0 - uReveal) * 0.25;
    float roll = -uMouse.x * 0.035 + sin(uTime * 0.45) * 0.006;
    p = mat2(cos(roll), -sin(roll), sin(roll), cos(roll)) * p;
    vec2 q = cam + p / zoom;
    // depth parallax: near objects slide / scale more than the far end
    float d = depthAt(q);
    q += (uMouse * vec2(0.045, 0.035) + vec2(-0.03, 0.05) * t) * (d - 0.45);
    q = cam + (q - cam) / (1.0 + t * 0.4 * d);
    q = clamp(q, vec2(0.002), vec2(0.998));
    float lum = texture2D(uTex, vec2(q.x, 1.0 - q.y)).r;
    lum = smoothstep(0.02, 0.98, lum);
    // duotone grade: deep navy shadows, warm paper highlights
    vec3 shadow = vec3(0.04, 0.045, 0.13), high = vec3(0.98, 0.93, 0.86);
    vec3 col = mix(shadow, high, pow(lum, 1.05));
    // brand-red light spill + a soft light sweep that moves as you walk
    col += vec3(0.95, 0.3, 0.2) * 0.16 * smoothstep(0.35, 1.0, uv.x) * smoothstep(1.0, 0.2, uv.y);
    float sweep = exp(-pow((uv.x * 0.8 + uv.y * 0.5 - (t * 1.8 - 0.3)) * 3.5, 2.0));
    col += vec3(1.0, 0.86, 0.7) * sweep * 0.12;
    // vignette, grain, fade in
    vec2 v = uv - 0.5; col *= 1.0 - dot(v, v) * 1.3;
    col += (hash(uv * uRes + fract(uTime) * 100.0) - 0.5) * 0.06;
    gl_FragColor = vec4(col * uReveal, 1.0);
  }`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s)); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {}; ["uTex", "uRes", "uImgAspect", "uTravel", "uReveal", "uTime", "uMouse", "uWide"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 20, 30, 255]));
  [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  let imgAspect = 0.75;
  const img = new Image();
  img.onload = () => { gl.bindTexture(gl.TEXTURE_2D, tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); imgAspect = img.width / img.height; };
  img.src = STATION_IMG;
  gl.uniform1i(U.uTex, 0);

  let cw = 0, ch = 0;
  const t0 = performance.now();
  (function frame(now) {
    requestAnimationFrame(frame);
    if (!visible()) return;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (w !== cw || h !== ch) { cw = canvas.width = w; ch = canvas.height = h; gl.viewport(0, 0, w, h); }
    ptr.x += (ptr.tx - ptr.x) * 0.05; ptr.y += (ptr.ty - ptr.y) * 0.05;
    gl.uniform2f(U.uRes, w, h);
    gl.uniform1f(U.uImgAspect, imgAspect);
    gl.uniform1f(U.uTravel, POV.travel);
    gl.uniform1f(U.uReveal, POV.reveal);
    gl.uniform1f(U.uTime, (now - t0) / 1000);
    gl.uniform2f(U.uMouse, ptr.x, -ptr.y);
    gl.uniform1f(U.uWide, w > h ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  })(t0);
}
buildStationPOV();

/* ==========================================================
   1. INTRO — tiles fly in, center tile tells a story, expands full-screen
   ========================================================== */
let introTL = null;
const INTRO_VH_PER_UNIT = 0.635; // same scroll speed as before for the opening
function buildIntro() {
  const tiles = $$(".tile");
  const pushX = (el) => (el.offsetLeft + el.offsetWidth / 2 - innerWidth / 2) * 0.45;
  const pushY = (el) => (el.offsetTop + el.offsetHeight / 2 - innerHeight / 2) * 0.45;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: "#intro", start: "top top", end: () => "+=" + innerHeight * (introTL ? introTL.duration() : 5.1) * INTRO_VH_PER_UNIT, pin: true, scrub: 1.1, invalidateOnRefresh: true },
  });
  introTL = tl;
  tl.fromTo(tiles,
      { y: (i, el) => innerHeight * (0.85 + parseFloat(el.dataset.depth) * 1.0), scale: 0.9, rotation: (i) => (i % 2 ? 4 : -4) },
      { y: 0, scale: 1, rotation: 0, ease: "power2.out", duration: 1.5, stagger: { each: 0.035, from: "random" } }, 0)
    .to(".hero-corners", { opacity: 0, y: 20, duration: 0.4 }, 0.4)
    .to("#hero", { opacity: 0, y: -50, scale: 0.94, duration: 0.6 }, 1.0)
    .fromTo("#centerTile", { opacity: 0, scale: 0.86, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.15)
    // — from here on everything is ~40% shorter —
    .fromTo(words(".ct-line1"), { yPercent: 115 }, { yPercent: 0, stagger: 0.025, duration: 0.3, ease: "power2.out" }, 1.4)
    .to({}, { duration: 0.3 })
    .to(words(".ct-line1"), { yPercent: -115, stagger: 0.02, duration: 0.25, ease: "power2.in" })
    .fromTo(words(".ct-line2"), { yPercent: 115 }, { yPercent: 0, stagger: 0.025, duration: 0.3, ease: "power2.out" }, "<0.12")
    .to(".mosaic-dim", { opacity: 0.55, duration: 0.4 }, "<")
    .to({}, { duration: 0.3 })
    .addLabel("expand")
    .to(".ct-light", { opacity: 0, duration: 0.2 }, "expand")
    .to("#centerTile", { left: 0, top: 0, width: "100%", height: "100%", borderRadius: 0, duration: 1, ease: "power2.inOut" }, "expand")
    .to(".ct-dark", { opacity: 1, duration: 0.4 }, "expand+=0.15")
    .fromTo(tiles, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: pushX, y: pushY, scale: 1.2, opacity: 0, duration: 0.7, ease: "power2.inOut", immediateRender: false }, "expand")
    .fromTo(".ct-kicker", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "expand+=0.65")
    .fromTo(words(".ct-final"), { yPercent: 115 }, { yPercent: 0, stagger: 0.045, duration: 0.5, ease: "power3.out" }, "expand+=0.75")
    .fromTo(".ct-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, "expand+=1.1")
    .to(POV, { reveal: 1, duration: 0.8, ease: "power2.out" }, "expand+=0.2")
    .fromTo(POV, { travel: 0 }, { travel: 1, duration: 2.1, ease: "power1.inOut" }, "expand+=0.2")
    .to({}, { duration: 0.15 });
  return tl;
}

/* ==========================================================
   2. DECK — fan of cards sweeps round, deals into a grid, collapses to a mini deck
   ========================================================== */
const BASE_W = 200, BASE_H = 283;
const deckStage = $("#deckStage");
const deck = { enter: 0, sweep: 0, deal: 0, shrink: 0 };
const gridState = cardEls.map(() => ({ x: 0, y: 0, s: 1, o: 1 }));
const hoverState = cardEls.map(() => ({ v: 0 }));
let stageW = innerWidth, stageH = innerHeight;
let currentFilter = "all";
let deckTL = null;
let gridReady = false;
const FILTER_MAP = { all: null, services: ["services"], groom: ["groom"], locations: ["locations"], visit: ["visit", "locations"] };
const visibleIdx = (key) => CARDS.map((c, i) => i).filter((i) => !FILTER_MAP[key] || FILTER_MAP[key].includes(CARDS[i].cat));
const easeIO = gsap.parseEase("power2.inOut");

function layoutGrid(list) {
  const n = list.length || 1;
  const cols = Math.min(7, n), rows = Math.ceil(n / cols);
  const padX = Math.max(28, stageW * 0.03), top = Math.max(110, stageH * 0.15), bottom = Math.max(30, stageH * 0.05);
  const gap = Math.max(14, stageW * 0.014);
  const availW = stageW - padX * 2, availH = stageH - top - bottom;
  let w = (availW - gap * (cols - 1)) / cols, h = (w * BASE_H) / BASE_W;
  if (h * rows + gap * (rows - 1) > availH) { h = (availH - gap * (rows - 1)) / rows; w = (h * BASE_W) / BASE_H; }
  w = Math.min(w, 270); h = (w * BASE_H) / BASE_W;
  const totalH = rows * h + (rows - 1) * gap;
  const y0 = top + (availH - totalH) / 2 + h / 2;
  const out = {};
  list.forEach((idx, k) => {
    const r = Math.floor(k / cols), c = k % cols;
    const inRow = Math.min(cols, n - r * cols);
    const rowW = inRow * w + (inRow - 1) * gap;
    out[idx] = { x: (stageW - rowW) / 2 + w / 2 + c * (w + gap), y: y0 + r * (h + gap), s: w / BASE_W };
  });
  return out;
}
function gridTargets(key) {
  const list = visibleIdx(key);
  const lay = layoutGrid(list);
  return cardEls.map((_, i) => lay[i] ? { ...lay[i], o: 1 } : { x: gridState[i].x, y: gridState[i].y + 40, s: gridState[i].s * 0.82, o: 0 });
}

function renderDeck() {
  const W = stageW, H = stageH;
  const R = H * 1.2;
  const px = W / 2;
  const py = H * 1.68 + (1 - deck.enter) * H * 0.95;
  const fanS = (H * 0.5) / BASE_H;
  const step = FAN_STEP;
  const winD = 0.42;
  // compact phase (grid squeezes toward the corner), then pile phase
  const compact = easeIO(clamp01(deck.shrink / 0.45));
  const pileP = clamp01((deck.shrink - 0.35) / 0.65);
  const ax = W - 40, ay = H - 20;

  // total "spread" each card gets from hovered neighbours (fan only)
  const spread = new Array(N).fill(0);
  hoverState.forEach((h, k) => {
    if (h.v < 0.001) return;
    for (let j = 0; j < N; j++) if (j !== k) {
      const d = j - k;
      spread[j] += Math.sign(d) * h.v * 3.2 * Math.max(0, 1 - (Math.abs(d) - 1) * 0.45);
    }
  });

  cardEls.forEach((el, i) => {
    const hv = hoverState[i].v;
    const a = deck.sweep - i * step - spread[i];
    const rad = (a * Math.PI) / 180;
    const lift = hv * 46; // hovered card rises out of the fan
    const fx = px + (R + lift) * Math.sin(rad), fy = py - (R + lift) * Math.cos(rad);
    const t = easeIO(clamp01((deck.deal - (i / (N - 1)) * (1 - winD)) / winD));
    const g = gridState[i];

    // deal: cascade along a curve that dips to the lower-left before rising into the slot
    const cx = Math.min(fx, g.x) - W * 0.22, cy = Math.max(fy, g.y) + H * 0.55;
    const u = 1 - t;
    let x = u * u * fx + 2 * u * t * cx + t * t * g.x;
    let y = u * u * fy + 2 * u * t * cy + t * t * g.y;
    let rot = lerp(a, 0, t) - Math.sin(t * Math.PI) * 42;
    let s = lerp(fanS * (1 + hv * 0.05), g.s, t);
    let o = lerp(1, g.o, t);

    // grid hover lift
    const gh = hv * t;
    y -= gh * 20; s *= 1 + gh * 0.045;

    // exit: compact toward the corner, then pile into a stack
    if (compact > 0) {
      x = lerp(x, ax + (x - ax) * 0.5, compact);
      y = lerp(y, ay + (y - ay) * 0.5, compact);
      s = lerp(s, s * 0.72, compact);
    }
    const ps = easeIO(clamp01((pileP - (i / (N - 1)) * 0.5) / 0.5));
    if (ps > 0) {
      x = lerp(x, W - 67 - i * 0.4, ps);
      y = lerp(y, H - 80 - i * 0.6, ps);
      s = lerp(s, 0.31, ps);
      rot = lerp(rot, ((i % 3) - 1) * 6, ps);
    }
    el.style.transform = `translate3d(${(x - BASE_W / 2).toFixed(2)}px, ${(y - BASE_H / 2).toFixed(2)}px, 0) rotate(${rot.toFixed(3)}deg) scale(${s.toFixed(4)})`;
    el.style.opacity = o;
    el.style.zIndex = hv > 0.02 ? 300 : t > 0.5 ? 100 + i : N - i;
    el.style.pointerEvents = o < 0.3 || deck.shrink > 0.3 ? "none" : "";
  });
  $("#deckTitle").style.opacity = (1 - 0.82 * clamp01(deck.deal * 1.4)) * (1 - compact);
  const ready = deck.deal > 0.97 && deck.shrink < 0.03;
  if (ready !== gridReady) {
    gridReady = ready;
    document.body.classList.toggle("grid-ready", ready);
    if (!ready) closeFilter();
  }
  canHover = deck.enter > 0.9 && deck.shrink < 0.02 && (deck.deal < 0.02 || deck.deal > 0.98);
  if (!canHover) hoverState.forEach((h, k) => { if (h.v) { gsap.killTweensOf(h); h.v = 0; cardEls[k].classList.remove("is-hover"); } });
  document.body.classList.toggle("deck-mini", deck.shrink > 0.995);
}
let canHover = false;
const FAN_STEP = 13;

function measureStage() {
  stageW = deckStage.clientWidth; stageH = deckStage.clientHeight;
  gridTargets(currentFilter).forEach((tg, i) => Object.assign(gridState[i], tg));
}

function buildDeckDesktop() {
  deckStage.classList.remove("is-static");
  measureStage();
  deckTL = gsap.timeline({
    defaults: { ease: "none" },
    onUpdate: renderDeck,
    scrollTrigger: {
      trigger: "#deck", start: "top top", end: () => "+=" + innerHeight * (deckTL ? deckTL.duration() : 11.8) * 0.6, pin: true, scrub: 1.1,
      invalidateOnRefresh: true,
      onRefresh: () => { measureStage(); renderDeck(); },
    },
  });
  gsap.set("#studios", { visibility: "visible", yPercent: 100 });
  deckTL.fromTo(deck, { enter: 0 }, { enter: 1, duration: 1.4, ease: "power3.out" }, 0)
    .fromTo(deck, { sweep: 30 }, { sweep: 30 + 9.4 * FAN_STEP, duration: 4.5, ease: "power1.inOut" }, 0.14)
    .to(deck, { deal: 1, duration: 2.8, ease: "power1.inOut" })
    .addLabel("grid")
    // — from the grid on, everything is ~40% shorter —
    .to({}, { duration: 0.6 })
    .addLabel("exit")
    .to(deck, { shrink: 0.45, duration: 1.2, ease: "power1.inOut" }, "exit")
    .fromTo("#studios", { yPercent: 100 }, { yPercent: 0, duration: 1.32, ease: "power2.out" }, "exit+=0.36")
    .fromTo(".studios-title", { color: "#b9bdd0" }, { color: "#141833", duration: 0.84 }, "exit+=1.08")
    .fromTo(".acc-item", { y: 80 }, { y: 0, duration: 1.08, stagger: 0.07, ease: "power2.out" }, "exit+=0.54")
    .to(deck, { shrink: 1, duration: 1, ease: "power1.inOut" }, "exit+=1.3")
    .addLabel("studios", "exit+=2.3")
    .to({}, { duration: 0.55 }, "studios");
  gsap.fromTo(words("#deckTitle"), { yPercent: 115 }, {
    yPercent: 0, stagger: 0.04, duration: 0.9, ease: "power4.out",
    scrollTrigger: { trigger: "#deck", start: "top 70%", toggleActions: "play none none reverse" },
  });
  renderDeck();

  // smooth hover: rise out of the fan / lift in the grid, foil + tilt follow the pointer
  const onEnter = (e) => {
    const el = e.currentTarget, i = +el.dataset.i;
    if (!canHover) return;
    el.classList.add("is-hover");
    gsap.to(hoverState[i], { v: 1, duration: 0.6, ease: "power3.out", overwrite: true, onUpdate: renderDeck });
  };
  const onLeave = (e) => {
    const el = e.currentTarget, i = +el.dataset.i;
    el.classList.remove("is-hover");
    el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg");
    gsap.to(hoverState[i], { v: 0, duration: 0.7, ease: "power3.out", overwrite: true, onUpdate: renderDeck });
  };
  const onMove = (e) => {
    const el = e.currentTarget;
    if (!el.classList.contains("is-hover")) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width, my = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", (mx * 100).toFixed(1) + "%");
    el.style.setProperty("--my", (my * 100).toFixed(1) + "%");
    el.style.setProperty("--ry", ((mx - 0.5) * 14).toFixed(2) + "deg");
    el.style.setProperty("--rx", ((0.5 - my) * 14).toFixed(2) + "deg");
  };
  cardEls.forEach((el) => {
    el.addEventListener("pointerenter", onEnter); el.addEventListener("pointerleave", onLeave); el.addEventListener("pointermove", onMove);
  });

  return () => {
    cardEls.forEach((el) => {
      el.removeEventListener("pointerenter", onEnter); el.removeEventListener("pointerleave", onLeave); el.removeEventListener("pointermove", onMove);
      el.style.transform = el.style.opacity = el.style.zIndex = el.style.pointerEvents = "";
      el.classList.remove("is-hover");
    });
    document.body.classList.remove("grid-ready", "deck-mini");
    $("#deckTitle").style.opacity = "";
    gsap.set("#studios", { clearProps: "all" });
    gridReady = false; deckTL = null;
  };
}

function buildDeckMobile() {
  deckStage.classList.add("is-static");
  cardEls.forEach((el) => el.classList.toggle("hide", !visibleIdx(currentFilter).includes(+el.dataset.i)));
  gsap.fromTo(words("#deckTitle"), { yPercent: 115 }, { yPercent: 0, stagger: 0.04, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: "#deck", start: "top 75%" } });
  ScrollTrigger.batch(cardEls, {
    start: "top 92%", once: true,
    onEnter: (batch) => gsap.fromTo(batch, { y: 90, rotation: () => gsap.utils.random(-10, 10), opacity: 0 },
      { y: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
  });
  const st = ScrollTrigger.create({
    trigger: "#deck", start: "top 60%", end: "bottom 40%",
    onToggle: (self) => { document.body.classList.toggle("grid-ready", self.isActive); if (!self.isActive) closeFilter(); },
  });
  return () => { deckStage.classList.remove("is-static"); cardEls.forEach((el) => el.classList.remove("hide")); st.kill(); document.body.classList.remove("grid-ready"); };
}

/* scroll position where the grid is fully dealt (desktop) */
function labelScrollY(label, extra = 0) {
  if (deckTL && deckTL.scrollTrigger) {
    const st = deckTL.scrollTrigger;
    const p = Math.min(1, (deckTL.labels[label] + extra) / deckTL.duration());
    return st.start + p * (st.end - st.start);
  }
  return null;
}
function gridScrollY() {
  return labelScrollY("grid", 0.4) ?? $("#deck").getBoundingClientRect().top + scrollY - 10;
}
function goTo(target) {
  const y = target === "grid" ? gridScrollY()
    : target === "top" ? 0
    : target === "studios" ? (labelScrollY("studios", 0.4) ?? $("#studios").getBoundingClientRect().top + scrollY)
    : target === "finale" ? $("#finale").getBoundingClientRect().top + scrollY
    : target;
  lenis.scrollTo(y, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
}

/* ---------- filter ---------- */
const filterEl = $("#filter"), filterBtn = $("#filterBtn"), filterText = $("#filterText");
const filterItems = $$("#filterMenu li");
function closeFilter() { filterEl.classList.remove("open"); filterBtn.setAttribute("aria-expanded", "false"); }
filterBtn.addEventListener("click", (e) => { e.stopPropagation(); const o = filterEl.classList.toggle("open"); filterBtn.setAttribute("aria-expanded", o); });
document.addEventListener("click", (e) => { if (!filterEl.contains(e.target)) closeFilter(); });
filterItems.forEach((li) => li.addEventListener("click", () => { applyFilter(li.dataset.filter); closeFilter(); }));

function applyFilter(key) {
  currentFilter = key;
  filterItems.forEach((li) => li.setAttribute("aria-selected", li.dataset.filter === key));
  filterText.textContent = filterItems.find((li) => li.dataset.filter === key)?.textContent || "explore everything";
  const url = new URL(location.href); url.searchParams.set("category", key); history.replaceState(null, "", url);

  if (deckStage.classList.contains("is-static")) {
    // phones: Flip re-layout
    const state = Flip.getState(cardEls);
    cardEls.forEach((el) => el.classList.toggle("hide", !visibleIdx(key).includes(+el.dataset.i)));
    Flip.from(state, {
      duration: 0.7, ease: "power3.inOut", absolute: true, stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.8, duration: 0.4 }),
    });
    return;
  }
  // desktop: cards glide to their new slots
  const targets = gridTargets(key);
  let k = 0;
  cardEls.forEach((_, i) => {
    gsap.to(gridState[i], { ...targets[i], duration: 0.85, ease: "power3.inOut", delay: targets[i].o ? (k++) * 0.035 : 0, onUpdate: renderDeck, overwrite: true });
  });
}

$("#miniDeck").addEventListener("click", () => goTo("grid"));

/* ==========================================================
   3. STUDIOS — heading ink-in, accordion rise, expand on click
   ========================================================== */
function buildStudios(isDesktop) {
  if (isDesktop) return; // on desktop the studios ride inside the deck scene
  gsap.fromTo(".studios-title", { color: "#b9bdd0", y: 50, opacity: 0 }, { color: "#141833", y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
    scrollTrigger: { trigger: "#studios", start: "top 80%" } });
  gsap.from(".acc-item", { y: 80, opacity: 0, duration: 1.1, stagger: 0.1, ease: "power3.out",
    scrollTrigger: { trigger: ".acc", start: "top 88%" } });
}
$$(".acc-item").forEach((item) => {
  const open = () => {
    if (item.classList.contains("active")) return;
    $$(".acc-item").forEach((o) => { o.classList.remove("active"); o.setAttribute("aria-expanded", "false"); });
    item.classList.add("active"); item.setAttribute("aria-expanded", "true");
    const c = $(".acc-content", item);
    gsap.fromTo($$(".acc-text > *", c), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.35, stagger: 0.06, ease: "power3.out" });
    gsap.fromTo($(".acc-visual svg", c), { scale: 0.8, rotation: -8, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, delay: 0.4, ease: "power3.out" });
    if (innerWidth <= 820) setTimeout(() => ScrollTrigger.refresh(), 800);
  };
  item.addEventListener("click", open);
  item.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
});
$$('.acc a[href="#finale"]').forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); goTo("finale"); }));

/* ==========================================================
   4. FINALE — parallax floating cards, headline, glass panel
   ========================================================== */
function buildFinale() {
  // the studios section dims as the dark finale approaches
  gsap.fromTo(".studios-dusk", { opacity: 0 }, { opacity: 1, ease: "none",
    scrollTrigger: { trigger: "#finale", start: "top bottom", end: "top 30%", scrub: true } });

  // cards burst out of the corner deck and scatter across the finale
  const fin = $("#finale");
  $$(".float-card").forEach((el, k) => {
    const fly = $(".fc-fly", el);
    const offX = () => innerWidth - 62 - (el.offsetLeft + el.offsetWidth / 2);
    const offY = () => innerHeight - 72 - (el.offsetTop + el.parentElement.offsetTop + el.offsetHeight / 2);
    gsap.fromTo(fly,
      { x: offX, y: offY, scale: 0.3, rotation: () => gsap.utils.random(-30, 30), opacity: 0 },
      { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, ease: "power2.out",
        scrollTrigger: { trigger: fin, start: () => `top ${55 + (k % 6) * 6}%`, end: "top top", scrub: 1.6, invalidateOnRefresh: true } });
    gsap.fromTo(el, { y: 0 }, { y: -260 * el.dataset.speed, ease: "none",
      scrollTrigger: { trigger: fin, start: "top top", end: "bottom top", scrub: true } });
  });
  ScrollTrigger.create({ trigger: fin, start: "top 60%", onToggle: (s) => document.body.classList.toggle("deck-scatter", s.isActive) });

  gsap.fromTo(words(".finale-title"), { yPercent: 115 }, { yPercent: 0, stagger: 0.06, duration: 1.1, ease: "power4.out",
    scrollTrigger: { trigger: fin, start: "top 45%" } });
  gsap.from("#bookPanel", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: fin, start: "top 40%" } });
  gsap.from("#bookPanel > *", { y: 20, opacity: 0, duration: 0.8, stagger: 0.07, delay: 0.25, ease: "power3.out", scrollTrigger: { trigger: fin, start: "top 40%" } });
}

/* ==========================================================
   BUILD (desktop vs phone)
   ========================================================== */
const mm = gsap.matchMedia();
mm.add({ desktop: "(min-width: 821px)", mobile: "(max-width: 820px)" }, (ctx) => {
  buildIntro();
  const cleanup = ctx.conditions.desktop ? buildDeckDesktop() : buildDeckMobile();
  buildStudios(ctx.conditions.desktop);
  buildFinale();
  return cleanup;
});
addEventListener("load", () => ScrollTrigger.refresh());
requestAnimationFrame(() => ScrollTrigger.refresh());

/* ==========================================================
   NAV links + MENU
   ========================================================== */
$$("[data-goto]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); closeMenu(); goTo(a.dataset.goto); }));

const menu = $("#menu"), menuBtn = $("#menuBtn");
let menuTL = null;
function openMenu() {
  menu.hidden = false; lenis.stop(); menuBtn.setAttribute("aria-expanded", "true");
  menuTL = gsap.timeline()
    .fromTo(".menu-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.35 })
    .fromTo("#menuBox", { opacity: 0, scale: 0.92, y: 30, transformOrigin: "90% 0%" }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power4.out" }, 0)
    .fromTo(".menu-left .brand", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.15)
    .fromTo(".menu-list li, .menu-eyebrow, .menu-right hr", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" }, 0.18);
}
function closeMenu() {
  if (menu.hidden) return;
  menuBtn.setAttribute("aria-expanded", "false");
  gsap.to("#menuBox", { opacity: 0, scale: 0.95, y: 20, duration: 0.3, ease: "power2.in" });
  gsap.to(".menu-backdrop", { opacity: 0, duration: 0.3, onComplete: () => { menu.hidden = true; lenis.start(); } });
}
menuBtn.addEventListener("click", openMenu);
$$("[data-close]", menu).forEach((el) => el.addEventListener("click", closeMenu));
$$(".menu-list a[data-filter]").forEach((a) => a.addEventListener("click", (e) => {
  e.preventDefault(); closeMenu();
  setTimeout(() => { goTo("grid"); setTimeout(() => applyFilter(a.dataset.filter), 900); }, 320);
}));

/* ==========================================================
   CARD STORY — card expands into a horizontal-scrolling story
   ========================================================== */
const detail = $("#detail"), dTrack = $("#dTrack");
let dLenis = null, current = 0, lastFocus = null, opening = false;
const isPhone = () => innerWidth <= 820;

function fillDetail(i) {
  const c = CARDS[i];
  current = i;
  const intro = $("#dIntro");
  intro.style.setProperty("--g", c.g);
  intro.style.setProperty("--fg", c.fg || "#141833");
  $("#dIcon").innerHTML = ICONS[c.icon];
  $("#dCat").textContent = c.title;
  $("#dTitle").textContent = c.headline;
  $("#dSub").textContent = c.sub;
  $("#dText").textContent = c.text;
  const vis = $("#dVisual");
  vis.style.setProperty("--c1", c.c1); vis.style.setProperty("--c2", c.c2);
  const crop = c.crop || [50, 50, 130];
  $("#dPhoto").style.backgroundPosition = `${crop[0]}% ${crop[1]}%`;
  $("#dPhoto").style.backgroundSize = `${crop[2]}%`;
  $("#dArt").innerHTML = c.img ? "" : ICONS[c.icon];
  vis.querySelector("img")?.remove();
  if (c.img) vis.insertAdjacentHTML("afterbegin", `<img src="${c.img}" alt="">`);
  $("#dvLabel").textContent = c.catLabel;
  $("#dPoints").innerHTML = c.points.map(([t, d]) => `<li><div><strong>${t}</strong><span>${d}</span></div></li>`).join("");
  $("#dStat").textContent = c.stat[0];
  $("#dStatSmall").textContent = c.stat[1];
  const actions = c.actions || [["Call Rajagiriya", PHONE_RAJ.href, "red"], ["Call Negombo", PHONE_NEG.href, "glass"]];
  $("#dActions").innerHTML = actions.map(([l, h, s]) => `<a class="btn btn-${s}" href="${h}"${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${l}</a>`).join("");
  splitWords($("#dTitle"));
}

function revealDetail() {
  gsap.timeline()
    .fromTo(words("#dTitle"), { yPercent: 115 }, { yPercent: 0, stagger: 0.04, duration: 0.8, ease: "power4.out" })
    .fromTo("#dIcon", { opacity: 0, y: 40, rotation: -8 }, { opacity: 1, y: 0, rotation: 0, duration: 1, ease: "power3.out" }, 0)
    .fromTo(".d-head, .d-body", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.15)
    .fromTo("#dVisual", { clipPath: isPhone() ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 1, ease: "power3.inOut" }, 0.05)
    .fromTo("#dArt", { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.3)
    .fromTo(".d-close, #dCue", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4);
}

function onDetailScroll() {
  const max = isPhone() ? detail.scrollHeight - detail.clientHeight : detail.scrollWidth - detail.clientWidth;
  const pos = isPhone() ? detail.scrollTop : detail.scrollLeft;
  $("#dProgress").style.width = (max > 0 ? (pos / max) * 100 : 0) + "%";
  $("#dCue").style.opacity = pos > 40 ? 0 : 1;
  if (!isPhone()) {
    // parallax inside the story
    $("#dIcon").style.transform = `translateX(${pos * 0.25}px)`;
    $("#dArt").style.transform = `translateX(${(pos - innerWidth * 0.5) * -0.12}px) rotate(${pos * 0.01}deg)`;
  }
}

function openDetail(i, fromEl) {
  if (opening) return;
  opening = true;
  lastFocus = document.activeElement;
  fillDetail(i);
  lenis.stop(); document.body.classList.add("locked"); nav.classList.add("hide");
  history.replaceState(null, "", "#" + CARDS[i].id);

  const show = () => {
    detail.hidden = false; detail.scrollLeft = 0; detail.scrollTop = 0;
    gsap.set(detail, { opacity: 1 });
    if (!isPhone()) {
      dLenis = new Lenis({ wrapper: detail, content: dTrack, orientation: "horizontal", gestureOrientation: "both", lerp: 0.085, smoothWheel: true });
    }
    detail.addEventListener("scroll", onDetailScroll); onDetailScroll();
    revealDetail();
    $("#dClose").focus({ preventScroll: true });
    opening = false;
  };

  if (fromEl && !REDUCED) {
    // card → full-height panel morph
    const r = fromEl.getBoundingClientRect();
    const ghost = document.createElement("div");
    ghost.className = "d-ghost";
    ghost.style.background = CARDS[i].g;
    Object.assign(ghost.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
    document.body.appendChild(ghost);
    gsap.to(ghost, {
      left: 0, top: 0, width: isPhone() ? innerWidth : innerWidth * 0.5, height: innerHeight, borderRadius: 0, duration: 0.8, ease: "power3.inOut",
      onComplete: () => { show(); gsap.to(ghost, { opacity: 0, duration: 0.25, delay: 0.1, onComplete: () => ghost.remove() }); },
    });
  } else show();
}

function closeDetail() {
  if (detail.hidden) return;
  gsap.to(detail, { opacity: 0, duration: 0.4, ease: "power2.in", onComplete: () => {
    detail.hidden = true;
    detail.removeEventListener("scroll", onDetailScroll);
    if (dLenis) { dLenis.destroy(); dLenis = null; }
    document.body.classList.remove("locked"); nav.classList.remove("hide"); lenis.start();
    history.replaceState(null, "", location.pathname + location.search);
    lastFocus?.focus?.({ preventScroll: true });
  } });
}

function nextDetail() {
  const list = visibleIdx(currentFilter);
  const next = list[(list.indexOf(current) + 1) % list.length] ?? (current + 1) % N;
  gsap.to(dTrack, { opacity: 0, duration: 0.3, onComplete: () => {
    fillDetail(next);
    if (dLenis) dLenis.scrollTo(0, { immediate: true }); detail.scrollLeft = 0; detail.scrollTop = 0;
    history.replaceState(null, "", "#" + CARDS[next].id);
    gsap.to(dTrack, { opacity: 1, duration: 0.3 }); revealDetail();
  } });
}

cardEls.forEach((el) => el.addEventListener("click", () => openDetail(+el.dataset.i, el)));
$("#dClose").addEventListener("click", closeDetail);
$("#dNext").addEventListener("click", nextDetail);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeDetail(); closeMenu(); closeFilter(); }
  if (!detail.hidden && !isPhone() && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
    const d = e.key === "ArrowRight" ? innerWidth * 0.5 : -innerWidth * 0.5;
    dLenis ? dLenis.scrollTo(detail.scrollLeft + d) : (detail.scrollLeft += d);
  }
});

/* ==========================================================
   DEEP LINKS (?category=…  /  #card-id)
   ========================================================== */
const initialCat = new URLSearchParams(location.search).get("category");
if (initialCat && initialCat in FILTER_MAP && initialCat !== "all") applyFilter(initialCat);
const hashIdx = CARDS.findIndex((c) => "#" + c.id === location.hash);
if (hashIdx >= 0) setTimeout(() => openDetail(hashIdx), 300);
onScroll();
