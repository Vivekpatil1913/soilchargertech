"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PENDING_NOTE, steps } from "@/data/saptapadi";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PlaceholderNote } from "@/components/common/Badge";
import { EASE_OUT_SOFT, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * SCT SAPTAPADI — seven steps
 * ===========================
 * Saptapadi means seven steps, so the interaction is a ring rather than a list:
 * a season is a cycle that comes back round, not a queue that ends.
 *
 * Content note: SCT has published that Saptapadi exists, when it was introduced
 * and what it is for, but not the wording of the seven individual steps. We have
 * not invented them. The ring is filled with SCT's own four pillars and three
 * principles — which number seven — and the section says so in plain sight. See
 * src/data/saptapadi.ts.
 *
 * Accessibility: an ARIA tablist. Arrow keys move between steps, Home and End
 * jump to the first and last, and the panel is wired with aria-controls.
 */

const RADIUS = 42; // % of the ring container

export function SaptapadiSection() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const focusStep = (index: number) => {
    const next = (index + steps.length) % steps.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusStep(active + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusStep(active - 1);
        break;
      case "Home":
        e.preventDefault();
        focusStep(0);
        break;
      case "End":
        e.preventDefault();
        focusStep(steps.length - 1);
        break;
    }
  };

  const current = steps[active];

  return (
    <section
      id="saptapadi"
      aria-labelledby="saptapadi-heading"
      className="section-y relative overflow-hidden bg-cream-100"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 size-[32rem] bloom bg-saffron-200/45"
      />

      <Container width="wide" className="relative">
        <SectionHeading
          eyebrow="Introduced in 2021"
          tone="saffron"
          title={
            <>
              SCT Saptapadi — <span className="text-saffron-600">seven steps</span>, one season.
            </>
          }
          lead="Thousands of farmers showed, from their own fields, that nutrition plays a real part in protecting a crop. Saptapadi came out of that — and out of studying where crop management goes wrong — as a way to think about the whole season instead of a single spray."
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          {/* ---- The ring ---------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE_OUT_SOFT }}
            className="relative mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[27rem]"
          >
            {/* Ring track */}
            <div
              aria-hidden
              className="absolute inset-[8%] rounded-full border-2 border-dashed border-brand-200"
            />
            <div
              aria-hidden
              className="absolute inset-[18%] rounded-full bg-gradient-to-br from-white to-brand-50 shadow-soft"
            />

            {/* Centre */}
            <div className="absolute inset-[18%] grid place-items-center rounded-full p-6 text-center">
              <div>
                <p className="notranslate font-display text-2xl font-extrabold tracking-tight text-brand-700 sm:text-3xl">
                  सप्तपदी
                </p>
                <p className="text-eyebrow mt-2 text-ink-400">Saptapadi</p>
                <p className="mt-3 text-[0.78rem] leading-snug text-ink-500">
                  Seven steps through
                  <br />
                  one crop season
                </p>
              </div>
            </div>

            {/* Nodes */}
            <div
              role="tablist"
              aria-label="The seven steps of SCT Saptapadi"
              aria-orientation="horizontal"
              onKeyDown={onKeyDown}
              className="absolute inset-0"
            >
              {steps.map((step, i) => {
                const angle = (-90 + i * (360 / steps.length)) * (Math.PI / 180);
                const left = 50 + RADIUS * Math.cos(angle);
                const top = 50 + RADIUS * Math.sin(angle);
                const isActive = i === active;

                return (
                  <motion.button
                    key={step.index}
                    ref={(el) => {
                      tabsRef.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`saptapadi-tab-${step.index}`}
                    aria-selected={isActive}
                    aria-controls="saptapadi-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.45, ease: EASE_OUT_SOFT, delay: 0.3 + i * 0.07 }}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className={cn(
                      "absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 font-display text-sm font-extrabold transition-[background-color,border-color,color,box-shadow,transform] duration-300 [transition-timing-function:var(--ease-out-soft)] sm:size-14 sm:text-base",
                      isActive
                        ? "scale-110 border-brand-600 bg-brand-600 text-white shadow-lift"
                        : step.kind === "pillar"
                          ? "border-brand-200 bg-white text-brand-700 hover:border-brand-400 hover:shadow-soft"
                          : "border-saffron-200 bg-white text-saffron-700 hover:border-saffron-400 hover:shadow-soft",
                    )}
                  >
                    <span className="sr-only">{`Step ${step.index}: `}</span>
                    {step.index}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ---- The active step ---------------------------------------------- */}
          <div>
            <div
              id="saptapadi-panel"
              role="tabpanel"
              aria-labelledby={`saptapadi-tab-${current.index}`}
              tabIndex={0}
              className="min-h-[15rem] rounded-2xl border border-hairline bg-white p-6 shadow-soft sm:min-h-[16rem] sm:p-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_SOFT }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[0.7rem] font-bold tracking-wide",
                        current.kind === "pillar"
                          ? "bg-brand-50 text-brand-700"
                          : "bg-saffron-50 text-saffron-700",
                      )}
                    >
                      {current.kind === "pillar" ? "WORKING PILLAR" : "PRINCIPLE"}
                    </span>
                    <span className="text-[0.78rem] font-medium text-ink-400">
                      Step {current.index} of {steps.length}
                    </span>
                  </div>

                  <h3 className="text-h3 mt-5 text-ink-900">{current.title}</h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-500">{current.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress pips double as a second, linear way in */}
            <div className="mt-5 flex items-center gap-2">
              {steps.map((step, i) => (
                <button
                  key={step.index}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to step ${step.index}`}
                  /* The visible pip is 6px, but the button itself is a
                     44px-tall tap target — thumb-sized, as the rest of the
                     mobile UI is. */
                  className="group/pip flex h-11 items-center px-0.5"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-400 [transition-timing-function:var(--ease-out-soft)]",
                      i === active
                        ? "w-10 bg-brand-600"
                        : "w-5 bg-cream-300 group-hover/pip:bg-brand-300",
                    )}
                  />
                </button>
              ))}
            </div>

            <PlaceholderNote>{PENDING_NOTE}</PlaceholderNote>
          </div>
        </div>
      </Container>
    </section>
  );
}
