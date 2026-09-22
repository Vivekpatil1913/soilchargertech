import { motion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * UI PRIMITIVES
 * =============
 * Deliberately few. Every section on the site is built from these, which is
 * what keeps a long page reading as one document rather than as a stack of
 * separately-designed blocks.
 *
 * The anatomy follows docs/design-reference-ngn.md:
 *
 *   Section   a ground + even vertical rhythm, nothing else
 *   Heading   eyebrow · serif title · gold rule · lead — always in that order
 *   Card      a hairline border and a whisper of elevation, never a shadow
 *   Button    a pill; solid forest for primary, outline for everything else
 *
 * Nothing here has a hover effect larger than 2px of travel.
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
   SECTION
   --------------------------------------------------------------------------
   Grounds alternate down the page — canvas, white, canvas, forest — which is
   what gives a long page chapters. The gradient grounds are almost invisible
   by design: they produce a seam, not a colour change.
   ========================================================================== */

export type Ground = "light" | "canvas" | "canvasDown" | "forest" | "forestDeep";

const GROUND_CLASS: Record<Ground, string> = {
  light: "ground-light",
  canvas: "ground-canvas",
  canvasDown: "ground-canvas-down",
  forest: "ground-forest",
  forestDeep: "ground-forest-deep",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Points at the heading that names this section, for screen readers. */
  labelledBy?: string;
  ground?: Ground;
  /** `sm` for a subordinate band — a stat strip, a breadcrumb bar. */
  rhythm?: "default" | "sm" | "none";
  className?: string;
};

export function Section({
  children,
  id,
  labelledBy,
  ground = "light",
  rhythm = "default",
  className,
}: SectionProps) {
  const isDark = ground === "forest" || ground === "forestDeep";

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        rhythm === "default" ? "section-y" : rhythm === "sm" ? "section-y-sm" : "",
        GROUND_CLASS[ground],
        isDark && "grain overflow-hidden",
        className,
      )}
    >
      {isDark ? (
        <>
          {/* Seats the dark band against the light section above it. */}
          <span aria-hidden className="edge-harvest" />
          <span aria-hidden className="grain-layer" />
        </>
      ) : null}
      {children}
    </section>
  );
}

/* ==========================================================================
   EYEBROW — the uppercase label above a heading
   ========================================================================== */

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "onDark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-eyebrow",
        tone === "onDark" ? "text-harvest-400" : "text-harvest-700",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ==========================================================================
   HEADING — every section opens with one of these, never anything else
   --------------------------------------------------------------------------
   The gold rule under the title is the site's signature mark. It belongs to a
   heading and appears nowhere else; the moment it decorates something that is
   not a heading it stops meaning anything.
   ========================================================================== */

type HeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** `onDark` flips the type colours; the layout is identical. */
  tone?: "light" | "onDark";
  as?: "h1" | "h2";
  /** The gold rule. On by default — turn it off inside a card. */
  rule?: boolean;
  className?: string;
};

export function Heading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  rule = true,
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
          <Eyebrow tone={tone} className="mb-3">
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <Tag
          id={id}
          className={cn(Tag === "h1" ? "text-h1" : "text-h2", onDark ? "text-white" : "text-ink-900")}
        >
          {title}
        </Tag>
        {rule ? (
          <span
            aria-hidden
            className={cn("rule-harvest mt-3", centered && "mx-auto bg-none!")}
            style={
              centered
                ? {
                    // Centred, the one-sided fade reads as a mistake, so the
                    // rule fades at both ends instead.
                    backgroundImage:
                      "linear-gradient(to right, transparent, var(--color-harvest-400), transparent)",
                  }
                : undefined
            }
          />
        ) : null}
      </Reveal>

      {lead ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "text-lead mt-5 max-w-2xl",
              centered && "mx-auto",
              onDark ? "text-forest-100/80" : "text-ink-500",
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
   One movement, one duration. `viewport.once` means it never replays on
   scroll-back, which is what keeps a long page calm on the way back up.
   The travel is 14px, not 22 — at this type size anything more reads as the
   page assembling itself.
   ========================================================================== */

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 14 },
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
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0, 0, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ==========================================================================
   BUTTON
   --------------------------------------------------------------------------
   Renders an <a> for external, tel: and mailto: targets and a router link for
   internal paths — the shim decides which.
   ========================================================================== */

