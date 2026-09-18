'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { usePrefersReducedMotion } from '@/components/motion/MotionGate'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  /** Milliseconds. */
  duration?: number
  locale?: string
  className?: string
}

/** Decisive start, long settle — matches --ease-out-expo. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t))

/**
 * Count-up, driven by rAF rather than an animation library.
 *
 * Deliberately NOT built on GSAP: a single interpolated number does not justify
 * coupling to a 45 KB dependency's load timing, and this way the counters work
 * even if GSAP never loads.
 *
 * The final value is server-rendered as the element's text content, so with
 * JavaScript disabled — or before hydration — the real number is already on the
 * page. The animation only replaces it temporarily and puts it back.
 */
export function AnimatedCounter({
  value,
  suffix = '',
  duration = 1600,
  locale = 'en-IN',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || reduced) return

    const format = new Intl.NumberFormat(locale)
    let frame = 0

    const run = () => {
      const start = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        element.textContent = `${format.format(Math.round(easeOutExpo(progress) * value))}${suffix}`
        if (progress < 1) frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      // Always leave the true value behind, never a partial count.
      element.textContent = `${format.format(value)}${suffix}`
    }
  }, [value, suffix, duration, locale, reduced])

  return (
    <span ref={ref} className={cn('data-value tabular-nums', className)}>
      {new Intl.NumberFormat(locale).format(value)}
      {suffix}
    </span>
  )
}
