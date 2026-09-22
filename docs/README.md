# SCT Redesign — Reference Docs

Content and research reference for the soilchargertechnology.com redesign.
Read these before making IA, copy or design decisions.

| File | What's in it |
|---|---|
| [site-structure.md](site-structure.md) | **The build.** Routes, the eleven home bands and what each answers, design tokens, the motion system, component map, content provenance, known limitations and deploy notes. |
| [sct-legacy-content.md](sct-legacy-content.md) | **Start here.** Complete content inventory of the old site — site map, all copy verbatim, vision/mission, founder's letter, all 21 products with dosage & packing, counters, testimonials, team, 102 image URLs, 51 YouTube IDs, all 6 forms, and a list of 15 content gaps that need client input. |
| [sct-legacy-blog-archive.md](sct-legacy-blog-archive.md) | Full text of all 21 blog articles (11 English, 10 Marathi), scraped end to end. |
| [agrostar-benchmark.md](agrostar-benchmark.md) | Page-by-page teardown of corporate.agrostar.in — how they structure pages, how they present product without a catalog, and what to take vs. what to avoid. Also holds the full competitor tier list and the 8-site benchmark plan. |
| [design-reference-ngn.md](design-reference-ngn.md) | **The design standard.** Teardown of ngn.sumagodemo.com — the three-family palette with full ramps, the Fraunces/Inter/Devanagari pairing, the gold rule and edge marks, border-first elevation, the tight section rhythm, the three-keyframe motion system, and a table of what SCT took from it and what it deliberately did not. |
| [design-reference-scope.md](design-reference-scope.md) | *Superseded — on record only.* Teardown of scope.org.in (Sumago's own EdTech brand) — the 7-token palette, all 9 CSS keyframes incl. the gradient text-shine and drifting-orb backgrounds, full product-card anatomy, shadow/hover/type token tables. Everything is CSS, no animation library. |
| [design-reference-sumago.md](design-reference-sumago.md) | *Superseded — on record only.* Teardown of sumagoinfotech.com — the parent brand, same studio, **far deeper motion system** (70+ keyframes, `fx-*` composable background utilities, motion/easing tokens, masked line reveal, 3-level reduced-motion). Includes a Sumago-vs-SCOPE table saying which model SCT should follow on each dimension. |

All written 2026-09-21. The site was rebuilt from scratch on React + Vite the
same day, then redesigned against the NGN reference — same stack and same
content, new design system throughout.

## Still to do

- Teardown of the remaining benchmark sites: UPL, Coromandel, IFFCO, IPL Biologicals, Aries Agro, Biostadt, Swaroop Agro Sciences.
- Resolve the 15 content gaps in §16 of `sct-legacy-content.md` with the client.
- Pull real titles for the 51 YouTube videos.
