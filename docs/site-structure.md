# SCT Website — Structure & Build Reference

**Stack:** React 19 + Vite 6 + React Router 7 + Tailwind v4 + framer-motion
**Built:** 2026-09-21 — complete rebuild, no code carried over from the previous design
**Design language:** [design-reference-ngn.md](design-reference-ngn.md) — rebuilt against it 2026-09-21.
The earlier SCOPE/Sumago direction is superseded; those files stay on record only.
**Content source:** [sct-legacy-content.md](sct-legacy-content.md)

---

## 1. Routes

| Route | Page file | What it does |
|---|---|---|
| `/` | `pages/HomePage.tsx` | The whole company in eleven bands |
| `/about` | `pages/AboutPage.tsx` | Founder's letter in full, timeline, vision/mission, team |
| `/technology` | `pages/TechnologyPage.tsx` | Four pillars, the science, three principles, what "100% SCT" means |
| `/products` | `pages/ProductsPage.tsx` | **Level 1** — the 21 category cards, filterable by range |
| `/products/:category` | `pages/CategoryPage.tsx` | **Level 2** — what the category does, benefits, dosage, and the products inside it |
| `/products/:category/:product` | `pages/ProductDetailPage.tsx` | **Level 3** — one pack, with the category's information repeated |
| `/gallery` | `pages/GalleryPage.tsx` | Photographs and the 45 films from SCT's channel |
| `/knowledge` | `pages/KnowledgePage.tsx` | Article index |
| `/knowledge/:slug` | `pages/KnowledgeArticlePage.tsx` | Long-form article |
| `/contact` | `pages/ContactPage.tsx` | Four channels, WhatsApp-backed form, FAQs |
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

**Navigation is six items:** About · Technology · Products · Gallery · Knowledge · Contact.
The old site had eleven across four dropdowns. Journey, Applications and Farmer
Stories were folded into `/about`, `/products` and the home page; all remain
reachable from the footer. Above `lg` a forest utility strip sits over the bar
carrying the phone number, the email and the language switcher — the three
things a visitor needs but should never have to hunt for.

---

## 2. Home page — the journey

The section order is the argument:

| # | Band | Component | Ground | Answers |
|---|---|---|---|---|
| 1 | Hero | `home/Hero.tsx` | canvas | Who is this, what do they sell |
| 2 | Stat band | `home/Hero.tsx` → `StatBand` | **forest** | How big are they |
| 3 | The Problem | `home/Problem.tsx` | white | What is wrong today |
| 4 | Four Pillars | `home/Pillars.tsx` | canvas | What is their idea |
| 5 | **Products** | `home/Products.tsx` | **forest** | **What can I buy** |
| 6 | Three Principles | `home/Method.tsx` | white | What do I do with it |
| 7 | Benefits | `home/Benefits.tsx` | canvas | What do I get |
| 8 | Why SCT | `home/WhySct.tsx` | white | Why them, not the next shop |
| 9 | Farmer voices | `home/Proof.tsx` | canvas | Who else uses it |
| 10 | Knowledge | `home/Knowledge.tsx` | canvas | Where do I learn |
| 11 | Contact | `home/ContactCta.tsx` | **forest** | How do I reach them |

**Only three bands on the page are dark**, and two of them are Products and the
closing call to action. A dark band is the loudest thing the system has, so it
is spent on the catalogue and on the one action, and on nothing else.

The hero is a two-column opening, not a full-bleed photograph with text over
it: the headline sits on paper so it is legible at every viewport, the page
begins with words rather than atmosphere, and it costs one image instead of a
video on a 3G connection.

**Removed from the old home page:** the looping field-video band
(`home/FieldVideo.tsx`) and the gallery strip section (`home/Gallery.tsx`).
The gallery is now four photographs inside `Proof`, one click from the full
page; the video band was a full-width autoplaying MP4 above the fold.

---

## 3. Design tokens

All in `src/styles/globals.css`. Three families, and one of them is paper.

| Token | Hex | Role |
|---|---|---|
| `forest-800` | `#0f4e30` | the dark ground, and the primary button |
| `forest-500` | `#009c54` | **sampled from the client's logo** — the brand green |
| `harvest-400` | `#eaad32` | the accent. Marks things; never a field you sit on |
| `canvas-50` | `#fafaf5` | the warm paper the whole site sits on |
| `ink-*` | `#0e1311`…`#f4f5f4` | neutrals, green-mixed. Nothing here is cold grey |

Full ramps and their provenance: [design-reference-ngn.md](design-reference-ngn.md) §2.

**Grounds:** `ground-canvas` · `ground-canvas-down` · `ground-light` ·
`ground-forest` · `ground-forest-deep`. The canvas pair are near-invisible
gradients — they give a *seam* between sections rather than a colour change a
reader notices.

**Type:** `Fraunces` (serif) for every heading, `Inter` for everything else,
`Tiro Devanagari Marathi` for the Marathi and Hindi translations. The
serif/sans pairing is the identity; it does more for "established institution"
than any amount of styling. Fluid `clamp()` at every level — `text-display`,
`text-h1`…`text-h3`, `text-lead`, `text-eyebrow` (11px), `text-meta` (10px).

Scale is deliberately small: a section heading tops out at 32px, body is 15px.
The authority comes from the serif and the spacing, not from size.

**Elevation:** `shadow-soft` and `shadow-card` only, plus `shadow-glow-green`
for the primary button. All three are wide, soft and nearly transparent. What
actually defines a card is `border border-ink-100`.

**Signature marks:** `rule-harvest` (the gold rule under every heading — the
one element that ties the site together), `edge-harvest` (the gold hairline
seating a dark band against the light one above), `grain` + `grain-layer` (one
inline SVG turbulence over the dark grounds).

