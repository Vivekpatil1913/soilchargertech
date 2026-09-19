import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { productRanges } from "@/data/products";
import { ProductVisual } from "./ProductVisual";
import { cn } from "@/lib/utils";

/**
 * A single product. Renders the real photograph when `product.image` is set and
 * the branded pack artwork when it is not, so the grid stays consistent while
 * SCT's photography is being re-shot.
 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const range = productRanges[product.range];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-[border-color,box-shadow,transform] duration-400 [transition-timing-function:var(--ease-out-soft)] hover:border-brand-200 hover:shadow-lift motion-safe:hover:-translate-y-1.5",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:scale-105"
          />
        ) : (
          <ProductVisual
            product={product}
            className="size-full transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:scale-[1.04]"
          />
        )}

        <span
          className={cn(
            "absolute left-3.5 top-3.5 rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-wide backdrop-blur",
            product.range === "vedic"
              ? "bg-brand-600/90 text-white"
              : "bg-earth-700/90 text-white",
          )}
        >
          {range.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-ink-400">
          {product.category}
        </p>

        <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-ink-900">
          {/* Whole card is clickable, but the link sits on the title so screen
              readers get a meaningful link name rather than "read more". */}
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-ink-500">
          {product.summary}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-brand-700">
          View details
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </article>
  );
}
