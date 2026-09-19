"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Honours the visitor's OS-level motion preference across every Framer Motion
 * animation on the site. With `reducedMotion="user"`, transform and layout
 * animations are dropped while opacity still fades — so a reduced-motion
 * visitor gets a calm page, never a blank one waiting on an animation that
 * will not run.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
