/**
 * CENTRAL IMAGE REGISTRY
 * ======================
 * Every photograph on the site is referenced through this file. Components
 * import `images.hero.main` — never a raw path — so swapping artwork later is a
 * one-line change here instead of a hunt through JSX.
 *
 * Replacing a photo:
 *   1. Drop the new file into the matching folder under /public/images/.
 *   2. Update `src` below. Update `alt` to describe the new photo.
 *
 * Current photography is licensed placeholder material (Wikimedia Commons,
 * freely licensed) chosen for Indian-agriculture relevance. SCT's own field
 * photography should replace it before launch — the `credit` field tracks what
 * still needs swapping.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** Provenance. "SCT" = the company's own asset and safe to keep. */
  credit: "SCT" | "Placeholder — replace with SCT photography";
};

const PLACEHOLDER = "Placeholder — replace with SCT photography" as const;

export const images = {
  logo: {
    mark: { src: "/logo/sct-logo.png", alt: "Soil Charger Technology logo", credit: "SCT" },
  },

  hero: {
    main: {
      src: "/images/hero/hero-farmer-field.jpg",
      alt: "A farmer sowing rice by hand in a terraced field in the Western Ghats, Maharashtra",
      credit: PLACEHOLDER,
    },
    sunset: {
      src: "/images/hero/hero-paddy-sunset.jpg",
      alt: "A freshly planted paddy field at sunset",
      credit: PLACEHOLDER,
    },
    landscape: {
      src: "/images/hero/field-landscape.jpg",
      alt: "Open agricultural fields in India under a wide sky",
      credit: PLACEHOLDER,
    },
  },

  soil: {
    profile: {
      src: "/images/soil/soil-texture.jpg",
      alt: "A soil profile showing distinct layers of silt, loam and clay",
      credit: PLACEHOLDER,
    },
    survey: {
      src: "/images/soil/soil-survey.jpg",
      alt: "Close inspection of a soil sample in the field",
      credit: PLACEHOLDER,
    },
    mycorrhiza: {
      src: "/images/soil/mycorrhiza-microscope.jpg",
      alt: "Arbuscular mycorrhizal fungi inside plant root tissue, seen under a microscope",
      credit: PLACEHOLDER,
    },
    compost: {
      src: "/images/soil/organic-compost.jpg",
      alt: "Dark, crumbly organic compost rich in humus",
      credit: PLACEHOLDER,
    },
    irrigation: {
      src: "/images/soil/irrigation-borewell.jpg",
      alt: "Borewell pump and irrigation pipes on an Indian farm",
      credit: PLACEHOLDER,
    },
  },

  farmers: {
    woman: {
      src: "/images/farmers/farmer-woman.jpg",
      alt: "An Indian woman farmer standing in her field",
      credit: PLACEHOLDER,
    },
    harvest: {
      src: "/images/farmers/farmer-harvest.jpg",
      alt: "A farmer harvesting rice by hand",
      credit: PLACEHOLDER,
    },
    bullock: {
      src: "/images/farmers/farmer-bullock.jpg",
      alt: "A farmer arriving at his field with a bullock cart",
      credit: PLACEHOLDER,
    },
    tractor: {
      src: "/images/farmers/farmer-tractor.jpg",
      alt: "A farmer preparing his land with a tractor",
      credit: PLACEHOLDER,
    },
    group: {
      src: "/images/farmers/farmers-group.jpg",
      alt: "A group of farmers working together transplanting rice",
      credit: PLACEHOLDER,
    },
    youth: {
      src: "/images/farmers/farmer-rice-plant.jpg",
      alt: "A young farmer planting rice seedlings, smiling at the camera",
      credit: PLACEHOLDER,
    },
    field: {
      src: "/images/farmers/farmers-paddy.jpg",
      alt: "Farmland reflected in still water beside a paddy field",
      credit: PLACEHOLDER,
    },
  },

  crops: {
    grapes: {
      src: "/images/applications/crop-grapes.jpg",
      alt: "Grape vines heavy with fruit in a Nashik vineyard",
      credit: PLACEHOLDER,
    },
    wheat: {
      src: "/images/applications/crop-wheat.jpg",
      alt: "Golden wheat ready for harvest",
      credit: PLACEHOLDER,
    },
    vegetables: {
      src: "/images/applications/crop-vegetables.jpg",
      alt: "Rows of leafy vegetables growing on a hill farm",
      credit: PLACEHOLDER,
    },
    sugarcane: {
      src: "/images/applications/crop-sugarcane.jpg",
      alt: "A ripe sugarcane crop in an Indian village",
      credit: PLACEHOLDER,
    },
    cotton: {
      src: "/images/applications/crop-cotton.jpg",
      alt: "Cotton bolls opening in a field in Karnataka",
      credit: PLACEHOLDER,
    },
    maize: {
      src: "/images/applications/crop-maize.jpg",
      alt: "A maize crop growing in rural India",
      credit: PLACEHOLDER,
    },
    banana: {
      src: "/images/applications/crop-banana.jpg",
      alt: "A banana plantation with heavy bunches of fruit",
      credit: PLACEHOLDER,
    },
    pomegranate: {
      src: "/images/applications/crop-pomegranate.jpg",
      alt: "A pomegranate orchard bearing ripe fruit",
      credit: PLACEHOLDER,
    },
    hillside: {
      src: "/images/applications/crop-hillside.jpg",
      alt: "Terraced hillside farms in India",
      credit: PLACEHOLDER,
    },
  },

  certification: {
    iso: { src: "/images/legacy/ISO.png", alt: "ISO 9001:2008 certification mark", credit: "SCT" },
  },
} as const satisfies Record<string, Record<string, SiteImage>>;

/**
 * Product photography note
 * -----------------------
 * The existing website's product images (finalapi.soilchargertechnology.com)
 * now return 404 — that media server has lost the uploads. Rather than ship
 * broken images, product cards render <ProductVisual />, a branded pack mock
 * built from the design tokens. Drop real photos into /public/images/products/
 * and set `image` on each entry in `products.ts` to switch over; the card
 * already prefers a real photo whenever one is present.
 */
export const PRODUCT_IMAGE_DIR = "/images/products";
