import { Check, ChevronDown, Paperclip, X } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * FORM PRIMITIVES
 * ===============
 * Six forms came across from the old site and they share one look, built from
 * the same tokens as the rest of the design system: `hairline` borders, the
 * brand green on focus, `rounded-xl` on controls against `rounded-2xl` on the
 * cards that hold them.
 *
 * WHY THESE EXIST RATHER THAN RAW <input>
 * ---------------------------------------
 * The distributor application alone carries 26 fields. Without a shared field
 * the focus ring, the required marker and the error wording drift apart across
 * six forms, and the whole point of migrating them together was that they stop
 * looking like six different sites.
 *
 * VALIDATION
 * ----------
 * Native, not a library. `required`, `type="email"`, `pattern` — the browser
 * already does this well, translates its own messages, and costs nothing. The
 * only thing added on top is `data-touched`, set on first blur, so a field is
 * not painted red before the visitor has had a chance to fill it in.
 */

/* ==========================================================================
   Shared control styling
   ========================================================================== */

const CONTROL = [
  "w-full rounded-xl border border-hairline bg-white px-4 py-3",
  "text-[0.95rem] text-ink-900 outline-none",
  "transition-[border-color,box-shadow] duration-300 [transition-timing-function:var(--ease-standard)]",
  "placeholder:text-ink-300",
  "focus:border-brand-400 focus:ring-4 focus:ring-brand-500/12",
  // Only after the field has been touched does the browser's :invalid show.
  "data-[touched=true]:invalid:border-earth-600 data-[touched=true]:invalid:ring-earth-600/10",
].join(" ");

function useTouched() {
  const [touched, setTouched] = useState(false);
  return { "data-touched": touched, onBlur: () => setTouched(true) } as const;
}

/* ==========================================================================
   FIELD SHELL — label, required marker, hint, and the control itself
   ========================================================================== */

type FieldShellProps = {
  label: string;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
  children: (id: string) => ReactNode;
};

function FieldShell({ label, required, hint, className, children }: FieldShellProps) {
  const id = useId();
  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-1 text-[0.85rem] font-semibold text-ink-700"
      >
        {label}
        {required ? (
          <span className="text-saffron-600" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children(id)}
      {hint ? <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-400">{hint}</p> : null}
    </div>
  );
}

/* ==========================================================================
   TEXT / EMAIL / TEL / DATE
   ========================================================================== */

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  hint,
  pattern,
  title,
  className,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "date";
  placeholder?: string;
  required?: boolean;
  hint?: ReactNode;
  pattern?: string;
  title?: string;
  className?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  const touched = useTouched();
  return (
    <FieldShell label={label} required={required} hint={hint} className={className}>
      {(id) => (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          title={title}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={CONTROL}
          {...touched}
        />
      )}
    </FieldShell>
  );
}

/* ==========================================================================
   TEXTAREA
   ========================================================================== */

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  hint,
  rows = 4,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: ReactNode;
  rows?: number;
  className?: string;
}) {
  const touched = useTouched();
  return (
    <FieldShell label={label} required={required} hint={hint} className={className}>
      {(id) => (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          className={cn(CONTROL, "resize-y leading-relaxed")}
          {...touched}
        />
      )}
    </FieldShell>
  );
}

/* ==========================================================================
   SELECT
   --------------------------------------------------------------------------
   Native <select>, with the browser arrow suppressed and our own drawn on top.
   Native is the right call on a phone — the OS picker beats any JS listbox for
   a 36-item state list, and it needs no layout work to stay on screen.
   ========================================================================== */

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Choose an option…",
  required,
  hint,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
}) {
  const touched = useTouched();
  return (
    <FieldShell label={label} required={required} hint={hint} className={className}>
      {(id) => (
        <div className="relative">
          <select
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required={required}
            className={cn(CONTROL, "appearance-none pr-11", value ? "text-ink-900" : "text-ink-300")}
            {...touched}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option} className="text-ink-900">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-400"
          />
        </div>
      )}
    </FieldShell>
  );
}

/* ==========================================================================
   FILE
   --------------------------------------------------------------------------
   The native file input is replaced by a styled label, because the default
   control is the one element on a form that cannot be made to match anything
   and looks broken next to everything else.
   ========================================================================== */

