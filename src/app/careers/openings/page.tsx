import type { Metadata } from 'next'
import { PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Open Roles',
  description: 'Current vacancies at Soil Charger Technology.',
  alternates: { canonical: '/careers/openings' },
  robots: { index: false, follow: true },
}

export default function OpeningsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Careers', href: '/careers' }, { label: 'Open roles' }]}
        eyebrow="Open roles"
        title="No vacancies listed."
        description={`Speculative applications can be sent to ${site.contacts.careers.email}.`}
      />

      <Section rhythm="default">
        <PlaceholderNotice
          className="max-w-2xl"
          label="Job vacancies"
          meta={{
            provenance: 'placeholder',
            source: 'soilchargertechnology.com/careers',
            note: 'The legacy careers page offers a generic application form but never lists a single role — no title, location, department or description. Required from the client: the actual open roles. The listing, detail layout and JobPosting schema are built and waiting.',
          }}
        />
      </Section>
    </>
  )
}
