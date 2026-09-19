import type { Metadata } from "next";
import { Briefcase, Mail, MapPin, MessageCircle, Phone, Users } from "lucide-react";

import { addressOneLine, contact, socials } from "@/data/site";
import { images } from "@/data/images";
import { faqs } from "@/data/faqs";
import { telHref, whatsappHref } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqAccordion } from "@/components/contact/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Soil Charger Technology in Nashik, Maharashtra. Call, WhatsApp or email the team about soil health, products, applications or distributorship.",
  alternates: { canonical: "/contact" },
};

/** FAQ structured data, generated from the same source the page renders. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const CHANNELS = [
  {
    icon: Phone,
    heading: "Call us",
    lines: contact.phones,
    hrefs: contact.phones.map(telHref),
    note: "Marathi, Hindi and English",
  },
  {
    icon: MessageCircle,
    heading: "WhatsApp",
    lines: [contact.whatsapp],
    hrefs: [whatsappHref(contact.whatsapp, "Hello SCT, I have a question about soil health.")],
    note: "Fastest for photos of your field",
    external: true,
  },
  {
    icon: Mail,
    heading: "General enquiries",
    lines: [contact.emails.general],
    hrefs: [`mailto:${contact.emails.general}`],
    note: "For anything that is not urgent",
  },
];

const DEPARTMENTS = [
  {
    icon: Briefcase,
    heading: "Sales & distribution",
    email: contact.emails.sales,
    note: "Dealer, distributor and bulk enquiries.",
  },
  {
    icon: Users,
    heading: "Careers & internships",
    email: contact.emails.careers,
    note: "Jobs, internships and agricultural training.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="Contact"
        image={images.farmers.field}
        title={
          <>
            Tell us what is happening{" "}
            <span className="text-leaf-400">in your field.</span>
          </>
        }
        lead="Whether you farm, advise farmers, distribute inputs or run an agricultural organisation — the SCT team in Nashik will answer for your soil and your crop, not in generalities."
      />

      {/* ---- Channels --------------------------------------------------------- */}
      <section aria-labelledby="channels-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <h2 id="channels-heading" className="sr-only">
            Ways to reach SCT
          </h2>

          <ul className="grid gap-5 md:grid-cols-3">
            {CHANNELS.map((channel) => (
              <li key={channel.heading}>
                <div className="h-full rounded-2xl border border-hairline bg-white p-6 transition-shadow duration-400 hover:shadow-soft">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <channel.icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                    {channel.heading}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {channel.lines.map((line, i) => (
                      <li key={line}>
                        <a
                          href={channel.hrefs[i]}
                          {...(channel.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="break-all font-display text-[0.98rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
                        >
                          {line}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[0.82rem] text-ink-400">{channel.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- Form + details ----------------------------------------------------- */}
      <section aria-labelledby="enquiry-heading" className="section-y bg-cream-100">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Send an enquiry"
                title="Start a conversation"
                lead="The more you tell us about your soil and your season, the more useful the answer will be."
                as="h2"
              />
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-hairline bg-white p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-saffron-50 text-saffron-600">
                  <MapPin aria-hidden className="size-5" />
                </span>
                <h2 className="mt-5 font-display text-lg font-bold text-ink-900">Visit us</h2>
                <address className="mt-3 text-[0.92rem] not-italic leading-relaxed text-ink-500">
                  {addressOneLine}
                  <br />
                  {contact.address.state}, {contact.address.country}
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `Soil Charger Technology, ${addressOneLine}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
                >
                  Open in Maps
                  <span aria-hidden>→</span>
                </a>
              </div>

              {DEPARTMENTS.map((dept) => (
                <div key={dept.heading} className="rounded-2xl border border-hairline bg-white p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <dept.icon aria-hidden className="size-5" />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-bold text-ink-900">
                    {dept.heading}
                  </h2>
                  <p className="mt-2 text-[0.88rem] text-ink-500">{dept.note}</p>
                  <a
                    href={`mailto:${dept.email}`}
                    className="mt-3 inline-block break-all text-[0.9rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    {dept.email}
                  </a>
                </div>
              ))}

              <div className="rounded-2xl border border-hairline bg-white p-6">
                <h2 className="font-display text-lg font-bold text-ink-900">Follow SCT</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border border-hairline px-3.5 py-2 text-[0.82rem] font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ---- Map ---------------------------------------------------------------- */}
      <section aria-label="Our location on a map" className="bg-cream-100 pb-16 lg:pb-24">
        <Container width="wide">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-soft">
            <iframe
              title="Soil Charger Technology location in Nashik"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `Star Zone Mall, Nashik Pune Highway, Nashik 422101`,
              )}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full border-0 sm:h-[26rem]"
            />
          </div>
        </Container>
      </section>

      {/* ---- FAQs ---------------------------------------------------------------- */}
      <section id="faqs" aria-labelledby="faqs-heading" className="section-y scroll-mt-24 bg-cream-50">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <SectionHeading
                eyebrow="FAQs"
                title="Questions we are asked most"
                lead="Where an answer depends on your specific crop and soil, we say so rather than guessing."
                as="h2"
              />
            </div>
            <FaqAccordion />
          </div>
        </Container>
      </section>

      {/* Canonical URL referenced for clarity in structured data tooling. */}
      <link rel="canonical" href={`${SITE_URL}/contact`} />
    </>
  );
}
