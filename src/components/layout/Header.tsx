import { Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { NoTranslate } from "@/components/common/NoTranslate";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui";
import { mainNav } from "@/data/navigation";
import { contact } from "@/data/site";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { cn, telHref } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * HEADER
 * ======
 * Two tiers, the way an institution's site is built:
 *
 *   1. A thin forest strip carrying the things a visitor needs but should
 *      never have to hunt for — the phone number, the email, the language.
 *   2. The bar proper: logo, six destinations, one call to action.
 *
 * It is solid at every scroll position. The previous design faded a
 * transparent bar in over a dark hero; that reads as a marketing page, and it
 * makes the logo's legibility depend on whatever photograph is behind it.
 * A bar that is simply always there is both calmer and more trustworthy — and
 * it is what the reference does.
 *
 * The only thing scroll changes is elevation: a hairline and a whisper of
 * shadow appear once the page has moved, so the bar detaches from the content
 * sliding under it.
 */
export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation, and freeze the page behind it.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    return unlockScroll;
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ---- Utility strip ---------------------------------------------- */}
      <div className="hidden bg-forest-950 text-white/70 lg:block">
        <div className="shell flex h-9 items-center justify-between gap-6 text-[11px]">
          <p className="tracking-wide">
            Soil-first agricultural inputs from Nashik, Maharashtra
            <span aria-hidden className="mx-2 text-harvest-400/50">
              ·
            </span>
            <span className="text-harvest-300">Since 2015</span>
          </p>

          <div className="flex items-center gap-5">
            <a
              href={telHref(contact.phones[0])}
              className="inline-flex items-center gap-1.5 tabular-nums transition-colors hover:text-white"
            >
              <Phone aria-hidden className="size-3" />
              <NoTranslate>{contact.phones[0]}</NoTranslate>
            </a>
            <a
              href={`mailto:${contact.emails.general}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Mail aria-hidden className="size-3" />
              <NoTranslate>{contact.emails.general}</NoTranslate>
            </a>
            <LanguageSwitcher onDark align="right" />
          </div>
        </div>
      </div>

      {/* ---- Main bar ---------------------------------------------------- */}
      <div
        className={cn(
          "border-b bg-white/95 backdrop-blur-lg transition-shadow duration-300",
          scrolled ? "border-ink-100 shadow-soft" : "border-ink-100/60",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5.5rem]">
          <Logo />

          {/* ---- Desktop nav ------------------------------------------- */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 xl:px-3.5",
                        active ? "text-forest-800" : "text-ink-600 hover:text-forest-700",
                      )}
                    >
                      {item.label}
                      {/* The gold underline is the same mark that sits under
                          every section heading — here it says "you are on this
                          page" in the site's own language. */}
                      {active ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-harvest-400 xl:inset-x-3.5"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ---- Actions ------------------------------------------------ */}
          <div className="flex items-center gap-2">
            {/* Below lg the utility strip is gone, so the language control
                moves onto the bar — a farmer who reads Marathi should not have
                to open a drawer to find it. */}
            <span className="lg:hidden">
              <LanguageSwitcher align="right" />
            </span>

            <div className="hidden lg:block">
              <Button href="/contact" className="whitespace-nowrap">
                Talk to an expert
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-lg border border-ink-200 bg-white text-ink-700 transition-colors hover:border-forest-300 lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden className="size-5" />
              ) : (
                <Menu aria-hidden className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---- Mobile drawer ---------------------------------------------- */}
      {/* `data-lenis-prevent` keeps Lenis off gestures inside the drawer, and
          `overscroll-contain` stops a flick at either end of the list from
          chaining through to the page behind it. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        data-lenis-prevent
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b border-ink-100 bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-4">
          <ul className="divide-y divide-ink-100">
            {mainNav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="flex flex-col py-3.5 transition-colors hover:bg-canvas-50"
                  >
                    <span
                      className={cn(
                        "font-display text-base font-semibold",
                        active ? "text-forest-800" : "text-ink-900",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.hint ? (
                      <span className="mt-0.5 text-xs text-ink-500">{item.hint}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-col gap-2.5">
            <Button href="/contact" size="lg" className="w-full">
              Talk to an expert
            </Button>
            <a
              href={telHref(contact.phones[0])}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-6 py-3 text-sm font-semibold text-forest-800 tabular-nums"
            >
              <Phone aria-hidden className="size-4" />
              <NoTranslate>{contact.phones[0]}</NoTranslate>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
