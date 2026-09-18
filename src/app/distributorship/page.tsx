import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Button, PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Distributorship',
  description: 'Become a Soil Charger Technology distributor at village, taluka or district level.',
  alternates: { canonical: '/distributorship' },
}

/**
 * Distributorship.
 *
 * Promoted out of "Career", where the legacy site buried it three levels deep
 * behind a modal. It is a sales funnel, not a job application.
 *
 * The legacy form demanded Aadhaar (front and back), PAN, Shop Act/NOC, an
 * electricity bill and a purchase bill BEFORE any conversation — posted to an
 * endpoint with no privacy policy anywhere on the site. That flow is
 * deliberately not reproduced: qualification first, documents later.
 */
const levels = [
  { name: 'Village level', description: 'Serving growers in and around a single village.' },
  { name: 'Taluka level', description: 'Covering a taluka, usually with sub-dealers.' },
  { name: 'District level', description: 'District-wide coverage and dealer support.' },
]

const steps = [
  'Tell us your region, the level you are interested in, and your experience with the technology.',
  'We discuss coverage, terms and expectations.',
  'If both sides want to proceed, we request the statutory documents — securely, and against a published privacy policy.',
]

export default function DistributorshipPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Distributorship' }]}
        eyebrow="Distributorship"
        title="Represent the technology in your region."
        description="Distributorships are available at village, taluka and district level."
      >
        <div className="mt-2 flex flex-wrap gap-4">
          <Button href={`mailto:${site.contacts.sales.email}`} size="lg">
            Contact the sales team <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </PageHero>

      <Section rhythm="default">
        <SectionHeading
          index={1}
          eyebrow="Levels"
          title="Three levels of coverage"
          description="As offered on the current application form."
        />

        <ul className="border-hairline mt-12 grid gap-px border-t lg:grid-cols-3">
          {levels.map((level, index) => (
            <li
              key={level.name}
              className="border-hairline flex flex-col gap-4 border-b py-10 lg:px-8 lg:not-first:border-l lg:first:pl-0"
            >
              <span className="data-value text-accent">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="text-h4 font-display">{level.name}</h2>
              <p className="text-ink-muted text-[0.9375rem]">{level.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sunken" rhythm="default">
        <SectionHeading
          index={2}
          eyebrow="Application"
          title="How applying will work"
          description="A qualification conversation first. Documents only once there is a reason to exchange them."
        />

        <ol className="border-hairline mt-12 max-w-3xl border-t">
          {steps.map((step, index) => (
            <li key={step} className="border-hairline flex gap-6 border-b py-5">
              <span className="data-value text-accent shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-ink-muted">{step}</p>
            </li>
          ))}
        </ol>

        <PlaceholderNotice
          className="mt-10 max-w-2xl"
          label="Distributor application form"
          meta={{
            provenance: 'placeholder',
            source: 'soilchargertechnology.com/careers',
            note: 'Built in Milestone 11. NOTE: the legacy form collected Aadhaar (front and back), PAN, Shop Act/NOC, electricity bill and purchase bill up front, with no privacy policy, consent checkbox or stated retention period anywhere on the site. That flow will not be reproduced — the client should confirm what is legally required and at which stage.',
          }}
        />
      </Section>
    </>
  )
}
