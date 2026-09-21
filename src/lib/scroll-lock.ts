/**
 * SCROLL LOCK
 * ===========
 * Freezes the page behind an overlay — the mobile drawer today, any modal
 * later.
 *
 * `overflow: hidden` on <body> is the usual answer and it is not enough here,
 * for two reasons:
 *
 *   · iOS Safari ignores it. The page keeps scrolling under the overlay, which
 *     is exactly the bug this fixes.
 *   · Lenis drives scrolling itself (src/components/common/SmoothScroll.tsx),
 *     so it keeps moving the page whatever <body> says about overflow.
 *
 * So the body is taken out of flow instead, pinned at the offset it was
 * already at, and Lenis is stopped for the duration. Releasing the lock puts
 * the scroll position back before Lenis restarts, so the page does not animate
 * back to where it was.
 */

import { pauseSmoothScroll, resumeSmoothScroll } from "@/components/common/SmoothScroll";

let offset = 0;
let locked = false;

export function lockScroll(): void {
  if (locked || typeof window === "undefined") return;
  locked = true;
  offset = window.scrollY;

  pauseSmoothScroll();

  const { style } = document.body;
  /* Flags the body so the Google Translate override in globals.css stops
     forcing `top: 0`, which would otherwise pin the page to its very top. */
  document.body.dataset.scrollLocked = "true";
  style.position = "fixed";
  style.top = `-${offset}px`;
  style.left = "0";
  style.right = "0";
  style.width = "100%";
  style.overflow = "hidden";
}

export function unlockScroll(): void {
  if (!locked || typeof window === "undefined") return;
  locked = false;

  const { style } = document.body;
  style.position = "";
  style.top = "";
  style.left = "";
  style.right = "";
  style.width = "";
  style.overflow = "";
  delete document.body.dataset.scrollLocked;

  window.scrollTo(0, offset);
  resumeSmoothScroll();
}
