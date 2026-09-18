/**
 * Interaction QA — the things a static audit cannot check.
 *
 *   1. JavaScript disabled — is the content still there?
 *   2. prefers-reduced-motion — is anything left hidden?
 *   3. Keyboard — skip link, focus visibility, mobile menu focus trap.
 *
 * These matter more than usual for this build, because the reveal animations
 * deliberately hide below-fold content. If that hiding ever survived into a
 * no-JS or reduced-motion session, the page would be blank for those visitors.
 */
import puppeteer from 'puppeteer-core'

const BASE = process.env.QA_BASE_URL ?? 'http://localhost:3000'
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
})

let failures = 0
const check = (label, ok, detail = '') => {
  if (!ok) failures++
  console.log(`  ${ok ? ' ok  ' : 'FAIL '} ${label}${detail ? ` — ${detail}` : ''}`)
}

/* ------------------------------------------- 1. JavaScript disabled --- */

console.log('\n  NO JAVASCRIPT\n')
{
  const page = await browser.newPage()
  await page.setJavaScriptEnabled(false)
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })

  const result = await page.evaluate(() => {
    const visible = (el) => {
      const s = getComputedStyle(el)
      return s.opacity !== '0' && s.visibility !== 'hidden' && s.display !== 'none'
    }
    const headings = [...document.querySelectorAll('h1, h2')]
    return {
      headings: headings.length,
      hidden: headings.filter((h) => !visible(h)).length,
      counters: [...document.querySelectorAll('.data-value')]
        .map((e) => e.textContent?.trim())
        .filter((t) => t && /\d/.test(t)).length,
      navLinks: document.querySelectorAll('header a[href]').length,
    }
  })

  check('headings present', result.headings >= 10, `${result.headings} found`)
  check('no heading hidden by animation CSS', result.hidden === 0, `${result.hidden} hidden`)
  check('counter values rendered server-side', result.counters >= 5, `${result.counters} values`)
  check('header navigation usable', result.navLinks >= 5, `${result.navLinks} links`)
  await page.close()
}

/* ------------------------------------- 2. prefers-reduced-motion --- */

console.log('\n  PREFERS-REDUCED-MOTION\n')
{
  const page = await browser.newPage()
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1200))

  const result = await page.evaluate(() => {
    const els = [...document.querySelectorAll('h2, p, article, li')]
    const hidden = els.filter((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return false
      return getComputedStyle(el).opacity === '0'
    })
    return {
      total: els.length,
      hidden: hidden.length,
      sample: hidden[0]?.tagName ?? '',
      lenisActive: document.documentElement.classList.contains('lenis'),
    }
  })

  check('no content left at opacity 0', result.hidden === 0, `${result.hidden}/${result.total} hidden ${result.sample}`)
  check('smooth scroll disabled', result.lenisActive === false)
  await page.close()
}

/* ------------------------------------------------------ 3. keyboard --- */

console.log('\n  KEYBOARD\n')
{
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })

  // First Tab must reach the skip link, and it must become visible.
  await page.keyboard.press('Tab')
  const skip = await page.evaluate(() => {
    const el = document.activeElement
    if (!el) return null
    const s = getComputedStyle(el)
    const rect = el.getBoundingClientRect()
    return {
      text: el.textContent?.trim() ?? '',
      href: el.getAttribute('href'),
      visible: rect.width > 0 && rect.height > 0 && s.clipPath !== 'inset(50%)',
      outline: s.outlineStyle !== 'none' && s.outlineWidth !== '0px',
    }
  })
  check('first Tab focuses skip link', skip?.href === '#main', skip?.text ?? 'none')
  check('skip link becomes visible on focus', Boolean(skip?.visible))
  check('focus ring present', Boolean(skip?.outline))

  // Every focusable element must show a visible focus indicator.
  const noRing = await page.evaluate(() => {
    const focusables = [...document.querySelectorAll('a[href], button:not([disabled])')].filter(
      (el) => el.getBoundingClientRect().width > 0
    )
    const bad = []
    for (const el of focusables.slice(0, 40)) {
      el.focus()
      // Elements inside a closed dropdown are `inert`, so focus cannot land on
      // them and no focus ring can apply. Only assert on controls that actually
      // became focused — otherwise this reports a failure for markup that is
      // correctly unreachable.
      if (document.activeElement !== el) continue

      const s = getComputedStyle(el)
      const hasOutline = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0
      if (!hasOutline) bad.push(el.tagName + '.' + (el.className?.toString?.() ?? '').slice(0, 30))
    }
    return bad
  })
  check('all sampled controls show a focus ring', noRing.length === 0, noRing.slice(0, 2).join(', '))

  // Mobile menu: opens, traps focus, closes on Escape, restores focus.
  await page.setViewport({ width: 390, height: 844 })
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })

  const menu = await page.evaluate(async () => {
    const trigger = document.querySelector('button[aria-label="Open menu"]')
    if (!trigger) return { ok: false, reason: 'no trigger' }
    trigger.click()
    await new Promise((r) => setTimeout(r, 450))

    const panel = document.querySelector('[role="dialog"][aria-modal="true"]')
    const opened = Boolean(panel) && !panel.hasAttribute('inert')
    const focusInside = Boolean(panel?.contains(document.activeElement))

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await new Promise((r) => setTimeout(r, 450))

    const closed = panel?.hasAttribute('inert') ?? false
    const restored = document.activeElement === trigger
    return { ok: true, opened, focusInside, closed, restored }
  })

  check('mobile menu opens', Boolean(menu.opened))
  check('focus moves into panel', Boolean(menu.focusInside))
  check('Escape closes panel', Boolean(menu.closed))
  check('focus restored to trigger', Boolean(menu.restored))

  await page.close()
}

await browser.close()
console.log(`\n  ${failures === 0 ? 'All interaction checks passed.' : `${failures} check(s) failed.`}\n`)
process.exit(failures > 0 ? 1 : 0)
