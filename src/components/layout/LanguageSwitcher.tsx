import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { LANGUAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * LANGUAGE SWITCHER
 * =================
 * The old site offered English, Marathi and Hindi, and most of SCT's own
 * writing is in Marathi — so this is not decoration, it is how a large part of
 * the audience reads the site.
 *
 * It writes Google Translate's own `googtrans` cookie and reloads, rather than
 * shipping Google's widget UI. That keeps the control inside our own header
 * styling, lets the switcher appear in the header and the drawer at once
 * without two competing widget instances, and — unlike driving the hidden
 * combo — makes the choice survive navigation and reverse cleanly.
 *
 * Honest note: machine translation is a stopgap. Marathi and Hindi copy
 * written by SCT would read far better, and the content model already supports
 * it — see docs/README.md.
 */

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            autoDisplay?: boolean;
          },
          container: string,
        ) => void;
      };
    };
  }
}

export const TRANSLATE_MOUNT_ID = "sct-translate-mount";

/**
 * THE COOKIE IS THE STATE
 * -----------------------
 * Google Translate keeps the chosen language in a `googtrans` cookie shaped
 * `/<from>/<to>` and re-applies it on every page load. Driving the widget's
 * hidden `select.goog-te-combo` translates the page but leaves that cookie
 * alone, so the choice did not survive navigation — and picking English set
 * the combo to "" without clearing the cookie, which is why the page stayed in
 * Marathi while the control said English.
 *
 * So the cookie is written directly and the page reloaded. The widget reads it
 * on the way back up: a language code translates, no cookie at all means the
 * page renders in its own English.
 */

/** Reads the language Google stored, so the control shows the current state. */
function readActiveLanguage(): string {
  const match = document.cookie.match(/googtrans=\/[^/]+\/([a-zA-Z-]+)/);
  return match?.[1] ?? "en";
}

/**
 * Writes (or clears) `googtrans` on every domain spelling Google might have
 * used. It sets the cookie both host-scoped and dot-scoped depending on how
 * the page was reached, and a leftover copy on the other spelling wins over
 * the one we just wrote — so all of them are written together.
 */
function writeTranslationCookie(value: string | null) {
  const host = window.location.hostname;
  const scopes = ["", `domain=${host};`, `domain=.${host};`];

  for (const scope of scopes) {
    document.cookie = value
      ? `googtrans=${value};path=/;${scope}`
      : `googtrans=;path=/;${scope}expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export function LanguageSwitcher({
  onDark = false,
  align = "left",
}: {
  onDark?: boolean;
  /** Which edge of the trigger the panel hangs from. Right in the header, left in the drawer. */
  align?: "left" | "right";
}) {
  const [active, setActive] = useState("en");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setActive(readActiveLanguage()), []);

  /* Close on outside click and on Escape. Escape returns focus to the trigger
     so a keyboard visitor is never dropped at the top of the document. */
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  /* Focus without letting the browser scroll the page — the list scrolls
     itself instead, so Lenis is never fighting a programmatic jump. */
  function focusOption(option: HTMLButtonElement | null | undefined) {
    const list = listRef.current;
    if (!option || !list) return;
    option.focus({ preventScroll: true });
    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }

  /* Arrow keys walk the list and pull the next option into view, which is how
     the sixth language is reachable without a mouse. */
  function onListKeyDown(event: React.KeyboardEvent) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [],
    );
    if (!items.length) return;

    const from = items.indexOf(document.activeElement as HTMLButtonElement);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : event.key === "ArrowDown"
            ? Math.min(items.length - 1, from + 1)
            : Math.max(0, from - 1);

    focusOption(items[next]);
  }

  /* Opening lands on the language in use, so a list that scrolls always starts
     where the visitor is rather than at the top. */
  useEffect(() => {
    if (!open) return;
    focusOption(listRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function change(code: string) {
    setOpen(false);
    if (code === active) {
      triggerRef.current?.focus({ preventScroll: true });
      return;
    }

    setActive(code);
    track("Language: changed", { to: code });
    /* English is the page's own language: clearing the cookie is what restores
       the original text. Anything else is a translation target. */
    writeTranslationCookie(code === "en" ? null : `/en/${code}`);

    /* A reload is what makes this stick. Google re-translates from the cookie
       on load, and it is the only way back to untranslated markup — the widget
       cannot undo its own DOM edits in place. */
    window.location.reload();
  }

  const current = LANGUAGES.find((language) => language.code === active) ?? LANGUAGES[0];

  return (
    <div ref={rootRef} className="notranslate relative inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}. Change language`}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border py-2.5 pl-3.5 pr-3 text-[0.85rem] font-semibold transition-colors",
          onDark
            ? "border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            : "border-hairline bg-white text-ink-700 hover:border-brand-300 hover:text-brand-700",
        )}
      >
        <Globe aria-hidden className={cn("size-4", onDark ? "text-white/80" : "text-ink-500")} />
        {current.native}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-3.5 transition-transform duration-300 [transition-timing-function:var(--ease-expressive)]",
            onDark ? "text-white/70" : "text-ink-400",
            open ? "rotate-180" : "",
          )}
        />
      </button>

      {/* Kept in the DOM so the panel can transition. `invisible` also takes the
          options out of the tab order while it is closed. */}
      <div
        className={cn(
          "absolute top-[calc(100%+0.6rem)] z-50 w-60 origin-top rounded-2xl border border-hairline bg-white p-1.5 shadow-card-lg transition-all duration-300 [transition-timing-function:var(--ease-expressive)]",
          align === "right" ? "right-0" : "left-0",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        {/* Five languages fit; the rest scroll. `data-lenis-prevent` hands the
            wheel back to the browser — without it Lenis scrolls the page
            instead of this list. */}
        <div
          ref={listRef}
          role="listbox"
          aria-label="Choose language"
          onKeyDown={onListKeyDown}
          data-lenis-prevent
          className="relative max-h-[17.5rem] overflow-y-auto overscroll-contain [scrollbar-color:var(--color-brand-200)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-200 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5"
        >
          {LANGUAGES.map((language) => {
            const selected = language.code === active;
            return (
              <button
                key={language.code}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => change(language.code)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200",
                  selected ? "bg-brand-50 text-brand-800" : "text-ink-700 hover:bg-sage-50",
                )}
              >
                <span className="flex flex-col leading-tight">
                  <span className="font-display text-[0.95rem] font-bold">{language.native}</span>
                  <span
                    className={cn("text-[0.76rem]", selected ? "text-brand-700" : "text-ink-400")}
                  >
                    {language.label}
                  </span>
                </span>
                {selected ? <Check aria-hidden className="size-4 shrink-0 text-brand-600" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Rendered once from the app root. Owns the hidden element Google's widget
 * attaches to, and the script that creates it.
 */
export function GoogleTranslateMount() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        TRANSLATE_MOUNT_ID,
      );
    };

    /* Appended only after the callback exists — Google's script invokes it the
       moment it loads, so registering first avoids a race where the widget
       never initialises. */
    const SCRIPT_ID = "sct-translate-script";
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  /* Visually removed, never `display:none` — that stops the widget
     initialising in some browsers. */
  return (
    <div
      id={TRANSLATE_MOUNT_ID}
      aria-hidden
      className="pointer-events-none fixed -left-[9999px] top-0 size-px overflow-hidden opacity-0"
    />
  );
}
