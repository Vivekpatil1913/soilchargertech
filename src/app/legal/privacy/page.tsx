import type { Metadata } from 'next'
import { PlaceholderNotice, Section, SectionHeading } from '@/components/ui'
import { PageHero } from '@/components/layout/PageHero'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Soil Charger Technology collects, uses and stores personal information.',
  alternates: { canonical: '/legal/privacy' },
  robots: { index: false, follow: true },
}

/**
 * Privacy policy.
 *
 * NOT drafted here, deliberately. A privacy policy is a legal instrument that
 * must reflect what the company actually does with data — writing plausible
 * text would create a document that is binding and wrong.
 *
 * This matters more than usual for this client: the legacy site collects
 * Aadhaar and PAN card images through a public form, with no privacy policy,
 * no consent checkbox and no stated retention period anywhere on the site.
 */
const required = [
  'What personal data is collected, at which point, and through which form',
  'The lawful basis for collecting it, and what it is used for',
  'Who it is shared with — including the hosting and email providers used',
  'How long each category is retained, especially Aadhaar and PAN images',
  'How data is secured in transit and at rest, and who internally can access it',
  'How a person can request access, correction or deletion, and who to contact',
  'Cookie and analytics usage, if any',
  'Compliance position under the Digital Personal Data Protection Act, 2023',
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Privacy Policy' }]}
        eyebrow="Legal"
        title="Privacy policy required."
        description="This document must be drafted by the company, not generated."
      />

      <Section rhythm="default">
        <PlaceholderNotice
          className="max-w-2xl"
          label="Privacy policy"
          meta={{
            provenance: 'placeholder',
            note: `No privacy policy exists on the current website, while its distributor form collects Aadhaar card images (front and back) and PAN card images from the public. This is a live compliance exposure and should be resolved before launch. Legal review recommended; enquiries to ${site.contacts.general.email}.`,
          }}
        />

        <SectionHeading
          className="mt-16"
          index={1}
          eyebrow="Checklist"
          title="What the policy must cover"
          description="Provide answers to each and the page can be written."
        />

        <ol className="border-hairline mt-10 max-w-3xl border-t">
          {required.map((item, index) => (
            <li key={item} className="border-hairline flex gap-6 border-b py-5">
              <span className="data-value text-accent shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-ink-muted">{item}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
