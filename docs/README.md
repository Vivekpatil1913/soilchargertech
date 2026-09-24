# SCT Redesign — Reference Docs

Content and research reference for the soilchargertechnology.com redesign.
Read these before making IA, copy or design decisions.

| File | What's in it |
|---|---|
| [ux-audit-2026.md](ux-audit-2026.md) | **Full UI/UX audit of the redesign branch** (2026-09-24). 20 sections: executive summary, first-time-user journey, 2026 trend assessment, visual/IA/section-by-section/page-by-page audits, conversion psychology, accessibility with computed WCAG ratios, responsive, interaction, performance with measured bundle and asset weights, trust, competitor expectations, prioritised issue table, quick wins vs major work, recommended homepage structure, design-system corrections, copy audit, and a top-10 action list. |
| [site-structure.md](site-structure.md) | **The build.** Routes, the nine home sections and what each answers, design tokens sampled from the logo, the motion system, component map, content provenance, known limitations and deploy notes. |
| [sct-legacy-content.md](sct-legacy-content.md) | **Start here.** Complete content inventory of the old site — site map, all copy verbatim, vision/mission, founder's letter, all 21 products with dosage & packing, counters, testimonials, team, 102 image URLs, 51 YouTube IDs, all 6 forms, and a list of 15 content gaps that need client input. |
| [sct-legacy-blog-archive.md](sct-legacy-blog-archive.md) | Full text of all 21 blog articles (11 English, 10 Marathi), scraped end to end. |
| [agrostar-benchmark.md](agrostar-benchmark.md) | Page-by-page teardown of corporate.agrostar.in — how they structure pages, how they present product without a catalog, and what to take vs. what to avoid. Also holds the full competitor tier list and the 8-site benchmark plan. |
| [design-reference-scope.md](design-reference-scope.md) | **Design & motion standard.** Teardown of scope.org.in (Sumago's own EdTech brand) — the 7-token palette, all 9 CSS keyframes incl. the gradient text-shine and drifting-orb backgrounds, full product-card anatomy, shadow/hover/type token tables. Everything is CSS, no animation library. |
| [design-reference-sumago.md](design-reference-sumago.md) | Teardown of sumagoinfotech.com — the parent brand, same studio, **far deeper motion system** (70+ keyframes, `fx-*` composable background utilities, motion/easing tokens, masked line reveal, 3-level reduced-motion). Includes a Sumago-vs-SCOPE table saying which model SCT should follow on each dimension. |

All written 2026-09-21. The site was rebuilt from scratch on React + Vite the same day.

## Still to do

- Teardown of the remaining 7 benchmark sites: UPL, Coromandel, IFFCO, IPL Biologicals, Aries Agro, Biostadt, Swaroop Agro Sciences.
- Resolve the 15 content gaps in §16 of `sct-legacy-content.md` with the client.
- Pull real titles for the 51 YouTube videos.
