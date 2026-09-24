import { Award, FlaskConical, MessagesSquare, Store } from "lucide-react";

import { Button, Card, GhostNumber, Heading, Reveal, Section, Shell } from "@/components/ui";
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
    <Section ground="tint" labelledBy="why-heading">
      <Shell size="wide">
        <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* ---- Picture ------------------------------------------------ */}
          <Reveal className="lg:sticky lg:top-32">
            <figure className="shadow-card-lg relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/5]">
                <Image
                  src={images.soil.profile.src}
                  alt={images.soil.profile.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover"
                />
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-900 via-ink-900/75 to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-7">
                <blockquote className="font-display text-[1.12rem] font-semibold leading-snug text-white">
                  &ldquo;Recognising this threat in 2015, SCT gave first priority to increasing soil
                  fertility and organic carbon.&rdquo;
                </blockquote>
                <p className="mt-3 text-[0.85rem] text-sage-300">
                  {site.founder} — Founder, {site.name}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* ---- Reasons ------------------------------------------------ */}
          <div>
            <Heading
              id="why-heading"
              eyebrow="Why Soil Charger"
              title={
                <>
                  Anyone can sell a bag.{" "}
                  <span className="text-brand-600">This is a whole method.</span>
                </>
              }
              lead="Four things that separate SCT from the shelf at the next shop — each one a fact, not an adjective."
            />

            <ul className="mt-11 space-y-4">
              {REASONS.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <Reveal key={reason.title} as="li" delay={index * 0.08}>
                    <Card className="overflow-hidden p-6 sm:p-7" lift={false}>
                      <GhostNumber
                        value={`0${index + 1}`}
                        className="right-6 top-5 text-4xl text-ink-900/[0.05] group-hover:text-brand-600/15"
                      />

                      <div className="flex items-start gap-5">
                        <span className="grid size-11 shrink-0 place-items-center rounded-squircle bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200 transition-transform duration-400 motion-safe:group-hover:scale-110">
                          <Icon aria-hidden className="size-5" />
                        </span>

                        <div className="min-w-0">
                          <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand-700">
                            {reason.stat}
                          </p>
                          <h3 className="mt-1.5 font-display text-[1.08rem] font-bold leading-snug text-ink-900">
                            {reason.title}
                          </h3>
                          <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-500">
                            {reason.body}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.1} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/about" size="lg">
                Read the full story
              </Button>
              <Button href="/technology" variant="secondary" size="lg">
                See how the method works
              </Button>
            </Reveal>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
