import { PRODUCT_IMAGE_DIR } from "./images";

/**
 * SCT PRODUCT CATALOGUE
 * =====================
 * The 21 product names and their two ranges are taken verbatim from SCT's
 * existing website. Everything SCT has **not** published — composition, dosage,
 * crop-specific rates and performance claims — is deliberately absent.
 *
 * `summary` describes only what the product's own name and range already state.
 * It makes no efficacy claim. `detail` is a bracketed placeholder on every
 * product and is rendered as such on the product page, so a reader can see at a
 * glance which copy is still awaiting SCT's input.
 *
 * ADDING A PRODUCT
 * ----------------
 * Append an entry below. Nothing else needs touching — the listing page, the
 * range filters, the homepage showcase and the /products/[slug] routes are all
 * generated from this array.
 */

export type ProductRange = "vedic" | "super";

export type ProductCategory =
  | "Soil & Carbon"
  | "Root Zone"
  | "Foliar & Growth"
  | "Crop Nutrition"
  | "Quality & Finish"
  | "Crop Protection"
  | "Water";

export type Product = {
  id: string;
  slug: string;
  name: string;
  range: ProductRange;
  category: ProductCategory;
  /** Neutral, non-claiming positioning line. Safe to display today. */
  summary: string;
  /** PLACEHOLDER — awaiting SCT's approved product copy. */
  detail: string;
  /** PLACEHOLDER — awaiting SCT's approved usage guidance. */
  application: string;
  /** Real photo path once available; `undefined` renders the branded mock. */
  image?: string;
  featured?: boolean;
};

export const productRanges: Record<
  ProductRange,
  { id: ProductRange; name: string; tagline: string; description: string }
> = {
  vedic: {
    id: "vedic",
    name: "SCT Vedic",
    tagline: "A decade of research, in one range",
    description:
      "The range built on SCT Vedic Technology — the result of roughly ten years of work between Vedic scientists, the SCT team and farmers in the field.",
  },
  super: {
    id: "super",
    name: "Super Series",
    tagline: "The foundation range, since 2015",
    description:
      "SCT's original range, developed from 2015 onwards around a single first objective: a strong, dependable source of organic carbon for Indian soil.",
  },
};

const DETAIL_PLACEHOLDER =
  "[Full product description to be supplied by SCT — composition, mode of action and benefits.]";
const APPLICATION_PLACEHOLDER =
  "[Application method, dosage and crop-wise schedule to be supplied by SCT.]";

function product(
  name: string,
  range: ProductRange,
  category: ProductCategory,
  summary: string,
  featured = false,
): Product {
  const slug = name
    .toLowerCase()
    .replace(/^sct vedic /, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return {
    id: slug,
    slug,
    name,
    range,
    category,
    summary,
    detail: DETAIL_PLACEHOLDER,
    application: APPLICATION_PLACEHOLDER,
    image: undefined,
    featured,
  };
}

export const products: Product[] = [
  // ---- SCT Vedic range -----------------------------------------------------
  product(
    "SCT Vedic Nutri Charger",
    "vedic",
    "Crop Nutrition",
    "The nutrition-focused input of the SCT Vedic range.",
    true,
  ),
  product(
    "SCT Vedic Root Charger",
    "vedic",
    "Root Zone",
    "Directed at the root zone, where soil biology and the crop meet.",
    true,
  ),
  product(
    "SCT Vedic Health Charger",
    "vedic",
    "Crop Nutrition",
    "A general crop-health input from the SCT Vedic range.",
    true,
  ),
  product(
    "SCT Vedic Leaf Charger",
    "vedic",
    "Foliar & Growth",
    "A foliar input for the leaf canopy.",
    true,
  ),
  product(
    "SCT Vedic Setting Charger",
    "vedic",
    "Quality & Finish",
    "Intended for the flowering and setting stage of the crop cycle.",
  ),
  product(
    "SCT Vedic Quality Charger",
    "vedic",
    "Quality & Finish",
    "Focused on the finishing stage, where produce quality is decided.",
  ),
  product(
    "SCT Vedic Plant Charger",
    "vedic",
    "Foliar & Growth",
    "A whole-plant input from the SCT Vedic range.",
  ),
  product(
    "SCT Vedic Health Fighter",
    "vedic",
    "Crop Protection",
    "Part of SCT's nutrition-led approach to keeping crops resilient.",
  ),
  product(
    "SCT Vedic Milk Charger",
    "vedic",
    "Crop Nutrition",
    "A specialised input within the SCT Vedic range.",
  ),
  product(
    "SCT Vedic Energy Booster",
    "vedic",
    "Foliar & Growth",
    "Positioned for periods of high crop demand.",
  ),
  product(
    "SCT Vedic Shakti",
    "vedic",
    "Crop Nutrition",
    "A core input of the SCT Vedic range.",
  ),
  product(
    "Vedic Miracle",
    "vedic",
    "Foliar & Growth",
    "Part of the extended SCT Vedic line-up.",
  ),
  product(
    "Vedic Samrat",
    "vedic",
    "Crop Nutrition",
    "Part of the extended SCT Vedic line-up.",
  ),

  // ---- Super series --------------------------------------------------------
  product(
    "Super Soil Charger",
    "super",
    "Soil & Carbon",
    "The soil-first input SCT began with in 2015.",
    true,
  ),
  product(
    "Super Fruit Charger",
    "super",
    "Quality & Finish",
    "Directed at the fruiting stage of the crop.",
  ),
  product(
    "Super Crop Charger",
    "super",
    "Crop Nutrition",
    "A general crop input from the Super series.",
  ),
  product(
    "Super Flower Charger",
    "super",
    "Quality & Finish",
    "Intended for the flowering stage.",
  ),
  product(
    "Super Size Charger",
    "super",
    "Quality & Finish",
    "Directed at produce development and sizing.",
  ),
  product(
    "Super Water Charger",
    "super",
    "Water",
    "A water-side input within the Super series.",
  ),
  product(
    "Super Plant Cleaner",
    "super",
    "Crop Protection",
    "Part of SCT's alternative to conventional crop-protection chemistry.",
  ),
  product(
    "Super Plant Fighter",
    "super",
    "Crop Protection",
    "Part of SCT's alternative to conventional crop-protection chemistry.",
  ),
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByRange(range: ProductRange): Product[] {
  return products.filter((p) => p.range === range);
}

export function productImage(p: Product): string | undefined {
  return p.image ?? undefined;
}

export { PRODUCT_IMAGE_DIR };
