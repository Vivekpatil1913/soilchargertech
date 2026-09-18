'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { usePrefersReducedMotion } from './MotionGate'

interface RevealProps {
  children: React.ReactNode
  /** Seconds of delay, for staggering siblings. */
  delay?: number
  /** Distance travelled, in px. */
  distance?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Scroll-triggered reveal — flash-free by construction.
 *
 * The usual implementation hides content in CSS and reveals it with JS, which
 * leaves the content invisible forever if the script fails. The inverse
 * (animate `from` after mount) makes already-painted content visibly jump.
 *
 * This does neither. The element renders **visible**, and on mount we hide it
 * only if it is still below the viewport — i.e. somewhere the user cannot see.
 * Anything already on screen is simply left alone. So:
 *
 *   - JS disabled or broken → everything stays visible
 *   - Above-the-fold content → never touched, no flash, no LCP impact
 *   - Below-the-fold content → animates in on approach
 *
 * Children are passed through untouched, so a Server Component rendered inside
 * this wrapper stays server-rendered and costs no client JS of its own.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || reduced) return

    // Only take over elements the viewer cannot currently see.
    const { top } = element.getBoundingClientRect()
    if (top < window.innerHeight) return

    element.style.opacity = '0'
    element.style.transform = `translateY(${distance}px)`
    element.style.willChange = 'opacity, transform'

    const show = () => {
      element.style.transition = `opacity 700ms var(--ease-out-expo) ${delay}s, transform 700ms var(--ease-out-expo) ${delay}s`
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
      // Drop the compositor hint once the work is done.
      window.setTimeout(
        () => {
          element.style.willChange = ''
        },
        700 + delay * 1000
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show()
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      // If we unmount mid-animation, never leave the element hidden.
      element.style.opacity = ''
      element.style.transform = ''
      element.style.willChange = ''
    }
  }, [delay, distance, reduced])

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      {children}
    </Tag>
  )
}
