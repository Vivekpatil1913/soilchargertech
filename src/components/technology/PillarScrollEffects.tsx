'use client'

import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/motion/gsap'
import { usePrefersReducedMotion } from '@/components/motion/MotionGate'

/**
 * Scroll choreography for the four-pillar story.
 *
 * This is the one place GSAP genuinely earns its weight: scrubbing several SVG
 * layers against scroll position, in sync with Lenis, is not something CSS or
 * an IntersectionObserver can do. Everything else on the site uses cheaper
 * primitives.
 *
 * Renders nothing. It attaches to markup that is already complete and readable
 * on its own — the sticky graphic and the four scenes work with no JavaScript
 * at all — so this is pure enhancement over a finished layout.
 *
 * Desktop only, via `gsap.matchMedia`. On phones the graphic would occupy the
 * whole screen and pinning fights the OS scroller, so small viewports keep the
 * plain stacked layout.
 */
export function PillarScrollEffects({ rootId }: { rootId: string }) {
  const reduced = usePrefersReducedMotion()
  const started = useRef(false)

  useEffect(() => {
    if (reduced || started.current) return
    started.current = true

    let cleanup: (() => void) | undefined
    let disposed = false

    void loadGsap().then(({ gsap }) => {
      if (disposed) return

      const root = document.getElementById(rootId)
      if (!root) return

      const media = gsap.matchMedia()

      media.add('(min-width: 1024px)', () => {
        const scenes = gsap.utils.toArray<HTMLElement>('[data-pillar]', root)
        const roots = root.querySelector('[data-layer="roots"]')
        const tips = root.querySelector('[data-layer="root-tips"]')
        const microbes = root.querySelector('[data-layer="microbes"]')
        const markers = gsap.utils.toArray<HTMLElement>('[data-pillar-marker]', root)

        // Resting state for the layers that grow as the story advances. Set
        // here rather than in the markup so a non-JS visitor sees the complete
        // diagram immediately.
        gsap.set([roots, tips], { opacity: 0.25 })
        gsap.set(microbes, { opacity: 0.15 })

        // Layers deepen across the whole section, scrubbed to scroll.
        const growth = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 60%',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        })

        growth
          .to(roots, { opacity: 0.9, ease: 'none' }, 0)
          .to(tips, { opacity: 0.8, ease: 'none' }, 0.15)
          .to(microbes, { opacity: 0.55, ease: 'none' }, 0.35)

        // Each scene lights its own progress marker while it owns the viewport.
        scenes.forEach((scene, index) => {
          const marker = markers[index]
          if (!marker) return

          gsap.to(marker, {
            color: 'var(--color-charge-400)',
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top 65%',
              end: 'bottom 45%',
              toggleActions: 'play none none reverse',
            },
          })
        })

        return () => {
          // matchMedia hands back the revert for this breakpoint only.
          gsap.set([roots, tips, microbes], { clearProps: 'opacity' })
          gsap.set(markers, { clearProps: 'color' })
        }
      })

      cleanup = () => media.revert()
    })

    return () => {
      disposed = true
      cleanup?.()
      started.current = false
    }
  }, [reduced, rootId])

  return null
}
