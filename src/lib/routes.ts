/* Relative, not the `@/` alias: vite.config.ts imports this file to emit the
   sitemap and the per-route HTML shells, and the config is bundled by esbuild
   before the alias exists. */
import { articles } from "../data/knowledge";
import { categories, productRanges } from "../data/products";
import { site } from "../data/site";

/**
 * EVERY CRAWLABLE URL ON THE SITE, WITH ITS METADATA
 * ==================================================
 * Derived from the same data the router renders, so a category added to
 * products.ts or an article added to knowledge.ts appears in the sitemap and
 * gets its own HTML shell without anybody remembering a second list.
 *
 * WHY THE TITLES AND DESCRIPTIONS LIVE HERE TOO
 * ---------------------------------------------
 * components/common/Seo.tsx sets them at runtime, in a `useEffect` — which is
 * after mount, and therefore after every scraper that does not execute
 * JavaScript has already given up. That file says so itself. WhatsApp's link
 * preview is one of those scrapers, and WhatsApp is how this audience actually
 * shares things: every product link forwarded to a farmer was previewing with
 * the generic home page title and the company logo.
 *
 * So the same facts are stated once here, and vite.config.ts bakes them into a
 * static HTML shell per route at build time. Seo.tsx still runs and still wins
 * for a client-side navigation; this is purely what the first byte says.
 *
 * `/privacy` and `/terms` are included because they are real pages a crawler
 * should see. `/404` is not — NotFoundPage sets `noindex` itself.
 */

export type SiteRoute = {
  path: string;
  title: string;
  description: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
};

const STATIC_ROUTES: SiteRoute[] = [
  {
    path: "/",
    title: "Soil Charger Technology — Feed the soil, the crop follows",
    description: `Organic soil inputs from Nashik since ${site.founded}. 21 products across the SCT Vedic and Super ranges — built to rebuild organic carbon, strengthen roots and feed crops naturally, with no chemical fertiliser.`,
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    path: "/products",
    title: "Products | Soil Charger Technology",
    description:
      "21 product categories across two ranges — SCT Vedic and Super. Soil chargers, root chargers, crop nutrition and natural crop protection, with published dosage and pack sizes.",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/technology",
    title: "The Technology | Soil Charger Technology",
    description:
      "The four pillars, the science underground, and the three principles that make up SCT Vedic — nourishment before disease, soil before climate, humus before substitutes.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/about",
    title: "About Soil Charger Technology",
    description: `Founded in Nashik in ${site.founded} by ${site.founder}. How SCT moved from organic carbon to SCT Vedic — a decade of work on Indian soil, in the founder's own words.`,
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/knowledge",
    title: "Knowledge Centre | Soil Charger Technology",
    description:
      "Soil health explained simply — organic carbon, mycorrhiza, crop nutrition and natural crop protection, written for farmers working Indian soil.",
    changefreq: "weekly",
    priority: 0.7,
  },
  {
    path: "/gallery",
    title: "Gallery | Soil Charger Technology",
    description:
      "Photographs from the fields and films of the farmers themselves — every one shot on real land, not in a studio.",
    changefreq: "weekly",
    priority: 0.6,
  },
  {
    path: "/careers",
    title: "Careers | Soil Charger Technology",
    description:
      "Work with Soil Charger Technology — internships, distributor partnerships and job openings across India. Apply from Nashik, Maharashtra.",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    path: "/contact",
    title: "Contact | Soil Charger Technology",
    description:
      "Talk to Soil Charger Technology — Nashik, Maharashtra. Call, WhatsApp or ask about products, dealership or guidance for your crop.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Soil Charger Technology",
    description: "How Soil Charger Technology handles the information you send us.",
    changefreq: "yearly",
    priority: 0.2,
  },
  {
    path: "/terms",
    title: "Terms & Conditions | Soil Charger Technology",
    description: "The terms under which Soil Charger Technology provides this website.",
    changefreq: "yearly",
    priority: 0.2,
  },
];

export function allRoutes(): SiteRoute[] {
  const categoryRoutes: SiteRoute[] = categories.map((category) => ({
    path: `/products/${category.slug}`,
    title: `${category.name} | Soil Charger Technology`,
    description: `${category.summary} Part of the ${productRanges[category.range].name} range from Soil Charger Technology.`,
    changefreq: "monthly",
    priority: 0.8,
  }));

  const productRoutes: SiteRoute[] = categories.flatMap((category) =>
    category.skus.map((sku) => ({
      path: `/products/${category.slug}/${sku.slug}`,
      title: `${sku.name} | Soil Charger Technology`,
      description: `${category.summary}${sku.pack ? ` Available in ${sku.pack}.` : ""} Part of the ${productRanges[category.range].name} range from Soil Charger Technology.`,
      changefreq: "monthly" as const,
      priority: 0.6,
    })),
  );

  const articleRoutes: SiteRoute[] = articles.map((article) => ({
    path: `/knowledge/${article.slug}`,
    title: `${article.title} | Soil Charger Technology`,
    description: article.excerpt,
    changefreq: "monthly",
    priority: 0.5,
  }));

  return [...STATIC_ROUTES, ...categoryRoutes, ...productRoutes, ...articleRoutes];
}
