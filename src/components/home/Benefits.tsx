import {
  CircleDollarSign,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal, Section, Shell } from "@/components/ui";
import Image from "@/shims/Image";

/**
 * WHAT CHANGES IN THE FIELD
 * =========================
 * Answers the question the products section leaves open: fine, but what
 * actually changes for me?
 *
 * Each benefit is phrased as an outcome a farmer would recognise, and every one
 * traces to a specific claim SCT publishes on a product page — the source is
 * named above each entry so nobody later mistakes these for invention.
 *
 * No percentages appear here, because SCT has published no trial data. When
 * they do, this is the section that should carry it — and it is the single
 * biggest gap against AgroStar, whose whole Impact page is built on audited
 * numbers (docs/agrostar-benchmark.md §3.6).
 *
 * WHY THIS SECTION BREAKS THE HOUSE RULES
 * ---------------------------------------
 * Three deliberate departures, all from a client-approved comp:
 *
 *   · Six accent hues instead of the site's four. One per card, so the grid
 *     reads as six distinct things at a glance rather than as one block of
 *     text. The hues stay in the tints (50/100) and the icon; no large field
 *     of colour, which is the rule the palette actually cares about.
 *   · A bespoke header instead of <Heading> — the ruled eyebrow and the
 *     hand-drawn underline exist nowhere else on the site. The type scale is
 *     still the system's (text-eyebrow / text-h2 / text-lead).
 *   · Caveat, a third font, for the two margin notes. Decoration only; it
 *     never carries information a reader needs.
 *
 * The leaf cut-out is the client's own asset (public/images/legacy/leaf.png),
 * used at or below its natural size so it stays crisp. The corner pair shrinks
 * on a phone and sits above the eyebrow rather than behind it; the lower pair
 * appears only from lg, where there is margin to spare.
 */

type Accent = "brand" | "water" | "saffron" | "amber" | "rose" | "plum";

const BENEFITS: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  accent: Accent;
}> = [
  {
    icon: Sprout,
    title: "Soil that comes back to life",
    body: "Organic carbon rises, micro-organisms multiply, hard ground turns spongy again. Sterile soil becomes fertile soil.",
    accent: "brand",
    // Super Soil Charger benefits 1, 5, 6; Vedic Root Charger benefit 6.
  },
  {
    icon: Waves,
    title: "Water that goes further",
    body: "Better structure means the soil holds what you give it. In a dry spell the crop carries on instead of stalling.",
    accent: "water",
    // Super Soil Charger benefit 7; Vedic Samrat benefit 2.
  },
  {
    icon: ShieldCheck,
    title: "A crop that defends itself",
    body: "Strong roots and well-fed leaves build the plant's own resistance, so disease finds less to work with.",
    accent: "saffron",
    // Vedic Health Charger benefit 1; Vedic Health Fighter benefit 4 (SAR).
  },
  {
    icon: CircleDollarSign,
    title: "Less spent on rescue sprays",
    body: "Work on nutrition and there is less to fix later. That is the whole argument behind the first pillar.",
    accent: "amber",
    // SCT's first pillar — work on nourishment, not on disease.
  },
  {
    icon: TrendingUp,
    title: "Produce the market pays for",
    body: "Size, colour, taste and sugar decide your rate at the gate. They are settled in the field, not at the mandi.",
    accent: "rose",
    // Vedic Quality Charger benefits 4 and 5.
  },
  {
    icon: HeartPulse,
    title: "Food you can feed your own family",
    body: "No chemical fertiliser, no chemical crop protection. What comes off the field is what you would want on your own plate.",
    accent: "plum",
    // SCT's second principle, and their published vision.
  },
];

/**
 * One row per accent, written out in full: Tailwind reads these as literal
 * strings, and a class name assembled at runtime produces no CSS at all.
 */
const ACCENT: Record<
  Accent,
  { tile: string; icon: string; number: string; rule: string }
