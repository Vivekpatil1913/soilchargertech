/**
 * Content provenance audit.
 *
 * Prints every record that is not fully verified, as a checklist the client can
 * work through. Run: npm run audit:content
 *
 * Exits non-zero when `--strict` is passed, so CI can block a production
 * release that still contains placeholder primary content.
 */
import { applications } from '../src/data/applications'
import { articles } from '../src/data/articles'
import { products } from '../src/data/products'
import { projects, projectsPlaceholder } from '../src/data/projects'
import { unverifiedClaims } from '../src/config/site'
import images from '../content-source/legacy/images.json'
import type { ContentMeta } from '../src/types/content'

const strict = process.argv.includes('--strict')

interface Row {
  group: string
  label: string
  meta: ContentMeta
}

const rows: Row[] = []

for (const product of products) {
  if (product.meta.provenance !== 'verified') {
    rows.push({ group: 'Products', label: product.name, meta: product.meta })
  }
}

for (const article of articles) {
  if (article.meta.provenance !== 'verified') {
    rows.push({
      group: 'Articles',
      label: `${article.title || `(untitled #${article.legacyId})`} [${article.language}]`,
      meta: article.meta,
    })
  }
}

for (const application of applications) {
  if (application.meta.provenance !== 'verified') {
    rows.push({ group: 'Applications', label: application.name, meta: application.meta })
  }
}

for (const claim of unverifiedClaims) {
  rows.push({ group: 'Company claims', label: `"${claim.claim}"`, meta: claim })
}

/* ---------------------------------------------------------------- reporting */

const RESET = '[0m'
const DIM = '[2m'
const BOLD = '[1m'
const AMBER = '[33m'
const RED = '[31m'

const tint = (p: ContentMeta['provenance']) => (p === 'placeholder' ? RED : AMBER)

/**
 * The media library was recovered from the Internet Archive, not from the live
 * host, which still returns 404 for every asset. Resolution is whatever was
 * captured in 2024 — upscaling cannot add detail that was never there, so
 * low-resolution originals are reported as an outstanding ask rather than
 * quietly enlarged and presented as HD.
 */
function printMediaSection() {
  const lowRes = images.filter((image) => image.nativeWidth < 800)

  console.log(`${BOLD}  ▸ Media library${RESET}`)
  console.log(
    [
      `    ${images.length} images recovered from the Internet Archive snapshot of 2024-10-07 —`,
      `    the live media host returns 404 for every one. 7 more were discarded as`,
      `    unusable thumbnails (as small as 73x101).`,
      ``,
      `    ${RED}${lowRes.length} of them are under 800px wide${RESET} and cannot be improved by upscaling.`,
      `    Higher-resolution originals are wanted for those.`,
      ``,
      `    Captions and descriptive alt text are needed throughout: every legacy`,
      `    image carried an empty alt attribute, so none survived to recover.`,
      ``,
    ].join('\n')
  )
}

console.log(`\n${BOLD}  CONTENT AUDIT — Soil Charger Technology${RESET}`)
console.log(`${DIM}  Every item below needs input before launch.${RESET}\n`)

printMediaSection()

if (projects.length === 0) {
  console.log(`${RED}${BOLD}  ▸ CRITICAL — Case studies${RESET}`)
  console.log(`    ${projectsPlaceholder.note}\n`)
}

const groups = [...new Set(rows.map((r) => r.group))]

for (const group of groups) {
  const groupRows = rows.filter((r) => r.group === group)
  console.log(`${BOLD}  ▸ ${group}${RESET} ${DIM}(${groupRows.length})${RESET}`)
  for (const row of groupRows) {
    const c = tint(row.meta.provenance)
    console.log(`    ${c}[${row.meta.provenance}]${RESET} ${row.label}`)
    if (row.meta.note) console.log(`${DIM}      ${row.meta.note}${RESET}`)
    if (row.meta.source) console.log(`${DIM}      source: ${row.meta.source}${RESET}`)
  }
  console.log()
}

const placeholders = rows.filter((r) => r.meta.provenance === 'placeholder').length
const needsVerification = rows.length - placeholders

console.log(`${BOLD}  SUMMARY${RESET}`)
console.log(`    ${products.length} products · ${articles.length} articles · ${applications.length} applications · ${projects.length} projects`)
console.log(`    ${placeholders} placeholder · ${needsVerification} needs-verification · 42 images missing\n`)

if (strict && (placeholders > 0 || projects.length === 0)) {
  console.error(`${RED}  --strict: placeholder content present. Not releasable.${RESET}\n`)
  process.exit(1)
}
