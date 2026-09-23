import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import type { Delivery } from "@/lib/form-submit";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";

/**
 * FORM MODAL
 * ==========
 * Every form on the old site was a Bootstrap modal, and that was the right
 * call: these are interruptions, not destinations. A farmer reading about
 * Root Charger who wants to enquire should not lose his place in the page.
 *
 * So the pattern is kept, and the accessibility the old one did not have is
 * added: the dialog takes focus on open, Escape and the backdrop close it, Tab
 * is trapped inside while it is up, and focus returns to whatever opened it.
 *
 * The page behind is frozen with the same `lockScroll` the mobile drawer uses
 * — Lenis drives scrolling on this site, so `overflow: hidden` alone would not
 * hold it.
 *
 * WHY IT IS PORTALLED
 * -------------------
 * Not a detail — without it the dialog is unusable. Every dark ground in the
 * design system (`ground-forest`, `ground-night`, `ground-soil`) sets
 * `isolation: isolate`, which makes that section its own stacking context. A
 * modal rendered inside one is trapped in it: the section itself sits at
 * z-index auto in the root context, so the fixed header at `z-50` paints over
 * the backdrop no matter how high the modal's own z-index goes. That is
 * exactly what happened when the triggers lived in the footer — the header
 * stayed bright and clickable above a dimmed page.
 *
 * Portalling to `document.body` puts the dialog in the root stacking context,
 * where `z-[100]` means what it says, and it keeps working wherever a launcher
 * is dropped in future.
 *
 * SCROLLING
 * ---------
 * The panel is a flex column with its own scrolling body, rather than a tall
 * panel inside a scrolling overlay. With the latter, the title bar is `sticky`
 * against the *overlay*, so the first row of fields slides underneath it and
 * its labels disappear behind the white. Here the header and the submit area
 * are fixed parts of the panel and only the fields move.
 *
 * MOTION
 * ------
 * One movement, on the site's own `ease-expressive` curve: the backdrop fades,
 * the panel rises 16px and settles.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function FormModal({
  open,
  onClose,
  title,
  description,
  eyebrow,
  children,
  size = "default",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  eyebrow?: string;
  children: ReactNode;
  /** `wide` is for the distributor application, which is four forms in one. */
  size?: "default" | "wide";
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  /* Call sites pass an inline `() => setOpen(false)`, which is a new function
     on every render. Depending on it directly would tear the scroll lock down
     and build it back up on any unrelated re-render, so the effect reads it
     through a ref and depends only on `open`. */
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;
    lockScroll();

    // Focus the panel itself rather than the first field: a screen reader
    // should hear the dialog's title before it hears "Full name, edit text".
    const frame = requestAnimationFrame(() => panelRef.current?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (item) => item.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      restoreTo.current?.focus?.();
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-card-lg outline-none sm:max-h-[88dvh] sm:rounded-3xl",
              /* 48rem default — the enquiry form's ten products sit in two
                 columns, and at the old 36rem each one was barely wider than
                 its own label. `wide` matches the 64rem cap the careers
                 forms use, so a long form is the same width everywhere. */
              size === "wide" ? "sm:max-w-5xl" : "sm:max-w-3xl",
            )}
          >
            {/* ---- Grab handle, phones only ----------------------------- */}
            <span
              aria-hidden
              className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-ink-300/40 sm:hidden"
            />

            {/* ---- Header ---------------------------------------------- */}
            <div className="flex shrink-0 items-start gap-4 border-b border-hairline px-6 pb-5 pt-5 sm:px-8 sm:pt-6">
              <div className="min-w-0 flex-1">
                {eyebrow ? (
                  <p className="text-eyebrow flex items-center gap-2 text-brand-700">
                    <span aria-hidden className="size-1.5 rounded-full bg-current" />
                    {eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-2 font-display text-[1.25rem] font-extrabold leading-tight tracking-[-0.03em] text-ink-900 sm:text-[1.4rem]">
                  {title}
                </h2>
                {description ? (
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-500">{description}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 grid size-9 shrink-0 place-items-center rounded-full border border-hairline text-ink-500 transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                <X aria-hidden className="size-4" />
              </button>
            </div>

            {/* ---- Body — the only thing that scrolls -------------------
                `data-lenis-prevent` is load-bearing, not a nicety. Opening
                the dialog calls `lockScroll`, which stops Lenis, and a
                stopped Lenis answers every wheel event with
                `preventDefault()` — including wheels over this element, so
                the fields could only be moved by dragging the scrollbar.
                Lenis checks the event's composed path for this attribute and
                bails out *before* that branch, handing the wheel back to the
                browser. See `onVirtualScroll` in lenis/dist/lenis.mjs. */}
            <div
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-6 sm:px-8"
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/* ==========================================================================
   SUCCESS PANEL
   --------------------------------------------------------------------------
   Shown in place of the fields once a form has handed off. It is deliberately
   specific about what just happened, because "Thank you, we will be in touch"
   would be a lie — nothing was stored, a chat or a draft email was opened.
   ========================================================================== */

export function SuccessPanel({
  delivery,
  attachments,
  onReset,
  resetLabel = "Send another",
}: {
  delivery: Delivery;
  /** Labels of documents the visitor picked but the browser cannot send. */
  attachments?: string[];
  onReset?: () => void;
  resetLabel?: string;
}) {
  const viaWhatsApp = delivery.channel === "whatsapp";

  return (
    <div className="text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-squircle bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200">
        <CheckCircle2 aria-hidden className="size-7" />
      </span>

      <h3 className="mt-5 font-display text-[1.2rem] font-extrabold tracking-[-0.03em] text-ink-900">
        {viaWhatsApp ? "Your details are ready to send" : "Your application is ready to send"}
      </h3>

      <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-ink-500">
        {viaWhatsApp ? (
          <>
            WhatsApp should have opened with everything filled in. Press send there and the team has
            it.
          </>
        ) : (
          <>
            Your email app should have opened with everything filled in, addressed to{" "}
            <span className="font-semibold text-ink-700">{delivery.to}</span>. Press send there and
            the team has it.
          </>
        )}
      </p>

      {attachments && attachments.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-saffron-200 bg-saffron-50 p-5 text-left">
          <p className="text-[0.85rem] font-bold text-saffron-700">
            One thing the browser cannot do for you
          </p>
          <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-600">
            A web page cannot attach your files to the message. Please attach these before you send:
          </p>
          <ul className="mt-3 space-y-1.5">
            {attachments.map((item) => (
              <li key={item} className="flex gap-2 text-[0.86rem] text-ink-700">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-saffron-500" />
                <span className="min-w-0 break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={delivery.href}
          {...(viaWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex w-full items-center justify-center rounded-full border border-brand-200 bg-white px-6 py-3 text-[0.9rem] font-semibold text-brand-800 transition-colors duration-300 hover:border-brand-400 hover:bg-brand-50 sm:w-auto"
        >
          {viaWhatsApp ? "Open WhatsApp again" : "Open the email again"}
        </a>

        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[0.9rem] font-semibold text-ink-500 transition-colors duration-300 hover:text-brand-700 sm:w-auto"
          >
            {resetLabel}
          </button>
        ) : null}
      </div>

      <p className="mt-5 text-[0.78rem] leading-relaxed text-ink-400">
        Nothing blocked?{" "}
        {viaWhatsApp
          ? "If WhatsApp did not open, your browser may have stopped the pop-up — use the button above."
          : "If no email app opened, use the button above or write to the address shown."}
      </p>
    </div>
  );
}
