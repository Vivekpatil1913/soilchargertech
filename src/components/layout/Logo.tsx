import { cn } from "@/lib/utils";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * SCT BRAND LOCKUP
 * ================
 * The client's logo file exactly as supplied — no redraw, no recolour, no crop.
 * The artwork already contains the full lockup (sprout mark, saffron and green
 * arcs, and the wordmark), so nothing is set beside it that would compete.
 *
 * It is sized to the bar rather than the other way round. The previous design
 * ran the mark near 100px tall and grew the header to hold it; at that size
 * the logo stops reading as a mark and starts reading as a banner, and it
 * pushes the first line of every page below the fold on a phone. ~56px on
 * desktop is prominent without taking the page over.
 *
 * `object-contain` guarantees the aspect ratio is never distorted.
 */

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Soil Charger Technology — go to homepage"
      className={cn(
        "relative block shrink-0 transition-opacity duration-200 hover:opacity-85",
        compact ? "h-11 w-12" : "h-12 w-[3.3rem] lg:h-14 lg:w-[3.85rem]",
        className,
      )}
    >
      <Image
        src="/logo/soillogo.jpg"
        alt="Soil Charger Technology"
        fill
        priority
        sizes="(max-width: 1024px) 52px, 62px"
        className="object-contain"
      />
    </Link>
  );
}

/** Just the artwork, filling whatever box its parent gives it. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative block size-full", className)}>
      <Image src="/logo/soillogo.jpg" alt="" fill sizes="120px" className="object-contain" />
    </span>
  );
}
