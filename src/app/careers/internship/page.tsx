import type { Metadata } from 'next'
import { PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Internships',
  description: 'Internship opportunities at Soil Charger Technology.',
  alternates: { canonical: '/careers/internship' },
  robots: { index: false, follow: true },
}

export default function InternshipPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Careers', href: '/careers' }, { label: 'Internships' }]}
        eyebrow="Internships"
        title="Awaiting programme details."
        description={`Enquiries can be sent to ${site.contacts.careers.email}.`}
      />

      <Section rhythm="default">
        <PlaceholderNotice
          className="max-w-2xl"
          label="Internship programme"
          meta={{
            provenance: 'placeholder',
            source: 'soilchargertechnology.com/careers',
            note: 'The legacy site collects internship applications but describes no programme — no duration, disciplines, location, stipend or what an intern would actually do. Required from the client before this page can say anything useful.',
          }}
        />
      </Section>
    </>
  )
}
