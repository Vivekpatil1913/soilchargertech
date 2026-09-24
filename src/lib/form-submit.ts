import { contact, site } from "@/data/site";
import { track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/utils";

/**
 * WHERE FORM SUBMISSIONS GO
 * =========================
 * There is no backend on this build. The old site posted to a Laravel app; it
 * is not part of this repo and there is no endpoint to point at yet.
 *
 * Rather than fake a success state — a form that says "thank you" and throws
 * the answer away is worse than no form — every form here composes its answers
 * into a readable message and hands it to a channel SCT actually reads:
 *
 *   · WhatsApp, prefilled, for anything a farmer or shopkeeper sends. This is
 *     the same choice ContactPage already made, and it matches how SCT works —
 *     their third principle runs on WhatsApp and the old site carried four
 *     numbers in its markup.
 *   · Email, prefilled, for anything carrying documents. WhatsApp cannot take
 *     a resume from a web page, and neither can mailto:, so the form tells the
 *     applicant exactly which files to attach and names the ones they picked.
 *
 * WIRING A REAL BACKEND
 * ---------------------
 * Replace the body of `deliver()` with a fetch to the endpoint and return
 * `{ ok: true }` on a 2xx. Nothing else in the form components has to change —
 * they all call `deliver()` and render from what it returns. The `channel`
 * field is what the success panel keys its wording off, so an API-backed
 * version should return `channel: "api"` and add a branch to `SuccessPanel`.
 */

export type FormAnswer = {
  label: string;
  /** Already-formatted display value. Empty strings are dropped. */
  value: string;
};

export type FormGroup = {
  /** Optional heading, used by the longer applications. */
  heading?: string;
  answers: FormAnswer[];
};

export type Delivery =
  | { channel: "whatsapp"; href: string }
  | { channel: "email"; href: string; to: string };

/** Which inbox a form belongs to. */
export type Destination = "whatsapp" | "general" | "sales" | "careers";

const EMAIL_FOR: Record<Exclude<Destination, "whatsapp">, string> = {
  general: contact.emails.general,
  sales: contact.emails.sales,
  careers: contact.emails.careers,
};

/** Fields the visitor left blank never reach the message. */
function usable(answers: FormAnswer[]): FormAnswer[] {
  return answers.filter((answer) => answer.value.trim().length > 0);
}

/**
 * Renders the answers as plain text.
 *
 * Deliberately plain — no markdown, no box drawing. It has to stay readable in
 * a WhatsApp bubble on a five-inch phone, which is where most of these land.
 */
export function composeMessage(title: string, groups: FormGroup[]): string {
  const lines: string[] = [`${title} — ${site.shortName}`, ""];

  for (const group of groups) {
    const answers = usable(group.answers);
    if (answers.length === 0) continue;

    if (group.heading) lines.push(`${group.heading.toUpperCase()}`);
    for (const answer of answers) lines.push(`${answer.label}: ${answer.value}`);
    lines.push("");
  }

  return lines.join("\n").trim();
}

/**
 * Hands the composed message to WhatsApp or to an email client.
 *
 * Returns the link it opened so the success panel can offer it again — popup
 * blockers stop `window.open` often enough that a form which only calls it and
 * assumes success will silently lose submissions.
 */
export function deliver({
  title,
  groups,
  destination,
}: {
  title: string;
  groups: FormGroup[];
  destination: Destination;
}): Delivery {
  const body = composeMessage(title, groups);

  /* One chokepoint for five of the six forms plus the contact page, so this
     is the only place submission needs counting. */
  track("Form: submitted", { form: title, channel: destination });

  if (destination === "whatsapp") {
    const href = whatsappHref(contact.whatsapp, body);
    window.open(href, "_blank", "noopener,noreferrer");
    return { channel: "whatsapp", href };
  }

  const to = EMAIL_FOR[destination];
  const href = `mailto:${to}?subject=${encodeURIComponent(
    `${title} — ${site.shortName}`,
  )}&body=${encodeURIComponent(body)}`;

  /* A synthetic anchor rather than `window.location.href = href`. Assigning to
     location is a navigation as far as some browsers are concerned, and they
     unload the SPA before the success panel has painted — the applicant then
     sees a blank page and has no way back to the list of files to attach.
     Clicking a detached anchor hands the URL to the mail client and leaves the
     document alone.

     KNOWN LIMIT: a mailto body has a practical ceiling of roughly 2,000
     characters in some mail clients. The distributor application can approach
     it, and a client that truncates will drop the last answers. This is one
     more reason the real fix is a POST endpoint — see the note at the top. */
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.rel = "noopener";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  return { channel: "email", href, to };
}

/** Formats a picked file for the message: "resume.pdf (182 KB)". */
export function describeFile(file: File | null): string {
  if (!file) return "";
  const kb = file.size / 1024;
  const size = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(kb))} KB`;
  return `${file.name} (${size})`;
}

/** "2026-01-04" -> "4 January 2026". Blank stays blank. */
export function formatDate(value: string): string {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Ten digits, optionally with a country code — the same rule the old site's
 * `pattern` attribute enforced, moved here so every form shares one definition.
 *
 * WRITTEN AS A REGEX LITERAL ON PURPOSE
 * -------------------------------------
 * This used to be a double-quoted string: "^(\+\d{1,3}[- ]?)?\d{10}$". In a JS
 * string literal `\+` and `\d` are not recognised escapes, so they collapse to
 * `+` and `d` and the value became "^(+d{1,3}[- ]?)?d{10}$" — which is not a
 * valid regex at all ("nothing to repeat" at the leading `+`). HTML ignores a
 * `pattern` it cannot compile, silently and with no console warning, so phone
 * validation had been doing nothing on all six forms.
 *
 * Taking `.source` off a literal means the escapes are the regex's, not the
 * string's, and the engine has already proved it compiles.
 */
export const PHONE_PATTERN = /^(\+\d{1,3}[- ]?)?\d{10}$/.source;
export const PHONE_TITLE = "Enter a 10-digit mobile number, with or without +91";
