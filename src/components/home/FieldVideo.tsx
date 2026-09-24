import { ArrowUpRight } from "lucide-react";

import { LoopingVideo } from "@/components/common/LoopingVideo";
import { Shell } from "@/components/ui";
import { videos } from "@/data/images";
import { site, socials } from "@/data/site";

/**
 * FIELD VIDEO
 * ===========
 * The one full-bleed moment on the home page: edge to edge, no card, no
 * gutter. Everything around it is contained by <Shell />, which is exactly why
 * this reads as a chapter break rather than another block.
 *
 * It sits third, between Problem and Pillars — "show me this is real" is the
 * question a visitor has once their own complaint has been named back to them.
 * It used to open the page, above the hero; see the note in HomePage.tsx for
 * why that was moved.
 *
 * Widescreen on desktop as designed. On a phone a 16:9 band is barely 220px
 * tall — too thin to carry a headline — so the frame turns 4:3 below `sm` and
 * the clip is cropped by `object-cover` rather than the copy being shrunk.
 *
 * 4:3 alone is still not enough: at 390px wide that is a 292px frame, and the
 * copy block runs to roughly 370px, so it pushed up out of the frame. The
 * `min-h` is the floor that keeps the whole block inside the footage. It was
 * 34rem while this section opened the page and had a whole screen to fill;
 * 28rem is the actual floor the copy needs, and mid-page a shorter band keeps
 * the scroll moving.
 *
 * The gradient is load-bearing, not decoration: white text over moving footage
 * is unreadable without it, and it has to hold on the poster frame too. The
 * separate upper scrim this section used to carry is gone with the reorder —
 * it existed only to keep the transparent header's nav links readable against
 * a bright sky, and the header no longer floats over this section.
 */

const YOUTUBE =
  socials.find((social) => social.icon === "youtube")?.href ??
  "https://www.youtube.com/@SOILCHARGERTECHNOLOGYOFFICIAL";

export function FieldVideo() {
  const years = new Date().getFullYear() - site.founded;

  return (
    <section
      aria-labelledby="field-video-heading"
      className="relative w-full overflow-hidden bg-[#05150c]"
    >
      <div className="relative aspect-[4/3] min-h-[28rem] max-h-[82vh] w-full sm:aspect-[16/9] sm:min-h-0">
        <LoopingVideo video={videos.fieldBand} sizes="100vw" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05150c] via-[#05150c]/55 to-[#05150c]/10"
        />

        {/* A shallow top fade so the band joins the section above it rather
            than starting on a hard edge. Nothing sits on it any more, so it is
            a fraction of the depth the old header scrim needed. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05150c]/55 to-transparent"
        />

        <Shell
          size="wide"
          className="absolute inset-x-0 bottom-0 flex flex-col pb-7 sm:pb-11 lg:pb-14"
        >
          <p className="text-eyebrow text-leaf-400">From the field</p>

          <h2 id="field-video-heading" className="text-h2 mt-3 max-w-3xl text-white">
            {years} years of the same work — putting the life back into the soil.
          </h2>

          <p className="text-lead mt-4 max-w-xl text-sage-200/85">
            No chemical fertiliser. No chemical crop protection. Twenty-one organic inputs, one
            job.
          </p>

          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[0.9rem] font-semibold text-white backdrop-blur transition-colors duration-300 hover:bg-white/20"
          >
            See our fields on YouTube
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </Shell>
      </div>
    </section>
  );
}
