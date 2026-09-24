# SCT Redesign — UI/UX Audit

**Target:** local `redesign` branch (`D:\soil`), React 19 + Vite 6 + Tailwind 4 + framer-motion + Lenis.
**Date:** 2026-09-24. **Reviewed:** all 15 routes, 13 home sections, 6 forms, design tokens, built bundle, static assets.
**Method:** source inspection + built-bundle measurement + computed WCAG ratios. Every claim below cites a file or a number.

> This audit is deliberately hard on a good build. The codebase is well above the norm for this sector, so the findings are mostly *specific and fixable*, not structural. Section 1 says what's working before it says what isn't.

---

## Status — remediation applied 2026-09-24

The findings below are kept as written, because the reasoning is the useful part. This table records what has since been fixed in the branch.

**Sample/placeholder data was deliberately left in place** at the client's instruction — the two sample testimonials, the provisional product entries and the placeholder image credits all stay until the content is made dynamic. Findings #7 and #32 are therefore open by decision, not oversight.

| # | Finding | Status | Where |
|---|---|---|---|
| 1 | Deep links 404 — no SPA fallback | **Fixed** | `public/_redirects`, `public/.htaccess`, `vercel.json` |
| 2 | Link previews broken; no per-route metadata | **Fixed** | `routeShells()` in `vite.config.ts` + `src/lib/routes.ts` — 59 static shells with real `<title>`/OG/canonical |
| 2b | First paint still blank until JS runs | **Open** | Needs real SSG; blocker documented below |
| 3 | Primary button 3.57:1, hover dropped to 3.38:1 | **Fixed** | `brand-700` resting / `brand-800` hover, applied at all 14 inline call sites too |
| 4 | `PHONE_PATTERN` an invalid regex — validation dead | **Fixed** | `form-submit.ts` — now `/…/.source` off a literal |
| 5 | Forms capture nothing | **Open** | Needs a POST endpoint; `deliver()` is still the single seam |
| 6 | framer-motion ignored `prefers-reduced-motion` | **Fixed** | `<MotionConfig reducedMotion="user">` in `App.tsx` |
| 7 | Sample testimonials indistinguishable from real | **Open — by client decision** | Left as-is pending dynamic content |
| 8 | ISO 9001:2008 withdrawn 2018 | **Open — needs client input** | Requires the current certificate |
| 9 | Video band above hero; `h2` before `h1` | **Fixed** | `HomePage.tsx` reordered; `Hero` now owns header clearance; video band `min-h` 34rem → 28rem and its header scrim removed |
| 10 | Dosage marquee — WCAG 2.2.2 failure | **Fixed** | `CategoryCard.tsx` — first line static + "+N more"; marquee CSS deleted |
| 11 | 26 MB images, `srcSet` on product packs only | **Fixed** | `scripts/optimise-images.mjs` + `image-manifest.ts`; `Image` shim now builds `srcSet` automatically. Hero on mobile 925 KB → 59 KB |
| 12 | `hairline` 1.23:1 on every control border | **Fixed** | New `--color-hairline-strong` #8a918c (3.23:1) on all form controls |
| 13 | `sr-only` inputs had invisible focus | **Fixed** | `has-[:focus-visible]` ring on the checkbox and file labels |
| 14 | No crop→product path | **Open** | Feature work; `applications.ts` already holds the data |
| 15 | Contact form failed silently on blocked popup | **Fixed** | Routed through `deliver()` + `SuccessPanel` |
| 16 | Testimonials Marathi-only | **Open — by client decision** | Tied to the testimonial content work |
| 17 | Distributor application labelled "Careers" | **Open** | Naming decision for the client |
| 18 | No analytics | **Fixed (needs an account)** | `src/lib/analytics.ts` + events on forms, language, and delegated `tel:`/`wa.me` tracking. Inert until `VITE_ANALYTICS_DOMAIN` is set |
| 19 | No `robots.txt` / `sitemap.xml` | **Fixed** | `seoFiles()` in `vite.config.ts` — 59 URLs, generated from route data |
| 20 | Video fetched on iOS/Firefox regardless of line | **Fixed** | `LoopingVideo.tsx` — viewport-width ceiling when `effectiveType` is absent |
| 21 | `text-shine` invisible in forced-colors | **Fixed** | `@media (forced-colors: active)` fallback |
| 22 | Gallery tablist had no arrow keys | **Fixed** | Arrow/Home/End + roving tabindex + focusable panel |
| 23 | Hints unassociated; errors colour-only | **Fixed** | `aria-describedby`, `aria-invalid`, and a text error with an icon |
| 24 | `animations.ts` dead; `Reveal` broke its own rule | **Fixed** | File and `RevealGroup` deleted; `viewport.amount` → `"some"` |
| 25 | `/careers#internship` didn't scroll to the form | **Fixed** | `ScrollToTop.tsx` now resolves hash targets with header offset |
| 26 | `/contact` re-implemented form fields | **Fixed** | Migrated onto `fields.tsx` |
| 27 | `ink-400` 3.43:1; `ink-300` placeholders 2.50:1 | **Fixed** | `ink-400` darkened to #66716a (4.57–5.08:1); placeholders moved to `ink-400` |
| 28 | Two adjacent `tint` sections on `/contact` | **Fixed** | FAQ band → `light` |
| 29 | Footer emitted six `<h2>` per page | **Fixed** | Demoted to `<h3>` |
| 30 | Google Translate loads for every visitor | **Open** | Deferring it needs a UX decision about the switcher |
| 31 | Five animated `fx` layers per dark section | **Open** | Needs a per-page judgement call |
| 32 | Whole catalogue reads "provisional" | **Open — by client decision** | Left as-is pending dynamic content |
| 33 | Lenis costs a library + four workarounds | **Open** | Removal is a taste decision |
| 34 | Nine ad-hoc body text sizes | **Partly fixed** | `text-body`/`text-body-sm`/`text-caption` added; migration of existing call sites pending |
| 35–38 | Positional pillar arrays, dead code, FAQ `aria-controls`, hidden hero ISO seal | **Fixed** except #35 | Seal now shows at all widths; `aria-controls` wired; dead code removed |

**Also added:** the header now carries a call button at every width (there was no visible action on a phone), and the build prunes 22.2 MB of now-unreferenced original JPEG/PNG from `dist`.

### Colour audit — section by section, measured (added 2026-09-24)

98 real foreground/background pairings were enumerated across every page and section — each text colour against the surface it actually sits on, taking the *worst* point of each gradient ground and accounting for `Card tone="glass"` lightening the ground beneath it. 18 failed. All are now fixed, and they came from four root causes rather than eighteen separate mistakes:

| Root cause | Sections affected | Fix |
|---|---|---|
| The forest gradient ended too bright (`#14512f`), and `glass` cards lift it another step before text is drawn. Eyebrows and body copy landed at 4.06–4.41:1 | Pillars, Products, ContactCta, About Journey, Technology Science | Gradient now ends `#123f26` — **one value**, all of them 5.05–5.46:1. Rejected the alternatives: dropping glass to 2% alpha erases the effect, and bumping four text tokens only inside cards would mean the same element using different tokens depending on its container |
| The `600` step used for small bold labels on white (3.19–4.10:1) | Benefits card numbers ×6, WhySct stat labels | Moved to the `700` step (5.02–6.32:1) |
| Marginal opacity choices | Hero proof labels `sage-300/75`, ContactCta primary body `brand-50/90` | Raised to `/90` and full opacity |
| Decorative glyph almost invisible | Proof quote mark | `brand-200` → `brand-300` (still `aria-hidden`; exempt under 1.4.11, changed for visibility not compliance) |

**Result: 97/98 pass.** The one remaining is the decorative quote watermark at 1.83:1, which is `aria-hidden` ornament and explicitly exempt.

### Colour theory for *this* audience

Two things a standard WCAG pass does not cover, both of which matter more here than compliance does:

**1. Red–green colour blindness.** ~8% of men have it, and this audience is overwhelmingly male. The site is built almost entirely on green with saffron and earth accents — precisely the axis that collapses. Simulated with Machado severity-1.0 matrices for deuteranopia and protanopia:

| Pairing | Normal | Deuter | Protan | Verdict |
|---|---|---|---|---|
| Vedic vs Super range eyebrow (*was* leaf-400 / saffron-300) | 25.3 | **2.3** | 8.1 | **Collapsed** — the two ranges were the same colour |
| → now leaf-400 / saffron-100 | 33.2 | 25.4 | 26.4 | **Fixed** — distinction now carried by lightness, not hue |
| Method vs Rule rail | 50.3 | 16.7 | 9.1 | Weak, but each card also has a number, a name and a distinct icon |
| Vedic vs Super badge | 32.4 | 13.1 | 20.6 | Weak, but the badge prints the range name as text |
| Success vs error | 36.8 | 10.6 | 16.6 | Weak, but errors now carry an icon and a text message |

The site does **not** fail WCAG 1.4.1 — every colour code has a text or shape companion. But the range eyebrow was the one place where colour was doing real work at a glance, and it was invisible to those readers. That one is fixed; the rest are noted as redundant encodings, which is the correct standard.

**2. Sunlight and mid-range Android screens.** AA's 4.5:1 is a floor for a screen indoors. A phone in a field loses apparent contrast, so 7:1 (AAA) is the realistic bar for anything read rather than glanced at. Body copy sat at 5.42:1 — passing, but thin for the actual use context.

The `ink` scale was retuned rather than rewritten at ~50 call sites:

| Token | Was | Now | Worst-case ratio | Role |
|---|---|---|---|---|
| `ink-300` | `#9aa79e` | unchanged | 2.25:1 | **non-text only** |
| `ink-400` | `#7c8a81` → `#66716a` | `#56645a` | 5.62:1 | hints, captions |
| `ink-500` | `#5b6a60` | `#47534b` | **7.25:1** | body copy — now AAA |
| `ink-600` | `#3f4e45` | `#37403a` | 9.66:1 | emphasis, header nav |

Body copy is now **7.65:1 on sage-50 and 8.06:1 on white**, up from 5.42/5.71. This is a deliberate, visible shift to darker text across the whole site — worth flagging as a design change, not just a compliance one.

Still below 7:1 and worth a future look: the primary button (5.41:1), the dosage chip (5.05:1), and quiet text on the dark grounds (6.05–6.40:1). All pass AA comfortably; none are long-form reading.

**The blocker for real prerendering**, for whoever picks it up: `<Reveal>` sets `initial="hidden"`, so a naive `renderToString` emits every section at `opacity: 0` and the static HTML is invisible without JS. That needs `MotionConfig isStatic` at render time, or a static-render branch in `Reveal`, before SSG is worth wiring up.

Verification: `npm run build` is clean, `tsc --noEmit` passes, all 11 top-level routes serve 200 from the built output, and every changed colour pair was re-measured against its WCAG threshold (all pass).

---

## 1. Executive Summary

### Overall UX quality — strong, with two structural holes

