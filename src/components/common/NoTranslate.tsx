import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * TRANSLATION GUARDS
 * ==================
 * The site is served in Marathi and Hindi through Google Translate (see
 * `layout/LanguageSwitcher.tsx`). Machine translation is indiscriminate: it
 * rewrites every text node it finds, including the ones that are not language.
 *
 * Left unguarded, switching to Marathi did this:
 *
 *   · The company name became **माती चार्जर तंत्रज्ञान** in the footer lockup —
 *     the words "soil", "charger" and "technology" translated individually —
 *     while the same name in the paragraph below it became **सॉईल चार्जर
 *     टेक्नॉलॉजी**, a transliteration. One name, two renderings, on one screen.
 *   · Phone numbers became **+९१ ८६६९२ ००२२१**. Devanagari digits cannot be
 *     dialled from a keypad and cannot be copied into one. This was the most
 *     damaging of the lot and the least visible.
 *   · The pincode became **४२२ १०१** and the shop number **क्र. ३**.
 *   · Product names became **एससीटी वैदिक** and **सुपर सिरीज**.
 *   · The "X" in the social row became **एक्स**.
 *
 * A proper name, a phone number, a postal address and a product name are all
 * the same kind of thing here: identifiers, not prose. They are written once
 * and must read identically in every language.
 *
 * HOW THE GUARD WORKS
 * -------------------
 * Google Translate skips any element carrying `translate="no"` or the
 * `notranslate` class. Both are set: `notranslate` is what the widget has
 * honoured longest, `translate="no"` is the standard HTML attribute. Belt and
 * braces, because a half-translated phone number is not a cosmetic bug.
 *
 * WHAT IS *NOT* GUARDED, DELIBERATELY
 * -----------------------------------
 * People's names. A Marathi reader seeing **राम मुखेकर** is being served, not
 * mangled — the two real testimonials on the site are already in Devanagari
 * for exactly that reason. Body copy, headings and labels all translate as
 * normal; that is the entire point of the switcher.
 */

/** Both signals, so neither implementation detail can let a value through. */
const GUARD = { className: "notranslate", translate: "no" } as const;

/**
 * WHY `pad` EXISTS
 * ----------------
 * A guard placed mid-sentence splits that sentence into three DOM nodes:
 * translated text, the guard, translated text. Google translates each
 * neighbouring node on its own and does not reliably preserve the whitespace at
 * the edge where the guard sits — which produced
 * **"Soil Charger Technologyसेंद्रिय कार्बनची…"** in the hero and
 * **"Soil Charger Technologyसर्व हक्क राखीव."** in the footer.
 *
 * The only place a space is safe is *inside* the guard, where Google will not
 * touch it. `pad` puts one there. It is a plain U+0020, not a non-breaking
 * space, so the line can still wrap after the company name — which matters,
 * because "Soil Charger Technology" is long and the footer column is narrow.
 *
 * Adjacent whitespace collapses in HTML, so padding a guard that already has a
 * literal space beside it in the JSX is harmless. Pad the side that faces a
 * word; do not pad a side that faces a comma or a full stop.
 */
type GuardProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  pad?: "before" | "after" | "both";
  /* `aria-hidden`, `title` and the like pass through to the rendered tag. */
} & Omit<ComponentPropsWithoutRef<"span">, "children" | "className" | "translate">;

export function NoTranslate({ children, as: Tag = "span", className, pad, ...rest }: GuardProps) {
  return (
    <Tag className={cn(GUARD.className, className)} translate={GUARD.translate} {...rest}>
      {pad === "before" || pad === "both" ? " " : null}
      {children}
      {pad === "after" || pad === "both" ? " " : null}
    </Tag>
  );
}

/**
 * The company name. Use this rather than `{site.name}` anywhere it is shown to
 * a reader, so there is one place to change if the guard ever needs to.
 */
export function Brand({
  short = false,
  suffix,
  ...rest
}: Omit<GuardProps, "children"> & {
  /** "SCT" instead of the full name. */
  short?: boolean;
  /** Punctuation that must stay attached to the name, e.g. a comma. */
  suffix?: string;
}) {
  return (
    <NoTranslate {...rest}>
      {short ? site.shortName : site.name}
      {suffix}
    </NoTranslate>
  );
}

/**
 * Wraps every occurrence of the company name inside a plain string.
 *
 * Needed because a lot of SCT's own copy mentions the company mid-sentence,
 * and that copy lives in `src/data/*.ts` and in page-level constants as
 * strings — there is nowhere to put an element. The sentence around the name
 * still translates; only the name is held back.
 *
 * Matching is on the full name only. The "SCT" abbreviation is left alone
 * because Google already leaves a Latin acronym standing, and guarding every
 * one of the ~90 occurrences in the prose would be a lot of markup for a
 * problem that does not exist.
 */
export function protectBrand(text: string): ReactNode {
  const parts = text.split(site.name);
  if (parts.length === 1) return text;

  const out: ReactNode[] = [];

  parts.forEach((part, index) => {
    if (index === 0) {
      if (part) out.push(part);
      return;
    }

    /* Punctuation that followed the name comes inside the guard, and a space
       is added on every side that faces text. Both are needed because Google
       translates each neighbouring node on its own and drops the whitespace —
       and sometimes the punctuation — at the seam:

         "…website of Soil Charger Technology, Nashik. It describes…"
            became  "…Soil Charger Technologyनाशिक. यात कंपनी…"
         "Mr. Ram Mukhekar founded Soil Charger Technology in Nashik…"
            became  "…यांनी स्थापना केलीSoil Charger Technology"

       Pulling the comma in and padding both sides fixes the Marathi without
       changing the English, because adjacent whitespace collapses in HTML. */
    const [, punctuation, rest] = /^([,.;:!?)\]]*)\s*([\s\S]*)$/.exec(part) ?? ["", "", part];
    const hasTextBefore = index > 0;
    const hasTextAfter = rest.length > 0;

    out.push(
      <Brand
        key={`brand-${index}`}
        suffix={punctuation}
        pad={hasTextBefore && hasTextAfter ? "both" : hasTextBefore ? "before" : "after"}
      />,
    );
    if (rest) out.push(rest);
  });

  return out;
}
