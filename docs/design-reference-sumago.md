# Sumago Infotech (sumagoinfotech.com) — Design & Motion Reference

**Source:** https://sumagoinfotech.com/home
**Analysed:** 2026-09-21
**Relationship to [design-reference-scope.md](design-reference-scope.md):** same studio, same design DNA, **much deeper motion system**. SCOPE is the restrained version; Sumago is the maximal one. Read both — this file only covers what's *different or additional*.

> Sumago Infotech is the parent company (SCOPE and SCOPIO AI are the sibling brands). Founded 2013, Nashik + Pune, 70+ team, ISO 9001:2015 + CMMI Level 5.

---

## 1. Tech stack

Identical foundation to SCOPE: **Next.js + Turbopack**, **Tailwind v4**, **AOS**, `next/font`, inline SVG icons, `next/image`.

**Fonts:** `Lexend Deca` (shared with SCOPE) + **`Caveat`** exposed as `--font-hand` — a handwriting face used as an accent. SCOPE doesn't have this.

**Page weight:** 787 KB of HTML vs SCOPE's 356 KB. CSS is 280 KB across three chunks vs SCOPE's 143 KB. This is a substantially bigger build.

---

## 2. Color system — wider than SCOPE's

```css
/* brand — red, slightly different from SCOPE's #d21f26 */
--color-brand:        #d73438;
--color-brand-bright: #ff5a5d;   /* same as SCOPE */
--color-brand-strong: #b82a2e;
--color-brand-ink:    #a81b22;   /* extra dark step SCOPE doesn't have */

/* neutrals */
--color-ink:   #1a1a1a;
--color-paper: #ffffff;
--color-mist:  #f5f5f6;
--color-line:  #e6e6e8;

/* secondary family — "tech" blue, for the engineering/AI sections */
--color-tech:     #1e83f0;
--color-tech-ink: #1257a8;

/* accent — DUAL VALUES = light/dark theme aware */
--color-accent:        #1d4ed8  /  #608ffa;
--color-accent-hover:  #1a44bd  /  #7ea3ff;
--color-accent-strong: #a8c0ff;
--color-on-accent:     #ffffff;

/* semantic */
--color-success: #16a34a;  --color-success-bright: #4ade80;
--color-emerald-400/500/600, --color-amber-400/900, --color-red-50/100
```

**Difference from SCOPE:** SCOPE is a **7-token, single-hue** system. Sumago runs **three families** — brand red, tech blue, accent blue — plus semantic colors, and the accent pair has light/dark variants.

> For SCT: SCOPE's discipline is the better model. Sumago needs three families because it sells across 14 service lines and 10 industries. SCT sells one philosophy and three product lines — one hue plus semantics is enough.

---

## 3. Motion system — this is the real difference

**SCOPE has 9 keyframes. Sumago has 70+.** It's not more animation per section; it's a *library* organised into families:

| Prefix | Family | What it drives |
|---|---|---|
| `hero-*` | 8 keyframes | aurora-pan, mesh-pan, dot-pan, particle, sweep, ring, spin, spin-rev, dash |
| `sys-*` | 14 keyframes | animated SVG system diagrams — blink, caret, cone, cursor, draw, fill, flow, meter, packet, pop, scan, spine, stream, wave |
| `tx-*` | 13 keyframes | transformation scenes — draw, dwell, grow, lit, orbit, ring, run, scan, scene-in, travel-x/y, vanish, blink |
| `svc-*` | 4 keyframes | service diagrams — flow, node-pulse, orbit, orbit-rev |
| `wc-*` | 4 keyframes | "why choose" section — beam, field-drift, flow, node |
| `reel-*` | 6 keyframes | UI mockup reels — a, b, c, draw, notif, tab |
| `build-*` | 4 keyframes | dwell, dwell-y, pulse, stage-in |
| shared | | `blob-float`, `marquee-x`, `text-shine`, `text-shine-sweep`, `star-twinkle`, `streak-drift`, `tile-float`, `challenge-fly`, `particle-crush`, `leader-arrow-draw` |

### 3.1 Motion tokens — the thing SCOPE doesn't have

