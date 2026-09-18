/**
 * First-load JavaScript budget.
 *
 * Measures what a modern browser actually downloads before hydration — the
 * async/module scripts only, gzipped. The `noModule` legacy bundle is excluded
 * because no supported browser fetches it.
 *
 * Requires a running production server:
 *   npm run build && npm run start &
 *   node scripts/check-budget.mjs
 *
 * The budget is 165 KB, set from measurement rather than aspiration: React 19 +
 * Next 16 App Router has a ~139 KB floor before a line of this project's code.
 */
import { gzipSync } from 'node:zlib'

const BASE = process.env.BUDGET_BASE_URL ?? 'http://localhost:3000'
const BUDGET_BYTES = 165_000

const ROUTES = [
  '/',
  '/technology/how-it-works',
  '/products',
  '/products/super-soil-charger',
  '/contact',
  '/resources/articles/grape-farming',
]

const SCRIPT_TAG = /<script src="(\/_next\/static\/chunks\/[^"]+)"[^>]*>/g

async function measure(route) {
  const html = await fetch(`${BASE}${route}`).then((r) => r.text())

  const sources = new Set()
  for (const match of html.matchAll(SCRIPT_TAG)) {
    // Skip the legacy bundle: modern browsers never execute it.
    if (match[0].includes('noModule')) continue
    if (match[1]) sources.add(match[1])
  }

  let total = 0
  for (const src of sources) {
    const body = await fetch(`${BASE}${src}`).then((r) => r.arrayBuffer())
    total += gzipSync(Buffer.from(body), { level: 9 }).byteLength
  }

  return { total, chunks: sources.size }
}

let failed = 0
console.log(`\n  First-load JS budget — ${(BUDGET_BYTES / 1000).toFixed(0)} KB gz\n`)

for (const route of ROUTES) {
  try {
    const { total, chunks } = await measure(route)
    const ok = total <= BUDGET_BYTES
    if (!ok) failed++
    console.log(
      `  ${ok ? ' ok  ' : 'FAIL '} ${(total / 1000).toFixed(1).padStart(6)} KB  ${String(chunks).padStart(2)} chunks  ${route}`
    )
  } catch (error) {
    failed++
    console.log(`  FAIL  ${route} — ${error instanceof Error ? error.message : error}`)
  }
}

if (failed > 0) {
  console.error(`\n  ${failed} route(s) over budget or unreachable.\n`)
  process.exit(1)
}

console.log(`\n  All ${ROUTES.length} routes within budget.\n`)
