"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { soilChain, technologies } from "@/data/technologies";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { EASE_OUT_SOFT, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * TECHNOLOGY
 * ==========
 * Two halves. First the chain — soil to organic carbon to microbes to roots to
 * nutrition to crop to the farmer's income — because that single sequence is
 * the whole argument, and a farmer should be able to follow it in one pass
 * without reading a word of the detail below it.
 *
 * Then the detail, as an accordion rather than six open paragraphs: whoever
 * wants the science can open it, and whoever does not is not made to scroll
 * past it.
 */

export function TechnologySection() {
  const [open, setOpen] = useState<string | null>(technologies[0].id);

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="section-y relative overflow-x-clip bg-cream-50"
    >
      <Container width="wide" className="relative">
        <SectionHeading
          eyebrow="The science"
          title={
            <>
              Agriculture powered by <span className="text-brand-600">soil science.</span>
            </>
          }
          lead="None of this is complicated once it is laid out in order. Each link feeds the next — and the whole chain starts underground."
          className="max-w-3xl"
        />

        {/* ---- The chain --------------------------------------------------- */}
        <ScrollReveal
          stagger={0.07}
          className="mt-14 overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white via-brand-50/50 to-cream-100 p-5 shadow-soft sm:p-8 lg:mt-18"
        >
          <ol className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2">
            {soilChain.map((link, i) => (
              <RevealItem
                key={link.label}
                variants={fadeUp}
                as="li"
                className="flex items-center gap-3 lg:flex-1 lg:flex-col lg:items-stretch lg:gap-0"
              >
                <div className="group relative flex flex-1 items-center gap-3.5 rounded-xl border border-brand-100/80 bg-white/85 p-3.5 backdrop-blur transition-[border-color,transform,box-shadow] duration-400 [transition-timing-function:var(--ease-out-soft)] hover:border-brand-300 hover:shadow-soft motion-safe:hover:-translate-y-1 lg:h-full lg:flex-col lg:items-start lg:gap-2 lg:p-4">
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-lg font-display text-[0.8rem] font-extrabold text-white transition-transform duration-400 motion-safe:group-hover:scale-110",
                      i === soilChain.length - 1 ? "bg-saffron-500" : "bg-brand-600",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-[0.95rem] font-bold leading-tight text-ink-900">
                      {link.label}
                    </span>
                    <span className="mt-0.5 text-[0.78rem] leading-snug text-ink-400">
                      {link.note}
                    </span>
                  </span>
                </div>

                {/* Connector: pointing down on mobile, across on desktop */}
                {i < soilChain.length - 1 ? (
                  <span
                    aria-hidden
                    className="ml-4 text-brand-300 lg:ml-0 lg:hidden"
                  >
                    ↓
                  </span>
                ) : null}
              </RevealItem>
            ))}
          </ol>

          <p className="mt-5 text-center text-[0.8rem] text-ink-400">
            Break any link and the ones after it weaken. Repair the first and the rest follow.
          </p>
        </ScrollReveal>

        {/* ---- The detail --------------------------------------------------- */}
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <h3 className="text-h3 text-ink-900">What sits behind each link</h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-500">
              Six ideas SCT works from. Open any one of them — they are written for a farmer, not
              for a laboratory.
            </p>
            <div className="mt-7">
              <CTAButton href="/technology" variant="secondary">
                Full technology overview
              </CTAButton>
            </div>
          </div>

          <ul className="divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-white">
            {technologies.map((tech) => {
              const isOpen = open === tech.id;
              return (
                <li key={tech.id}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : tech.id)}
                      aria-expanded={isOpen}
                      aria-controls={`tech-panel-${tech.id}`}
                      className="group flex w-full items-start justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-cream-50 sm:px-6"
                    >
                      <span className="flex flex-col">
                        <span
                          className={cn(
                            "font-display text-lg font-bold transition-colors",
                            isOpen ? "text-brand-700" : "text-ink-900",
                          )}
                        >
                          {tech.title}
                        </span>
                        <span className="mt-1 text-[0.88rem] text-ink-500">{tech.short}</span>
                      </span>
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "mt-1 size-5 shrink-0 text-ink-400 transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)]",
                          isOpen && "rotate-180 text-brand-600",
                        )}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`tech-panel-${tech.id}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: EASE_OUT_SOFT }}
                        className="overflow-hidden"
                      >
                        <p className="border-l-2 border-brand-300 px-5 pb-6 text-[0.92rem] leading-relaxed text-ink-600 sm:px-6">
                          {tech.body}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