```css
--ease-standard: cubic-bezier(.4, 0, .2, 1);
--ease-entrance: cubic-bezier(0, 0, .2, 1);
--ease-out:      cubic-bezier(0, 0, .2, 1);
--ease-in-out:   cubic-bezier(.4, 0, .2, 1);
--ease-admin:    cubic-bezier(.22, 1, .36, 1);   /* easeOutQuint — the "expensive" one */
```

Used as `animation: build-stage-in .42s var(--ease-entrance) both`.

**Per-element duration via CSS custom properties:**

```css
animation: hero-particle var(--d)   ease-in-out infinite;   /* each particle its own clock */
animation: marquee-x     var(--dur) linear      infinite;   /* each marquee row its own speed */
```

This is how they run 12 particles at 12 different speeds from one class. **Copy this pattern.**

### 3.2 The `fx-*` background layer system

Six composable, stackable background utilities. This is the single most reusable idea on the site:

```css
/* 4 radial blobs at 180% size, panning on a 18s loop */
.fx-mesh {
  background-image:
    radial-gradient(40% 50% at 20% 30%, #ffffff12, transparent 60%),
    radial-gradient(40% 50% at 80% 20%, #ffffff0d, transparent 60%),
    radial-gradient(45% 55% at 72% 82%, #ffffff0d, transparent 62%),
    radial-gradient(42% 52% at 24% 86%, #ffffff0a, transparent 62%);
  background-size: 180% 180%;
  animation: hero-mesh-pan 18s ease-in-out infinite;
}

/* 3 softer blobs + opacity breathing, 16s */
.fx-hero-aurora {
  background-image:
    radial-gradient(50% 60% at 18% 22%, #ffffff0f, transparent 60%),
    radial-gradient(46% 56% at 82% 30%, #ffffff0d, transparent 62%),
    radial-gradient(55% 60% at 60% 92%, #ffffff0a, transparent 64%);
  background-size: 160% 160%;
  animation: hero-aurora-pan 16s ease-in-out infinite;
}
@keyframes hero-aurora-pan {
  0%, to { opacity: .85; background-position: 0 0, 100% 0, 50% 100%; }
  50%    { opacity: 1;   background-position: 30% 40%, 68% 18%, 42% 68%; }
}

/* 10 hand-placed 1.2–1.6px stars, breathing opacity */
.fx-starfield {
  background-image:
    radial-gradient(1.4px 1.4px at 12% 22%, #ffffffe6, transparent),
    radial-gradient(1.2px 1.2px at 28% 68%, #ffffffe6, transparent),
    /* …8 more… */;
  background-repeat: no-repeat;
  animation: star-twinkle 6s ease-in-out infinite;
}

/* diagonal hairline streaks in brand red, slowly drifting */
.fx-streaks {
  background-image: repeating-linear-gradient(115deg,
    transparent 0 30px, #d7343824 30px 31px, transparent 31px 64px);
  animation: streak-drift 16s ease-in-out infinite;
}
.fx-streaks-mono { /* same, white instead of red */ }

/* dot grid, panning, vignette-masked */
.fx-dots {
  background-image: radial-gradient(circle at 1px 1px, #fff3 1.4px, transparent 0);
  background-size: 30px 30px;
  animation: hero-dot-pan 8s linear infinite;
  mask-image: radial-gradient(75% 74% at 50% 42%, #000 20%, transparent 80%);
}

/* 56px line grid, static, vignette-masked */
.fx-grid-static {
  background-image:
    linear-gradient(90deg, #ffffff0d 1px, transparent 1px),
    linear-gradient(#ffffff0d 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(78% 74%, #000 30%, transparent 80%);
}
```

**Two techniques worth naming:**
1. **`mask-image` vignette** on the grid/dot layers, so texture fades out at the edges instead of running to a hard border. SCOPE's `bg-navy-grid` fakes this with a gradient layer; the mask is cleaner.
2. **Alpha-only colors** (`#ffffff0d`, `#fff3`) mean the same utility works over any background color. A brown section and a green section both get the same texture class.

> **These six classes ship in the CSS but appear zero times in the homepage's served HTML** — they're used on the `/solutions/*` and `/industries/*` routes. The CSS is global.

### 3.3 Hero headline — masked line reveal

