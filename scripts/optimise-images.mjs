/**
 * RESPONSIVE IMAGE PIPELINE
 * =========================
 * Next.js used to do this at request time. When the site moved to Vite that
 * pipeline went away and nothing replaced it, so `public/images` was shipping
 * 26 MB of full-resolution JPEG and PNG — single files up to 2.1 MB — to an
 * audience the whole codebase describes as being on rural mobile data. Worse,
 * seventeen `sizes` props were still being passed to <Image>, and `sizes`
 * without a matching `srcSet` does nothing at all, so they were inert.
 *
 * This walks every raster source under public/images and emits WebP
 * derivatives beside it at the widths a phone, a tablet and a laptop actually
 * ask for, skipping any width larger than the source. It then writes
 * src/data/image-manifest.ts, which the <Image> shim reads to build a real
 * srcSet automatically — so no call site has to change and no future image can
 * be added without one.
 *
 * ORIGINALS ARE NOT TOUCHED. They stay in the repo as the source of truth and
 * are simply not copied into the build; see `pruneOriginals` in vite.config.ts.
 *
 *   npm run images
 */

import { readdir, stat, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = join(ROOT, "public", "images");
const MANIFEST = join(ROOT, "src", "data", "image-manifest.ts");

/**
 * The widths worth generating, and the WebP quality each is encoded at.
 *
 * Quality falls as width rises on purpose. A 480px file is viewed at roughly
 * 1:1 on a phone, so compression artefacts are visible and it is also the
 * cheapest file to be generous with. A 1600px file is displayed scaled down on
 * almost every screen that asks for it, which hides a great deal — at q78 the
 * largest of these came out at 1.2 MB, which is no better than the original
 * JPEG it was meant to replace.
 */
const WIDTHS = [
  { width: 480, quality: 80 },
  { width: 768, quality: 76 },
  { width: 1200, quality: 70 },
  { width: 1600, quality: 64 },
];
const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png"]);

/** `-480.webp` and friends — so a rerun never treats its own output as input. */
const DERIVATIVE = /-(?:480|768|1200|1600)\.webp$/;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** "/images/farmers/farmer-woman.jpg" — always forward slashes, for the web. */
function publicPath(absolute) {
  return "/" + relative(join(ROOT, "public"), absolute).split(sep).join("/");
}

async function main() {
  const manifest = {};
  let generated = 0;
  let sourceBytes = 0;
  let outputBytes = 0;

  for await (const file of walk(IMAGES_DIR)) {
    const ext = extname(file).toLowerCase();
    if (!SOURCE_EXT.has(ext) || DERIVATIVE.test(file)) continue;

    const image = sharp(file);
    const { width: sourceWidth } = await image.metadata();
    if (!sourceWidth) continue;

    sourceBytes += (await stat(file)).size;

    const stem = join(dirname(file), basename(file, ext));
    const steps = WIDTHS.filter((step) => step.width <= sourceWidth);
    /* An image narrower than our smallest step still needs one derivative,
       otherwise it would have no srcSet entry at all. */
    if (steps.length === 0) steps.push({ width: sourceWidth, quality: 80 });

    for (const { width, quality } of steps) {
      const out = `${stem}-${width}.webp`;
      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toFile(out);
      outputBytes += (await stat(out)).size;
      generated += 1;
    }

    manifest[publicPath(file)] = {
      base: publicPath(stem),
      widths: steps.map((step) => step.width),
    };
  }

  const entries = Object.entries(manifest)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `  "${key}": { base: "${value.base}", widths: [${value.widths}] },`)
    .join("\n");

  await writeFile(
    MANIFEST,
    `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Written by scripts/optimise-images.mjs. Maps each original raster in
 * public/images to the WebP derivatives generated beside it, so the <Image>
 * shim can build a srcSet without any call site passing one.
 *
 * Regenerate after adding or replacing an image:  npm run images
 */

export type ImageVariants = {
  /** Path without extension, e.g. "/images/farmers/farmer-woman". */
  base: string;
  /** Widths generated, ascending. */
  widths: number[];
};

export const imageManifest: Record<string, ImageVariants> = {
${entries}
};
`,
    "utf8",
  );

  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(
    `${Object.keys(manifest).length} sources -> ${generated} derivatives\n` +
      `originals ${mb(sourceBytes)} MB  ->  derivatives ${mb(outputBytes)} MB`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
