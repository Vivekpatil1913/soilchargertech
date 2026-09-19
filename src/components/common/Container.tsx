import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** "wide" for full-bleed feature bands, "narrow" for reading columns. */
  width?: "default" | "wide" | "narrow";
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-[82rem]",
  wide: "max-w-[92rem]",
} as const;

/**
 * The only element that owns horizontal gutters. Side padding is set here and
 * nowhere else, which is what guarantees a 20px+ gutter at every breakpoint and
 * keeps the page from ever scrolling sideways.
 */
export function Container({ children, className, as: Tag = "div", width = "default" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-7 lg:px-10", widths[width], className)}>
      {children}
    </Tag>
  );
}
