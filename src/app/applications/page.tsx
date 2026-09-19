import type { Metadata } from "next";
import Image from "next/image";

import { applications } from "@/data/applications";
import { images } from "@/data/images";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { fadeUp } from "@/lib/animations";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Vegetables, fruits and vineyards, cereals, pulses and oilseeds, cash crops and horticulture — the crop families Soil Charger Technology solutions are used across.",
  alternates: { canonical: "/applications" },
};

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Applications"
        image={images.crops.wheat}
        title={
          <>
            Soil is soil, <span className="text-leaf-400">whatever grows in it.</span>
          </>
        }
        lead="These are the crop families SCT's solutions are used across. For what suits your specific crop, soil and season, the team will answer for your field rather than in general."
      />

      <section aria-labelledby="crop-families-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <SectionHeading
            eyebrow="Crop families"
            title="Where SCT works"
            className="max-w-3xl"
          />

          <ScrollReveal stagger={0.09} as="ul" className="mt-10 space-y-6">
            {applications.map((app, i) => (
              <RevealItem key={app.id} variants={fadeUp} as="li">
                <article
                  className={`grid gap-6 overflow-hidden rounded-2xl border border-hairline bg-white lg:grid-cols-2 lg:gap-0 ${
                    i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="relative m-0 aspect-[16/10] lg:aspect-auto lg:min-h-[19rem]">
                    <Image
                      src={app.image.src}
                      alt={app.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </figure>

                  <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                    <span className="text-eyebrow text-brand-700">
                      0{i + 1} · Crop family
                    </span>
                    <h3 className="text-h3 mt-4 text-ink-900">{app.title}</h3>
                    <p className="mt-3 text-[0.88rem] font-medium text-brand-700">{app.examples}</p>
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-500">{app.body}</p>
                    <div className="mt-6">
                      <CTAButton href="/contact" variant="text">
                        Ask about this crop
                      </CTAButton>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </ScrollReveal>

          <div className="mt-10 rounded-2xl border border-hairline bg-white p-7 sm:p-9">
            <h2 className="text-h3 text-ink-900">Growing something not listed here?</h2>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-500">
              The list above is crop families, not a limit. Soil health is the same problem whatever
              is planted in it — tell the team what you grow and where, and they will tell you
              whether SCT has something useful for it.
            </p>
            <div className="mt-6">
              <CTAButton href="/contact">Talk to an expert</CTAButton>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
