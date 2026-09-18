import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Button, Section, SectionHeading } from '@/components/ui'
import { PillarStory, PrincipleAccordion, Timeline } from '@/components/technology'
import { PageHero } from '@/components/layout/PageHero'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'The four pillars, three principles and soil mechanism behind Soil Charger Technology — organic carbon, white root development, chelation, pH and EC control, and microbial metabolism.',
  alternates: { canonical: '/technology/how-it-works' },
}

/**
 * The flagship page.
 *
 * Section order follows the approved Phase 3 wireframe: problem → pillars →
 * principles → mechanism → timeline → CTA. The pillar story is the section that
 * gets pinned and scrubbed in Milestone 9.
 */
export default async function HowItWorksPage() {
  const { founderStatement, benefits } = await content.getCompany()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Technology', href: '/technology' }, { label: 'How It Works' }]}
        eyebrow="How it works"
        title="Four pillars, three principles, one system."
        description="The whole method in the order it was developed — and the order it is applied."
      />

      {/* The problem, in the founder's framing */}
      <Section rhythm="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading index={1} eyebrow="The problem" title="What went wrong" as="h2" />
          </div>
          <div className="text-body-lg text-ink-muted flex flex-col gap-5 lg:col-span-7">
            <p className="text-ink">{founderStatement.intro}</p>
            {founderStatement.paragraphs.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <PillarStory />

      <PrincipleAccordion />

      {/* Mechanism — every step traced to a published product function */}
      <Section rhythm="default">
        <SectionHeading
          index={4}
          eyebrow="The mechanism"
          title="What happens in the soil"
          description="Each step below is taken from the published function list of the products themselves, not written as a benefit claim."
        />

        <ol className="border-hairline mt-14 border-t">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              className="border-hairline grid gap-4 border-b py-8 lg:grid-cols-12 lg:gap-8"
            >
              <span className="data-value text-accent lg:col-span-2">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h4 font-display lg:col-span-4">{benefit.title}</h3>
              <p className="text-ink-muted lg:col-span-6">{benefit.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Timeline />

      <Section tone="dark" rhythm="default" grid>
        <div className="flex max-w-2xl flex-col gap-8">
          <h2 className="text-h2">Applying it to your crop</h2>
          <p className="text-body-lg text-ink-muted">
            Dosage differs by crop and context. The product pages carry the published application
            rates and pack sizes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/products" size="lg">
              View the products <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Talk to the team
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
