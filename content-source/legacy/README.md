# Legacy content source

Structured extraction of every product and article on
`soilchargertechnology.com`, captured **2026-09-18**.

These files are the provenance record for the rebuild: everything in
`src/data/` is generated from them by `npm run generate:content`, so any claim
in the new site can be traced back to a real page on the old one.

| File | Contents |
|---|---|
| `products.json` | 21 products from `/sub-product/{id}` |
| `articles.json` | 21 articles from `/sub-blogs?id={id}` |

Extraction scripts live in `scripts/legacy-extract/` and are re-runnable.

## Known gaps in the source

- **All 42 referenced images return HTTP 404.** The legacy media host
  (`finalapi.soilchargertechnology.com`) serves no files at all — the live site
  is currently rendering broken images sitewide. No dimensions could be
  measured, so every image ships as a placeholder awaiting client-supplied
  originals.
- Products `125` (SCT Vedic Milk Charger) and `134` (SCT Vedic Energy Booster)
  have empty bodies on the live site — a single `.` character.
- No product carries NPK, pH, EC, CFU or shelf-life data.
- No article carries a publish date.
- 10 of 21 articles are in Marathi and their titles do not yield usable ASCII
  slugs; those are flagged `slugNeedsReview`.
