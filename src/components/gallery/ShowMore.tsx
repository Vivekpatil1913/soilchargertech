import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * PROGRESSIVE REVEAL
 * ==================
 * Eight tiles to begin with, then four more per press, and a way back once the
 * whole set is out.
 *
 * Eight is two rows on a laptop and four on a phone — enough to show the
 * gallery is real without turning the section into a wall. Four per press is
 * one desktop row, so each press lands as a visible change rather than as a
 * scroll of new material.
 *
 * The count only ever grows on press, so nothing a visitor has already opened
 * moves underneath them.
 */

export const FIRST_PAGE = 8;
export const PAGE_STEP = 4;

export function useProgressive<T>(all: T[], initial = FIRST_PAGE, step = PAGE_STEP) {
  const [count, setCount] = useState(initial);
  /** The top of the grid, so collapsing does not strand the reader mid-page. */
  const anchorRef = useRef<HTMLDivElement>(null);

  const showMore = useCallback(
    () => setCount((value) => Math.min(value + step, all.length)),
    [all.length, step],
  );

  const showLess = useCallback(() => {
    setCount(initial);

    /* Collapsing removes everything below, so a reader standing at the bottom
       would be thrown down the page. Put them back at the top of the grid.
       Instant, not smooth: Lenis drives scrolling on this site and animating
       against it fights the library. Same reason as ScrollToTop. */
    const top = anchorRef.current?.getBoundingClientRect().top;
    if (top !== undefined) {
      window.scrollTo({
        top: Math.max(top + window.scrollY - 110, 0),
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, [initial]);

  return {
    /** A prefix of `all`, so an index means the same thing in both. */
    visible: count >= all.length ? all : all.slice(0, count),
    fullyShown: count >= all.length,
    /** False when the set is short enough that no control is needed. */
    stepped: all.length > initial,
    remaining: Math.max(all.length - count, 0),
    showMore,
    showLess,
    anchorRef,
  };
}

export function ShowMore({
  fullyShown,
  remaining,
  onMore,
  onLess,
  tone = "light",
  controls,
  className,
}: {
  fullyShown: boolean;
  remaining: number;
  onMore: () => void;
  onLess: () => void;
  tone?: "light" | "onDark";
  /** Id of the list this button lengthens. */
  controls: string;
  className?: string;
}) {
  const onDark = tone === "onDark";
  const Icon = fullyShown ? ChevronUp : ChevronDown;

  return (
    <div className={cn("flex justify-center", className)}>
      <button
        type="button"
        onClick={fullyShown ? onLess : onMore}
        aria-controls={controls}
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[0.95rem] font-semibold transition-all duration-300 [transition-timing-function:var(--ease-expressive)] motion-safe:hover:-translate-y-0.5",
          onDark
            ? "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            : "border border-forest-200 bg-white text-forest-800 hover:border-forest-400 hover:text-forest-700",
        )}
      >
        {fullyShown ? "Show less" : "View more"}

        {!fullyShown ? (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[0.75rem] font-bold tabular-nums",
              onDark ? "bg-white/15 text-white/80" : "bg-forest-50 text-forest-700",
            )}
          >
            +{remaining}
          </span>
        ) : null}

        <Icon aria-hidden className="size-4" />
      </button>
    </div>
  );
}
