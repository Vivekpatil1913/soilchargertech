import { Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'

/**
 * How the technology developed, in the founder's own account.
 *
 * Every entry paraphrases a sentence that exists on the legacy About page. The
 * "10 years of research by Vedic Scientists" claim that accompanies the final
 * step is omitted — see `unverifiedClaims` in src/config/site.ts.
 */
export async function Timeline() {
  const { timeline } = await content.getTechnology()

  return (
    <Section rhythm="default">
      <SectionHeading
        index={3}
        eyebrow="How it developed"
        title="Four steps, then a fifth"
        description="The sequence the founder describes: carbon first, then pollution, then hormones, then crop protection."
      />

      <ol className="border-hairline mt-14 border-t">
        {timeline.map((entry, index) => (
          <li
            key={entry.title}
            className="border-hairline grid gap-4 border-b py-8 lg:grid-cols-12 lg:gap-8"
          >
            <div className="flex items-baseline gap-4 lg:col-span-3">
              <span className="data-value text-accent">{String(index + 1).padStart(2, '0')}</span>
              {entry.period && <span className="data-value text-ink-subtle">{entry.period}</span>}
            </div>

            <h3 className="text-h4 font-display lg:col-span-4">{entry.title}</h3>

            <p className="text-ink-muted lg:col-span-5">{entry.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
