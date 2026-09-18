import type { Metadata } from 'next'
import {
  Applications,
  CTA,
  Hero,
  Intro,
  KnowledgeLoop,
  Pillars,
  Principles,
  Products,
  Projects,
  ProofBar,
  Resources,
  Testimonials,
  Why,
} from '@/components/home'

export const metadata: Metadata = {
  // `absolute` because Next's title template does not apply within the segment
  // that defines it — app/page.tsx and app/layout.tsx are the same segment, so
  // a plain string here would ship a homepage title with no brand in it.
  title: { absolute: 'Soil Charger Technology — Soil Science for Regenerative Agriculture' },
  description:
    'Soil Charger Technology builds agricultural inputs around organic carbon, humus and root development. Twenty-one products across two ranges. Founded 2015 in Nashik, Maharashtra.',
  alternates: { canonical: '/' },
}

/**
 * Homepage.
 *
 * Every section is a Server Component. The only client JavaScript on this page
 * comes from the layout shell (header, mobile menu) — the content itself ships
 * as HTML.
 *
 * Section order follows the approved Phase 3 wireframe. The legacy homepage put
 * all of this plus three full career forms with duplicated 35-state dropdowns
 * into a single 427 KB document.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <Intro />
      <Pillars />
      <Principles />
      <Products />
      <Applications />
      <Why />
      <Projects />
      <KnowledgeLoop />
      <Resources />
      <Testimonials />
      <CTA />
    </>
  )
}
