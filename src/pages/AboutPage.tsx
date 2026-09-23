import { TeamSection } from "@/components/about/TeamSection";
import { VisionMission } from "@/components/about/VisionMission";
import { IsoCertification } from "@/components/common/IsoCertification";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { ContactCta } from "@/components/home/ContactCta";
import { Card, GhostNumber, Heading, Reveal, Section, Shell } from "@/components/ui";
import { journey } from "@/data/journey";
import { site } from "@/data/site";
import Image from "@/shims/Image";

/**
 * ABOUT
 * =====
 * Built around the founder's letter, which is the best piece of writing SCT
 * owns and was buried on the old site. It is reproduced in full, because its
 * value is that it is one person explaining a decision in their own words —
 * summarising it would destroy exactly the thing that makes it good.
 *
 * The timeline beneath it is extracted from that same letter, so the dates are
 * SCT's own rather than reconstructed.
 */
export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Soil Charger Technology"
        description={`Founded in Nashik in ${site.founded} by ${site.founder}. How SCT moved from organic carbon to SCT Vedic — a decade of work on Indian soil, in the founder's own words.`}
        path="/about"
      />

      <PageHero
        eyebrow="Who we are"
        title={
          <>
            It started with one decision about <span className="text-shine">carbon.</span>
          </>
        }
        lead={`${site.founder} founded Soil Charger Technology in Nashik in ${site.founded}. Not with a product — with a problem he could not stop thinking about.`}
      />

      {/* ---- The founder's letter, in full ------------------------------ */}
      <Section ground="light" labelledBy="letter-heading" id="story">
        <Shell size="wide">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <figure>
                <div className="shadow-card-lg relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/legacy/team1.png"
                    alt={`${site.founder}, founder of Soil Charger Technology`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5">
                  <p className="font-display text-[1.05rem] font-bold text-ink-900">
                    {site.founder}
                  </p>
                  <p className="mt-1 text-[0.88rem] text-ink-500">
                    Founder · Nashik, Maharashtra
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Heading
                id="letter-heading"
                eyebrow="In his own words"
                title="A letter to farmers"
              />

              <div className="mt-9 space-y-6 text-[1.02rem] leading-[1.78] text-ink-600">
                <p className="font-display text-[1.15rem] font-semibold text-ink-900">Friends,</p>

                <p>
                  After the Green Revolution, out of a desire for higher income we interfered with
                  the natural life cycle of crops and overused chemicals. As a result, the health of
                  both crop and soil was endangered. Recognising this threat in {site.founded}, SCT
                  gave first priority to increasing soil fertility and organic carbon. Its first
                  objective was to provide a strong source of organic carbon.
                </p>

                <p>
                  Gradually, realising the importance of organic carbon, SCT worked to build the
                  prosperity of farmers. Soil pollution was stopped by providing strong
                  alternatives.
                </p>

                <p>
                  The third step was to stop the use of synthetic PGR, and to provide a safe
                  alternative for the development of natural hormones in crops with the help of
                  mycorrhiza.
                </p>

                <p>
                  The fourth step was to stop the flow of toxic pollutants in the name of crop
                  protection. Thousands of farmers have shown from their own experience that
                  nutrition is the only real option for crop protection — and after some farmers
                  made management mistakes, SCT Saptapadi was born in 2021.
                </p>

                <p>
                  Then the journey from SCT to Vedic. From 2015 to 2019 it was impossible to satisfy
                  the crop using SCT alone, so we still had to rely on chemical fertilisers. Vedic
                  scientists, myself and the team have come through ten years of research, and Vedic
                  technology has been born from the teaching of both SCT and Vedic.
                </p>

                <p className="font-display text-[1.1rem] font-semibold leading-relaxed text-ink-900">
                  Today, SCT Vedic will be a revolutionary step in Indian agriculture as India
                  becomes a superpower in the 21st century. We have faith in agriculture and in
                  soil, to complete the farmer&apos;s dream.
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </Section>

      {/* ---- Timeline ---------------------------------------------------- */}
      <Section ground="forest" labelledBy="journey-heading" id="journey" fx>
        <Shell size="wide">
          <Heading
            id="journey-heading"
            eyebrow="The journey"
            tone="onDark"
            align="center"
            title="A decade, step by step"
            lead="Each step below is taken from the founder's own account above — not reconstructed."
          />

          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, index) => (
              <Reveal key={step.year} as="li" delay={index * 0.08} className="h-full">
                <Card tone="glass" className="h-full p-7">
                  <GhostNumber
                    value={String(index + 1).padStart(2, "0")}
                    className="right-5 top-4 text-4xl text-white/[0.07] group-hover:text-leaf-400/25"
                  />
                  <p className="font-display text-[1.6rem] font-extrabold leading-none text-leaf-400">
                    {step.year}
                  </p>
                  <h3 className="mt-4 font-display text-[1.1rem] font-bold leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-sage-300/85">
                    {step.summary}
                  </p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </Shell>
      </Section>

      {/* ---- Vision & mission -------------------------------------------- */}
      <VisionMission />

      <TeamSection />

      <IsoCertification ground="tint" />

      <ContactCta />
    </>
  );
}