> = {
  brand: {
    tile: "bg-gradient-to-br from-brand-100 to-brand-50 ring-brand-200/60",
    icon: "text-brand-700",
    number: "text-brand-700",
    rule: "bg-brand-200",
  },
  water: {
    tile: "bg-gradient-to-br from-sky-100 to-sky-50 ring-sky-200/60",
    icon: "text-sky-700",
    number: "text-sky-700",
    rule: "bg-sky-200",
  },
  saffron: {
    tile: "bg-gradient-to-br from-saffron-100 to-saffron-50 ring-saffron-200/60",
    icon: "text-saffron-700",
    number: "text-saffron-700",
    rule: "bg-saffron-200",
  },
  amber: {
    tile: "bg-gradient-to-br from-amber-100 to-amber-50 ring-amber-200/60",
    icon: "text-amber-700",
    number: "text-amber-700",
    rule: "bg-amber-200",
  },
  rose: {
    tile: "bg-gradient-to-br from-rose-100 to-rose-50 ring-rose-200/60",
    icon: "text-rose-700",
    number: "text-rose-700",
    rule: "bg-rose-200",
  },
  plum: {
    tile: "bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 ring-fuchsia-200/60",
    icon: "text-fuchsia-700",
    number: "text-fuchsia-700",
    rule: "bg-fuchsia-200",
  },
};

