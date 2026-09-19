import type { Metadata } from "next";
import Image from "next/image";

import { images } from "@/data/images";
import { journey } from "@/data/journey";
import { mission, pillars, site, team, vision } from "@/data/site";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { fadeUp } from "@/lib/animations";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "About SCT",
  description:
    "Soil Charger Technology was founded in Nashik in 2015 with one objective before any other: restore soil fertility and organic carbon. This is the company, its pillars and its people.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SCT"
        title={
          <>
            A company that started with the soil,{" "}
            <span className="text-brand-600">not with a product.</span>
          </>
        }
        lead="Founded in Nashik in 2015 by Mr. Ram Mukhekar, Soil Charger Technology set itself one objective before any other — give Indian soil a strong and reliable source of organic carbon, and build everything else on that."
      />

      {/* ---- The story ------------------------------------------------------ */}
      <section aria-labelledby="story-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <SectionHeading eyebrow="The story" title="Why SCT exists" as="h2" />

              <div className="mt-8 space-y-5 text-[0.98rem] leading-relaxed text-ink-600">
                <p>
                  After the Green Revolution, the pursuit of higher income and higher productivity
                  led to steadily greater interference in the natural life cycle of crops —
                  fertiliser and chemicals applied well past what the cycle could absorb. The health
                  of both the crop and the soil was put at risk.
                </p>
                <p>
                  Recognising that threat in {site.founded}, SCT gave priority to restoring soil
                  fertility and increasing organic carbon. The first objective was a strong and
                  reliable source of organic carbon — not a product range, not a market, a source.
                </p>
                <p>
                  From there the work moved outward in steps. Providing real alternatives to the
                  practices that pollute soil. Reducing dependence on synthetic plant growth
                  regulators by supporting the crop&apos;s own hormone development with the help of
                  mycorrhiza. Then reducing the flow of toxic pollutants applied in the name of crop
                  protection — because thousands of farmers had already shown, from their own
                  fields, that nutrition plays a real part in protecting a crop.
                </p>
                <p>
                  That thinking produced SCT Saptapadi in 2021, developed after studying where crop
                  management commonly goes wrong. And roughly ten years of research — Vedic
                  scientists, the SCT team and long agricultural experience working together —
                  produced SCT Vedic Technology.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
                <CTAButton href="/journey" variant="text">
                  See the full timeline
                </CTAButton>
                <CTAButton href="/technology" variant="text">
                  Read the technology
                </CTAButton>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[5rem] shadow-lift">
                <Image
                  src={images.farmers.bullock.src}
                  alt={images.farmers.bullock.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 rounded-xl border border-hairline bg-white p-5">
                <p className="text-eyebrow text-brand-700">Founder</p>
                <p className="mt-2 font-display text-lg font-bold text-ink-900">{site.founder}</p>
                <p className="mt-1 text-[0.88rem] text-ink-500">
                  Nashik, Maharashtra · Founded {site.founded}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Pillars --------------------------------------------------------- */}
      <section aria-labelledby="pillars-heading" className="section-y bg-cream-100">
        <Container width="wide">
          <SectionHeading
            eyebrow="How we work"
            title="Four pillars we do not move off"
            lead="These are SCT's own working principles, stated the way the company states them."
            className="max-w-3xl"
          />

          <ScrollReveal stagger={0.09} as="ul" className="mt-12 grid gap-5 md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <RevealItem key={pillar.title} variants={fadeUp} as="li">
                <article className="group h-full rounded-2xl border border-hairline bg-white p-7 transition-[border-color,box-shadow,transform] duration-400 [transition-timing-function:var(--ease-out-soft)] hover:border-brand-200 hover:shadow-soft motion-safe:hover:-translate-y-1">
                  <span className="font-display text-sm font-extrabold tracking-widest text-brand-400">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-500">{pillar.body}</p>
                </article>
              </RevealItem>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      {/* ---- Vision & mission -------------------------------------------------- */}
      <section id="vision" aria-labelledby="vision-mission-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Vision" title="What we are working toward" as="h2" />
              <ScrollReveal stagger={0.1} as="ul" className="mt-8 space-y-4">
                {vision.map((line, i) => (
                  <RevealItem key={line} variants={fadeUp} as="li" className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-600 font-display text-[0.75rem] font-extrabold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-[0.98rem] leading-relaxed text-ink-700">{line}</span>
                  </RevealItem>
                ))}
              </ScrollReveal>
            </div>

            <div>
              <SectionHeading
                eyebrow="Mission"
                tone="saffron"
                title="What we are trying to change"
                as="h2"
              />
              <ScrollReveal stagger={0.1} as="ul" className="mt-8 space-y-4">
                {mission.map((line, i) => (
                  <RevealItem key={line} variants={fadeUp} as="li" className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-saffron-500 font-display text-[0.75rem] font-extrabold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-[0.98rem] leading-relaxed text-ink-700">{line}</span>
                  </RevealItem>
                ))}
              </ScrollReveal>

              <div className="mt-8 rounded-2xl border border-saffron-100 bg-saffron-50 p-6">
                <p className="font-display text-lg font-bold leading-snug text-earth-800">
                  &ldquo;{site.tagline}&rdquo;
                </p>
                <p className="mt-2 text-[0.85rem] text-ink-500">
                  The line SCT has carried since the beginning.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Team -------------------------------------------------------------- */}
      <section id="team" aria-labelledby="team-heading" className="section-y bg-cream-100">
        <Container width="wide">
          <SectionHeading
            eyebrow="Our team"
            title="The people behind the work"
            lead="Leadership as listed by SCT, with the company's own photographs."
            className="max-w-3xl"
          />

          <ScrollReveal
            stagger={0.08}
            as="ul"
            className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
          >
            {team.map((person) => (
              <RevealItem key={person.name} variants={fadeUp} as="li">
                <figure className="group overflow-hidden rounded-2xl border border-hairline bg-white transition-shadow duration-400 hover:shadow-soft">
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
                    <Image
                      src={person.image}
                      alt={`${person.name}, ${person.role} at Soil Charger Technology`}
                      fill
                      sizes="(max-width: 640px) 50vw, 220px"
                      className="object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-4">
                    <p className="font-display text-[0.95rem] font-bold leading-snug text-ink-900">
                      {person.name}
                    </p>
                    <p className="mt-1 text-[0.8rem] text-ink-500">{person.role}</p>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      {/* ---- Milestones -------------------------------------------------------- */}
      <section aria-labelledby="milestones-heading" className="section-y bg-cream-50">
        <Container width="wide">
          <SectionHeading
            eyebrow="In short"
            title="Ten years, four turning points"
            className="max-w-3xl"
          />
          <ScrollReveal stagger={0.08} as="ol" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((milestone) => (
              <RevealItem key={milestone.year} variants={fadeUp} as="li">
                <div className="h-full rounded-2xl border border-hairline bg-white p-6">
                  <p className="font-display text-xl font-extrabold text-brand-700">
                    {milestone.year}
                  </p>
                  <h3 className="mt-3 font-display text-base font-bold text-ink-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-500">
                    {milestone.summary}
                  </p>
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
