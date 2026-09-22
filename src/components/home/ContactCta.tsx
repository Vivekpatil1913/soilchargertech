import { ArrowUpRight, MessageCircle, Phone, Store } from "lucide-react";

import { Heading, Reveal, Section, Shell } from "@/components/ui";
import { contact } from "@/data/site";
import { cn, telHref, whatsappHref } from "@/lib/utils";
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
    href: "/contact",
    primary: false,
  },
] as const;

export function ContactCta() {
  return (
    <Section ground="forestDeep" labelledBy="cta-heading">
      <Shell>
        <Heading
          id="cta-heading"
          eyebrow="Next step"
          tone="onDark"
          title="Your soil is waiting."
          lead="Start with one field, one season. That is how nearly every SCT farmer started — and it is the only way to judge it honestly."
        />

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {DOORS.map((door, index) => {
            const Icon = door.icon;
            return (
              <Reveal key={door.title} as="li" delay={index * 0.07} className="h-full">
                <Link
                  href={door.href}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border p-6 transition-colors duration-300 sm:p-7",
                    door.primary
                      ? "border-harvest-400 bg-harvest-400 hover:bg-harvest-300"
                      : "border-white/12 bg-white/[0.05] hover:border-harvest-400/40 hover:bg-white/[0.09]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-lg",
                        door.primary
                          ? "bg-forest-950/10 text-forest-950"
                          : "bg-white/10 text-harvest-300",
                      )}
                    >
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <p
                      className={cn(
                        "text-meta",
                        door.primary ? "text-forest-950/60" : "text-white/40",
                      )}
                    >
                      {door.eyebrow}
                    </p>
                  </div>

                  <h3
                    className={cn(
                      "mt-5 font-display text-lg font-semibold",
                      door.primary ? "text-forest-950" : "text-white",
                    )}
                  >
                    {door.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-2.5 flex-1 text-sm leading-relaxed",
                      door.primary ? "text-forest-950/75" : "text-white/60",
                    )}
                  >
                    {door.body}
                  </p>

                  <span
                    className={cn(
                      "mt-6 inline-flex items-center gap-1.5 border-t pt-4 text-sm font-semibold",
                      door.primary
                        ? "border-forest-950/15 text-forest-950 tabular-nums"
                        : "border-white/10 text-harvest-300",
                    )}
                  >
                    {door.action}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-8 text-xs text-white/40">
          Guidance is available in Marathi, Hindi and English.
        </p>
      </Shell>
    </Section>
  );
}
