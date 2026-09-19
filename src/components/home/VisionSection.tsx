"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { images } from "@/data/images";
import { vision } from "@/data/site";
import { Container } from "@/components/common/Container";
import { EASE_OUT_SOFT, fadeUp, staggerParent, viewportOnce } from "@/lib/animations";

/**
 * VISION
 * ======
 * SCT's four published vision statements, given the weight they deserve: one
 * per line, large, numbered, over a wide landscape.
 *
 * This is the emotional centre of the page and the only place the typography is
 * allowed to get big without a paragraph underneath it. The photograph sits far
 * back behind a heavy scrim so contrast holds comfortably past WCAG AA.
 */
export function VisionSection() {
  return (
    <section
      aria-labelledby="vision-heading"
      className="relative overflow-hidden bg-earth-900 text-cream-100"
    >
      {/* Background photograph, pushed well back */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src={images.hero.sunset.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-earth-900/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900 via-earth-900/70 to-earth-900/92" />
        <div className="absolute inset-0 grain-layer opacity-[0.3]" />
      </div>

      <Container width="wide" className="relative">
        <div className="py-20 sm:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerParent(0.1)}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-eyebrow text-saffron-300">
              Our vision for Indian agriculture
            </motion.p>

            <motion.h2 id="vision-heading" variants={fadeUp} className="text-h1 mt-6 text-white">
              Agriculture should not only produce more.{" "}
              <span className="text-saffron-300">It should produce better.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lead mt-6 text-cream-200/70">
              While protecting the soil, the water, the crop and the generation that inherits all
              three.
            </motion.p>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerParent(0.14, 0.2)}
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20"
          >
            {vision.map((line, i) => (
              <motion.li
                key={line}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_SOFT } },
                }}
                className="group relative bg-earth-900/80 p-7 backdrop-blur-sm transition-colors duration-500 hover:bg-earth-800/80 sm:p-9"
              >
                <span className="font-display text-sm font-extrabold tracking-widest text-saffron-300/70">
                  0{i + 1}
                </span>
                <p className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                  {line}
                </p>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-saffron-400 transition-[width] duration-700 [transition-timing-function:var(--ease-out-soft)] group-hover:w-full"
                />
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
