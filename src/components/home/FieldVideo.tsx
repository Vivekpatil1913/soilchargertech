import { ArrowUpRight } from "lucide-react";

import { LoopingVideo } from "@/components/common/LoopingVideo";
import { Shell } from "@/components/ui";
import { videos } from "@/data/images";
import { site, socials } from "@/data/site";

/**
 * FIELD VIDEO
 * ===========
 * The first thing on the home page, and the one full-bleed moment on it: edge
 * to edge, no card, no gutter. Everything after it is contained by <Shell />,
 * which is exactly why this reads as an opening rather than another block.
 *
 * It runs under the fixed header, which is transparent at the top of the home
 * route — so the footage reaches the very top of the window and the nav floats
 * on it. That only works with the upper scrim below: white nav links over a
 * bright sky are unreadable without it.
 *
 * Widescreen on desktop as designed. On a phone a 16:9 band is barely 220px
 * tall — too thin to carry a headline — so the frame turns 4:3 below `sm` and
 * the clip is cropped by `object-cover` rather than the copy being shrunk.
 *
 * 4:3 alone is still not enough: at 390px wide that is a 292px frame, and the
 * copy block below runs to roughly 370px, so it pushed up out of the frame and
 * the eyebrow ended up behind the logo. The `min-h` is the floor that keeps the
 * whole block inside the footage; it is lifted at `sm`, where 16:9 is already
 * taller than the copy.
 *
 * The gradient is load-bearing, not decoration: white text over moving footage
 * is unreadable without it, and it has to hold on the poster frame too.
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
      <div className="relative aspect-[4/3] min-h-[34rem] max-h-[82vh] w-full sm:aspect-[16/9] sm:min-h-0">
        <LoopingVideo video={videos.fieldBand} sizes="100vw" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05150c] via-[#05150c]/55 to-[#05150c]/10"
        />

        {/* Behind the header only — deep enough to carry the nav, gone by the
            time the footage is doing its job. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#05150c]/85 via-[#05150c]/45 to-transparent"
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
