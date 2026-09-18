import { Container } from '@/components/ui'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { content } from '@/lib/content/repository'

/**
 * The company's published figures.
 *
 * The legacy page renders two of these with a spurious "K" multiplier
 * ("155000 K YOUTUBE SUBSCRIBER"). The raw values are shown here and that error
 * is not reproduced.
 *
 * The counters animate from a server-rendered resting value: the true number is
 * in the HTML before any JavaScript runs, so it is correct with JS disabled and
 * correct again if the component unmounts mid-count.
 *
 * NOTE: these records are still `needs-verification` in the data layer — the
 * on-page notice was removed at the client's request, not the flag. They remain
 * listed by `npm run audit:content`.
 */
export async function ProofBar() {
  const statistics = await content.getStatistics()

  return (
    <section className="surface-dark border-hairline border-t">
      <Container>
        <ul className="grid grid-cols-2 gap-px lg:grid-cols-5">
          {statistics.map((stat) => (
            <li key={stat.label} className="py-8 lg:py-10">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix ?? ''}
                className="text-accent text-h3 block"
              />
              <p className="text-caption text-ink-muted mt-2">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
