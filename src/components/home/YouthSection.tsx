import Image from "next/image";
import { GraduationCap, Lightbulb, Rocket } from "lucide-react";
import { images } from "@/data/images";
import { mission } from "@/data/site";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { fadeUp, slideInRight } from "@/lib/animations";

/**
 * YOUTH & AGRICULTURE
 * ===================
 * One of SCT's two published mission statements is about young people choosing
 * farming, so it gets its own section rather than a line in a list.
 *
 * The framing matters here: not "agriculture needs saving" but "agriculture is
 * worth choosing". A young reader deciding between farming and a city job is
 * the audience, and pity is not an argument.
 */

const REASONS = [
  {
    icon: Lightbulb,
    title: "A field is a system to understand",
    body: "Soil biology, water, nutrition and timing. There is more to learn in an acre than most jobs offer in a decade.",
  },
  {
    icon: Rocket,
    title: "A farm is a business to build",
    body: "Land, produce, quality and market — the same levers any enterprise runs on, with an asset that appreciates if you treat it right.",
  },
  {
    icon: GraduationCap,
    title: "Science belongs in the field",
    body: "Understanding what is happening underground is what separates a farmer who guesses from one who decides.",
  },
];

export function YouthSection() {
  return (
    /* overflow-hidden matters here: the photograph column enters with
       slideInRight, which parks it 34px off-axis until it scrolls into view.
       Without clipping, that offset widens the document on small screens. */
    <section
      aria-labelledby="youth-heading"
      className="section-y overflow-hidden bg-cream-100"
    >
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          {/* ---- Copy -------------------------------------------------------- */}
          <div>
            <SectionHeading
              eyebrow="The next generation"
              tone="saffron"
              title={
                <>
                  Making agriculture worth{" "}
                  <span className="text-saffron-600">choosing again.</span>
                </>
              }
              lead={mission[1]}
            />

            <ScrollReveal stagger={0.1} as="ul" className="mt-10 space-y-6">
              {REASONS.map((reason) => (
                <RevealItem key={reason.title} variants={fadeUp} as="li">
                  <div className="group flex gap-4 rounded-xl border border-transparent p-3 transition-colors duration-400 hover:border-saffron-100 hover:bg-white">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-saffron-50 text-saffron-600 transition-transform duration-400 [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:-rotate-6">
                      <reason.icon aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block font-display text-base font-bold text-ink-900">
                        {reason.title}
                      </span>
                      <span className="mt-1 block text-[0.9rem] leading-relaxed text-ink-500">
                        {reason.body}
                      </span>
                    </span>
                  </div>
                </RevealItem>
              ))}
            </ScrollReveal>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <CTAButton href="/knowledge" variant="text">
                Start with the knowledge centre
              </CTAButton>
              <CTAButton href="/contact" variant="text">
                Ask about internships
              </CTAButton>
            </div>
          </div>

          {/* ---- Photography -------------------------------------------------- */}
          <ScrollReveal variants={slideInRight} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[6rem] shadow-lift lg:aspect-[4/4.4]">
              <Image
                src={images.farmers.youth.src}
                alt={images.farmers.youth.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent"
              />
            </div>

            {/* SCT's first mission statement, pulled out as a quote */}
            <div className="relative -mt-10 ml-4 mr-6 rounded-2xl border border-hairline bg-white p-5 shadow-lift sm:ml-8 sm:p-6">
              <p className="font-display text-lg font-bold leading-snug text-ink-900">
                &ldquo;{mission[0]}&rdquo;
              </p>
              <p className="mt-3 text-[0.8rem] font-semibold uppercase tracking-wider text-brand-700">
                SCT Mission
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
