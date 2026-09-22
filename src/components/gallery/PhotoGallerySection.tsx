import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { Heading, Section, Shell } from "@/components/ui";
import { galleryPhotos } from "@/data/gallery";

/**
 * PHOTO GALLERY — the full set, for /gallery.
 */
export function PhotoGallerySection() {
  return (
    <Section id="photos" ground="light" labelledBy="photos-heading">
      <Shell size="wide">
        <Heading
          id="photos-heading"
          eyebrow="Photo gallery"
          align="center"
          title={
            <>
              The fields, <span className="text-forest-600">as they are.</span>
            </>
          }
          lead="Soil, crops and the people who work them. Tap any photograph to open it full size."
        />

        <PhotoGrid photos={galleryPhotos} className="mt-14" />
      </Shell>
    </Section>
  );
}
