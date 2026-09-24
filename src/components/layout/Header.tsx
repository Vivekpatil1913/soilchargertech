import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
 * Seven nav items — the old site carried eleven across four dropdowns. A
 * farmer arriving on a phone does not need eleven choices; he needs to know
 * what this is, to find the products, and to find the way in if he wants to
 * sell them. See src/data/navigation.ts for what earned each slot.
 *
 * The bar's height is set by the logo, not the other way round: the client
 * asked for prominent branding, so the lockup is sized first and the header
 * grows to hold it.
 *
 * It starts transparent over the hero's dark ground and turns solid once the
 * page scrolls, so the logo never sits on a competing white slab at the top of
 * a dark hero.
 */
export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Only the home page opens on a dark hero. Every other route starts with a
     pale page header, so the bar must be solid from the first pixel there. */
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  const solid = scrolled || !overHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-400 [transition-timing-function:var(--ease-expressive)]",
        solid
          ? "border-b border-hairline bg-sage-50/92 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "shell-wide flex items-center justify-between gap-4 transition-all duration-400",
          solid ? "h-[5.25rem] lg:h-[6.25rem]" : "h-[6rem] lg:h-[7.25rem]",
        )}
      >
        <Logo />

        {/* ---- Desktop nav --------------------------------------------- */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex whitespace-nowrap rounded-full px-2.5 py-2.5 text-[0.88rem] font-semibold transition-colors duration-200 xl:px-3.5 xl:text-[0.92rem]",
                      solid
                        ? active
                          ? "text-brand-700"
                          : "text-ink-600 hover:text-brand-700"
                        : active
                          ? "text-leaf-300"
                          : "text-white/85 hover:text-white",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full xl:inset-x-3.5",
                          solid ? "bg-brand-600" : "bg-leaf-400",
                        )}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---- Actions -------------------------------------------------- */}
        <div className="flex items-center gap-2.5">
          {/* Shown at every width. Below lg it takes the slot the contact CTA
              has on desktop: a farmer who reads Marathi needs the language
              control on the bar, and contact is already reachable from the
              drawer and the phone link inside it. */}
          <LanguageSwitcher onDark={!solid} align="right" />

          {/* The one action that is visible at EVERY width.
              Below lg the primary CTA is hidden and the number used to be
              hidden too, so a visitor on a phone — which is most of them — saw
              a logo, a language control and a hamburger, and had nothing to
              press without opening a menu first. Icon-only under md, icon plus
              label from xl, and it collapses to the icon again between lg and
              xl where seven nav items leave no room for the number. */}
          <a
            href={telHref(contact.phones[0])}
            aria-label={`Call SCT on ${contact.phones[0]}`}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full text-[0.88rem] font-semibold transition-colors",
              "size-11 md:size-auto md:px-3.5 md:py-2.5",
              solid
                ? "border border-hairline bg-white text-ink-700 hover:text-brand-700 md:border-0 md:bg-transparent md:text-ink-600"
                : "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 md:border-0 md:bg-transparent md:text-white/85 md:backdrop-blur-none md:hover:bg-transparent md:hover:text-white",
            )}
          >
            <Phone aria-hidden className="size-4" />
            <span className="hidden xl:inline">{contact.phones[0]}</span>
          </a>

          {/* The wrapper carries the breakpoint, not the Button: `hidden` on
              the Button loses to the `inline-flex` in its own base classes —
              same specificity, and Tailwind's order decides — which is why
              this CTA used to show up on phones. */}
          <div className="hidden lg:block">
            <Button
              href="/contact"
              variant={solid ? "primary" : "onDark"}
              className="whitespace-nowrap"
            >
              Talk to an expert
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "grid size-11 place-items-center rounded-full border transition-colors lg:hidden",
              solid
                ? "border-hairline bg-white text-ink-700"
                : "border-white/25 bg-white/10 text-white backdrop-blur",
            )}
          >
            {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
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
        className="max-h-[calc(100dvh-5.25rem)] overflow-y-auto overscroll-contain border-t border-hairline bg-sage-50 lg:hidden"
      >
        <nav aria-label="Mobile" className="shell-wide py-5">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col rounded-xl px-4 py-3.5 transition-colors hover:bg-sage-100"
                >
                  <span className="font-display text-[1.05rem] font-bold text-ink-900">
                    {item.label}
                  </span>
                  {item.hint ? (
                    <span className="mt-0.5 text-[0.84rem] text-ink-500">{item.hint}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          {/* No language switcher here — it is on the bar at every width now. */}
          <div className="mt-5 flex flex-col gap-3 border-t border-hairline pt-5">
            <Button href="/contact" size="lg">
              Talk to an expert
            </Button>
            <a
              href={telHref(contact.phones[0])}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-7 py-4 text-[0.95rem] font-semibold text-brand-800"
            >
              <Phone aria-hidden className="size-4" />
              {contact.phones[0]}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