```html
<h1 class="font-bold leading-[1.04] tracking-[-0.03em] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
  <span class="block overflow-hidden pb-[0.12em]">
    <span class="block" style="transform:translateY(115%)">Helping businesses solve complex problems</span>
  </span>
  <span class="block overflow-hidden pb-[0.12em]">
    <span class="block" style="transform:translateY(115%)">
      <span class="text-metal-red-shine">through technology.</span>
    </span>
  </span>
</h1>
```

Each line is a **clipping window** (`overflow-hidden`) with the text parked at `translateY(115%)` below it. On mount, each line slides up into view — the classic curtain reveal, done with two spans and no library. The `pb-[0.12em]` stops descenders being clipped.

The final phrase gets `text-metal-red-shine` — **the same class as SCOPE**. Shared component library confirmed.

### 3.4 Viewport-fitting CTA sizing

```
h-[clamp(2.75rem,min(4.2vw,6vh),3.75rem)]
px-[clamp(1.25rem,min(2.6vw,3.6vh),2.25rem)]
mt-[clamp(0.25rem,1.5vh,1.25rem)]
```

`min(vw, vh)` inside `clamp()` — the button scales to whichever viewport axis is smaller, so the hero never overflows on a short laptop screen or a tall phone. Clever, and worth stealing for any full-viewport hero.

### 3.5 `challenge-fly` — 3D fly-through

Drives the "We start with your business problem" section, where 10 problem statements fly toward the viewer:

```css
@keyframes challenge-fly {
  0%  { opacity: 0; filter: blur(12px); transform: translateZ(-640px) scale(.7); }
  18% { opacity: 1; }
  32% { filter: blur(0);  transform: translateZ(0) scale(1); }
  62% { opacity: 1; filter: blur(0); transform: translateZ(0) scale(1); }
  90% { opacity: 1; filter: blur(2px); }
  to  { opacity: 0; filter: blur(9px); transform: translateZ(700px) scale(1.9); }
}
```

Parent carries `perspective: 1200px`. Blur is tied to Z-depth, so items focus as they arrive and defocus as they pass — a real depth-of-field simulation in ~8 lines.

> Heavy (`filter: blur` is expensive to animate). Use once per site, never on a list of more than ~10 items.

### 3.6 Marquees — 13 of them, each on its own clock

```
animate-[marquee-x_40s_linear_infinite]
animate-[marquee-x_40s_linear_infinite_reverse]
animate-[marquee-x_45s_…]  animate-[marquee-x_55s_…]
```

Paired rows run **opposite directions at different speeds** (40s forward / 40s reverse; 45s / 55s). Same `translate(-50%)` + duplicated-content trick as SCOPE, same `group-hover:[animation-play-state:paused]`.

The industries marquee uses **image cards, not logos** — 256×160 → 384×208 `rounded-2xl` cards with `hover:-translate-y-1 hover:shadow-xl` and `group-hover/card:scale-105` on the image. A marquee of *cards* rather than a marquee of *logos* is a stronger pattern, and it's directly usable for SCT's crop or product range.

### 3.7 `text-shine` — the white variant

Separate from `text-metal-red-shine`:

```css
.text-shine {
  color: transparent;
  background: linear-gradient(110deg, #fff9 0% 44%, #fff 49% 51%, #fff9 56% 100%) 0 0 / 220%;
  -webkit-background-clip: text; background-clip: text;
  filter: drop-shadow(0 0 6px #ffffff40);
  animation: text-shine 3.2s linear infinite;
}
```

White-on-dark version of the same idea. Single layer, simpler than the red one.

---

## 4. Reduced motion — better than SCOPE's

Sumago does this properly, at three levels:

```css
/* 1. global kill switch */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, ::before, ::after {
    transition-duration: .001ms !important;
    animation-duration:  .001ms !important;
    animation-iteration-count: 1 !important;
  }
  [data-aos] { opacity: 1 !important; transform: none !important; }
}

/* 2. opt-in variants — animation only exists when motion is welcome */
@media (prefers-reduced-motion: no-preference) {
  .motion-safe\:animate-\[blob-float_15s_ease-in-out_infinite\] { … }
  .leader-arrow-line { stroke-dasharray: 1; stroke-dashoffset: 1px; }
  .aos-animate .leader-arrow-line { animation: leader-arrow-draw .3s ease-out forwards; }
}

/* 3. per-element opt-out */
@media (prefers-reduced-motion: reduce) {
  .motion-reduce\:transform-none  { transform: none; }
  .motion-reduce\:animate-none    { animation: none; }
  .motion-reduce\:transition-none { transition-property: none; }
}
```

