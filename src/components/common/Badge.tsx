import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "saffron" | "earth" | "neutral";
};

const tones = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  saffron: "bg-saffron-50 text-saffron-700 ring-saffron-200",
  earth: "bg-earth-50 text-earth-700 ring-earth-200",
  neutral: "bg-cream-200 text-ink-600 ring-cream-300",
} as const;

export function Badge({ children, className, tone = "brand" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small marker used wherever copy is awaiting SCT's sign-off. */
export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 flex items-start gap-2 rounded-md border border-dashed border-saffron-300 bg-saffron-50/70 px-3.5 py-2.5 text-xs leading-relaxed text-saffron-700">
      <span aria-hidden className="mt-px font-bold">
        ⌖
      </span>
      <span>{children}</span>
    </p>
  );
}
