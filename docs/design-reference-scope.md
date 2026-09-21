# SCOPE (scope.org.in) — Design & Motion Reference

**Source:** https://scope.org.in/
**Analysed:** 2026-09-21
**Why it's here:** Reference for the *design and motion standard* the SCT redesign should hit. Not a competitor — a craft benchmark.

> SCOPE is the EdTech brand of **Sumago Infotech Pvt. Ltd.** (Nashik). Treat this as the in-house design standard to match or beat, not as a site to copy section-for-section — the content model (courses/placements) is nothing like SCT's.

Companion files: [sct-legacy-content.md](sct-legacy-content.md) · [agrostar-benchmark.md](agrostar-benchmark.md)

---

## 1. Tech stack (confirmed from the build output)

| Layer | What they used |
|---|---|
| Framework | **Next.js** (App Router, **Turbopack** build — chunks are hashed `/_next/static/chunks/*`) |
| CSS | **Tailwind v4** (CSS-first `@theme` tokens — `--color-brand`, `--color-ink`, etc.) |
| Scroll reveals | **AOS** (`data-aos`), with `prefers-reduced-motion` honoured |
| Page transitions | Native **CSS View Transitions API** — no JS animation library |
| Fonts | **Outfit**, **Lexend Deca**, **Poppins** — via `next/font` with generated fallback metrics (`Outfit Fallback` etc., so no layout shift) |
| Icons | Inline SVG (react-icons style, `stroke/fill=currentColor`, `height=1em`) |
| Images | `next/image` with `data-nimg="fill"`, `loading="eager"` above the fold / `lazy` below |

**Notably absent:** no GSAP, no Framer Motion, no Lenis, no Locomotive, no Swiper. **Every animation on this site is CSS.** That's the key lesson — the site feels expensive and ships almost no animation JS.

---

## 2. Color system

Tailwind v4 theme tokens, lifted straight from the compiled CSS:

```css
--color-brand:        #d21f26;  /* primary red */
--color-brand-bright: #ff5a5d;  /* light accent — used on dark sections */
--color-brand-strong: #b81a20;  /* hover/pressed */

--color-ink:   #1b1b1b;  /* text */
--color-paper: #ffffff;  /* surface */
--color-mist:  #f7f7f9;  /* tinted surface / hover bg */
--color-line:  #e8e8ec;  /* borders */
```

**The whole palette is 7 tokens.** Everything else is opacity modifiers on those: `text-ink/60`, `text-ink/55`, `bg-brand/10`, `border-brand/30`, `text-white/70`.

Accent scales used sparingly: amber (`#ffd236` / `#7b3306`) for the "🔥 Trending" badge, green for success states.

> **The discipline to copy:** one brand color, three shades of it, one ink, three neutrals. All hierarchy comes from **opacity**, not from more colors. SCT should define exactly this much and no more.

---

## 3. Motion system — all nine animations

### 3.1 `text-metal-red-shine` — the signature text animation

This is the effect the user flagged as "text + color motion." Used **9 times** on the homepage, always on the last 1–2 words of an `<h2>`:

```html
<h2>Explore our <span class="text-metal-red-shine">trending programs</span></h2>
```

Two stacked background layers clipped to the text:

```css
.text-metal-red-shine {
  color: transparent;
  -webkit-text-fill-color: transparent;
  background-image:
    /* layer 1 — the moving white gloss */
    linear-gradient(115deg, transparent 34%, #ffffff8c 44%, #fff 50%, #ffffff8c 56%, transparent 66%),
    /* layer 2 — the static metallic red gradient */
    linear-gradient(177deg, #ffb3b4 0%, #ef4a4e 20%, #d73438 40%, #8f1418 52%, #c1282c 66%, #ff8f91 100%);
  background-size: 200% 100%, 100% 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
          background-clip: text;
  filter: drop-shadow(0 1px 1px #7a151940);
  animation: text-shine-sweep 3.5s linear infinite;
}

@keyframes text-shine-sweep {
  0%  { background-position: 160% 0, 0 0; }
  to  { background-position: -60% 0, 0 0; }
}
```