**Adopt this exact three-level structure for SCT.** SCOPE only does level 1.

---

## 5. Component patterns

### 5.1 Numbered service card (the "01 Advise" pattern)

```html
<div class="group …">
  <span class="… shadow-sm shadow-brand/30 transition-transform duration-300
               group-hover:scale-105 motion-reduce:transform-none sm:h-14 sm:w-14">[icon]</span>

  <!-- ghost number that wakes up on hover -->
  <span aria-hidden="true" class="font-display text-3xl font-bold leading-none
               text-ink/10 transition-colors duration-300 group-hover:text-brand/25
               sm:text-4xl lg:text-[2.5rem]">01</span>

  <h3 class="mt-6 font-display text-xl font-bold text-ink
             transition-colors duration-300 group-hover:text-brand sm:text-2xl">Advise</h3>
  <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink/65">…</p>
</div>
```

Three things move on hover, all 300ms: icon scales 105%, ghost number goes `ink/10 → brand/25`, title goes `ink → brand`. `aria-hidden` on the number and `motion-reduce:transform-none` on the icon.

**For SCT:** this is the card for the **4 Pillars** and the **3 Principles** — both are already numbered sets.

### 5.2 Tokens

| Token | Sumago | SCOPE |
|---|---|---|
| Container | `.container-page` → `max-width: 80rem` (1280px), `padding-inline: 1.25rem → 2rem` | `max-w-[1200px]`, `px-6 max-lg:px-4` |
| Section padding | `py-16` (21×), `py-12`, `py-20`, `py-24`, `py-28` | `py-14`/`py-16` → `sm:py-20` |
| Radius | `rounded-full` 150× · `rounded-2xl` 120× · `rounded-xl` 116× · **`rounded-[24%]` 72×** | `rounded-full` 174× · `rounded-lg` 78× · `rounded-2xl` 76× · `rounded-3xl` 27× |
| Hover lift | `-translate-y-1` 48× · `-translate-y-1.5` 12× · `-translate-y-0.5` 8× | `-translate-y-1` 20× · `-translate-y-0.5` 14× |
| Heading tracking | `-0.03em` | `-0.02em` |
| AOS | **53 × `fade-up`**, delays 0/60/80/120/160/180/240/300 | 6 total |

> **`rounded-[24%]` (72 uses) is a squircle** — percentage radius scales with the element, so a 48px tile and a 96px tile keep the same *visual* curvature. Nicer than fixed `rounded-xl` for icon tiles at mixed sizes.

### 5.3 Shadows

```
shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)]        × 72   general lift (dark)
shadow-[0_28px_56px_-28px_rgba(215,52,56,0.35)]   × 12   brand-tinted glow
shadow-[0_0_8px_rgba(255,255,255,0.6)]            × 12   white glow (dots/nodes)
shadow-[0_30px_80px_-36px_rgba(0,0,0,0.95)]       ×  1   hero
shadow-[0_14px_48px_-8px_rgba(215,52,56,0.7)]     ×  1   primary CTA
```

Same negative-spread discipline as SCOPE, plus **brand-tinted shadows** — a red-tinted glow under brand elements instead of neutral black. Cheap, and it makes the brand color feel like it emits light.

The hero CTA also animates its shadow from nothing to a glow:

```
shadow-[0_0_0_0_rgba(215,52,56,0.5)]
hover:shadow-[0_10px_40px_-8px_rgba(215,52,56,0.6)]
transition-all duration-300
```

---

## 6. Page structure

```
 1. Hero — masked line reveal, aurora bg, 12 drifting particles, 2 CTAs
 2. About — "A software team that grew into a strategic technology partner", 6 counters, ISO/CMMI
 3. What we do — 4 numbered cards (01 Advise / 02 Build / 03 Automate / 04 Sustain)
 4. Challenges — "We start with your business problem — not the technology", 10 items, 3D fly-through
 5. Services — 6 cards → 14 service pages
 6. Industries — 10 image cards in a paired marquee
 7. The case for Sumago — promise + 4 points
 8. How we work — 8-step delivery flow
 9. AI Engineering
10. Proof of impact — 6 case studies in a carousel
11. Trusted & certified — ISO/CMMI + 18 client logos (Toyota, Mahindra, Hinduja, NIC, MSBTE, FSSAI)
12. Life at Sumago — 16-image carousel
13. Testimonials — 11 quotes, 5 visible, named company + role
14. Blog / Careers / Contact CTA
15. Footer — 4 columns, 14 services + 10 industries fully enumerated
```

