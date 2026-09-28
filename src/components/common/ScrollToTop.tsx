import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { jumpTo } from "@/components/common/SmoothScroll";

/**
 * A browser restores scroll position on a real page load; a client-side router
 * does not. Without this, following a link from the bottom of the products page
 * drops you at the bottom of the next one.
 *
 * Keyed on `location.key`, not `pathname`, so clicking the menu item for the
 * page you are already on still takes you back to the top.
 *
 * HASH LINKS
 * ----------
 * This used to `return` on any hash and do nothing at all, on the assumption
 * that the browser would handle the anchor. It does not: on a client-side
 * navigation there is no document load to trigger native fragment scrolling,
 * and the target element does not exist yet when the effect first runs. So
 * `/#farmer-stories` from the footer of another page, and `/careers#internship`
 * from the footer anywhere, both left the visitor at whatever scroll offset
 * they happened to have on the page they came from.
 *
 * The target is resolved after paint instead, and the scroll is offset by the
 * height of the fixed header so the heading is not left underneath it.
 *
 * Every jump goes through `jumpTo`, which moves Lenis as well as the window —
 * otherwise Lenis animates the page back to where it was.
 */

/** Tallest the fixed header gets (logo badge included), plus a little air. */
const HEADER_OFFSET = 120;

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export function ScrollToTop() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      jumpTo(0);
      return;
    }

    /* Two frames: one for the route's own render, one for any layout the
       section does on mount. Cheaper and more predictable than polling. */
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) {
          jumpTo(0);
          return;
        }
        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        jumpTo(Math.max(top, 0));
      });
    });

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [hash, key]);

  return null;
}
