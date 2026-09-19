"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { formatNumber } from "@/lib/utils";

type AnimatedCounterProps = {
  /** `null` renders `placeholder` instead of counting — used for unverified figures. */
  value: number | null;
  suffix?: string;
  placeholder?: string;
  className?: string;
  /** Years should not be grouped as 2,015. */
  grouped?: boolean;
};

/**
 * Counts up once, when scrolled into view. A `null` value renders the
 * placeholder label instead — we animate only numbers we can stand behind.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  placeholder = "—",
  className,
  grouped = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === null || !inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  if (value === null) {
    return (
      <span ref={ref} className={className} aria-label="Figure to be confirmed">
        {placeholder}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {grouped ? formatNumber(display) : String(display)}
      {suffix}
    </span>
  );
}
