import { Ban, Beaker, BookOpenCheck } from "lucide-react";

import { Button, Card, GhostNumber, Heading, Reveal, Section, Shell } from "@/components/ui";

/**
 * THE THREE PRINCIPLES
 * ====================
 * SCT's own method, from docs/sct-legacy-content.md §3.3.
 *
 * Two things were repaired in carrying it across. On the live site the three
 * modals have their bullets shuffled between them — the "Method" popup carries
 * a Meditation bullet, the "Meditation" popup carries a Rule bullet. They are
 * regrouped correctly here. And SCT's own names are kept, because Method /
 * Rule / Meditation is their vocabulary, but each gets a plain second line so a
 * first-time reader knows what it means without opening anything.
 *
 * Presented as a numbered sequence rather than three unrelated cards, because
 * SCT's own position is that all three together is what "100% SCT" means.
 */

const PRINCIPLES = [
  {
    number: "01",
    name: "Method",
    plain: "What to give, and how often",
    icon: Beaker,
    tone: "brand",
    points: [
      "A basal dose of Krushi Amrut, Root Charger and Nutri Charger every 60 days, as the plant needs it.",
      "At least once a week, through soil, drip or drenching: Soil Charger 1 litre and Health Charger 600 g per acre.",
      "Every spray mixed with a Fruit Charger.",
    ],
  },
  {
    number: "02",
    name: "Rule",
    plain: "What never to do",
    icon: Ban,
    tone: "saffron",
    points: [
      "No chemical fertiliser at all — granular or water-soluble.",
      "No cultivation that moves or exposes the soil. Do not cut weeds in the rain; wait for dry weather.",
      "For crop protection use only Pest Fighter, Pest Cleaner, Disease Fighter and Fungi Cleaner. No chemicals.",
    ],
  },
  {
    number: "03",
    name: "Meditation",
    plain: "Learning, every single day",
    icon: BookOpenCheck,
    tone: "earth",
    points: [
      "Watch the daily video and make notes. SCT calls this the breath of SCT Vedic.",
      "Read the daily article in the WhatsApp group. This is the water.",
      "Three to five minutes a day talking to another SCT farmer. This is the food.",
    ],
  },
] as const;

const TONE = {
  brand: {
    tile: "bg-brand-50 text-brand-700 ring-brand-200",
    rail: "bg-brand-600",
    ghost: "group-hover:text-brand-600/15",
  },
  saffron: {
    tile: "bg-saffron-50 text-saffron-700 ring-saffron-200",
    rail: "bg-saffron-500",
    ghost: "group-hover:text-saffron-600/15",
  },
  earth: {
    tile: "bg-earth-50 text-earth-700 ring-earth-200",
    rail: "bg-earth-600",
    ghost: "group-hover:text-earth-600/15",
  },
} as const;

export function Method({ cta = true }: { cta?: boolean }) {
  return (
    <Section ground="tint" labelledBy="method-heading">
      <Shell size="wide">
        <Heading
          id="method-heading"
          eyebrow="The method"
          align="center"
          title={
            <>
              Three principles. <span className="text-brand-600">Follow all three.</span>
            </>
          }
          lead="SCT calls a farmer who follows all three a 100% SCT user. Two out of three is where most of the problems come from — the products are built assuming the whole system is running."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;
            const tone = TONE[principle.tone];
            return (
              <Reveal key={principle.name} as="li" delay={index * 0.1} className="h-full">
                <Card className="h-full overflow-hidden p-7">
                  {/* The only chrome that separates the three at a glance. */}
                  <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${tone.rail}`} />

                  <GhostNumber
                    value={principle.number}
                    className={`right-6 top-6 text-5xl text-ink-900/[0.05] ${tone.ghost}`}
                  />

                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-squircle ring-1 ring-inset transition-transform duration-400 motion-safe:group-hover:scale-110 ${tone.tile}`}
                  >
                    <Icon aria-hidden className="size-6" />
                  </span>

                  <h3 className="mt-6 font-display text-[1.3rem] font-bold leading-tight text-ink-900">
                    {principle.name}
                  </h3>
                  <p className="mt-1 text-[0.88rem] font-semibold text-ink-400">
                    {principle.plain}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3.5">
                    {principle.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[0.9rem] leading-relaxed text-ink-500"
                      >
                        <span
                          aria-hidden
                          className={`mt-[0.55em] size-1.5 shrink-0 rounded-full ${tone.rail}`}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </ul>

        {/* Redundant on /technology, which is where the link goes. */}
        {cta && (
          <Reveal delay={0.12} className="mt-11 flex justify-center">
            <Button href="/technology" size="lg">
              See the full method
            </Button>
          </Reveal>
        )}
      </Shell>
    </Section>
  );
}
