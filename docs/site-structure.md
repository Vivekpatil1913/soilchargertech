# SCT Website — Structure & Build Reference

**Stack:** React 19 + Vite 6 + React Router 7 + Tailwind v4 + framer-motion
**Built:** 2026-09-21 — complete rebuild, no code carried over from the previous design
**Design language:** derived from [design-reference-scope.md](design-reference-scope.md) and [design-reference-sumago.md](design-reference-sumago.md)
**Content source:** [sct-legacy-content.md](sct-legacy-content.md)

---

## 1. Routes

| Route | Page file | What it does |
|---|---|---|
| `/` | `pages/HomePage.tsx` | The whole company in eleven sections |
| `/about` | `pages/AboutPage.tsx` | Founder's letter in full, timeline, vision/mission, team |
| `/technology` | `pages/TechnologyPage.tsx` | Four pillars, the science, three principles, what "100% SCT" means |
| `/products` | `pages/ProductsPage.tsx` | **Level 1** — the 21 category cards, filterable by range |
| `/products/:category` | `pages/CategoryPage.tsx` | **Level 2** — what the category does, benefits, dosage, and the products inside it |
| `/products/:category/:product` | `pages/ProductDetailPage.tsx` | **Level 3** — one pack, with the category's information repeated |
| `/knowledge` | `pages/KnowledgePage.tsx` | Article index |
| `/knowledge/:slug` | `pages/KnowledgeArticlePage.tsx` | Long-form article |
| `/careers` | `pages/CareersPage.tsx` | Three tracks, each opening its migrated application form |
| `/contact` | `pages/ContactPage.tsx` | Four channels, WhatsApp-backed form, links to every other form, FAQs |
| `/privacy`, `/terms` | `pages/PrivacyPage.tsx`, `TermsPage.tsx` | Share `LegalPage.tsx` |
| `*` | `pages/NotFoundPage.tsx` | 404 |

### The catalogue is three levels

```
Range              SCT Vedic | Super Series            2
  └─ Category      e.g. "SCT Vedic Nutri Charger"     21
       └─ Product  an individual buyable pack / SKU
```

The 21 names are **categories**, not products. Description, benefits and dosage
belong to the category and are stated once there; what differs between products
inside it is the pack, so `CategoryPage` lists them as rows rather than cards.

**Where the product lists come from:** SCT's old site had no data beneath the 21
— one filter chip mapped to exactly one page. The real list per category is
coming from SCT. Until it arrives, `skus` is generated from the pack sizes SCT
did publish, every entry flagged `provisional: true` and labelled in the UI as
"Awaiting confirmation".

**To add the real products,** give a category an explicit `skus` array in
`src/data/products.ts` and the generated ones are dropped:

```ts
category({
  name: "SCT Vedic Nutri Charger",
  ...
  skus: [
    { name: "Nutri Charger Granules", pack: "5 kg", note: "For basal dose" },
    { name: "Nutri Charger Drip",     pack: "1.2 kg" },
  ],
})
```

Nothing else needs touching — the grid, the category pages and the product
routes are all generated from that array.

**Navigation is seven items:** About · Technology · Products · Gallery · Knowledge · Careers · Contact.
The old site had eleven across four dropdowns. Journey, Applications and Farmer Stories were folded into `/about`, `/products` and the home page; all remain reachable from the footer. Careers is in the bar rather than only in the footer because three of the site's six forms live there.

---

## 2. Home page — the journey

The section order is the argument, and it maps exactly to the brief:

| # | Section | Component | Ground | Answers |
|---|---|---|---|---|
| 1 | Hero | `home/Hero.tsx` | forest | Who is this, what do they sell |
| 2 | Four Pillars | `home/Pillars.tsx` | forest | What is their idea |
| 3 | The Problem | `home/Problem.tsx` | **soil** | What is wrong today |
| 4 | Three Principles | `home/Method.tsx` | tint | What do they do about it |
| 5 | **Products** | `home/Products.tsx` | **forest** | **What can I buy** |
| 6 | Benefits | `home/Benefits.tsx` | light | What do I get |
| 7 | Why SCT | `home/WhySct.tsx` | tint | Why them, not the next shop |
| 8 | Proof | `home/Proof.tsx` | light | Who else uses it |
| 9 | Gallery | `home/Gallery.tsx` | tint | Can I see it |
| 10 | ISO 9001:2008 | `common/IsoCertification.tsx` | light | Can I trust them |
| 11 | Contact | `home/ContactCta.tsx` | forest | How do I reach them |

Grounds alternate deliberately — that is what breaks a long page into chapters. Products sits on the darkest ground so the white cards carry the most contrast anywhere on the site.

---

## 3. Design tokens

All in `src/styles/globals.css`. **Palette sampled from the logo file itself:**

