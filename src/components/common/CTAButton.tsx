import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text" | "onDark" | "inverse" | "ghostOnDark";
type Size = "md" | "lg";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const base =
  "group/cta inline-flex items-center justify-center gap-2.5 rounded-full font-semibold " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-300 " +
  "[transition-timing-function:var(--ease-out-soft)] " +
  "motion-safe:hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_10px_28px_-12px_var(--color-brand-700)] hover:bg-brand-700 hover:shadow-[0_18px_38px_-14px_var(--color-brand-700)]",
  secondary:
    "border border-brand-200 bg-white/70 text-brand-800 backdrop-blur hover:border-brand-500 hover:bg-white hover:text-brand-700",
  onDark:
    "border border-white/25 bg-white/10 text-white backdrop-blur hover:border-white/50 hover:bg-white/20",
  /* Primary action sitting on a dark band — white fill, brand-coloured label.
     A variant rather than a className override, because overriding `text-white`
     from `primary` is decided by stylesheet order and silently loses, which is
     how this button once ended up white-on-white. */
  inverse:
    "bg-white text-brand-800 shadow-[0_10px_28px_-14px_rgb(0_0_0/0.55)] hover:bg-cream-100 hover:text-brand-900",
  /* Secondary action on a dark band: no fill until hovered. */
  ghostOnDark:
    "border border-transparent bg-transparent text-white hover:border-white/35 hover:bg-white/10",
  text: "text-brand-700 hover:text-brand-800",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

/**
 * The single button in the system. Every call to action on the site renders
 * through here, so hover, focus and the arrow micro-interaction stay identical
 * everywhere.
 *
 * Note on `className`: it is appended, not merged. Passing a display utility
 * such as `hidden` will NOT reliably beat the `inline-flex` in `base`, because
 * between two utilities of the same property the stylesheet order wins rather
 * than the order in the class attribute. To show or hide a CTA responsively,
 * wrap it in an element that carries the visibility classes.
 */
export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = true,
  ...rest
}: CTAButtonProps) {
  const isText = variant === "text";
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], isText ? "px-0 py-1 text-[0.95rem]" : sizes[size], className)}
      {...rest}
    >
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover/cta:translate-x-1"
        />
      ) : null}
    </Link>
  );
}