**How it works:** the red gradient layer never moves. Only the gloss layer sweeps across (160% → −60%). The `drop-shadow` gives it the embossed metal edge. `.text-metal-red` is the same thing without the animation, for static use.

**Why it's good:** zero JS, zero layout impact, reads as premium. Disabled under `prefers-reduced-motion`.

### 3.2 `bg-navy-grid` — animated ambient section background

A four-layer background plus two blurred drifting orbs:

```css
.bg-navy-grid {
  isolation: isolate;
  background-color: #070d20;
  background-image:
    linear-gradient(#ffffff0b 1px, transparent 1px),            /* grid — horizontal */
    linear-gradient(90deg, #ffffff0b 1px, transparent 1px),     /* grid — vertical */
    linear-gradient(#e9eef700 95%, #e9eef7d9 100%),             /* bottom fade into next section */
    linear-gradient(135deg, #070d20 0%, #0c1636 34%, #1b2d55 62%, #3a4f82 100%);
  background-size: 46px 46px, 46px 46px, 100% 100%, 240% 240%;
  animation: navy-flow 22s ease-in-out infinite alternate;
  position: relative; overflow: hidden;
}

/* the grid crawls diagonally while the big gradient pans */
@keyframes navy-flow {
  0%  { background-position: 0 0, 0 0, 0 100%, 0%; }
  to  { background-position: 120px 120px, 120px 120px, 0 100%, 100%; }
}

/* two 44rem blurred orbs drifting on different clocks */
.bg-navy-grid::before, .bg-navy-grid::after {
  content: ""; position: absolute; z-index: -1;
  width: 44rem; height: 44rem; border-radius: 9999px;
  filter: blur(90px); pointer-events: none; will-change: transform;
}
.bg-navy-grid::before {
  background: radial-gradient(circle, #2563eb52, transparent 62%);  /* blue */
  animation: navy-drift-a 20s ease-in-out infinite alternate;
  top: -18%; left: -8%;
}
.bg-navy-grid::after {
  background: radial-gradient(circle, #d21f263d, transparent 62%);  /* brand red */
  animation: navy-drift-b 26s ease-in-out infinite alternate;
  top: 4%; right: -8%;
}

@keyframes navy-drift-a { 0% { transform: translate(0) scale(1); } to { transform: translate(9rem, 5rem) scale(1.18); } }
@keyframes navy-drift-b { 0% { transform: translate(0) scale(1); } to { transform: translate(-7rem, 4rem) scale(1.12); } }
```

**The trick:** three different durations (22s / 20s / 26s) on `alternate`, so the loops never re-sync. The motion reads as organic rather than looping.

### 3.3 `bg-noir-grid` — the darker variant

Same architecture, near-black (`#0a0708`), 56px grid, red/maroon orbs, 22s and 28s. Used behind the **Trending Courses** section so white cards pop off it.

```css
.bg-noir-grid::before { background: radial-gradient(circle, #d7343838, transparent 60%); animation: noir-drift-a 22s …; }
.bg-noir-grid::after  { background: radial-gradient(circle, #78141a2e, transparent 62%); animation: noir-drift-b 28s …; }
```

### 3.4 `card-marquee` — infinite horizontal chip scroller inside cards

```css
.card-marquee {
  position: relative; overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6% 94%, transparent);
}
.card-marquee-track {
  display: inline-flex; width: max-content;
  animation: card-marquee 20s linear infinite;
}
@keyframes card-marquee { 0% { transform: translate(0); } to { transform: translate(-50%); } }

.group:hover .card-marquee-track { animation-play-state: paused; }
```

**Two details worth stealing:**
1. The content is **duplicated in the DOM**, so `translate(-50%)` loops seamlessly.
2. The `mask-image` fades both edges, so chips dissolve instead of clipping.
3. **Pauses on card hover** via `.group:hover` — lets people actually read it.

