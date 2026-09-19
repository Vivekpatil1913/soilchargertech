import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * SCT BRAND LOCKUP
 * ================
 * Uses the client's official logo file exactly as supplied — /logo/sct-logo.png
 * — with no redraw, recolouring or cropping. The artwork already contains the
 * full lockup (sprout mark, saffron and green arcs, and the "Soil Charger
 * Technology" wordmark), so nothing is set alongside it that would duplicate or
 * compete with it.
 *
 * The only thing done to it is scaling, and `object-contain` guarantees the
 * aspect ratio is never distorted at any size.
 */

/** The logo artwork, filling whatever box its parent gives it. */
export function SctMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative block size-full", className)}>
      <Image
        src="/logo/sct-logo.png"
        alt=""
        fill
        sizes="120px"
        className="object-contain"
        priority
      />
    </span>
  );
}

type LogoProps = {
  className?: string;
  /** Kept for call-site clarity; the artwork carries its own white field. */
  tone?: "light" | "onDark";
  /** Slightly smaller lockup, used inside the mobile menu header. */
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Soil Charger Technology — go to homepage"
      className={cn(
        "group relative block shrink-0 transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)] motion-safe:hover:-translate-y-0.5",
        compact ? "h-11 w-[2.9rem]" : "h-12 w-[3.15rem] sm:h-[3.5rem] sm:w-[3.7rem]",
        className,
      )}
    >
      <Image
        src="/logo/sct-logo.png"
        alt="Soil Charger Technology"
        fill
        sizes="(max-width: 640px) 52px, 60px"
        className="object-contain"
        priority
      />
    </Link>
  );
}
