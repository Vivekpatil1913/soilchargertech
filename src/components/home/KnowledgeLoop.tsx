import { MessagesSquare, Users, Youtube } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'
import { Reveal } from '@/components/motion/Reveal'

const icons = [Youtube, MessagesSquare, Users] as const

/**
 * The third principle, given its own section.
 *
 * A daily video, a daily article and a daily farmer-to-farmer conversation —
 * described on the legacy site as the breath, the water and the food of an SCT
 * user. It is the most distinctive thing the company does and it was buried in
 * a modal.
 */
export async function KnowledgeLoop() {
  const { knowledgeLoop } = await content.getTechnology()

  return (
    <Section tone="dark" rhythm="default" grid>
      <SectionHeading
        index={6}
        eyebrow="The third principle"
        title="The method is taught, every day"
        description="Breath, water and food — the company's own words for how users keep the practice alive."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {knowledgeLoop.map((item, index) => {
          const Icon = icons[index] ?? Youtube
          return (
            <Reveal
              as="article"
              key={item.channel}
              delay={index * 0.1}
              className="border-hairline flex flex-col gap-5 border p-8"
            >
              <Icon aria-hidden="true" className="text-accent size-6" />
              <div>
                <p className="eyebrow text-accent">{item.role}</p>
                <h3 className="text-h4 font-display mt-2">{item.channel}</h3>
              </div>
              <p className="text-ink-muted text-[0.9375rem]">{item.description}</p>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
