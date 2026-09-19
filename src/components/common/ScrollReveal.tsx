"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/animations";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variants?: Variants;
  delay?: number;
  /** Stagger direct children instead of animating this element itself. */
  stagger?: number;
};

const MotionTag = motion.create as unknown as <T extends ElementType>(c: T) => ElementType;

/**
 * Wraps any block in the site's standard "reveal once on scroll" behaviour.
 *
 * Framer Motion respects `prefers-reduced-motion` through MotionConfig in the
 * root layout, so reduced-motion users get the content without the travel
 * rather than an empty section.
 */
export function ScrollReveal({
  children,
  className,
  as = "div",
  variants,
  delay = 0,
  stagger,
}: ScrollRevealProps) {
  const Tag = MotionTag(as);
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger ? staggerParent(stagger, delay) : (variants ?? fadeUp)}
      transition={delay && !stagger ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

/** A direct child of a staggering <ScrollReveal stagger={...} />. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: ElementType;
}) {
  const Tag = MotionTag(as);
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}
