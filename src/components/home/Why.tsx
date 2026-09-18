import { Section, SectionHeading } from '@/components/ui'
import { content } from '@/lib/content/repository'
import { Reveal } from '@/components/motion/Reveal'

/**
 * What the technology changes in the soil.
 *
 * Every line here is lifted from a verified product function list — mostly
 * Super Soil Charger's eight numbered functions. Nothing is a benefit claim
 * written by us, which is why the section reads as mechanism rather than
 * marketing.
 */
export async function Why() {
  const { benefits } = await content.getCompany()

  return (
    <Section rhythm="default">
      <SectionHeading
        index={5}
        eyebrow="What changes"
        title="Measured at the root, not at the fruit"
        description="Drawn directly from the published function list of the products themselves."
      />

      <ul className="border-hairline mt-14 grid gap-px border-t sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Reveal
            as="li"
            key={benefit.title}
            delay={(index % 3) * 0.08}
            className="border-hairline flex flex-col gap-3 border-b py-8 lg:px-8 lg:first:pl-0"
          >
            <span className="data-value text-accent">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="text-h4 font-display">{benefit.title}</h3>
            <p className="text-ink-muted text-[0.9375rem]">{benefit.description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
