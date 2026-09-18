/**
 * Automated QA sweep.
 *
 * Drives a real Chrome against a running production server and checks three
 * things that only a browser can verify:
 *
 *   1. Horizontal overflow at every tested breakpoint — the single most common
 *      responsive defect, and invisible in server-rendered HTML.
 *   2. axe-core accessibility violations on every route.
 *   3. That every internal link resolves.
 *
 * Usage:  npm run build && npm run start &  then  npm run qa
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import puppeteer from 'puppeteer-core'

const require = createRequire(import.meta.url)
const axeSource = readFileSync(require.resolve('axe-core'), 'utf8')

const BASE = process.env.QA_BASE_URL ?? 'http://localhost:3000'
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

/**
 * Navigation waits on `domcontentloaded`, not `load`.
 *
 * Every image declares width and height, so its aspect-ratio box is reserved
 * before a single pixel decodes — layout is already final. Waiting for `load`
 * would additionally wait on Next generating an AVIF variant for every
 * (image, width) pair, which is minutes of cold-cache CPU work that tells us
 * nothing about overflow.
 */

/** The widths named in the brief. */
const WIDTHS = [375, 390, 768, 1024, 1280, 1440, 1920]

const ROUTES = [
  '/',
  '/about',
  '/about/leadership',
  '/about/certifications',
  '/about/infrastructure',
  '/technology',
  '/technology/how-it-works',
  '/technology/advantages',
  '/technology/research',
  '/products',
  '/products/super-soil-charger',
  '/products/sct-vedic-milk-charger',
  '/applications',
  '/applications/grapes',
  '/projects',
  '/resources',
  '/resources/articles',
  '/resources/articles/grape-farming',
  '/resources/articles/article-14',
  '/resources/faq',
  '/resources/videos',
  '/resources/brochures',
  '/gallery',
  '/careers',
  '/careers/openings',
  '/careers/internship',
  '/distributorship',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
  '/nonexistent-page-404-check',
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})

/**
 * QA does not need pixels.
 *
 * Every image declares width and height, so its box is reserved by CSS whether
 * or not the bytes ever arrive — layout and overflow are identical either way.
 * Letting them load instead makes Next generate an AVIF variant per
 * (image, viewport width) pair, which saturates the optimiser and turns a
 * two-minute sweep into an unbounded one.
 */
async function blockImages(page) {
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    const type = request.resourceType()
    if (type === 'image' || type === 'media' || type === 'font') request.abort()
    else request.continue()
  })
}

const overflowFailures = []
const a11yFailures = []
const linkFailures = []
const discoveredLinks = new Set()

/* ------------------------------------------------ 1. responsive overflow --- */

console.log(`\n  RESPONSIVE — horizontal overflow at ${WIDTHS.length} widths\n`)

{
  const page = await browser.newPage()
  await blockImages(page)

  for (const route of ROUTES) {
    const perRoute = []

    for (const width of WIDTHS) {
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
      await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 })

      const result = await page.evaluate(() => {
        const doc = document.documentElement
        const overflow = doc.scrollWidth - doc.clientWidth

        // Name the widest offending element, so a failure is actionable.
        let worst = null
        if (overflow > 1) {
          for (const el of document.querySelectorAll('body *')) {
            const rect = el.getBoundingClientRect()
            const past = Math.round(rect.right - doc.clientWidth)
            if (past > 1 && (!worst || past > worst.past)) {
              worst = {
                past,
                tag: el.tagName.toLowerCase(),
                cls: (el.className?.toString?.() ?? '').slice(0, 70),
              }
            }
          }
        }
        return { overflow, worst }
      })

      if (result.overflow > 1) {
        perRoute.push({ width, ...result })
      }
    }

    if (perRoute.length > 0) {
      overflowFailures.push({ route, details: perRoute })
      const first = perRoute[0]
      console.log(
        `  FAIL ${route} — ${perRoute.length}/${WIDTHS.length} widths overflow; worst at ${first.width}px by ${first.overflow}px (${first.worst?.tag} ${first.worst?.cls})`
      )
    }
  }

  await page.close()
  if (overflowFailures.length === 0) {
    console.log(`   ok  ${ROUTES.length} routes × ${WIDTHS.length} widths — no horizontal overflow`)
  }
}

/* ---------------------------------------------------- 2. axe-core sweep --- */

console.log(`\n  ACCESSIBILITY — axe-core, ${ROUTES.length} routes\n`)

{
  const page = await browser.newPage()
  await blockImages(page)
  await page.setViewport({ width: 1280, height: 900 })

  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.evaluate(axeSource)

    const results = await page.evaluate(async () => {
      // @ts-expect-error injected at runtime
      const run = await window.axe.run(document, {
        resultTypes: ['violations'],
        // 'best-practice' is included deliberately: heading-order and
        // region live there, not under the wcag tags, and a document outline
        // that skips levels is a real navigation problem for screen readers.
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      })
      return run.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        count: v.nodes.length,
        target: v.nodes[0]?.target?.join(' ') ?? '',
      }))
    })

    if (results.length > 0) {
      a11yFailures.push({ route, results })
      for (const v of results) {
        console.log(`  FAIL ${route} — ${v.id} (${v.impact}, ${v.count}×) ${v.target.slice(0, 70)}`)
      }
    }

    // Collect internal links for the link check below.
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]'))
        .map((a) => a.getAttribute('href') ?? '')
        .filter((h) => h.startsWith('/'))
    )
    for (const href of hrefs) discoveredLinks.add(href.split('#')[0] || '/')
  }

  await page.close()
  if (a11yFailures.length === 0) {
    console.log(`   ok  no WCAG 2.1 A/AA violations across ${ROUTES.length} routes`)
  }
}

/* ------------------------------------------------------- 3. link check --- */

console.log(`\n  LINKS — ${discoveredLinks.size} unique internal targets\n`)

for (const href of [...discoveredLinks].sort()) {
  const response = await fetch(`${BASE}${href}`, { redirect: 'follow' })
  if (!response.ok) {
    linkFailures.push({ href, status: response.status })
    console.log(`  FAIL ${response.status}  ${href}`)
  }
}
if (linkFailures.length === 0) console.log(`   ok  all ${discoveredLinks.size} internal links resolve`)

/* ------------------------------------------------------------ summary --- */

await browser.close()

const failed = overflowFailures.length + a11yFailures.length + linkFailures.length
console.log(
  `\n  SUMMARY  overflow ${overflowFailures.length} · a11y ${a11yFailures.length} · links ${linkFailures.length}\n`
)

process.exit(failed > 0 ? 1 : 0)
