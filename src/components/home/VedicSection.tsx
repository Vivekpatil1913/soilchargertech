"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { images } from "@/data/images";
import { productRanges } from "@/data/products";
import { Container } from "@/components/common/Container";
import { CTAButton } from "@/components/common/CTAButton";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { EASE_OUT_SOFT, fadeUp, slideInRight, viewportOnce } from "@/lib/animations";

/**
 * SCT VEDIC
 * =========
 * The one deep band in the body of the page. The site is bright throughout, so
 * dropping into brand green here does the work a heading size cannot: it marks
 * SCT Vedic as the centre of the story rather than one more section.
 *
 * Figures shown are the two we can source — roughly ten years of research, and
 * the count of products in the range. Nothing about outcomes is claimed.
 */

const FACTS = [
  { value: 10, suffix: "+", label: "Years of research", grouped: false },
  { value: 13, suffix: null, label: "Products in the range", grouped: false },
  { value: 2015, suffix: null, label: "Foundation laid", grouped: false },
] as const;

export function VedicSection() {
  return (
    <section
      id="vedic"
      aria-labelledby="vedic-heading"
      className="relative overflow-hidden bg-brand-950 text-cream-100"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 size-[38rem] bloom bg-brand-700/45" />
        <div className="absolute -bottom-40 right-0 size-[32rem] bloom bg-saffron-700/25" />
        <div className="absolute inset-0 grain-layer opacity-[0.35]" />
      </div>

      <Container width="wide" className="relative">
        <div className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 lg:py-32">
          {/* ---- Copy ------------------------------------------------------- */}
          <div>
            <ScrollReveal stagger={0.09}>
              <RevealItem variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-leaf-400/30 bg-leaf-400/10 px-4 py-1.5 text-[0.72rem] font-bold tracking-[0.14em] text-leaf-300">
                  SCT VEDIC TECHNOLOGY
                </span>
              </RevealItem>

              <RevealItem variants={fadeUp}>
                <h2 id="vedic-heading" className="text-h1 mt-6 text-white">
                  A new chapter in{" "}
                  <span className="text-leaf-400">sustainable agriculture.</span>
                </h2>
              </RevealItem>

              <RevealItem variants={fadeUp}>
                <p className="text-lead mt-6 max-w-xl text-cream-200/75">
                  Vedic did not replace what came before it — it grew out of it. Between 2015 and
                  2019, SCT was honest that its solutions alone could not yet meet a crop&apos;s full
                  requirement. Roughly ten years of research later, with Vedic scientists, the SCT
                  team and a great deal of field experience working together, that gap became
                  Vedic Technology.
                </p>
              </RevealItem>

              <RevealItem variants={fadeUp}>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream-200/60">
                  {productRanges.vedic.description}
                </p>
              </RevealItem>
            </ScrollReveal>

            {/* ---- Figures ---------------------------------------------------- */}
            <motion.dl
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="mt-12 grid grid-cols-3 gap-4 border-y border-white/10 py-7"
            >
              {FACTS.map((fact) => (
                <motion.div key={fact.label} variants={fadeUp}>
                  <dd className="font-display text-3xl font-extrabold tracking-tight text-leaf-400 sm:text-4xl">
                    <AnimatedCounter
                      value={fact.value}
                      suffix={fact.suffix ?? ""}
                      grouped={fact.grouped}
                    />
                  </dd>
                  <dt className="mt-2 text-[0.8rem] leading-snug text-cream-200/60">
                    {fact.label}
                  </dt>
                </motion.div>
              ))}
            </motion.dl>

            <ScrollReveal className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/technology#vedic" variant="onDark" size="lg">
                Explore Vedic Technology
              </CTAButton>
              <CTAButton
                href="/products?range=vedic"
                variant="onDark"
                size="lg"
                className="border-transparent bg-transparent hover:border-white/30"
              >
                See the Vedic range
              </CTAButton>
            </ScrollReveal>
          </div>

          {/* ---- Composition ------------------------------------------------- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={slideInRight}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-bl-[6rem] shadow-lift sm:aspect-[5/5] lg:aspect-[4/4.7]">
              <Image
                src={images.farmers.woman.src}
                alt={images.farmers.woman.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/10 to-transparent"
              />
            </div>

            {/* Microscope detail, overlapping — the science beside the farmer */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.25 }}
              className="absolute -bottom-6 -left-4 w-40 overflow-hidden rounded-xl border-4 border-brand-950 shadow-lift sm:-left-8 sm:w-52"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={images.soil.mycorrhiza.src}
                  alt={images.soil.mycorrhiza.alt}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <p className="bg-white px-3 py-2 text-[0.7rem] font-semibold leading-tight text-ink-700">
                Mycorrhiza inside root tissue
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