The information architecture is genuinely well-reasoned. Navigation was cut from eleven top-level items to seven ([navigation.ts:18-42](../src/data/navigation.ts#L18-L42)), the homepage is ordered around the questions a visitor actually asks in sequence ([HomePage.tsx:19-33](../src/pages/HomePage.tsx#L19-L33)), and the product tree is three honest levels (range → category → pack) with inherited content repeated rather than linked away from ([ProductDetailPage.tsx:17-25](../src/pages/ProductDetailPage.tsx#L17-L25)).

The two holes are both invisible in a desktop browser on a fast connection:

1. **No form on this site captures anything.** All six compose a string and hand it to `mailto:` or `wa.me` ([form-submit.ts:1-30](../src/lib/form-submit.ts#L1-L30)). The 26-field distributor application ends in a `mailto:` body that can exceed the ~2,000-character ceiling some mail clients truncate at — a limit the file documents itself — and cannot attach the resume the applicant just picked.
2. **No deep link survives a page refresh** on the current build output. `dist/` contains no `_redirects`, `vercel.json`, `.htaccess` or `404.html`. Every `/products/root-charger` URL — exactly the ones the site is designed to have shared over WhatsApp — hard-404s on a static host.

### Overall UI quality — excellent, with one systemic accessibility fault

The design system is disciplined in a way most agency work is not: four grounds that alternate to chapter the page, one `Reveal` animation, one card shell, three button variants, a fluid type scale with no breakpoint jumps ([globals.css:180-220](../src/styles/globals.css#L180-L220)). Palette is sampled from the client's actual logo file and documented as such.

But the primary brand green fails contrast for the element it is used on most:

| Token | Hex | White text on it | WCAG AA (4.5:1) |
|---|---|---|---|
| `brand-400` | `#43b87a` | 2.51:1 | ✗ |
| `brand-500` (hover state) | `#16a05c` | 3.38:1 | ✗ |
| **`brand-600` (every primary button)** | `#009c54` | **3.57:1** | **✗** |
| `brand-700` | `#077a45` | 5.41:1 | ✓ |
| `brand-800` | `#095f39` | 7.76:1 | ✓ |

The comment at [globals.css:44](../src/styles/globals.css#L44) — *"500 and below clear WCAG AA for white text at button sizes"* — is inverted. Only 700 and darker pass. Button labels are `0.9–0.95rem` bold (≈14.4–15.2px), which is **not** WCAG "large text" (that starts at 18.66px bold), so 4.5:1 applies. And because hover moves 600 → 500, **every primary CTA on the site gets less readable when you hover it.**

### First impression — strong, but aimed at the wrong first frame

The opening moment is a full-bleed looping field video with an `<h2>`, a lead line, and a **"See our fields on YouTube"** button ([FieldVideo.tsx:69-84](../src/components/home/FieldVideo.tsx#L69-L84)). It renders *before* the hero ([HomePage.tsx:75-76](../src/pages/HomePage.tsx#L75-L76)) and is floored at `min-h-[34rem]` on mobile.

So on a phone the first thing a visitor can act on is a link **off the site**, and the actual `<h1>`, value proposition, and both primary CTAs sit below the fold. The DOM also runs `<h2>` before `<h1>`.

### Does it feel modern in 2026 — yes, genuinely

Fluid clamp-based type, tight negative tracking on display/wide positive on eyebrows, editorial asymmetric grids, alternating dark/light grounds, restrained motion with named easing tokens, glass only on dark grounds. This is current work, not trend-chasing. The one thing dating it is not visual — it is that a 2026 site for a rural-mobile audience is expected to ship server-rendered HTML.

### Professional and trustworthy — yes, and unusually honest

The content provenance discipline is the strongest trust asset here and should be protected. Fabricated testimonials with invented yield figures were **removed** and the removal documented ([testimonials.ts:12-17](../src/data/testimonials.ts#L12-L17)). Product structured data omits price and availability because SCT publishes neither ([CategoryPage.tsx:44-45](../src/pages/CategoryPage.tsx#L44-L45)). A truncated source sentence was dropped rather than completed on the client's behalf ([IsoCertification.tsx:30-37](../src/components/common/IsoCertification.tsx#L30-L37)).

Two things undercut it:
- Two **sample testimonials still render identically to the two real ones** — the "Sample" chip was removed at client request, and the only remaining guard is a code comment ([testimonials.ts:80-95](../src/data/testimonials.ts#L80-L95)).
- The only third-party credential shown is **ISO 9001:2008**, a standard withdrawn in 2018. Displaying a superseded revision to a skeptical buyer is worse than showing the current one.

### Can a new user understand it quickly — yes in English, no in Marathi

Both hero and video band name the category outright ("Organic soil inputs · Nashik · since 2015", "Twenty-one organic inputs"). That's better than most competitors.

But the audience is Marathi-speaking farmers, and **the site is authored in English with Google Translate bolted on** ([LanguageSwitcher.tsx:22-26](../src/components/layout/LanguageSwitcher.tsx#L22-L26), which says so honestly). Machine-translated agronomy — dosage, application timing, crop protection instructions — is a correctness risk, not just a polish one. Switching language also triggers `window.location.reload()` on a client-rendered SPA: a full re-download and re-parse.

### Major strengths

- IA reasoning, and the fact that every decision is documented with its rationale
- Content provenance and the refusal to invent numbers
- A real, small, coherent design system
- Modal accessibility done properly: portal out of stacking contexts, focus trap, focus restore, scroll lock that accounts for Lenis ([FormModal.tsx:28-50](../src/components/forms/FormModal.tsx#L28-L50))
- Video gated on Save-Data / reduced-motion / connection, poster-first ([LoopingVideo.tsx:12-22](../src/components/common/LoopingVideo.tsx#L12-L22))
- Dead-YouTube-thumbnail detection by response width ([VideoGrid.tsx:25-37](../src/components/gallery/VideoGrid.tsx#L25-L37))
- Alt-text discipline: decorative images correctly `alt=""`, stretched links carry `sr-only` names

### Major weaknesses

- Forms capture nothing; phone validation is silently dead (§4, §8)
- Primary CTA colour fails AA; hover makes it worse
- `prefers-reduced-motion` is bypassed by every framer-motion animation on the site
- Client-rendered SPA + no deep-link fallback + 26 MB of unoptimised imagery, for an audience on rural mobile data
- IA is organised by the company's mental model (product range), not the farmer's (crop / problem)
- No analytics, so none of the above is measurable

### Most important improvements

1. Ship an SPA fallback + prerender the 40-odd static routes
2. Darken the primary button to `brand-700`; invert the hover direction
3. Fix `PHONE_PATTERN` (currently an invalid regex — validation does nothing)
4. Put a real POST endpoint behind `deliver()`
5. Add `<MotionConfig reducedMotion="user">`
6. Move `<Hero>` above `<FieldVideo>`
7. Compress imagery and generate `srcSet` for more than just product packs

---

## 2. First-Time User Analysis

*Persona used for the walkthrough: a grape grower near Niphad, on an Android phone, 3G, arriving from a WhatsApp forward. Secondary persona: a would-be district distributor on a laptop.*

### What I understand in the first 5 seconds

**On desktop:** a lot, and fast. Green, agricultural, Indian, "Feed the soil. The crop follows.", 21 products, ISO badge, Nashik, since 2015. Category is unambiguous within two seconds.

**On a phone:** considerably less. A video fills the screen. I read "13 years of the same work — putting the life back into the soil" and "No chemical fertiliser. No chemical crop protection. Twenty-one organic inputs, one job." That is *good* copy — but there is no product, no price signal, no way in, and the one button sends me to YouTube. I must scroll a full screen before I meet the actual proposition.

**On a phone with JavaScript still loading:** nothing. The document is `<div id="root"></div>` ([index.html:27](../index.html#L27)). Approximately 191 KB gzipped of JS and CSS must download and execute before any pixel appears. On 3G that is measured in seconds of white screen.

### Is the purpose clear? — Yes
"Organic soil inputs" appears in the hero badge and the body copy. Better than most of the sector, which leads with a feeling.

### Is the target audience clear? — Yes for farmers, ambiguous for everyone else
Copy addresses "your field", "your crop", "the mandi". A distributor, an exporter, or an institutional buyer has to hunt: the distributor path is the third card in the homepage CTA block, and Export only appears on `/products` and `/contact`.

### Is the value proposition understandable? — Yes, and it is well argued
The Problem → Pillars → Method sequence is the strongest part of this site. Leading with ten verbatim farmer complaints before naming any product ([Problem.tsx:20-42](../src/components/home/Problem.tsx#L20-L42)) is a real differentiator, and the code notes correctly that no Maharashtra competitor does it.

### Can I identify what to do next? — Yes, but the hierarchy fights itself

On the homepage alone a visitor is offered: YouTube ↗, See the 21 products, Talk to an expert (phone), See the full method, View all 21 categories, Explore the Vedic range, Explore the Super range, Read the full story, See how the method works, Watch on the SCT channel ↗, Add your testimonial, See the full gallery, Call, WhatsApp, Become a distributor. **Fifteen actions, three of which leave the site.** Two of the three offsite links (YouTube) appear before the product section.

### Is the primary CTA obvious? — Partially
`shadow-brand-glow` + solid green marks the primary variant consistently. But the header CTA is "Talk to an expert" while the hero CTA is "See the 21 products" — two different primary intentions competing in the same viewport. And the header CTA is `hidden lg:block` ([Header.tsx:139](../src/components/layout/Header.tsx#L139)), so on a phone the persistent CTA is a hamburger.

### Unnecessary distractions
- The auto-scrolling dosage marquee on every category card ([CategoryCard.tsx:60-70](../src/components/products/CategoryCard.tsx#L60-L70)). Dosage is reference information; making it move means it can never be read at a glance, which was the stated reason for putting it there.
- Five simultaneously animating background layers on every dark section (`fx-mesh` 19s, `fx-streaks` 16s, `fx-dots` 9s, two drifting blurred orbs at 23s/29s). With `Section fx` used across 35 ground declarations, several of these are on screen at once.

### Is navigation understandable? — Yes
Seven flat items, no dropdowns, active state marked with both colour and an underline rule, mobile drawer carries a one-line hint per destination ([Header.tsx:180-188](../src/components/layout/Header.tsx#L180-L188)). This is a real improvement over the old eleven-item four-dropdown bar.

One naming problem: **"Careers"** holds the distributor application. A shopkeeper wanting to stock the range will not look under Careers. The code acknowledges the tension ([navigation.ts:20-25](../src/data/navigation.ts#L20-L25)) but resolves it the wrong way — it optimised for the *form's* location rather than the *user's* label.

### Do section transitions make sense? — Yes, with one gap
The alternating grounds do real work. The gap: `/contact` places two consecutive `ground="tint"` sections ([ContactPage.tsx:356](../src/pages/ContactPage.tsx#L356), [ContactPage.tsx:412](../src/pages/ContactPage.tsx#L412)), so the forms band and the FAQ read as one undifferentiated block.

### Where I would feel confused

1. **The testimonials.** The single most important trust section renders in Devanagari only. An English gloss exists in the data and is *deliberately not rendered* ([Proof.tsx:19-23](../src/components/home/Proof.tsx#L19-L23)). The reasoning — a subtitle reads as condescension — is a legitimate design argument, but the consequence is that an English-reading distributor, exporter or investor sees two unreadable blocks where the proof should be. Google Translate will not help: the page is already in their language.
2. **"Two ranges"** — Vedic vs Super. The cards describe each, but nothing tells me *which one I need*, which is the only question I have.
3. **"100% SCT user"** — introduced in the Method section as though I already know it.
4. **Provisional product notices.** "generated from SCT's published pack sizes and are marked as awaiting confirmation" ([ProductsPage.tsx:140-146](../src/pages/ProductsPage.tsx#L140-L146)) is honest internally but reads, to a buyer, as "we are not sure what we sell."

### Where I would leave
- **White screen on 3G** — before I see anything at all.
- **The video band** — the first actionable thing sends me to YouTube, and YouTube is an attention sink.
- **Any deep link, on refresh or from a WhatsApp forward** — 404, on the current build config.
- **The distributor form** — 26 fields and six uploads, ending in a mail client that may truncate it and cannot carry the attachments.

### Does the site build trust progressively? — Yes, and this is a real strength

Problem (recognition) → Pillars (a coherent idea) → Method (a system) → Products → Benefits → Why SCT (four checkable facts) → Farmer voices → Gallery → ISO → Contact. The order is right.

The weak rungs are all at the *evidence* end: two real testimonials plus two samples indistinguishable from them, zero trial data (correctly flagged at [Benefits.tsx:15-19](../src/components/home/Benefits.tsx#L15-L19)), a withdrawn ISO revision, and a "50,000+ farmers reached" figure marked `verified: true` in [site.ts:119-125](../src/data/site.ts#L119-L125) despite the file header describing it as an estimate standing in until SCT confirms — the two contradict each other.

### Questions a new visitor asks that the site does not answer

| Question | Answered? |
|---|---|
| What does it cost? | No — nowhere on the site |
| Where do I buy it? | Partially — "distributors exist", no locator, no list |
| How long until I see a change? | No |
| Will it work on *my* crop? | No — `applications.ts` holds crop data but nothing surfaces a crop→product path |
| Is it safe alongside what I already use? | No |
| What if it doesn't work? | No |
| Is this organic-certified for export? | No — ISO 9001 is a quality-management standard, not an organic certification, and the site does not distinguish them |

### New User Journey — friction at every stage

| Stage | What works | Friction | Severity |
|---|---|---|---|
| **Landing** | Category named in ≤2s; strong opening copy | Blank until JS executes; video band pushes H1/CTA below fold on mobile; first CTA is offsite | Critical |
| **Understanding** | Problem→Pillars→Method is genuinely persuasive | Vedic vs Super unresolved; "100% SCT" undefined; no crop entry point | High |
| **Exploring** | 3-level product tree; dosage before the click | Moving marquee makes dosage unreadable; no search; no crop filter; "provisional" notices undermine the catalogue | High |
| **Trust building** | Honest provenance; founder's letter; ISO band | 2 real + 2 indistinguishable sample quotes; Marathi-only; no trial data; withdrawn ISO revision; stat contradicts its own source note | Critical |
| **Decision** | Three clearly differentiated doors; phone-first is right for this audience | No price, no dealer locator, no timeline, no risk reduction | High |
| **Action** | Phone/WhatsApp lead — correct channel choice | Forms capture nothing; phone validation dead; contact form fails silently if popup blocked; attachments impossible | Critical |

---

## 3. 2026 Trend Analysis — what is earned, what is missing, what to skip

| Standard | State | Verdict |
|---|---|---|
| Modern visual hierarchy | Fluid clamp scale, `text-wrap: balance` on headings, `pretty` on paragraphs | **Earned.** Better than most. |
| Editorial layouts | Asymmetric grids (`0.92fr/1.08fr`), sticky figure columns | **Earned.** |
| Intentional whitespace | One `section-y` token, 4.5/6/7rem | **Earned.** |
| Modern typography | Plus Jakarta Sans / Inter, `-0.032em` display tracking vs `0.15em` eyebrows | **Earned.** The x-height rationale for Devanagari is correct. |
| Variable typography | Not used — static weights loaded | **Skip.** Four static weights load faster than a variable axis here. Correct call. |
| Bento / grid layouts | Conventional card grids | **Optional.** A bento would suit the Benefits six-up, but conventional grids scan better for an audience that is not design-literate. Leave it. |
| Modern card design | One `Card` shell, glass on dark, negative-spread shadows | **Earned.** The negative spread is a good detail. |
| Subtle gradients | Ground gradients, `fx-mesh` alpha-only textures | **Earned.** |
| Modern colour system | Logo-sampled, 6 families, documented provenance | **Earned but broken at AA** — see §4. |
| Glass effects | Only on dark grounds, where they read | **Earned.** Correctly restrained. |
| Micro-interactions | `-translate-y-0.5/1` lifts, icon scale, arrow nudge, ghost numbers | **Earned**, but all gated behind `motion-safe:` which — see below — does not actually gate the JS animations. |
| Motion & animation | One `Reveal`; named easing tokens | **Earned in CSS, broken in JS.** |
| Scroll interactions | Lenis smooth scroll, `whileInView` reveals | **Mostly earned.** Lenis is a real cost (5.6 KB gz + rAF loop) for a taste preference; it also forced bespoke workarounds in four files (`data-lenis-prevent`, `scroll-lock.ts`, instant-scroll in `ShowMore`/`ScrollToTop`). **Recommend dropping it** — native `scroll-behavior: smooth` is already set and costs nothing. |
| Hover states | Consistent, three-property | **Earned.** But hover is meaningless on the primary device — several affordances (marquee pause, photo grid expand icon, scrim) are hover-only. |
| Progressive disclosure | FAQ accordion, gallery show-more, careers track switcher | **Earned.** |
| Personalisation | None | **Skip** — no account layer, no value here. |
| AI-era UX patterns | None | **Worth one exception.** A "which product for my crop?" guided picker is not AI theatre — it is the single highest-value missing path, and `applications.ts` already holds the data. |
| Accessibility-first | Skip link, focus-visible ring, alt discipline, ARIA on modals, 3-level reduced-motion *contract* | **Partly earned — see §9.** The contract does not hold. |
| Responsive-first | Fluid type, `min-w-0` discipline, `dvh`, documented aspect-ratio switches | **Earned.** |
| Mobile-first thinking | Present in the CSS, contradicted by the homepage order and the asset budget | **Not earned.** |
| Reduced cognitive load | 7 nav items (from 11); one card shell | **Earned**, then undone by 15 homepage CTAs. |
| Clear CTA hierarchy | Three variants consistently applied | **Partly** — header and hero compete. |
| Modern navigation | Sticky, transparent-over-hero, backdrop blur, solid on scroll | **Earned.** |
| Trust-building patterns | Provenance discipline, founder's letter | **Earned in method, thin in evidence.** |
| Social proof | 2 real testimonials + 2 samples; no client logos; no case studies; no trial data | **Weakest dimension on the site.** |
| Scannable content | Eyebrow/heading/lead everywhere; bullets over paragraphs | **Earned.** |
| Modern forms | Shared primitives, native validation, touched-state errors | **Partly** — see §4 and §9. |
| Error prevention & feedback | `data-touched` is a good pattern | **Broken** — validation regex is invalid; errors are colour-only; contact form fails silently. |
| Performance-conscious design | Route splitting, vendor chunks, idle video, thumbnail-only video grid, hand-built lightbox over a 40–60 KB library | **Genuinely good engineering, defeated by 26 MB of images and a CSR shell.** |

---

## 4. Visual Design Audit

### Typography — the strongest dimension

| Aspect | Assessment |
|---|---|
| Font choice | Plus Jakarta Sans (display) / Inter (body) / Caveat (decoration only). Well-chosen; the Devanagari x-height argument at [index.html:10-16](../index.html#L10-L16) is sound. |
| Pairing | Geometric display against neutral grotesque body — correct contrast without clash. |
| Hierarchy | Five tokens (`text-display`/`h1`/`h2`/`h3`/`lead`) + `text-eyebrow`. Tight. |
| Heading sizes | `clamp(2.5rem, 1.3rem + 4.8vw, 4.9rem)` display. Fluid, no breakpoint jumps. |
| Body readability | `text-lead` at `line-height: 1.68`; body at 1.6–1.78. Comfortable. |
| Letter spacing | `-0.038em` display / `-0.022em` h3 / `+0.15em` eyebrow. This contrast is most of what makes the page read as current. |
| Text density | Well managed — `max-w-2xl` on leads, `max-w-xl` on hero copy. |
| Consistency | Strong, **except** many components bypass the scale with arbitrary values: `text-[0.88rem]`, `text-[0.92rem]`, `text-[0.86rem]`, `text-[0.84rem]`, `text-[0.9rem]`, `text-[0.94rem]`, `text-[0.95rem]`, `text-[0.98rem]`, `text-[1.02rem]`. **Nine ad-hoc body sizes** where the system defines one. This is the main drift risk in the type system. |
| Mobile typography | Good. Fluid scale means no stepping. |

**Fix:** add `text-body`, `text-body-sm`, `text-caption` tokens and migrate the nine arbitrary values onto them.

### Colour

Palette provenance is documented and sampled from the logo — good practice. Ground system (light/tint/forest/soil/night) gives the page real rhythm.

**Computed contrast (sRGB, WCAG 2.x):**

| Usage | Ratio | AA normal | Note |
|---|---|---|---|
| White on `brand-600` — **every primary button** | **3.57:1** | ✗ | Button text is ~15px bold = normal text |
| White on `brand-500` — **primary button hover** | **3.38:1** | ✗ | Hover makes it *worse* |
| `ink-400` on `sage-50` — hints, small labels, captions | 3.43:1 | ✗ | |
| `ink-400` on `sage-100` (tint ground) | 3.25:1 | ✗ | |
| `ink-300` on white — input placeholders, empty select | 2.50:1 | ✗ | Fails even large-text |
| `saffron-600` on white — required asterisk | 3.72:1 | ✗ | `aria-hidden`, so impact is visual only |
| `hairline` `#dfeae2` on white — **every input and card border** | **1.23:1** | ✗ (1.4.11 needs 3:1) | Control boundaries are effectively invisible |
| `ink-300` checkbox border on white | 2.50:1 | ✗ (1.4.11) | |
| `ink-500` body copy on `sage-50` | 5.42:1 | ✓ | |
| `brand-700` eyebrows/links on `sage-50` | 5.14:1 | ✓ | |
| `leaf-400` on forest (bright end `#14512f`) | 5.08:1 | ✓ | Checked at the *worst* point of the gradient |
| `sage-300/85` lead on forest (bright end) | 5.15:1 | ✓ | |
| `sage-400` footnotes on forest (bright end) | 4.75:1 | ✓ | |
| All footer `bone-200` tiers on night | 5.71–9.44:1 | ✓ | |
| `lime-400` footer links on night | 9.42:1 | ✓ | |
| `earth-50` complaint chips on soil | 15.84:1 | ✓ | |

**The dark grounds are all comfortably compliant** — that work was done carefully, including at the bright end of the gradients. The failures are concentrated in the light grounds and, critically, in the primary action colour.

**Fixes:**
- Primary button: background `brand-700` (5.41:1), hover `brand-800` (7.76:1). This inverts the hover direction so hover *increases* contrast. Keep `brand-600` for large display accents (`text-brand-600` on headings is large text and passes).
- Promote `ink-400` → `ink-500` for any text under 18.66px.
- Placeholders → `ink-400` minimum; better, replace placeholder-as-label with real hint text.
- Introduce `--color-hairline-strong: #b9cfc0` (≈3:1) for input and control borders; keep the current `hairline` for decorative card edges only.

Brand consistency, section differentiation and emotional register are all good. The saffron/earth accents are correctly kept out of large fields.

### Layout

| Aspect | Assessment |
|---|---|
| Grid | Single-owner gutter model — only `shell`/`shell-wide`/`shell-narrow` hold horizontal padding. Excellent; this is why there is no sideways scroll. |
| Container width | 82rem / 92rem / 48rem. Sensible. |
| Alignment | Consistent. |
| Spacing | One `section-y` token. Rhythm holds across the whole site. |
| Whitespace | Generous and intentional. |
| Visual rhythm | Ground alternation does real chaptering work. **One break:** `/contact` runs two adjacent `tint` sections. |
| Desktop | Strong. |
| Tablet | The weakest breakpoint. `Benefits` goes 1→2 cols at `md` and 3 at `xl`, so 1024–1279px shows a 2-up with a wide empty right margin. `Header` drops the phone link between `lg` and `xl` ([Header.tsx:124-131](../src/components/layout/Header.tsx#L124-L131)). |
| Mobile | Good CSS discipline, poor content prioritisation (video band first). |

**One latent hazard, self-documented:** `html { overflow-x: clip }` ([globals.css:130](../src/styles/globals.css#L130)). This is the correct choice over `hidden` (which breaks `position: sticky`), but it means any future overflow bug **fails silently** — no scrollbar, just clipped content. `CategoryCard` already hit this ([CategoryCard.tsx:29-38](../src/components/products/CategoryCard.tsx#L29-L38)). Add a dev-only outline check.

### Components

| Component | Working | Change |
|---|---|---|
| **Buttons** | 3 variants × 2 sizes, consistent radius/easing, `motion-safe` lifts | **Contrast fails AA; hover reduces it.** Also no `disabled` variant and no loading state — needed once forms POST. |
| **Cards** | One shell, `tone` + `lift` props, `h-full` discipline | Border at 1.23:1 — nearly invisible. `Benefits` bypasses the shell entirely with a bespoke `<article>`. |
| **Forms** | Shared primitives, native validation, `data-touched` errors, `useId` label binding | Phone regex invalid (§8); hints not linked via `aria-describedby`; errors colour-only; `sr-only` inputs kill the focus ring; **`/contact` rolls its own fields instead of using the primitives** ([ContactPage.tsx:141](../src/pages/ContactPage.tsx#L141)) |
| **Navigation** | 7 items, dual-encoded active state, hinted drawer | Header CTA hidden below `lg`; drawer `max-h` assumes the 5.25rem solid height but the bar is 6rem when transparent |
| **Dropdowns** | Language switcher is the best-built control on the site — roving focus, Home/End, Escape-to-trigger, scroll-into-view, `preventScroll` | Reloads the whole SPA on change |
| **Tabs** | Gallery switch: correct `role`/`aria-selected`/`aria-controls`, inactive panel unmounted | **No arrow-key navigation, no roving tabindex** — fails WAI-ARIA tab pattern. Panel not focusable. |
| **Accordions** | FAQ uses `<h3><button aria-expanded>` — correct structure | Missing `aria-controls`; panel toggled with `hidden` so no height transition |
| **Icons** | Lucide, consistently `aria-hidden`, consistent sizing | Tree-shaken per route — good |
| **Images** | Alt discipline is exemplary | `srcSet` only on product packs; 17 `sizes` props are inert without it; no width/height on `fill` images → CLS |
| **Badges** | Consistent pill treatment | — |
| **Testimonials** | Adaptive: 2 → side-by-side, 3+ → scroll-snap slider; channel card is a smart substitute for thin proof | Marathi-only; samples indistinguishable from real; slider not keyboard-operable; no live region |
| **Pricing** | None | Absent by choice (SCT publishes none) — but see §8 |
| **Tables** | Dosage rendered as `<dl>` with zebra rows | Good semantic choice |
| **Footer** | Contact block above link columns — right priority for this audience; no forms in it, with the reasoning documented | Six `<h2>` elements on every page compete with page section headings in the outline; social tiles at 40px (passes AA 2.5.8, below AAA 2.5.5) |
| **CTAs** | Consistent visual language | 15 on the homepage, 3 leaving the site |

---

## 5. Information Architecture & Content Structure

### What works

- **Seven flat top-level items**, down from eleven across four dropdowns. Correct for the audience.
- **Three-level product tree** — `/products` → `/products/:category` → `/products/:category/:product`. Category-level content (description, benefits, dosage) is repeated on the product page rather than linked away from, because someone arriving from a WhatsApp forward hasn't read the parent. Right call.
- **Footer catches what the header dropped** — Journey, Vision, Team, Farmer Stories, the three career forms, FAQs — with a documented rule that every footer link must resolve to a live route or id.
- **Deep-linkable filters** — `?range=vedic` with `replace: true` so filter clicks don't pollute history.
- **Careers deep links** — `#internship`/`#distributor`/`#employment` preselect their track.

### What does not

**1. The tree is organised by the company's mental model, not the farmer's.**
A farmer does not think "I need a Vedic-range soil charger." He thinks *"my pomegranate has this problem."* The site has crop data — [applications.ts](../src/data/applications.ts) with nine crops and matching photography — and **surfaces no crop→product path anywhere.** This is the single largest IA gap, and the asset to close it already exists.

**2. "Careers" holds the distributor application.**
A shopkeeper looking to stock the range will not open a Careers menu. [navigation.ts:20-25](../src/data/navigation.ts#L20-L25) chose this to keep three forms together; that optimises for the forms, not the user. **Rename to "Partner & Careers"**, or promote a `/distributors` route.

**3. No search.** 21 categories + ~30 packs + 24 photos + 51 videos + knowledge articles. [ProductsPage.tsx:36-38](../src/pages/ProductsPage.tsx#L36-L38) argues 21 items don't justify a search index — true for the *category grid*, false for the site.

**4. No breadcrumbs above product level.** `/products/:category/:product` has them; `/products/:category` has only a back-link; no `BreadcrumbList` JSON-LD anywhere.

**5. Knowledge Centre is a flat list.** No categories, tags, search or related-article links.

**6. The Gallery is an orphan.** 24 photographs and 51 films with no connection to the products or crops they show. Films of farmers are the strongest proof asset SCT owns — they should appear *on* product and crop pages, not only in an archive.

**7. Buried:** Vision & Mission, the journey timeline, and the four pillars are all reachable only by scrolling `/about` or `/technology`.

**8. Repetitive:** `<ContactCta />` (three cards, ~15 elements) renders at the foot of Home, Products, Category, ProductDetail, About, Technology, Knowledge, KnowledgeArticle and Gallery. Consistency is good; nine identical three-card blocks is filler. Consider a condensed one-line variant for inner pages.

### Verdict
The IA makes sense to a first-time visitor **who already knows they want soil inputs**. It does not serve a visitor who arrives with a crop problem — which is the majority of the intended audience.

---

## 6. Homepage Section-by-Section Audit

### 6.1 Header
- **Purpose:** identity, wayfinding, persistent action.
- **Working:** transparent over the dark hero → solid on scroll; 7 items; dual-encoded active state; language control at every width; drawer hints; `lockScroll` handles Lenis correctly.
- **Problems:** primary CTA `hidden lg:block` so phones get only a hamburger; phone link vanishes between `lg` and `xl`; header CTA ("Talk to an expert") competes with the hero CTA ("See the 21 products"); logo is ~100px tall, consuming a 5.25–7.25rem bar on a small screen.
- **New-user view:** clean and legible. On a phone, no visible way to act without opening a menu.
- **2026 recommendation:** add a compact icon-only call/WhatsApp button below `lg` so there is always one visible action. Reduce logo to ~64px on mobile. Align the header CTA with the hero's primary intent.
- **Priority: High**
- **Layout:** `[logo] [nav] [lang] [phone icon] [CTA] [menu]`, with the phone icon visible from `sm`.

### 6.2 Field Video — *currently the first section*
- **Purpose:** show the work is real.
- **Working:** the gating logic is exemplary (poster-first, idle-deferred, skipped on Save-Data / slow connection / reduced-motion). Gradient scrim is load-bearing and correctly documented. Aspect-ratio switch 16:9 → 4:3 on phones is well-reasoned.
- **Problems:** **it renders before the hero.** `<h2>` precedes `<h1>` in the DOM. On mobile `min-h-[34rem]` guarantees it owns the entire first screen, pushing H1, value proposition and both CTAs below the fold. Its only CTA goes to YouTube. And `effectiveType` is absent in Safari and Firefox, where [LoopingVideo.tsx:44-46](../src/components/common/LoopingVideo.tsx#L44-L46) treats absence as permission — so **every iPhone fetches the video regardless of connection quality** (2.2 MB mobile rendition, 6.4 MB desktop).
- **New-user view:** atmospheric and confident, but I have to scroll before I learn what is sold or how to get it.
- **2026 recommendation:** **move it below the Hero**, as a full-bleed band between Problem and Pillars — the moment where "show me it's real" is the live question. Drop `min-h` to `26rem`. Change the CTA from YouTube to an in-page anchor. Add a width ceiling for Safari/Firefox where `effectiveType` is unavailable.
- **Priority: High**
- **Copy:** keep — "No chemical fertiliser. No chemical crop protection. Twenty-one organic inputs, one job." is the best line on the site.

### 6.3 Hero
- **Purpose:** name the category, state the proposition, offer the two primary actions, establish legitimacy.
- **Working:** the copy does exactly what the comment says it must. Masked line reveal is elegant. The four-stat proof strip (13+ years / 21 products / ISO / Nashik) answers "are these people real" without a testimonial. The "chain" overlay (Healthy soil → crop → farmer) states the whole argument in three chips.
- **Problems:**
  - `text-shine` on "follows." sets `color: transparent` + `-webkit-text-fill-color: transparent` with `background-clip: text`. **In Windows forced-colors / High Contrast mode the word disappears entirely.** Needs a `@media (forced-colors: active)` fallback restoring `color`.
  - The masked reveal parks each line at `y: 115%` inside `overflow-hidden`. The H1 is in the DOM (good for SEO/AT) but **invisible until React hydrates and framer-motion runs** — and it is the LCP element.
  - The ISO seal is `hidden … sm:flex` — absent on phones, where the trust signal matters most.
  - Secondary CTA is `tel:` — no action at all on desktop.
- **2026 recommendation:** forced-colors fallback for `text-shine`; render the H1 at final position and animate only opacity when JS is late; show the ISO seal at all widths; make the desktop secondary CTA WhatsApp with a `tel:` swap under `sm`.
- **Priority: High (a11y) / Medium (rest)**

### 6.4 Problem
- **Purpose:** recognition before persuasion.
- **Working:** **the best section on the site.** Ten verbatim farmer complaints, each traced to a source blog post in the code. Founder pull-quote closes it. No competitor does this.
- **Problems:** ten chips in a centred flex-wrap creates a ragged shape with no scan order; at `text-[0.92rem]` on a phone it is a wall. The lead ("If any of them sound like your own, you are in the right place") is the strongest CTA on the page and is not linked to anything.
- **New-user view:** *"They know what my problem is."* Exactly the intended reaction.
- **2026 recommendation:** keep every word. Reduce to the 6 strongest on mobile behind a "more" toggle. Group into 2–3 themed columns (soil / cost / market) so the eye has a path. Add a soft anchor after the pull-quote: *"Every one of these traces back to the same thing →"* linking to Pillars.
- **Priority: Medium**

### 6.5 Pillars
- **Purpose:** the idea, in four lines.
- **Working:** the do-this/not-that contrast is set as two type weights so the argument reads without full sentences. Glass cards on forest ground. Ghost numbers.
- **Problems:** `SUBJECTS` and `REJECTED` are positional arrays indexed against `pillars` ([Pillars.tsx:23-25](../src/components/home/Pillars.tsx#L23-L25)) — reorder the data and the cards silently mismatch. Content problem, not just code: this is SCT's core IP.
- **2026 recommendation:** move `subject`/`rejected` into the `pillars` objects in `site.ts`. Visually: no change needed.
- **Priority: Low (visual) / Medium (data integrity)**

### 6.6 Method
- **Purpose:** the system, and what "100% SCT" means.
- **Working:** correcting the live site's shuffled modal bullets is a real content fix. Keeping SCT's vocabulary (Method / Rule / Meditation) while adding a plain second line is the right compromise.
- **Problems:** "Meditation" for *"watch the daily video, read the article, talk to another farmer"* will mislead an English reader even with the gloss. The lead introduces "100% SCT user" as if known. Nine dense bullets across three cards is the heaviest text block on the page.
- **2026 recommendation:** keep the names, but lead the card with the plain line and set the SCT term as a subtitle — reverse of current. Define "100% SCT" in one sentence before using it.
- **Priority: Medium**

### 6.7 Products — the centrepiece
- **Purpose:** the section the page exists to reach.
- **Working:** ranges before packs is the correct question order. Darkest ground gives the white cards the most contrast on the page. Five featured, not 21.
- **Problems:**
  - Nothing answers **"which range do I need?"** — the only question a visitor has here.
  - The **dosage marquee** auto-scrolls indefinitely, pausable only on `:hover` ([globals.css:404-407](../src/styles/globals.css#L404-L407)) — unavailable on touch. This is informational, not decorative, text in continuous motion: **WCAG 2.2.2 (Pause, Stop, Hide) failure**, and it defeats its own purpose since dosage can never be read at a glance.
  - `xl:grid-cols-5` puts five cards in a row where each body text column is very narrow.
  - The footnote sits at `sage-400` on forest — passes (4.75:1) but is the quietest text in the section.
- **2026 recommendation:** add a one-line decision rule under the range cards ("New to SCT → start with Vedic. Already running SCT → Super adds…"). **Replace the marquee with 2 static chips + "＋2 more"** — same information, readable, no 2.2.2 violation. Cap at `lg:grid-cols-3` / `xl:grid-cols-4`.
- **Priority: High**

### 6.8 Benefits
- **Purpose:** what actually changes in the field.
- **Working:** outcome-phrased, each traced to a published SCT claim. The three rule-breaks (six accent hues, bespoke header, Caveat margin notes) are declared and justified in the file. Tailwind accent map written as literal strings — correct, since runtime-assembled class names produce no CSS.
- **Problems:** the six hues import `sky`, `amber`, `rose`, `fuchsia` from Tailwind's default palette into a site whose whole argument is a four-family logo-derived system. `fuchsia` in particular reads as foreign. Four decorative leaf PNGs plus a masked field-photo haze is a lot of decoration for one section. Margin notes are `xl:block` only — invisible to most visitors.
- **New-user view:** the most immediately *likeable* section, and the one where an agronomically literate reader notices there are no numbers.
- **2026 recommendation:** keep the six-card structure; **re-map the accents onto brand/leaf/saffron/earth/sand at varying tints** so it stays in-system. This is the section that should carry trial data the moment SCT has any.
- **Priority: Medium**

### 6.9 Why SCT
- **Purpose:** differentiation from the bag at the next shop.
- **Working:** each reason is a checkable fact with a stat label, not an adjective. Sticky founder figure against a scrolling list is a good editorial device. Leading with "You are never left alone with it" is the right choice — no competitor has an equivalent.
- **Problems:** the pull-quote duplicates a line already in the founder's letter on `/about`. Two CTAs at the end, both to inner pages, both "read more" in intent — neither advances a purchase.
- **2026 recommendation:** minor. Consider making the "dealer network" card link to a dealer locator once one exists.
- **Priority: Low**

### 6.10 Proof
- **Purpose:** other farmers' voices.
- **Working:** the adaptive 2-vs-3+ layout is smart. The YouTube channel card as a substitute for thin written proof is the right instinct. "Add your testimonial" is a good loop.
- **Problems (the most consequential on the page):**
  - **Two of the four quotes are samples**, rendering identically to the two real ones. The only guard is a comment ([testimonials.ts:80-95](../src/data/testimonials.ts#L80-L95)).
  - **Marathi only.** The English gloss exists and is deliberately withheld.
  - No photograph, crop, or before/after with any quote.
  - Slider arrows work; the track has **no keyboard affordance and no live region** announcing slide changes.
- **2026 recommendation:** delete the two samples before launch — two real quotes plus the channel card is more credible than four of uncertain provenance. Render the gloss as small italic secondary text *under* the Marathi, not as a subtitle bar. Add crop + village + a field photograph to each. Make the slider keyboard-operable with `aria-live="polite"`.
- **Priority: Critical**

### 6.11 Gallery teaser
- **Purpose:** a taste of the archive.
- **Working:** one section with a tab switch rather than two teasers. Inactive panel is unmounted so hidden tiles are never requested — genuinely good. 8-tile preview.
- **Problems:** tablist has **no arrow-key navigation and no roving tabindex** (WAI-ARIA tab pattern). The tabpanel is not focusable. Switching tabs causes a layout jump (photo grid 4:3 vs video grid 16:9).
- **2026 recommendation:** add arrow-key handling + `tabIndex={0}` on the panel. Reserve a `min-height` across both panels.
- **Priority: Medium**

### 6.12 ISO Certification
- **Purpose:** third-party credential.
- **Working:** re-presenting the old photographic band as type + halo is a clear improvement. The `badge-float` at 7s reads as breathing rather than bouncing. Dropping the client's truncated sentence rather than completing it is exactly right.
- **Problems:** **ISO 9001:2008 was withdrawn in 2018** — the current revision is 9001:2015. Showing a superseded standard to a buyer is worse than showing none. Also, ISO 9001 is a *quality-management* standard and does not certify organic status; on a site arguing "no chemicals", a visitor will readily conflate the two. The copy ("Soil Charger Technologies", plural) doesn't match `site.name`.
- **2026 recommendation:** confirm the current certificate with SCT and update. Add one line distinguishing quality-management certification from organic/residue certification. Fix the name.
- **Priority: High (trust)**

### 6.13 Contact CTA
- **Purpose:** the one action.
- **Working:** three doors for three genuinely different people. Phone and WhatsApp lead, not a form — correct for this audience and consistent with SCT's own working method. "Start with one field, one season" is excellent risk reduction.
- **Problems:** the distributor door links to `/careers#distributor` — the mismatch flagged in §5. No opening hours, so "Fastest" is an unbacked promise.
- **2026 recommendation:** add hours under the phone card. Change the distributor link target once the route is renamed.
- **Priority: Low**

### 6.14 Footer
- **Purpose:** everything the seven-item header dropped.
- **Working:** contact above link columns is the right priority. No forms, with documented reasoning. Lime hairline at the seam is a nice touch.
- **Problems:** six `<h2>` elements per page. 30 links in four columns is a lot on a phone. `Farmer Stories → /#farmer-stories` cross-route hash won't scroll from another page (`ScrollToTop` returns early on a hash, and nothing else handles it).
- **2026 recommendation:** `<h2>` → `<h3>`. Collapse columns to accordions below `sm`. Add cross-route hash handling to `ScrollToTop`.
- **Priority: Medium**

---

## 7. Page-by-Page Analysis

### `/` Homepage
Covered in §6. **Core issue:** section order puts an offsite CTA above the value proposition on mobile.

### `/about`
- **Purpose:** the founder's story and the company's legitimacy.
- **Working:** reproducing the founder's letter in full instead of summarising is the right editorial call — its value *is* that it's one person explaining a decision. The timeline is extracted from that same letter, so dates are SCT's own. Sticky portrait beside scrolling text.
- **Problems:** the letter is ~450 words of dense prose with no subheadings, pull-quotes or breaks. On a phone it is a very long scroll. `team1.png` is used both here and on the team card. No photography of the facility — the "certified manufacturer" claim has no visual support.
- **Recommendation:** add 2–3 pull-quotes to break the letter. Add facility/manufacturing photography.
- **Priority: Medium**

### `/technology`
- **Purpose:** the four pillars, the science, the three principles, "100% SCT".
- **Working:** clean four-part structure with real anchor ids matching the footer links. Reuses `<Method cta={false}>` so the CTA isn't redundant on the page it points to — a nice detail.
- **Problems:** the most jargon-dense page (mycorrhiza, SAR, organic carbon, PGR) with no glossary. Four consecutive card grids with little layout variation.
- **Recommendation:** add an inline glossary (`<abbr>` or a definition strip). Break the rhythm with one diagram — a soil cross-section showing what the four pillars act on would be the single highest-value asset on this page.
- **Priority: Medium**

### `/products`
- **Purpose:** the catalogue.
- **Working:** deep-linkable range filter; instant client-side filtering; the active range explains itself rather than being a bare chip; two enquiry routes at the foot; honest provisional notice.
- **Problems:** no crop filter, no search, no sort. The provisional banner appears when **every** product is provisional ([products.ts:687](../src/data/products.ts#L687)) — which is the current state, so the whole catalogue reads as unconfirmed. `xl:grid-cols-4` with a moving marquee in every card = 4 marquees animating simultaneously.
- **Recommendation:** add crop and purpose filters (`applications.ts` has the data). Resolve the provisional list with SCT before launch — this is the biggest content blocker.
- **Priority: High**

### `/products/:category`
- **Working:** correct reading order — what it is → what it does → how much → which pack → how to ask. `<dl>` dosage table with zebra rows. "These rates apply to every product in this category" prevents a real misunderstanding.
- **Problems:** back-link only, no breadcrumb trail, no `BreadcrumbList` JSON-LD. Related products are same-range only, so a Vedic category never surfaces a relevant Super product. No crop applicability. No "farmers using this" link into the gallery.
- **Priority: Medium**

### `/products/:category/:product`
- **Working:** full content inheritance so a shared link stands alone. Sibling packs listed. Correct `ProductGroup`/`isVariantOf` structured data with price and availability deliberately omitted.
- **Problems:** identical to its category page apart from the pack chip — a visitor moving between the two sees near-duplicate content (and so does a crawler). `<Navigate to="/404">` relies on the `*` catch-all, which works but puts a literal `/404` in the address bar.
- **Recommendation:** either give pack pages distinct value (pack photography, per-pack coverage area, "treats N acres") or collapse them into an anchor on the category page.
- **Priority: Medium**

### `/gallery`
- **Working:** the hand-built lightbox is a genuinely good piece of engineering — zoom, rotate, pan, swipe, slideshow, fullscreen, thumbnail rail, focus trap, Escape-defers-to-browser-in-fullscreen, iframe mounted only on play. Dead-thumbnail detection by response width is clever and necessary.
- **Problems:** the archive is disconnected from products and crops. No captions or dates on photos. Video titles are placeholders (`docs/README.md` lists "pull real titles for the 51 YouTube videos" as outstanding). No filtering by crop, region or year.
- **Recommendation:** tag every asset by crop and surface matching media on category and crop pages. This turns an orphan archive into the site's strongest proof engine.
- **Priority: High (business value)**

### `/knowledge`
- **Working:** featured article + grid; the content (21 scraped blog posts) is a genuine SEO asset.
- **Problems:** flat list, no categories/tags/search, no related articles, no author or date surfaced, no reading time. `<h3 className="text-h2">` — heading level and visual level disagree.
- **Recommendation:** tag by crop and topic; cross-link to the relevant products; surface dates.
- **Priority: Medium**

### `/careers`
- **Working:** the decision to keep these three forms **inline rather than modal** is correct and well-argued — a 26-field application in a phone modal is miserable. Track switcher with deep links. Scroll-into-view on track change.
- **Problems:**
  - `/careers#internship` **does not scroll to the form**: `ScrollToTop` returns early when a hash is present ([ScrollToTop.tsx:13](../src/components/common/ScrollToTop.tsx#L13)), `CareersPage` skips `scrollIntoView` on first paint, and `active` is already `"internship"` so no change fires it. Arriving from the footer link lands the visitor at whatever scroll offset they had on the previous page.
  - The distributor form is 26 fields and six uploads with **no progress indicator, no save, no step validation** — and it ends in a `mailto:` that can't carry the uploads.
  - The comment claims the tracks are "a real radio group… operable with arrow keys"; the rendered control is a set of `<button>`s.
- **Priority: High**

### `/contact`
- **Working:** four channel cards; phone/WhatsApp before the form; address with a Maps link; a band pointing at every other form on the site; FAQ with `FAQPage` JSON-LD.
- **Problems:**
  - The main form **does not use the shared field primitives** — it re-implements them with a different focus treatment ([ContactPage.tsx:141](../src/pages/ContactPage.tsx#L141)). Two form systems on one site.
  - Only the message is `required`; no `autoComplete`, no `inputMode`, no phone field at all.
  - `send()` calls `window.open` and nothing else ([ContactPage.tsx:126-136](../src/pages/ContactPage.tsx#L126-L136)) — **if the popup is blocked, the form silently does nothing.** Every modal form handles this with a `SuccessPanel` offering the link again; this one doesn't.
  - Two adjacent `ground="tint"` sections.
  - FAQ buttons lack `aria-controls`.
  - No map embed, no opening hours.
- **Priority: High**

### `/privacy`, `/terms`
Present and routed via a shared `LegalPage`. Not reviewed for legal sufficiency — flag for the client's counsel.

### `/404`
Well done: on-brand, keeps the voice ("ploughed under"), offers two CTAs plus the full nav, correctly `noindex`. **But it only works if the host rewrites unknown paths to `index.html`** — see §12.

### Cross-page consistency issues

| Issue | Pages |
|---|---|
| Two different form field implementations | `/contact` vs all others |
| `<ContactCta />` repeated verbatim | 9 pages |
| `<h1>` via `PageHero` vs inline | Inner pages vs Category/ProductDetail/404 |
| Breadcrumbs | ProductDetail only |
| Footer `<h2>` competing with page headings | All |

---

## 8. UX Psychology & Conversion Analysis

**Attention → Interest → Understanding → Trust → Desire → Action**

| Stage | Mechanism | Verdict |
|---|---|---|
| **Attention** | Full-bleed video + masked headline reveal | Works on desktop. On mobile the video *is* the attention, and it spends it on a YouTube link. |
| **Interest** | Problem section — ten verbatim complaints | **Strongest asset on the site.** Recognition before persuasion is exactly right. |
| **Understanding** | Pillars → Method → Products | Works. "Which range?" and "100% SCT" are the two gaps. |
| **Trust** | ISO, years, founder's letter, testimonials | **Weakest stage.** See below. |
| **Desire** | Benefits — six outcomes | Well written, entirely unquantified. |
| **Action** | Phone / WhatsApp / distributor | Right channels, broken plumbing. |

### Above-the-fold messaging
Desktop: category + proposition + 2 CTAs + 4 proof points. Strong.
Mobile: atmospheric video + offsite link. Weak.

### Value proposition
Clear and differentiated. *"Feed the soil. The crop follows."* plus *"no chemical fertiliser, no chemical crop protection."* — a real position, not a slogan.

### CTA placement & repetition
Repetition is good (every section ends somewhere). Hierarchy is not: 15 homepage CTAs with 3 leaving the site, and header/hero primaries in conflict.

### Trust signals — audited

| Signal | Present | Assessment |
|---|---|---|
| Years in business | ✓ 2015, everywhere | Strong |
| Founder named + letter | ✓ | **Best trust asset on the site** |
| Named leadership with photos | ✓ 5 people | Strong |
| Physical address | ✓ full, with Maps link | Strong |
| Multiple phone numbers | ✓ 2 + WhatsApp | Strong |
| Certification | ⚠ ISO 9001:**2008** | **Withdrawn 2018 — must be updated** |
| Testimonials | ⚠ 2 real + 2 samples, Marathi only | **Weak and risky** |
| Client logos | ✗ | Missing |
| Case studies | ✗ | Missing — the highest-value gap |
| Trial data / statistics | ✗ | Missing (correctly acknowledged) |
| Farmer count | ⚠ "50,000+" `verified: true` | **Contradicts its own file header**, which describes it as an estimate awaiting SCT's confirmation |
| Video evidence | ✓ 51 films | Under-used — siloed in the gallery |
| Press / awards | ✗ | Missing |
| Return / guarantee policy | ✗ | Missing |

### Benefits vs features
Handled well. Benefits are outcomes ("Soil that comes back to life", "Water that goes further"), features live on product pages. Correct separation.

### Objection handling — the biggest conversion gap

| Objection | Handled? |
|---|---|
| "Will this work on my crop?" | ✗ |
| "What does it cost?" | ✗ |
| "How long until I see something?" | ✗ |
| "Can I use it with what I already spray?" | Partly — "Rule" says no chemicals, which is a *large* ask stated without transition support |
| "Where do I buy it?" | ✗ no locator |
| "What if it fails?" | ✗ |
| "Is this just another company selling me a bag?" | ✓ — "Why SCT" answers this well |
| "Are these people real?" | ✓ — hero proof strip, founder, address |

The "Rule" principle asks a farmer to stop **all** chemical fertiliser and **all** chemical crop protection. That is the single largest commitment the site requests, and it is presented as three bullets with no transition plan, no phased path, and no acknowledgement of the risk. This is where a persuaded visitor will hesitate hardest.

### Risk reduction
One good instance: *"Start with one field, one season."* It appears once, at the very bottom of the page. **It should appear near the Products section**, where the objection actually forms.

### Conversion friction — ranked

1. Forms capture nothing (`mailto:`/`wa.me`), attachments impossible, phone validation dead
2. Contact form fails silently when popups are blocked
3. No price signal anywhere
4. No dealer locator
5. No crop→product path
6. Distributor application: 26 fields, six uploads, no progress, no save
7. Deep links 404 on refresh (current build config)
8. Blank screen on slow connections
9. Distributor path labelled "Careers"
10. No analytics — none of this is measurable

---

## 9. Accessibility Audit

### Done well
- Skip link, correctly `sr-only` → `focus:not-sr-only` ([App.tsx:44-49](../src/App.tsx#L44-L49))
- Global `:focus-visible` ring with offset
- `cursor: pointer` restored once globally after Tailwind v4 Preflight dropped it, rather than at 25 call sites
- Alt discipline: decorative images `alt=""`, meaningful images described, stretched links carry `sr-only` names
- Modal: portal, `role="dialog"`, `aria-modal`, focus to panel (so the title is announced before the first field), Tab trap, focus restore
- Language switcher: `aria-haspopup="listbox"`, roving focus, Home/End, Escape-to-trigger
- `lang="mr"` on Marathi content
- `role="status" aria-live="polite"` on the route loading fallback
- Three-level reduced-motion *architecture* in CSS

### Failures — ordered by severity

**1. `prefers-reduced-motion` is bypassed by every JavaScript animation. (Critical)**
There is no `MotionConfig` and no `useReducedMotion` anywhere in the codebase (verified: zero matches). The global CSS kill at [globals.css:668-680](../src/styles/globals.css#L668-L680) zeroes `animation-duration` and `transition-duration` — but framer-motion drives values through JS-set inline styles, which that rule does not touch. So `<Reveal>` (used on essentially every section of every page), the hero's masked line reveal, and the modal's enter/exit all animate at full amplitude for a visitor who has explicitly asked for reduced motion. The `motion-safe:` hover lifts *are* correctly gated; the JS is not.
**Fix:** wrap the app in `<MotionConfig reducedMotion="user">`. One line in `App.tsx`.

**2. Primary action colour fails AA. (Critical)** — see §4. Affects every CTA on the site.

**3. Auto-scrolling informational text with no accessible pause. (High — WCAG 2.2.2)**
The dosage marquee on every category card moves indefinitely and pauses only on `:hover`. On touch there is no pause mechanism at all. Content in motion for more than 5 seconds must have a pause/stop/hide control.
**Fix:** replace with static chips (recommended), or add a visible pause control and honour `prefers-reduced-motion` on the track.

**4. Invisible focus indicators on custom checkbox and file inputs. (High — WCAG 2.4.7)**
`CheckboxGroup` and `FileField` put the real input in `sr-only` and paint an `aria-hidden` proxy ([fields.tsx:387-393](../src/components/forms/fields.tsx#L387-L393), [fields.tsx:330-336](../src/components/forms/fields.tsx#L330-L336)). The focus ring lands on the hidden input, so a keyboard user has **no visible indication of which control is focused.**
**Fix:** `peer` + `peer-focus-visible:ring-2` on the proxy element.

**5. Control borders fail non-text contrast. (High — WCAG 1.4.11)**
`hairline` at 1.23:1 on white is the border on every input, select, textarea and card. Checkbox proxy border at 2.50:1. Both are below the 3:1 required for UI component boundaries.

**6. Tab pattern incomplete. (Medium — WAI-ARIA)**
The gallery tablist has correct roles and `aria-controls` but no arrow-key navigation and no roving tabindex. The tabpanel has no `tabIndex={0}`.

**7. Form hints are not programmatically associated. (Medium — WCAG 3.3.2)**
`FieldShell` renders `hint` as a sibling `<p>` with no `aria-describedby` link. Screen-reader users never hear "Enter a 10-digit mobile number".

**8. Error state is colour-only. (Medium — WCAG 1.4.1)**
`data-[touched=true]:invalid:border-earth-600` changes only a border colour. No icon, no text, no `aria-invalid`. Native validation bubbles appear on submit, but the inline state is colour alone.

**9. `background-clip: text` with transparent fill breaks in forced-colors. (Medium)**
`.text-shine` sets `color: transparent` and `-webkit-text-fill-color: transparent`. In Windows High Contrast mode the gradient background is dropped and the text is invisible. It is applied to hero headline words on 6+ pages.
**Fix:**
```css
@media (forced-colors: active) {
  .text-shine {
    color: CanvasText;
    -webkit-text-fill-color: CanvasText;
    background-image: none;
  }
}
```

**10. Heading order and duplication. (Medium)**
`<h2>` (FieldVideo) precedes `<h1>` (Hero) on the homepage. The footer contributes six `<h2>` elements on every page.

**11. Carousel without keyboard or live region. (Medium)**
The testimonial slider's arrows are accessible buttons, but the scroll track has no keyboard affordance and slide changes are not announced.

**12. FAQ accordion missing `aria-controls`. (Low)**

**13. Google Translate output is unverified for accessibility.** Machine translation can produce text that does not match `lang` attributes and can break reading order for screen readers in the target language.

### Passing
Touch targets: nav drawer rows, buttons and slider arrows are ≥44px. Footer social tiles are 40px — passes WCAG 2.5.8 (AA, 24px) though below 2.5.5 (AAA, 44px). Colour is not the sole means of conveying active nav state (colour + underline rule). Link identification within body copy is adequate.

---

## 10. Responsive & Mobile UX Audit

### Desktop (≥1280px) — strong
Asymmetric editorial grids, sticky columns, full type scale, margin notes visible at `2xl`. Everything is designed here first, and it shows.

### Tablet (768–1279px) — the weakest breakpoint
- `Benefits`: 2-up from `md`, 3-up only at `xl` → a wide dead margin at 1024–1279px
- `Header`: phone link disappears between `lg` and `xl` (documented: six nav items leave no room)
- `Products`: 3-up at `lg`, 5-up at `xl` — a jarring jump
- `WhySct` sticky figure activates at `lg`, where there is barely room for it

### Mobile (<768px) — good CSS, wrong priorities

**What works:** fluid type never steps; `shell` guarantees a 20px gutter at every width; `min-w-0` discipline prevents the marquee from blowing out grid columns; `100dvh` used correctly for the drawer; `overscroll-contain` + `data-lenis-prevent` stop scroll chaining; the modal is a bottom sheet with a grab handle; forms stack to one column with full-width submit buttons; aspect ratios switch deliberately (16:9 → 4:3).

**What fails:**

| Issue | Detail |
|---|---|
| **Above-the-fold content** | Video band `min-h-[34rem]` owns the entire first screen; H1, proposition and both CTAs are below the fold |
| **No visible CTA in the header** | Primary CTA is `hidden lg:block`; phone link is `hidden md:…`; a phone user sees only a hamburger |
| **Logo dominance** | 4.25rem logo in a 5.25rem bar — the lockup is a large share of a small viewport |
| **Trust signals hidden** | Hero ISO seal is `hidden sm:flex`; `Benefits` margin notes are `xl:block` |
| **Hover-only affordances** | Marquee pause, photo-grid expand icon and scrim, card lifts — all unreachable on touch |
| **Image weight** | Single JPEGs up to 2.1 MB served at phone widths with no `srcSet` |
| **Video on iOS/Firefox** | `effectiveType` absent → treated as permission → 2.2 MB fetched regardless of real connection |
| **Footer length** | 30 links in 4 stacked columns + contact block |
| **Problem section** | 10 chips in centred flex-wrap = a ragged wall at `0.92rem` |
| **Distributor form** | 26 fields, 6 uploads, no progress indicator, no save |
| **Drawer height** | `max-h-[calc(100dvh-5.25rem)]` assumes the solid bar; the transparent bar is 6rem |

### Looks good on desktop, fails on mobile
1. The video band — a cinematic opener on a 27" display; a wall that buries the proposition on a 6" one
2. The dosage marquee — hoverable to pause on desktop, unpausable on touch
3. The `xl:grid-cols-5` product row — fine at 1536px, meaningless below
4. Margin notes and the hero ISO seal — designed, then hidden from the majority of visitors
5. The distributor form — a reasonable page on a laptop; a marathon on a phone

---

## 11. Interaction & Microinteraction Audit

| Interaction | Implementation | Verdict |
|---|---|---|
| Card hover lift | `-translate-y-1` + shadow, `motion-safe` gated | **Useful** — affordance, not decoration |
| Button hover | Colour + `-translate-y-0.5` | **Useful**, but colour moves the *wrong* way (contrast drops) |
| Icon tile scale on group hover | `scale-110`, 400ms | **Useful** |
| Arrow nudge on link hover | `translate-x-1` | **Useful** |
| Ghost numbers tinting on hover | `GhostNumber` | **Neutral** — pleasant, costs nothing |
| Header transparent → solid | 400ms, `ease-expressive` | **Useful** |
| Scroll reveals | One `Reveal`, `once: true` | **Useful.** `once` is the right call. **But ignores reduced-motion.** |
| Hero masked line reveal | Per-line `overflow-hidden` + transform | **Useful**, but delays the LCP element and is JS-dependent |
| `text-shine` sweep | 4.2s linear, once per page | **Neutral/Distracting.** A continuous 4.2s loop on a heading is a persistent peripheral distraction. It is also the a11y risk in §9. Recommend firing it once on entry, then holding. |
| Background `fx` layers | 5 animated layers per dark section, 9–29s | **Distracting at volume.** Individually subtle; several on screen at once on a long page. Consider limiting to the hero and one other band. |
| `badge-float` (ISO) | 7s breathe | **Neutral** — the 2s→7s change was right |
| **Dosage marquee** | 26s infinite, hover-pause only | **Distracting and non-compliant.** Replace. |
| Lightbox: zoom/rotate/pan/swipe/slideshow | Hand-built | **Useful** — genuinely good |
| Modal enter/exit | Backdrop fade + 16px rise | **Useful** |
| Form focus ring | `ring-4 brand-500/12` | **Useful**, though the 12% ring is very faint |
| `data-touched` error timing | Set on first blur | **Useful** — a good pattern, correctly implemented |
| Loading states | Route fallback spinner with `aria-live` | **Useful** |
| Form submit feedback | `SuccessPanel` in modals | **Useful** — and honest about what actually happened |
| **Contact page submit** | `window.open` only | **Missing.** Silent failure if blocked. |
| Tooltips | None | **Fine** — not needed |
| Dropdown (language) | Full keyboard model | **Useful** — best control on the site |
| Accordion | `hidden` toggle | **Neutral** — no transition, but instant is defensible |
| Tab switch | Instant, panel unmounted | **Useful**, but causes a layout jump |
| Page transitions | None (instant route swap) | **Fine.** Route transitions on a CSR SPA add perceived latency. Correct omission. |
| Smooth scroll (Lenis) | 5.6 KB gz + rAF loop | **Neutral at best.** Costs a library, an rAF loop, and bespoke workarounds in four files, for a taste preference. Native `scroll-behavior: smooth` is already declared. **Recommend removal.** |

---

## 12. Performance-Aware UX

### Measured

**Built bundle (`dist/`):**

| Asset | Raw | Gzipped |
|---|---|---|
| `index.js` | 376.3 KB | **114.7 KB** |
| `motion.js` (framer-motion) | 126.6 KB | **41.6 KB** |
| `react.js` | 50.7 KB | **17.8 KB** |
| `index.css` | 100.8 KB | **17.1 KB** |
| `lenis.js` | 19.4 KB | 5.6 KB |
| **Blocking initial payload** | | **≈191 KB gz** |

Plus Google Translate's `element.js`, loaded for **100% of visitors** on every page load ([LanguageSwitcher.tsx:289-297](../src/components/layout/LanguageSwitcher.tsx#L289-L297)) whether or not they ever change language.

**Static assets: 35 MB total.**

| Folder | Size |
|---|---|
| `public/images` | **26 MB** |
| `public/videos` | 8.5 MB |
| `public/logo` | 128 KB |

**Largest files:**

| File | Size |
|---|---|
| `videos/field-band-1600.mp4` | 6.4 MB |
| `videos/field-band-854.mp4` | 2.2 MB |
| `images/soil/soil-texture.jpg` | 2.1 MB |
| `images/applications/crop-pomegranate.jpg` | 1.9 MB |
| `images/applications/crop-sugarcane.jpg` | 1.2 MB |
| `images/applications/crop-vegetables.jpg` | 1.0 MB |
| `images/soil/irrigation-borewell.jpg` | 1.0 MB |
| `images/farmers/farmer-rice-plant.jpg` | 962 KB |
| `images/legacy/career2.png` | 913 KB (a photograph stored as PNG) |
| …14 more over 600 KB | |

### Issues

**1. Client-rendered SPA, no SSR or prerender. (Critical)**
`index.html` ships `<div id="root"></div>`. Nothing paints until ~191 KB gz of JS and CSS downloads, parses and executes. For an audience explicitly described throughout the codebase as being on rural mobile connections, this is the single largest performance decision on the project — and it works against every other optimisation in the build.

**This also breaks link previews.** `Seo.tsx` writes its tags in a `useEffect` after mount and says so honestly ([Seo.tsx:15-22](../src/components/common/Seo.tsx#L15-L22)). WhatsApp's scraper does not execute JavaScript. **Every product link shared on WhatsApp — the primary distribution channel for this audience — previews with the generic homepage title and the logo.**

**Fix:** `vite-react-ssg` or similar to prerender the ~40 static routes at build time. Everything else stays identical.

**2. No SPA fallback in the build output. (Critical)**
`dist/` contains `index.html`, `assets/`, `images/`, `logo/`, `videos/` — no `_redirects`, `vercel.json`, `.htaccess` or `404.html`. On a static host every deep link hard-404s. All the canonical, JSON-LD and shareable-URL work depends on deep links resolving.

**3. Images: 26 MB, almost entirely unoptimised.**
`srcSet` exists **only** for product packs ([products.ts:649](../src/data/products.ts#L649)). The other **17 `sizes=` props across the codebase are inert** — `sizes` without `srcSet` does nothing. `Image.tsx` documents that source images must be pre-sized and pre-compressed; the product WebPs were done, nothing else was.

**Fix:** `vite-imagetools` or a build step emitting 480/768/1200/1600 AVIF+WebP for everything. Expected: 26 MB → under 4 MB.

**4. Layout shift.** `fill` images render with `position:absolute; inset:0` and no intrinsic dimensions. Aspect-ratio wrappers prevent CLS in most cases, but not all.

**5. Video on Safari and Firefox.** `effectiveType` is absent there, and [LoopingVideo.tsx:44-46](../src/components/common/LoopingVideo.tsx#L44-L46) treats absence as permission. Every iPhone fetches the clip regardless of real connection quality.

**6. Continuous compositing.** Each dark section runs `fx-mesh` (19s), `fx-streaks` (16s), `fx-dots` (9s) and two `blur(80px)` orbs (23s/29s). `blur(80px)` on a 34rem element is an expensive filter to composite every frame, and several sections can be on screen at once. On a low-end Android this is measurable battery and scroll-jank cost.

**7. Google Translate for everyone.** Third-party script on every page load for every visitor.

**8. Lenis.** 5.6 KB gz plus a permanent rAF loop, for smooth scrolling that `scroll-behavior: smooth` already provides free.

### How this affects conversion
For the stated audience, a slow first paint is not an abstraction. A farmer opening a WhatsApp link on 3G sees white, then a heavy video band, then — eventually — the proposition. Every second before first paint is measurable drop-off, and the copy, the IA and the trust architecture are all downstream of a visitor who never sees them. **Prerendering plus image compression is the highest-leverage work on this list**, because it is what lets the rest of the good work reach anyone.

---

## 13. Trust & Professionalism Audit

### What a new user trusts immediately
- Named founder with a photograph and a letter in his own voice
- Five named leaders with roles and portraits
- Full street address with a working Maps link
- Two phone numbers and a WhatsApp number, all prominent
- A specific founding year, used consistently
- A visible certification mark
- Professional, coherent, confident visual design
- Content that reads as written by someone who knows the subject

### What makes a user skeptical
- **ISO 9001:2008** — withdrawn in 2018. A buyer who checks will find it superseded.
- **Two testimonials** on a company claiming 50,000+ farmers — and two more that are samples rendering identically to the real ones.
- **All testimonials in Marathi** with no gloss, for any non-Marathi reader.
- **Zero numbers.** No yield data, no trial results, no before/after. `Benefits.tsx` acknowledges this is the largest gap against AgroStar.
- **"50,000+ farmers reached"** marked `verified: true` while [site.ts:107-112](../src/data/site.ts#L107-L112) describes it as an estimate standing in until SCT confirms. **These contradict each other**, and the flag is what the UI trusts.
- **"Products awaiting confirmation"** shown to buyers.
- **No prices, anywhere.**
- **No dealer locator** despite a "dealer network you can reach" claim.
- **"Soil Charger Technologies"** (plural) in the ISO paragraph vs `site.name` everywhere else.
- **Machine-translated agronomy** — a Marathi reader gets Google's rendering of dosage and crop-protection instructions.
- **No privacy notice at the point of data collection** — six forms, none of which say where the data goes.

### Highest-leverage trust work
1. Update or remove the ISO claim
2. Delete the sample testimonials
3. Collect and publish **3–5 real case studies**: farmer, village, crop, what changed, over what period, with photographs. The YouTube channel already holds this material — it needs consent and transcription, not creation.
4. Resolve the farmer-count figure
5. Publish *something* measured, even a single controlled plot comparison

---

## 14. Competitor-Level Design Expectations

*Referenced against [agrostar-benchmark.md](agrostar-benchmark.md) and the Indian agri-input sector generally (UPL, Coromandel, IFFCO, IPL Biologicals, Aries Agro, Biostadt).*

### What feels outdated
- ISO 9001:2008 as the sole credential
- A testimonial block with two quotes and no evidence
- Machine translation standing in for real multilingual content
- No crop-based entry point — the sector standard since roughly 2020

### What feels average
- The product catalogue structure (competent, conventional)
- The gallery (present, disconnected)
- The knowledge centre (good content, no discovery layer)
- The contact page (thorough, unexceptional)

### What feels modern — genuinely ahead of the benchmark set
- The design system: token discipline, ground rhythm, restrained motion
- The Problem section — no competitor leads with the customer's own words
- Dosage published on the card, before the click. AgroStar, UPL and Coromandel all stop at a name and a photograph.
- Content provenance discipline
- The three-level product tree with full content inheritance

### What is missing that the sector expects in 2026

| Expected | Present |
|---|---|
| Crop-wise product finder | ✗ — data exists, no UI |
| Dealer / distributor locator with map | ✗ |
| Trial data or field-study results | ✗ |
| Downloadable product leaflets (PDF) | ✗ |
| Price indication or "request a quote" | ✗ |
| Multilingual content (authored, not machine) | ✗ |
| WhatsApp-first contact | ✓ **ahead of most** |
| Video testimonials | ✓ exists, siloed in the gallery |
| Application/dosage calculator | ✗ |
| Seasonal crop calendar | ✗ |

### Where SCT can differentiate
1. **The Problem section.** Nobody else does this. Expand it, don't trim it.
2. **The "third principle" — daily video, WhatsApp group, farmer-to-farmer.** No competitor has an equivalent community layer. Currently it is one card on the homepage; it could be a **product**: a public feed, a joinable group, a searchable archive of the daily videos.
3. **Dosage transparency before the click.** Push further — a dosage calculator taking crop + acreage and returning a schedule.
4. **The founder's voice.** Institutional competitors cannot match a named person explaining a decision.

---

## 15. Problems & Opportunities

| # | Issue | Location | UX Impact | Severity | Recommended solution |
|---|---|---|---|---|---|
| 1 | No SPA fallback — every deep link 404s on refresh/share | `dist/` build config | Shared product links die; the primary distribution channel is WhatsApp | **Critical** | Add `_redirects`/`vercel.json`/`.htaccess` rewriting to `index.html` |
| 2 | CSR-only; nothing paints until ~191 KB gz executes; link previews broken | `index.html`, `Seo.tsx` | Blank screen on 3G; every WhatsApp share previews as the generic homepage | **Critical** | Prerender the ~40 static routes |
| 3 | Primary button 3.57:1; hover drops to 3.38:1 | `globals.css`, `ui/index.tsx` | Fails WCAG AA on every CTA; hover makes it worse | **Critical** | `brand-700` resting, `brand-800` hover |
| 4 | `PHONE_PATTERN` is an invalid regex — validation is silently dead | `form-submit.ts:153` | Unusable phone numbers submitted on all 6 forms; no error shown | **Critical** | Escape properly, or build from a regex literal's `.source` |
| 5 | No backend — forms are `mailto:`/`wa.me`; attachments impossible; body can truncate | `form-submit.ts` | Distributor and job applications lose data; nothing captured | **Critical** | POST endpoint behind `deliver()` |
| 6 | framer-motion ignores `prefers-reduced-motion` | no `MotionConfig` anywhere | Every reveal animates for users who opted out | **Critical** | `<MotionConfig reducedMotion="user">` |
| 7 | Sample testimonials indistinguishable from real ones | `testimonials.ts:80-95` | Fabricated social proof on a live commercial site | **Critical** | Delete before launch |
| 8 | ISO 9001:**2008** — withdrawn 2018 | `IsoCertification.tsx` | The only third-party credential is superseded | **High** | Confirm current certificate; distinguish quality-mgmt from organic |
| 9 | Video band above hero; H1/CTA below the fold on mobile; `h2` before `h1` | `HomePage.tsx:75-76` | First actionable element leaves the site | **High** | Move `<Hero>` first; relocate the video band lower |
| 10 | Dosage marquee: moving informational text, no touch pause | `CategoryCard.tsx`, `globals.css` | WCAG 2.2.2 failure; dosage unreadable at a glance | **High** | Static chips + "＋N more" |
| 11 | 26 MB images; `srcSet` on product packs only; 17 inert `sizes` props | `public/images`, `Image.tsx` | Multi-MB downloads on mobile data | **High** | Build-time responsive AVIF/WebP |
| 12 | `hairline` borders 1.23:1 on every input and card | `globals.css` | WCAG 1.4.11 failure; control boundaries invisible | **High** | `hairline-strong` ≥3:1 for controls |
| 13 | `sr-only` checkbox/file inputs → no visible focus | `fields.tsx` | Keyboard users cannot tell what is focused | **High** | `peer-focus-visible:ring-2` on the proxy |
| 14 | No crop→product path despite `applications.ts` | IA | The farmer's actual question is unanswerable | **High** | Crop finder + crop landing pages |
| 15 | Contact form fails silently when popups are blocked | `ContactPage.tsx:126-136` | Submissions lost with no feedback | **High** | Reuse `SuccessPanel` |
| 16 | Testimonials Marathi-only, gloss deliberately unrendered | `Proof.tsx` | Main trust block unreadable to English visitors | **High** | Render the gloss as secondary text |
| 17 | Distributor application labelled "Careers" | `navigation.ts` | Shopkeepers won't find it | **High** | Rename to "Partner & Careers" or add `/distributors` |
| 18 | No analytics of any kind | project-wide | No conversion measurement possible | **High** | Privacy-respecting analytics + event tracking |
| 19 | No `robots.txt` or `sitemap.xml` | `public/` | ~40 routes undiscoverable | **High** | Generate both at build |
| 20 | Video fetched on iOS/Firefox regardless of connection | `LoopingVideo.tsx:44-46` | 2.2 MB on an unknown connection | **Medium** | Add a viewport/width ceiling when `effectiveType` is absent |
| 21 | `text-shine` invisible in forced-colors mode | `globals.css` | Hero headline words vanish on 6+ pages | **Medium** | `@media (forced-colors: active)` fallback |
| 22 | Gallery tablist: no arrow keys, no roving tabindex | `Gallery.tsx` | Fails the WAI-ARIA tab pattern | **Medium** | Add key handling + `tabIndex` on panel |
| 23 | Form hints not linked via `aria-describedby`; errors colour-only | `fields.tsx` | WCAG 3.3.2 / 1.4.1 | **Medium** | Wire `aria-describedby`, `aria-invalid`, text errors |
| 24 | `animations.ts` entirely dead — 12 unused exports; `Reveal` contradicts its own documented viewport rule | `lib/animations.ts` vs `ui/index.tsx:190` | Documented system isn't what ships; `amount: 0.15` is unreachable for very tall elements | **Medium** | Delete or adopt; align `amount` to `"some"` |
| 25 | `/careers#internship` doesn't scroll to the form | `ScrollToTop.tsx:13` + `CareersPage.tsx` | Footer link lands at a stale scroll offset | **Medium** | Handle hash targets in `ScrollToTop` |
| 26 | `/contact` re-implements form fields | `ContactPage.tsx:141` | Two form systems on one site | **Medium** | Migrate to `fields.tsx` |
| 27 | `ink-400` (3.43:1) for hints/labels; `ink-300` placeholders (2.50:1) | `globals.css` | Small text fails AA | **Medium** | Shift one step darker |
| 28 | Two adjacent `ground="tint"` sections | `ContactPage.tsx` | Breaks the ground rhythm | **Medium** | Alternate |
| 29 | Footer emits 6 `<h2>` per page | `Footer.tsx` | Competes with page headings in the outline | **Medium** | `<h3>` |
| 30 | Google Translate script for 100% of visitors; switching reloads the SPA | `LanguageSwitcher.tsx` | Third-party weight for everyone | **Medium** | Load on first interaction; plan authored translations |
| 31 | 5 animated fx layers per dark section; `blur(80px)` orbs | `globals.css`, `ui/index.tsx` | Continuous compositing on low-end Android | **Medium** | Limit `fx` to 2–3 sections per page |
| 32 | `productsAreProvisional` true → whole catalogue reads unconfirmed | `products.ts:687` | Buyer confidence | **Medium** | Resolve the product list with SCT |
| 33 | Lenis: 5.6 KB + rAF loop + 4 files of workarounds | `SmoothScroll.tsx` | Cost without user benefit | **Medium** | Remove; native smooth scroll is already set |
| 34 | 9 ad-hoc body text sizes bypass the type scale | project-wide | System drift | **Low** | Add `text-body`/`text-body-sm`/`text-caption` |
| 35 | `Pillars` uses positional arrays against `pillars` data | `Pillars.tsx:23-25` | Reordering silently mismatches core brand IP | **Low** | Move into the data objects |
| 36 | `RevealGroup` is a no-op; `Benefits` accents import 4 foreign Tailwind hues | `ui/index.tsx`, `Benefits.tsx` | Dead code; palette drift | **Low** | Delete; re-map accents in-system |
| 37 | FAQ missing `aria-controls`; `<h3 className="text-h2">` on Knowledge | `ContactPage.tsx`, `KnowledgePage.tsx` | Minor semantics | **Low** | Fix both |
| 38 | Hero ISO seal `hidden sm:flex`; margin notes `xl:block` | `Hero.tsx`, `Benefits.tsx` | Trust signal hidden on the primary device | **Low** | Show the seal at all widths |

---

## 16. Quick Wins vs Major Improvements

### Quick wins — under a day each, high visible return

1. **`<MotionConfig reducedMotion="user">` in `App.tsx`** — one line; closes the largest a11y failure
2. **Primary button → `brand-700`, hover `brand-800`** — two token changes; fixes AA site-wide and corrects the hover direction
3. **Fix `PHONE_PATTERN`** — one line; restores validation on six forms
4. **Delete the two sample testimonials** — removes fabricated social proof
5. **Swap `<FieldVideo />` and `<Hero />`** — one line in `HomePage.tsx`; fixes the mobile fold and the heading order
6. **Marquee → 2 static chips + "＋N more"** — resolves WCAG 2.2.2 and makes dosage readable
7. **`forced-colors` fallback for `.text-shine`** — five lines
8. **`peer-focus-visible:ring-2` on checkbox/file proxies** — restores keyboard focus visibility
9. **Add `_redirects` / `vercel.json`** — a few lines; stops every deep link 404ing
10. **`robots.txt` + generated `sitemap.xml`**
11. **Footer `<h2>` → `<h3>`**; **FAQ `aria-controls`**; **`<h3 className="text-h2">` fix**
12. **Alternate the two `tint` sections on `/contact`**
13. **Show the hero ISO seal at all widths**
14. **Delete `animations.ts` and `RevealGroup`**
15. **Reuse `SuccessPanel` on the contact form**
16. **Add `aria-describedby` to `FieldShell`**
17. **Arrow-key handling on the gallery tablist**
18. **`hairline-strong` token for control borders**
19. **Bump `ink-400` → `ink-500` for sub-18px text**

### Medium improvements — 1–2 weeks

20. **Prerender the static routes** — fixes first paint *and* link previews
21. **Build-time responsive images** — 26 MB → under 4 MB
22. **Analytics + conversion events**
23. **Migrate `/contact` onto the shared form primitives**
24. **Text error messages + `aria-invalid` across the forms**
25. **Remove Lenis and its four workarounds**
26. **Defer Google Translate to first interaction**
27. **Limit `fx` layers to 2–3 sections per page**
28. **Rename Careers → "Partner & Careers"**, or add `/distributors`
29. **Add breadcrumbs + `BreadcrumbList` JSON-LD across the product tree**
30. **Tag gallery media by crop; surface it on category pages**
31. **Type-scale tokens for the nine ad-hoc sizes**
32. **Resolve the ISO claim and the farmer-count contradiction**
33. **Loading and disabled button states**

### Major improvements — 3+ weeks, or blocked on the client

34. **A real form backend** — POST endpoint, file upload, storage, notification, receipt. The single largest conversion fix on the list.
35. **Crop-based product finder** — `/crops/:crop` pages with conditions, recommended products, dosage schedule, and matching gallery media. The data already exists.
36. **3–5 real case studies** — farmer, village, crop, what changed, over what period, with photographs. Blocked on SCT content + consent.
37. **Dealer locator** — map or searchable list by district/taluka.
38. **Authored Marathi and Hindi content** — not machine translation. The content model already supports it.
39. **Dosage calculator** — crop + acreage → schedule and quantities. The strongest differentiator available.
40. **A "community" surface for the third principle** — the daily video archive, searchable and public.
41. **Split the distributor application into steps** with progress, per-step validation, and save-and-resume.
42. **Resolve the provisional product list** with SCT.

---

## 17. Recommended Homepage Structure

The current order is already well-reasoned. The changes below are a **re-order plus three insertions**, not a redesign.

| # | Section | Why here |
|---|---|---|
| 1 | **Header** | Persistent identity + one always-visible action. Add a compact call/WhatsApp button below `lg`. |
| 2 | **Hero** | The H1, the proposition and the primary CTA must be the first thing on every device. Currently third. |
| 3 | **Problem** | Recognition before persuasion. Moving it up means a visitor who scrolls once meets their own complaint immediately — the strongest hook the site has. |
| 4 | **Field Video** *(moved down)* | "Show me it's real" is the live question *after* the problem lands, not before anything has been said. Full-bleed here still reads as a chapter break, and it stops consuming the mobile fold. |
| 5 | **Pillars** | "What is your idea?" — the answer to the problem, in four lines. |
| 6 | **Method** | "How does it work?" — the system behind the idea. Define "100% SCT" here. |
| 7 | **Crop finder** *(new)* | **The highest-value insertion.** The visitor is now persuaded and asking "what does this mean for *my* crop?" Nine crops, each linking to products, dosage and relevant films. Data already exists in `applications.ts`. |
| 8 | **Products** | The catalogue, reached by someone who now knows why. Add the "which range?" decision line. |
| 9 | **Benefits** | "What actually changes?" — the payoff to the products. |
| 10 | **Why SCT** | "Why you and not the next shop?" — differentiation after the offer is understood. |
| 11 | **Proof** | Evidence lands hardest after the claim. Real testimonials + gloss + the channel card. |
| 12 | **Case studies** *(new)* | The missing rung between anecdote and data. Three cards: farmer, crop, what changed, over what period. |
| 13 | **Gallery teaser** | "Can I see it?" — corroboration, after the claims. |
| 14 | **ISO / credentials** | Institutional trust last, because it is the weakest of the three trust types here. Update the revision first. |
| 15 | **Risk reduction** *(new, small)* | One line, prominent: *"Start with one field, one season."* Currently buried in the CTA block. It belongs directly before the ask. |
| 16 | **Contact CTA** | Three doors. Add opening hours. |
| 17 | **Footer** | Everything the seven-item header dropped. |

**What changed and why:**
- **Hero before video** — the proposition must precede the atmosphere on mobile, and `<h1>` must precede `<h2>`.
- **Problem before video** — the problem is what makes the footage meaningful.
- **Crop finder inserted** — the single biggest IA gap, and the data is already in the repo.
- **Case studies inserted** — the largest trust gap.
- **Risk reduction promoted** — it currently sits below the point where hesitation forms.

---

## 18. UI Design System Recommendations

**The existing brand identity is good and should be preserved.** The palette is logo-derived and documented; the type scale is well-built; the grounds do real work. These are *corrections and additions*, not a replacement.

### Colour — keep the families, fix the assignments

```css
/* KEEP as-is: the brand / leaf / saffron / earth / sand / sage / lime / bone /
   ink families, and their documented logo provenance. */

/* CORRECT — action colours must clear 4.5:1 with white at button text sizes. */
--color-action:        var(--color-brand-700); /* #077a45 — 5.41:1 ✓ */
--color-action-hover:  var(--color-brand-800); /* #095f39 — 7.76:1 ✓ */
/* brand-600 stays the DISPLAY green: large headings, icons, accents — where
   it is large text and passes. It is no longer a button background. */

/* ADD — control borders must clear 3:1 (WCAG 1.4.11). */
--color-hairline:        #dfeae2;  /* keep: decorative card edges only */
--color-hairline-strong: #b9cfc0;  /* new:  inputs, selects, checkboxes  */

/* CORRECT — minimum text colours below 18.66px. */
--color-text-muted:       var(--color-ink-500); /* was ink-400 */
--color-text-placeholder: var(--color-ink-400); /* was ink-300 */

/* ADD — states the system currently has no answer for. */
--color-success: var(--color-brand-700);
--color-error:   #9a2b1e;   /* ≥4.5:1 on white, reads as earth, not generic red */
--color-warning: var(--color-saffron-700);
```

### Typography — close the nine-size gap

Keep `text-display` / `h1` / `h2` / `h3` / `lead` / `eyebrow` exactly as they are. Add the missing body tier so the nine arbitrary values have somewhere to go:

```css
@utility text-body    { font-size: 0.95rem;  line-height: 1.65; }  /* default copy */
@utility text-body-sm { font-size: 0.875rem; line-height: 1.6;  }  /* card bodies  */
@utility text-caption { font-size: 0.8rem;   line-height: 1.5;  }  /* hints, notes */
```

Then migrate `text-[0.84rem]`, `[0.86rem]`, `[0.88rem]`, `[0.9rem]`, `[0.92rem]`, `[0.94rem]`, `[0.95rem]`, `[0.98rem]`, `[1.02rem]` onto these three.

### Spacing, radius, shadow, grid — no change needed

| Token | Current | Verdict |
|---|---|---|
| `section-y` | 4.5 / 6 / 7rem | Keep |
| `shell` / `shell-wide` / `shell-narrow` | 82 / 92 / 48rem | Keep |
| Gutters | 1.25 / 2 / 2.5rem | Keep |
| Radius | `xl` controls, `2xl` cards, `squircle` (28%) tiles, `full` buttons | Keep — the percentage radius is a good idea |
| Shadows | Negative-spread only, brand-tinted | Keep — better than default Tailwind |
| Breakpoints | Tailwind defaults | Keep, but **add an `lg`-range audit pass** — 1024–1279px is under-served |

### Components — additions the system is missing

```
Button:      + disabled variant, + loading state (needed once forms POST)
Input:       + hairline-strong border, + aria-describedby, + text error slot,
             + visible focus on sr-only proxies
Tabs:        + arrow-key navigation, + roving tabindex, + focusable panel
Carousel:    + keyboard controls, + aria-live region
Badge:       formalise — currently inlined at ~6 call sites
Breadcrumb:  new — only ProductDetailPage has one
Empty state: formalise — currently ad-hoc
```

### Motion — the architecture is right, the enforcement is not

Keep `--ease-entrance` / `--ease-standard` / `--ease-expressive`, one `Reveal`, `once: true`, and the three-level CSS reduced-motion structure. Then:

1. `<MotionConfig reducedMotion="user">` — makes level 1 actually reach framer-motion
2. Delete `lib/animations.ts` (12 dead exports) or adopt it; do not ship both vocabularies
3. Align `Reveal`'s `viewport.amount` to `"some"` per that file's own documented reasoning
4. Cap `fx` layers at 2–3 sections per page
5. Fire `text-shine` once on entry rather than looping at 4.2s forever

---

## 19. Content & UX Copy Audit

### What is already good — keep verbatim
- *"Feed the soil. The crop follows."*
- *"No chemical fertiliser. No chemical crop protection. Twenty-one organic inputs, one job."*
- *"Anyone can sell a bag. This is a whole method."*
- *"Don't take our word. Take theirs."*
- *"Not laboratory numbers — the differences you can see standing at the edge of your own field."*
- *"Start with one field, one season."*
- Every one of the ten problem statements
- The founder's letter, in full

This is well above sector-standard copy. The problems below are structural, not stylistic.

### Unclear headings

| Current | Problem | Suggested |
|---|---|---|
| "Meditation" (Method, principle 03) | Means "watch the daily video, read, talk to another farmer". Misleads even with the gloss. | Lead with **"Learning, every day"**; set *SCT calls this Meditation* as the subtitle. Same treatment for Method/Rule. |
| "Two ranges, one foundation." | Doesn't tell me which I need. | Keep, then add a decision line: *"New to SCT? Start with Vedic. Already running the full system? Super adds targeted correction."* |
| "Look at the evidence." (Gallery) | Photographs are illustration, not evidence. Overclaims. | **"See the fields for yourself."** |
| "Which of these is you?" (Careers) | Good line, wrong page name. | Keep the line; rename the page. |

### Weak headlines
- **"Your soil is waiting."** (final CTA) — pleasant but empty. → **"One field. One season. That's all it takes to judge it."** Promotes the risk-reduction line into the headline, where it does work.
- **"Questions we get asked most"** → **"Before you call"** already sits above it as the eyebrow and is the better line. Swap them.

### Long paragraphs
- The founder's letter — 450 words, no breaks. Keep every word; add 2–3 pull-quotes.
- The ISO paragraph — two dense sentences of corporate register ("efficiently satisfy the growing food, fuel and fodder demands driven by social and economic development") in a site that otherwise speaks plainly. This is the one place the voice breaks.

### Generic marketing language
Rare, and confined to inherited copy:
- *"a leading biotech company"* — unsupported superlative
- *"eco-friendly products and services"* — says nothing the rest of the site doesn't say better

### Repetitive content
- `<ContactCta />` verbatim on 9 pages
- Category and product pages are near-identical
- The founder quote in `WhySct` duplicates a line from the `/about` letter

### Missing information
Price, dealer locations, timeline to visible change, crop suitability, compatibility with existing practice, guarantee/return policy, where form data goes, opening hours, current ISO revision.

### Weak CTAs

| Current | Problem | Suggested |
|---|---|---|
| "Submit" (contact form) | Says nothing about what happens | **"Send on WhatsApp"** — accurate, and sets the expectation |
| "Open the form" ×4 | Describes the mechanism, not the outcome | **"Ask about a product"**, **"Start an export enquiry"** |
| "See our fields on YouTube" | First CTA on the page, sends the visitor away | **"See what changes in the field ↓"** (in-page anchor) |
| "View products" (category card) | Vague | **"See packs & dosage"** |
| "Go to the application" | Bureaucratic | **"Apply to distribute"** |

### Confusing terminology needing a one-line gloss on first use
`organic carbon` · `mycorrhiza` · `SAR` · `PGR` · `basal dose` · `drenching` · `100% SCT` · `Saptapadi` · `SCT Vedic vs Super`

### Suggested replacement copy — three highest-impact spots

**Hero (keep the headline; tighten the sub-line):**
> **Feed the soil. The crop follows.**
> Twenty-one organic inputs that rebuild organic carbon and feed the crop naturally — no chemical fertiliser, no chemical crop protection. Working on Indian soil since 2015.

**Products — insert directly under the two range cards:**
> **Not sure which range?** Start with **SCT Vedic** — it is the full system, and it is where nearly every SCT farmer begins. Add **Super** when a specific problem needs targeted correction. Call us and we will tell you which your field needs.

**Final CTA — replace "Your soil is waiting.":**
> **One field. One season.**
> That is how nearly every SCT farmer started, and it is the only honest way to judge it. Pick your worst plot, run the full method for one season, and compare it to the rest yourself.

---

## 20. Final Report

### A. What is already working
- IA reasoning, and the discipline of documenting *why* each decision was made
- The Problem → Pillars → Method sequence — a genuine sector differentiator
- Content provenance: invented testimonials removed, unverified content flagged, a truncated source sentence dropped rather than completed
- A small, coherent, well-built design system
- Modal accessibility: portal, focus trap, focus restore, Lenis-aware scroll lock
- Video gating: poster-first, idle-deferred, Save-Data and reduced-motion aware
- Dead-YouTube-thumbnail detection by response width
- Alt-text discipline and stretched-link accessible names
- Route splitting, vendor chunking, thumbnail-only video grid, a hand-built lightbox instead of a 40–60 KB library
- Dosage published before the click — no benchmarked competitor does this
- Dark-ground colour contrast, verified at the bright end of every gradient

### B. What needs improvement
Primary action contrast · reduced-motion enforcement · mobile above-the-fold priority · image and video weight · first paint and link previews · form capture and validation · social proof depth · crop-based discovery · tablet breakpoint coverage · form field consistency · type-scale adherence

### C. What should be removed
- The two sample testimonials
- The dosage marquee animation (keep the dosage)
- `lib/animations.ts` (12 dead exports) and `RevealGroup`
- Lenis and its four files of workarounds
- Three of the four foreign Tailwind accent hues in `Benefits`
- Two of the three offsite YouTube CTAs above the product section
- `fx` layers on all but 2–3 sections per page

### D. What should be added
Prerendering · SPA fallback · `robots.txt` + `sitemap.xml` · analytics · a form backend · crop finder + crop pages · case studies · dealer locator · breadcrumbs + `BreadcrumbList` · dosage calculator · authored Marathi/Hindi content · text error messages · loading/disabled button states · a glossary for the nine agronomy terms · opening hours · a privacy note at each form

### E. What should be redesigned
- **Homepage section order** — hero first, video band lower, crop finder and case studies inserted
- **The Proof section** — real quotes with gloss, crop, village and photograph; keyboard-operable slider
- **The category card** — static dosage chips replacing the marquee
- **The distributor application** — stepped, with progress, per-step validation and save-and-resume
- **`/contact`** — onto the shared form primitives, with a success state
- **The tablet breakpoint** across `Benefits`, `Products` and `Header`

### F. What should be prioritised
**Week 1 — correctness and compliance.** The six critical items: SPA fallback, `MotionConfig`, button contrast, `PHONE_PATTERN`, delete sample testimonials, swap hero/video order. Every one is hours, not days.

**Weeks 2–3 — reach.** Prerendering and image compression. These two are what let the existing good work reach the intended audience.

**Weeks 4–6 — conversion.** Form backend, analytics, crop finder.

**Ongoing — trust.** Case studies, the ISO revision, authored translations. Blocked on the client, so start the content requests now.

### G. Recommended 2026 design direction

**Keep the visual direction. Change the delivery.**

The design language is already current and, more importantly, *appropriate* — it is restrained where the audience needs clarity and expressive only where attention is free. Do not chase bento grids, heavier glass or more motion. The gap between this site and a top-tier 2026 site is not visual; it is that a 2026 site for rural mobile users ships server-rendered HTML, compresses its images, captures its leads, honours `prefers-reduced-motion`, and passes AA on its primary action.

The strategic direction that would actually differentiate SCT: **stop presenting a catalogue and start presenting a system.** Crop finder, dosage calculator, seasonal calendar, and the daily-video community made public. The Problem section and the third principle are assets no competitor has. Build outward from those two.

### H. Recommended user journey

```
WhatsApp forward / search
   ↓  (prerendered HTML — content visible in ~1s, correct link preview)
Hero: category + proposition + primary CTA, above the fold on every device
   ↓
Problem: "that's my field"
   ↓
Field video: "and these are real people"
   ↓
Pillars + Method: "and this is a coherent system"
   ↓
Crop finder: "here is what it means for pomegranate"              ← NEW
   ↓
Products: the specific packs, with readable dosage
   ↓
Benefits + Why SCT: what changes, and why not the next shop
   ↓
Proof + case studies: named farmers, named villages, real periods  ← EXPANDED
   ↓
Risk reduction: "one field, one season"                            ← PROMOTED
   ↓
Action: Call · WhatsApp · Distributor — captured by a real endpoint ← FIXED
```

### I. Recommended homepage structure
See §17.

### J. Top 10 actions, in order

| # | Action | Effort | Why first |
|---|---|---|---|
| 1 | Add SPA fallback (`_redirects` / `vercel.json` / `.htaccess`) | 15 min | Until this ships, every shared product link 404s. Nothing else matters if the page doesn't load. |
| 2 | `<MotionConfig reducedMotion="user">` | 5 min | One line closes the largest accessibility failure on the site. |
| 3 | Primary button → `brand-700`, hover → `brand-800` | 30 min | Fixes WCAG AA on every CTA, and stops hover *reducing* contrast. |
| 4 | Fix `PHONE_PATTERN` | 5 min | Validation is currently dead on all six forms and fails silently. |
| 5 | Delete the two sample testimonials | 5 min | Fabricated social proof on a commercial site is a real risk, and the only guard is a comment. |
| 6 | Swap `<Hero />` above `<FieldVideo />` | 5 min | Fixes the mobile fold, the heading order, and stops the first CTA leaving the site. |
| 7 | Prerender static routes | 1–2 days | Fixes first paint for rural mobile *and* WhatsApp link previews — the primary distribution channel. |
| 8 | Build-time responsive images | 1–2 days | 26 MB → under 4 MB. The largest remaining performance cost. |
| 9 | Replace the dosage marquee with static chips | 2 hours | Resolves WCAG 2.2.2 and makes dosage actually readable — its stated purpose. |
| 10 | Add analytics with conversion events | 1 day | Nothing above can be validated without it. Ship it alongside the fixes, not after. |

**Then, immediately after:** the form backend (#34 in §16) and the crop finder (#35). Those two are the largest remaining conversion levers, and both are blocked only by effort, not by client input.

---

*Audit based on source inspection of the `redesign` branch, measurement of the committed `dist/` build, and computed WCAG 2.x contrast ratios. File and line references are to the state of the branch on 2026-09-24.*
