// AUTO-GENERATED — DO NOT EDIT BY HAND.
// Regenerate: npm run generate:content
//
// 301 map from the legacy Laravel site. Consumed by middleware.ts.

/** Exact-path redirects. */
export const pathRedirects = new Map<string, string>([
  // Consolidated: three thin pages that duplicated each other and the homepage.
  ['/about-us', '/about'],
  ['/vision-mission', '/about'],
  ['/our-team', '/about/leadership'],
  ['/index.php', '/'],
  // Renamed sections.
  ['/blogs', '/resources/articles'],
  ['/photo-gallery', '/gallery'],
  ['/sub-photo-gallery', '/gallery'],
  // "vedio" is the legacy spelling, live in production.
  ['/vedio-gallery', '/resources/videos'],
  ['/sub-vedio-gallery', '/resources/videos'],
  // Product detail: numeric id -> slug.
  ['/sub-product/88', '/products/super-soil-charger'],
  ['/sub-product/92', '/products/super-fruit-charger'],
  ['/sub-product/95', '/products/super-crop-charger'],
  ['/sub-product/97', '/products/super-flower-charger'],
  ['/sub-product/99', '/products/super-size-charger'],
  ['/sub-product/101', '/products/super-water-charger'],
  ['/sub-product/104', '/products/super-plant-fighter'],
  ['/sub-product/107', '/products/super-plant-cleaner'],
  ['/sub-product/111', '/products/sct-vedic-nutri-charger'],
  ['/sub-product/113', '/products/sct-vedic-root-charger'],
  ['/sub-product/115', '/products/sct-vedic-health-charger'],
  ['/sub-product/116', '/products/sct-vedic-leaf-charger'],
  ['/sub-product/117', '/products/sct-vedic-setting-charger'],
  ['/sub-product/118', '/products/sct-vedic-quality-charger'],
  ['/sub-product/124', '/products/sct-vedic-plant-charger'],
  ['/sub-product/125', '/products/sct-vedic-milk-charger'],
  ['/sub-product/127', '/products/sct-vedic-health-fighter'],
  ['/sub-product/134', '/products/sct-vedic-energy-booster'],
  ['/sub-product/178', '/products/sct-vedic-shakti'],
  ['/sub-product/179', '/products/vedic-samrat'],
  ['/sub-product/180', '/products/vedic-miracle'],
])

/** `/sub-blogs?id=N` -> article slug. */
export const articleIdRedirects = new Map<number, string>([
  [2, '/resources/articles/what-is-soil-charger-technology'],
  [3, '/resources/articles/bacteria-are-the-soul-of-agriculture'],
  [12, '/resources/articles/article-12'],
  [14, '/resources/articles/article-14'],
  [15, '/resources/articles/article-15'],
  [16, '/resources/articles/article-16'],
  [17, '/resources/articles/article-17'],
  [32, '/resources/articles/article-32'],
  [33, '/resources/articles/article-33'],
  [34, '/resources/articles/article-34'],
  [63, '/resources/articles/article-63'],
  [64, '/resources/articles/article-64'],
  [75, '/resources/articles/is-our-soil-healthy'],
  [76, '/resources/articles/death-of-agriculture'],
  [77, '/resources/articles/india-s-agricultural-imports-exports-trends-insights'],
  [113, '/resources/articles/india-s-agriculture-revolution-a-vibrant-tale-of-transformation'],
  [128, '/resources/articles/can-mine-coal-or-wood-ash-be-used-for-carbon'],
  [129, '/resources/articles/cancer'],
  [130, '/resources/articles/chemical-used-in-flowering'],
  [131, '/resources/articles/waste-decomposer'],
  [133, '/resources/articles/grape-farming'],
])
