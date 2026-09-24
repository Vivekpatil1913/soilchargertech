import { useEffect, useRef, useState } from "react";

import type { SiteVideo } from "@/data/images";
import { cn } from "@/lib/utils";
import Image from "@/shims/Image";

/**
 * LOOPING VIDEO
 * =============
 * A muted clip that plays continuously behind a section, with the poster
 * photograph underneath it. Motion answers "what do these people actually do?"
 * faster than a paragraph can — but this audience is on rural mobile data, so
 * the video is an enhancement that has to earn its bytes:
 *
 *   1. The poster is a real <img>. It paints first, it is what a crawler and a
 *      screen reader get, and on a bad connection it is the whole section.
 *      Nothing below changes that.
 *   2. The clip is requested only once the browser is idle — never competing
 *      with the fonts, the hero image or the first paint.
 *   3. It is skipped entirely — zero bytes — on Save-Data, on anything slower
 *      than 4g, when the visitor has asked for reduced motion, and on a
 *      phone-sized viewport in any browser that will not report a connection
 *      at all (see `videoIsWelcome`).
 *   4. It fades in only once it is genuinely playing, so a stall or a codec
 *      failure degrades to the photograph rather than a black rectangle.
 *
 * There is no audio track in the file at all, which is also why autoplay is
 * allowed to begin without a tap.
 */

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Everything that has to be true before a single video byte is worth fetching. */
function videoIsWelcome() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;

  if (connection?.effectiveType) {
    /* An explicit reading is the best signal there is. Anything below 4g opts
       out regardless of screen size. */
    return connection.effectiveType === "4g";
  }

  /* No reading at all — which is every Safari and every Firefox, so it is the
     majority case on iOS, not an edge one. Treating absence as permission meant
     an iPhone on a weak rural line fetched the clip anyway: 2.2 MB nobody asked
     for, and the poster was already telling the story.
     Screen width is the only proxy left. It is a weak one, but it is honest in
     the direction that matters — a large viewport is far more likely to be a
     laptop on fixed broadband than a phone on mobile data, and a phone-sized
     viewport is exactly the case worth protecting. Below that, the poster
     stands alone, which the section is designed for anyway. */
  return window.matchMedia("(min-width: 1024px)").matches;
}

export function LoopingVideo({ video, sizes }: { video: SiteVideo; sizes?: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoIsWelcome()) return;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      /* The large rendition is for laptops and up; a tablet gets the light one,
         since it is far likelier to be on mobile data. Picking once is enough —
         nobody resizes a phone into a desktop mid-visit, and re-swapping the
         source would restart the loop. */
      setSrc(window.matchMedia("(min-width: 1024px)").matches ? video.lg : video.sm);
    };

    /* Safari only shipped requestIdleCallback in 16.4, so a timeout stands in. */
    const whenIdle = window.requestIdleCallback as typeof window.requestIdleCallback | undefined;
    if (typeof whenIdle === "function") whenIdle(start, { timeout: 2000 });
    else window.setTimeout(start, 600);

    return () => {
      cancelled = true;
    };
  }, [video]);

  /* Safari and low-power mode ignore the autoplay attribute often enough to be
     worth asking directly. A refusal is fine — the poster stays. */
  useEffect(() => {
    if (!src) return;
    void ref.current?.play().catch(() => undefined);
  }, [src]);

  return (
    <>
      <Image
        src={video.poster.src}
        alt={video.poster.alt}
        fill
        priority
        sizes={sizes}
        className="object-cover"
      />

      {src ? (
        <video
          ref={ref}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700 [transition-timing-function:var(--ease-standard)]",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </>
  );
}
