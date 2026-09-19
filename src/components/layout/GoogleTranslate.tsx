"use client";

import Script from "next/script";
import { useEffect } from "react";
import { LANGUAGES } from "@/lib/constants";

/**
 * GOOGLE TRANSLATE — MOUNT POINT
 * ==============================
 * Rendered exactly once, from the root layout. It owns two things and nothing
 * else: the hidden element Google's widget attaches to, and the script that
 * creates it.
 *
 * The visible UI lives in <LanguageSwitcher />, which drives the hidden
 * `select.goog-te-combo` that this widget creates. Splitting it this way lets
 * the switcher appear in the header, the mobile menu and the footer at the same
 * time without three competing widget instances — and lets us style the control
 * ourselves instead of shipping Google's default bar, which would sit on top of
 * the page and break the sticky header.
 *
 * The banner Google injects at the top of the document, and the yellow
 * highlight it puts on translated text, are neutralised in globals.css.
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
            layout?: unknown;
          },
          container: string,
        ) => void;
      };
    };
  }
}

export const TRANSLATE_MOUNT_ID = "sct-google-translate-mount";

export function GoogleTranslate() {
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
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <>
      {/* Google attaches its widget here. Kept in the layout but visually
          removed — never `display:none`, which stops the widget initialising
          in some browsers. */}
      <div
        id={TRANSLATE_MOUNT_ID}
        aria-hidden
        className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
      />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
