"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { journey } from "@/data/journey";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTAButton } from "@/components/common/CTAButton";
import { EASE_OUT_SOFT } from "@/lib/animations";

/**
 * THE JOURNEY
 * ===========
 * 2015 to today, as SCT tells it — including the years between 2015 and 2019
 * when the company's own solutions could not yet do the job alone. That
 * admission is the most credible thing on the page, so it stays in.
 *
 * Horizontal on desktop with a rail that fills as you scroll; vertical on
 * mobile, where a sideways timeline would be unusable. Both share one data
 * source and one set of markers.
 */

export function JourneyTimeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section
      aria-labelledby="journey-heading"
      className="section-y relative overflow-hidden bg-cream-100"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 size-[30rem] bloom bg-brand-200/45"
      />

      <Container width="wide" className="relative">
        <SectionHeading
          eyebrow="Our journey"
          title={
            <>
              A decade of work, <span className="text-brand-600">one layer at a time.</span>
            </>
          }
          lead="Ten years is a long time to spend on soil before calling anything finished. This is how the work actually went."
          className="max-w-3xl"
        />

        <div ref={railRef} className="relative mt-14 lg:mt-20">
          {/* ---- Rail: vertical on mobile ---------------------------------- */}
          <div aria-hidden className="absolute bottom-0 left-[1.4rem] top-2 w-px bg-cream-300 lg:hidden">
            <motion.div
              style={{ scaleY: progress }}
              className="h-full w-full origin-top bg-gradient-to-b from-brand-500 via-brand-600 to-saffron-500"
            />
          </div>

          {/* ---- Rail: horizontal on desktop -------------------------------- */}
          <div aria-hidden className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-cream-300 lg:block">
            <motion.div
              style={{ scaleX: progress }}
              className="h-full w-full origin-left bg-gradient-to-r from-brand-500 via-brand-600 to-saffron-500"
            />
          </div>

          <ol className="flex flex-col gap-10 lg:flex-row lg:gap-6">
            {journey.map((milestone, i) => (
              <motion.li
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: i * 0.08 }}
                className="relative flex-1 pl-14 lg:pl-0 lg:pt-16"
              >
                {/* Marker */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: 0.15 + i * 0.08 }}
                  className="absolute left-0 top-1 grid size-[2.8rem] place-items-center rounded-full border-4 border-cream-100 bg-white shadow-soft lg:top-0"
                >
                  <span className="size-3 rounded-full bg-brand-600" />
                </motion.span>

                <div className="rounded-2xl border border-hairline bg-white p-6 shadow-soft transition-shadow duration-400 hover:shadow-lift">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-2xl font-extrabold tracking-tight text-brand-700">
                      {milestone.year}
                    </span>
                    <span className="rounded-full bg-saffron-50 px-2.5 py-1 text-[0.7rem] font-semibold text-saffron-700">
                      {milestone.focus}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-ink-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-[0.92rem] font-medium text-ink-600">{milestone.summary}</p>
                  <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-500">{milestone.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <CTAButton href="/journey" variant="secondary">
            Explore the full journey
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
