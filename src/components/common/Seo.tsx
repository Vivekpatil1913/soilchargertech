import { useEffect } from "react";

import { site } from "@/data/site";
import { SEO_DEFAULTS, SITE_URL } from "@/lib/constants";

/**
 * PER-PAGE HEAD TAGS
 * ==================
 * Written directly rather than with react-helmet-async, which still declares a
 * React 18 peer range and will not install against React 19. The job is small:
 * set a title, upsert a handful of meta and link tags, swap one JSON-LD block.
 *
 * Tags carry `data-sct-seo` so each route clears exactly what the previous one
 * added, without touching the fallback tags in index.html.
 *
 * HONEST LIMITATION
 * -----------------
 * This runs after React mounts, so a crawler that does not execute JavaScript
 * sees only index.html's fallbacks. Google renders JS and picks these up; many
 * social-preview scrapers do not. If WhatsApp link previews matter — and for
 * this audience they almost certainly do — the fix is prerendering at build
 * time, not more tags here. Tracked in docs/README.md.
 */

const MARKER = "data-sct-seo";

type SeoProps = {
  title?: string;
  description?: string;
  /** Path only, e.g. "/products". */
  path?: string;
  image?: string;
  /** Use the title exactly as given, with no site-name suffix. */
  bareTitle?: boolean;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function setTag(tag: "meta" | "link", attrs: Record<string, string>) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  el.setAttribute(MARKER, "");
  document.head.appendChild(el);
}

export function Seo({
  title,
  description = SEO_DEFAULTS.description,
  path = "/",
  image = "/logo/soillogo.jpg",
  bareTitle = false,
  noindex = false,
  jsonLd,
}: SeoProps) {
  // Objects are new on every render; serialise so the effect depends on value,
  // not identity, and does not thrash <head> each frame.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const fullTitle = !title
      ? SEO_DEFAULTS.title
      : bareTitle
        ? title
        : SEO_DEFAULTS.titleTemplate.replace("%s", title);

    const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
    const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;
    document.head.querySelectorAll(`[${MARKER}]`).forEach((el) => el.remove());

    setTag("meta", { name: "description", content: description });
    setTag("link", { rel: "canonical", href: canonical });
    if (noindex) setTag("meta", { name: "robots", content: "noindex, nofollow" });

    setTag("meta", { property: "og:type", content: "website" });
    setTag("meta", { property: "og:site_name", content: site.name });
    setTag("meta", { property: "og:locale", content: site.locale });
    setTag("meta", { property: "og:title", content: fullTitle });
    setTag("meta", { property: "og:description", content: description });
    setTag("meta", { property: "og:url", content: canonical });
    setTag("meta", { property: "og:image", content: absoluteImage });

    setTag("meta", { name: "twitter:card", content: "summary_large_image" });
    setTag("meta", { name: "twitter:title", content: fullTitle });
    setTag("meta", { name: "twitter:description", content: description });
    setTag("meta", { name: "twitter:image", content: absoluteImage });

    if (jsonLdKey) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = jsonLdKey;
      script.setAttribute(MARKER, "");
      document.head.appendChild(script);
    }
  }, [title, description, path, image, bareTitle, noindex, jsonLdKey]);

  return null;
}
