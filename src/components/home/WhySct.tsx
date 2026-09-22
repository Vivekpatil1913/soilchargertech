import { Award, FlaskConical, MessagesSquare, Store } from "lucide-react";

import { Button, Heading, Reveal, Section, Shell } from "@/components/ui";
import { images } from "@/data/images";
import { site } from "@/data/site";
import Image from "@/shims/Image";

/**
 * WHY SCT, AND NOT THE BAG AT THE NEXT SHOP
 * =========================================
 * The differentiators, stated plainly. Each is a fact SCT can stand behind — a
 * date, a certification, a published system, a channel that genuinely exists —
 * rather than an adjective.
 *
 * "You are never left alone with it" leads deliberately: SCT's third principle
 * makes daily video, a WhatsApp study group and farmer-to-farmer discussion
 * part of the method itself, not a service bolted on top. Nothing in the
 * competitor set reviewed for this project has an equivalent.
 *
 * Set as a plain ruled list rather than as four cards. Four facts with a
 * figure each are a specification, and a specification reads better as rows
 * than as boxes.
 */

const REASONS = [
  {
    icon: FlaskConical,
    stat: `${new Date().getFullYear() - site.founded}+ years`,
    title: "On one problem, since 2015",
    body: "SCT did not start with a product. It started with organic carbon, and everything since has been built outward from that single decision.",
  },
  {
    icon: MessagesSquare,
    stat: "Every day",
    title: "You are never left alone with it",
    body: "Daily videos, a WhatsApp study group, and farmers talking to farmers. SCT calls this the third principle — part of the method, not a service on top of it.",
  },
  {
    icon: Award,
    stat: "ISO 9001",
    title: "A certified manufacturer",
    body: "SCT manufactures what it sells, as a biotech research and manufacturing business — not a repackager putting its label on somebody else's drum.",
  },
  {
    icon: Store,
    stat: "Village to district",
    title: "A dealer network you can reach",
    body: "Distributors work at village, taluka and district level, so the product and the advice arrive together rather than through a courier.",
  },
] as const;

export function WhySct() {
  return (
    <Section ground="light" labelledBy="why-heading">
      <Shell>
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* ---- Picture and the founder's line ------------------------- */}
          <Reveal className="lg:sticky lg:top-32">
            <figure className="relative overflow-hidden rounded-2xl border border-ink-100 shadow-card">
              <div className="relative aspect-[4/5]">
                <Image
                  src={images.soil.profile.src}
                  alt={images.soil.profile.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <blockquote className="font-display text-base leading-relaxed text-white">
                  Recognising this threat in 2015, SCT gave first priority to increasing soil
                  fertility and organic carbon.
                </blockquote>
                <p className="text-meta mt-4 text-harvest-400/80">
                  {site.founder} — Founder
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* ---- The four reasons -------------------------------------- */}
          <div>
            <Heading
              id="why-heading"
              eyebrow="Why SCT"
              title="Why this, and not the bag at the next shop."
              lead="Four things SCT can put a date, a certificate or a phone number against. None of them is an adjective."
            />

            <ul className="mt-9 border-t border-ink-100">
              {REASONS.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <Reveal key={reason.title} as="li" delay={index * 0.06}>
                    <div className="flex gap-5 border-b border-ink-100 py-6">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-forest-50 text-forest-700">
                        <Icon aria-hidden className="size-5" />
                      </span>

                      <div className="min-w-0">
                        <p className="text-meta text-harvest-700">{reason.stat}</p>
                        <h3 className="mt-1.5 font-display text-base font-semibold text-ink-900">
                          {reason.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-500">{reason.body}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/about" variant="secondary">
                  Read our story
                </Button>
                <Button href="/technology" variant="ghost">
                  How the technology works
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
