import { motion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * UI PRIMITIVES
 * =============
 * Deliberately few. Every section on the site is built from these six, which
 * is what keeps the page reading as one system rather than as a stack of
 * separately-designed blocks.
 */

/* ==========================================================================
   SHELL — the only element that owns horizontal gutters
   ========================================================================== */

type ShellProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "default" | "wide" | "narrow";
};

export function Shell({ children, className, as: Tag = "div", size = "default" }: ShellProps) {
  const width = size === "wide" ? "shell-wide" : size === "narrow" ? "shell-narrow" : "shell";
  return <Tag className={cn(width, className)}>{children}</Tag>;
}

/* ==========================================================================
   SECTION — ground, vertical rhythm and optional texture in one place
   ========================================================================== */

type Ground = "light" | "tint" | "forest" | "soil";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Points at the heading that names this section, for screen readers. */
  labelledBy?: string;
  ground?: Ground;
  className?: string;
  /** Texture layers. Only meaningful on the dark grounds. */
  fx?: boolean;
};

const GROUND_CLASS: Record<Ground, string> = {
  light: "ground-light",
  tint: "ground-tint",
  forest: "ground-forest",
  soil: "ground-soil",
};

export function Section({
  children,
  id,
  labelledBy,
  ground = "light",
  className,
  fx = false,
}: SectionProps) {
  const isDark = ground === "forest" || ground === "soil";

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section-y relative", GROUND_CLASS[ground], className)}
    >
      {fx && isDark ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 fx-mesh" />
          <div className="absolute inset-0 fx-streaks opacity-70" />
          <div className="absolute inset-0 fx-dots opacity-60" />
          <div
            className={cn(
              "bloom bloom-a absolute -left-40 -top-32 size-[34rem]",
              ground === "forest" ? "bg-brand-500/25" : "bg-earth-600/30",
            )}
          />
          <div
            className={cn(
              "bloom bloom-b absolute -bottom-40 -right-32 size-[30rem]",
              ground === "forest" ? "bg-leaf-500/15" : "bg-saffron-500/15",
            )}
          />
        </div>
      ) : null}

      <div className="relative">{children}</div>
    </section>
  );
}

/* ==========================================================================
   HEADING — every section opens with one of these, never anything else
   ========================================================================== */

type HeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** `onDark` flips the type colours; the layout is identical. */
  tone?: "light" | "onDark";
  accent?: "brand" | "saffron";
  as?: "h1" | "h2";
  className?: string;
};

export function Heading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  accent = "brand",
  as: Tag = "h2",
  className,
}: HeadingProps) {
  const centered = align === "center";
  const onDark = tone === "onDark";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p
            className={cn(
              "text-eyebrow inline-flex items-center gap-2",
              onDark
                ? accent === "brand"
                  ? "text-leaf-400"
                  : "text-saffron-300"
                : accent === "brand"
                  ? "text-brand-700"
                  : "text-saffron-700",
            )}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-current" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <Tag
          id={id}
          className={cn(
            Tag === "h1" ? "text-h1" : "text-h2",
            eyebrow ? "mt-4" : "",
            onDark ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-lead mt-5 max-w-2xl",
              centered ? "mx-auto" : "",
              onDark ? "text-sage-300/85" : "text-ink-500",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   REVEAL — the only scroll animation on the site
   --------------------------------------------------------------------------
   One movement, one duration, used sparingly. `viewport.once` means a reveal
   never replays on scroll-back, which is what makes repeated visits to a long
   page feel calm rather than busy.

   `amount` MUST STAY "some"
   -------------------------
   "some" is IntersectionObserver threshold 0 — any part of the element, however
   small. A fractional threshold is unreachable for anything taller than the
   viewport: an element 4x the viewport height tops out at an intersection ratio
   of 0.25, and one 10x as tall tops out at 0.1. This used to be `amount: 0.15`,
   which meant any section taller than about 6.5 viewports would never cross the
   threshold and would sit at opacity 0 permanently. The negative bottom margin,
   not the threshold, is what holds the reveal back until the element has
   properly entered.

   (This rule was previously documented in lib/animations.ts, alongside a motion
   vocabulary that nothing on the site ever imported. That file is gone; the
   rule is here, next to the only code it governs.)
   ========================================================================== */

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some", margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ==========================================================================
   BUTTON
   --------------------------------------------------------------------------
   Three variants, two sizes. Renders an <a> for external/tel/mailto and a
   router link for internal paths — the shim decides.
   ========================================================================== */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "md" | "lg";
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

/**
 * `primary` sits on brand-700, not brand-600.
 *
 * Measured against white at this label size (~15px bold, which is not WCAG
 * "large text"): 600 gives 3.57:1 and 500 gives 3.38:1 — both below AA — so
 * the old resting/hover pair failed, and hovering made it worse. 700 is
 * 5.41:1 and 800 is 7.76:1, so hover now increases contrast.
 */
const VARIANT: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-700 text-white shadow-brand-glow hover:bg-brand-800 motion-safe:hover:-translate-y-0.5",
  secondary:
    "border border-brand-200 bg-white text-brand-800 hover:border-brand-400 hover:text-brand-700 motion-safe:hover:-translate-y-0.5",
  ghost: "text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline",
  onDark:
    "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 motion-safe:hover:-translate-y-0.5",
};

const SIZE = {
  md: "px-6 py-3 text-[0.9rem]",
  lg: "px-7 py-4 text-[0.95rem]",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  const isGhost = variant === "ghost";
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 [transition-timing-function:var(--ease-expressive)]",
        isGhost ? "gap-1.5" : SIZE[size],
        VARIANT[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* ==========================================================================
   CARD — the one card shell every grid on the site uses
   ========================================================================== */

export function Card({
  children,
  className,
  tone = "light",
  as: Tag = "article",
  lift = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "glass";
  as?: ElementType;
  lift?: boolean;
  /** For cards that are also in-page anchor targets. */
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl transition-all duration-400 [transition-timing-function:var(--ease-expressive)]",
        tone === "glass"
          ? "border border-white/12 bg-white/[0.06] backdrop-blur-sm hover:border-brand-400/45 hover:bg-white/[0.09]"
          : "border border-hairline bg-surface hover:border-brand-300 hover:shadow-card",
        lift ? "motion-safe:hover:-translate-y-1" : "",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** The ghost number used on numbered card sets. */
export function GhostNumber({ value, className }: { value: string | number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute font-display font-extrabold leading-none transition-colors duration-400",
        className,
      )}
    >
      {value}
    </span>
  );
}
