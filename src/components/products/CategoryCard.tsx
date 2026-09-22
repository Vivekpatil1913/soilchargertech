import { ArrowUpRight, Package } from "lucide-react";
import type { CSSProperties } from "react";

import { NoTranslate } from "@/components/common/NoTranslate";
import { Card } from "@/components/ui";
import type { Category } from "@/data/products";
import { categoryImage, productRanges } from "@/data/products";
import { cn } from "@/lib/utils";
import Image from "@/shims/Image";
import Link from "@/shims/Link";

/**
 * CATEGORY CARD
 * =============
 * One of the 21 categories: a pack photograph on canvas, the range and group it
 * belongs to, the name, one line of benefit, the published dosage, and the
 * count of products inside.
 *
 * WHY THE DOSAGE IS ON THE CARD
 * -----------------------------
 * A farmer comparing categories is not asking about mode of action. He is
 * asking how much to put and what it comes in. SCT publishes both, so both
 * appear before the click rather than a page deep. No competitor site reviewed
 * for this project does that — they stop at a name and a photograph.
 *
 * Dosage lines are long ("2–3 ml per litre, 1 to 2 times a day") and a category
 * may carry three. They scroll rather than wrap, which would leave cards in the
 * same row at different heights.
 *
 * PUT THIS CARD IN A `min-w-0` GRID OR FLEX ITEM
 * ----------------------------------------------
 * The dosage track below is `white-space: nowrap`, so the card's min-content
 * width is the full length of the longest dosage line — about 950px. A grid
 * item defaults to `min-width: auto`, which is that min-content width, so the
 * column grows to 950px and the card runs off the side of a phone. The site
 * clips horizontal overflow at the root, so it fails silently: no scrollbar,
 * just a card with its right half cut off. `min-w-0` on the item lets the
 * column take the space it actually has and the marquee clip as intended.
 */
export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  const range = productRanges[category.range];
  const isVedic = category.range === "vedic";

  /* Duplicated deliberately: -50% only loops seamlessly when the track holds
     the content twice. */
  const chips = category.dosage.map((line) => `${line.label} · ${line.value}`);
  const track = chips.length > 0 ? [...chips, ...chips] : [];

  return (
    <Card className={cn("", className)}>
      {/* White behind the pack. The recovered photographs were flattened onto
          white, so any tinted panel frames each one in a visible rectangle.
          4:3 rather than the square the source files are, purely to keep the
          card short; `object-contain` still shows every pack whole, and
          because all the photographs share one canvas the packs stay the same
          visual size as each other across a row. */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-ink-100 bg-white">
        <Image
          src={categoryImage(category)}
          alt={`${category.name} product pack`}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 320px"
          className="object-contain p-3 transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
        />

        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
            isVedic
              ? "bg-forest-800 text-white"
              : "bg-harvest-400 text-forest-950",
          )}
        >
          <NoTranslate>{range.name}</NoTranslate>
        </span>

        {category.skus.length > 0 ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white/90 px-2 py-1 text-[10px] font-semibold tabular-nums text-ink-600 backdrop-blur-sm">
            <Package aria-hidden className="size-3" />
            {category.skus.length}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-meta text-ink-400">{category.group}</p>

        <h3 className="mt-2 font-display text-[0.98rem] font-semibold leading-snug text-ink-900">
          {/* The whole card is clickable, but the link sits on the name so a
              screen reader announces it, not "read more". */}
          <Link href={`/products/${category.slug}`} className="after:absolute after:inset-0">
            <NoTranslate>{category.name}</NoTranslate>
          </Link>
        </h3>

        <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-500">{category.summary}</p>

        {track.length > 0 ? (
          <div className="marquee mt-3.5 h-6">
            <div
              className="marquee-track h-full items-center gap-1.5 pr-2"
              style={{ "--dur": "26s" } as CSSProperties}
            >
              {track.map((chip, index) => (
                <span
                  key={`${chip}-${index}`}
                  className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-forest-100 bg-forest-50 px-2.5 py-0.5 text-[11px] font-semibold text-forest-800"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-3.5 text-[11px] text-ink-400">Dosage on request — call the SCT team.</p>
        )}

        <span className="mt-3.5 inline-flex items-center gap-1 border-t border-ink-100 pt-3 text-xs font-semibold text-forest-700">
          View products
          <ArrowUpRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Card>
  );
}
