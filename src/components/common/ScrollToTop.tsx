import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A browser restores scroll position on a real page load; a client-side router
 * does not. Without this, following a link from the bottom of the products page
 * drops you at the bottom of the next one. Hash links are left alone so in-page
 * anchors still work.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
