import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion vocabulary.
 *
 * Every section animates from this file so the whole site moves with one
 * personality: a short, soft ease-out with a small vertical offset. Nothing
 * bounces, nothing spins — motion supports the story rather than performing.
 */

export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1] as const;

export const transitions = {
  fast: { duration: 0.28, ease: EASE_OUT_SOFT },
  base: { duration: 0.55, ease: EASE_OUT_SOFT },
  slow: { duration: 0.9, ease: EASE_OUT_SOFT },
} satisfies Record<string, Transition>;

/** Standard viewport trigger: fires once, slightly before the element lands. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.base },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -34 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 34 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
};

/** Parent wrapper that staggers its children. */
export function staggerParent(stagger = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Curtain-style image reveal used by <ImageReveal />. */
export const imageMask: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1, ease: EASE_OUT_SOFT } },
};

/** Word-by-word headline reveal used in the hero. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: { opacity: 1, y: "0em", transition: { duration: 0.75, ease: EASE_OUT_SOFT } },
};