| Token | Hex | Where it comes from |
|---|---|---|
| `brand-600` | `#009c54` | the logo's lower arc |
| `leaf-500` | `#6cb454` | the sprout leaves |
| `saffron-500` | `#f08430` | the upper arc |
| `earth-700` | `#782424` | the wordmark |

Plus `sage-*` (green-tinted neutrals) and `ink-*` (green-mixed darks). Nothing on this site is a cold grey.

**Grounds:** `ground-light` · `ground-tint` · `ground-forest` (deep green) · `ground-soil` (maroon-brown)

**Type:** fluid `clamp()` at every level — `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-eyebrow`. Headings carry tight negative tracking (`-0.032em`); eyebrows carry wide positive tracking (`0.15em`). That contrast is most of what makes it read as current.

**Motion tokens:** `--ease-entrance`, `--ease-standard`, `--ease-expressive`.

**Elevation:** `shadow-card`, `shadow-card-lg`, `shadow-dark`, `shadow-brand-glow`. All negative-spread — never a default Tailwind shadow.

---

## 4. Motion system

Everything except the scroll reveals and the hero is pure CSS.

| Effect | Class | Technique |
|---|---|---|
| Ambient texture | `fx-mesh`, `fx-streaks`, `fx-dots` | Alpha-only backgrounds, so one class works over any ground |
| Drifting orbs | `bloom` + `bloom-a` / `bloom-b` | 23s and 29s on `alternate` — mismatched clocks, so the pairing never visibly repeats |
| Heading sweep | `text-shine` | Static green gradient clipped to glyphs, light band sweeps across it. **Once per page** |
| Hero headline | `home/Hero.tsx` | Masked line reveal — `overflow-hidden` window, text parked at `translateY(115%)` |
| Dosage chips | `marquee` + `marquee-track` | Content duplicated in DOM, `--dur` per instance, edge-masked, pauses on `group` hover |
| Scroll reveal | `<Reveal>` | One movement, one duration, `once: true` |

**Reduced motion is handled at three levels** (the contract from the Sumago reference):
1. Global kill in `@media (prefers-reduced-motion: reduce)`
2. Animations declared only inside `@media (prefers-reduced-motion: no-preference)` — they never exist for a visitor who opted out
3. `motion-safe:` / `motion-reduce:` at the call site

---

## 5. Component map

```
src/components/
├── ui/index.tsx          Shell · Section · Heading · Reveal · Button · Card · GhostNumber
├── layout/
│   ├── Header.tsx        7-item nav, transparent→solid on scroll, mobile drawer
│   ├── Logo.tsx          The client's file, ~100px tall on desktop
│   ├── Footer.tsx        Contact block above link columns — deliberately no forms
│   └── LanguageSwitcher  EN/MR/HI, drives the hidden Google Translate select
├── home/                 The home sections above
├── forms/                The six forms migrated from the old site — see §5b
├── products/
│   ├── CategoryCard.tsx  One of the 21 — image panel, dosage marquee, product count
│   ├── ProductRow.tsx    One pack inside a category — a row, not a card
│   └── ProductVisual.tsx Branded SVG pack — bottle / pouch / sack
└── common/               Seo · ScrollToTop · SmoothScroll · PageHero · IsoCertification
```

Every section is built from the six `ui` primitives. That is what keeps the page reading as one system.

---

## 5b. The six forms

Every form the old site carried was migrated with its fields intact. Field
lists and option lists live in `src/data/forms.ts`; the hand-off rule lives in
`src/lib/form-submit.ts`; the shared controls are `components/forms/fields.tsx`.

| Form | Old site | Now lives | Goes to |
|---|---|---|---|
| **Export** | hero modal | `/products` band + `/contact` band, as a modal | sales inbox |
| **Enquiry** | footer, site-wide | `/products` band + `/contact` band, as a modal | WhatsApp |
| **Internship** | Career menu → modal | `/careers#internship`, inline | careers inbox |
| **SCT Business / Distributor** | Career menu → modal | `/careers#distributor`, inline | careers inbox |
| **Job Vacancy** | Career menu → modal | `/careers#employment`, inline | careers inbox |
| **Add Testimonial** | testimonial section → modal + OTP | `home/Proof.tsx`, as a modal | WhatsApp |

**Modal or inline?** The two enquiry forms interrupt whatever the visitor was
reading and hand the page straight back, so they stayed modal. The three
applications are why someone opened the page at all — and the distributor form
is 26 fields and six uploads, which is miserable inside a scrolling modal on a
phone — so those are inline on `/careers`.

**Not in the footer.** The old site put its enquiry form there and that was
tried first. A footer is where a visitor goes to leave, the dark ground forced
a button style nothing else on the site uses, and the band pushed the link
columns below the fold on a phone. Both enquiry forms now sit at the end of
`/products`, where the question actually occurs to someone.

