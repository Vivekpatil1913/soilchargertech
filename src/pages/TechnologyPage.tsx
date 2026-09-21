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
      <Section ground="light" labelledBy="hundred-heading" id="hundred-percent">
        <Shell size="narrow">
          <Heading
            id="hundred-heading"
            eyebrow="A word you will hear a lot"
            align="center"
            title={
              <>
                What &ldquo;100% SCT&rdquo; <span className="text-brand-600">actually means</span>
              </>
            }
          />

          <div className="mt-10 space-y-5 text-[1.02rem] leading-[1.78] text-ink-600">
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

          <ul className="mt-11 grid gap-4 sm:grid-cols-3">
            {["Method", "Rule", "Meditation"].map((name, index) => {
              const Icon = SYSTEM_ICONS[index] ?? Beaker;
              return (
                <Reveal key={name} as="li" delay={index * 0.08}>
                  <div className="flex items-center gap-3.5 rounded-2xl border border-hairline bg-white px-5 py-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-squircle bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="font-display text-[1rem] font-bold text-ink-900">{name}</span>
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
