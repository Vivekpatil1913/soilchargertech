"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EASE_OUT_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * THE CHALLENGE
 * =============
 * Soil degradation is invisible, which is exactly why it gets ignored — so this
 * section makes it visible. A cross-section of the ground stays pinned on one
 * side while the four layers are read on the other; the layer being read lights
 * up, and the whole profile warms from depleted grey-brown to living earth as
 * the reader moves down the section.
 *
 * The pinning is plain `position: sticky` inside the section — no scroll
 * listener moves the visual, so it releases naturally where the section ends
 * rather than floating over what comes next. Below `lg` the grid unstacks into
 * ordinary vertical flow with the profile first and nothing pinned.
 *
 * The transition is the argument: nothing here is a claim about a product, only
 * a picture of what organic carbon does to ground.
 */

type Layer = {
  id: string;
  depth: string;
  title: string;
  degraded: string;
  restored: string;
  /** Share of the cross-section's height. */
  weight: number;
  /** Fills for this band of the profile, before and after restoration. */
  fillDepleted: string;
  fillRestored: string;
};

const LAYERS: Layer[] = [
  {
    id: "surface",
    depth: "0–5 cm",
    title: "The surface",
    degraded:
      "Crusted and compacted. Rain runs off instead of soaking in, and the topsoil that should hold the season leaves with it.",
    restored:
      "Open and crumbly. Water enters where it falls, and stays for the crop rather than for the drain.",
    weight: 14,
    fillDepleted: "linear-gradient(180deg,#b9ac97,#a4957d)",
    fillRestored: "linear-gradient(180deg,#6b9a52,#557f3f)",
  },
  {
    id: "root",
    depth: "5–30 cm",
    title: "The root zone",
    degraded:
      "Roots hit a hard pan and stop. A shallow root system means a crop that depends on every irrigation and survives no dry spell.",
    restored:
      "Roots travel. They reach deeper moisture and hold the plant through the gaps between waterings.",
    weight: 26,
    fillDepleted: "linear-gradient(180deg,#9c8a72,#8a7761)",
    fillRestored: "linear-gradient(180deg,#7a5c3c,#63472c)",
  },
  {
    id: "microbial",
    depth: "Throughout",
    title: "Microbial life",
    degraded:
      "Years of heavy chemical use thin out the population that should be unlocking nutrients, so more input buys less result.",
    restored:
      "A working population that releases what is already in the soil — nutrition the farmer has already paid for once.",
    weight: 26,
    fillDepleted: "linear-gradient(180deg,#8a7761,#736450)",
    fillRestored: "linear-gradient(180deg,#5c4127,#48321d)",
  },
  {
    id: "carbon",
    depth: "The foundation",
    title: "Organic carbon",
    degraded:
      "The number underneath everything else. When it falls, structure, water-holding and biology fall with it.",
    restored:
      "Rebuild it and the rest follows. This is where SCT started in 2015, and why it came first.",
    weight: 34,
    fillDepleted: "linear-gradient(180deg,#736450,#5b4e3e)",
    fillRestored: "linear-gradient(180deg,#3d2a18,#2a1c0f)",
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 85%"],
  });

  /* Drives the depleted → restored crossfade over the whole section. */
  const healthOpacity = useTransform(scrollYProgress, [0.08, 0.72], [0, 1]);
  const healthLabel = useTransform(scrollYProgress, (v): string =>
    v < 0.4 ? "Depleted soil" : "Restored soil",
  );
  /* Hairline rail under the profile: how far through the four layers we are. */
  const railScale = useTransform(scrollYProgress, [0.04, 0.9], [0.05, 1], {
    clamp: true,
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="problem-heading"
      className="section-y relative overflow-x-clip bg-cream-100"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-20 size-[30rem] bloom bg-earth-200/45"
      />

      <Container width="wide" className="relative">
        <SectionHeading
          eyebrow="The challenge"
          tone="earth"
          title={
            <>
              The future of farming begins{" "}
              <span className="text-earth-700">beneath our feet.</span>
            </>
          }
          lead="After the Green Revolution, the pursuit of yield pushed fertiliser and chemical use past what the crop cycle could absorb. The ground took the cost — and it is still paying it."
          className="max-w-3xl"
        />

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] md:items-start md:gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          {/* ---- Cross-section: sticky inside the section, md and up ------- */}
          <div className="md:sticky md:top-[100px] md:h-fit md:self-start">
            <div className="relative overflow-hidden rounded-2xl border border-hairline bg-white p-3 shadow-soft">
              <div className="relative flex h-[22rem] flex-col overflow-hidden rounded-xl sm:h-[26rem] md:h-[23rem] lg:h-[28rem] xl:h-[31rem]">
                {LAYERS.map((layer, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      aria-label={`Show ${layer.title}`}
                      className="group relative w-full overflow-hidden text-left transition-[flex-grow] duration-600 [transition-timing-function:var(--ease-out-soft)]"
                      style={{ flexGrow: isActive ? layer.weight * 1.45 : layer.weight }}
                    >
                      {/* Depleted state */}
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={{ background: layer.fillDepleted }}
                      />
                      {/* Restored state, revealed as the reader moves down */}
                      <motion.span
                        aria-hidden
                        className="absolute inset-0"
                        style={{ opacity: healthOpacity, background: layer.fillRestored }}
                      />

                      {/* Texture speckle suggesting aggregate and root hair */}
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-30 mix-blend-overlay grain-layer"
                      />

                      {/* The band being read catches a little more light. */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-0 bg-gradient-to-r from-white/15 via-white/5 to-transparent",
                          "transition-opacity duration-500 [transition-timing-function:var(--ease-out-soft)]",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />

                      <span
                        className={cn(
                          "relative flex h-full items-center justify-between gap-3 px-4 transition-opacity duration-300 sm:px-5",
                          isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100",
                        )}
                      >
                        <span className="flex flex-col">
                          <span className="font-display text-sm font-bold text-white drop-shadow-sm sm:text-base">
                            {layer.title}
                          </span>
                          <span className="text-[0.72rem] text-white/70">{layer.depth}</span>
                        </span>
                        <span
                          className={cn(
                            "size-2 shrink-0 rounded-full bg-white transition-opacity duration-300",
                            isActive ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="px-2 pb-1 pt-3.5">
                <div aria-hidden className="h-px w-full overflow-hidden rounded-full bg-cream-300">
                  <motion.span
                    style={{ scaleX: railScale }}
                    className="block h-full w-full origin-left bg-brand-600"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <motion.span className="text-[0.78rem] font-semibold text-ink-600">
                    {healthLabel}
                  </motion.span>
                  <span className="text-[0.72rem] tabular-nums text-ink-400">
                    <span className="hidden sm:inline">Reading </span>
                    {String(active + 1).padStart(2, "0")} / 04
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ---- The four layers, explained -------------------------------- */}
          <ol className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {LAYERS.map((layer, i) => {
              const isActive = i === active;
              return (
                /* The list item only reports which layer sits in the reading
                   band across the middle of the viewport; the article inside
                   owns the one-time reveal, so the two viewport rules never
                   compete for the same element. */
                <motion.li
                  key={layer.id}
                  viewport={{ once: false, margin: "-48% 0px -44% 0px" }}
                  onViewportEnter={() => setActive(i)}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: EASE_OUT_SOFT }}
                    className={cn(
                      "relative flex flex-col justify-center overflow-hidden rounded-xl border p-5 sm:p-6 md:p-5 lg:min-h-[17rem] lg:p-8",
                      "transition-[background-color,border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-out-soft)]",
                      isActive
                        ? "border-brand-200 bg-white shadow-soft"
                        : "border-hairline bg-white/45",
                    )}
                  >
                    {/* Accent edge that grows on the layer being read. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-5 left-0 w-[3px] origin-center rounded-full bg-brand-600",
                        "transition-transform duration-500 [transition-timing-function:var(--ease-out-soft)]",
                        isActive ? "scale-y-100" : "scale-y-0",
                      )}
                    />

                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                      <span
                        className={cn(
                          "font-display text-sm font-extrabold tabular-nums transition-colors duration-500",
                          isActive ? "text-brand-600" : "text-ink-400",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-h3 text-ink-900">{layer.title}</h3>
                      <span className="ml-auto rounded-full border border-hairline px-2.5 py-1 text-[0.68rem] font-medium text-ink-500">
                        {layer.depth}
                      </span>
                    </div>

                    {/* Two panels side by side once the column is wide enough;
                        between md and lg the column is narrow because the
                        profile sits beside it, so they stack instead. */}
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                      <div className="rounded-lg bg-earth-50 p-3.5 sm:p-4">
                        <p className="text-eyebrow text-earth-600">Depleted</p>
                        <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-600">
                          {layer.degraded}
                        </p>
                      </div>
                      <div className="rounded-lg bg-brand-50 p-3.5 sm:p-4">
                        <p className="text-eyebrow text-brand-700">Restored</p>
                        <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-600">
                          {layer.restored}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
