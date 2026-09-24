import { ArrowUpRight, Camera, Film } from "lucide-react";
import { useRef, useState } from "react";

import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { VideoGrid } from "@/components/gallery/VideoGrid";
import { Button, Heading, Reveal, Section, Shell } from "@/components/ui";
import { galleryPhotos, galleryVideos } from "@/data/gallery";
import { cn } from "@/lib/utils";

/**
 * GALLERY — the home page teaser
 * ==============================
 * The full archive is twenty-four photographs and fifty-one films; dropping
 * both onto the home page would add two screens of scrolling between the
 * testimonials and the call to action, and cost a hundred image requests on a
 * page a farmer reaches on mobile data.
 *
 * So home carries eight of each behind a switch, and the pair of full sections
 * lives on /gallery. One section, not two, for the same reason: this is a
 * taste, and two consecutive teasers would read as filler.
 *
 * The switch is a real tab pair — the inactive panel is unmounted, so the eight
 * tiles that are not showing are never requested.
 */

const PREVIEW_COUNT = 8;

type Tab = "photos" | "videos";

const TABS: Tab[] = ["photos", "videos"];

export function Gallery() {
  const [tab, setTab] = useState<Tab>("photos");
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * The WAI-ARIA tab pattern moves between tabs with the arrow keys, and only
   * the selected tab is in the tab order — Tab itself takes you out of the
   * list and into the panel. Without this the roles were announcing a tablist
   * that did not behave like one: both tabs sat in the tab order and the
   * arrows did nothing.
   */
  function onKeyDown(event: React.KeyboardEvent) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const from = TABS.indexOf(tab);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? TABS.length - 1
          : event.key === "ArrowRight"
            ? (from + 1) % TABS.length
            : (from - 1 + TABS.length) % TABS.length;

    setTab(TABS[next]);
    listRef.current?.querySelector<HTMLButtonElement>(`#tab-${TABS[next]}`)?.focus();
  }

  return (
    <Section id="gallery" ground="tint" labelledBy="gallery-heading">
      <Shell size="wide">
        <Heading
          id="gallery-heading"
          eyebrow="Gallery"
          align="center"
          title={
            <>
              Look at the <span className="text-brand-600">evidence.</span>
            </>
          }
          lead="Photographs from the fields, and films of farmers talking about what actually happened on their own land."
        />

        {/* ---- The switch ---------------------------------------------- */}
        <Reveal delay={0.1}>
          <div
            ref={listRef}
            role="tablist"
            aria-label="Gallery type"
            onKeyDown={onKeyDown}
            className="mx-auto mt-10 flex w-fit items-center gap-1 rounded-full border border-hairline bg-surface p-1.5 shadow-card"
          >
            <TabButton
              id="photos"
              active={tab === "photos"}
              onClick={() => setTab("photos")}
              icon={Camera}
              label="Photos"
              count={galleryPhotos.length}
            />
            <TabButton
              id="videos"
              active={tab === "videos"}
              onClick={() => setTab("videos")}
              icon={Film}
              label="Videos"
              count={galleryVideos.length}
            />
          </div>
        </Reveal>

        {/* ---- The panel ------------------------------------------------- */}
        {/* `tabIndex={0}` because the panel's own content is a grid of buttons
            that Tab reaches anyway — but a panel with no focusable child at
            all would otherwise be unreachable, and the pattern expects the
            panel to receive focus after the tab. */}
        <div className="mt-10">
          {tab === "photos" ? (
            <div role="tabpanel" id="panel-photos" aria-labelledby="tab-photos" tabIndex={0}>
              <PhotoGrid photos={galleryPhotos.slice(0, PREVIEW_COUNT)} />
            </div>
          ) : (
            <div role="tabpanel" id="panel-videos" aria-labelledby="tab-videos" tabIndex={0}>
              <VideoGrid videos={galleryVideos.slice(0, PREVIEW_COUNT)} />
            </div>
          )}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href="/gallery" variant="secondary" size="lg">
            See the full gallery
            <ArrowUpRight aria-hidden className="size-4" />
          </Button>
        </Reveal>
      </Shell>
    </Section>
  );
}

function TabButton({
  id,
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  id: Tab;
  active: boolean;
  onClick: () => void;
  icon: typeof Camera;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={active}
      aria-controls={`panel-${id}`}
      /* Roving tabindex: only the selected tab is reachable with Tab, the
         arrows move between them. */
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.9rem] font-semibold transition-all duration-300 [transition-timing-function:var(--ease-expressive)]",
        active
          ? "bg-brand-700 text-white shadow-brand-glow"
          : "text-ink-500 hover:text-brand-700",
      )}
    >
      <Icon aria-hidden className="size-4" />
      {label}
      <span className={cn("text-[0.78rem] font-bold", active ? "text-white/70" : "text-ink-500")}>
        {count}
      </span>
    </button>
  );
}
