import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { PhotoGallerySection } from "@/components/gallery/PhotoGallerySection";
import { VideoGallerySection } from "@/components/gallery/VideoGallerySection";
import { ContactCta } from "@/components/home/ContactCta";
import { galleryPhotos, galleryVideos, youtubeThumb } from "@/data/gallery";
import { SITE_URL } from "@/lib/constants";

/**
 * GALLERY
 * =======
 * Both archives the old site carried, rebuilt: photographs first, then the
 * films. Same viewer for each.
 *
 * The photo grid does not use the old site's twenty uploads — every one of
 * those URLs now 404s, which is why that section renders as a wall of broken
 * images on the live site today. See src/data/gallery.ts.
 */
export default function GalleryPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Soil Charger Technology — photo gallery",
      url: `${SITE_URL}/gallery`,
      image: galleryPhotos.slice(0, 12).map((photo) => `${SITE_URL}${photo.src}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Soil Charger Technology — video gallery",
      url: `${SITE_URL}/gallery#videos`,
      numberOfItems: galleryVideos.length,
      itemListElement: galleryVideos.slice(0, 12).map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
        image: youtubeThumb(video.youtubeId, "lg"),
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Gallery"
        description={`${galleryPhotos.length} photographs from the fields and ${galleryVideos.length} films from the Soil Charger Technology channel — farmers, crops and soil, in Marathi and in the open.`}
        path="/gallery"
        jsonLd={jsonLd}
      />

      <PageHero
        eyebrow="Photo & video gallery"
        title={
          <>
            Nothing staged. <span className="text-shine">Just the fields.</span>
          </>
        }
        lead="Photographs from farms working on SCT, and films of the farmers themselves — every one of them shot on real land, not in a studio."
      />

      <PhotoGallerySection />
      <VideoGallerySection />
      <ContactCta />
    </>
  );
}
