/**
 * CONVERSION INSTRUMENTATION
 * ==========================
 * The site had no analytics of any kind, which meant none of the decisions
 * baked into it could be checked: whether phone beats WhatsApp for this
 * audience, whether anyone reaches the products section, whether the
 * distributor application is ever completed, whether the language switcher is
 * used at all. Those are the questions the whole design rests on.
 *
 * NO PROVIDER IS HARDCODED
 * ------------------------
 * Which analytics account to use is a decision for SCT, not something to bake
 * in with a placeholder id — a wrong id silently sends nothing and looks like
 * it is working. So this is a thin wrapper that no-ops until a provider is
 * configured, and the events below are already placed at the points that
 * matter. Turning it on is one environment variable.
 *
 * Plausible is the default implementation: cookieless, no consent banner
 * needed under GDPR/DPDP, ~1 KB, and it does not profile the visitor. For an
 * audience on metered rural data, the weight matters as much as the privacy.
 *
 *   .env
 *   VITE_ANALYTICS_DOMAIN=soilchargertechnology.com
 *   VITE_ANALYTICS_SRC=https://plausible.io/js/script.js   # optional override
 *
 * To use something else instead, replace the body of `mountAnalytics` and
 * `track`. Every call site goes through `track()`, so nothing else changes.
 */

const DOMAIN = import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined;
const SRC =
  (import.meta.env.VITE_ANALYTICS_SRC as string | undefined) ??
  "https://plausible.io/js/script.tagged-events.js";

declare global {
  interface Window {
    plausible?: ((event: string, options?: { props?: Record<string, string> }) => void) & {
      q?: unknown[];
    };
  }
}

/** The events worth counting. Named so a report reads as sentences. */
export type AnalyticsEvent =
  | "Call: tapped"
  | "WhatsApp: opened"
  | "Form: submitted"
  | "Product: enquiry opened"
  | "Language: changed"
  | "Gallery: opened";

export const analyticsEnabled = Boolean(DOMAIN);

/**
 * Loads the provider script once, from the app root.
 *
 * Deferred and `async` so it never competes with the app bundle, and skipped
 * entirely when no domain is configured — a farmer on a slow line should not
 * pay for a script that is not going to report anywhere.
 */
export function mountAnalytics(): void {
  if (!DOMAIN || typeof document === "undefined") return;
  if (document.getElementById("sct-analytics")) return;

  const script = document.createElement("script");
  script.id = "sct-analytics";
  script.defer = true;
  script.src = SRC;
  script.setAttribute("data-domain", DOMAIN);
  document.head.appendChild(script);

  /* The queue shim means a `track()` fired before the script lands is
     replayed rather than dropped — which matters for the phone tap, the most
     important event on the site and often the first thing a visitor does. */
  window.plausible =
    window.plausible ??
    function queued(...args: unknown[]) {
      (window.plausible!.q = window.plausible!.q ?? []).push(args);
    };
}

/** Records an event. Silent no-op when analytics is not configured. */
export function track(event: AnalyticsEvent, props?: Record<string, string>): void {
  if (!DOMAIN || typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* Analytics must never break the thing it is measuring. */
  }
}

/**
 * Counts phone and WhatsApp taps site-wide from a single listener.
 *
 * These are the two most important actions on the site and they are plain
 * anchors scattered across the header, the drawer, the footer, the hero, the
 * contact cards, every product page and every category page. Annotating each
 * one would mean a handler at ~20 call sites and a new one missed every time
 * somebody adds a link. Delegation on `document` catches all of them, and any
 * added later, for one listener.
 *
 * Capture phase, because the click may navigate away immediately.
 */
export function trackOutboundClicks(): () => void {
  if (!DOMAIN || typeof document === "undefined") return () => {};

  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement | null)?.closest?.("a");
    const href = anchor?.getAttribute("href");
    if (!href) return;

    if (href.startsWith("tel:")) {
      track("Call: tapped", { from: window.location.pathname });
    } else if (href.includes("wa.me")) {
      track("WhatsApp: opened", { from: window.location.pathname });
    }
  };

  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
