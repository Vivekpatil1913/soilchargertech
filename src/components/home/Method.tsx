import { Ban, Beaker, BookOpenCheck } from "lucide-react";

import { Button, Card, Heading, Reveal, Section, Shell, StepMark } from "@/components/ui";

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
    points: [
      "Watch the daily video and make notes. SCT calls this the breath of SCT Vedic.",
      "Read the daily article in the WhatsApp group. This is the water.",
      "Three to five minutes a day talking to another SCT farmer. This is the food.",
    ],
  },
] as const;

export function Method({ cta = true }: { cta?: boolean }) {
  return (
    <Section ground="light" labelledBy="method-heading">
      <Shell>
        <Heading
          id="method-heading"
          eyebrow="The method"
          title="Three principles. Follow all three."
          lead="SCT calls a farmer who follows all three a 100% SCT user. Two out of three is where most of the problems come from — the products are built assuming the whole system is running."
        />

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.name} as="li" delay={index * 0.08} className="h-full">
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <StepMark value={principle.number} />
                    <Icon aria-hidden className="size-4 text-forest-600" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">
                    {principle.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-harvest-700">
                    {principle.plain}
                  </p>

                  <ul className="mt-5 flex-1 space-y-3 border-t border-ink-100 pt-5">
                    {principle.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink-500">
                        <span
                          aria-hidden
                          className="mt-[0.62em] size-1 shrink-0 rounded-full bg-harvest-400"
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
        {cta ? (
          <Reveal delay={0.1} className="mt-8">
            <Button href="/technology" variant="secondary">
              See the full method
            </Button>
          </Reveal>
        ) : null}
      </Shell>
    </Section>
  );
}
