/**
 * Derives the site's logo assets from the client-supplied original.
 *
 * Input:  public/images/soillogo2.jpg  (497×476, JPEG, opaque white background)
 *
 * The original is a square lockup — emblem above a two-line wordmark — on a
 * solid white background. Two things make it unusable as-is:
 *
 *   1. JPEG has no alpha, so it renders as a white tile on the dark footer and
 *      dark page heroes.
 *   2. At a 44px header height the stacked wordmark would be about 7px tall per
 *      line, i.e. illegible.
 *
 * So this script produces:
 *   - logo-mark.png   the emblem alone, transparent, for the header lockup
 *                     (paired with live text, which stays legible and inverts
 *                     on dark surfaces)
 *   - logo-full.png   the complete lockup, transparent, for the favicon and
 *                     anywhere the full mark is wanted at size
 *   - icon.png / apple-icon.png  app icons
 *
 * Re-runnable: drop in a better original (ideally an SVG or a transparent PNG)
 * and run `npm run generate:logo` again.
 */
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(root, 'public/images/soillogo2.jpg')
const OUT = join(root, 'public/images')
const APP = join(root, 'src/app')

/** Measured from the source: the blank band separating emblem from wordmark. */
const EMBLEM_BOTTOM = 305

/**
 * Keys out the white background.
 *
 * Threshold-based rather than luminance-based: the artwork contains light
 * greens and oranges that a luminance key would eat. Only pixels that are
 * near-white in every channel become transparent, with a soft ramp across the
 * JPEG's anti-aliased edges so the cutout has no hard jaggies.
 */
async function cutout(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  const OPAQUE_BELOW = 228 // fully keep
  const CLEAR_ABOVE = 247 // fully drop

  for (let i = 0; i < data.length; i += info.channels) {
    const min = Math.min(data[i], data[i + 1], data[i + 2])
    if (min >= CLEAR_ABOVE) {
      data[i + 3] = 0
    } else if (min > OPAQUE_BELOW) {
      const t = (min - OPAQUE_BELOW) / (CLEAR_ABOVE - OPAQUE_BELOW)
      data[i + 3] = Math.round(255 * (1 - t))
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
}

mkdirSync(OUT, { recursive: true })

const { width } = await sharp(SOURCE).metadata()

/* ------------------------------------------------------------- mark only --- */

const markSource = await sharp(SOURCE)
  .extract({ left: 0, top: 0, width, height: EMBLEM_BOTTOM })
  .png()
  .toBuffer()

const mark = await (await cutout(markSource))
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toBuffer()

const markMeta = await sharp(mark).metadata()
await sharp(mark).toFile(join(OUT, 'logo-mark.png'))

/* ----------------------------------------------------------- full lockup --- */

const full = await (await cutout(SOURCE))
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toBuffer()
const fullMeta = await sharp(full).metadata()
await sharp(full).toFile(join(OUT, 'logo-full.png'))

/* ------------------------------------------------------------- app icons --- */

/**
 * Square app icon: the full lockup centred on the brand off-white, so it never
 * lands on a dark OS surface with its dark maroon type.
 *
 * Composited onto an explicitly-sized canvas rather than resize-then-extend —
 * sharp applies one resize per pipeline, so chaining them silently produced a
 * 594px icon instead of the requested 512.
 */
async function icon(size, file) {
  const inner = Math.round(size * 0.82)

  const artwork = await sharp(full)
    .resize(inner, inner, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 250, g: 248, b: 245, alpha: 1 } },
  })
    .composite([{ input: artwork, gravity: 'center' }])
    // Palette-quantised: this is flat vector-style artwork, so 8-bit indexed
    // colour is visually identical at a fraction of the size.
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(file)
}

await icon(180, join(APP, 'apple-icon.png'))
await icon(512, join(APP, 'icon.png'))

console.log(`
  logo-mark.png    ${markMeta.width}×${markMeta.height}   emblem, transparent
  logo-full.png    ${fullMeta.width}×${fullMeta.height}   full lockup, transparent
  icon.png         512×512
  apple-icon.png   180×180
`)
