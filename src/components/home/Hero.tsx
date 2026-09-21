import { motion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, Sprout } from "lucide-react";

import { Shell } from "@/components/ui";
import { images } from "@/data/images";
import { contact, site } from "@/data/site";
import { telHref } from "@/lib/utils";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * HERO
 * ====
 * The masked line reveal from docs/design-reference-sumago.md §3.3: each
 * headline line is its own `overflow-hidden` window with the text parked below
 * it, sliding up on mount. Two elements per line, no library beyond the
 * transform.
 *
 * The last phrase carries `text-shine`, the gradient sweep from
 * docs/design-reference-scope.md §3.1, re-hued from SCOPE's red to the logo's
 * green. Once on the page and nowhere else.
 *
 * WHAT THE COPY HAS TO DO
 * -----------------------
 * A farmer scanning for three seconds must leave knowing what is sold. So the
 * headline names the category outright — organic soil inputs — instead of
 * describing a feeling, and the strip beneath the buttons carries the four
 * facts that answer "are these people real": years, range size, certification,
 * place.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const PROOF = [
  { value: `${new Date().getFullYear() - site.founded}+`, label: "years on soil" },
  { value: "21", label: "products" },
  { value: "ISO", label: "9001 certified" },
  { value: "Nashik", label: "Maharashtra" },
];

const CHAIN = ["Healthy soil", "Healthy crop", "Healthy farmer"];

/** One headline line, revealed from behind its own mask. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.14em]">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="ground-forest">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 fx-mesh" />
        <div className="absolute inset-0 fx-streaks opacity-70" />
        <div className="absolute inset-0 fx-dots opacity-60" />
        <div className="bloom bloom-a absolute -left-44 -top-36 size-[38rem] bg-brand-500/25" />
        <div className="bloom bloom-b absolute -bottom-48 -right-32 size-[32rem] bg-saffron-500/15" />
      </div>

      <Shell
        size="wide"
        className="relative grid items-center gap-12 pb-20 pt-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-24"
      >
        {/* ---- Copy ------------------------------------------------------ */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[0.8rem] font-semibold text-sage-200 backdrop-blur"
          >
            <Sprout aria-hidden className="size-4 text-leaf-400" />
            Organic soil inputs · Nashik · since {site.founded}
          </motion.p>

          <h1 id="hero-heading" className="text-display mt-7 text-white">
            <Line delay={0.12}>Feed the soil.</Line>
            <Line delay={0.25}>
              The crop <span className="text-shine">follows.</span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44, ease: EASE }}
            className="text-lead mt-7 max-w-xl text-sage-200/90"
          >
            Twenty-one organic inputs that rebuild organic carbon, wake the life back up in your
            soil and feed the crop naturally — no chemical fertiliser, no chemical crop protection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.54, ease: EASE }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/products"
              className="shadow-brand-glow inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-600 px-7 py-4 text-[0.95rem] font-bold text-white transition-all duration-300 hover:bg-brand-500 motion-safe:hover:-translate-y-0.5"
            >
              See the 21 products
              <ArrowRight aria-hidden className="size-4" />
            </Link>

            <a
              href={telHref(contact.phones[0])}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-[0.95rem] font-semibold text-white backdrop-blur transition-colors duration-300 hover:bg-white/20"
            >
              <Phone aria-hidden className="size-4" />
              Talk to an expert
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.72 }}
            className="mt-11 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-4 sm:gap-x-4"
          >
            {PROOF.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-[1.65rem] font-extrabold leading-none text-leaf-400">
                  {item.value}
                </dt>
                <dd className="mt-1.5 text-[0.78rem] leading-tight text-sage-300/75">
                  {item.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---- Picture --------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.26, ease: EASE }}
          className="relative"
        >
          <div className="shadow-dark relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 lg:aspect-[8/9]">
            <Image
              src={images.hero.main.src}
              alt={images.hero.main.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#05150c] via-[#05150c]/70 to-transparent"
            />

            {/* The whole proposition, legible from across a room. */}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
              <p className="text-eyebrow text-leaf-400">The chain</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.85rem] font-semibold text-white">
                {CHAIN.map((step, index) => (
                  <span key={step} className="inline-flex items-center gap-2">
                    <span
                      className={
                        index === CHAIN.length - 1
                          ? "rounded-full bg-leaf-500/25 px-3 py-1.5 text-leaf-200"
                          : "rounded-full bg-white/10 px-3 py-1.5"
                      }
                    >
                      {step}
                    </span>
                    {index < CHAIN.length - 1 ? (
                      <ArrowRight aria-hidden className="size-3.5 shrink-0 text-sage-400" />
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certification, floated off the corner so it reads as a seal. */}
          <div className="absolute -left-3 top-6 hidden items-center gap-2.5 rounded-full border border-white/15 bg-black/50 px-4 py-2.5 backdrop-blur-md sm:flex">
            <ShieldCheck aria-hidden className="size-4 text-leaf-400" />
            <span className="text-[0.8rem] font-bold text-white">ISO 9001 certified</span>
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}