### 3.5 Page transitions — native View Transitions API

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: .42s;
  animation-timing-function: cubic-bezier(.22, 1, .36, 1);   /* easeOutQuint */
  animation-fill-mode: both;
}
::view-transition-old(root) { animation-name: vt-page-out; }
::view-transition-new(root) { animation-name: vt-page-in; }

@keyframes vt-page-out { to   { opacity: 0; transform: translateY(-8px); } }
@keyframes vt-page-in  { 0%   { opacity: 0; transform: translateY(14px); } }

/* kill per-element morphing — only the root crossfades */
::view-transition-group(*),
::view-transition-old(*),
::view-transition-new(*) { mix-blend-mode: normal !important; animation: none !important; }
```

A short, restrained crossfade + 8/14px vertical drift. The `!important` block on `*` is deliberate: it stops the browser auto-morphing individual elements, which is what makes most View Transitions implementations look chaotic.

### 3.6 Scroll reveals — AOS, used sparingly

Only **6 `data-aos` attributes on the entire homepage**:

```
5 × data-aos="fade-up"
1 × data-aos="fade-right"
data-aos-duration="1200"
data-aos-delay="0 / 120 / 240 / 360 / 480"   ← 120ms stagger
```

Plus reduced-motion and a kill switch:

```css
@media (prefers-reduced-motion: reduce) { [data-aos] { opacity: 1 !important; transform: none !important; } }
.aos-disabled [data-aos] { opacity: 1 !important; transform: none !important; }
```

> **The restraint is the lesson.** One reveal type, a 120ms stagger, applied maybe six times. Not every section animates in.

### 3.7 Hero entrance

The `<h1>` ships with inline `style="opacity:0; transform:translateY(20px)"` and is animated on mount — so it's guaranteed to animate even before AOS initialises, with no flash of final state.

---

## 4. Product showcase card — full anatomy

This is the pattern to adapt for SCT's product cards. Six of them in a `grid gap-5 sm:grid-cols-2 lg:grid-cols-3` on a dark `bg-noir-grid` section.

### Card shell

```html
<a class="group flex transform-gpu flex-col overflow-hidden rounded-3xl border border-line bg-white
          transition-all duration-300 [backface-visibility:hidden]
          hover:-translate-y-1 hover:border-brand/40
          hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.55)]"
   href="/programs/full-stack-development">
```

- The **whole card is one `<a>`** — no nested links, one big tap target
- `group` drives every child hover
- `transform-gpu` + `[backface-visibility:hidden]` = no sub-pixel text shimmer during the lift
- Lift is only **4px** (`-translate-y-1`) with a big soft shadow doing the work

### Image layer

```html
<div class="relative h-44 shrink-0 transform-gpu overflow-hidden [backface-visibility:hidden]">
  <img class="object-cover transition-transform duration-300 group-hover:scale-105" … />

  <!-- top scrim so an overlay badge stays readable on any photo -->
  <div class="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent"></div>

  <!-- bottom scrim that melts the photo into the white card body -->
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"></div>

  <span class="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full
               bg-amber-300 px-2.5 py-1 text-xs font-bold text-amber-900 shadow">🔥 Trending</span>
</div>
```

> **The bottom-scrim trick is the nicest detail on the site.** A `from-white` gradient at the base of the image blends the photo into the card body — no hard seam, and it works with any photo. Directly applicable to SCT product photography.

### Body

```html
<div class="flex flex-1 flex-col p-6">
  <h3 class="text-lg font-bold text-ink">Full Stack Java</h3>
  <p class="mt-2 text-sm leading-relaxed text-ink/60">Java, Spring Boot & React to build and deploy real, end-to-end web apps.</p>

  <!-- tech chips: 36px squares, border lights up on card hover -->
  <div class="mt-4 flex flex-wrap gap-2">
    <span title="React" class="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white
                               transition-colors group-hover:border-brand/20">
      <img src="…/react.svg" class="h-5 w-5 object-contain" loading="lazy" />
    </span>
    …
  </div>

  <!-- meta row: duration · level · rating -->
  <div class="mt-4 flex items-center gap-2.5 text-xs font-medium text-ink/60">…</div>
