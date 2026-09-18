import type { Metadata } from 'next'
import { PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Infrastructure',
  description: 'Manufacturing and laboratory infrastructure at Soil Charger Technology.',
  alternates: { canonical: '/about/infrastructure' },
  robots: { index: false, follow: true },
}

/**
 * Infrastructure. Requested in the brief; no source content exists on the
 * legacy site — not a single reference to a plant, laboratory, capacity or
 * process. The page shape ships; the substance must come from the client.
 */
export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Infrastructure' }]}
        eyebrow="Infrastructure"
        title="Awaiting content."
        description="Manufacturing, laboratory and quality-control capability."
      />

      <Section rhythm="default">
        <PlaceholderNotice
          className="max-w-2xl"
          label="Infrastructure"
          meta={{
            provenance: 'placeholder',
            note: 'Nothing on the current website references a manufacturing plant, laboratory, production capacity, quality-control process or equipment. Required from the client: facility locations, photographs, production capacity, QC procedures and any equipment worth naming.',
          }}
        />
      </Section>
    </>
  )
}
