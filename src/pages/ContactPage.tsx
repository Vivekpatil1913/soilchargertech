import {
  Briefcase,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Phone,
  Store,
} from "lucide-react";
import { useState } from "react";

import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import {
  FieldRow,
  RequiredNote,
  SubmitRow,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { SuccessPanel } from "@/components/forms/FormModal";
import { EnquiryLauncher, ExportLauncher } from "@/components/forms/launchers";
import { Card, Heading, Reveal, Section, Shell } from "@/components/ui";
import { faqs } from "@/data/faqs";
import { addressOneLine, contact } from "@/data/site";
import { SITE_URL } from "@/lib/constants";
import { deliver, type Delivery } from "@/lib/form-submit";
import { cn, telHref, whatsappHref } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * CONTACT
 * =======
 * Phone and WhatsApp first, the form last. This audience calls — SCT's whole
 * third principle runs on WhatsApp, and the old site had four WhatsApp numbers
 * wired into its markup. A form is the least-used route here, so it is the
 * quietest thing on the page rather than the loudest.
 *
 * The form does not submit anywhere yet. There is no backend on this build, so
 * rather than fake a success state it opens the visitor's WhatsApp with the
 * message pre-filled — which is both honest and, for this audience, faster than
 * an email they will never see a reply to. Every other form on the site uses
 * the same rule; see src/lib/form-submit.ts.
 *
 * THE OTHER FORMS
 * ---------------
 * Five more came across from the old site. Two are modals opened from the band
 * near the bottom of this page (export and product enquiry) and three are
 * applications living on /careers. This page points at all of them, because
 * "contact" is where a visitor looks for any of them.
 */

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
    label: "Call the team",
    value: contact.phones[0],
    href: telHref(contact.phones[0]),
    hint: "Guidance in Marathi, Hindi or English",
  },
  {
    icon: Phone,
    label: "Second line",
    value: contact.phones[1],
    href: telHref(contact.phones[1]),
    hint: "If the first line is busy",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.whatsapp,
    href: whatsappHref(contact.whatsapp, "Hello SCT, I have a question about my crop."),
    hint: "Send a photo of the leaf, root or soil",
  },
  {
    icon: Mail,
    label: "Email",
    value: contact.emails.general,
    href: `mailto:${contact.emails.general}`,
    hint: `Sales: ${contact.emails.sales}`,
  },
] as const;

/** One shell for the four cards in the "other forms" band. */
const FORM_CARD =
  "group flex h-full w-full flex-col rounded-2xl border border-hairline bg-surface p-6 text-left transition-all duration-400 [transition-timing-function:var(--ease-expressive)] hover:border-brand-300 hover:shadow-card motion-safe:hover:-translate-y-1";

