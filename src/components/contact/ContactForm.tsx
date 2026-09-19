"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { contact } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * ENQUIRY FORM
 * ============
 * There is no backend in this project, and inventing an API route that silently
 * discards enquiries would be worse than having no form. So this one composes
 * the visitor's answers into an email addressed to SCT and hands it to their
 * mail client — which works today, on every device, with nothing to deploy.
 *
 * TO WIRE UP A REAL ENDPOINT
 * --------------------------
 * Replace the body of `handleSubmit` with a POST to your API route or form
 * service. The field names, validation and success state below are already in
 * the shape a handler would expect; nothing else needs to change.
 */

type EnquiryType = "farmer" | "dealer" | "professional" | "other";

const ENQUIRY_TYPES: { id: EnquiryType; label: string }[] = [
  { id: "farmer", label: "I am a farmer" },
  { id: "dealer", label: "Dealer / distributor" },
  { id: "professional", label: "Agri professional" },
  { id: "other", label: "Something else" },
];

const field =
  "w-full rounded-xl border border-hairline bg-white px-4 py-3.5 text-[0.95rem] text-ink-900 " +
  "placeholder:text-ink-400 transition-colors focus:border-brand-500 focus:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-brand-200";

export function ContactForm() {
  const [type, setType] = useState<EnquiryType>("farmer");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const label = ENQUIRY_TYPES.find((t) => t.id === type)?.label ?? type;
    const body = [
      `Enquiry type: ${label}`,
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "—"}`,
      `Location: ${data.get("location") || "—"}`,
      `Crop: ${data.get("crop") || "—"}`,
      "",
      "Message:",
      String(data.get("message") ?? ""),
    ].join("\n");

    const subject = `Website enquiry — ${label}`;
    window.location.href = `mailto:${contact.emails.general}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ---- Who is asking ------------------------------------------------- */}
      <fieldset>
        <legend className="text-[0.85rem] font-semibold text-ink-700">
          What brings you here?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ENQUIRY_TYPES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setType(option.id)}
              aria-pressed={type === option.id}
              className={cn(
                "rounded-full border px-4 py-2.5 text-[0.85rem] font-semibold transition-colors duration-250",
                type === option.id
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-hairline bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-[0.85rem] font-semibold text-ink-700">
            Your name <span className="text-saffron-600">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={cn(field, "mt-2")} />
        </div>

        <div>
          <label htmlFor="phone" className="block text-[0.85rem] font-semibold text-ink-700">
            Phone number <span className="text-saffron-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            className={cn(field, "mt-2")}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-[0.85rem] font-semibold text-ink-700">
            Email <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={cn(field, "mt-2")}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-[0.85rem] font-semibold text-ink-700">
            Village / district
          </label>
          <input id="location" name="location" className={cn(field, "mt-2")} />
        </div>
      </div>

      <div>
        <label htmlFor="crop" className="block text-[0.85rem] font-semibold text-ink-700">
          What do you grow?
        </label>
        <input
          id="crop"
          name="crop"
          placeholder="Grapes, onion, sugarcane…"
          className={cn(field, "mt-2")}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[0.85rem] font-semibold text-ink-700">
          How can we help? <span className="text-saffron-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your soil, your crop, and what you are seeing in the field."
          className={cn(field, "mt-2 resize-y")}
        />
      </div>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-600 px-7 py-4 text-[0.95rem] font-semibold text-white transition-[background-color,transform] duration-300 [transition-timing-function:var(--ease-out-soft)] hover:bg-brand-700 motion-safe:hover:-translate-y-0.5 sm:w-auto"
      >
        Send enquiry
        <Send
          aria-hidden
          className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
        />
      </button>

      <p aria-live="polite" className="text-[0.85rem] text-ink-500">
        {sent
          ? `Your email app should have opened with the message ready to send to ${contact.emails.general}. If it did not, call ${contact.phones[0]} instead.`
          : `This form opens your email app with the details filled in, addressed to ${contact.emails.general}. Prefer to talk? Call ${contact.phones[0]}.`}
      </p>
    </form>
  );
}
