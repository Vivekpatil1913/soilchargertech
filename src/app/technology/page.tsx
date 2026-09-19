import type { Metadata } from "next";
import Image from "next/image";

import { images } from "@/data/images";
import { technologies } from "@/data/technologies";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { fadeUp } from "@/lib/animations";
import { TechnologySection } from "@/components/home/TechnologySection";
import { VedicSection } from "@/components/home/VedicSection";
import { SaptapadiSection } from "@/components/home/SaptapadiSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Organic carbon, mycorrhiza, natural crop hormones and soil biology — the science Soil Charger Technology works from, explained for farmers rather than laboratories.",
  alternates: { canonical: "/technology" },
};

/** Deep-dive cards for the three ideas that carry the most weight. */
const FOCUS = [
  {
    id: "organic-carbon",
    image: images.soil.compost,
    tech: technologies[0],
  },
  {
    id: "mycorrhiza",
    image: images.soil.mycorrhiza,
    tech: technologies[1],
  },
  {
    id: "soil-biology",
    image: images.soil.profile,
    tech: technologies[3],
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        image={images.soil.survey}
        title={
          <>
            Agriculture powered by <span className="text-leaf-400">soil science.</span>
          </>
        }
        lead="None of this is complicated once it is laid out in order. Every link feeds the next, and the whole chain starts underground — which is exactly why SCT started there."
      />

      {/* ---- Three deep-dives ------------------------------------------------ */}
      <section aria-labelledby="focus-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <SectionHeading
            eyebrow="The foundations"
            title="Three ideas everything else rests on"
            className="max-w-3xl"
          />

          <ScrollReveal stagger={0.1} as="ul" className="mt-12 grid gap-6 lg:grid-cols-3">
            {FOCUS.map((item) => (
              <RevealItem key={item.id} variants={fadeUp} as="li">
                <article
                  id={item.id}
                  className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-shadow duration-400 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-ink-900">
                      {item.tech.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] font-medium text-brand-700">
                      {item.tech.short}
                    </p>
                    <p className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-ink-500">
                      {item.tech.body}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      <TechnologySection />
      <VedicSection />
      <SaptapadiSection />
      <FinalCTA />
    </>
  );
}
