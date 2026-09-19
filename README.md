# Soil Charger Technology

A rebuild of the Soil Charger Technology website as a modern Next.js application —
soil-first agricultural storytelling for Indian farmers, built on the App Router,
TypeScript, Tailwind CSS v4 and Framer Motion.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script              | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                        |
| `npm run build`     | Production build (43 pages, mostly static)        |
| `npm start`         | Serve the production build                        |
| `npm run lint`      | ESLint                                            |
| `npm run typecheck` | `tsc --noEmit`                                    |

**Node 18.18+** required.

### Environment

One optional variable, used for canonical URLs, the sitemap and `robots.txt`:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.soilchargertechnology.com
```

It falls back to `site.url` in `src/data/site.ts`.

`NEXT_DIST_DIR` can redirect the build output (e.g. `NEXT_DIST_DIR=.next-verify npm run build`)
so a production build can be verified while a dev server is using `.next`.

---

## Architecture

```
src/
├── app/                     # Routes. Server Components unless interaction demands otherwise.
│   ├── layout.tsx           # Fonts, metadata, Organization JSON-LD, chrome
│   ├── page.tsx             # Homepage — composes the 15 sections in story order
│   ├── about/  journey/  technology/  applications/
│   ├── products/            # + [slug]/ (21 static pages)
│   ├── knowledge/           # + [slug]/ (6 static pages)
│   ├── farmer-stories/  contact/  privacy/  terms/
│   ├── sitemap.ts  robots.ts  not-found.tsx
│
├── components/
│   ├── layout/              # Navbar, MobileMenu, Footer, Logo, LanguageSwitcher, GoogleTranslate
│   ├── home/                # One file per homepage section
│   ├── products/            # ProductCard, ProductGrid, ProductDetails, ProductVisual
│   ├── contact/             # ContactForm, FaqAccordion
│   └── common/              # Container, SectionHeading, CTAButton, AnimatedCounter,
│                            # ScrollReveal, ImageReveal, Badge, PageHero, SmoothScroll
│
├── data/                    # ALL copy and content. No content lives in JSX.
├── lib/                     # constants, utils, animation variants
└── styles/globals.css       # Design tokens + fluid type scale + custom utilities
```

**The rule that keeps this maintainable:** components describe layout and behaviour;
`src/data/` holds every string, image reference and list. Adding a product, article,
crop or milestone means editing one array — the listing pages, detail routes, homepage
sections and sitemap all follow automatically.

---

## Design system

Every token lives in the `@theme` block at the top of `src/styles/globals.css`.
Nothing picks a colour, radius or duration inline.

The palette is derived from the SCT logo:

| Role              | Token            | Source in the logo            |
| ----------------- | ---------------- | ----------------------------- |
| Primary           | `brand-*`        | the green sprout              |
| Fresh highlight   | `leaf-*`         | the lighter leaf gradient     |
| Accent            | `saffron-*`      | the upper arc                 |
| Earth / headings  | `earth-*`        | the maroon wordmark           |
| Ground & surfaces | `cream-*`, white | the logo's white field        |
| Text              | `ink-*`          | warm near-black, never `#000` |

The site is deliberately **bright**. Two deep bands exist for rhythm — the SCT Vedic
section and the footer — and both are brand green, not black.

