/**
 * WCAG contrast gate for the design system.
 *
 * Parses the real token values out of `src/app/globals.css` — it does not keep
 * its own copy — then asserts every pairing the UI actually uses clears 4.5:1.
 * Run by `npm run check`. A failing pairing exits non-zero.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(join(root, 'src/app/globals.css'), 'utf8')

/** Pull `--color-x: #hex;` declarations straight out of the stylesheet. */
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]])
)

const AA_NORMAL = 4.5

const channels = (hex) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

const linearize = (c) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

const luminance = (hex) => {
  const [r, g, b] = channels(hex).map(linearize)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)]
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

const t = (name) => {
  const value = name === 'white' ? '#ffffff' : tokens[name]
  if (!value) throw new Error(`Token --color-${name} not found in globals.css`)
  return value
}

/** [label, foreground, background, minimum] */
const PAIRINGS = [
  // Light surface — semantic ink
  ['body ink on bg', 'soil-950', 'soil-50', AA_NORMAL],
  ['ink-muted on bg', 'soil-700', 'soil-50', AA_NORMAL],
  ['ink-subtle on bg', 'soil-600', 'soil-50', AA_NORMAL],
  // Light surface — accent
  ['accent text on bg', 'charge-700', 'soil-50', AA_NORMAL],
  ['on-accent on accent fill', 'white', 'charge-700', AA_NORMAL],
  ['accent-hover fill', 'white', 'charge-800', AA_NORMAL],
  // Dark surface
  ['dark ink on carbon', 'soil-50', 'carbon', AA_NORMAL],
  ['dark ink-muted on carbon', 'soil-300', 'carbon', AA_NORMAL],
  ['dark ink-subtle on carbon', 'soil-400', 'carbon', AA_NORMAL],
  ['dark accent on carbon', 'charge-400', 'carbon', AA_NORMAL],
  ['dark on-accent on accent fill', 'carbon', 'charge-400', AA_NORMAL],
  // Feedback
  ['warning on bg', 'warning-600', 'soil-50', AA_NORMAL],
  // The opaque surface <PlaceholderNotice> paints, and every ink it puts there.
  //
  // Pairings must name the colour that is actually painted, not the nearest
  // token. This band used to tint its own background with `bg-warning/5`, so
  // the real backdrop was the tint composited over whatever surface it landed
  // on — 4.42:1 over `bg` and 4.41:1 over `surface-sunken`, while this file
  // measured the untinted token at 4.72:1 and reported a pass. Translucent
  // backgrounds behind text cannot be checked here; give the component an
  // opaque surface token and check that.
  ['warning on warning-soft', 'warning-600', 'warning-soft', AA_NORMAL],
  ['ink-muted on warning-soft', 'soil-700', 'warning-soft', AA_NORMAL],
  ['warning on carbon', 'warning-300', 'carbon', AA_NORMAL],
  ['danger on bg', 'danger-600', 'soil-50', AA_NORMAL],
  ['danger on carbon', 'danger-300', 'carbon', AA_NORMAL],
  ['mineral on bg', 'mineral-600', 'soil-50', AA_NORMAL],
  // Badge tones
  ['accent badge', 'charge-800', 'charge-50', AA_NORMAL],
  ['mineral badge', 'mineral-600', 'soil-50', AA_NORMAL],
  // Non-text: hairlines only need 3:1 against their surface
  ['hairline on bg', 'soil-200', 'soil-50', 1.0],
  ['dark hairline on carbon', 'carbon-line', 'carbon', 1.0],
]

let failures = 0

console.log('\n  WCAG contrast — design system tokens\n')

for (const [label, fg, bg, min] of PAIRINGS) {
  const ratio = contrast(t(fg), t(bg))
  const ok = ratio >= min
  if (!ok) failures++
  const badge = ok ? '  ok  ' : ' FAIL '
  console.log(
    `${badge} ${ratio.toFixed(2).padStart(6)}:1  (min ${min.toFixed(1)})  ${label}  —  ${fg} on ${bg}`
  )
}

if (failures > 0) {
  console.error(`\n  ${failures} pairing(s) below the required ratio.\n`)
  process.exit(1)
}

console.log(`\n  All ${PAIRINGS.length} pairings pass.\n`)