**Content strategy notes** (distinct from SCOPE):

- **§4 is the standout.** Ten plain-language problems — *"Reports take days to pull"*, *"Big tech calls, no one to guide you"* — stated before any solution. Customer's words, not the company's.
- **Numbered verb pillars** (Advise / Build / Automate / Sustain) — one word each. Extremely memorable.
- **Testimonials name the company and the role**, not just a person. Mahindra & Mahindra, ALF Engineering, Autocop India. Verifiable.
- **Footer enumerates all 14 services and all 10 industries** as real links — an SEO surface, not a nav convenience.

---

## 7. Sumago vs SCOPE — which model for SCT?

| Dimension | SCOPE | Sumago | **For SCT** |
|---|---|---|---|
| Keyframes | 9 | 70+ | **Closer to SCOPE.** ~12–15. |
| Color families | 1 + semantics | 3 + semantics | **SCOPE's model**, re-hued to earth tones |
| AOS reveals/page | 6 | 53 | **SCOPE's restraint.** 53 fade-ups is fatiguing |
| Motion tokens | none | `--ease-*` + per-element `--d`/`--dur` | **Take Sumago's.** Costs nothing |
| Background FX | 2 bespoke classes | 6 composable `fx-*` utilities | **Take Sumago's.** Build 3–4 for SCT |
| Reduced motion | global kill | 3-level system | **Take Sumago's** |
| Shadows | neutral, negative spread | + brand-tinted glows | **Take both** |
| Hero | image carousel + scrim | masked line reveal + aurora + particles | **Sumago's reveal**, SCOPE's photography |
| Numbered cards | — | ghost-number hover | **Take it** — 4 Pillars + 3 Principles are already numbered |
| Marquee | logo chips | image cards, paired opposite directions | **Sumago's card marquee** for crops/products |

### Concrete picks for SCT

1. **Masked line reveal** on the hero H1 — two spans, `overflow-hidden` + `translateY(115%)`. Highest impact per line of code on either site.
2. **`fx-*` background utilities**, re-hued: a soil-brown mesh, a forest-green aurora, a subtle grid with a `mask-image` vignette. Alpha-only colors so one class works on every section.
3. **Motion tokens** — `--ease-standard`, `--ease-entrance`, `--ease-admin`, plus `--d`/`--dur` per element.
4. **Three-level reduced-motion** — global kill + `motion-safe:` + `motion-reduce:`.
5. **Numbered ghost-card** for the 4 Pillars and the 3 Principles.
6. **Card marquee** (not logo marquee) for crops or the product range, paired rows in opposite directions, pausing on hover.
7. **Brand-tinted shadows** — a warm earth glow under primary CTAs.
8. **`rounded-[24%]` squircles** for icon tiles at mixed sizes.
9. **`clamp(… min(vw, vh) …)`** sizing so the hero fits any viewport.
10. **The "10 problems in the customer's words" section.** SCT's blog archive is *full* of this already — soil that won't hold water, disease that won't respond to spray, rising input costs, cancer in farming families. Lifting ten lines straight from the Marathi articles would be the most emotionally direct section on the new site, and it's the one thing AgroStar completely lacks.

### What to avoid

- 53 scroll reveals. Fatiguing, and it delays content on slow connections.
- Three color families. SCT has one story, not fourteen service lines.
- `challenge-fly` blur animation on many elements — expensive. Once, or not at all.
- 787 KB of HTML. SCT's audience is on rural mobile connections; that budget doesn't exist.

---

## 8. Method note

Read from the shipped build — served HTML plus all three compiled CSS chunks. Color values, keyframes, easing tokens, class-usage counts and component markup are exact. The page-structure list in §6 comes from a markdown extraction of the rendered page and is descriptive, not byte-exact. I did not open either site in a browser, so I have not watched the animations play — everything here is read from CSS, not observed.
