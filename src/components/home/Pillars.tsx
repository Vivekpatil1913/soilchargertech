import { ArrowRight } from 'lucide-react'
import { Button, Container, SectionHeading } from '@/components/ui'
import { SoilProfile } from '@/components/technology/SoilProfile'
import { PillarScrollEffects } from '@/components/technology/PillarScrollEffects'
import { content } from '@/lib/content/repository'

const ROOT_ID = 'home-pillars'

/**
 * The four pillars — the most important section on the site.
 *
 * Previously a flat 2×2 bordered list. The soil cross-section and its
 * scroll choreography already existed but were reachable only from
 * /technology/how-it-works, which meant the strongest piece of storytelling on
 * the site was two clicks from anyone who ever saw the homepage. It is the
 * centrepiece here now: the profile stays fixed while the four scenes advance
 * through it, and the root network, root tips and microbial layers deepen as
 * they do — the graphic literally illustrates the argument being made beside
 * it.
 *
 * Built static and semantic first. The markup below is the resting state:
 * every pillar is fully readable with JavaScript disabled, the diagram renders
 * complete, and the animation only moves what is already here. On viewports
 * below 1024px the graphic would swallow the screen, so `PillarScrollEffects`
 * confines itself to desktop and phones keep the plain stacked layout.
 *
 * The "X, not Y" contrast is expressed typographically — the rejected term is
 * struck through and de-emphasised — because that contrast IS the idea.
 *
 * Heading levels: one <h2> owns the band and each pillar is an <h3>. The
 * standalone version on /technology/how-it-works makes each pillar an <h2>,
 * which is right there and wrong here.
 */
export async function Pillars() {
  const { pillars } = await content.getTechnology()

  return (
    <section id={ROOT_ID} className="surface-dark relative py-24 md:py-36 lg:py-48">
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 opacity-40"
      />

      {/* Attaches scroll choreography to markup that already works without it. */}
      <PillarScrollEffects rootId={ROOT_ID} />

      <Container className="relative">
        <SectionHeading
          index={2}
          eyebrow="The technology"
          title="Four pillars"
          description="The framework the whole method rests on. Each one is a deliberate choice about where to intervene."
          action={
            <Button href="/technology/how-it-works" variant="secondary">
              The full method <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          }
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Sticky graphic */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SoilProfile className="text-ink mx-auto w-full max-w-sm" />

              {/* Progress markers. `PillarScrollEffects` lights each one while
                  its scene owns the viewport — the only moving indicator of
                  where you are in the story. */}
              <ul className="border-hairline mt-8 flex justify-between gap-2 border-t pt-4">
                {pillars.map((pillar) => (
                  <li
                    key={pillar.index}
                    data-pillar-marker={pillar.index}
                    className="data-value text-ink-subtle transition-colors"
                  >
                    {String(pillar.index).padStart(2, '0')}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The four scenes */}
          <ol className="lg:col-span-7">
            {pillars.map((pillar) => (
              <li
                key={pillar.index}
                data-pillar={pillar.index}
                // The scene height sets the pace of the scrub: tall enough that
                // each pillar owns the viewport for a moment, short enough that
                // a heading alone does not sit in a void. 38vh was arrived at
                // after 58 and 52 both left visible dead space once the
                // duplicated statement line was removed.
                className="border-hairline flex flex-col gap-5 border-b py-12 first:pt-0 last:border-b-0 lg:min-h-[38vh] lg:justify-center"
              >
                <span className="data-value text-accent">
                  {String(pillar.index).padStart(2, '0')} / 04
                </span>

                {/* `pillar.statement` is not rendered here. It reads "Work on
                    nourishment, not on disease." — word for word what this
                    heading already says, so printing both put the same
                    sentence on screen twice in two type sizes. The heading is
                    the statement. */}
                <h3 className="text-h2 font-display">
                  <span className="text-ink">Work on {pillar.focus.toLowerCase()}</span>
                  <br />
                  <span className="text-ink-subtle">
                    not on <s className="decoration-accent/60">{pillar.against.toLowerCase()}</s>
                  </span>
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
