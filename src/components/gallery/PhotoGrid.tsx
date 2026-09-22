import { Expand } from "lucide-react";
import { useMemo, useState } from "react";

import { Lightbox, type LightboxItem } from "@/components/gallery/Lightbox";
import { ShowMore, useProgressive } from "@/components/gallery/ShowMore";
import { Reveal } from "@/components/ui";
import type { GalleryPhoto } from "@/data/gallery";
import { cn } from "@/lib/utils";

/**
 * PHOTO GRID
 * ==========
 * Four across on a laptop, two on a phone, every tile the same 4:3 — a ragged
 * masonry would fight the rest of the site, which is built on one card shape
 * repeated.
 *
 * Each tile is a <button>, not a link: it opens the viewer in place rather than
 * navigating, so a visitor never loses their place on the page.
 *
 * Eight tiles show first, then four per press. The viewer is always handed the
 * whole set regardless of how many tiles are out — a visitor who opens the
 * first photograph can walk to the last with the arrows without pressing "view
 * more" first. That works because the visible tiles are a prefix of the full
 * list, so a tile's position in the grid is its position in the viewer.
 */
export function PhotoGrid({ photos, className }: { photos: GalleryPhoto[]; className?: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const { visible, fullyShown, stepped, remaining, showMore, showLess, anchorRef } =
    useProgressive(photos);

  const items = useMemo<LightboxItem[]>(
    () =>
      photos.map((photo) => ({
        kind: "image",
        id: photo.id,
        src: photo.src,
        alt: photo.alt,
        caption: photo.caption,
      })),
    [photos],
  );

  return (
    <div ref={anchorRef} className={cn("scroll-mt-28", className)}>
      <ul
        id="photo-grid"
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        aria-label="Photo gallery"
      >
        {visible.map((photo, index) => (
          <Reveal as="li" key={photo.id} delay={Math.min(index % 4, 3) * 0.05}>
            <button
              type="button"
              onClick={() => setOpenAt(index)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-ink-100 transition-all duration-400 [transition-timing-function:var(--ease-expressive)] hover:shadow-card motion-safe:hover:-translate-y-1"
            >
              <span className="block aspect-[4/3] w-full">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:scale-[1.07]"
                />
              </span>

              {/* Wash and icon, both only on hover — a permanent scrim would
                  dull twenty photographs at once. */}
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-forest-800 opacity-0 backdrop-blur transition-all duration-400 [transition-timing-function:var(--ease-expressive)] group-hover:opacity-100 motion-safe:translate-y-2 motion-safe:group-hover:translate-y-0"
              >
                <Expand className="size-4" />
              </span>

              <span className="sr-only">Open photograph: {photo.caption}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      {stepped ? (
        <ShowMore
          className="mt-10"
          controls="photo-grid"
          fullyShown={fullyShown}
          remaining={remaining}
          onMore={showMore}
          onLess={showLess}
        />
      ) : null}

      {openAt !== null ? (
        <Lightbox items={items} startIndex={openAt} onClose={() => setOpenAt(null)} />
      ) : null}
    </div>
  );
}
