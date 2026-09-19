import type { Product } from "@/data/products";
import { SctMark } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

/**
 * BRANDED PRODUCT PACK — STAND-IN ARTWORK
 * =======================================
 * SCT's existing product photographs are hosted on a media server that now
 * returns 404 for every file, so there is no product imagery to carry across.
 * Rather than ship broken images — or stock photographs of somebody else's
 * bottles, which would misrepresent the product — each card draws a pack in the
 * brand's own colours, labelled with the real product name.
 *
 * It is deliberately illustrative, not a depiction of the actual packaging.
 *
 * TO SWITCH TO REAL PHOTOGRAPHY
 * -----------------------------
 * Drop files into /public/images/products/ and set `image` on the product in
 * src/data/products.ts. <ProductCard /> prefers a real photo whenever one is
 * present and this component stops rendering for that product.
 */

const RANGE_STYLES = {
  vedic: {
    field: "from-brand-50 via-brand-100/70 to-cream-100",
    bottle: "from-brand-500 to-brand-800",
    cap: "bg-brand-900",
    accent: "text-brand-700",
  },
  super: {
    field: "from-saffron-50 via-cream-200 to-cream-100",
    bottle: "from-saffron-400 to-earth-700",
    cap: "bg-earth-800",
    accent: "text-earth-700",
  },
} as const;

export function ProductVisual({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const style = RANGE_STYLES[product.range];

  /* "SCT Vedic Root Charger" reads as "Root Charger" on the pack label. */
  const labelName = product.name.replace(/^SCT\s+Vedic\s+/i, "").replace(/^Super\s+/i, "Super ");

  return (
    <div
      role="img"
      aria-label={`Illustrative pack artwork for ${product.name}`}
      className={cn(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br",
        style.field,
        className,
      )}
    >
      {/* Faint brand watermark behind the pack */}
      <div aria-hidden className="absolute -right-8 -top-8 size-44 opacity-[0.07]">
        <SctMark />
      </div>
      <div aria-hidden className="absolute inset-0 grain-layer opacity-40" />

      {/* Pack */}
      <div className="relative flex h-[72%] w-[40%] min-w-[5.5rem] flex-col items-center">
        <span aria-hidden className={cn("h-[7%] w-[34%] rounded-t-md", style.cap)} />
        <span
          aria-hidden
          className={cn(
            "flex w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-t-2xl rounded-b-lg bg-gradient-to-b px-1.5 shadow-lift",
            style.bottle,
          )}
        >
          {/* Label band */}
          <span className="flex w-full flex-col items-center gap-1 rounded-sm bg-white/95 px-1.5 py-2.5 text-center">
            <span className="size-5">
              <SctMark />
            </span>
            <span
              className={cn(
                "font-display text-[0.5rem] font-extrabold uppercase leading-[1.15] tracking-tight sm:text-[0.56rem]",
                style.accent,
              )}
            >
              {labelName}
            </span>
          </span>
        </span>
      </div>

      <span className="absolute bottom-2.5 right-3 rounded-full bg-white/80 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide text-ink-400 backdrop-blur">
        Pack artwork pending
      </span>
    </div>
  );
}
