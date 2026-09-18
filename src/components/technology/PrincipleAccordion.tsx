import { Section, SectionHeading } from '@/components/ui'
import { Accordion } from '@/components/ui/Accordion'
import { content } from '@/lib/content/repository'

/**
 * The three principles as a disclosure list.
 *
 * On the legacy site these lived in Bootstrap modals — uncrawlable, unlinkable
 * and painful on mobile. The Accordion is a Client Component, but the rules
 * themselves are passed in as server-rendered children, so none of this text
 * costs client-side JavaScript.
 */
export async function PrincipleAccordion() {
  const { principles } = await content.getTechnology()

  const items = principles.map((principle) => ({
    marker: String(principle.index).padStart(2, '0'),
    title: principle.name,
    meta: principle.label,
    content: (
      <ul className="flex max-w-3xl flex-col gap-4 pl-0 lg:pl-14">
        {principle.rules.map((rule) => (
          <li key={rule.slice(0, 32)} className="text-ink-muted flex gap-3">
            <span aria-hidden="true" className="bg-accent rounded-pill mt-2.5 size-1 shrink-0" />
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    ),
  }))

  return (
    <Section tone="sunken" rhythm="default">
      <SectionHeading
        index={2}
        eyebrow="In practice"
        title="Three principles"
        description="The method to follow, the damage to avoid, and the daily practice that keeps users learning."
      />

      <Accordion items={items} className="mt-14" />
    </Section>
  )
}
