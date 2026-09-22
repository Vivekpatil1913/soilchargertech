import { Youtube } from "lucide-react";

import { VideoGrid } from "@/components/gallery/VideoGrid";
import { Button, Heading, Section, Shell } from "@/components/ui";
import { galleryVideos } from "@/data/gallery";
import { socials } from "@/data/site";

const youtube =
  socials.find((social) => social.icon === "youtube")?.href ??
  "https://www.youtube.com/@SOILCHARGERTECHNOLOGYOFFICIAL";

/**
 * VIDEO GALLERY — the full set, for /gallery.
 *
 * On the forest ground, because fifty-one bright thumbnails need a dark field
 * behind them or the page turns into a wall of competing rectangles.
 */
export function VideoGallerySection() {
  return (
    <Section id="videos" ground="forest"  labelledBy="videos-heading">
      <Shell size="wide">
        <Heading
          id="videos-heading"
          eyebrow="Video gallery"
          align="center"
          tone="onDark"
          title={
            <>
              Farmers, in their own words.
            </>
          }
          lead={`${galleryVideos.length} films from SCT's channel — fields, crops, mistakes and results, in Marathi. Each one plays here, in the viewer.`}
        />

        <VideoGrid videos={galleryVideos} tone="onDark" className="mt-14" />

        <div className="mt-6 flex justify-center">
          <Button href={youtube} variant="onDark" size="lg">
            <Youtube aria-hidden className="size-[1.15rem]" />
            See the whole channel
          </Button>
        </div>
      </Shell>
    </Section>
  );
}
