import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Button, DataValue, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { Timeline } from '@/components/technology'
import { content } from '@/lib/content/repository'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Soil Charger Technology was founded in 2015 in Nashik, Maharashtra, to increase soil fertility and organic carbon. Company overview, vision and mission.',
  alternates: { canonical: '/about' },
}

/**
 * Company overview.
 *
 * Consolidates three legacy pages — /about-us, /vision-mission and /our-team —
 * which between them duplicated the homepage and each other. Three thin pages
 * with a duplicate-content penalty become one substantial page.
 */
export default async function AboutPage() {
  const { founderStatement, vision, mission } = await content.getCompany()

  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        eyebrow="About"
        title="Founded on a diagnosis, not a product."
        description={founderStatement.intro}
      />

      <Section rhythm="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading index={1} eyebrow="From the founder" title="Why SCT exists" />
            <div className="border-hairline mt-8 border-t pt-6">
              <p className="text-ink font-medium">{site.founder.name}</p>
              <p className="text-caption text-ink-subtle mt-1">{site.founder.role}</p>
              <p className="text-caption text-ink-subtle">{site.founder.location}</p>
            </div>
          </div>

          <div className="text-body-lg text-ink-muted flex flex-col gap-5 lg:col-span-7">
            {founderStatement.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="sunken" rhythm="default">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading index={2} eyebrow="Vision" title="Where this is going" />
            <ul className="mt-8 flex flex-col gap-4">
              {vision.points.map((point) => (
                <li key={point} className="text-ink-muted flex gap-3 text-[1.0625rem]">
                  <span
                    aria-hidden="true"
                    className="bg-accent rounded-pill mt-2.5 size-1 shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading index={3} eyebrow="Mission" title="What we are doing about it" />
            <ul className="mt-8 flex flex-col gap-4">
              {mission.points.map((point) => (
                <li key={point} className="text-ink-muted flex gap-3 text-[1.0625rem]">
                  <span
                    aria-hidden="true"
                    className="bg-accent rounded-pill mt-2.5 size-1 shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Timeline />

      <Section tone="dark" rhythm="default" grid>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-h2">The people behind it</h2>
            <p className="text-body-lg text-ink-muted">
              A small team across production, development, operations and technical support.
            </p>
            <Button href="/about/leadership" className="self-start">
              Meet the team <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>

          <dl className="border-hairline grid gap-px self-start border-t">
            <div className="border-hairline flex justify-between gap-6 border-b py-5">
              <dt className="eyebrow pt-1">Founded</dt>
              <dd>
                <DataValue value={site.foundedYear} className="text-ink" />
              </dd>
            </div>
            <div className="border-hairline flex justify-between gap-6 border-b py-5">
              <dt className="eyebrow pt-1">Headquarters</dt>
              <dd>
                <DataValue
                  value={`${site.address.city}, ${site.address.region}`}
                  className="text-ink"
                />
              </dd>
            </div>
            <div className="border-hairline flex justify-between gap-6 border-b py-5">
              <dt className="eyebrow pt-1">Products</dt>
              <dd>
                <DataValue value="21" unit="across 2 ranges" className="text-ink" />
              </dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  )
}
