import type { Metadata } from 'next'
import { PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { Timeline } from '@/components/technology'
import { PageHero } from '@/components/layout/PageHero'
import { unverifiedClaims } from '@/config/site'

export const metadata: Metadata = {
  title: 'Research & Development',
  description:
    'The development of Soil Charger Technology since 2015 — organic carbon, mycorrhiza-supported hormone development, and the origins of SCT Vedic.',
  alternates: { canonical: '/technology/research' },
  // Thin until the client supplies R&D substance; no value in indexing it yet.
  robots: { index: false, follow: true },
}

/**
 * Research & Development.
 *
 * Almost nothing on the legacy site supports this page. It asserts "10 years of
 * research" by "Vedic Scientists" and mentions mycorrhiza once, with no named
 * researchers, institutions, trials or published work.
 *
 * So the page ships with the one thing that IS verifiable — the founder's
 * development timeline — and states plainly what is missing, rather than
 * padding it out with invented credentials.
 */
export default function ResearchPage() {
  const researchClaim = unverifiedClaims.find((claim) => claim.id === 'research-duration')

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Technology', href: '/technology' }, { label: 'Research & Development' }]}
        eyebrow="Research & development"
        title="Developed in the field, since 2015."
        description="The verifiable record of how the technology developed, step by step."
      />

      <Timeline />

      <Section tone="sunken" rhythm="default">
        <SectionHeading
          index={4}
          eyebrow="Awaiting content"
          title="What this page still needs"
          description="This section is architected and ready. It cannot be written without source material."
        />

        <div className="mt-10 flex max-w-2xl flex-col gap-4">
          {researchClaim && <PlaceholderNotice label="Research claim" meta={researchClaim} />}
          <PlaceholderNotice
            label="R&D substance"
            meta={{
              provenance: 'placeholder',
              note: 'Required from the client: named researchers and their affiliations, laboratory or field-trial protocols, soil test methodology, trial results, and any published papers or third-party validation.',
            }}
          />
        </div>
      </Section>
    </>
  )
}
