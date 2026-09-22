# APMC Nandgaon (ngn.sumagodemo.com) — Design Reference

**Source:** https://ngn.sumagodemo.com/
**Analysed:** 2026-09-21
**Status:** **This is the design standard the SCT site is built to.** It replaces
[design-reference-scope.md](design-reference-scope.md) and
[design-reference-sumago.md](design-reference-sumago.md) as the governing
reference; those two remain on file as a record of the previous direction.

> APMC Nandgaon is the Agricultural Produce Market Committee of Nandgaon,
> Nashik — a statutory farmers' market body. The site is bilingual
> (Marathi/English) and carries market rates, schemes, auction tokens and
> committee information.

---

## 0. Why this reference, and what changed

SCOPE and Sumago are a software company's brands: red, maximal, 70+ keyframes,
a background-effects library. The site built from them was competent but it
read as a *product launch*.

This reference is the opposite temperament, and it is the right one for SCT. It
is an agricultural institution talking to farmers, and everything that makes it
work is a subtraction:

| | SCOPE / Sumago | APMC Nandgaon |
|---|---|---|
| Colour families | 1 (SCOPE) / 3 (Sumago) | 3, but one of them is paper |
| Keyframes | 9 / 70+ | **3** |
| Display type | Lexend Deca (sans) | **Fraunces (serif)** |
| Elevation | shadow tokens, hover lifts | hairline borders, two soft shadows |
| Section rhythm | generous | `py-10 lg:py-14` — **tight** |
| Body size | ~16px | **14px** |
| Ambient effects | `fx-*` mesh, streaks, dots, orbs | one SVG grain overlay |

The single most important observation: **the authority comes from the serif and
the spacing, not from scale or colour.** Its largest section heading is about
36px. It never shouts and it is never mistaken for a startup.

---

## 1. Tech stack

**React + Vite** (`/assets/index-*.js`, `/assets/index-*.css`), React Router,
Tailwind, framer-motion, lucide icons — the same stack SCT is on, which is why
the anatomy transfers directly rather than needing translation.

CSS ships at **62 KB** total for the whole site.

---

## 2. Colour — three families, and that is all

Declared on `:root` as space-separated channels, then consumed through Tailwind
ramps:

```css
:root {
  --color-canvas:  250 250 245;   /* #FAFAF5 */
  --color-forest:   15  78  48;   /* #0F4E30 */
  --color-harvest: 234 173  50;   /* #EAAD32 */
}
```

### The full ramps, sampled from the compiled CSS

| | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **forest** | `#EFFAF3` | `#D8F3E1` | `#B3E6C5` | — | `#48B577` | — | `#157C47` | `#11623A` | `#0F4E30` | `#0C3D27` | `#062318` |
| **harvest** | `#FDF9ED` | `#FAF0CD` | `#F5DF96` | `#EFC55A` | `#EAAD32` | `#D18D18` | `#B46D12` | `#904F12` | `#783E15` | — | — |
| **canvas** | `#FAFAF5` | `#F5F3EA` | — | — | — | — | — | — | — | — | — |
| **ink** | `#F4F5F4` | `#E5E7E5` | `#CBD0CD` | `#A1A9A4` | `#717B76` | `#576159` | `#444C46` | `#373D39` | `#22272A` | `#0E1311` | — |

**`ink` is green-mixed, not grey.** `#576159` against a true grey `#5A5F5A` is a
small shift that keeps a page of body copy sitting *with* the greens instead of
beside them. Nothing on the site is a cold neutral.

### Usage frequency (from the JS bundle)

```
text-forest    62      bg-forest    43      border-forest 38    ring-forest  4
text-harvest   55      bg-harvest   29      border-harvest 19   ring-harvest 1
                       bg-canvas     5
```

Harvest appears almost as often as forest in *text* but far less in *fills*.
That is the rule: **gold is an accent that marks things, never a field you sit
on.** The only large gold surface on either site is a single primary button.

### What SCT changed

One substitution, documented in `src/styles/globals.css`: `forest-500` is
`#009c54`, sampled from SCT's own logo, so the brand green is a first-class
token in the ramp rather than a fifth colour beside it. The deep end
(800/900/950) is the reference's untouched, because those carry white text.

SCT's logo orange (`#f08430`) did **not** become the accent. Harvest gold holds
up better against deep green at 10–11px and reads agricultural rather than
promotional. The orange survives in the logo artwork itself.

---

## 3. Typography

```css
--font-display: Fraunces, serif;                                   /* headings */
--font-sans:    Inter, system-ui, sans-serif;                      /* everything else */
--font-deva:    "Tiro Devanagari Marathi", "Noto Serif Devanagari", serif;
```

**The serif/sans pairing is the whole identity.** `font-display` appears 35
times in the bundle — headings only, never body, never a label.

