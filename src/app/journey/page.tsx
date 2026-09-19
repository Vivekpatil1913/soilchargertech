import type { Metadata } from "next";

import { images } from "@/data/images";
import { strategySteps } from "@/data/journey";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { fadeUp } from "@/lib/animations";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Our Journey",
  description:
    "From 2015 to today: how Soil Charger Technology went from a single objective — restore organic carbon — to SCT Saptapadi and SCT Vedic Technology.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our journey"
        image={images.hero.landscape}
        title={
          <>
            Ten years of work,{" "}
            <span className="text-leaf-400">including the years it did not work.</span>
          </>
        }
        lead="Between 2015 and 2019, SCT's own solutions could not meet a crop's full requirement on their own — chemical fertiliser was still needed alongside them. The company says so plainly, and that gap became the brief for everything that followed."
      />

      <JourneyTimeline />

      {/* ---- The four-step strategy ------------------------------------------ */}
      <section aria-labelledby="strategy-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <SectionHeading
            eyebrow="The strategy"
            title="Four steps, taken in order"
            lead="Each one depended on the one before it. This is why the company did not start by selling a crop-protection alternative in 2015 — there was no soil ready to carry it yet."
            className="max-w-3xl"
          />

          <ScrollReveal stagger={0.1} as="ol" className="mt-12 space-y-4">
            {strategySteps.map((step) => (
              <RevealItem key={step.number} variants={fadeUp} as="li">
                <div className="group flex flex-col gap-4 rounded-2xl border border-hairline bg-white p-6 transition-[border-color,box-shadow] duration-400 hover:border-brand-200 hover:shadow-soft sm:flex-row sm:items-start sm:gap-8 sm:p-8">
                  <span className="font-display text-4xl font-extrabold leading-none text-cream-300 transition-colors duration-400 group-hover:text-brand-300 sm:text-5xl">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-900">{step.title}</h3>
                    <p className="mt-2.5 max-w-3xl text-[0.95rem] leading-relaxed text-ink-500">
                      {step.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