function FormCardBody({
  icon,
  eyebrow,
  title,
  body,
  action,
  tone = "brand",
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  action: string;
  tone?: "brand" | "saffron";
}) {
  return (
    <>
      <span
        className={cn(
          "grid size-11 place-items-center rounded-squircle ring-1 ring-inset transition-transform duration-400 motion-safe:group-hover:scale-110",
          tone === "saffron"
            ? "bg-saffron-50 text-saffron-700 ring-saffron-200"
            : "bg-brand-50 text-brand-700 ring-brand-200",
        )}
      >
        {icon}
      </span>
      <p className="mt-5 text-[0.74rem] font-bold uppercase tracking-[0.12em] text-ink-400">
        {eyebrow}
      </p>
      <h3 className="mt-1.5 font-display text-[1.05rem] font-bold leading-tight text-ink-900">
        {title}
      </h3>
      <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-ink-500">{body}</p>
      <span className="mt-5 text-[0.86rem] font-bold text-brand-700">{action}</span>
    </>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", village: "", crop: "", message: "" });
  /** Set once the hand-off has happened, so the page can say what it did. */
  const [sent, setSent] = useState<Delivery | null>(null);

  /**
   * This used to call `window.open` and stop there. If a pop-up blocker caught
   * it — which is common, and the whole reason `deliver()` returns the link it
   * opened — the visitor pressed Submit, nothing happened, and there was no
   * message, no retry and no address to fall back on. Every other form on the
   * site already handled that through <SuccessPanel />; this one now does too.
   */
  function send(event: React.FormEvent) {
    event.preventDefault();
    setSent(
      deliver({
        title: "Crop enquiry",
        destination: "whatsapp",
        groups: [
          {
            answers: [
              { label: "Name", value: form.name },
              { label: "Village / taluka", value: form.village },
              { label: "Crop", value: form.crop },
              { label: "What they are seeing", value: form.message },
            ],
          },
        ],
      }),
    );
  }

  function reset() {
    setForm({ name: "", village: "", crop: "", message: "" });
    setSent(null);
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Talk to Soil Charger Technology — Nashik, Maharashtra. Call, WhatsApp or ask about products, dealership or guidance for your crop."
        path="/contact"
        jsonLd={faqSchema}
      />

      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Tell us about <span className="text-shine">your field.</span>
          </>
        }
        lead="Describe your crop, your soil and what you are seeing. You will get an answer for your situation, not a general one."
      />

      {/* ---- Channels ---------------------------------------------------- */}
      <Section ground="light" labelledBy="channels-heading">
        <Shell size="wide">
          <h2 id="channels-heading" className="sr-only">
            Ways to reach us
          </h2>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <Reveal key={channel.label} as="li" delay={index * 0.06} className="h-full">
                  <a
                    href={channel.href}
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full flex-col rounded-2xl border border-hairline bg-white p-6 transition-all duration-400 hover:border-brand-300 hover:shadow-card motion-safe:hover:-translate-y-1"
                  >
                    <span className="grid size-11 place-items-center rounded-squircle bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200 transition-transform duration-400 motion-safe:group-hover:scale-110">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <p className="mt-5 text-[0.74rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                      {channel.label}
                    </p>
                    <p className="mt-1.5 break-words font-display text-[1rem] font-bold text-ink-900">
                      {channel.value}
                    </p>
                    <p className="mt-2 flex-1 break-words text-[0.84rem] text-ink-500">
                      {channel.hint}
                    </p>
                  </a>
                </Reveal>
              );
            })}
          </ul>

          {/* ---- Form + address ------------------------------------------ */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              {/* The fields come from components/forms/fields.tsx like every
                  other form on the site. This page used to re-implement them
                  inline with a different border, a different focus ring and no
                  error handling, which meant one site carried two form systems
                  that drifted apart. */}
              <Card className="p-7 sm:p-9" lift={false}>
                {sent ? (
                  <SuccessPanel delivery={sent} onReset={reset} resetLabel="Ask about another field" />
                ) : (
                  <>
                    <Heading
                      eyebrow="Or write it down"
                      title="Ask about your crop"
                      lead="Fill this in and it opens WhatsApp with your details ready to send — no account, no waiting for an email reply."
                    />

                    <form onSubmit={send} className="mt-8 space-y-5">
                      <FieldRow>
                        <TextField
                          label="Your name"
                          value={form.name}
                          onChange={(name) => setForm({ ...form, name })}
                          placeholder="Full name"
                          autoComplete="name"
                        />
                        <TextField
                          label="Village / taluka"
                          value={form.village}
                          onChange={(village) => setForm({ ...form, village })}
                          placeholder="Where is the field?"
                          autoComplete="address-level2"
                        />
                      </FieldRow>

                      <TextField
                        label="Crop"
                        value={form.crop}
                        onChange={(crop) => setForm({ ...form, crop })}
                        placeholder="Grapes, pomegranate, sugarcane, vegetables…"
                      />

                      <TextAreaField
                        label="What are you seeing?"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(message) => setForm({ ...form, message })}
                        placeholder="Describe the problem — the soil, the leaf, the roots, what you have already tried."
                      />

                      <SubmitRow
                        label="Send on WhatsApp"
                        icon={<MessageCircle aria-hidden className="size-4" />}
                        note={<RequiredNote />}
                      />
                    </form>
                  </>
                )}
              </Card>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-5 self-start">
              <Card className="p-7" lift={false}>
                <span className="grid size-11 place-items-center rounded-squircle bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200">
                  <MapPin aria-hidden className="size-5" />
                </span>
                <h3 className="text-h3 mt-5 text-ink-900">Come and see us</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-500">
                  {addressOneLine}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressOneLine)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-brand-700 hover:text-brand-800"
                >
                  Get directions
                </a>
              </Card>

              <Card className="p-7" lift={false}>
                <span className="grid size-11 place-items-center rounded-squircle bg-saffron-50 text-saffron-700 ring-1 ring-inset ring-saffron-200">
                  <Store aria-hidden className="size-5" />
                </span>
                <h3 className="text-h3 mt-5 text-ink-900">Want to stock SCT?</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-500">
                  SCT appoints distributors at village, taluka and district level. Tell us where you
                  are, how many farmers you work with, and whether you have used the technology
                  yourself.
                </p>
                <Link
                  href="/careers#distributor"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-saffron-700 hover:text-saffron-600"
                >
                  Open the application form
                </Link>
                <a
                  href={whatsappHref(
                    contact.whatsapp,
                    "Hello SCT, I am interested in becoming a distributor. My location is:",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-[0.86rem] font-semibold text-ink-400 transition-colors hover:text-brand-700"
                >
                  Or ask a question on WhatsApp first
                </a>
              </Card>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ---- Every other form on the site -------------------------------- */}
      <Section ground="tint" labelledBy="forms-heading">
        <Shell size="wide">
          <Heading
            id="forms-heading"
            eyebrow="Other forms"
            align="center"
            title="Looking for something more specific?"
            lead="Everything the old site asked you to fill in is still here, and none of it takes more than a few minutes."
          />

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal as="li" className="h-full">
              <EnquiryLauncher className={FORM_CARD}>
                <FormCardBody
                  icon={<MessageSquareText aria-hidden className="size-5" />}
                  eyebrow="Products"
                  title="Product enquiry"
                  body="Tick the products you want to know about and add your question."
                  action="Open the form"
                />
              </EnquiryLauncher>
            </Reveal>

            <Reveal as="li" delay={0.06} className="h-full">
              <ExportLauncher className={FORM_CARD}>
                <FormCardBody
                  icon={<Globe2 aria-hidden className="size-5" />}
                  eyebrow="Export"
                  title="Export enquiry"
                  body="Buying for a region, or shipping outside India? Tell us what you need."
                  action="Open the form"
                  tone="saffron"
                />
              </ExportLauncher>
            </Reveal>

            <Reveal as="li" delay={0.12} className="h-full">
              <Link href="/careers#distributor" className={FORM_CARD}>
                <FormCardBody
                  icon={<Store aria-hidden className="size-5" />}
                  eyebrow="Partnership"
                  title="Distributor application"
                  body="The full SCT business application — personal details, your shop, and your documents."
                  action="Go to the application"
                />
              </Link>
            </Reveal>

            <Reveal as="li" delay={0.18} className="h-full">
              <Link href="/careers#employment" className={FORM_CARD}>
                <FormCardBody
                  icon={<Briefcase aria-hidden className="size-5" />}
                  eyebrow="Careers"
                  title="Jobs and internships"
                  body="Apply for a role on the team, or for an internship in the field."
                  action="See both forms"
                  tone="saffron"
                />
              </Link>
            </Reveal>
          </ul>
        </Shell>
      </Section>

      {/* ---- FAQs -------------------------------------------------------- */}
      {/* `light`, not `tint`. The forms band above is already tint, and two
          tint sections back to back read as one undifferentiated block — the
          ground alternation is what chapters every other page on the site. */}
      <Section ground="light" labelledBy="faq-heading" id="faqs">
        <Shell size="narrow">
          <Heading
            id="faq-heading"
            eyebrow="Before you call"
            align="center"
            title="Questions we get asked most"
          />

          <ul className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <li key={faq.question}>
                  <div className="overflow-hidden rounded-2xl border border-hairline bg-white">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : index)}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-trigger-${index}`}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="font-display text-[1rem] font-bold text-ink-900">
                          {faq.question}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-300",
                            open ? "rotate-45" : "",
                          )}
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      hidden={!open}
                      className="px-6 pb-6"
                    >
                      <p className="text-[0.94rem] leading-relaxed text-ink-500">{faq.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Shell>
      </Section>
    </>
  );
}
