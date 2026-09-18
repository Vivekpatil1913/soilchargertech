import type { Metadata } from 'next'
import { PlaceholderNotice, Section } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of the Soil Charger Technology website.',
  alternates: { canonical: '/legal/terms' },
  robots: { index: false, follow: true },
}

/**
 * Terms of use. Like the privacy policy, this is a legal instrument and is not
 * drafted speculatively — plausible-sounding terms would be binding and wrong.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Terms of Use' }]}
        eyebrow="Legal"
        title="Terms of use required."
        description="This document must be drafted by the company, not generated."
      />

      <Section rhythm="default">
        <PlaceholderNotice
          className="max-w-2xl"
          label="Terms of use"
          meta={{
            provenance: 'placeholder',
            note: 'No terms of use exist on the current website. Required: the registered legal entity name, governing law and jurisdiction, limitations of liability, intellectual-property position on published material, and any disclaimer regarding product results. Legal review recommended.',
          }}
        />
      </Section>
    </>
  )
}
