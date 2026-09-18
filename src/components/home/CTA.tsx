import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import ctaPhoto from '../../../public/images/gallery/246.jpg'

/**
 * Closing call to action.
 *
 * Two paths, because the site serves two distinct audiences the legacy site
 * conflated: growers who want to use the technology, and businesses who want to
 * distribute it. The old site sent both through the same "Shop Now" button —
 * which opened an export enquiry modal.
 *
 * The photograph closes the loop the hero opens: it opened on a hall of farmers
 * being taught and closes on the field team and the growers they work with,
 * together. Both frames are real documentation of this company, which is the
 * only kind of agricultural imagery this project has (see the media audit) and,
 * for a closing CTA, the only kind worth having — a stock sunset over wheat
 * would say nothing a visitor could check.
 *
 * Same three-layer contrast treatment as the hero: photograph at 35%, then two
 * carbon scrims, so the type sits on effectively solid carbon and the measured
 * token ratios hold. Not preloaded — it is far below the fold and must not
 * compete with the hero for bandwidth.
 */
export function CTA() {
  return (
    <section className="surface-dark relative overflow-hidden py-24 md:py-36 lg:py-48">
      <Image
        src={ctaPhoto}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        placeholder="blur"
        className="pointer-events-none object-cover object-center opacity-55"
      />

      <div
        aria-hidden="true"
        className="from-carbon via-carbon/90 to-carbon/75 lg:via-carbon/80 lg:to-carbon/25 pointer-events-none absolute inset-0 bg-gradient-to-r lg:from-20% lg:via-55%"
      />
      <div
        aria-hidden="true"
        className="from-carbon to-carbon/50 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent"
      />
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 opacity-20"
      />

      <Container className="relative">
        <div className="flex max-w-3xl flex-col gap-8">
          <h2 className="text-display-lg">
            Start with the soil.
            <br />
            <span className="text-accent">Everything else follows.</span>
          </h2>

          <p className="text-body-lg text-ink-muted max-w-xl">
            Talk to the team about which products suit your crop and conditions, or about
            distributing the technology in your region.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Talk to the team <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href="/distributorship" size="lg" variant="secondary">
              Become a distributor
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
