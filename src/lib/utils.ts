/** Join conditional class names without pulling in a dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** "SCT Vedic Root Charger" -> "sct-vedic-root-charger" */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Format a counter value for display, e.g. 1200 -> "1,200". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

/** Strip non-dialable characters so tel: links work from any device. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Build a wa.me link with an optional prefilled message. */
export function whatsappHref(phone: string, message?: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;
}
