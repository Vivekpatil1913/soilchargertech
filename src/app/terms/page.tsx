import type { Metadata } from "next";
import { contact, site } from "@/data/site";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { PlaceholderNote } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms governing use of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        lead={`The terms on which ${site.name} provides this website.`}
      />

      <section className="section-y bg-cream-50">
        <Container width="narrow">
          <div className="space-y-8 text-[0.98rem] leading-relaxed text-ink-600">
            <div>
              <h2 className="text-h3 text-ink-900">About this website</h2>
              <p className="mt-3">
                This website is published by {site.legalName}, Nashik, Maharashtra. By using it you
                accept the terms set out on this page.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Agricultural information is general</h2>
              <p className="mt-3">
                Everything published here about soil, crops and agricultural practice is general
                information. It is not a recommendation for your particular field. Soil type,
                climate, water, crop, variety and season all change what is appropriate, so please
                speak to the SCT team — or a qualified agronomist — before acting on anything you
                read here.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Product information</h2>
              <p className="mt-3">
                Product names and ranges shown on this site are SCT&apos;s own. Where a description,
                composition or dosage has not yet been published by the company, the site says so
                rather than estimating. Always follow the instructions on the actual product label,
                which take precedence over anything on this website.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Intellectual property</h2>
              <p className="mt-3">
                The {site.name} name, logo and brand marks belong to {site.legalName}. Site text and
                design may not be reproduced for commercial purposes without written permission.
                Some photography on this site is used under open licences pending replacement with
                SCT&apos;s own images.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Translation</h2>
              <p className="mt-3">
                The language selector uses Google Translate, an automated service. Translations are
                provided for convenience and may not be exact. Where meaning matters, the English
                text is the authoritative version — and the SCT team is available in Marathi and
                Hindi if something is unclear.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">External links</h2>
              <p className="mt-3">
                This site links to third-party services such as WhatsApp, Google Maps and social
                platforms. We are not responsible for their content or their practices.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Contact</h2>
              <p className="mt-3">
                Questions about these terms:{" "}
                <a
                  href={`mailto:${contact.emails.general}`}
                  className="font-semibold text-brand-700 underline underline-offset-4"
                >
                  {contact.emails.general}
                </a>{" "}
                or {contact.phones[0]}.
              </p>
            </div>
          </div>

          <PlaceholderNote>
            Drafted to describe how this website behaves. Not legal advice — SCT should have these
            terms reviewed by a lawyer before launch, particularly the agricultural information and
            product sections.
          </PlaceholderNote>
        </Container>
      </section>
    </>
  );
}
