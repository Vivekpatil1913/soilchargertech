'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { usePrefersReducedMotion } from './MotionGate'

type Refresh = () => void

/**
 * Lenis smooth scrolling, driven by GSAP's ticker.
 *
 * GSAP, ScrollTrigger and Lenis are imported DYNAMICALLY inside the effect, not
 * at module scope. This component lives in the root layout, so a static import
 * would put ~60 KB gz of animation library into the first-load bundle of every
 * page — including pages with no animation at all. Loading them after mount
 * keeps them out of the critical path entirely.
 *
 * Both libraries are also skipped completely under `prefers-reduced-motion`:
 * hijacking scroll is itself a motion effect, and those visitors should never
 * pay to download it.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion()
  const pathname = usePathname()
  const refreshRef = useRef<Refresh | null>(null)

  useEffect(() => {
    if (reduced) return

    let disposed = false
    let cleanup: (() => void) | undefined

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      // The visitor may have navigated away while the chunks were loading.
      if (disposed) return

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        // Never smooth touch: it fights the OS scroller and feels broken on phones.
        syncTouch: false,
      })

      document.documentElement.classList.add('lenis')

      // Lenis and ScrollTrigger both want to own the scroll loop. Running each
      // on its own rAF produces a one-frame lag that reads as jitter in pinned
      // sections, so GSAP's ticker drives Lenis and lag smoothing is disabled.
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      refreshRef.current = () => ScrollTrigger.refresh()

      cleanup = () => {
        gsap.ticker.remove(tick)
        document.documentElement.classList.remove('lenis')
        lenis.destroy()
        refreshRef.current = null
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [reduced])

  // App Router preserves scroll position across some navigations; ScrollTrigger's
  // cached measurements must be recomputed once the new route has painted.
  useEffect(() => {
    refreshRef.current?.()
  }, [pathname])

  return null
}
