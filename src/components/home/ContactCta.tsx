import { ArrowRight, MessageCircle, Phone, Store } from "lucide-react";

import { Heading, Reveal, Section, Shell } from "@/components/ui";
import { contact } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * THE ONE ACTION
 * ==============
 * Three doors, because three different people reach the bottom of this page:
 * a farmer who wants guidance, someone who prefers to type rather than talk,
 * and a shopkeeper who wants to stock the range.
 *
 * Phone and WhatsApp lead, not a form. This audience calls; SCT's whole third
 * principle is built on WhatsApp, and the old site carried four WhatsApp
 * numbers in its markup. A contact form would be the least-used route on the
 * page, so it is the quietest of the three.
 */

const DOORS = [
  {
    icon: Phone,
    eyebrow: "Fastest",
    title: "Call and ask",
    body: "Describe your crop, your soil and what you are seeing. You will get an answer for your field, not a general one.",
    action: contact.phones[0],
    href: telHref(contact.phones[0]),
    primary: true,
  },
  {
    icon: MessageCircle,
    eyebrow: "Any time",
    title: "Message on WhatsApp",
    body: "Send a photo of the leaf, the root or the soil. Most problems are easier to diagnose from a picture than a description.",
    action: "Open WhatsApp",
    href: whatsappHref(contact.whatsapp, "Hello SCT, I would like guidance for my crop."),
    primary: false,
  },
  {
    icon: Store,
    eyebrow: "For shops",
    title: "Become a distributor",
    body: "SCT appoints dealers at village, taluka and district level. Tell us where you are and how many farmers you work with.",
    action: "Start an application",
    href: "/careers#distributor",
    primary: false,
  },
] as const;

export function ContactCta() {
  return (
    <Section ground="forest" labelledBy="cta-heading" fx>
      <Shell size="wide">
        <Heading
          id="cta-heading"
          eyebrow="Next step"
          tone="onDark"
          align="center"
          title={<>Your soil is waiting.</>}
          lead="Start with one field, one season. That is how nearly every SCT farmer started — and it is the only way to judge it honestly."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {DOORS.map((door, index) => {
            const Icon = door.icon;
            return (
              <Reveal key={door.title} as="li" delay={index * 0.09} className="h-full">
                <Link
                  href={door.href}
                  className={
                    door.primary
                      ? "shadow-brand-glow group relative flex h-full flex-col rounded-2xl bg-brand-600 p-7 transition-all duration-400 motion-safe:hover:-translate-y-1 hover:bg-brand-500 sm:p-8"
                      : "group relative flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur-sm transition-all duration-400 hover:border-leaf-400/45 hover:bg-white/[0.1] motion-safe:hover:-translate-y-1 sm:p-8"
                  }
                >
                  <span
                    className={
                      door.primary
                        ? "grid size-12 place-items-center rounded-squircle bg-white/20 text-white transition-transform duration-400 motion-safe:group-hover:scale-110"
                        : "grid size-12 place-items-center rounded-squircle bg-brand-500/15 text-leaf-300 ring-1 ring-inset ring-brand-400/25 transition-transform duration-400 motion-safe:group-hover:scale-110"
                    }
                  >
                    <Icon aria-hidden className="size-6" />
                  </span>

                  <p
                    className={`text-eyebrow mt-6 ${door.primary ? "text-brand-100" : "text-leaf-400"}`}
                  >
                    {door.eyebrow}
                  </p>

                  <h3 className="mt-2 font-display text-[1.25rem] font-bold leading-tight text-white">
                    {door.title}
                  </h3>

                  <p
                    className={`mt-3 flex-1 text-[0.9rem] leading-relaxed ${door.primary ? "text-brand-50/90" : "text-sage-300/85"}`}
                  >
                    {door.body}
                  </p>

                  <span
                    className={`mt-6 inline-flex items-center gap-2 text-[0.92rem] font-bold ${door.primary ? "text-white" : "text-leaf-400"}`}
                  >
                    {door.action}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-10 text-center text-[0.86rem] text-sage-400">
          Guidance is available in Marathi, Hindi and English.
        </p>
      </Shell>
    </Section>
  );
}
