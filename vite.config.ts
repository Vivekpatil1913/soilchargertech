import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

import { site } from "./src/data/site";
import { imageManifest } from "./src/data/image-manifest";
import { allRoutes } from "./src/lib/routes";

/**
 * Drops the original JPEG/PNG sources from the build.
 *
 * Vite copies `public/` wholesale, so without this the 22 MB of originals ship
 * alongside the 14 MB of WebP derivatives generated from them — and nothing
 * requests the originals, because <Image> points both `src` and `srcSet` at
 * derivatives. They stay in the repo as the source of truth; they just do not
 * need deploying.
 *
 * Only files listed in the generated manifest are removed, so an image with no
 * derivative is always left alone. The one CSS-referenced image names its
 * derivative directly — see the field haze in Benefits.tsx.
 */
function pruneOriginals(): Plugin {
  return {
    name: "sct-prune-originals",
    apply: "build",
    async closeBundle() {
      const outDir = join(process.cwd(), "dist");
      let removed = 0;
      let bytes = 0;

      for (const original of Object.keys(imageManifest)) {
        const file = join(outDir, original.replace(/^\//, ""));
        try {
          bytes += (await stat(file)).size;
          await rm(file);
          removed += 1;
        } catch {
          /* Not in the build — nothing to do. */
        }
      }

      this.info(`pruned ${removed} originals from dist (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
    },
  };
}

/**
 * Writes a static HTML shell for every route, with that route's own metadata.
 *
 * WHAT THIS FIXES
 * ---------------
 * The app is client-rendered and components/common/Seo.tsx sets the title, the
 * description, the canonical and the Open Graph tags in a `useEffect` — after
 * mount. Anything that does not execute JavaScript therefore saw only the
 * fallbacks in index.html. WhatsApp's link scraper is one of those things, and
 * WhatsApp is how this audience shares things: every product link forwarded to
 * a farmer previewed as the generic home page.
 *
 * So each route gets `dist/<path>/index.html` — the same shell, the same
 * bundles, but with its own <title>, description, canonical and OG tags
 * already in the markup. Seo.tsx still runs and still owns client-side
 * navigation; this is only what the first byte says.
 *
 * It also means deep links resolve as real files, so they work even on a host
 * with no SPA fallback configured. The fallback configs stay as the safety net
 * for anything not enumerated here.
 *
 * WHAT THIS DOES NOT FIX
 * ----------------------
 * First paint. The <body> is still an empty #root and the page is still blank
 * until ~190 KB gz of JavaScript executes. Rendering the actual markup needs
 * real SSG, and there is a specific blocker to solve first: <Reveal> sets
 * `initial="hidden"`, so a naive renderToString emits every section at
 * opacity 0 and the static HTML would be invisible. See docs/ux-audit-2026.md.
 */
function routeShells(): Plugin {
  return {
    name: "sct-route-shells",
    apply: "build",
    async closeBundle() {
      const origin = (process.env.VITE_SITE_URL ?? site.url).replace(/\/$/, "");
      const outDir = join(process.cwd(), "dist");
      const shell = await readFile(join(outDir, "index.html"), "utf8");
      const image = `${origin}/logo/soillogo.jpg`;

      const esc = (value: string) =>
        value
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");

      let written = 0;

      for (const route of allRoutes()) {
        const canonical = `${origin}${route.path === "/" ? "/" : route.path}`;

        const head = [
          `<link rel="canonical" href="${esc(canonical)}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:site_name" content="${esc(site.name)}" />`,
          `<meta property="og:locale" content="${esc(site.locale)}" />`,
          `<meta property="og:title" content="${esc(route.title)}" />`,
          `<meta property="og:description" content="${esc(route.description)}" />`,
          `<meta property="og:url" content="${esc(canonical)}" />`,
          `<meta property="og:image" content="${esc(image)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${esc(route.title)}" />`,
          `<meta name="twitter:description" content="${esc(route.description)}" />`,
          `<meta name="twitter:image" content="${esc(image)}" />`,
        ].join("\n    ");

        const html = shell
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
          .replace(
            /<meta\s+name="description"[\s\S]*?\/>/,
            `<meta name="description" content="${esc(route.description)}" />`,
          )
          .replace("</head>", `  ${head}\n  </head>`);

        const target =
          route.path === "/"
            ? join(outDir, "index.html")
            : join(outDir, route.path.replace(/^\//, ""), "index.html");

        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, html, "utf8");
        written += 1;
      }

      this.info(`${written} route shells written with per-route metadata`);
    },
  };
}

/**
 * Emits sitemap.xml and robots.txt at build time.
 *
 * The site had neither, and it is a client-rendered SPA whose product tree is
 * three levels deep behind a JavaScript-rendered grid — so roughly forty URLs
 * had no discovery path at all. The list comes from src/lib/routes.ts, which
 * derives it from the same data the router renders, so it cannot drift.
 */
function seoFiles(): Plugin {
  return {
    name: "sct-seo-files",
    apply: "build",
    async closeBundle() {
      const origin = (process.env.VITE_SITE_URL ?? site.url).replace(/\/$/, "");
      const today = new Date().toISOString().slice(0, 10);
      const outDir = join(process.cwd(), "dist");

      const urls = allRoutes()
        .map(
          (route) =>
            `  <url>\n` +
            `    <loc>${origin}${route.path === "/" ? "/" : route.path}</loc>\n` +
            `    <lastmod>${today}</lastmod>\n` +
            `    <changefreq>${route.changefreq}</changefreq>\n` +
            `    <priority>${route.priority.toFixed(1)}</priority>\n` +
            `  </url>`,
        )
        .join("\n");

      await writeFile(
        join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        "utf8",
      );

      await writeFile(
        join(outDir, "robots.txt"),
        [
          "User-agent: *",
          "Allow: /",
          "",
          "# The SPA fallback serves index.html for unknown paths, so a crawler",
          "# that follows a stale link gets the 404 page rather than a server error.",
          "Disallow: /404",
          "",
          `Sitemap: ${origin}/sitemap.xml`,
          "",
        ].join("\n"),
        "utf8",
      );

      this.info(`sitemap.xml written with ${allRoutes().length} URLs, robots.txt written`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), routeShells(), seoFiles(), pruneOriginals()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    // Farmers open this on rural mobile connections. Splitting the vendor
    // bundle lets the shell paint while the heavier motion library streams in.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
