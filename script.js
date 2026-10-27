/* ==========================================================
   Drift Barber — showcase grid, filter, detail story, nav
   ========================================================== */

const PHONE_RAJ = { label: "074 131 7373", href: "tel:+94741317373" };
const PHONE_NEG = { label: "076 677 7373", href: "tel:+94766777373" };
const MAPS = "https://maps.app.goo.gl/58YBZ3KYdZ7eMMZD6";
const IG = "https://www.instagram.com/driftbarber.lk/";

/* ---------- line icons (100x100) ---------- */
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
};

/* ---------- showcase data ---------- */
const CARDS = [
  {
    id: "signature-cut", cat: "services", catLabel: "Haircuts", icon: "scissors",
    title: "Signature Haircut", tag: "Shaped to your face",
    g: "linear-gradient(160deg,#dfe3ff 0%,#eef0ff 45%,#fff2d9 100%)",
    headline: "A cut that's built around you",
    sub: "Consult. Cut. Finish.",
    text: "Every cut starts with a quick chat about your hair, your face shape and how you actually style it day to day — then we cut to suit.",
    points: [["Consultation", "Talk through the look you want before the first snip."], ["Precision cut", "Scissor and clipper work tailored to your hair type."], ["Wash & style", "Finished properly, so you leave camera-ready."]],
  },
  {
    id: "skin-fade", cat: "services", catLabel: "Fades", icon: "clipper",
    title: "Skin Fade", tag: "Clean blends every time",
    g: "linear-gradient(165deg,#ff8a8a 0%,#ffb0a0 50%,#ffe0c4 100%)",
    headline: "Seamless fades, zero harsh lines",
    sub: "Low, mid, high or taper",
    text: "From a subtle taper to a sharp high skin fade, our barbers blend it smooth and line it up crisp.",
    points: [["Pick your fade", "Low, mid, high, drop or burst — we'll guide you."], ["Blend & detail", "Gradual transitions with a clean finish."], ["Line-up", "Sharp edges on the hairline and neckline."]],
  },
  {
    id: "beard", cat: "groom", catLabel: "Beard", icon: "beard",
    title: "Beard Sculpt", tag: "Lines that hold their shape",
    g: "linear-gradient(160deg,#fff7b8 0%,#ffe48a 50%,#f4c04f 100%)",
    headline: "Your beard, properly shaped",
    sub: "Trim. Shape. Line.",
    text: "Whether you're growing it out or keeping it tight, we shape your beard to balance your face and keep the edges sharp.",
    points: [["Trim & shape", "Length and shape matched to your face."], ["Razor lines", "Clean cheek and neck lines."], ["Finish", "Beard oil or balm so it looks and feels right."]],
  },
  {
    id: "shave", cat: "groom", catLabel: "Shave", icon: "razor",
    title: "Hot Towel Shave", tag: "Old-school smooth",
    g: "linear-gradient(160deg,#ece9ff 0%,#dfe8ff 45%,#c9eef0 100%)",
    headline: "The classic shave, done slowly",
    sub: "Warm towel. Sharp blade.",
    text: "A proper barber-chair shave: hot towels to prep, a close straight-edge finish and a cooling after-care to calm the skin.",
    points: [["Hot towel prep", "Opens up the skin and softens the hair."], ["Close shave", "Careful straight-edge work."], ["Cool down", "Soothing after-care to finish."]],
  },
  {
    id: "colour", cat: "services", catLabel: "Colour", icon: "colour",
    title: "Hair Colour", tag: "Bold or barely there",
    g: "linear-gradient(165deg,#ffb347 0%,#ff8a5c 55%,#f0604d 100%)", fg: "#2b1410",
    headline: "Colour that makes a statement",
    sub: "From grey blending to full colour",
    text: "Cover the greys, add depth or go full platinum — talk to the studio about the shade you're after.",
    points: [["Grey blending", "Natural-looking coverage."], ["Highlights & tones", "Add dimension and character."], ["Fashion colour", "Bleach and bold shades for the brave."]],
  },
  {
    id: "styling", cat: "services", catLabel: "Styling", icon: "dryer",
    title: "Wash & Style", tag: "Ready for any occasion",
    g: "linear-gradient(160deg,#ffe6d6 0%,#ffd8cc 45%,#bfe6ee 100%)",
    headline: "Walk in. Walk out event-ready.",
    sub: "Blow-dry and finish",
    text: "Got a wedding, a shoot or a big night? A wash, blow-dry and styled finish that holds up all evening.",
    points: [["Wash", "Cleanse and condition."], ["Blow-dry", "Volume and direction set in."], ["Product finish", "Hold and texture to last the night."]],
  },
  {
    id: "facial", cat: "groom", catLabel: "Skin", icon: "sparkle",
    title: "Facial & Skin Care", tag: "Fresh skin, fresh start",
    g: "linear-gradient(165deg,#1d6e8c 0%,#2a93a8 55%,#5ec4c9 100%)", fg: "#ffffff",
    headline: "Look as sharp as your cut",
    sub: "Cleanse. Refresh. Glow.",
    text: "A grooming facial to clear, refresh and brighten your skin — the perfect add-on to any cut or shave.",
    points: [["Deep cleanse", "Lift away oil, dirt and dead skin."], ["Mask & massage", "Relax while your skin recharges."], ["Hydrate", "Finish fresh and moisturised."]],
  },
  {
    id: "kids", cat: "services", catLabel: "Kids", icon: "kid",
    title: "Kids' Cuts", tag: "Little clients, big style",
    g: "linear-gradient(160deg,#fff9c4 0%,#f8f1b8 45%,#d6f2e4 100%)",
    headline: "Fresh cuts for the little ones",
    sub: "Patient barbers, happy kids",
    text: "A relaxed, friendly chair for younger clients — so they leave looking smart and wanting to come back.",
    points: [["Gentle approach", "Patient barbers who take it easy."], ["Trend or classic", "Whatever style they're asking for."], ["Quick & tidy", "In and out without the fuss."]],
  },
  {
    id: "treatment", cat: "groom", catLabel: "Treatments", icon: "treatment",
    title: "Hair Treatment", tag: "Healthier hair, every day",
    g: "linear-gradient(165deg,#2bb39b 0%,#4dc2b0 50%,#8fd3e6 100%)", fg: "#0f2b27",
    headline: "Bring tired hair back to life",
    sub: "Nourish & restore",
    text: "Treatments to tame frizz, repair damage and add shine — ask the studio which one suits your hair.",
    points: [["Hair check", "We look at what your hair needs."], ["Treatment", "Nourishing care applied by the pros."], ["Aftercare tips", "Keep it healthy between visits."]],
  },
  {
    id: "rajagiriya", cat: "locations", catLabel: "Studio", icon: "pin",
    title: "Rajagiriya Studio", tag: "074 131 7373",
    g: "linear-gradient(160deg,#c9f2ff 0%,#aeeadf 50%,#7bd8a8 100%)",
    headline: "Drift Barber, Rajagiriya",
    sub: "Our Colombo-side studio",
    text: "Drop into our Rajagiriya studio any day from 9am until 10.30pm. Call ahead to grab a chair at a time that suits you.",
    actions: [["Call Rajagiriya", PHONE_RAJ.href, "dark"], ["Directions", MAPS, "ghost"]],
    points: [["Phone", PHONE_RAJ.label], ["Hours", "Every day, 9:00am – 10:30pm"], ["Tip", "Evenings fill up fast — call before you come."]],
  },
  {
    id: "negombo", cat: "locations", catLabel: "Studio", icon: "wave",
    title: "Negombo Studio", tag: "076 677 7373",
    g: "linear-gradient(165deg,#ffe9b8 0%,#ffd28a 50%,#ffb36b 100%)",
    headline: "Drift Barber, Negombo",
    sub: "Our coastal studio",
    text: "Same craft, by the coast. Our Negombo studio is open daily from 9am until 10.30pm.",
    actions: [["Call Negombo", PHONE_NEG.href, "dark"], ["Directions", MAPS, "ghost"]],
    points: [["Phone", PHONE_NEG.label], ["Hours", "Every day, 9:00am – 10:30pm"], ["Tip", "Weekends are busiest — call ahead."]],
  },
  {
    id: "hours", cat: "visit", catLabel: "Hours", icon: "clock",
    title: "Open Till Late", tag: "9am – 10.30pm daily",
    g: "linear-gradient(160deg,#ff7b7b 0%,#ffa48a 45%,#fff1c2 100%)",
    headline: "A fresh cut fits your schedule",
    sub: "Open 9am – 10.30pm",
    text: "Early start before work or a late trim after dinner — both studios keep long hours, every day.",
    points: [["Mornings", "Doors open at 9:00am."], ["Evenings", "Last chairs until 10:30pm."], ["Every day", "Both Rajagiriya and Negombo."]],
  },
  {
    id: "book", cat: "visit", catLabel: "Booking", icon: "phone",
    title: "Book a Chair", tag: "Call the studio",
    g: "linear-gradient(165deg,#f6f1ff 0%,#e6e0ff 45%,#c8dcff 100%)",
    headline: "Skip the wait, book your chair",
    sub: "One call is all it takes",
    text: "Ring the studio nearest to you, choose a time and you're set.",
    actions: [["Rajagiriya", PHONE_RAJ.href, "dark"], ["Negombo", PHONE_NEG.href, "dark"]],
    points: [["Rajagiriya", PHONE_RAJ.label], ["Negombo", PHONE_NEG.label], ["Hours", "9:00am – 10:30pm, daily"]],
  },
  {
    id: "instagram", cat: "visit", catLabel: "Instagram", icon: "camera",
    title: "The Drift Feed", tag: "43.4K following the craft",
    g: "linear-gradient(160deg,#3b2d8f 0%,#a64b8f 55%,#f07a5a 100%)", fg: "#ffffff",
    headline: "2,400+ looks and counting",
    sub: "@driftbarber.lk",
    text: "Fresh fades, colour transformations and studio moments — see the latest work and find your next look.",
    actions: [["Open Instagram", IG, "light"]],
    points: [["43.4K", "people follow Drift on Instagram"], ["2,407", "posts of real client work"], ["Daily", "new cuts shared from both studios"]],
  },
];

