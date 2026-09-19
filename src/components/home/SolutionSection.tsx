import { Recycle, Sprout, Leaf, ShieldOff } from "lucide-react";
import { strategySteps } from "@/data/journey";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { scaleIn } from "@/lib/animations";

/**
 * SCT'S RESPONSE
 * ==============
 * The company's own four-step development strategy, in the order it actually
 * happened. Each card is one step — a number, an icon, and the plainest
 * statement of the objective we can make without adding a claim SCT has not
 * published.
 */

const ICONS = [Recycle, Sprout, Leaf, ShieldOff] as const;

const ACCENTS = [
  { ring: "group-hover:border-brand-300", chip: "bg-brand-50 text-brand-700", bar: "bg-brand-500" },
  { ring: "group-hover:border-leaf-400", chip: "bg-brand-50 text-brand-700", bar: "bg-leaf-500" },
  {
    ring: "group-hover:border-saffron-300",
    chip: "bg-saffron-50 text-saffron-700",
    bar: "bg-saffron-400",
  },
  { ring: "group-hover:border-earth-200", chip: "bg-earth-50 text-earth-700", bar: "bg-earth-600" },
] as const;

export function SolutionSection() {
  return (
    <section aria-labelledby="solution-heading" className="section-y bg-cream-50">
      <Container width="wide">
        <SectionHeading
          eyebrow="Our approach"
          title={
            <>
              From soil challenges to{" "}
              <span className="text-brand-600">sustainable solutions.</span>
            </>
          }
          lead="SCT did not start with a product. It started with an order of operations — four steps, taken one at a time, each one built on the ground the last one prepared."
          className="max-w-3xl"
        />

        <ScrollReveal stagger={0.1} className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-18 lg:grid-cols-4">
          {strategySteps.map((step, i) => {
            const Icon = ICONS[i];
            const accent = ACCENTS[i];
            return (
              <RevealItem
                key={step.number}
                variants={scaleIn}
                as="article"
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white p-6 transition-[border-color,box-shadow,transform] duration-400 [transition-timing-function:var(--ease-out-soft)] hover:shadow-lift motion-safe:hover:-translate-y-1.5 ${accent.ring}`}
              >
                {/* Accent bar that draws itself in on hover */}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-x-100 ${accent.bar}`}
                />

                <div className="flex items-center justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-xl transition-transform duration-400 [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:-rotate-6 ${accent.chip}`}
                  >
                    <Icon aria-hidden className="size-5.5" />
                  </span>
                  <span className="font-display text-3xl font-extrabold text-cream-300 transition-colors duration-400 group-hover:text-cream-200">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-lg font-bold leading-snug text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-500">{step.body}</p>
              </RevealItem>
            );
          })}
        </ScrollReveal>

        <ScrollReveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <CTAButton href="/about" variant="text">
            Read the full SCT story
          </CTAButton>
          <CTAButton href="/technology" variant="text">
            See the science behind it
          </CTAButton>
        </ScrollReveal>
      </Container>
    </section>
  );
}