type ButtonVariant = "primary" | "secondary" | "harvest" | "onDark" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-forest-800 text-white shadow-glow-green hover:bg-forest-700",
  secondary: "border border-ink-200 bg-white text-forest-800 hover:border-forest-500 hover:text-forest-700",
  harvest: "bg-harvest-400 text-forest-950 hover:bg-harvest-300",
  onDark: "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  ghost: "text-forest-700 hover:text-forest-900",
};

const SIZE = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
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
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200",
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
  tone?: "light" | "canvas" | "glass";
  as?: ElementType;
  lift?: boolean;
  /** For cards that are also in-page anchor targets. */
  id?: string;
}) {
  const TONE = {
    light: "border border-ink-100 bg-white shadow-soft",
    canvas: "border border-ink-100 bg-canvas-50",
    glass: "border border-white/12 bg-white/[0.06] backdrop-blur-sm",
  } as const;

  const HOVER = {
    light: "hover:border-forest-200 hover:shadow-card",
    canvas: "hover:border-forest-200 hover:bg-white",
    glass: "hover:border-harvest-400/40 hover:bg-white/[0.1]",
  } as const;

  return (
    <Tag
      id={id}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300",
        TONE[tone],
        lift && HOVER[tone],
        lift && "motion-safe:hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ==========================================================================
   SMALL PARTS
   ========================================================================== */

/** A pill label — a range name, a category count, a provisional flag. */
export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "forest" | "harvest" | "onDark";
  className?: string;
}) {
  const TONE = {
    neutral: "border-ink-200 bg-ink-50 text-ink-600",
    forest: "border-forest-200 bg-forest-50 text-forest-800",
    harvest: "border-harvest-200 bg-harvest-50 text-harvest-800",
    onDark: "border-white/15 bg-white/10 text-forest-100",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The numbered marker beside a benefit or a step. The reference uses a small
 * gold disc rather than a large ghost numeral — it sits inside the text block
 * instead of behind it, which is what keeps a dense list readable.
 */
export function StepMark({
  value,
  tone = "harvest",
  className,
}: {
  value: string | number;
  tone?: "harvest" | "forest" | "onDark";
  className?: string;
}) {
  const TONE = {
    harvest: "border-harvest-200 bg-harvest-100 text-harvest-800",
    forest: "border-forest-200 bg-forest-50 text-forest-800",
    onDark: "border-harvest-400/30 bg-harvest-400/15 text-harvest-300",
  } as const;

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums",
        TONE[tone],
        className,
      )}
    >
      {value}
    </span>
  );
}

/** A labelled figure. Used in the stat strip and on the about page. */
export function Stat({
  value,
  label,
  caption,
  tone = "light",
}: {
  value: ReactNode;
  label: string;
  caption?: string;
  tone?: "light" | "onDark";
}) {
  const onDark = tone === "onDark";
  return (
    <div>
      <p
        className={cn(
          "font-display text-2xl font-bold tabular-nums sm:text-3xl",
          onDark ? "text-harvest-400" : "text-forest-800",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "text-meta mt-2",
          onDark ? "text-white/65" : "text-ink-500",
        )}
      >
        {label}
      </p>
      {caption ? (
        <p className={cn("mt-1.5 text-xs", onDark ? "text-white/45" : "text-ink-400")}>{caption}</p>
      ) : null}
    </div>
  );
}

/**
 * The empty / awaiting-content state. Dashed, never a solid card — a reader
 * should be able to tell at a glance that nothing is missing from the design,
 * only from the data.
 */
export function Placeholder({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "rounded-2xl border border-dashed border-ink-200 px-6 py-12 text-center text-sm text-ink-400",
        className,
      )}
    >
      {children}
    </p>
  );
}
