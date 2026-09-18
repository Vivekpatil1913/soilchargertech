import type { Metadata } from 'next'
import { PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Brochures & Documents',
  description: 'Downloadable brochures and technical documents from Soil Charger Technology.',
  alternates: { canonical: '/resources/brochures' },
  robots: { index: false, follow: true },
}

export default function BrochuresPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'Brochures' }]}
        eyebrow="Brochures"
        title="Awaiting documents."
        description="Product brochures, technical datasheets and application guides."
      />

      <Section rhythm="default">
        <PlaceholderNotice
          className="max-w-2xl"
          label="Brochures and technical documents"
          meta={{
            provenance: 'placeholder',
            note: 'There is no downloadable document anywhere on the current website — no brochure, datasheet, safety sheet or application guide. Required from the client: PDFs with titles, languages and file sizes. The download UI, listing and schema are built and waiting.',
          }}
        />
      </Section>
    </>
  )
}
