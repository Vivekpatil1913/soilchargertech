import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

export interface Gsap {
  gsap: typeof GsapType
  ScrollTrigger: typeof ScrollTriggerType
}

let pending: Promise<Gsap> | null = null

/**
 * Loads GSAP and ScrollTrigger once, lazily, and shares the result.
 *
 * GSAP must never appear in first-load JS: it is ~45 KB gz and no page needs it
 * before paint. Every consumer imports through here, so several animated
 * components on one page still trigger a single network request and a single
 * plugin registration.
 */
export function loadGsap(): Promise<Gsap> {
  pending ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, plugin]) => {
    core.gsap.registerPlugin(plugin.ScrollTrigger)
    return { gsap: core.gsap, ScrollTrigger: plugin.ScrollTrigger }
  })
  return pending
}
