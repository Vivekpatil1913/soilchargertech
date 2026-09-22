import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import { youtubeEmbed, youtubeThumb } from "@/data/gallery";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";

/**
 * LIGHTBOX
 * ========
 * One viewer for both galleries. A photograph and a video open in the same
 * box, with the same chrome — counter, zoom, rotate, slideshow, fullscreen,
 * arrows, caption, and a thumbnail rail along the bottom that doubles as the
 * index.
 *
 * Video plays inside the box rather than sending the visitor to YouTube. The
 * iframe is only mounted once play is pressed — or immediately, when the
 * viewer was opened from a video card, because that click *was* the play
 * press. So a photo gallery never loads a player, and a farmer on mobile data
 * never pays for one he did not ask for.
 *
 * Built by hand rather than with lightGallery or PhotoSwipe. Those ship 40-60KB
 * plus their own stylesheet and theming layer, and this needs eight buttons and
 * a rail — the bundle cost is the whole argument.
 *
 * Interaction contract:
 *   Esc            close            ← →    previous / next
 *   + −            zoom             drag   pan, once zoomed
 *   swipe          previous / next on touch, while unzoomed
 *   click backdrop close
 */

export type LightboxItem =
  | { kind: "image"; id: string; src: string; alt: string; caption?: string }
  | { kind: "video"; id: string; youtubeId: string; label: string };

type LightboxProps = {
  items: LightboxItem[];
  startIndex: number;
  onClose: () => void;
  /** True when the viewer was opened by pressing play on a video card. */
  autoplayVideo?: boolean;
};

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.5;
const SLIDESHOW_MS = 4500;
/** Horizontal travel that counts as a swipe rather than a tap. */
const SWIPE_PX = 55;

