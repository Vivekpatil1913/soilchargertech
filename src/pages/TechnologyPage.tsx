import {
  ArrowRight,
  Ban,
  Beaker,
  BookOpenCheck,
  Droplets,
  Leaf,
  Mountain,
  Sprout,
} from "lucide-react";
import { useId } from "react";

import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { ContactCta } from "@/components/home/ContactCta";
import { Method } from "@/components/home/Method";
import { Card, GhostNumber, Heading, Reveal, Section, Shell } from "@/components/ui";
import { pillars } from "@/data/site";
import { technologies } from "@/data/technologies";
import { cn } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * THE TECHNOLOGY
 * ==============
 * Three layers, in the order they build on each other: the four pillars (the
 * philosophy), the science each pillar rests on, and the three principles (the
 * practice). The Method section is reused verbatim from the home page rather
 * than re-written, so the two can never drift apart.
 */

const SYSTEM_ICONS = [Beaker, Ban, BookOpenCheck] as const;

const SYSTEM_CARDS = [
  { name: "Method", text: "Follow the right feeding schedule with correct SCT inputs." },
  { name: "Rule", text: "Follow the important prohibitions for better results." },
  { name: "Meditation", text: "Daily learning to understand your soil and crops better." },
] as const;

/* --------------------------------------------------------------------------
   "100% SCT" backdrop
   --------------------------------------------------------------------------
   A field photo fading in from the left, a thin orbit arc, wave lines on the
   right and a handful of drifting leaves. All decorative; the leaves nearest
   the text are dropped below `lg` so nothing ever sits over the copy.
   ------------------------------------------------------------------------ */

