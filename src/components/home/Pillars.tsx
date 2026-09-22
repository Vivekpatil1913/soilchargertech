import { Droplets, Leaf, Mountain, Sprout } from "lucide-react";

import { Heading, Reveal, Section, Shell } from "@/components/ui";
import { pillars } from "@/data/site";

/**
 * THE FOUR PILLARS
 * ================
 * SCT's own manifesto, published on their site since the beginning, and the
 * strongest piece of brand IP they have. It follows the problem section, so the
 * moment a visitor recognises their own complaint it answers "what is your
 * idea?" in four lines a farmer can read at a glance.
 *
 * Each pillar is a contrast — do THIS, not THAT — so the card sets the rejected
 * half as a separate, quieter line struck through. The eye picks up the
 * argument without reading a full sentence, which is the whole requirement for
 * this section.
 */

const ICONS = [Sprout, Mountain, Leaf, Droplets] as const;
const SUBJECTS = ["nourishment", "soil", "humus", "leaf & root"];
const REJECTED = ["not on disease", "not on climate", "not on substitutes", "not on fruit"];

export function Pillars() {
  return (
    <Section ground="canvasDown" labelledBy="pillars-heading">
      <Shell>
        <Heading
          id="pillars-heading"
          eyebrow="The idea, in four lines"
          title="Four pillars we never move off."
          lead="Every product, every schedule and every piece of advice SCT gives comes back to these four. They have not changed since 2015."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = ICONS[index] ?? Sprout;
            return (
              <Reveal key={pillar.title} as="li" delay={index * 0.07} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-colors duration-300 hover:border-forest-200">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-lg bg-forest-50 text-forest-700">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span
                      aria-hidden
                      className="font-display text-lg font-bold tabular-nums text-ink-200"
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-base font-semibold leading-snug text-ink-900">
                    Work on {SUBJECTS[index]}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-ink-400 line-through decoration-harvest-400/60">
                    {REJECTED[index]}
                  </p>

                  <p className="mt-4 flex-1 border-t border-ink-100 pt-4 text-sm leading-relaxed text-ink-500">
                    {pillar.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </Section>
  );
}
