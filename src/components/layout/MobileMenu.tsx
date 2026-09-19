"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { contact } from "@/data/site";
import { telHref } from "@/lib/utils";
import { EASE_OUT_SOFT } from "@/lib/animations";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

/**
 * Full-screen mobile navigation.
 *
 * Built for the way most SCT visitors will arrive: a phone, one hand, possibly
 * outdoors. Tap targets are 48px minimum, each link carries a short hint so the
 * destination is obvious, and the two things a farmer is most likely to want —
 * calling someone, and reading in their own language — sit at the bottom within
 * thumb reach rather than buried at the top.
 *
 * Accessibility: a labelled dialog, body scroll locked while open, focus moved
 * into the panel and returned to the trigger on close, Escape to dismiss, and a
 * focus trap so Tab cannot wander behind the overlay.
 */

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  /** Focus returns here when the menu closes. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const raf = requestAnimationFrame(() => focusables()[0]?.focus());

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open, onClose]);

  const handleClose = () => {
    onClose();
    triggerRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-[70] xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={handleClose}
            className="absolute inset-0 bg-ink-900/45 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: EASE_OUT_SOFT }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col bg-cream-50 shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <Logo compact />
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-hairline bg-white text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <nav aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
              <ul className="flex flex-col">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.38, ease: EASE_OUT_SOFT }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex min-h-[3.25rem] flex-col justify-center rounded-xl px-4 py-3 transition-colors hover:bg-white active:bg-white"
                    >
                      <span className="font-display text-lg font-semibold text-ink-900">
                        {item.label}
                      </span>
                      {item.hint ? (
                        <span className="mt-0.5 text-sm text-ink-400">{item.hint}</span>
                      ) : null}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-hairline bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              <LanguageSwitcher variant="block" />
              <a
                href={telHref(contact.phones[0])}
                className="flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-full bg-brand-600 px-6 text-[0.95rem] font-semibold text-white transition-colors hover:bg-brand-700"
              >
                <Phone aria-hidden className="size-4" />
                Talk to an expert
              </a>
              <p className="text-center text-xs text-ink-400">
                {contact.phones.join("  ·  ")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
