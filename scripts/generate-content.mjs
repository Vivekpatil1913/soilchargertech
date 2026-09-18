/**
 * Generates `src/data/products.ts` and `src/data/articles.ts` from the legacy
 * extraction in `content-source/legacy/`.
 *
 * Generated rather than hand-written so provenance is mechanical: every field
 * in the shipped data can be traced to a real page on the old site, and the
 * whole set can be regenerated if the extraction improves.
 *
 * Run: npm run generate:content
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = (f) => JSON.parse(readFileSync(join(root, 'content-source/legacy', f), 'utf8'))

/**
 * Recovered media, keyed by the legacy filename it came from.
 *
 * The live media host 404s every asset; these were recovered from the Internet
 * Archive by `npm run process:images`, which writes the manifest. Absent until
 * that has been run, so content generation never hard-depends on it.
 */
let imagesByLegacyFile = new Map()
try {
  imagesByLegacyFile = new Map(src('images.json').map((img) => [img.legacyFile, img]))
} catch {
  console.warn('  (no images.json yet — run `npm run process:images` first)')
}

/** Legacy URL -> manifest entry. `.../uploads/web/product/88_product1.png` */
const findImage = (legacyUrl) => {
  if (!legacyUrl) return null
  const tail = legacyUrl.split('/uploads/web/')[1]
  if (!tail) return null
  return imagesByLegacyFile.get(tail.replace('/', '_')) ?? null
}

/** Emits a ContentImage literal, or `undefined` when nothing was recovered. */
const imageLiteral = (legacyUrl, alt, indent = '    ') => {
  const img = findImage(legacyUrl)
  if (!img) return 'undefined'
  return `{
${indent}  src: ${q(img.src)},
${indent}  alt: ${q(alt)},
${indent}  width: ${img.width},
${indent}  height: ${img.height},
${indent}}`
}

const SOURCE_HOST = 'soilchargertechnology.com'
const q = (s) => JSON.stringify(s ?? '')
const NL = String.fromCharCode(10)

/** The legacy CMS leaves "- " / ": " prefixes on the Ratio and Packing lines. */
const tidy = (s) => (s ? s.replace(/^[\s:–—-]+/, '').trim() : s)

/**
 * Claims that must not be republished as fact (see `unverifiedClaims` in
 * src/config/site.ts). A product whose copy contains one is downgraded to
 * `needs-verification` so it renders a PlaceholderNotice on staging and is
 * listed by `npm run audit:content`.
 */
const CLAIM_PATTERNS = [
  { re: /patent/i, label: 'patent claim' },
  { re: /government of india|indian government/i, label: 'government endorsement claim' },
  { re: /\bISO\b/, label: 'ISO certification claim' },
]

const detectClaims = (text) =>
  CLAIM_PATTERNS.filter((c) => c.re.test(text ?? '')).map((c) => c.label)

/**
 * Removes whole sentences containing an unsubstantiated claim.
 *
 * Flagging a claim is not sufficient on its own: an unverified assertion that
 * still reaches the page body, the meta description and the Product JSON-LD is
 * published either way — and structured data is the worst place for it, since
 * it is consumed by machines as fact.
 *
 * Returns the cleaned text plus whatever was withheld, so nothing is lost and
 * the client can see exactly what was removed and why.
 */
const stripClaims = (text) => {
  if (!text) return { kept: text ?? '', withheld: [] }

  const sentences = text.match(/[^.!?]+[.!?]*/g) ?? [text]
  const kept = []
  const withheld = []

  for (const sentence of sentences) {
    if (detectClaims(sentence).length > 0) withheld.push(sentence.trim())
    else kept.push(sentence)
  }

  return { kept: kept.join('').trim(), withheld }
}

const banner = (what, count) => `// AUTO-GENERATED — DO NOT EDIT BY HAND.
// Source: content-source/legacy/${what}.json (captured 2026-09-18)
// Regenerate: npm run generate:content
//
// ${count} ${what} extracted from the live site. Fields absent from the source
// are omitted rather than guessed; see each record's \`meta\` for provenance.
`

/* ------------------------------------------------------------------ products */

const products = src('products.json')

const line = (name) => (name.toUpperCase().startsWith('SUPER') ? 'super' : 'vedic')

/** Title-case the SHOUTED legacy names without mangling the SCT initialism. */
const displayName = (raw) =>
  raw
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w === 'sct' ? 'SCT' : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')

