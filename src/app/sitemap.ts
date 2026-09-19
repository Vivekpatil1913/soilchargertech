import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { products } from "@/data/products";
import { articles } from "@/data/knowledge";

/**
 * Generated from the same data the pages render, so a new product or article is
 * in the sitemap the moment it is added to src/data — nothing to remember.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{ path: string; priority: number; frequency: "weekly" | "monthly" | "yearly" }> = [
    { path: "", priority: 1, frequency: "weekly" },
    { path: "/about", priority: 0.9, frequency: "monthly" },
    { path: "/journey", priority: 0.7, frequency: "monthly" },
    { path: "/technology", priority: 0.9, frequency: "monthly" },
    { path: "/products", priority: 0.9, frequency: "weekly" },
    { path: "/applications", priority: 0.8, frequency: "monthly" },
    { path: "/farmer-stories", priority: 0.7, frequency: "monthly" },
    { path: "/knowledge", priority: 0.8, frequency: "weekly" },
    { path: "/contact", priority: 0.8, frequency: "monthly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.frequency,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/knowledge/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
