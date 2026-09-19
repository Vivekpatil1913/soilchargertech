import Image from "next/image";
import { Coins, HeartPulse, Sprout, TrendingUp, Wheat } from "lucide-react";
import { images } from "@/data/images";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { fadeUp, slideInLeft } from "@/lib/animations";

/**
 * BUILT AROUND THE FARMER
 * =======================
 * The section that decides whether a farmer trusts the rest of the site. It is
 * written in the second person, in plain language, and every benefit is framed
 * as something that happens to the field rather than something a product does —
 * because that is the part SCT can speak to without claiming a result.
 *
 * The composition puts real working photography beside the copy rather than
 * icons alone: this page is about people who work outdoors.
 */

const BENEFITS = [
  {
    icon: Sprout,
    title: "Better soil",
    body: "Ground that holds water, breathes, and carries organic carbon instead of losing it season after season.",
  },
  {
    icon: Wheat,
    title: "Better crops",
    body: "Roots that reach further and plants fed from the inside, rather than pushed from the outside.",
  },
  {
    icon: HeartPulse,
    title: "Better nutrition",
    body: "Produce grown toward SCT's stated aim — nutritious and non-toxic, for the family that eats it as much as the market that buys it.",
  },
  {
    icon: TrendingUp,
    title: "Better sustainability",
    body: "Soil treated as an asset you are building, not an input you are spending down.",
  },
  {
    icon: Coins,
    title: "Better long-term economics",
    body: "A field that becomes less dependent on bought inputs each year, instead of more.",
  },
];

export function FarmerSection() {
  return (
    <section
      aria-labelledby="farmer-heading"
      className="section-y relative overflow-hidden bg-cream-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 size-[30rem] bloom bg-saffron-200/40"
      />

      <Container width="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* ---- Photography ------------------------------------------------ */}
          <ScrollReveal variants={slideInLeft} className="relative">
            <div className="grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4">
              <div className="col-span-3 row-span-4 overflow-hidden rounded-2xl rounded-tl-[3.5rem]">
                <div className="relative size-full min-h-[14rem]">
                  <Image
                    src={images.farmers.harvest.src}
                    alt={images.farmers.harvest.alt}
                    fill
                    sizes="(max-width: 1024px) 60vw, 300px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl">
                <div className="relative size-full min-h-[10rem]">
                  <Image
                    src={images.farmers.bullock.src}
                    alt={images.farmers.bullock.alt}
                    fill
                    sizes="(max-width: 1024px) 40vw, 200px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl rounded-br-[3.5rem]">
                <div className="relative size-full min-h-[10rem]">
                  <Image
                    src={images.farmers.group.src}
                    alt={images.farmers.group.alt}
                    fill
                    sizes="(max-width: 1024px) 40vw, 200px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl">
                <div className="relative size-full min-h-[8rem]">
                  <Image
                    src={images.farmers.tractor.src}
                    alt={images.farmers.tractor.alt}
                    fill
                    sizes="(max-width: 1024px) 60vw, 300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ---- Copy -------------------------------------------------------- */}
          <div className="lg:pt-4">
            <SectionHeading
              eyebrow="Farmer first"
              title={
                <>
                  Built around <span className="text-brand-600">the farmer.</span>
                </>
              }
              lead="Not around a product line, and not around a laboratory. The question SCT keeps returning to is a simple one: does this leave the farmer better off in ten years, and not only this season?"
            />

            <ScrollReveal stagger={0.08} as="ul" className="mt-10 space-y-5">
              {BENEFITS.map((benefit) => (
                <RevealItem key={benefit.title} variants={fadeUp} as="li" className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <benefit.icon aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display text-base font-bold text-ink-900">
                      {benefit.title}
                    </span>
                    <span className="mt-1 block text-[0.9rem] leading-relaxed text-ink-500">
                      {benefit.body}
                    </span>
                  </span>
                </RevealItem>
              ))}
            </ScrollReveal>

            <div className="mt-10">
              <CTAButton href="/contact">Talk to someone who farms</CTAButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
