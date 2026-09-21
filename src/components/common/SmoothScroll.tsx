import { useEffect } from "react";

/**
 * Lenis smooth scrolling, loaded only in the browser and only when the visitor
 * has not asked for reduced motion. Imported dynamically so the library stays
 * out of the initial bundle — it matters on a rural mobile connection.
 *
 * The instance is kept at module scope as well, because an overlay that locks
 * the page has to stop Lenis to do it: Lenis scrolls the page itself, so
 * `overflow: hidden` on <body> does not reach it. See src/lib/scroll-lock.ts.
 */

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  stop: () => void;
  start: () => void;
};

let instance: LenisInstance | null = null;

/** No-op when Lenis never loaded — reduced motion, or still in flight. */
export function pauseSmoothScroll(): void {
  instance?.stop();
}

export function resumeSmoothScroll(): void {
  instance?.start();
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      instance = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1.6,
      }) as unknown as LenisInstance;

      const raf = (time: number) => {
        instance?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      instance?.destroy();
      instance = null;
    };
  }, []);

  return null;
}
