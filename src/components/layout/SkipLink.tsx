/**
 * Keyboard users land here first. Visually hidden until focused, then it
 * becomes a real, visible button — the sticky header means a purely
 * screen-reader-only skip link would leave sighted keyboard users stranded.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="bg-accent text-on-accent sr-only rounded-sm px-5 py-3 font-medium focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100"
    >
      Skip to content
    </a>
  )
}
