import { Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'

/**
 * The three principles: Method, Rule, Meditation.
 *
 * On the legacy site these were locked inside Bootstrap modals — invisible to
 * search engines and hostile on mobile. They are the operating instructions for
 * the whole system, so here they are plain, linkable text.
 */
export async function Principles() {
  const { principles } = await content.getTechnology()

  return (
    <Section rhythm="default">
      <SectionHeading
        index={3}
        eyebrow="In practice"
        title="Three principles"
        description="What to do, what never to do, and how users keep learning from each other."
      />

      <div className="border-hairline mt-16 grid gap-px border-t lg:grid-cols-3">
        {principles.map((principle) => (
          <article
            key={principle.index}
            className="border-hairline flex flex-col gap-6 border-b py-10 lg:px-8 lg:not-first:border-l lg:first:pl-0 lg:last:pr-0"
          >
            <div className="flex items-baseline gap-3">
              <span className="data-value text-accent">
                {String(principle.index).padStart(2, '0')}
              </span>
              <h3 className="text-h4">{principle.name}</h3>
            </div>

            <p className="eyebrow text-ink-subtle">{principle.label}</p>

            <ul className="flex flex-col gap-4">
              {principle.rules.map((rule) => (
                <li key={rule.slice(0, 32)} className="text-ink-muted flex gap-3 text-[0.9375rem]">
                  <span
                    aria-hidden="true"
                    className="bg-accent rounded-pill mt-2.5 size-1 shrink-0"
                  />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
