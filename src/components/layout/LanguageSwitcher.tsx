"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { LANGUAGES, type LanguageCode } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * The visible language control. It drives the hidden Google Translate combo
 * created by <GoogleTranslate />, so the page translates without Google's own
 * toolbar ever appearing.
 *
 * Accessibility: a real button with `aria-expanded`/`aria-controls`, a listbox
 * of options, Escape to close, focus returned to the trigger, and dismissal on
 * outside click. Fully operable from the keyboard.
 */

type LanguageSwitcherProps = {
  className?: string;
  /** "bar" suits the header; "block" fills the width in the mobile menu. */
  variant?: "bar" | "block";
  tone?: "light" | "onDark";
};

const COOKIE = "googtrans";

function readActiveLanguage(): LanguageCode {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  const value = match?.[1] ? decodeURIComponent(match[1]) : "";
  const code = value.split("/")[2] as LanguageCode | undefined;
  return code && LANGUAGES.some((l) => l.code === code) ? code : "en";
}

export function LanguageSwitcher({
  className,
  variant = "bar",
  tone = "light",
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LanguageCode>("en");
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Read the current language only after mount: the cookie is not available
     during SSR, and rendering a guess would cause a hydration mismatch. */
  useEffect(() => {
    setMounted(true);
    setActive(readActiveLanguage());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const translateTo = useCallback((code: LanguageCode) => {
    const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");

    if (code === "en") {
      /* Clearing the cookie on every host variant is the only reliable way to
         return Google Translate to the original language. */
      const { hostname } = window.location;
      const bare = hostname.replace(/^www\./, "");
      for (const domain of ["", `; domain=${hostname}`, `; domain=.${bare}`]) {
        document.cookie = `${COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      }
      if (combo) {
        combo.value = "";
        combo.dispatchEvent(new Event("change"));
      }
      window.location.reload();
      return;
    }

    document.cookie = `${COOKIE}=/en/${code}; path=/`;
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    } else {
      /* Widget not ready yet — the cookie alone applies on the next paint. */
      window.location.reload();
    }
  }, []);

  const onSelect = (code: LanguageCode) => {
    setActive(code);
    setOpen(false);
    translateTo(code);
  };

  const current = LANGUAGES.find((l) => l.code === active) ?? LANGUAGES[0];
  const isDark = tone === "onDark";

  return (
    <div ref={rootRef} className={cn("relative", variant === "block" && "w-full", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="sct-language-list"
        aria-label={`Change language. Current language: ${current.label}`}
        className={cn(
          "notranslate group inline-flex items-center gap-2 rounded-full border text-sm font-medium transition-colors duration-200",
          variant === "block" ? "w-full justify-between px-4 py-3" : "px-3.5 py-2",
          isDark
            ? "border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15"
            : "border-hairline bg-white/80 text-ink-700 hover:border-brand-300 hover:text-brand-700",
        )}
      >
        <span className="inline-flex items-center gap-2">
          <Globe aria-hidden className="size-4 shrink-0" />
          {/* `suppressHydrationWarning` guards the label only: its value comes
              from a cookie the server cannot see. */}
          <span suppressHydrationWarning>{mounted ? current.native : "English"}</span>
        </span>
        <span
          aria-hidden
          className={cn(
            "text-[0.6rem] transition-transform duration-200",
            open && "rotate-180",
            variant === "bar" && "ml-0.5",
          )}
        >
          ▼
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id="sct-language-list"
            role="listbox"
            aria-label="Select a language"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "notranslate absolute z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-hairline bg-white p-1.5 shadow-lift",
              variant === "block" ? "left-0 right-0" : "right-0 w-48",
            )}
          >
            {LANGUAGES.map((lang) => {
              const selected = lang.code === active;
              return (
                <li key={lang.code} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => onSelect(lang.code)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      selected
                        ? "bg-brand-50 font-semibold text-brand-700"
                        : "text-ink-600 hover:bg-cream-100 hover:text-ink-900",
                    )}
                  >
                    <span className="flex flex-col leading-tight">
                      <span>{lang.native}</span>
                      <span className="text-[0.7rem] text-ink-400">{lang.label}</span>
                    </span>
                    {selected ? <Check aria-hidden className="size-4 shrink-0" /> : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
