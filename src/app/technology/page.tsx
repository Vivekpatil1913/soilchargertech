import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Button, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { content } from '@/lib/content/repository'

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'Four pillars and three principles: how Soil Charger Technology works on organic carbon, humus and root development rather than on symptoms.',
  alternates: { canonical: '/technology' },
}

const routes = [
  {
    href: '/technology/how-it-works',
    title: 'How it works',
    description: 'The four pillars, the three principles and the mechanism, end to end.',
  },
  {
    href: '/technology/advantages',
    title: 'Advantages',
    description: 'What measurably changes in the soil, taken from the product function lists.',
  },
  {
    href: '/technology/research',
    title: 'Research & development',
    description: 'Organic carbon, mycorrhiza and the work behind SCT Vedic.',
  },
]

export default async function TechnologyPage() {
  const { pillars } = await content.getTechnology()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Technology' }]}
        eyebrow="Technology"
        title={
          <>
            Treat the soil as the system,
            <br />
            <span className="text-accent">not the crop as the patient.</span>
          </>
        }
        description="Soil Charger Technology is built on four pillars and three operating principles, developed since 2015 around organic carbon, humus and root development."
      >
        <div className="mt-2 flex flex-wrap gap-4">
          <Button href="/technology/how-it-works" size="lg">
            Read the method <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <Button href="/products" size="lg" variant="secondary">
            See the products
          </Button>
        </div>
      </PageHero>

      <Section rhythm="default">
        <SectionHeading
          index={1}
          eyebrow="The framework"
          title="Four pillars"
          description="Each pillar is a decision about where to intervene — and, just as deliberately, where not to."
        />

        <ol className="border-hairline mt-14 grid gap-px border-t sm:grid-cols-2">
          {pillars.map((pillar) => (
            <li
              key={pillar.index}
              className="border-hairline flex flex-col gap-4 border-b py-10 sm:px-8 sm:first:pl-0 sm:even:border-l"
            >
              <span className="data-value text-accent">
                {String(pillar.index).padStart(2, '0')}
              </span>
              <p className="text-h3 font-display">
                <span className="text-ink">Work on {pillar.focus.toLowerCase()}</span>{' '}
                <span className="text-ink-subtle">
                  not on <s className="decoration-accent/60">{pillar.against.toLowerCase()}</s>
                </span>
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="sunken" rhythm="default">
        <SectionHeading index={2} eyebrow="Go deeper" title="Explore the technology" />

        <ul className="border-hairline mt-14 grid gap-px border-t lg:grid-cols-3">
          {routes.map((route) => (
            <li
              key={route.href}
              className="border-hairline group relative flex flex-col gap-4 border-b py-10 lg:px-8 lg:not-first:border-l lg:first:pl-0"
            >
              <h3 className="text-h4 font-display">
                <a href={route.href} className="after:absolute after:inset-0 after:content-['']">
                  {route.title}
                </a>
              </h3>
              <p className="text-ink-muted text-[0.9375rem]">{route.description}</p>
              <span className="text-accent mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.9375rem]">
                Open
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-250 group-hover:translate-x-0.5"
                />
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
