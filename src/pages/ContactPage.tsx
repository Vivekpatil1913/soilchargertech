import { Mail, MapPin, MessageCircle, Phone, Store } from "lucide-react";
import { useState } from "react";

import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { Card, Heading, Reveal, Section, Shell } from "@/components/ui";
import { faqs } from "@/data/faqs";
import { addressOneLine, contact } from "@/data/site";
import { SITE_URL } from "@/lib/constants";
import { cn, telHref, whatsappHref } from "@/lib/utils";

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
 * an email they will never see a reply to.
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

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", village: "", crop: "", message: "" });

  function send(event: React.FormEvent) {
    event.preventDefault();
    const lines = [
      `Name: ${form.name || "—"}`,
      `Village: ${form.village || "—"}`,
      `Crop: ${form.crop || "—"}`,
      "",
      form.message,
    ].join("\n");
    window.open(whatsappHref(contact.whatsapp, lines), "_blank", "noopener,noreferrer");
  }

  const field =
    "mt-2 w-full rounded-xl border border-hairline bg-white px-4 py-3 text-[0.95rem] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brand-400";

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
              <Card className="p-7 sm:p-9" lift={false}>
                <Heading
                  eyebrow="Or write it down"
                  title="Ask about your crop"
                  lead="Fill this in and it opens WhatsApp with your details ready to send — no account, no waiting for an email reply."
                />

                <form onSubmit={send} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-[0.85rem] font-semibold text-ink-700">Your name</span>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={field}
                        placeholder="Full name"
                      />
                    </label>

                    <label className="block">
                      <span className="text-[0.85rem] font-semibold text-ink-700">
                        Village / taluka
                      </span>
                      <input
                        type="text"
                        value={form.village}
                        onChange={(e) => setForm({ ...form, village: e.target.value })}
                        className={field}
                        placeholder="Where is the field?"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-[0.85rem] font-semibold text-ink-700">Crop</span>
                    <input
                      type="text"
                      value={form.crop}
                      onChange={(e) => setForm({ ...form, crop: e.target.value })}
                      className={field}
                      placeholder="Grapes, pomegranate, sugarcane, vegetables…"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[0.85rem] font-semibold text-ink-700">
                      What are you seeing?
                    </span>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={cn(field, "resize-y")}
                      placeholder="Describe the problem — the soil, the leaf, the roots, what you have already tried."
                    />
                  </label>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="shadow-brand-glow inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-600 px-7 py-4 text-[0.95rem] font-bold text-white transition-all duration-300 hover:bg-brand-500 sm:w-auto"
                    >
                      <MessageCircle aria-hidden className="size-4" />
                      Submit
                    </button>
                  </div>
                </form>
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
                <a
                  href={whatsappHref(
                    contact.whatsapp,
                    "Hello SCT, I am interested in becoming a distributor. My location is:",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-saffron-700 hover:text-saffron-600"
                >
                  Start the conversation
                </a>
              </Card>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ---- FAQs -------------------------------------------------------- */}
      <Section ground="tint" labelledBy="faq-heading" id="faqs">
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
                    <div hidden={!open} className="px-6 pb-6">
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
