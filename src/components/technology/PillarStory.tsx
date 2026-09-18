import { Container } from '@/components/ui'
import { content } from '@/lib/content/repository'
import { SoilProfile } from './SoilProfile'
import { PillarScrollEffects } from './PillarScrollEffects'

const ROOT_ID = 'pillar-story'

/**
 * The four pillars, told as a sequence.
 *
 * This is the section Milestone 9 pins and scrubs: the soil profile stays fixed
 * while the four scenes advance through it. The markup below is the resting
 * state — a sticky graphic beside a scrolling list — which already works
 * without a line of JavaScript, on every browser, and at every viewport.
 *
 * That ordering is deliberate. The animation is an enhancement over a layout
 * that is complete on its own, so a reduced-motion visitor, a crawler, or
 * anyone whose JS fails still gets the whole argument.
 */
export async function PillarStory() {
  const { pillars } = await content.getTechnology()

  return (
    <section id={ROOT_ID} className="surface-dark border-hairline border-t py-20 lg:py-28">
      {/* Attaches scroll choreography to markup that already works without it. */}
      <PillarScrollEffects rootId={ROOT_ID} />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky graphic */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SoilProfile className="text-ink mx-auto w-full max-w-sm" />

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
                className="border-hairline flex flex-col gap-5 border-b py-12 first:pt-0 last:border-b-0 lg:min-h-[60vh] lg:justify-center"
              >
                <span className="data-value text-accent">
                  {String(pillar.index).padStart(2, '0')} / 04
                </span>

                <h2 className="text-h2 font-display">
                  <span className="text-ink">Work on {pillar.focus.toLowerCase()}</span>
                  <br />
                  <span className="text-ink-subtle">
                    not on <s className="decoration-accent/60">{pillar.against.toLowerCase()}</s>
                  </span>
                </h2>

                {/* `pillar.statement` is deliberately not rendered: it is the
                    same sentence as the heading above, verbatim. */}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
