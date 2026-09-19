"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/common/CTAButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

/**
 * Sticky header.
 *
 * It starts transparent so the hero reads full-bleed, then settles into a solid
 * cream bar with a hairline once the visitor scrolls past it.
 *
 * Link colour is the subtle part. The links are dark ink, which is right over
 * the cream home hero but invisible over the `bg-brand-950` photo heroes that
 * seven inner pages open on. Rather than thread the hero's tone up from the
 * page into the layout's header — which React cannot do cleanly in this
 * direction, and which would flash the wrong colour before hydration — the
 * hero marks itself with `data-hero="dark"` and a `:has()` rule in globals.css
 * lifts the links to cream. That is correct in the first server-rendered paint
 * and needs no list of which routes are dark.
 *
 * The data attributes below are the hooks for that rule; `data-scrolled` scopes
 * it to the transparent state only, since the solid bar wants dark ink again.
 *
 * The full link set appears from 1280px up; below that the bar stays
 * deliberately sparse — logo, language, call to action, menu — rather than
 * cramming nine items into a tablet width.
 */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  /* Close the panel if the viewport grows past the mobile breakpoint while it
     is open, so the page is never left with scroll locked. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 80rem)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        data-site-header
        data-scrolled={scrolled ? "true" : "false"}
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-400 [transition-timing-function:var(--ease-out-soft)]",
          scrolled
            ? "border-b border-hairline bg-cream-50/90 shadow-soft backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[92rem] items-center justify-between gap-4 px-5 sm:px-7 lg:px-10">
          <Logo />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      data-nav-link
                      className={cn(
                        "group relative inline-flex items-center rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-200",
                        active ? "text-brand-700" : "text-ink-600 hover:text-ink-900",
                      )}
                    >
                      {item.label}
                      {/* Underline grows from the centre on hover; stays put on
                          the current page. */}
                      <span
                        aria-hidden
                        data-nav-underline
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-brand-600 transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher className="hidden sm:block" />

            {/* Wrapped rather than given `hidden` directly: CTAButton sets
                `inline-flex` in its own base class, and between two display
                utilities the stylesheet order decides the winner, not the
                order they appear in the class attribute. A wrapper keeps the
                responsive visibility unambiguous. */}
            <div className="hidden lg:block">
              <CTAButton href="/contact" size="md">
                Talk to an expert
              </CTAButton>
            </div>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-full border border-hairline bg-white/80 text-ink-700 backdrop-blur transition-colors hover:border-brand-300 hover:text-brand-700 xl:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
