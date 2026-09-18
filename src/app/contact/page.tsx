import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button, Section, SectionHeading } from '@/components/ui'
import { ContactFormLazy } from '@/components/forms/ContactFormLazy'
import { PageHero } from '@/components/layout/PageHero'
import { JsonLd } from '@/lib/seo/jsonld'
import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact Soil Charger Technology in ${site.address.city}, ${site.address.region}. Separate routes for general enquiries, sales and distribution, and careers.`,
  alternates: { canonical: '/contact' },
}

/**
 * Contact.
 *
 * This page did not exist on the legacy site at all — /contact returned 404 and
 * the "Contact" navigation item was an anchor jump to the footer. It was the
 * single highest-value missing page.
 *
 * The three published email addresses and two phone numbers are routed by
 * purpose rather than dumped in a list, which is what the old footer did.
 */
export default function ContactPage() {
  const { address, contacts, whatsapp } = site

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          mainEntity: { '@id': `${site.url}/#organization` },
        }}
      />

      <PageHero
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Contact"
        title="Talk to the team."
        description="Three routes, depending on what you need. Each goes to a different inbox."
      />

      <Section rhythm="default">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <SectionHeading index={1} eyebrow="Direct" title="Who to contact" />

              <ul className="border-hairline mt-8 border-t">
                {Object.entries(contacts).map(([key, contact]) => (
                  <li key={key} className="border-hairline flex flex-col gap-2 border-b py-6">
                    <p className="eyebrow">{contact.label}</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-ink hover:text-accent inline-flex items-center gap-2 transition-colors"
                    >
                      <Mail aria-hidden="true" className="text-accent size-4 shrink-0" />
                      {contact.email}
                    </a>
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-ink hover:text-accent inline-flex items-center gap-2 transition-colors"
                      >
                        <Phone aria-hidden="true" className="text-accent size-4 shrink-0" />
                        <span className="data-value">{contact.phoneDisplay}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-hairline flex flex-col items-start gap-4 border p-8">
              <MessageCircle aria-hidden="true" className="text-accent size-6" />
              <h2 className="text-h4 font-display">WhatsApp</h2>
              <p className="text-ink-muted text-[0.9375rem]">
                For quick questions about application or availability.
              </p>
              <Button
                href={`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.defaultMessage)}`}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
              >
                <span className="data-value">{whatsapp.display}</span>
              </Button>
            </div>

            <address className="not-italic">
              <p className="eyebrow">Registered office</p>
              <p className="text-ink-muted mt-4 flex gap-3">
                <MapPin aria-hidden="true" className="text-accent mt-1 size-4 shrink-0" />
                <span>
                  {address.street}
                  <br />
                  {address.locality}
                  <br />
                  {address.city} — <span className="data-value">{address.postalCode}</span>
                  <br />
                  {address.region}, {address.countryName}
                </span>
              </p>
            </address>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading index={2} eyebrow="Enquiry" title="Send a message" />
            <div className="mt-8">
              <ContactFormLazy />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
