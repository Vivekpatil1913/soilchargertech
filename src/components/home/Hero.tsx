"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, ShieldCheck, Sprout } from "lucide-react";
import { images } from "@/data/images";
import { stats } from "@/data/site";
import { EASE_OUT_SOFT, staggerParent, wordReveal } from "@/lib/animations";
import { Container } from "@/components/common/Container";
import { CTAButton } from "@/components/common/CTAButton";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { cn } from "@/lib/utils";

/**
 * HERO
 * ====
 * The headline is the whole proposition in three moves — soil, crop, farmer —
 * and the composition mirrors it: a working farmer in a Maharashtra field, with
 * the soil-to-prosperity chain surfaced as a small card over the photograph so
 * the idea lands before a visitor reads a single paragraph.
 *
 * Motion is deliberately restrained here: words rise once on load, the
 * photograph drifts fractionally on scroll, and that is all. A hero that keeps
 * moving is a hero nobody reads.
 */

const HEADLINE = [
  { text: "Reviving", tone: "ink" },
  { text: "soil.", tone: "earth" },
  { text: "Nourishing", tone: "ink" },
  { text: "crops.", tone: "brand" },
  { text: "Empowering", tone: "ink" },
  { text: "farmers.", tone: "saffron" },
] as const;

const toneClass = {
  ink: "text-ink-900",
  brand: "text-brand-600",
  earth: "text-earth-700",
  saffron: "text-saffron-500",
} as const;

const CHAIN = [
  { icon: Sprout, label: "Healthy soil" },
  { icon: Leaf, label: "Healthy crops" },
  { icon: ShieldCheck, label: "Healthy farmers" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* A few pixels of drift — enough to feel alive, not enough to distract. */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-16 pt-[7.5rem] sm:pb-20 lg:pb-24 lg:pt-[9rem]"
    >
      {/* ---- Ambient ground ------------------------------------------------ */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-100" />
        <div className="absolute -right-24 -top-24 size-[36rem] bloom bg-brand-300/45" />
        <div className="absolute -left-40 top-1/3 size-[28rem] bloom bg-saffron-200/55" />
        <div className="absolute inset-0 grain-layer opacity-[0.55]" />
      </div>

      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-14 xl:gap-20">
          {/* ================= Copy ========================================= */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white/70 py-1.5 pl-1.5 pr-4 backdrop-blur"
            >
              <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-white">
                SINCE 2015
              </span>
              <span className="text-[0.8rem] font-medium text-ink-600">
                Soil is healthier, farmer wealthier
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={staggerParent(0.085, 0.22)}
              initial="hidden"
              animate="visible"
              /* Flex-wrap, not inline flow: the words are adjacent elements
                 with no whitespace between them, so an inline layout would
                 have no break opportunity and the headline would run off the
                 side of small screens. Flex gives every word its own wrap
                 point, and gap-x replaces the word space. */
              className="text-display mt-7 flex max-w-[19ch] flex-wrap gap-x-[0.26em]"
            >
              {HEADLINE.map((word) => (
                <span key={word.text} className="inline-block overflow-hidden pb-[0.08em]">
                  <motion.span
                    variants={wordReveal}
                    className={cn("inline-block", toneClass[word.tone])}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.72 }}
              className="text-lead mt-7 max-w-xl text-ink-500"
            >
              Science-led agricultural solutions for healthier soil, more nutritious crops and a
              more prosperous farming future — built on organic carbon, soil biology and a decade
              of work alongside Indian farmers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.84 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <CTAButton href="/technology" size="lg">
                Explore our technology
              </CTAButton>
              <CTAButton href="/contact" variant="secondary" size="lg">
                Talk to an expert
              </CTAButton>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.82rem] text-ink-400"
            >
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
                ISO 9001:2008 certified
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-saffron-400" />
                Based in Nashik, Maharashtra
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-earth-400" />
                Guidance in Marathi & Hindi
              </li>
            </motion.ul>
          </div>

          {/* ================= Composition ================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.25 }}
            className="relative"
          >
            {/* Main photograph, in an organic asymmetric mask */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[7rem] bg-cream-200 shadow-lift sm:aspect-[5/5] lg:aspect-[4/4.6]">
              <motion.div style={{ y: imageY }} className="absolute -inset-y-[6%] inset-x-0">
                <Image
                  src={images.hero.main.src}
                  alt={images.hero.main.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Warm scrim so the overlay card always has contrast beneath it */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/5 to-transparent"
              />
            </div>

            {/* Soil → crop → farmer, stated on the image */}
            <motion.div
              style={{ y: overlayY }}
              className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6"
            >
              <div className="rounded-2xl border border-white/25 bg-white/85 p-4 shadow-lift backdrop-blur-md sm:p-5">
                <p className="text-eyebrow text-brand-700">The chain we work on</p>
                <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {CHAIN.map((link, i) => (
                    <li key={link.label} className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1.5 text-[0.78rem] font-semibold text-brand-800 sm:text-[0.82rem]">
                        <link.icon aria-hidden className="size-3.5 text-brand-600" />
                        {link.label}
                      </span>
                      {i < CHAIN.length - 1 ? (
                        <span aria-hidden className="text-sm text-brand-400">
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>

            {/* Small floating leaf accent, purely decorative */}
            <div
              aria-hidden
              className="absolute -left-4 top-10 hidden size-16 place-items-center rounded-2xl border border-brand-100 bg-white shadow-soft motion-safe:animate-drift sm:grid lg:-left-7"
            >
              <Leaf className="size-7 text-brand-500" />
            </div>
          </motion.div>
        </div>

        {/* ================= Figures ======================================== */}
        <motion.dl
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_SOFT, delay: 1.05 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:mt-20 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="bg-cream-50/80 p-5 backdrop-blur sm:p-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-3xl font-extrabold tracking-tight text-brand-700 sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    grouped={stat.id !== "since"}
                    placeholder="—"
                  />
                </span>
                <span className="mt-2 block text-[0.88rem] font-semibold text-ink-700">
                  {stat.label}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[0.78rem] leading-snug",
                    stat.verified ? "text-ink-400" : "text-saffron-600",
                  )}
                >
                  {stat.caption}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