export function Benefits() {
  return (
    <Section ground="light" labelledBy="benefits-heading" className="overflow-hidden">
      <Decor />

      <Shell size="wide" className="relative">
        <header className="relative mx-auto max-w-3xl text-center">
          <MarginNote
            className="right-full top-8 mr-2 -rotate-[9deg] 2xl:mr-10"
            lines={["Healthy Soil", "Brighter Tomorrows"]}
          />
          <MarginNote
            className="left-full top-4 ml-2 rotate-[7deg] text-right 2xl:ml-10"
            lines={["Farmers", "See the Difference"]}
          />

          <Reveal>
            <p className="text-eyebrow flex items-center justify-center gap-2.5 text-brand-700 sm:gap-3">
              {/* The rules are the first thing dropped on a phone, where the
                  label alone already fills the line. */}
              <span
                aria-hidden
                className="hidden h-px w-10 bg-gradient-to-r from-transparent to-brand-300 sm:block lg:w-14"
              />
              <Leaf aria-hidden className="size-4 shrink-0" />
              <span className="min-w-0">What changes in your field</span>
              <span
                aria-hidden
                className="hidden h-px w-10 bg-gradient-to-l from-transparent to-brand-300 sm:block lg:w-14"
              />
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 id="benefits-heading" className="text-h2 mt-5 text-ink-900">
              Six things farmers tell us{" "}
              <span className="relative inline-block whitespace-nowrap text-brand-600">
                they notice.
                <Underline />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-lead mt-5 text-ink-500">
              Not laboratory numbers — the differences you can see standing at the edge of your own
              field, season after season.
            </p>
          </Reveal>
        </header>

        {/* Two columns wait for md and three for xl: the icon tile takes enough
            of a card that a 1024px three-up leaves the body text in a ribbon
            barely twenty characters wide. */}
        <ul className="mt-12 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            const accent = ACCENT[benefit.accent];

            return (
              <Reveal key={benefit.title} as="li" delay={index * 0.06} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_20px_45px_-30px_rgba(9,78,48,0.5)] sm:p-6 backdrop-blur-sm transition-all duration-400 [transition-timing-function:var(--ease-expressive)] hover:border-white hover:bg-white hover:shadow-[0_26px_55px_-28px_rgba(9,78,48,0.55)] motion-safe:hover:-translate-y-1">
                  {/* The card's own icon, blown up and almost invisible. */}
                  <Icon
                    aria-hidden
                    className={`pointer-events-none absolute -right-6 -top-6 size-28 rotate-12 opacity-[0.06] ${accent.icon}`}
                  />

                  <div className="relative flex gap-3.5 sm:gap-4">
                    <span
                      className={`grid size-[3.5rem] shrink-0 place-items-center rounded-[1.1rem] ring-1 ring-inset transition-transform duration-400 [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:scale-105 sm:size-[4.25rem] sm:rounded-[1.25rem] ${accent.tile}`}
                    >
                      <Icon aria-hidden className={`size-7 sm:size-8 ${accent.icon}`} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2">
                        <span
                          className={`font-display text-[0.82rem] font-extrabold tabular-nums tracking-[0.1em] ${accent.number}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span aria-hidden className={`h-px w-9 rounded-full ${accent.rule}`} />
                      </p>

                      <h3 className="mt-1.5 font-display text-[1.05rem] font-bold leading-snug text-ink-900">
                        {benefit.title}
                      </h3>

                      <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-500">
                        {benefit.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </Section>
  );
}

/* ==========================================================================
   DECORATION
   ========================================================================== */

/** The leaf cut-outs and the field haze at the foot of the section. */
function Decor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* No wash here on purpose. A white-to-transparent gradient over a ground
          this close to white spans about nine 8-bit steps, and the eye reads
          the widest of those steps as a hard line straight across the section.
          The ground colour is left flat; the haze and the leaves carry the
          depth instead. */}

      <Image
        src="/images/legacy/leaf.png"
        alt=""
        className="absolute -left-6 -top-1 w-20 -rotate-[18deg] opacity-60 drop-shadow-[0_18px_22px_rgba(9,78,48,0.16)] sm:-left-10 sm:top-4 sm:w-32 sm:opacity-90 lg:w-40"
      />
      <Image
        src="/images/legacy/leaf.png"
        alt=""
        className="absolute -right-6 -top-2 w-20 -rotate-[14deg] -scale-x-100 opacity-60 drop-shadow-[0_18px_22px_rgba(9,78,48,0.16)] sm:-right-8 sm:top-0 sm:w-32 sm:opacity-90 lg:w-40"
      />
      <Image
        src="/images/legacy/leaf.png"
        alt=""
        className="absolute -left-14 top-52 hidden w-28 rotate-[26deg] opacity-70 lg:block"
      />
      <Image
        src="/images/legacy/leaf.png"
        alt=""
        className="absolute -right-12 top-48 hidden w-28 rotate-[22deg] -scale-x-100 opacity-70 lg:block"
      />

      {/* The field haze. Masked at BOTH ends: fading only upwards left a hard
          line where the section met the next one. */}
      {/* The WebP derivative, not the source JPEG. This is the one image on
          the site referenced from CSS rather than through <Image>, so it is
          also the one that has to name a generated file by hand — the build
          drops originals that have derivatives. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[url('/images/hero/field-landscape-1200.webp')] bg-cover bg-bottom opacity-[0.18] [mask-image:linear-gradient(to_top,transparent_0%,#000_45%,transparent_100%)] sm:h-40 lg:h-48" />
    </div>
  );
}

/** A hand-drawn rule under the highlighted words. */
function Underline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 14"
      preserveAspectRatio="none"
      className="absolute -bottom-[0.22em] left-0 h-[0.3em] w-full overflow-visible text-brand-400"
    >
      <path
        d="M4 9.6C46 4.2 96 2.6 148 4.4c30 1 58 2.9 88 1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M18 13c44-3.4 92-4.2 140-2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-45"
      />
    </svg>
  );
}

/** The handwritten note in the margin. Decorative, so it is hidden from AT. */
function MarginNote({ className, lines }: { className: string; lines: string[] }) {
  return (
    <span aria-hidden className={`absolute hidden xl:block ${className}`}>
      <span className="block whitespace-nowrap font-script text-[1.55rem] font-bold leading-[1.15] text-brand-800/75">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
      <svg
        viewBox="0 0 160 10"
        preserveAspectRatio="none"
        className="mt-1 h-2 w-full text-brand-400/70"
      >
        <path
          d="M3 7.2C40 2.8 96 2 157 4.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