`font-marathi` appears **141 times** — this is a genuinely bilingual site, and
Devanagari gets a *serif* so translated headings keep the same voice as English
ones instead of dropping to a system sans.

### Scale — small and dense

Counted from the bundle:

```
text-sm     65      text-3xl    18      text-5xl    2
text-xs     51      text-4xl    13      text-6xl    1
text-[11px] 31      text-2xl    11
text-[10px] 16      text-xl      8
text-base   14      text-lg      8
```

Body is **14px**. Labels are **10–11px**. A section heading is `text-3xl`/`4xl`
(30–36px) and `text-5xl`+ appears three times on the entire site.

SCT runs body at **15px** instead of 14 — one step up, because a farmer is
reading this on a phone in a field, not at a desk. Everything else follows.

### Tracking

```
tracking-wider   8      tracking-[0.18em]  2      tracking-tight  1
tracking-widest  3      tracking-[0.25em]  1
tracking-wide    2      tracking-[0.22em]  1
```

Wide positive tracking on uppercase micro-labels against slight negative
tracking on serif headings. That contrast is most of what makes the pairing
read as designed rather than defaulted.

> A serif needs far less negative tracking than a geometric sans. Fraunces
> starts colliding past about `-0.015em`; SCT's headings sit at `-0.012em`.

---

## 4. The signature marks

### 4.1 The gold rule — used 10 times

```html
<span class="h-[3px] mt-2 w-24 rounded-full
             bg-gradient-to-r from-harvest-400 to-transparent"></span>
```

**This is the single most repeated element on the site** and the thing that ties
its pages together. It sits under a heading and nowhere else. A shorter variant
(`w-20 mt-1.5`) is used inside cards.

SCT ships it as the `rule-harvest` utility, emitted by the `Heading` primitive
so it cannot drift. Centred headings get a two-sided fade, because a one-sided
fade under centred text reads as a mistake.

### 4.2 The gold edge on dark bands — used 3 times

```html
<span class="absolute top-0 inset-x-0 h-[2px]
             bg-gradient-to-r from-transparent via-harvest-400/60 to-transparent"></span>
```

Seats a forest section against the light one above it. SCT ships it as
`edge-harvest`, emitted automatically by `<Section ground="forest">`.

### 4.3 The grain overlay

```css
.grain-overlay { position: relative; isolation: isolate; }
.grain-overlay::after {
  content: ""; position: absolute; inset: 0; z-index: -1;
  pointer-events: none; mix-blend-mode: multiply; opacity: .45;
  background-image: url("data:image/svg+xml;utf8,<svg …><filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'
                  stitchTiles='stitch'/>
    <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0'/>
  </filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
```

One inline SVG turbulence, multiplied at low opacity. It stops large fields of
flat colour from looking digital, and costs no request and no repaint. This is
the *entire* ambient-texture system — compare Sumago's six stacked `fx-*`
layers.

SCT splits it into `grain` (the container) + `grain-layer` (the element),
because a `::after` cannot be placed behind sibling content reliably when the
section also carries an edge.

---

## 5. Elevation — borders, not shadows

The compiled CSS contains **no generic box-shadow utilities at all**. Only three
named ones exist:

```css
--shadow-soft:       0 1px 2px    rgb(14 19 17/.04), 0 8px 24px  -8px  rgb(14 19 17/.08);
--shadow-card:       0 2px 8px -2px rgb(14 19 17/.06), 0 16px 48px -16px rgb(14 19 17/.1);
--shadow-glow-green: 0 10px 40px -10px rgb(15 77 48/.45);
```

All three are wide, soft and nearly transparent — a *whisper*, not a drop
shadow. What actually defines a card is `border border-ink-100`.

The canonical card:

```html
<article class="bg-white rounded-2xl border border-ink-100 overflow-hidden shadow-soft">
```

The canonical empty state — dashed, never solid, so a reader can tell nothing
is missing from the *design*, only from the *data*:

```html
<p class="text-center text-sm text-ink-400 py-12
          border border-dashed border-ink-200 rounded-2xl">
```

### Radii

`0.25rem · 0.5rem · 0.75rem · 1rem · 1.5rem · 9999px`. Cards are `rounded-2xl`
(1rem), tiles and icon wells `rounded-lg`/`rounded-xl`, buttons and chips are
pills. There is no bespoke squircle.

---

## 6. Layout

```css
.container-x { margin-inline: auto; max-width: 80rem; }   /* 1280px */
```

Gutters are applied separately: `px-5 sm:px-8 lg:px-12`.

**SCT folds both into one `shell` utility**, because the reference's split is
the reason its own header and footer ended up misaligned with its page bodies —
a container without gutters invites someone to forget them.

