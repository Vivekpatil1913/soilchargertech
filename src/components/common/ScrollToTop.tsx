import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A browser restores scroll position on a real page load; a client-side router
 * does not. Without this, following a link from the bottom of the products page
 * drops you at the bottom of the next one.
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
 */

/** Tallest the fixed header gets, plus a little air. */
const HEADER_OFFSET = 120;

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    /* Two frames: one for the route's own render, one for any layout the
       section does on mount. Cheaper and more predictable than polling. */
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
          return;
        }
        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        /* Instant, not smooth: Lenis drives scrolling on this site and
           animating against it fights the library. Same reason as ShowMore. */
        window.scrollTo({ top: Math.max(top, 0), behavior: "instant" as ScrollBehavior });
      });
    });

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [pathname, hash]);

  return null;
}