const productEntries = products.map((p) => {
  const ratio = tidy(p.ratio)
  const packing = tidy(p.packing)
  const hasContent =
    Boolean(p.shortDescription) || p.functions.length > 0 || Boolean(ratio) || Boolean(packing)

  // Only ratio and packing are verifiable. Nothing else is invented.
  const specs = []
  if (ratio) specs.push({ label: 'Application rate', value: ratio })
  if (packing) specs.push({ label: 'Pack sizes', value: packing })

  const sourceUrl = `${SOURCE_HOST}/sub-product/${p.legacyId}`

  // Claim-bearing sentences are REMOVED, not merely flagged — otherwise they
  // still reach the page body, the meta description and the Product JSON-LD.
  const description = stripClaims(p.shortDescription)
  const cleanFunctions = p.functions.filter((fn) => detectClaims(fn).length === 0)
  const withheld = [
    ...description.withheld,
    ...p.functions.filter((fn) => detectClaims(fn).length > 0),
  ]

  let meta
  if (!hasContent) {
    meta = {
      provenance: 'placeholder',
      source: sourceUrl,
      note: 'The legacy product page is empty (a single "." character). Product copy required from the client.',
    }
  } else if (withheld.length > 0) {
    const labels = [...new Set(detectClaims(withheld.join(' ')))]
    meta = {
      provenance: 'needs-verification',
      source: sourceUrl,
      note: `Withheld from publication — unsubstantiated ${labels.join(' and ')}: "${withheld.join(' ')}" Evidence required from the client before this copy can be restored.`,
    }
  } else {
    meta = { provenance: 'verified', source: sourceUrl }
  }

  return `  {
    slug: ${q(p.slug)},
    legacyId: ${p.legacyId},
    name: ${q(displayName(p.name))},
    line: ${q(line(p.name))},
    shortDescription: ${q(description.kept)},
    functions: [${cleanFunctions.map((f) => `\n      ${q(f)},`).join('')}${cleanFunctions.length ? '\n    ' : ''}],
${ratio ? `    ratio: ${q(ratio)},\n` : ''}${packing ? `    packing: ${q(packing)},\n` : ''}    specifications: [${specs
    .map(
      (s) => `\n      { label: ${q(s.label)}, value: ${q(s.value)}, meta: { provenance: 'verified', source: ${q(`${SOURCE_HOST}/sub-product/${p.legacyId}`)} } },`
    )
    .join('')}${specs.length ? '\n    ' : ''}],
    image: ${imageLiteral(p.image, `${displayName(p.name)} product photograph`)},
    applications: [],
    featured: false,
    meta: { provenance: ${q(meta.provenance)}, source: ${q(meta.source)}${meta.note ? `, note: ${q(meta.note)}` : ''} },
  },`
})

const productsFile = `${banner('products', products.length)}import type { Product, ProductLineInfo } from '@/types/product'

export const productLines: ProductLineInfo[] = [
  {
    id: 'super',
    name: 'Super',
    description:
      'The original Soil Charger range, applied to soil, fruit, crop, flower, size, water and plant protection.',
    meta: { provenance: 'verified', source: ${q(`${SOURCE_HOST}/products`)} },
  },
  {
    id: 'vedic',
    name: 'SCT Vedic',
    description:
      'The later SCT Vedic range, developed after 2015 around nutrition, root development and plant health.',
    meta: { provenance: 'verified', source: ${q(`${SOURCE_HOST}/products`)} },
  },
]

export const products: Product[] = [
${productEntries.join('\n')}
]
`

/* ------------------------------------------------------------------ articles */

const articles = src('articles.json')

const articleEntries = articles.map((a) => {
  const notes = []
  if (a.slugNeedsReview) {
    notes.push(
      a.language === 'mr'
        ? 'Marathi title does not yield an ASCII slug; a human-supplied slug is required before launch.'
        : 'Slug could not be derived reliably from the title; needs review.'
    )
  }
  notes.push('No publish date exists in the legacy CMS.')

  return `  {
    slug: ${q(a.slug)},
    legacyId: ${a.legacyId},
    title: ${q(a.title)},
    slugNeedsReview: ${a.slugNeedsReview},
    language: ${q(a.language)},
${a.author ? `    author: ${q(a.author)},\n` : ''}    excerpt: ${q(a.excerpt)},
    paragraphs: [${a.paragraphs.map((p) => `\n      ${q(p)},`).join('')}
    ],
    image: ${imageLiteral(a.image, a.title ? `Illustration for: ${a.title}` : 'Article illustration')},
    featured: false,
    meta: {
      provenance: ${q(a.slugNeedsReview ? 'needs-verification' : 'verified')},
      source: ${q(`${SOURCE_HOST}/sub-blogs?id=${a.legacyId}`)},
      note: ${q(notes.join(' '))},
    },
  },`
})

