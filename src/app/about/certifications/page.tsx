import type { Metadata } from 'next'
import { PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { unverifiedClaims } from '@/config/site'

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Certifications and registrations held by Soil Charger Technology.',
  alternates: { canonical: '/about/certifications' },
  // Nothing verifiable to index yet.
  robots: { index: false, follow: true },
}

/**
 * Certifications.
 *
 * The legacy site makes exactly one certification claim — "AN ISO 9001:2008
 * CERTIFIED COMPANY", in the footer — and ISO 9001:2008 was withdrawn in 2018.
 * No certificate number, issuing body or validity date appears anywhere.
 *
 * Publishing a withdrawn standard as a current credential would be misleading,
 * so this page states what is claimed, states the problem, and waits.
 */
export default function CertificationsPage() {
  const relevant = unverifiedClaims.filter((claim) =>
    ['iso-certification', 'government-patent', 'legal-entity-name'].includes(claim.id)
  )

  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Certifications' }]}
        eyebrow="Certifications"
        title="Awaiting documentation."
        description="This page will list the company's certifications and registrations once the supporting documents are supplied."
      />

      <Section rhythm="default">
        <SectionHeading
          index={1}
          eyebrow="Outstanding"
          title="Claims that need evidence"
          description="Each of these appears on the current website without supporting documentation, and is therefore not republished here."
        />

        <div className="mt-10 flex max-w-2xl flex-col gap-4">
          {relevant.map((claim) => (
            <PlaceholderNotice key={claim.id} label={claim.claim} meta={claim} />
          ))}
        </div>
      </Section>
    </>
  )
}