**Typography** — two families only. Plus Jakarta Sans for headings, Inter for body.
All heading sizes are fluid (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`),
so type is intentional at every breakpoint rather than a shrunk desktop.

**Spacing** — `section-y` is the single source of vertical section rhythm. `<Container>`
is the only component that sets horizontal gutters, which is what guarantees a safe
side margin at every width and no sideways scroll.

### Breakpoints

| Name | Width    | Target  |
| ---- | -------- | ------- |
| `sm` | 640px    |         |
| `md` | 768px    | tablet  |
| `lg` | 1024px   | laptop  |
| `xl` | 1280px   |         |
| `2xl`| 1440px   | desktop |

The full navigation appears at `xl`; below that the header stays sparse and defers
to the mobile menu rather than crowding nine items into a tablet width.

---

## Animation

All motion comes from `src/lib/animations.ts` so the whole site moves with one
personality: a soft ease-out, a small vertical offset, no bounce.

- `<ScrollReveal>` / `<RevealItem>` — the standard reveal-on-scroll, with stagger
- `<ImageReveal>` — curtain-style photo reveal
- `<AnimatedCounter>` — counts up once in view; renders a placeholder for `null`
- Lenis smooth scrolling loads dynamically, and only when motion is not reduced

`MotionConfig reducedMotion="user"` in the root layout means a visitor who prefers
reduced motion gets a calm page, not an empty one waiting on an animation that will
never run. CSS animations are neutralised in the same media query.

---

## Google Translate

Split across two components so the widget can appear in several places at once:

- `GoogleTranslate.tsx` — rendered **once** from the root layout. Owns the hidden
  mount point and the script.
- `LanguageSwitcher.tsx` — the visible control. Drives the hidden `select.goog-te-combo`
  that the widget creates.

This is why Google's own toolbar never appears and never pushes the sticky header out
of place. The banner and the yellow highlight it injects are neutralised in
`globals.css`. Languages are configured in `LANGUAGES` in `src/lib/constants.ts`
(currently English, Marathi, Hindi, Gujarati, Kannada, Telugu, Tamil, Punjabi).

---

## Content status — read before launch

The brief was explicit that placeholders beat invented claims, and this build follows
that strictly. **No scientific claim, farmer count, trial result, product benefit or
dosage has been invented.**

### Verified — taken from SCT's existing website

Company story and the 2015 / 2015–2019 / 2021 / today milestones · the four-step
development strategy · vision (4 statements) and mission (2) · the four working
pillars and three principles · founder and team names · all 21 product names and
their two ranges · contact details, address and social links · ISO 9001:2008 claim.

### Placeholders — awaiting SCT

Search the codebase for `PLACEHOLDER`, or look for the amber-outlined `<PlaceholderNote>`
that renders wherever copy is pending.

| What                      | Where                     | Notes                                                    |
| ------------------------- | ------------------------- | -------------------------------------------------------- |
| Farmers-reached figure     | `data/site.ts` → `stats`  | The old site rendered it from a script with no value in the markup — there was no number to carry over. Renders as `—`. |
| Product descriptions       | `data/products.ts`        | `summary` is safe to show today (name/range only, no claim). `detail` and `application` are bracketed. |
| Farmer stories             | `data/testimonials.ts`    | Every field bracketed. Do not publish without the farmer's written consent. |
| Article bodies             | `data/knowledge.ts`       | Titles, categories and summaries are ready; bodies are stubs. |
| Saptapadi step wording     | `data/saptapadi.ts`       | SCT publishes that Saptapadi exists and what it is for, but not the seven steps. The ring is filled with SCT's own four pillars + three principles (which number seven) and says so on the page. |
| Privacy / Terms            | `app/privacy`, `app/terms`| Describe what the site actually does. Not legal advice — have a lawyer review. |

### Images

All photography is in `src/data/images.ts` — components never reference a raw path,
so swapping artwork is a one-line change. Current photos are freely-licensed
placeholders (Wikimedia Commons) chosen for Indian-agriculture relevance and marked
`credit: "Placeholder — replace with SCT photography"`. The logo, team photographs and
ISO mark are SCT's own, carried across from the existing site.

**Product photography:** SCT's existing product images
(`finalapi.soilchargertechnology.com/.../product/*`) now return **404** — that media
server has lost the uploads. Rather than ship broken images, product cards render
`<ProductVisual>`, a branded pack illustration built from the design tokens and labelled
"Pack artwork pending". To switch to real photos: drop files into
`public/images/products/` and set `image` on the product in `data/products.ts`; the card
prefers a real photograph whenever one is present.

### The contact form

There is no backend, so `ContactForm` composes the visitor's answers into an email and
hands it to their mail client — which works today on every device with nothing to deploy.
To wire a real endpoint, replace the body of `handleSubmit`; the field names, validation
and success state are already in the shape a handler expects.

---

## Accessibility

- Skip link, one `<h1>` per page, semantic landmarks throughout
- Mobile menu is a labelled dialog: focus trap, scroll lock, Escape to close, focus
  returned to the trigger
- Saptapadi is a real ARIA tablist — arrow keys, Home and End
- Accordions use `aria-expanded` / `aria-controls` on real buttons
- Brand-coloured `:focus-visible` rings, never removed outlines
- `prefers-reduced-motion` respected in both CSS and Framer Motion
- Primary controls are 44px+ tap targets

### Verified

Automated pass over **13 routes × 5 viewports** (320 / 390 / 768 / 1280 / 1440):
no horizontal scroll, no broken images, no console or page errors, exactly one `h1`
per page, no image missing an `alt`. Mobile menu verified to open, lock scroll and
close on Escape. `position: sticky` verified to hold (the page uses `overflow-x: clip`
rather than `hidden` precisely so sticky keeps working). Production build, ESLint and
`tsc --noEmit` all clean.

---

## SEO

Per-route metadata with a title template · canonical URLs · Open Graph and Twitter
cards · `Organization` JSON-LD in the root layout · `FAQPage` JSON-LD on the contact
page, generated from the same array the page renders · `sitemap.ts` and `robots.ts`
derived from the content files, so new products and articles appear automatically.

---

## Conventions

- Server Components by default; `"use client"` only where interaction or animation needs it
- No `any`; no unnecessary `useEffect`
- Content goes in `src/data/`, never in JSX
- Colours, radii and durations come from tokens, never inline values
- New sections compose `<Container>` + `<SectionHeading>` + `<ScrollReveal>` so rhythm stays consistent
- `CTAButton` appends `className` rather than merging it — wrap it to control responsive
  visibility instead of passing `hidden` (see the note in the component)