**`FormModal` portals to `document.body`, and must.** Every dark ground sets
`isolation: isolate`, so a modal rendered inside one is trapped in that
section's stacking context and the fixed `z-50` header paints straight over its
backdrop. The portal puts it in the root context where `z-[100]` means what it
says. The panel is also a flex column with its own scrolling body — as a tall
panel inside a scrolling overlay, the `sticky` title bar hid the first row of
field labels as they slid underneath it.

**Deliberate differences from the old forms**, each one also commented at the
call site:

- District / taluka / village were dependent dropdowns fed by an API that is
  not part of this build. They are free-text; the same information is collected.
- The state dropdown posted opaque numeric IDs. It posts the state's name here.
- Middle name and the two "previous experience" dates were `required`. They are
  optional — a required field an applicant cannot truthfully fill blocks the
  whole form.
- The testimonial OTP is not reimplemented; see §7 row 5b.

---

## 6. Content provenance

`src/data/products.ts` carries all 21 **categories** with **real** descriptions, numbered benefits, dosage and pack sizes scraped from the old site. Each has a `source` flag:

- `"sct"` — SCT's own copy, edited only for spelling and sentence breaks
- `"draft"` — SCT published nothing (Milk Charger, Energy Booster); our plain-language placeholder, flagged in the UI

**Two invented testimonials with invented yield figures were deleted.** `src/data/testimonials.ts` now holds only the two real Marathi testimonials from the old site, with English glosses.

---

## 7. Known limitations

| # | Issue | Fix |
|---|---|---|
| 1 | **SEO tags are client-side.** Google renders JS and will see them; many social scrapers will not, so WhatsApp link previews will show the fallback only | Prerender at build time (`vite-plugin-prerender` or similar) |
| 2 | ~~All 21 product photos are dead~~ — **recovered** from the Internet Archive and converted to WebP | Done. Higher-resolution masters from the client would still improve three of them |
| 2b | **Product lists inside each category are provisional** — generated from published pack sizes | Client sends the real SKU list per category → drop into `skus` |
| 3 | **Only 2 testimonials exist** | Collect with consent — SCT's YouTube channel is full of material |
| 4 | Marathi/Hindi is **machine translation** | SCT-written copy would read far better |
| 5 | **No backend.** All six migrated forms compose their answers and hand off to WhatsApp or a prefilled email; nothing is stored, and file uploads have to be attached by the sender | Add a POST endpoint and rewrite `deliver()` in `src/lib/form-submit.ts` — nothing else changes |
| 5b | The testimonial form's **OTP step is not reimplemented** — it needs an SMS gateway. Sending over WhatsApp stands in, since the message arrives from the sender's own number | Reinstate in front of `deliver()` once there is a backend |
| 6 | Legal pages are **plain-language drafts**, not lawyer-reviewed | Review before launch |
| 7 | 15 content gaps from the old site still open | See [sct-legacy-content.md](sct-legacy-content.md) §16 |

---

## 7b. Product photography

SCT's own photographs were lost when their media server began 404ing every
file — the live old site shows broken-image icons on its own products page
today. All 21 were recovered from the **Internet Archive snapshot of
2024-10-07** (`web.archive.org/web/<ts>id_/` returns the original bytes, not a
rewritten copy).

**What was done to them**

| Step | Detail |
|---|---|
| Format | PNG/JPEG → **WebP**, quality 92 |
| Canvas | Every file normalised to a **perfect square** — 600×600 for cards, 1200×1200 for detail pages and retina |
| Background | Flattened onto white. Sources were a mix of transparent cut-outs and white-background photos; flattening makes them consistent with each other |
| Fit | Centred with 6% padding, aspect ratio preserved |
| Upscaling | **None.** Milk Charger (73×107), Health Fighter and Energy Booster (376×496) sit at native size inside the square rather than being blown up |
| Weight | 42 files, **3.6 MB total** — down from 15 MB of source PNGs |

Nothing was cropped, recoloured or retouched. Paths resolve from the slug via
`categoryImage()` / `categoryImageSrcSet()` in `src/data/products.ts`, so there
is no per-product wiring to fall out of sync.

**Three are low-resolution at source** and would benefit from a re-shoot or a
higher-res original: Milk Charger, Health Fighter, Energy Booster.

**A finding from the photographs:** the pack shown for *SCT Vedic Plant Charger*
is labelled **Pest Cleaner**. This independently confirms the content mismatch
already flagged in `sct-legacy-content.md` §16 — the old site's Plant Charger
page carried Pest Cleaner copy throughout. The product is very likely Pest
Cleaner and the category name needs confirming with SCT.

---

## 8. Commands

```bash
npm run dev        # Vite dev server on :3000
npm run build      # typecheck + production build to dist/
npm run preview    # serve the built site
npm run typecheck  # tsc --noEmit
```

**Deploy note:** this is a client-side SPA. The host must rewrite all unknown paths to `index.html`, or `/products/super-soil-charger` will 404 on a hard refresh.