export function FileField({
  label,
  file,
  onChange,
  accept,
  required,
  hint,
  className,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
}) {
  const id = useId();

  return (
    <div className={cn("min-w-0", className)}>
      <span className="mb-2 flex items-baseline gap-1 text-[0.85rem] font-semibold text-ink-700">
        {label}
        {required ? (
          <span className="text-saffron-600" aria-hidden>
            *
          </span>
        ) : null}
      </span>

      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3.5",
          "transition-colors duration-300",
          file
            ? "border-brand-300 bg-brand-50/60"
            : "border-hairline bg-sage-50 hover:border-brand-300 hover:bg-brand-50/40",
        )}
      >
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-squircle",
            file
              ? "bg-brand-600 text-white"
              : "bg-white text-ink-400 ring-1 ring-inset ring-hairline",
          )}
        >
          {file ? (
            <Check aria-hidden className="size-4" />
          ) : (
            <Paperclip aria-hidden className="size-4" />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.9rem] font-semibold text-ink-800">
            {file ? file.name : "Choose a file"}
          </span>
          <span className="block text-[0.78rem] text-ink-400">
            {file
              ? `${Math.max(1, Math.round(file.size / 1024))} KB — tap to replace`
              : (accept?.replace(/\./g, "").replace(/,/g, ", ").toUpperCase() ?? "Any file")}
          </span>
        </span>

        {file ? (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              onChange(null);
            }}
            aria-label={`Remove ${file.name}`}
            className="grid size-7 shrink-0 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white hover:text-earth-600"
          >
            <X aria-hidden className="size-4" />
          </button>
        ) : null}

        <input
          id={id}
          type="file"
          accept={accept}
          required={required && !file}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
      </label>

      {hint ? <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-400">{hint}</p> : null}
    </div>
  );
}

/* ==========================================================================
   CHECKBOX GROUP — the enquiry form's product picker
   ========================================================================== */

export function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
  hint,
  className,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (option: string) => void;
  hint?: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="mb-2 text-[0.85rem] font-semibold text-ink-700">{label}</legend>

      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5",
                "transition-colors duration-300",
                checked
                  ? "border-brand-300 bg-brand-50/70"
                  : "border-hairline bg-white hover:border-brand-200 hover:bg-sage-50",
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-200",
                  checked ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 bg-white",
                )}
              >
                {checked ? <Check className="size-3.5" strokeWidth={3} /> : null}
              </span>
              <span className="text-[0.88rem] font-medium text-ink-800">{option}</span>
            </label>
          );
        })}
      </div>

      {hint ? <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-400">{hint}</p> : null}
    </fieldset>
  );
}

/* ==========================================================================
   LAYOUT HELPERS
   ========================================================================== */

/** A titled block inside a long form — the distributor application's four parts. */
export function FormStep({
  index,
  title,
  description,
  children,
}: {
  index: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-hairline pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-squircle bg-brand-50 font-display text-[0.85rem] font-extrabold text-brand-700 ring-1 ring-inset ring-brand-200">
          {index}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-[1.05rem] font-bold leading-tight text-ink-900">
            {title}
          </h3>
          {description ? (
            <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-500">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

/** Two columns above `sm`, one below. The shape every row in these forms wants. */
export function FieldRow({
  children,
  cols = 2,
  className,
}: {
  children: ReactNode;
  cols?: 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-5",
        cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The submit row. Full-width button on a phone, right-aligned above `sm`. */
export function SubmitRow({
  label,
  icon,
  note,
}: {
  label: string;
  icon?: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
      {note ? (
        <p className="max-w-md text-[0.8rem] leading-relaxed text-ink-400">{note}</p>
      ) : (
        <span />
      )}
      <button
        type="submit"
        className="shadow-brand-glow inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-brand-600 px-7 py-4 text-[0.95rem] font-bold text-white transition-all duration-300 [transition-timing-function:var(--ease-expressive)] hover:bg-brand-500 motion-safe:hover:-translate-y-0.5 sm:w-auto"
      >
        {icon}
        {label}
      </button>
    </div>
  );
}

/** The note under every submit button: which fields carry the asterisk. */
export function RequiredNote() {
  return (
    <>
      Fields marked <span className="font-semibold text-saffron-600">*</span> are required.
    </>
  );
}
