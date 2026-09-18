import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Button, PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'Technology Advantages',
  description:
    'What Soil Charger Technology changes in the soil: organic carbon, white root development, chelation, pH and EC control, microbial metabolism and stress tolerance.',
  alternates: { canonical: '/technology/advantages' },
}

export default async function AdvantagesPage() {
  const { benefits } = await content.getCompany()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Technology', href: '/technology' }, { label: 'Advantages' }]}
        eyebrow="Advantages"
        title="Six things that change in the soil."
        description="Taken verbatim from the published function lists of the products. Nothing here is a marketing claim."
      />

      <Section rhythm="default">
        <ul className="border-hairline grid gap-px border-t sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              className="border-hairline flex flex-col gap-4 border-b py-10 sm:px-8 sm:first:pl-0 sm:even:border-l"
            >
              <span className="data-value text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="text-h3 font-display">{benefit.title}</h2>
              <p className="text-ink-muted">{benefit.description}</p>
            </li>
          ))}
        </ul>

        <PlaceholderNotice
          className="mt-12 max-w-2xl"
          label="Quantified outcomes"
          meta={{
            provenance: 'placeholder',
            note: 'The legacy site states these effects but publishes no measurements — no soil test results, no yield data, no before/after figures. Quantified outcomes require client data before they can appear here.',
          }}
        />
      </Section>

      <Section tone="dark" rhythm="default" grid>
        <div className="flex max-w-2xl flex-col gap-8">
          <h2 className="text-h2">See the full method</h2>
          <p className="text-body-lg text-ink-muted">
            These effects come from how the products are applied — the four pillars and three
            principles set out the practice.
          </p>
          <Button href="/technology/how-it-works" size="lg">
            How it works <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </Section>
    </>
  )
}
