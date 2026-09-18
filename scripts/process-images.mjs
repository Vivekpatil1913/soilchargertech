/**
 * Processes the recovered media library into the site's image assets.
 *
 * The client's live media host serves nothing — all 68 assets return HTTP 404.
 * They were recovered from the Internet Archive's 2024-10-07 snapshot, so these
 * are the company's own photographs rather than stock substitutes.
 *
 * Input:  scratchpad/archive/raw/*   (recovered originals)
 * Output: public/images/{products,articles,gallery,about}/*.jpg
 *
 * On "HD": upscaling cannot invent detail that was never captured, so nothing
 * here is enlarged beyond its native size. What this does instead is deliver
 * every image at its best honest quality — stripped of metadata, colour-managed
 * to sRGB, capped at a sensible delivery width, and re-encoded with mozjpeg at
 * high quality. `next/image` then serves AVIF/WebP at the exact size each
 * layout slot needs.
 *
 * Run: npm run process:images
 */
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const RAW = process.env.RAW_DIR
if (!RAW) {
  console.error('Set RAW_DIR to the folder holding the recovered originals.')
  process.exit(1)
}

const OUT = join(root, 'public/images')

/** Delivery cap. Larger than any layout slot, so next/image always downsizes. */
const MAX_WIDTH = 1600
const MIN_USEFUL = 320

/** Legacy folder → destination folder. */
const BUCKETS = {
  product: 'products',
  blog: 'articles',
  gallaryphoto: 'gallery',
  coverphoto: 'about',
  aboutus: 'about',
  testimonials: 'about',
}

/**
 * Removes the transparent letterbox border around the packet photography.
 *
 * 9 of the 20 product images — the whole SCT Vedic packet range — are RGBA PNGs
 * with a fully transparent margin (alpha 0) around the artwork. On the legacy
 * site that was invisible. Here it turned into a solid black frame, because
 * flattening RGBA to JPEG composites onto black unless told otherwise.
 *
 * So there are two fixes, and both are needed: crop the transparent margin
 * away, and flatten what remains onto white rather than black.
 *
 * The bounding box is computed here rather than with sharp's `trim` because
 * `trim` stops early on these (the margin is not pixel-uniform) and leaves a
 * residual frame behind.
 */
async function trimTransparentBorder(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  const opaque = (x, y) => data[(y * width + x) * channels + 3] >= 24

  // Nothing to do when the edges are already opaque.
  const transparentEdges = [
    [2, height >> 1],
    [width - 3, height >> 1],
    [width >> 1, 2],
    [width >> 1, height - 3],
  ].filter(([x, y]) => !opaque(x, y)).length
  if (transparentEdges < 2) return { buffer: input, trimmed: false }

  let top = 0
  let bottom = height - 1
  let left = 0
  let right = width - 1

  const rowHasArt = (y) => {
    for (let x = 0; x < width; x++) if (opaque(x, y)) return true
    return false
  }
  const colHasArt = (x) => {
    for (let y = top; y <= bottom; y++) if (opaque(x, y)) return true
    return false
  }

  while (top < bottom && !rowHasArt(top)) top++
  while (bottom > top && !rowHasArt(bottom)) bottom--
  while (left < right && !colHasArt(left)) left++
  while (right > left && !colHasArt(right)) right--

  const w = right - left + 1
  const h = bottom - top + 1
  if (w < 32 || h < 32) return { buffer: input, trimmed: false }

  const buffer = await sharp(input)
    .extract({ left, top, width: w, height: h })
    .png()
    .toBuffer()

  return { buffer, trimmed: true }
}

const manifest = []
let trimmed = 0

// Clear each bucket first, so an image that stops qualifying (or gets renamed)
// cannot linger as a stale file the manifest no longer references.
for (const bucket of new Set(Object.values(BUCKETS))) {
  rmSync(join(OUT, bucket), { recursive: true, force: true })
  mkdirSync(join(OUT, bucket), { recursive: true })
}

const files = readdirSync(RAW).filter((f) => statSync(join(RAW, f)).size > 1000)

for (const file of files) {
  const [legacyFolder, ...rest] = file.split('_')
  const bucket = BUCKETS[legacyFolder]
  if (!bucket) {
    console.warn(`  skip (unknown bucket): ${file}`)
    continue
  }

  const source = join(RAW, file)

  // Strip any baked-in letterbox before measuring, so the recorded dimensions
  // describe the actual artwork.
  const cropped = await trimTransparentBorder(source)
  const working = cropped.buffer
  if (cropped.trimmed) trimmed += 1

  const meta = await sharp(working).metadata()

  // Judge by the LONGER edge. A packet shot cropped to 159x444 is portrait,
  // not small: rendered contained in a 380px square it occupies about 136px
  // across, so its native width already exceeds what the layout asks for.
  const longestEdge = Math.max(meta.width ?? 0, meta.height ?? 0)
  if (longestEdge < MIN_USEFUL) {
    console.warn(`  skip (too small ${meta.width}×${meta.height}): ${file}`)
    continue
  }

  const slug = rest
    .join('_')
    .replace(extname(file), '')
    .replace(/_(product1|blog1|companyprofile|gallaryphoto|coverphoto|testimonials)$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

  const outName = `${slug}.jpg`
  const outPath = join(OUT, bucket, outName)

  const pipeline = sharp(working)
    .rotate()
    .toColorspace('srgb')
    // JPEG has no alpha. Flatten onto white — the packet photography's own
    // studio background — instead of sharp's default black.
    .flatten({ background: '#ffffff' })

  // Only ever downscale. Enlarging a 600px photo to 1600px produces a soft,
  // heavier file that is not "HD" in any meaningful sense.
  if (meta.width > MAX_WIDTH) {
    pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
  }

  const info = await pipeline
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4', progressive: true })
    .toFile(outPath)

  manifest.push({
    legacyFile: file,
    bucket,
    src: `/images/${bucket}/${outName}`,
    width: info.width,
    height: info.height,
    bytes: info.size,
    nativeWidth: meta.width,
    nativeHeight: meta.height,
  })
}

manifest.sort((a, b) => a.src.localeCompare(b.src))

mkdirSync(join(root, 'content-source/legacy'), { recursive: true })
writeFileSync(
  join(root, 'content-source/legacy/images.json'),
  JSON.stringify(manifest, null, 2) + '\n'
)

const byBucket = manifest.reduce((acc, m) => {
  acc[m.bucket] = (acc[m.bucket] ?? 0) + 1
  return acc
}, {})

const totalMb = manifest.reduce((n, m) => n + m.bytes, 0) / 1024 / 1024
const upscaleAvoided = manifest.filter((m) => m.nativeWidth < MAX_WIDTH).length

console.log(`\n  processed ${manifest.length} images — ${totalMb.toFixed(1)} MB`)
for (const [bucket, count] of Object.entries(byBucket)) {
  console.log(`    ${bucket.padEnd(10)} ${count}`)
}
console.log(`\n  ${upscaleAvoided} were below ${MAX_WIDTH}px natively and were left at native size.`)
console.log(`  ${trimmed} had a transparent letterbox border trimmed off.`)
console.log('  manifest: content-source/legacy/images.json\n')
