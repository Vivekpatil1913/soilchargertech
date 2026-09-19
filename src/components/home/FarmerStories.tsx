"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, User } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EASE_OUT_SOFT } from "@/lib/animations";

/**
 * FARMER STORIES
 * ==============
 * The carousel, layout and motion are production-ready. The content currently
 * shown is illustrative demo copy with stock photography — see the header of
 * src/data/testimonials.ts.
 *
 * A farmer testimonial is the single most persuasive thing this site can carry
 * and the single worst thing to get wrong, so these entries must be swapped for
 * real stories with the farmer's written consent before launch. Replace the
 * entries in src/data/testimonials.ts and this section ships unchanged.
 */

export function FarmerStories() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const count = testimonials.length;

  const paginate = useCallback(
    (step: number) => setState(([i]) => [(i + step + count) % count, step]),
    [count],
  );

  const story = testimonials[index];

  return (
    <section
      aria-labelledby="stories-heading"
      className="section-y relative overflow-hidden bg-cream-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 size-[30rem] bloom bg-brand-200/40"
      />

      <Container width="wide" className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="From the field"
            title={
              <>
                Farmer <span className="text-brand-600">stories.</span>
              </>
            }
            lead="The part of this website that has to be earned rather than written. Farmers SCT has worked with, in their own words — what their soil was like before, and what changed."
            className="max-w-2xl"
          />

          {/* Controls: large enough for a gloved thumb */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous story"
              className="group grid size-12 place-items-center rounded-full border border-hairline bg-white text-ink-600 transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              <ArrowLeft
                aria-hidden
                className="size-5 transition-transform duration-300 motion-safe:group-hover:-translate-x-0.5"
              />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next story"
              className="group grid size-12 place-items-center rounded-full border border-hairline bg-white text-ink-600 transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              <ArrowRight
                aria-hidden
                className="size-5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        {/* ---- The story ---------------------------------------------------- */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="relative mt-10 min-h-[26rem] sm:min-h-[22rem] lg:mt-12"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={story.id}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 48 : -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -48 : 48 }}
              transition={{ duration: 0.42, ease: EASE_OUT_SOFT }}
              className="grid gap-8 overflow-hidden rounded-2xl border border-hairline bg-white p-6 shadow-soft sm:p-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-12"
            >
              {/* Farmer identity */}
              <div className="flex flex-row items-center gap-5 lg:flex-col lg:items-start">
                <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl border border-hairline bg-cream-100 text-ink-400 sm:size-24 lg:size-32">
                  {story.image ? (
                    <Image
                      src={story.image}
                      alt={story.imageAlt ?? `${story.name}, ${story.crop} farmer in ${story.location}`}
                      fill
                      sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 128px"
                      className="object-cover"
                    />
                  ) : (
                    <User aria-hidden className="size-8 lg:size-10" />
                  )}
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-ink-900">{story.name}</p>
                  <p className="mt-1 text-[0.85rem] text-ink-500">{story.location}</p>
                  <p className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-[0.75rem] font-semibold text-brand-700">
                    {story.crop}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="flex flex-col justify-center">
                <Quote aria-hidden className="size-8 text-brand-200" />
                <blockquote className="mt-4">
                  <p className="font-display text-xl font-semibold leading-relaxed text-ink-800 sm:text-2xl">
                    {story.quote}
                  </p>
                </blockquote>
                <p className="mt-6 flex flex-wrap items-center gap-2 text-[0.85rem]">
                  <span className="font-semibold text-ink-600">Result:</span>
                  <span className="text-ink-500">{story.result}</span>
                </p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* ---- Pagination ---------------------------------------------------- */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <p className="text-[0.82rem] text-ink-400">
            {index + 1} / {count}
          </p>
        </div>
      </Container>
    </section>
  );
}