---

## 4. Motion

**Three keyframes for the whole site** — `float`, `marquee`, `soft-pulse` —
matching the reference. Everything is ambient: nothing animates to tell a
story, and nothing has to finish before the page can be read.

| Effect | Where |
|---|---|
| Scroll reveal | `<Reveal>` — one movement, 14px, 0.5s, `once: true` |
| Dosage tickers | `marquee` + `marquee-track`, `--dur` per instance so two never march in step |
| Photograph hover | `duration-700 group-hover:scale-105` |
| Everything else | `transition-colors`. No hover lift is larger than 2px |

**Reduced motion is handled at three levels:**
1. Global kill in `@media (prefers-reduced-motion: reduce)`
2. Every `@keyframes` is declared **inside** `@media (prefers-reduced-motion: no-preference)` — for a visitor who opted out they do not exist at all
3. `motion-safe:` at the call site for hover transforms

**Gone from the previous design:** nine `fx-*` background layers, blurred
drifting orbs, the `text-shine` gradient heading sweep, ghost numerals, and
Lenis-driven parallax. `framer-motion` now drives scroll reveals and nothing
else.

---

## 4b. Translation guards

The site is served in Marathi and Hindi by driving Google Translate's own
`googtrans` cookie (`layout/LanguageSwitcher.tsx`). Machine translation is
indiscriminate — it rewrites every text node it finds, including the ones that
are not language. Unguarded, switching to Marathi produced:

| Was | Became | Why it matters |
|---|---|---|
| Soil Charger Technology | **माती चार्जर तंत्रज्ञान** in the footer lockup, **सॉईल चार्जर टेक्नॉलॉजी** in the paragraph below it | One name, two renderings, on one screen |
| +91 86692 00221 | **+९१ ८६६९२ ००२२१** | Cannot be dialled from a keypad or copied into one |
| Nashik – 422 101 | **नाशिक – ४२२ १०१** | Undeliverable, and not what you type into Maps |
| SCT Vedic · Super Series | **एससीटी वैदिक · सुपर सिरीज** | Product names |
| X (the social link) | **एक्स** | — |

`components/common/NoTranslate.tsx` holds the fix. It sets **both**
`translate="no"` and `class="notranslate"`, because a half-translated phone
number is not a cosmetic bug.

```tsx
<Brand />                                  // the company name
<Brand pad="after" /> makes organic…       // mid-sentence
<NoTranslate>{contact.phones[0]}</NoTranslate>
{protectBrand(site.description)}           // the name inside a plain string
```

**What is guarded:** the company name, product / category / range names, phone
and WhatsApp numbers, email addresses, the postal address, and nav labels
flagged `proper: true` in `data/navigation.ts`.

**What is deliberately *not* guarded:** figures. Years, counters and dosages go
back to Devanagari numerals, because that is correct Marathi and a farmer reads
it more easily — `१.२ किलो प्रति एकर` is better for them than `1.2 kg per acre`.
Pinning `2015` in place also fought the grammar: Marathi moves the postposition
after the numeral, and the guard produced `पासून2015`. People's names are not
guarded either — a Marathi reader seeing **राम मुखेकर** is being served, not
mangled.

### The `pad` prop, and why it exists

A guard mid-sentence splits it into three DOM nodes. Google translates each
neighbour on its own and does **not** preserve the whitespace — or sometimes the
punctuation — at the seam, which produced `Soil Charger Technologyसेंद्रिय` and
`Soil Charger Technologyनाशिक`. The only safe place for that space is *inside*
the guard, so `pad` puts one there. It is a plain space, not `&nbsp;`, so a long
name can still wrap in a narrow column; adjacent whitespace collapses in HTML,
so padding a side that already has a literal space is harmless.

`protectBrand()` applies this automatically, and also pulls trailing punctuation
inside the guard so `…of Soil Charger Technology, Nashik.` survives the comma.

### Checking it

There is no automated test for this — it needs Google's live script. Verify by
hand after touching any of the guarded surfaces: switch the site to Marathi and
confirm the company name, every phone number and every product name are still
in Latin script, with a space on each side.

---

## 5. Component map

```
src/components/
├── ui/index.tsx          Shell · Section · Eyebrow · Heading · Reveal ·
│                         Button · Card · Chip · StepMark · Stat · Placeholder
├── layout/
│   ├── Header.tsx        Forest utility strip + solid bar, 6-item nav, drawer
│   ├── Logo.tsx          The client's file, ~56px tall on desktop
│   ├── Footer.tsx        Contact block above link columns
│   └── LanguageSwitcher  EN/MR/HI, drives the hidden Google Translate select
├── home/                 The 11 bands above
├── products/
│   ├── CategoryCard.tsx  One of the 21 — image panel, dosage marquee, product count
│   └── ProductRow.tsx    One pack inside a category — a row, not a card
└── common/               Seo · ScrollToTop · SmoothScroll · PageHero ·
                          NoTranslate (Brand / NoTranslate / protectBrand)
```

Every section is built from these primitives. That is what keeps the page
reading as one system.

**The header is solid at every scroll position.** The previous design faded a
transparent bar in over a dark hero, which made the logo's legibility depend on
whatever photograph sat behind it and forced every inner page to open on a dark
slab so the bar had something to sit on. Both are gone: `main` clears the fixed
header, and `PageHero` is a pale band with a breadcrumb.

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
| 4 | Marathi/Hindi is **machine translation**. Names, numbers and addresses are guarded (§4b), but the prose is still Google's | SCT-written copy would read far better |
| 5 | Contact form **opens WhatsApp**, stores nothing — there is no backend | Add one if enquiries need tracking |
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
