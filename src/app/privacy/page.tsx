import type { Metadata } from "next";
import { contact, site } from "@/data/site";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { PlaceholderNote } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you share through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/**
 * A plain-language privacy policy covering what this site actually does — which
 * is very little. It is NOT legal advice and has not been reviewed by a lawyer;
 * SCT should have it checked before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`How ${site.name} handles information shared through this website.`}
      />

      <section className="section-y bg-cream-50">
        <Container width="narrow">
          <div className="space-y-8 text-[0.98rem] leading-relaxed text-ink-600">
            <div>
              <h2 className="text-h3 text-ink-900">What we collect</h2>
              <p className="mt-3">
                This website does not ask you to create an account and does not collect personal
                information in the background. The only information we receive is what you choose to
                send us — your name, phone number, email address, location and crop details, if you
                fill in the enquiry form or contact us directly.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">How we use it</h2>
              <p className="mt-3">
                Solely to answer your enquiry and, where relevant, to follow up about agricultural
                guidance, products or distribution. We do not sell your information, and we do not
                share it with third parties for their own marketing.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Third-party services</h2>
              <p className="mt-3">
                Two third-party services run on this site. Google Translate powers the language
                selector in the header — when you choose a language, page text is sent to Google for
                translation, and a cookie named <code>googtrans</code> remembers your choice. Google
                Maps provides the embedded map on the contact page. Both are governed by
                Google&apos;s own privacy policy.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Cookies</h2>
              <p className="mt-3">
                We do not set advertising or tracking cookies. The only cookie this site stores is
                the Google Translate language preference described above, and clearing it simply
                returns the site to English.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Your choices</h2>
              <p className="mt-3">
                You can ask us at any time what information we hold about you, ask us to correct it,
                or ask us to delete it. Write to{" "}
                <a
                  href={`mailto:${contact.emails.general}`}
                  className="font-semibold text-brand-700 underline underline-offset-4"
                >
                  {contact.emails.general}
                </a>{" "}
                or call {contact.phones[0]}.
              </p>
            </div>

            <div>
              <h2 className="text-h3 text-ink-900">Contact</h2>
              <p className="mt-3">
                {site.legalName}, {contact.address.line2}, {contact.address.line3},{" "}
                {contact.address.city} – {contact.address.pincode}, {contact.address.state},{" "}
                {contact.address.country}.
              </p>
            </div>
          </div>

          <PlaceholderNote>
            This policy describes what the website actually does, but it has not been reviewed by a
            lawyer and is not legal advice. SCT should have it checked against the Digital Personal
            Data Protection Act and its own internal practices before launch.
          </PlaceholderNote>
        </Container>
      </section>
    </>
  );
}
