/**
 * JS mirror of the design tokens defined in `src/app/globals.css`.
 *
 * Only the subset GSAP and other runtime code needs lives here — durations,
 * easings and breakpoints. Colors are intentionally NOT duplicated: components
 * consume them through Tailwind classes so there is exactly one place to change
 * a color. If you find yourself needing a hex in JS, use
 * `getComputedStyle(el).getPropertyValue('--color-charge-500')` instead.
 */

/** Seconds — GSAP's unit. CSS equivalents live in globals.css as ms. */
export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  reveal: 0.7,
  story: 1.2,
} as const

/** cubic-bezier control points, matching the CSS `--ease-*` custom properties. */
export const ease = {
  /** Primary. Decisive start, long settle. Used for ~80% of motion. */
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.65, 0, 0.35, 1],
  precise: [0.4, 0, 0.2, 1],
} as const

/** GSAP accepts the CSS string form directly. */
export const gsapEase = {
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOutQuart: 'cubic-bezier(0.65, 0, 0.35, 1)',
  precise: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

/** Pixel values, matching `--breakpoint-*`. Used by ScrollTrigger.matchMedia. */
export const breakpoint = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

/** Media query strings for ScrollTrigger.matchMedia / gsap.matchMedia. */
export const mediaQuery = {
  /** Desktop-only effects: pinning, parallax, horizontal scroll. */
  desktop: `(min-width: ${breakpoint.lg}px)`,
  /** Below this, heavy scroll effects degrade to simple fades. */
  belowDesktop: `(max-width: ${breakpoint.lg - 1}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  allowsMotion: '(prefers-reduced-motion: no-preference)',
} as const

export type Duration = keyof typeof duration
export type Ease = keyof typeof ease
