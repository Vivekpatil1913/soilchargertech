"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Ban,
  BookOpen,
  ClipboardList,
  HeartPulse,
  Layers,
  Pause,
  Play,
  Recycle,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { steps, type SaptapadiIcon } from "@/data/saptapadi";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EASE_OUT_SOFT, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * SCT SAPTAPADI — seven steps
 * ===========================
 * Saptapadi means seven steps, so the interaction is a ring rather than a list:
 * a season is a cycle that comes back round, not a queue that ends.
 *
 * Each node carries an icon for the idea plus a small number for its place in
 * the sequence. The icon is what a farmer reads at a glance; the number is what
 * keeps "seven steps, in order" legible. Neither alone does both jobs.
 *
 * Content note: SCT has published that Saptapadi exists, when it was introduced
 * and what it is for, but not the wording of the seven individual steps. We have
 * not invented them. The ring is filled with SCT's own four pillars and three
 * principles — which number seven — and the section says so in plain sight. See
 * src/data/saptapadi.ts.
 *
 * Accessibility: an ARIA tablist (arrow keys, Home, End). The ring advances on
 * its own every 5s, and per WCAG 2.2.2 that motion can always be stopped — it
 * pauses on hover, on keyboard focus, when scrolled out of view, when the tab is
 * hidden, and via an explicit pause button. It never starts at all for a visitor
 * who prefers reduced motion.
 */

const RADIUS = 42; // % of the ring container
const ADVANCE_MS = 5000;

const ICONS: Record<SaptapadiIcon, LucideIcon> = {
  nourishment: HeartPulse,
  soil: Layers,
  humus: Recycle,
  leafRoot: Sprout,
  method: ClipboardList,
  rule: Ban,
  study: BookOpen,
};

export function SaptapadiSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const ringRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();
  const inView = useInView(ringRef, { amount: 0.35 });

  /* Autoplay runs only when it is actually wanted: the section is on screen,
     nobody is interacting with it, and motion has not been turned down. */
  const autoplay = !reduceMotion && !paused && !hovering && inView;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % steps.length),
      ADVANCE_MS,
    );
    return () => window.clearInterval(id);
    /* `active` is a dependency on purpose: selecting a step restarts the timer
       so the ring does not jump away a moment after someone clicks. */
  }, [autoplay, active]);

  /* A hidden tab should not keep cycling in the background. */
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) setHovering(true);
      else setHovering(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const focusStep = useCallback((index: number) => {
    const next = (index + steps.length) % steps.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  }, []);

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
  const CurrentIcon = ICONS[current.icon];

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

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          {/* ---- The ring ---------------------------------------------------- */}
          <motion.div
            ref={ringRef}
            initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE_OUT_SOFT }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
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

            {/* Centre: the current step's icon sits here too, so the eye has
                somewhere to land while the ring rotates. */}
            <div className="absolute inset-[18%] grid place-items-center rounded-full p-6 text-center">
              <div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.index}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.25, ease: EASE_OUT_SOFT }}
                    className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-brand-50 text-brand-700"
                  >
                    <CurrentIcon aria-hidden className="size-5" />
                  </motion.span>
                </AnimatePresence>

                <p className="notranslate font-display text-2xl font-extrabold tracking-tight text-brand-700 sm:text-3xl">
                  सप्तपदी
                </p>
                <p className="text-eyebrow mt-1.5 text-ink-400">Saptapadi</p>
                <p className="mt-2.5 text-[0.76rem] leading-snug text-ink-500">
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
              onFocus={() => setHovering(true)}
              onBlur={() => setHovering(false)}
              className="absolute inset-0"
            >
              {steps.map((step, i) => {
                const angle = (-90 + i * (360 / steps.length)) * (Math.PI / 180);
                const left = 50 + RADIUS * Math.cos(angle);
                const top = 50 + RADIUS * Math.sin(angle);
                const isActive = i === active;
                const Icon = ICONS[step.icon];

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
                      "absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 transition-[background-color,border-color,color,box-shadow,transform] duration-300 [transition-timing-function:var(--ease-out-soft)] sm:size-14",
                      isActive
                        ? "scale-110 border-brand-600 bg-brand-600 text-white shadow-lift"
                        : step.kind === "pillar"
                          ? "border-brand-200 bg-white text-brand-700 hover:border-brand-400 hover:shadow-soft"
                          : "border-saffron-200 bg-white text-saffron-700 hover:border-saffron-400 hover:shadow-soft",
                    )}
                  >
                    <Icon aria-hidden className="size-5 sm:size-[1.35rem]" />

                    {/* Sequence marker — small, so the icon stays the headline */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -right-1 -top-1 grid size-[1.15rem] place-items-center rounded-full font-display text-[0.62rem] font-extrabold ring-2 ring-cream-100 transition-colors duration-300",
                        isActive
                          ? "bg-white text-brand-700"
                          : step.kind === "pillar"
                            ? "bg-brand-600 text-white"
                            : "bg-saffron-500 text-white",
                      )}
                    >
                      {step.index}
                    </span>

                    <span className="sr-only">{`Step ${step.index}: ${step.title}`}</span>
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
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold tracking-wide",
                        current.kind === "pillar"
                          ? "bg-brand-50 text-brand-700"
                          : "bg-saffron-50 text-saffron-700",
                      )}
                    >
                      <CurrentIcon aria-hidden className="size-3.5" />
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

            {/* Pause control */}
            <div className="mt-5 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                aria-label={paused ? "Resume automatic rotation" : "Pause automatic rotation"}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-hairline bg-white text-ink-500 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {paused ? (
                  <Play aria-hidden className="size-4" />
                ) : (
                  <Pause aria-hidden className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