const articlesFile = `${banner('articles', articles.length)}import type { Article } from '@/types/article'

export const articles: Article[] = [
${articleEntries.join('\n')}
]
`

/* ------------------------------------------------------------------- gallery */

/**
 * Gallery and general-purpose imagery, derived from the recovered media.
 *
 * Captions are not recoverable — the legacy gallery published bare <img> tags
 * with empty alt attributes and no captions anywhere. Alt text here is
 * therefore generic and flagged; a human caption per image is still wanted.
 */
const galleryImages = [...imagesByLegacyFile.values()].filter((i) => i.bucket === 'gallery')
const aboutImages = [...imagesByLegacyFile.values()].filter((i) => i.bucket === 'about')

const imageEntries = (items, altPrefix) =>
  items
    .map(
      (img, i) => `  {
    src: ${q(img.src)},
    alt: ${q(`${altPrefix} ${i + 1}`)},
    width: ${img.width},
    height: ${img.height},
  },`
    )
    .join(NL)

const galleryFile = `// AUTO-GENERATED — DO NOT EDIT BY HAND.
// Regenerate: npm run generate:content
//
// Recovered from the Internet Archive snapshot of 2024-10-07; the live media
// host serves none of these. See content-source/legacy/images.json.
import type { ContentImage, ContentMeta } from '@/types/content'

export const galleryImages: ContentImage[] = [
${imageEntries(galleryImages, 'Soil Charger Technology field photograph')}
]

/** Company and cover photography, used on About and as section imagery. */
export const aboutImages: ContentImage[] = [
${imageEntries(aboutImages, 'Soil Charger Technology photograph')}
]

/**
 * Alt text above is generated, not written. The legacy site published every
 * one of these with an empty alt attribute and no caption, so nothing
 * descriptive survived to recover.
 */
export const galleryMeta: ContentMeta = {
  provenance: 'needs-verification',
  source: 'web.archive.org snapshot of soilchargertechnology.com, 2024-10-07',
  note: 'Images recovered from the Internet Archive because the live media host returns 404 for all of them. Captions and descriptive alt text are required from the client — the originals carried none.',
}
`

writeFileSync(join(root, 'src/data/gallery.ts'), galleryFile)

/* ----------------------------------------------------------------- redirects */

/**
 * Legacy URL map, generated so it can never drift from the slugs above.
 *
 * Every one of these URLs is live today and carries whatever SEO equity the old
 * site has. Letting them 404 at launch would discard it.
 */
const productRedirects = products
  .map((p) => `  ['/sub-product/${p.legacyId}', '/products/${p.slug}'],`)
  .join(NL)

const articleRedirects = articles
  .map((a) => `  [${a.legacyId}, '/resources/articles/${a.slug}'],`)
  .join(NL)

const redirectsFile = `// AUTO-GENERATED — DO NOT EDIT BY HAND.
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
${productRedirects}
])

/** \`/sub-blogs?id=N\` -> article slug. */
export const articleIdRedirects = new Map<number, string>([
${articleRedirects}
])
`

/* -------------------------------------------------------------------- write */

mkdirSync(join(root, 'src/data'), { recursive: true })
writeFileSync(join(root, 'src/data/products.ts'), productsFile)
writeFileSync(join(root, 'src/data/articles.ts'), articlesFile)
mkdirSync(join(root, 'src/config'), { recursive: true })
writeFileSync(join(root, 'src/config/redirects.ts'), redirectsFile)

const empty = products.filter(
  (p) => !p.shortDescription && !p.functions.length && !p.ratio && !p.packing
).length
const review = articles.filter((a) => a.slugNeedsReview).length

console.log(`\n  generated src/data/products.ts  — ${products.length} products (${empty} empty on source)`)
console.log(`  generated src/data/articles.ts  — ${articles.length} articles (${review} slugs need review)\n`)
