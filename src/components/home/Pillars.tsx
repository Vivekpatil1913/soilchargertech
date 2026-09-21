import { Droplets, Leaf, Mountain, Sprout } from "lucide-react";

import { Card, GhostNumber, Heading, Reveal, Section, Shell } from "@/components/ui";
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
 * half as a separate, quieter line. The eye picks up the argument without
 * reading a full sentence, which is the whole requirement for this section.
 */

const ICONS = [Sprout, Mountain, Leaf, Droplets] as const;
const SUBJECTS = ["nourishment", "soil", "humus", "leaf & root"];
const REJECTED = ["not on disease", "not on climate", "not on substitutes", "not on fruit"];

export function Pillars() {
  return (
    <Section ground="forest" labelledBy="pillars-heading" fx>
      <Shell size="wide">
        <Heading
          id="pillars-heading"
          eyebrow="The idea, in four lines"
          title={<>Four pillars we never move off.</>}
          lead="Every product, every schedule and every piece of advice SCT gives comes back to these four. They have not changed since 2015."
          align="center"
          tone="onDark"
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = ICONS[index] ?? Sprout;
            return (
              <Reveal key={pillar.title} as="li" delay={index * 0.09} className="h-full">
                <Card tone="glass" className="h-full p-7">
                  <GhostNumber
                    value={index + 1}
                    className="right-5 top-4 text-5xl text-white/[0.07] group-hover:text-leaf-400/25"
                  />

                  <span className="grid size-12 shrink-0 place-items-center rounded-squircle bg-brand-500/15 text-leaf-300 ring-1 ring-inset ring-brand-400/25 transition-transform duration-400 motion-safe:group-hover:scale-110">
                    <Icon aria-hidden className="size-6" />
                  </span>

                  <h3 className="mt-6 font-display text-[1.3rem] font-bold leading-tight text-white">
                    Work on {SUBJECTS[index]}
                  </h3>
                  <p className="mt-1.5 text-[0.88rem] font-semibold text-sage-400">
                    {REJECTED[index]}
                  </p>

                  <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-sage-300/85">
                    {pillar.body}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </Section>
  );
}
