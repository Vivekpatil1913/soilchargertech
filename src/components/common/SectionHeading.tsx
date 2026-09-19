import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { ScrollReveal, RevealItem } from "./ScrollReveal";
import { fadeUp } from "@/lib/animations";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Renders the title as an h3 inside pages that already own an h2. */
  as?: "h2" | "h3";
  tone?: "brand" | "saffron" | "earth" | "neutral";
  children?: ReactNode;
};

/**
 * Every section opens with this, which is what gives the page its rhythm:
 * eyebrow, heading, one lead paragraph, optional action — never more.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  as: Tag = "h2",
  tone = "brand",
  children,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <ScrollReveal
      stagger={0.08}
      className={cn("flex flex-col", centered ? "items-center text-center" : "items-start", className)}
    >
      {eyebrow ? (
        <RevealItem variants={fadeUp}>
          <Badge tone={tone}>
            <span aria-hidden className="size-1.5 rounded-full bg-current" />
            {eyebrow}
          </Badge>
        </RevealItem>
      ) : null}

      <RevealItem variants={fadeUp} className={eyebrow ? "mt-5" : undefined}>
        <Tag className={cn("text-h2 text-ink-900", centered && "mx-auto max-w-4xl")}>{title}</Tag>
      </RevealItem>

      {lead ? (
        <RevealItem variants={fadeUp} className="mt-5">
          <p className={cn("text-lead max-w-2xl text-ink-500", centered && "mx-auto")}>{lead}</p>
        </RevealItem>
      ) : null}

      {children ? (
        <RevealItem variants={fadeUp} className="mt-8">
          {children}
        </RevealItem>
      ) : null}
    </ScrollReveal>
  );
}
