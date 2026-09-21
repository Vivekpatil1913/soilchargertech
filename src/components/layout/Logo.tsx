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
 * SIZE IS DELIBERATE
 * ------------------
 * The client asked specifically for the logo to carry real presence, as it did
 * on the old site. It is roughly 100px tall on desktop — large for a header,
 * and the header's own height is set from it rather than the other way round.
 * `object-contain` guarantees the aspect ratio is never distorted.
 */

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Soil Charger Technology — go to homepage"
      className={cn(
        "relative block shrink-0 transition-transform duration-300 [transition-timing-function:var(--ease-expressive)] motion-safe:hover:scale-[1.03]",
        compact
          ? "h-[3.5rem] w-[3.7rem]"
          : "h-[4.25rem] w-[4.5rem] sm:h-[5.25rem] sm:w-[5.5rem] lg:h-[6rem] lg:w-[6.35rem]",
        className,
      )}
    >
      <Image
        src="/logo/soillogo.jpg"
        alt="Soil Charger Technology"
        fill
        priority
        sizes="(max-width: 640px) 72px, (max-width: 1024px) 88px, 102px"
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