### Vertical rhythm

`py-10 lg:py-14` — 40px to 56px. **This is very tight for a marketing page and
it is the point:** a long page of closely-set sections reads as one document.

SCT runs `clamp(3.5rem, 2.6rem + 3.6vw, 5.5rem)` — 56px to 88px. One notch more
generous, because SCT's sections carry prose where the reference's carry data
tables, but still far tighter than a typical marketing site.

### Grounds

Sections alternate with near-invisible gradients rather than flat colour swaps:

```html
<section class="py-10 lg:py-14 bg-gradient-to-b from-canvas-50 to-white">
<section class="py-10 lg:py-14 bg-gradient-to-b from-white to-canvas-50">
```

The gradient produces a *seam* between sections without a rule or a colour
change a reader consciously notices. SCT ships these as `ground-canvas` and
`ground-canvas-down`, plus `ground-forest` / `ground-forest-deep` for the two
dark bands.

### Grids

`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3` — up to four columns,
and a **12px gutter**. Tight grids of small cards, not three big ones.

---

## 7. Motion — three keyframes

```css
@keyframes float   { 0%,to { transform: translateY(0) }  50% { transform: translateY(-8px) } }
@keyframes marquee { 0%    { transform: translate(0)   }  to { transform: translate(-50%)  } }
@keyframes pulse   { 50%   { opacity: .5 } }
```

That is the complete motion system. Everything is ambient; nothing animates to
tell a story, and nothing has to finish before the page can be read.

Hover states are `transition-colors` and `duration-700 group-hover:scale-105` on
photographs. There are no hover lifts larger than a couple of pixels.

The one idea worth keeping from Sumago is **per-instance duration via a custom
property** (`animation: marquee var(--dur) linear infinite`), so two marquees on
one page never march in step. SCT uses it on the dosage tickers.

---

## 8. Component anatomy, verbatim

Pulled from the bundle's most-repeated class strings.

**Eyebrow**
```html
<p class="text-[11px] uppercase tracking-[0.25em] text-harvest-400 mb-2 font-medium">
```

**Form field**
```html
<input class="w-full bg-white border border-ink-200 rounded-full pl-10 pr-4 py-2.5
              text-sm shadow-sm transition
              focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/15">
```
A soft ring on focus, not a colour swap alone.

**Primary button**
```html
<a class="flex items-center justify-center gap-2 rounded-full
          bg-forest-800 hover:bg-forest-700 text-white
          px-4 py-3 text-sm font-semibold transition-colors shadow-glow-green">
```
Note `forest-800`, not 600 — the primary action is *deep*, not bright.

**List row**
```html
<li class="px-5 py-4 flex items-start gap-3 hover:bg-forest-50/50 transition-colors">
```

**Numbered marker** — small, inline, gold; never a large ghost numeral behind
the text:
```html
<span class="mt-0.5 h-7 w-7 rounded-full bg-harvest-100 border border-harvest-200
             text-harvest-800 text-xs font-bold flex items-center justify-center shrink-0">
```

**Figures** carry `tabular-nums` everywhere — rates, counts, dates, phone
numbers. A column of numbers must not jitter.

---

## 9. What SCT took, and what it deliberately did not

| Taken | Why |
|---|---|
| The three-family palette, ramps and all | Right temperament, and it is genuinely green |
| Fraunces + Inter + Tiro Devanagari | The serif pairing is the identity; SCT is trilingual |
| Gold rule under every heading | The strongest tying device on the reference |
| Border-first cards, two soft shadows | Reads as a document, not as floating panels |
| Tight alternating grounds | Gives a 9,700px home page chapters |
| Three keyframes, nothing more | The brief said simple and professional |
| Grain overlay | Keeps dark bands from looking like flat digital colour |
| `tabular-nums` discipline | SCT's catalogue is full of dosages and pack sizes |
| Dashed empty state | SCT has real gaps awaiting client data |

| Not taken | Why |
|---|---|
| 14px body | 15px for phone reading in a field |
| `py-10` rhythm | SCT's sections are prose, not data tables; 56–88px |
| Split `container-x` + gutters | Caused the alignment bug it was meant to prevent |
| Dense four-column data grids everywhere | SCT has 21 products, not 200 commodity rates |

### And what was removed from the previous SCT design

Six accent hues in the benefits grid; a third typeface (Caveat) for handwritten
margin notes; nine `fx-*` background layers; blurred drifting orbs; the
`text-shine` gradient heading sweep; ghost numerals; hover lifts of 4px; a
transparent header that faded in over a dark hero; a ~100px logo that set the
header's height; and a dark slab at the top of every inner page.

None of it was bad work. All of it was the previous reference's temperament,
and none of it survives contact with "simple, clean and professional".