function FloatLeaf({
  className,
  delay = 0,
  blur = false,
}: {
  className?: string;
  delay?: number;
  blur?: boolean;
}) {
  // React ids contain colons, which break `url(#…)` references in some browsers.
  const gradientId = `leaf-${useId().replace(/:/g, "")}`;
  return (
    <div className={cn("pointer-events-none absolute", className)}>
      <svg
        viewBox="0 0 120 70"
        aria-hidden
        className={cn(
          "leaf-drift h-auto w-full drop-shadow-[0_10px_12px_rgb(9_78_48/0.22)]",
          blur && "blur-[6px]",
        )}
        style={{ animationDelay: `${delay}s` }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8fd462" />
            <stop offset="55%" stopColor="#3fa33a" />
            <stop offset="100%" stopColor="#1f6e25" />
          </linearGradient>
        </defs>
        <path d="M4 36C26 6 76 -2 116 12 100 50 52 72 4 36Z" fill={`url(#${gradientId})`} />
        <path
          d="M4 36C40 30 78 22 116 12"
          stroke="#d9f2c4"
          strokeOpacity="0.7"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <g stroke="#d9f2c4" strokeOpacity="0.4" strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M34 31 46 16M58 26 70 11M82 20 92 8M40 30 54 44M64 25 78 38M88 18 98 28" />
        </g>
      </svg>
    </div>
  );
}

function HundredBackdrop() {
  return (
    // Section wraps its children in a padded-out inner box; the negative insets
    // (matching `section-y`) stretch the backdrop back to the section's edges.
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -inset-y-12 md:-inset-y-16 xl:-inset-y-18"
    >
      {/* Field photo, left — full-bleed band on small screens, a side panel from lg. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[url('/images/hero/field-landscape-1200.webp')] bg-cover bg-center opacity-30 [mask-image:linear-gradient(to_top,#000_0%,transparent_100%)] lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-[34%] lg:bg-[url('/images/hero/field-landscape-1600.webp')] lg:opacity-55 lg:[mask-image:linear-gradient(to_right,#000_0%,#000_30%,transparent_100%)]" />
      {/* Soft haze over the top so the photo reads as morning mist. */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#f5f9f4] to-transparent" />
      {/* And a lighter one at the foot, so the band settles before the next section. */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f5f9f4]/80 to-transparent" />
      {/* Field hint, bottom right. */}
      <div className="absolute bottom-0 right-0 hidden h-40 w-[30%] bg-[url('/images/hero/field-landscape-1200.webp')] bg-cover bg-bottom opacity-25 [mask-image:linear-gradient(to_top_left,#000_0%,transparent_70%)] lg:block" />

      {/* Orbit arc with a dot, left. */}
      <svg
        viewBox="0 0 400 600"
        fill="none"
        className="absolute -left-40 top-6 hidden h-[34rem] text-brand-600 md:block lg:-left-24"
      >
        <path d="M0 20C220 20 380 170 380 330S220 600 0 600" stroke="currentColor" strokeOpacity="0.3" />
        <path d="M0 60C190 60 340 190 340 340" stroke="currentColor" strokeOpacity="0.14" />
        <circle cx="342" cy="190" r="6" fill="currentColor" />
      </svg>

      {/* Wave lines, right. */}
      <svg
        viewBox="0 0 400 300"
        fill="none"
        className="absolute -right-10 top-[28%] hidden w-[24rem] text-brand-600 md:block"
      >
        <path d="M400 20C320 60 300 180 200 200S60 170 0 240" stroke="currentColor" strokeOpacity="0.22" />
        <path d="M400 60C330 100 310 210 210 230S80 210 20 280" stroke="currentColor" strokeOpacity="0.12" />
      </svg>

      {/* Leaves. */}
      <FloatLeaf className="left-[12%] top-8 w-16 rotate-[35deg] sm:w-20" />
      <FloatLeaf className="left-[17%] top-[46%] hidden w-24 -rotate-[20deg] lg:block" delay={1.4} />
      <FloatLeaf className="-left-6 bottom-6 hidden w-40 rotate-[60deg] opacity-80 sm:block" blur delay={2.2} />
      <FloatLeaf className="-right-4 -top-2 w-28 -rotate-[25deg] opacity-80 sm:w-44" blur delay={0.8} />
      <FloatLeaf className="right-[14%] top-[27%] hidden w-20 -rotate-[50deg] lg:block" delay={3} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Pillar card artwork
   --------------------------------------------------------------------------
   A faint botanical watermark in the bottom-right of each card, drawn in the
   card's own accent. Pure currentColor paths, so a single opacity class on the
   <svg> tints the whole drawing.
   ------------------------------------------------------------------------ */

/** The one leaf outline every drawing below is built from. */
const LEAF = "M0 56C0 25 25 0 56 0 56 31 31 56 0 56Z";

type ArtProps = { className?: string };

/** Pillar 1 — a two-leaf sprig. */
function ArtSprig({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className}>
      <path
        d="M100 120C100 94 103 72 117 55"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g fill="currentColor">
        <path d={LEAF} transform="translate(112,20) scale(0.92)" />
        <path d={LEAF} transform="translate(104,66) rotate(180) scale(0.72)" />
      </g>
    </svg>
  );
}

/** Pillar 2 — a soil mound with grains above it. */
function ArtSoil({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className}>
      <path d="M-4 120C28 120 36 82 70 82 106 82 114 120 156 120Z" fill="currentColor" />
      <g fill="currentColor">
        <circle cx="44" cy="70" r="3.5" />
        <circle cx="72" cy="58" r="5" />
        <circle cx="102" cy="68" r="3" />
        <circle cx="124" cy="88" r="4.5" />
        <circle cx="22" cy="94" r="3" />
      </g>
    </svg>
  );
}

/** Pillar 3 — a fanned leaf cluster. */
function ArtCluster({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className}>
      <g fill="currentColor">
        <path d={LEAF} transform="translate(92,118) rotate(-68) scale(0.78)" />
        <path d={LEAF} transform="translate(92,118) rotate(-32) scale(1.02)" />
        <path d={LEAF} transform="translate(92,118) rotate(6) scale(0.86)" />
      </g>
    </svg>
  );
}

/** Pillar 4 — leaf above the line, root below it. */
function ArtRoot({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeLinecap="round" fill="none">
        <path d="M14 90H158" strokeWidth="4" />
        <path d="M104 90C104 72 107 60 116 48" strokeWidth="5" />
        <path d="M104 92C100 102 92 108 84 118" strokeWidth="4" />
        <path d="M104 92C108 104 114 110 120 120" strokeWidth="4" />
      </g>
      <g fill="currentColor">
        <path d={LEAF} transform="translate(114,14) scale(0.78)" />
        <path d={LEAF} transform="translate(108,54) rotate(180) scale(0.6)" />
      </g>
    </svg>
  );
}

/**
 * The visual design of each pillar card. The copy itself stays in
 * `data/site.ts`; only how it is dressed lives here. Each pillar carries its
 * own accent family so the row reads as a spectrum rather than four identical
 * green cards, and links down to the piece of science it rests on.
 */
const PILLAR_DESIGN = [
  {
    icon: Sprout,
    art: ArtSprig,
    subject: "nourishment",
    rejected: "not on disease",
    href: "#crop-nutrition",
    tile: "bg-brand-50 text-brand-700 ring-brand-100",
    number: "text-brand-600/[0.16]",
    label: "text-brand-700",
    ink: "text-brand-600/[0.07]",
  },
  {
    icon: Mountain,
    art: ArtSoil,
    subject: "soil",
    rejected: "not on climate",
    href: "#soil-biology",
    tile: "bg-saffron-50 text-saffron-600 ring-saffron-100",
    number: "text-saffron-500/25",
    label: "text-saffron-700",
    ink: "text-saffron-500/[0.11]",
  },
  {
    icon: Leaf,
    art: ArtCluster,
    subject: "humus",
    rejected: "not on substitutes",
    href: "#organic-carbon",
    tile: "bg-leaf-200/45 text-leaf-600 ring-leaf-200",
    number: "text-leaf-500/25",
    label: "text-brand-700",
    ink: "text-leaf-500/[0.11]",
  },
  {
    icon: Droplets,
    art: ArtRoot,
    subject: "leaf & root",
    rejected: "not on fruit",
    href: "#mycorrhiza",
    tile: "bg-earth-50 text-earth-600 ring-earth-100",
    number: "text-earth-600/[0.16]",
    label: "text-earth-700",
    ink: "text-earth-600/[0.08]",
  },
] as const;

export default function TechnologyPage() {
  return (
    <>
      <Seo
        title="The Technology"
        description="The four pillars and three principles behind Soil Charger Technology — nourishment before disease, soil before climate, humus before substitutes, roots and leaves before fruit."
        path="/technology"
      />

      <PageHero
        eyebrow="How it works"
        title={
          <>
            Not a product range. <span className="text-shine">A method.</span>
          </>
        }
        lead="Four pillars that decide what SCT will and will not do, the science underneath them, and three principles a farmer follows in the field."
      />

      {/* ---- Pillars ----------------------------------------------------- */}
      <Section ground="light" labelledBy="pillars-page-heading" id="pillars">
        <Shell size="wide">
          <Heading
            id="pillars-page-heading"
            eyebrow="The philosophy"
            align="center"
            title="Four pillars"
            lead="Each one is a choice about where effort goes. They have not changed since 2015."
          />

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => {
              const design = PILLAR_DESIGN[index] ?? PILLAR_DESIGN[0];
              const Icon = design.icon;
              const Art = design.art;
              return (
                <Reveal key={pillar.title} as="li" delay={index * 0.08} className="h-full">
                  <Card className="h-full overflow-hidden p-7">
                    <Art
                      className={cn(
                        "pointer-events-none absolute -bottom-1 -right-1 h-[120px] w-[160px] transition-transform duration-500 [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:scale-110",
                        design.ink,
                      )}
                    />

                    <GhostNumber
                      value={String(index + 1).padStart(2, "0")}
                      className={cn("right-6 top-5 text-[2.6rem] tracking-tight", design.number)}
                    />

                    <span
                      className={cn(
                        "relative grid size-14 shrink-0 place-items-center rounded-[1.15rem] ring-1 ring-inset transition-transform duration-400 motion-safe:group-hover:scale-110",
                        design.tile,
                      )}
                    >
                      <Icon aria-hidden className="size-7" strokeWidth={1.6} />
                    </span>

                    <h3 className="relative mt-6 font-display text-[1.22rem] font-bold leading-tight text-ink-900">
                      Work on {design.subject}
                    </h3>
                    <p
                      className={cn(
                        "relative mt-2 text-[0.72rem] font-bold uppercase tracking-[0.13em]",
                        design.label,
                      )}
                    >
                      {design.rejected}
                    </p>
                    <p className="relative mt-4 flex-1 text-[0.92rem] leading-relaxed text-ink-500">
                      {pillar.body}
                    </p>

                    <Link
                      href={design.href}
                      className="group/link relative mt-6 inline-flex items-center gap-1.5 self-start text-[0.86rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
                    >
                      Read more
                      <span className="sr-only"> about working on {design.subject}</span>
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-expressive)] group-hover/link:translate-x-1"
                      />
                    </Link>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </Shell>
      </Section>

      {/* ---- The science ------------------------------------------------- */}
      <Section ground="forest" labelledBy="science-heading" id="science" fx>
        <Shell size="wide">
          <Heading
            id="science-heading"
            eyebrow="The science"
            tone="onDark"
            align="center"
            title="What is actually happening underground"
            lead="Written for a farmer, not an agronomist. Each one explains a mechanism, not a measured result."
          />

          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {technologies.map((technology, index) => (
              <Reveal key={technology.id} as="li" delay={index * 0.07} className="h-full">
                <Card tone="glass" className="h-full p-7 sm:p-8" id={technology.id}>
                  <h3 className="font-display text-[1.25rem] font-bold leading-tight text-white">
                    {technology.title}
                    {technology.marathi ? (
                      <span lang="mr" className="ml-2.5 text-[0.95rem] font-semibold text-leaf-400">
                        {technology.marathi}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-2.5 text-[0.92rem] font-semibold text-leaf-300/90">
                    {technology.short}
                  </p>
                  <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-sage-300/85">
                    {technology.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </ul>
        </Shell>
      </Section>

      {/* ---- The three principles, reused from home ---------------------- */}
      <div id="principles">
        <Method cta={false} />
      </div>

      {/* ---- What 100% SCT means ----------------------------------------- */}
      <Section
        ground="light"
        labelledBy="hundred-heading"
        id="hundred-percent"
        className="overflow-hidden bg-[#f5f9f4]"
      >
        <HundredBackdrop />

        <Shell size="narrow" className="relative">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <p className="text-eyebrow flex items-center gap-3 text-brand-700">
                <span aria-hidden className="h-px w-8 bg-brand-500/50 sm:w-14" />
                <span aria-hidden className="size-1.5 rounded-full bg-current" />
                A word you will hear a lot
                <span aria-hidden className="h-px w-8 bg-brand-500/50 sm:w-14" />
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="hundred-heading" className="text-h2 mt-4 text-ink-900">
                What &ldquo;100% SCT&rdquo;
                <br />
                <span className="text-brand-600">actually means</span>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-8 max-w-[53rem] space-y-5 text-[1rem] leading-[1.75] text-ink-600 sm:mt-10 sm:text-[1.05rem]">
            <p>
              SCT calls a farmer a 100% SCT user when all three principles are running together —
              the feeding schedule, the prohibitions, and the daily learning. Not two of the three.
            </p>
            <p>
              This matters more than it sounds. The products are formulated assuming the whole
              system is in place. Using SCT inputs alongside chemical fertiliser, or without the
              schedule, is where most disappointing results come from — and it is exactly what led
              SCT to formalise the Saptapadi management system in 2021, after some farmers ran into
              trouble mixing approaches.
            </p>
            <p>
              If you are only able to start partially, say so when you call. The team would rather
              give you a realistic plan for where you actually are than have you follow half a
              method and conclude it does not work.
            </p>
          </div>
        </Shell>

        <Shell size="wide" className="relative">
          <ul className="mx-auto mt-10 grid max-w-[98rem] gap-4 sm:mt-12 md:grid-cols-3 lg:gap-6">
            {SYSTEM_CARDS.map(({ name, text }, index) => {
              const Icon = SYSTEM_ICONS[index] ?? Beaker;
              return (
                <Reveal key={name} as="li" delay={index * 0.08} className="h-full">
                  <div className="relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-hairline bg-white/95 px-5 py-5 shadow-card backdrop-blur-sm sm:gap-5 sm:px-6 sm:py-6">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200 sm:size-14">
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <span aria-hidden className="w-px self-stretch bg-hairline" />
                    <div className="relative z-10 min-w-0 pr-10 text-left sm:pr-14">
                      <p className="font-display text-[1.08rem] font-bold text-ink-900 sm:text-[1.15rem]">
                        {name}
                      </p>
                      <p className="mt-1 text-[0.92rem] leading-snug text-ink-500 sm:text-[0.95rem]">
                        {text}
                      </p>
                    </div>
                    <ArtSprig className="pointer-events-none absolute -bottom-3 -right-6 w-28 text-brand-500 opacity-[0.13] sm:w-32" />
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Shell>
      </Section>

      <ContactCta />
    </>
  );
}
