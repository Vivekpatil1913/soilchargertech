import {
  CircleDollarSign,
  HeartPulse,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Heading, Reveal, Section, Shell } from "@/components/ui";
import { images } from "@/data/images";
import Image from "@/shims/Image";

/**
 * WHAT CHANGES IN THE FIELD
 * =========================
 * Answers the question the products section leaves open: fine, but what
 * actually changes for me?
 *
 * Each benefit is phrased as an outcome a farmer would recognise, and every one
 * traces to a specific claim SCT publishes on a product page — the source is
 * named beside each entry so nobody later mistakes these for invention.
 *
 * No percentages appear here, because SCT has published no trial data. When
 * they do, this is the section that should carry it — and it is the single
 * biggest gap against AgroStar, whose whole Impact page is built on audited
 * numbers (docs/agrostar-benchmark.md §3.6).
 *
 * NOTE ON THE REDESIGN
 * --------------------
 * The previous version of this section ran six accent hues, a bespoke header
 * and a third typeface for handwritten margin notes. All three are gone. Six
 * hues in one grid is exactly the thing the reference's restraint is a
 * reaction against: it makes six ordinary statements look like six different
 * kinds of thing. They are one kind of thing — outcomes — so they get one
 * treatment, and the photograph beside them carries the warmth the colour was
 * being asked to provide.
 */

const BENEFITS: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Sprout,
    title: "Soil that comes back to life",
    body: "Organic carbon rises, micro-organisms multiply, hard ground turns spongy again. Sterile soil becomes fertile soil.",
    // Super Soil Charger benefits 1, 5, 6; Vedic Root Charger benefit 6.
  },
  {
    icon: Waves,
    title: "Water that goes further",
    body: "Better structure means the soil holds what you give it. In a dry spell the crop carries on instead of stalling.",
    // Super Soil Charger benefit 7; Vedic Samrat benefit 2.
  },
  {
    icon: ShieldCheck,
    title: "A crop that defends itself",
    body: "Strong roots and well-fed leaves build the plant's own resistance, so disease finds less to work with.",
    // Vedic Health Charger benefit 1; Vedic Health Fighter benefit 4 (SAR).
  },
  {
    icon: CircleDollarSign,
    title: "Less spent on rescue sprays",
    body: "Work on nutrition and there is less to fix later. That is the whole argument behind the first pillar.",
    // SCT's first pillar — work on nourishment, not on disease.
  },
  {
    icon: TrendingUp,
    title: "Produce the market pays for",
    body: "Size, colour, taste and sugar decide your rate at the gate. They are settled in the field, not at the mandi.",
    // Vedic Quality Charger benefits 4 and 5.
  },
  {
    icon: HeartPulse,
    title: "Food you can feed your own family",
    body: "No chemical fertiliser, no chemical crop protection. What comes off the field is what you would want on your own plate.",
    // SCT's second principle, and their published vision.
  },
];

export function Benefits() {
  const photo = images.farmers.harvest;

  return (
    <Section ground="canvasDown" labelledBy="benefits-heading">
      <Shell>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* ---- The claim, and a picture of it ------------------------- */}
          <div className="lg:sticky lg:top-32">
            <Heading
              id="benefits-heading"
              eyebrow="What you get"
              title="What changes in the field."
              lead="Six outcomes, each one traceable to a claim SCT publishes on a product page. No percentages — SCT has not run published trials, and we will not invent the numbers."
            />

            <Reveal delay={0.12}>
              <figure className="mt-8 overflow-hidden rounded-2xl border border-ink-100 shadow-soft">
                <div className="relative aspect-[5/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover"
                  />
                </div>
              </figure>
            </Reveal>
          </div>

          {/* ---- The six outcomes -------------------------------------- */}
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} as="li" delay={Math.min(index, 4) * 0.05}>
                  <article className="flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-canvas-50">
                    <div className="flex items-center justify-between">
                      <span className="grid size-9 place-items-center rounded-lg bg-forest-50 text-forest-700">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <span
                        aria-hidden
                        className="text-meta tabular-nums text-ink-300"
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[0.98rem] font-semibold leading-snug text-ink-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{benefit.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Shell>
    </Section>
  );
}
