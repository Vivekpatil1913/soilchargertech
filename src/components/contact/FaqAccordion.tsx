"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { EASE_OUT_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion. Single-open, animated height, and every trigger is a real
 * button with aria-expanded and aria-controls so it is fully operable from the
 * keyboard and announced correctly by screen readers.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-white">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <li key={faq.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-cream-50 sm:px-6"
              >
                <span
                  className={cn(
                    "font-display text-[1.02rem] font-bold leading-snug transition-colors",
                    isOpen ? "text-brand-700" : "text-ink-900",
                  )}
                >
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full transition-[background-color,transform,color] duration-300 [transition-timing-function:var(--ease-out-soft)]",
                    isOpen ? "rotate-45 bg-brand-600 text-white" : "bg-cream-200 text-ink-600",
                  )}
                >
                  <Plus aria-hidden className="size-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`faq-panel-${i}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: EASE_OUT_SOFT }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-[0.94rem] leading-relaxed text-ink-500 sm:px-6 sm:pr-16">
                    {faq.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