/* ---------- render grid ---------- */
const grid = document.getElementById("grid");
grid.innerHTML = CARDS.map((c, i) => `
  <button class="card" data-cat="${c.cat}" data-i="${i}" style="--g:${c.g};--i:${i};${c.fg ? `--fg:${c.fg}` : ""}" aria-label="${c.title} — ${c.tag}">
    <span class="card-title">${c.title}</span>
    <span class="card-icon" aria-hidden="true">${ICONS[c.icon]}</span>
    <span class="card-foot">
      <span class="card-tag">${c.tag}</span>
      <span class="card-mark"><b>Drift</b><i>${c.catLabel}</i></span>
    </span>
  </button>`).join("");

/* ---------- filter ---------- */
const filter = document.getElementById("filter");
const filterBtn = document.getElementById("filterBtn");
const filterText = document.getElementById("filterText");
const filterItems = [...document.querySelectorAll("#filterMenu li")];
const FILTER_MAP = { all: ["all"], services: ["services"], groom: ["groom"], locations: ["locations"], visit: ["visit", "locations"] };

function applyFilter(key, scroll = false) {
  const cats = FILTER_MAP[key] || ["all"];
  document.querySelectorAll(".card").forEach((el) => {
    const show = cats.includes("all") || cats.includes(el.dataset.cat);
    el.classList.toggle("hide", !show);
  });
  // replay entrance animation
  let n = 0;
  document.querySelectorAll(".card:not(.hide)").forEach((el) => {
    el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; el.style.setProperty("--i", n++);
  });
  filterItems.forEach((li) => li.setAttribute("aria-selected", li.dataset.filter === key));
  const active = filterItems.find((li) => li.dataset.filter === key);
  if (active) filterText.textContent = active.textContent;
  document.querySelectorAll(".nav-links a[data-filter]").forEach((a) =>
    a.classList.toggle("active", a.dataset.filter === key && key !== "all"));
  const url = new URL(location.href);
  url.searchParams.set("category", key);
  history.replaceState(null, "", url);
  if (scroll) document.getElementById("showcase").scrollIntoView({ behavior: "smooth" });
}

filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = filter.classList.toggle("open");
  filterBtn.setAttribute("aria-expanded", open);
});
filterItems.forEach((li) => li.addEventListener("click", () => {
  applyFilter(li.dataset.filter);
  filter.classList.remove("open");
  filterBtn.setAttribute("aria-expanded", false);
}));
document.addEventListener("click", () => { filter.classList.remove("open"); filterBtn.setAttribute("aria-expanded", false); });

/* ---------- nav ---------- */
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", (e) => {
  navLinks.classList.remove("open"); burger.setAttribute("aria-expanded", false);
  if (a.dataset.filter) { e.preventDefault(); applyFilter(a.dataset.filter, true); }
}));

/* ---------- scroll progress ---------- */
const bar = document.getElementById("progressBar");
function onScroll() {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
  nav.classList.toggle("scrolled", scrollY > 8);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- detail overlay ---------- */
const detail = document.getElementById("detail");
const $ = (id) => document.getElementById(id);
let current = 0;
let lastFocus = null;

function visibleIndexes() {
  return [...document.querySelectorAll(".card:not(.hide)")].map((el) => +el.dataset.i);
}

function openDetail(i) {
  const c = CARDS[i];
  current = i;
  $("detailLeft").style.setProperty("--g", c.g);
  $("detailLeft").style.setProperty("--fg", c.fg || "var(--ink)");
  $("detailIcon").innerHTML = ICONS[c.icon];
  $("detailCat").textContent = c.title;
  $("detailTitle").textContent = c.headline;
  $("detailTag").textContent = c.sub;
  $("detailText").textContent = c.text;
  const actions = c.actions || [["Book now", "#contact", "dark"], ["Instagram", IG, "ghost"]];
  $("detailActions").innerHTML = actions.map(([label, href, style]) => {
    const ext = href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
    return `<a class="btn btn-${style}" href="${href}"${ext}>${label}</a>`;
  }).join("");
  $("detailPoints").innerHTML = c.points.map(([t, d], k) =>
    `<li style="--i:${k}"><span class="n">0${k + 1}</span><div><strong>${t}</strong><span>${d}</span></div></li>`).join("");
  // restart animations
  ["detailIcon", "detailTitle"].forEach((id) => { const el = $(id); el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; });
  document.querySelector(".detail-body").style.animation = "none"; void detail.offsetWidth; document.querySelector(".detail-body").style.animation = "";

  if (detail.hidden) { lastFocus = document.activeElement; detail.hidden = false; document.body.classList.add("locked"); }
  $("detailClose").focus();
  history.replaceState(null, "", "#" + c.id);
}

function closeDetail() {
  detail.hidden = true;
  document.body.classList.remove("locked");
  history.replaceState(null, "", location.pathname + location.search);
  if (lastFocus) lastFocus.focus();
}

function step(dir) {
  const v = visibleIndexes();
  const pos = v.indexOf(current);
  openDetail(v[(pos + dir + v.length) % v.length]);
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) openDetail(+card.dataset.i);
});
$("detailClose").addEventListener("click", closeDetail);
$("detailPrev").addEventListener("click", () => step(-1));
$("detailNext").addEventListener("click", () => step(1));
document.addEventListener("keydown", (e) => {
  if (detail.hidden) return;
  if (e.key === "Escape") closeDetail();
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
  // close the overlay when a "Book now" (#contact) action is used
});
$("detailActions").addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a && a.getAttribute("href") === "#contact") { closeDetail(); }
});

/* ---------- open/closed status (Sri Lanka time) ---------- */
(function openNow() {
  const el = document.getElementById("openNow");
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" }));
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = mins >= 9 * 60 && mins < 22 * 60 + 30;
  el.textContent = open ? "● Open now" : "● Closed — opens 9am";
  el.classList.add(open ? "open" : "closed");
})();
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- initial state from URL ---------- */
const initialCat = new URLSearchParams(location.search).get("category");
if (initialCat && FILTER_MAP[initialCat]) applyFilter(initialCat);
const hashCard = CARDS.findIndex((c) => "#" + c.id === location.hash);
if (hashCard >= 0) openDetail(hashCard);