export function Lightbox({ items, startIndex, onClose, autoplayVideo = false }: LightboxProps) {
  const total = items.length;
  const [current, setCurrent] = useState(() => Math.min(Math.max(startIndex, 0), total - 1));
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [slideshow, setSlideshow] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  /** Id of the video whose player is mounted. Null means nothing is playing. */
  const [playing, setPlaying] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  /** Set by a swipe so the click that follows it does not also close. */
  const swiped = useRef(false);

  const item = items[current];
  const isVideo = item?.kind === "video";
  const activeId = item?.id;

  const go = useCallback(
    (direction: 1 | -1) => setCurrent((index) => (index + direction + total) % total),
    [total],
  );

  const zoomBy = useCallback((delta: number) => {
    setZoom((value) => {
      const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Number((value + delta).toFixed(2))));
      if (next === ZOOM_MIN) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  /* ---- Every slide starts clean ---------------------------------------- */
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
    setPlaying(isVideo && autoplayVideo ? (activeId ?? null) : null);
  }, [activeId, isVideo, autoplayVideo]);

  /* ---- Freeze the page behind, and give focus to the dialog ------------- */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    lockScroll();
    rootRef.current?.focus();

    return () => {
      unlockScroll();
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
      opener?.focus?.();
    };
  }, []);

  /* ---- Keyboard --------------------------------------------------------- */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          /* In fullscreen the browser owns Escape — it leaves fullscreen and
             the viewer stays open, which is what a reader expects. */
          if (document.fullscreenElement) return;
          event.preventDefault();
          onClose();
          break;
        case "ArrowRight":
          event.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          go(-1);
          break;
        case "+":
        case "=":
          zoomBy(ZOOM_STEP);
          break;
        case "-":
          zoomBy(-ZOOM_STEP);
          break;
        case "Tab":
          trapFocus(event, rootRef.current);
          break;
        default:
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, zoomBy]);

  /* ---- Slideshow. A playing video always wins. -------------------------- */
  useEffect(() => {
    if (!slideshow || playing) return;
    const timer = window.setInterval(() => go(1), SLIDESHOW_MS);
    return () => window.clearInterval(timer);
  }, [slideshow, playing, go]);

  /* ---- Fullscreen is toggled here but can also be left by the browser ---- */
  useEffect(() => {
    const sync = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  /* ---- Keep the active thumbnail in view -------------------------------- */
  useEffect(() => {
    const active = stripRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest", inline: "center" });
  }, [current]);

  /* ---- Warm the neighbours so the arrows feel instant -------------------- */
  useEffect(() => {
    for (const step of [1, -1] as const) {
      const neighbour = items[(current + step + total) % total];
      if (neighbour?.kind === "image") {
        const preload = new Image();
        preload.src = neighbour.src;
      }
    }
  }, [current, items, total]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void rootRef.current?.requestFullscreen?.().catch(() => {});
  };

  /* ---- Drag to pan when zoomed, swipe to navigate when not --------------- */
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
    if (zoom > 1) event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current || zoom === 1) return;
    setPan({
      x: drag.current.panX + (event.clientX - drag.current.x),
      y: drag.current.panY + (event.clientY - drag.current.y),
    });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    if (!start) return;

    if (zoom > 1) {
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      return;
    }

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  if (!item) return null;

  const zoomable = item.kind === "image";

  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery viewer"
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex flex-col bg-[#05100a]/[0.97] outline-none backdrop-blur-sm"
    >
      {/* ---- Top bar ------------------------------------------------------ */}
      <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <p className="font-display text-[0.95rem] font-bold tabular-nums text-white/80">
          <span className="text-white">{current + 1}</span>
          <span className="px-1.5 text-white/40">/</span>
          {total}
        </p>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {zoomable ? (
            <>
              <ControlButton
                label="Zoom in"
                icon={ZoomIn}
                onClick={() => zoomBy(ZOOM_STEP)}
                disabled={zoom >= ZOOM_MAX}
              />
              <ControlButton
                label="Zoom out"
                icon={ZoomOut}
                onClick={() => zoomBy(-ZOOM_STEP)}
                disabled={zoom <= ZOOM_MIN}
              />
              <ControlButton
                label="Rotate"
                icon={RotateCw}
                onClick={() => setRotation((value) => value + 90)}
              />
            </>
          ) : null}

          <ControlButton
            label={slideshow ? "Pause slideshow" : "Play slideshow"}
            icon={slideshow ? Pause : Play}
            active={slideshow}
            onClick={() => setSlideshow((value) => !value)}
          />
          <ControlButton
            label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            icon={fullscreen ? Minimize2 : Maximize2}
            onClick={toggleFullscreen}
            className="hidden sm:grid"
          />
          <ControlButton label="Close viewer" icon={X} onClick={onClose} />
        </div>
      </div>

      {/* ---- Stage --------------------------------------------------------- */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
        onClick={(event) => {
          if (swiped.current) {
            swiped.current = false;
            return;
          }
          if (event.target === event.currentTarget) onClose();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <NavArrow direction="prev" onClick={() => go(-1)} />
        <NavArrow direction="next" onClick={() => go(1)} />

        {item.kind === "image" ? (
          <img
            key={item.id}
            src={item.src}
            alt={item.alt}
            draggable={false}
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom}) rotate(${rotation}deg)`,
            }}
            className={cn(
              "max-h-full max-w-full select-none rounded-lg object-contain shadow-card transition-transform duration-300 [transition-timing-function:var(--ease-expressive)]",
              zoom > 1 ? "cursor-grab active:cursor-grabbing" : "",
            )}
          />
        ) : (
          <div
            /* Width is capped by the height available, so the player never runs
               off the bottom of a laptop screen. */
            style={{ maxWidth: "min(64rem, calc((100dvh - 15rem) * 16 / 9))" }}
            className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-card"
          >
            {playing === item.id ? (
              <iframe
                key={item.id}
                src={youtubeEmbed(item.youtubeId, true)}
                title={item.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(item.id)}
                className="group absolute inset-0 grid place-items-center"
              >
                <img
                  src={youtubeThumb(item.youtubeId, "lg")}
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-80 transition-opacity duration-400 group-hover:opacity-60"
                />
                <PlayBadge className="relative" />
                <span className="sr-only">Play {item.label}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ---- Caption -------------------------------------------------------- */}
      <div className="px-6 pb-1 pt-4 text-center">
        {item.kind === "image" ? (
          item.caption ? (
            <p className="mx-auto max-w-2xl text-[0.9rem] font-semibold text-white/75">
              {item.caption}
            </p>
          ) : null
        ) : (
          <a
            href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-harvest-400 underline-offset-4 hover:text-harvest-300 hover:underline"
          >
            Watch on YouTube
            <ExternalLink aria-hidden className="size-3.5" />
          </a>
        )}
      </div>

      {/* ---- Thumbnail rail -------------------------------------------------- */}
      <div className="flex items-center gap-2 px-3 py-4 sm:px-6">
        <RailArrow direction="prev" stripRef={stripRef} />

        <div
          ref={stripRef}
          className="flex flex-1 gap-2 overflow-x-auto scroll-smooth px-0.5 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((entry, index) => {
            const active = index === current;
            return (
              <button
                key={entry.id}
                type="button"
                data-active={active}
                onClick={() => setCurrent(index)}
                className={cn(
                  "relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-2 transition-all duration-300 sm:h-14 sm:w-20",
                  active
                    ? "ring-forest-500"
                    : "opacity-45 ring-transparent hover:opacity-90 hover:ring-white/30",
                )}
              >
                <img
                  src={entry.kind === "image" ? entry.src : youtubeThumb(entry.youtubeId, "sm")}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
                {entry.kind === "video" ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center bg-black/30 text-white"
                  >
                    <Play className="size-3.5 fill-current" />
                  </span>
                ) : null}
                <span className="sr-only">{entry.kind === "image" ? entry.alt : entry.label}</span>
              </button>
            );
          })}
        </div>

        <RailArrow direction="next" stripRef={stripRef} />
      </div>
    </div>,
    document.body,
  );
}

/* ==========================================================================
   PARTS
   ========================================================================== */

type IconType = typeof ZoomIn;

function ControlButton({
  label,
  icon: Icon,
  onClick,
  disabled = false,
  active = false,
  className,
}: {
  label: string;
  icon: IconType;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-9 place-items-center rounded-full text-white transition-all duration-300 [transition-timing-function:var(--ease-expressive)] hover:bg-white/20 disabled:pointer-events-none disabled:opacity-30 sm:size-10",
        active ? "bg-forest-600 hover:bg-forest-500" : "bg-white/10",
        className,
      )}
    >
      <Icon aria-hidden className="size-4 sm:size-[1.15rem]" />
    </button>
  );
}

function NavArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={cn(
        "absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-300 [transition-timing-function:var(--ease-expressive)] hover:bg-white/25 sm:size-12",
        direction === "prev" ? "left-1 sm:left-4" : "right-1 sm:right-4",
      )}
    >
      <Icon aria-hidden className="size-5 sm:size-6" />
    </button>
  );
}

/** Scrolls the thumbnail rail by roughly a screenful. */
function RailArrow({
  direction,
  stripRef,
}: {
  direction: "prev" | "next";
  stripRef: RefObject<HTMLDivElement | null>;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Scroll thumbnails left" : "Scroll thumbnails right"}
      onClick={() => {
        const strip = stripRef.current;
        if (!strip) return;
        strip.scrollBy({
          left: (direction === "prev" ? -1 : 1) * strip.clientWidth * 0.8,
          behavior: scrollBehavior(),
        });
      }}
      className="hidden size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 sm:grid"
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}

/** YouTube's own play button, because that is what the thumbnails promise. */
export function PlayBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-11 w-16 place-items-center rounded-[0.9rem] bg-[#ff0000] text-white shadow-card transition-transform duration-400 [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:scale-110",
        className,
      )}
    >
      <Play className="size-6 fill-current" />
    </span>
  );
}

/* ==========================================================================
   HELPERS
   ========================================================================== */

function scrollBehavior(): ScrollBehavior {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/** Keeps Tab inside the dialog — there is nothing behind it worth reaching. */
function trapFocus(event: KeyboardEvent, root: HTMLElement | null) {
  if (!root) return;

  const focusable = root.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])',
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && (active === first || active === root)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}
