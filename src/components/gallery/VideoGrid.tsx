import { useCallback, useMemo, useState } from "react";

import { Lightbox, PlayBadge, type LightboxItem } from "@/components/gallery/Lightbox";
import { ShowMore, useProgressive } from "@/components/gallery/ShowMore";
import { Reveal } from "@/components/ui";
import { youtubeThumb, type GalleryVideo } from "@/data/gallery";
import { cn } from "@/lib/utils";

/**
 * VIDEO GRID
 * ==========
 * Thumbnails only. Fifty iframes on one page would cost several megabytes and
 * a third-party script per tile before a visitor pressed anything; a tile here
 * is one 320x180 JPEG, lazy-loaded, and the player is mounted inside the viewer
 * only once play is actually pressed. Eight tiles show first and four more per
 * press, so an unopened gallery costs eight images.
 *
 * No caption under a tile, deliberately. YouTube's thumbnail already carries
 * the real Marathi headline burnt into the frame — which is the line a farmer
 * actually reads. The title is kept in the data as the accessible name.
 *
 * DEAD VIDEOS
 * -----------
 * When a video is deleted or made private, its thumbnail does not fail in a way
 * the browser notices: YouTube answers 404 but puts a grey 120x90 placeholder
 * JPEG in the body, and the browser paints it. The tile then reads as a blank
 * grey box with a play button on it — which is exactly what the old site's
 * gallery looks like today.
 *
 * So the check is on the size that arrives, not on the request failing. A real
 * mqdefault is 320px wide; the placeholder is 120px. Anything that small is
 * dropped from the grid, and from the set handed to the viewer, so the arrows
 * never walk into a video that is not there.
 *
 * This is a safety net, not the plan. The ids are swept in src/data/gallery.ts
 * — six had already died and were removed there.
 */

/** Below this width the response is YouTube's placeholder, not a thumbnail. */
const PLACEHOLDER_MAX_WIDTH = 200;

export function VideoGrid({
  videos,
  className,
  /* The grid cannot know what ground it was dropped on, so the section says. */
  tone = "light",
}: {
  videos: GalleryVideo[];
  className?: string;
  tone?: "light" | "onDark";
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState<ReadonlySet<string>>(() => new Set());

  const markUnavailable = useCallback((id: string) => {
    setUnavailable((previous) => {
      if (previous.has(id)) return previous;
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  }, []);

  /* The grid, the counter and the viewer all read this one list, so an index
     means the same thing to each of them. */
  const available = useMemo(
    () => videos.filter((video) => !unavailable.has(video.id)),
    [videos, unavailable],
  );

  const { visible, fullyShown, stepped, remaining, showMore, showLess, anchorRef } =
    useProgressive(available);

  const items = useMemo<LightboxItem[]>(
    () =>
      available.map((video) => ({
        kind: "video",
        id: video.id,
        youtubeId: video.youtubeId,
        label: video.label,
      })),
    [available],
  );

  return (
    <div ref={anchorRef} className={cn("scroll-mt-28", className)}>
      <ul
        id="video-grid"
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        aria-label="Video gallery"
      >
        {visible.map((video, index) => (
          <Reveal as="li" key={video.id} delay={Math.min(index % 4, 3) * 0.05}>
            <button
              type="button"
              onClick={() => setOpenAt(index)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-black transition-all duration-400 [transition-timing-function:var(--ease-expressive)] hover:shadow-card motion-safe:hover:-translate-y-1"
            >
              <span className="block aspect-video w-full">
                <img
                  src={youtubeThumb(video.youtubeId, "sm")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onLoad={(event) => {
                    if (event.currentTarget.naturalWidth <= PLACEHOLDER_MAX_WIDTH) {
                      markUnavailable(video.id);
                    }
                  }}
                  onError={() => markUnavailable(video.id)}
                  className="size-full object-cover transition-all duration-700 [transition-timing-function:var(--ease-expressive)] group-hover:opacity-75 motion-safe:group-hover:scale-105"
                />
              </span>

              <span className="absolute inset-0 grid place-items-center">
                <PlayBadge />
              </span>

              <span className="sr-only">Play {video.label}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      {stepped ? (
        <ShowMore
          className="mt-10"
          controls="video-grid"
          tone={tone}
          fullyShown={fullyShown}
          remaining={remaining}
          onMore={showMore}
          onLess={showLess}
        />
      ) : null}

      {openAt !== null && openAt < items.length ? (
        <Lightbox
          items={items}
          startIndex={openAt}
          onClose={() => setOpenAt(null)}
          /* The card's play button was the play press — honour it. */
          autoplayVideo
        />
      ) : null}
    </div>
  );
}
