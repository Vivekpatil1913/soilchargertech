import Image from 'next/image'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { site } from '@/config/site'
import heroPhoto from '../../../public/images/gallery/234.jpg'

/**
 * Homepage hero.
 *
 * Positioning note: the legacy hero read "SOIL Is HEALTHIER, FARMER WALTHIER"
 * over the claim "We Are India's Leading Organic Farming Group". The typo is
 * live, and the superlative has no cited basis, so neither is reproduced (see
 * `unverifiedClaims`). The headline here states what the company verifiably
 * does — work on soil rather than on symptoms — which is the actual content of
 * the four pillars.
 *
 * PHOTOGRAPHY: the recovered media contains no field, crop or soil photography
 * at all — every usable frame is seminar and exhibition documentation (see the
 * media audit in README). Rather than buy a stock wheat field that has nothing
 * to do with this company, the hero uses what is actually true about it: a hall
 * in Maharashtra full of farmers being taught the method. That photograph is
 * the company's distinctive asset and it earns the "the method is taught, every
 * day" claim made further down the page.
 *
 * LCP DISCIPLINE — unchanged from the text-only version:
 *   - The heading is server-rendered HTML and its reveal is pure CSS
 *     (`.hero-rise`), transform only, never opacity, so the Largest Contentful
 *     Paint timestamp is unaffected and there is no hydration flash.
 *   - The photograph carries `preload` (Next 16: `priority` is deprecated in
 *     favour of it) so it starts downloading from the <head>.
 *   - It is imported statically, so Next has intrinsic dimensions at build time
 *     and the hero cannot shift.
 *
 * CONTRAST: the photograph never sits directly behind type. Three stacked
 * layers — the image at 65%, a horizontal carbon scrim and a vertical one —
 * leave the text column reading against what is effectively solid carbon.
 * Measured against the brightest pixel behind each glyph run, at 390 / 768 /
 * 1440: heading 9.0–9.4:1, lede 9.1–10.1:1, eyebrow 9.8–10.3:1. All AAA, so
 * the token ratios in globals.css still hold over the image.
 */
export function Hero() {
  return (
    <section className="surface-dark relative overflow-hidden">
      {/* --- Layer 1: the photograph ------------------------------------- */}
      <Image
        src={heroPhoto}
        alt=""
        aria-hidden="true"
        preload
        fill
        sizes="100vw"
        placeholder="blur"
        className="pointer-events-none object-cover object-center opacity-65"
      />

      {/* --- Layer 2: scrims. Two axes, so the text column is protected at
              every viewport: horizontal for desktop (text left, image right),
              vertical for mobile (text stacked over the frame).

              The horizontal stop sits at 55% — the text column ends around
              half the viewport, so everything behind type is at or near solid
              carbon while the right third of the frame stays legible as a
              photograph. Scrimming the whole width uniformly was the first
              attempt and it read as a grey smear rather than a room.

              Below `lg` that directional scrim is wrong: the text runs the full
              width of the viewport, so its right-hand end would land on the
              thinnest part of the gradient — measured at 2.9:1 over the bright
              crowd in the lower right of the frame. Small screens therefore get
              a near-uniform scrim and a quieter photograph, which is the right
              trade on the device most of this audience is holding. ---------- */}
      <div
        aria-hidden="true"
        className="from-carbon via-carbon/90 to-carbon/75 lg:via-carbon/80 lg:to-carbon/15 pointer-events-none absolute inset-0 bg-gradient-to-r lg:from-20% lg:via-55%"
      />
      <div
        aria-hidden="true"
        className="from-carbon to-carbon/45 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent"
      />

      {/* --- Layer 3: the engineering grid motif -------------------------- */}
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 opacity-20"
      />

      {/* --- Layer 4: soil-horizon band, drawn in CSS --------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2">
        <div className="from-charge-950/50 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      <Container className="relative">
        <div className="hero-rise flex min-h-[calc(100svh-5rem)] flex-col justify-center py-24 lg:py-32">
          <p className="eyebrow">
            <span className="text-accent">Since {site.foundedYear}</span> · {site.address.city},{' '}
            {site.address.region}
          </p>

          <h1 className="text-display-xl mt-8 max-w-4xl">
            Work on the soil,
            <br />
            <span className="text-accent">not on the symptoms.</span>
          </h1>

          <p className="text-body-lg text-ink-muted mt-8 max-w-xl">
            Soil Charger Technology builds agricultural inputs around organic carbon, humus and root
            development — treating soil as the system that everything else depends on.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/technology/how-it-works" size="lg">
              How it works <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href="/products" size="lg" variant="secondary">
              View the products
            </Button>
          </div>

          {/* Scroll cue */}
          <div className="mt-20 flex items-center gap-3 lg:mt-28">
            <ArrowDown aria-hidden="true" className="text-accent size-4" />
            <span className="eyebrow">Four pillars</span>
          </div>
        </div>
      </Container>

      {/* Photograph credit. A background image that is plainly a real place
          should say what place — it is the difference between documentation and
          decoration. Hidden on small screens where it would crowd the CTAs. */}
      <p className="eyebrow text-ink-subtle absolute right-6 bottom-6 hidden max-w-[16rem] text-right normal-case lg:block">
        A farmer seminar in Maharashtra
      </p>
    </section>
  )
}