</div>
```

### Card information hierarchy

```
[photo + scrims + corner badge]
 ├─ title           text-lg font-bold text-ink
 ├─ one-line desc   text-sm text-ink/60
 ├─ icon row        5 × 36px logo tiles
 ├─ meta row        duration · level · ★ rating
 └─ marquee strip   auto-scrolling feature chips (pauses on hover)
```

**Mapped onto SCT:** photo → product shot · title → product name · desc → one-line benefit · icon row → crop icons or certification marks · meta row → **dosage · packing · application method** · marquee → the numbered advantages, which SCT already has for all 21 products.

### Other card variant (feature / benefit cards)

```html
<div class="flex items-start gap-4 rounded-3xl border border-line bg-white p-6 transition-all
            hover:-translate-y-0.5 hover:border-brand/30
            hover:shadow-[0_24px_48px_-24px_rgba(20,20,20,0.18)]">
  <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-xl text-brand">[icon]</span>
  <div>
    <h3 class="text-lg font-bold text-ink">…</h3>
    <p class="mt-1.5 text-sm leading-relaxed text-ink/60">…</p>
  </div>
</div>
```

The `bg-brand/10` + `text-brand` icon tile is used everywhere on the site — nav dropdown items, benefit cards, feature rows. One idea, repeated.

---

## 5. Design tokens in practice

### Type

| Use | Spec |
|---|---|
| H1 (hero) | `text-6xl font-extrabold leading-[1.05] tracking-tight` → `max-lg:text-4xl max-sm:text-[2rem]` |
| H2 (section) | `text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.02em]` |
| H3 (card) | `text-lg font-bold text-ink` |
| Body | `text-sm leading-relaxed text-ink/60` |
| Eyebrow | `text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-bright` |
| Hero kicker | `text-sm font-semibold uppercase tracking-[0.3em] text-white/85` |
| Micro-label | `text-[0.62rem] font-bold uppercase tracking-[0.12em] text-brand/70` |

**The two-part signature:** tight negative tracking on headings (`-0.02em`), wide positive tracking on uppercase eyebrows (`0.12em`–`0.3em`). That contrast is most of what makes it read as "current."

Fluid `clamp()` on every section heading — no breakpoint jumps.

### Spacing & shape

| Token | Value |
|---|---|
| Section padding | `py-14` / `py-16` → `sm:py-20` |
| Container | `mx-auto max-w-[1200px]` |
| Page gutter | `px-6 max-lg:px-4` |
| Grid gap | `gap-5` (cards), `gap-4` (tight) |
| Cards | `rounded-3xl` (24px) |
| Buttons / tiles | `rounded-lg`, `rounded-xl` |
| Chips / pills | `rounded-full` — **174 uses**, the most-used radius on the site |

### Shadows — all custom, all large-offset/large-blur/negative-spread

```
shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]     × 40   general lift
shadow-[0_28px_56px_-24px_rgba(0,0,0,0.55)]    × 20   card hover (on dark)
shadow-[0_24px_48px_-24px_rgba(20,20,20,0.18)] × 12   card hover (on light)
shadow-[0_0_0_6px_rgba(210,31,38,0.15)]        × 10   brand focus ring
```

> Never Tailwind's default `shadow-md`/`shadow-lg`. Always a custom shadow with **negative spread**, which keeps the shadow tucked under the card instead of haloing it.

### Hover vocabulary — only two lifts on the whole site

```
hover:-translate-y-1     × 20   big cards
hover:-translate-y-0.5   × 14   small cards / rows
```

Paired with: `hover:border-brand/30` or `/40`, a custom shadow, and `duration-300`. Images inside get `group-hover:scale-105`. That's the entire hover system.

---

## 6. Page structure (for reference)

```
1.  Hero — full-bleed image carousel, dark scrim, centered H1, 2 CTAs
2.  Recognition & stats — 6 accreditation badges + 4 counters
3.  "Why choose SCOPE?" — 6 benefit cards (icon tile + title + line)
4.  Trending programs — 6 showcase cards on bg-noir-grid   ← the product section
5.  "Every student also gets" — 4 icon cards
6.  Learning journey — 5-step path
7.  Hiring partners — 2-row logo marquee, opposite directions
8.  Life at SCOPE — 10-image testimonial carousel
9.  Institutional programs — 4 large cards w/ image + stat + feature list
10. Featured story — single wide card → Instagram reel
11. FAQ — 6-item accordion
12. Final CTA — "The Next Chapter Is Yours" + 4 contact routes
13. Footer — 4 link columns + address + socials + sister brands
```

Full nav/URL map and page copy is in the WebFetch capture; re-fetch if needed.

---

## 7. What to take for SCT

Ranked by value-to-effort:

| # | Pattern | Apply to SCT |
|---|---|---|
| 1 | **`text-metal-red-shine` gradient-sweep on heading keywords** | Recolour to SCT's earth/green brand. The "4 Pillars" headline is the obvious place. ~20 lines of CSS. |
| 2 | **Animated ambient section background** (grid + 2 drifting blurred orbs on desynced clocks) | A soil-brown/deep-green variant behind the products section. This single technique carries most of the "premium" feel. |
| 3 | **Product card anatomy** — photo + dual scrims + corner badge + icon row + meta row + pausing marquee | SCT has 21 products with advantages, dosage and packing already written — this card was designed for exactly that data shape. |
| 4 | **The bottom `from-white` scrim** melting photo into card body | Makes inconsistent product photography look intentional. SCT's product shots vary a lot. |
| 5 | **7-token color system, hierarchy via opacity** | Replaces the old site's ad-hoc color use entirely. |
| 6 | **Custom negative-spread shadows only** | One line of config, immediately reads as modern. |
| 7 | **Two hover lifts, one duration, site-wide** | Consistency over variety. |
| 8 | **Native View Transitions** for page changes | ~15 lines of CSS, no library. |
| 9 | **Tight heading tracking + wide uppercase eyebrows** | Pure typography, zero cost. |
| 10 | **AOS with 120ms stagger, used ≤6 times per page** | Restraint is the point. |

### Non-negotiables carried over

- `prefers-reduced-motion: reduce` kills **every** animation — shine, orbs, marquee, AOS. Already handled on SCOPE; do the same.
- `transform-gpu` + `backface-visibility:hidden` on anything that lifts, or text shimmers.
- `will-change: transform` on the drifting orbs only — not everywhere.
- Marquees pause on hover.
- Fonts via `next/font` with fallback metrics — no CLS.

### What SCT should do differently

SCOPE is a **red-on-dark tech** brand. SCT is **soil, biology and Vedic agriculture**. Take the *mechanics* — the shine sweep, the drifting orbs, the card anatomy, the shadow and hover system — and re-skin them into earth tones. A navy/noir grid behind fertiliser products would be wrong; the same technique in deep soil-brown or forest-green would not.

Also: SCOPE has no language switching. SCT needs EN/Marathi/Hindi, which affects heading line-heights (Devanagari needs more) and makes `clamp()` sizing more important, not less.

---

## 8. Method note

Everything above was read from the shipped build — the served HTML plus the three compiled CSS chunks. Color values, keyframes, animation timings, class usage counts and card markup are exact, not inferred. The page-structure list in §6 comes from a markdown extraction of the rendered page and is descriptive rather than byte-exact. I did not open the site in a browser, so I have not seen the animations play — the descriptions are read from the CSS, not observed.
