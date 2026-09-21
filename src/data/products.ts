/**
 * SCT CATALOGUE — 21 CATEGORIES, EACH HOLDING PRODUCTS
 * ====================================================
 * STRUCTURE
 * ---------
 *   Range      SCT Vedic | Super Series          (2)
 *     └─ Category   e.g. "SCT Vedic Nutri Charger"   (21)
 *          └─ Product   an individual buyable SKU
 *
 * The 21 names below are CATEGORIES, not individual products. Each one holds a
 * list of products in its `skus` array.
 *
 * WHERE THE PRODUCT LISTS COME FROM
 * ---------------------------------
 * SCT's old site had no data at all beneath the 21 — one filter chip mapped to
 * exactly one page. So the real product list for each category has to come
 * from SCT directly, and is on its way.
 *
 * Until it arrives, `skus` is generated from the pack sizes SCT *did* publish
 * (see `packing` on each category). Those entries carry `provisional: true`
 * and the UI labels them, so nobody mistakes a placeholder for a real SKU.
 *
 * ADDING THE REAL PRODUCTS
 * ------------------------
 * Give a category an explicit `skus` array and the generated ones are dropped:
 *
 *   category({
 *     name: "SCT Vedic Nutri Charger",
 *     ...
 *     skus: [
 *       { name: "Nutri Charger Granules", pack: "5 kg", note: "For basal dose" },
 *       { name: "Nutri Charger Drip",     pack: "1.2 kg" },
 *     ],
 *   })
 *
 * Nothing else needs touching — the category grid, the category pages and the
 * product routes are all generated from this array.
 *
 * CONTENT SOURCE: soilchargertechnology.com, scraped 2026-09-21. Full capture
 * in docs/sct-legacy-content.md §7.
 *
 * PROVENANCE RULE
 * ---------------
 *   "sct"   — SCT's own copy, edited only for spelling and sentence breaks.
 *             No claim was added, removed or strengthened.
 *   "draft" — SCT published NO description (the field on the old site held a
 *             single full stop). Our plain-language placeholder, making no
 *             efficacy claim. The UI labels these visibly.
 *
 * Search for `source: "draft"` to find everything awaiting sign-off.
 *
 * KNOWN ISSUES CARRIED OVER FROM THE OLD SITE
 * -------------------------------------------
 * · Plant Charger's page was titled "Plant Charger" but its body described
 *   "Pest Cleaner". Flagged on that category — SCT must confirm which it is.
 * · Super Crop Charger's description contained a literal "???%" placeholder
 *   that was never filled. Read as 100% here, matching every sibling.
 * · Krushi Amrut, Green Gujrat, Super Fungi Charger and Super Pest Charger are
 *   named elsewhere on SCT's site but have no page at all, so they are not in
 *   this catalogue. See docs/sct-legacy-content.md §16.
 */

export type ProductRange = "vedic" | "super";

export type CategoryGroup =
  | "Soil & Carbon"
  | "Root Zone"
  | "Foliar & Growth"
  | "Crop Nutrition"
  | "Quality & Finish"
  | "Crop Protection"
  | "Water";

/** One line of the dosage table on a category page. */
export type DosageLine = { label: string; value: string };

/**
 * An individual buyable item inside a category.
 *
 * `provisional` marks an entry we generated from the category's published pack
 * sizes because SCT has not yet supplied its real product list. The UI shows a
 * badge for these. Replace them by giving the category an explicit `skus`
 * array — see the note at the top of this file.
 */
export type Product = {
  id: string;
  slug: string;
  /** The category this belongs to. */
  categorySlug: string;
  name: string;
  /** Pack size, e.g. "5 litre" or "30 kg". */
  pack?: string;
  /** Anything specific to this pack rather than the category. */
  note?: string;
  image?: string;
  provisional: boolean;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  range: ProductRange;
  group: CategoryGroup;
  /** One short line, farmer-facing. Shown on cards. */
  summary: string;
  /** SCT's own opening description, or our flagged draft. */
  detail: string;
  /** The numbered benefits SCT published for this product. */
  benefits: string[];
  /** Application rates exactly as SCT published them. */
  dosage: DosageLine[];
  /** Pack sizes, where SCT published them. */
  packing?: string;
  /** Any extra instruction SCT attached to the product. */
  note?: string;
  /** Where the copy came from. Drives the "awaiting approval" badge. */
  source: "sct" | "draft";
  /**
   * Override only. Every category already resolves to
   * /images/products/<slug>-600.webp and -1200.webp, recovered from SCT's own
   * photography — see `categoryImage()` below.
   */
  image?: string;
  featured?: boolean;
  /** The products inside this category. */
  skus: Product[];
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
      "The range built on SCT Vedic Technology — the result of roughly ten years of work between Vedic scientists, the SCT team and farmers in the field. Mostly granules and powders that go to the soil or the spray tank.",
  },
  super: {
    id: "super",
    name: "Super Series",
    tagline: "The foundation range, since 2015",
    description:
      "SCT's original range, developed from 2015 onwards around a single first objective: a strong, dependable source of organic carbon for Indian soil. Mostly liquids, measured in millilitres per litre.",
  },
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/^sct vedic /, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CategoryInput = Omit<Category, "id" | "slug" | "skus"> & {
  slug?: string;
  /** SCT's real product list, once supplied. */
  skus?: Omit<Product, "id" | "slug" | "categorySlug" | "provisional">[];
};

/**
 * Splits a published packing string ("2 litre · 5 litre · 20 litre") into one
 * provisional product per pack size. This is a stand-in only — see the note at
 * the top of this file.
 */
function skusFromPacking(categoryName: string, categorySlug: string, packing?: string): Product[] {
  if (!packing) return [];
  return packing
    .split(/[·,]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((pack) => {
      const slug = `${categorySlug}-${slugify(pack)}`;
      return {
        id: slug,
        slug,
        categorySlug,
        name: `${categoryName} — ${pack}`,
        pack,
        provisional: true,
      };
    });
}

function category(input: CategoryInput): Category {
  const slug = input.slug ?? slugify(input.name);
  const { skus: supplied, ...rest } = input;

  const skus: Product[] = supplied
    ? supplied.map((sku) => {
        const skuSlug = `${slug}-${slugify(sku.name)}`;
        return { ...sku, id: skuSlug, slug: skuSlug, categorySlug: slug, provisional: false };
      })
    : skusFromPacking(input.name, slug, input.packing);

  return { ...rest, id: slug, slug, skus };
}

export const categories: Category[] = [
  // ==========================================================================
  // SCT VEDIC RANGE
  // ==========================================================================
  category({
    name: "SCT Vedic Nutri Charger",
    range: "vedic",
    group: "Crop Nutrition",
    summary: "Natural nutrition in place of chemical feed.",
    detail:
      "Vedic Nutri Charger is a powerful alternative to chemical nutrition. It provides natural nutrition to the crops in the field and makes it possible to grow agricultural produce the way a forest grows — on its own terms.",
    benefits: [
      "Helps produce vigorous new shoots, abundant flowering and fruiting.",
      "A natural mineral basket in itself, so it is ready to use — which keeps the crop supported during emergencies.",
      "Helps the metabolism of the plant.",
      "Soil-friendly bacteria create a friendly environment with fungi, increasing soil productivity and health.",
      "Improves soil texture and humidity, and increases soil, water and nutrient holding capacity.",
      "Develops strong cell structure by supplying essential vitamins to the crop.",
      "Natural nitrogen, phosphorus and potash accelerate the synthesis process, filling the extra demand of hybrid varieties.",
      "Changes the natural texture and aroma of roots, leaves, flowers and fruit.",
    ],
    dosage: [
      { label: "Basal dose", value: "3–5 kg per acre" },
      { label: "By drip or drenching", value: "1.2 kg" },
    ],
    source: "sct",
    featured: true,
  }),

  category({
    name: "SCT Vedic Root Charger",
    range: "vedic",
    group: "Root Zone",
    summary: "Food for the roots, and for the life around them.",
    detail:
      "Vedic Root Charger is a natural food that charges the roots of the plant. It helps plant roots regenerate friendly bacteria, fungi and other organisms.",
    benefits: [
      "A concentrated store of natural elements for the roots.",
      "Promotes uptake of elements by increasing ion concentration (CEC) in the roots.",
      "Because it is itself a storehouse of elements, the overall development of white roots extends their life.",
      "Enhances receptivity, activation and stress tolerance in roots.",
      "Helps the symbiosis of plant and fungi by sending signals to mycorrhiza and bacteria in the soil.",
      "With regular use the soil becomes fertile and spongy.",
      "Used together with Soil Charger, it can control soil-borne disease.",
      "Increases the number of bacteria and fungi in the soil around the roots.",
    ],
    dosage: [
      { label: "Basal dose", value: "3–5 kg per acre" },
      { label: "By drip or drenching", value: "1.2 kg" },
    ],
    source: "sct",
    featured: true,
  }),

  category({
    name: "SCT Vedic Health Charger",
    range: "vedic",
    group: "Crop Nutrition",
    summary: "Builds the crop's own defence, without a stimulant.",
    detail:
      "Rare and powerful minerals are naturally available from Vedic Health Charger to strengthen the DNA in the crop. It helps make soil fertile, and lets the crop grow naturally and vigorously without any stimulant.",
    benefits: [
      "Strengthening of DNA and RNA in plant cells builds immunity against many kinds of disease.",
      "Improvement in crop quality by stopping mutations in plant cells.",
      "Increases the medicinal properties of the crop.",
      "Helps prevent wilt disease and damping off.",
      "Weak and stressed crops get rejuvenation.",
      "Barren and alkaline soils become fertile and lively.",
      "Increases the life span and the productivity of the crop.",
      "Provides nutrition for balanced metabolism in crops.",
    ],
    dosage: [
      { label: "Spray", value: "3 g per litre" },
      { label: "Soil", value: "1.2 kg per acre" },
    ],
    source: "sct",
    featured: true,
  }),

  category({
    name: "SCT Vedic Leaf Charger",
    range: "vedic",
    group: "Foliar & Growth",
    summary: "Everything the leaf needs to make food.",
    detail:
      "Leaf Charger is a mineral basket that helps plant metabolism. Because it is a natural storehouse of all the main, secondary, macro and micro nutrients the crop requires, the plant itself produces the enzymes, proteins and auxins it needs. It provides a source of natural elements for the overall growth and protection of the leaves.",
    benefits: [
      "Charges the chlorophyll in every cell with energy.",
      "Increases leaf and branch extension.",
      "Increases food production and the canopy of the leaf.",
      "Provides the elements needed for photosynthesis, increasing leaf storage.",
      "Increases leaf thickness and immunity in adverse conditions.",
      "Protects the plant through leaf nutrition in adverse conditions.",
      "Builds the reserve needed for abundant flowering and fruiting.",
    ],
    dosage: [
      { label: "Spray", value: "3 g per litre" },
      { label: "Soil", value: "1.2 kg per acre" },
    ],
    source: "sct",
    featured: true,
  }),

  category({
    name: "SCT Vedic Setting Charger",
    range: "vedic",
    group: "Quality & Finish",
    summary: "For the flowering and setting stage.",
    detail:
      "SCT Vedic Setting Charger addresses the problems farmers face around setting. It provides the nutrients that support the hormones and enzymes needed for flowering and fruiting.",
    benefits: [
      "Fills the deficiency of the elements that cause flowers to drop.",
      "Improves the flowering pattern of the plant and produces strong, vigorous buds.",
      "Because it is a natural food, it continues to nourish flowers in hostile conditions.",
      "Lengthens the buds and the flower stalks.",
      "Nourishes the extra flowers attached to the plant.",
      "Creates more nectar in the flower, so bees are attracted.",
    ],
    dosage: [
      { label: "Spray", value: "3 g per litre" },
      { label: "Soil", value: "1.2 kg per acre" },
    ],
    source: "sct",
  }),

  category({
    name: "SCT Vedic Quality Charger",
    range: "vedic",
    group: "Quality & Finish",
    summary: "Size, taste, colour and sugar at harvest.",
    detail:
      "The store of natural nutrients in Vedic Quality Charger enhances the size, taste, colour, lustre, aroma and sugar of agricultural produce — the qualities the market actually pays for.",
    benefits: [
      "Plants produce GA, cytokinins and hormones for fruit growth.",
      "Protects the fruit from cracking, through balanced nutrition.",
      "Protects crops from sunburn by increasing the internal growth of the plant.",
      "Helps uniform size and quality by smoothing the function of phloem in the plant.",
      "Distributes sugar evenly in fruit and crops, and increases the keeping quality of the produce.",
    ],
    dosage: [
      { label: "Spray", value: "3 g per litre" },
      { label: "Soil", value: "1.2 kg per acre" },
    ],
    source: "sct",
  }),

  category({
    name: "SCT Vedic Plant Charger",
    range: "vedic",
    group: "Crop Protection",
    summary: "A protective coating that keeps sucking pests away.",
    detail:
      "Creates a protective coating on the crop using natural alkaloids and enzymes. It replaces the smell that attracts insects, so pests stay away from the crop. It is absorbed into the plant and works from within, making the crop repellent to insects.",
    benefits: [
      "The alkaloids play a role in plant metabolism and catabolism, and protect the plant from predators.",
      "Works as a repellent, so sucking insects do not attack the crop.",
      "Creates a protective coating on leaves, flowers and fruit.",
      "The pungent, bitter taste keeps insects away from the crop.",
      "Attracts insect predators, so enemy insects are controlled naturally.",
      "Nutritious for bees and friendly insects; only troublesome to enemy insects.",
    ],
    dosage: [{ label: "Spray", value: "3 g per litre" }],
    packing: "600 g",
    note: "SCT's own page for this product carries the Plant Charger name but describes Pest Cleaner throughout. The description above is reproduced as published — please confirm the product name with SCT before ordering.",
    source: "sct",
  }),

  category({
    name: "SCT Vedic Health Fighter",
    range: "vedic",
    group: "Crop Protection",
    summary: "Works on fungal, bacterial and viral trouble together.",
    detail:
      "A herbal therapeutic product that works on three fronts at once — fungal, bacterial and viral — and strengthens the crop's own internal defences rather than only attacking the organism.",
    benefits: [
      "The first trident-action product of its kind — fungal, bacterial and viral together.",
      "Works in both pre- and post-disease conditions.",
      "Works well for dead disease when given from the ground along with Soil Charger.",
      "The natural herbal extract is absorbed into the epidermal cells and enhances the crop's internal immunity (SAR — Systemic Acquired Resistance), protecting against a variety of fungal, bacterial and viral diseases.",
      "Being oil-based, it leaves a glossy protective coating around the crop against bacteria, viruses and fungi.",
    ],
    dosage: [
      { label: "Spray", value: "3–5 ml per litre" },
      { label: "Soil", value: "1–2 litres per acre" },
    ],
    packing: "1 litre",
    note: "SCT recommends this product for 100% SCT Vedic user farmers only.",
    source: "sct",
  }),

  category({
    name: "SCT Vedic Milk Charger",
    range: "vedic",
    group: "Crop Nutrition",
    summary: "A specialised nutrition input in the SCT Vedic range.",
    detail:
      "A specialised input within the SCT Vedic range, used alongside the core nutrition products. Full details, benefits and application rates are being confirmed with SCT — please call the team for guidance on your crop before using it.",
    benefits: [],
    dosage: [],
    note: "SCT has not yet published a description or dosage for this product. The line above is our plain-language placeholder and carries no claim. Please contact SCT directly for guidance.",
    source: "draft",
  }),

  category({
    name: "SCT Vedic Energy Booster",
    range: "vedic",
    group: "Foliar & Growth",
    summary: "For the stretches when the crop is working hardest.",
    detail:
      "Positioned for periods of high demand in the crop cycle, when the plant is carrying load and needs support. Full details, benefits and application rates are being confirmed with SCT — please call the team for guidance on your crop before using it.",
    benefits: [],
    dosage: [],
    note: "SCT has not yet published a description or dosage for this product. The line above is our plain-language placeholder and carries no claim. Please contact SCT directly for guidance.",
    source: "draft",
  }),

  category({
    name: "SCT Vedic Shakti",
    range: "vedic",
    group: "Crop Nutrition",
    summary: "Balances carbon and nitrogen, so the crop holds up.",
    detail:
      "A bagged soil input that works on the carbon-to-nitrogen balance inside the crop, which is what decides how well a plant resists pressure rather than simply how fast it grows.",
    benefits: [
      "Balances the carbon-nitrogen ratio in the crop, improving resistance.",
      "Increases the rate of crop metabolism for balanced growth, by providing the natural nutrition it needs.",
      "Improves crop productivity and increases the harvesting cycle.",
      "Increases the nutritional and medicinal properties of the crop.",
    ],
    dosage: [
      { label: "Rain-fed crops", value: "3–4 bags per acre" },
      { label: "Horticulture", value: "2–4 bags, with RNPH=K" },
    ],
    source: "sct",
  }),

  category({
    name: "Vedic Samrat",
    range: "vedic",
    group: "Soil & Carbon",
    summary: "72 natural trace elements, in a 30 kg bag.",
    detail:
      "A bagged soil conditioner aimed at the ground itself — structure, water holding and the trace elements a crop draws on all season.",
    benefits: [
      "Enhances soil fertility and livens the soil, increasing productivity.",
      "Improves soil structure and health, which increases water holding capacity.",
      "Promotes root development, increasing the crop's ability to absorb nutrients.",
      "Supplies 72 types of natural trace element needed for crop growth, reducing plant stress.",
      "Develops the internal protection system (SAR) of the crop, improving disease resistance.",
    ],
    dosage: [
      { label: "Rain-fed crops", value: "3–4 bags per acre" },
      { label: "Horticulture", value: "2–4 bags, with RNPH=K" },
    ],
    packing: "30 kg",
    source: "sct",
  }),

  category({
    name: "Vedic Miracle",
    range: "vedic",
    group: "Soil & Carbon",
    summary: "Instant energy for the crop, in a 10 kg bag.",
    detail:
      "A bagged input for the moments a crop needs to move quickly — germination, establishment, and recovery after a setback.",
    benefits: [
      "Provides instant energy to the crop.",
      "Increases the availability of essential soil nutrients.",
      "Supplies the natural micronutrients needed for growth.",
      "Enables the production of enzymes, hormones and other substances essential to crop development.",
      "Nourishes beneficial microbes and fungi by bringing life back to the soil.",
      "Improves the germination capacity of seed in adverse conditions, giving robust establishment.",
    ],
    dosage: [
      { label: "Rain-fed crops", value: "2 bags per acre" },
      { label: "Horticulture", value: "2 bags, with RNPH=K" },
    ],
    packing: "10 kg",
    source: "sct",
  }),

  // ==========================================================================
  // SUPER SERIES
  // ==========================================================================
  category({
    name: "Super Soil Charger",
    range: "super",
    group: "Soil & Carbon",
    summary: "Turns tired soil back into living soil.",
    detail:
      "Super Soil Charger is an eco-friendly natural organic product, developed under an Indian Government initiative. It is the product SCT began with in 2015, and it does one job above all others — put organic carbon back into the ground.",
    benefits: [
      "Helps increase organic carbon in the soil.",
      "Fertiliser is taken up faster, because the number of white roots increases.",
      "Controls the soil's pH and its EC.",
      "Helps chelate metals and chemical fertilisers in the soil.",
      "Sterile soil is converted into fertile soil.",
      "Increases the metabolism of micro-organisms in the soil.",
      "In drought, reduces stress on the crop, so it carries on even on low water.",
      "Protects the crop from extreme cold and extreme heat.",
    ],
    dosage: [
      { label: "Orchards", value: "3–5 litres per acre" },
      { label: "Vegetables", value: "1–3 litres per acre, monthly" },
    ],
    packing: "2 litre · 5 litre · 20 litre",
    source: "sct",
    featured: true,
  }),

  category({
    name: "Super Fruit Charger",
    range: "super",
    group: "Quality & Finish",
    summary: "Holds the nitrogen balance while the fruit fills.",
    detail:
      "Super Fruit Charger maintains the nitrogen ratio of the crop against its vitamin needs, which helps enzyme growth through the fruiting stage.",
    benefits: [],
    dosage: [
      { label: "Orchards", value: "15 ml per litre" },
      { label: "Vegetable crops", value: "10 ml per litre" },
      { label: "Grapes", value: "5–7 ml per litre" },
    ],
    packing: "5 litre · 20 litre",
    source: "sct",
  }),

  category({
    name: "Super Crop Charger",
    range: "super",
    group: "Foliar & Growth",
    summary: "A botanical and mineral feed for the whole crop.",
    detail:
      "A botanical and mineral fertiliser made from 100% organic technology and natural ingredients, sprayed across the standing crop.",
    benefits: [],
    dosage: [{ label: "Spray", value: "2.3 ml per litre" }],
    packing: "1 litre · 5 litre",
    source: "sct",
  }),

  category({
    name: "Super Flower Charger",
    range: "super",
    group: "Quality & Finish",
    summary: "Support through flowering.",
    detail:
      "A botanical and mineral fertiliser made from 100% organic technology and natural ingredients, directed at the flowering stage.",
    benefits: [],
    dosage: [
      { label: "Spray", value: "2–3 ml per litre, 1 to 2 times a day" },
      { label: "Drip", value: "500–1000 ml per acre" },
    ],
    packing: "1 litre · 5 litre",
    source: "sct",
  }),

  category({
    name: "Super Size Charger",
    range: "super",
    group: "Quality & Finish",
    summary: "For size on the produce.",
    detail:
      "A botanical and mineral fertiliser made from 100% organic technology and natural ingredients, used through the sizing stage of the crop.",
    benefits: [],
    dosage: [
      { label: "Spray", value: "2–3 ml per litre" },
      { label: "Drip", value: "1 litre per acre, 3 to 4 times" },
    ],
    packing: "1 litre · 5 litre",
    source: "sct",
  }),

  category({
    name: "Super Water Charger",
    range: "super",
    group: "Water",
    summary: "Makes every drop of spray work harder.",
    detail:
      "Super Water Charger is made with Indian technology and added to the spray water itself. As SCT put it: every drop of medicine is made valuable.",
    benefits: [],
    dosage: [
      { label: "Spray", value: "0.1 ml per litre of water" },
      { label: "Drip", value: "50–100 ml per acre, along with the medicine" },
    ],
    packing: "100 ml · 500 ml · 1000 ml",
    source: "sct",
  }),

  category({
    name: "Super Plant Fighter",
    range: "super",
    group: "Crop Protection",
    summary: "Organic control of sucking insects.",
    detail:
      "A botanical pest repellent and killer, for organic control of sucking insects — thrips, mawas, jassids, red spider, mealybug, whitefly and others.",
    benefits: [],
    dosage: [{ label: "Spray", value: "1–1.5 ml per litre" }],
    packing: "250 ml · 1 litre",
    note: "Used together with Super Water Charger at 0.1 ml for effective results.",
    source: "sct",
  }),

  category({
    name: "Super Plant Cleaner",
    range: "super",
    group: "Crop Protection",
    summary: "Broad-spectrum organic answer to fungal disease.",
    detail:
      "An organic broad-spectrum fungicidal fertiliser. The natural phosphorus it carries is activated immediately, and its antifungal properties act on several kinds of fungal disease.",
    benefits: [],
    dosage: [{ label: "Spray", value: "1–2 g per litre" }],
    packing: "250 g · 1 kg",
    note: "Taken along with Super Fruit Charger and Super Water Charger for effective results.",
    source: "sct",
  }),
];

/* ==========================================================================
   PRODUCT PHOTOGRAPHY
   --------------------------------------------------------------------------
   SCT's original product photographs were lost when their media server started
   404ing every file. They were recovered from the Internet Archive's 2024-10-07
   snapshot, converted to WebP, and normalised to a uniform square canvas so
   every card in a grid matches its neighbours.
   
   What was done to them: flattened onto white (the sources were a mix of
   transparent cut-outs and white-background photos), centred with 6% padding,
   and downscaled where the original was larger than the target. Nothing was
   cropped, recoloured or upscaled — the three small packs (Milk Charger,
   Health Fighter, Energy Booster) sit at their native size inside the square.
   
   Two widths ship: 600px for cards, 1200px for detail pages and retina.
   ========================================================================== */

/** Card-sized photograph for a category. */
export function categoryImage(category: Pick<Category, "slug" | "image">): string {
  return category.image ?? `/images/products/${category.slug}-600.webp`;
}

/** Detail-sized photograph, and the srcSet pairing it with the card width. */
export function categoryImageSrcSet(category: Pick<Category, "slug" | "image">): {
  src: string;
  srcSet?: string;
} {
  if (category.image) return { src: category.image };
  return {
    src: `/images/products/${category.slug}-1200.webp`,
    srcSet: `/images/products/${category.slug}-600.webp 600w, /images/products/${category.slug}-1200.webp 1200w`,
  };
}

/* ==========================================================================
   LOOKUPS
   ========================================================================== */

/** Every product across every category, flattened. */
export const allProducts: Product[] = categories.flatMap((c) => c.skus);

/** Categories shown on the homepage showcase. */
export const featuredCategories = categories.filter((c) => c.featured);

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(categorySlug: string, productSlug: string): Product | undefined {
  return getCategory(categorySlug)?.skus.find((s) => s.slug === productSlug);
}

export function categoriesByRange(range: ProductRange): Category[] {
  return categories.filter((c) => c.range === range);
}

/** The functional groups in use, in first-seen order. */
export const categoryGroups: CategoryGroup[] = Array.from(new Set(categories.map((c) => c.group)));

/* ---- Counts, for copy that must not drift out of date ------------------- */

export const categoryCount = categories.length;
export const productCount = allProducts.length;

/** Categories still awaiting SCT's own description. */
export const draftCategoryCount = categories.filter((c) => c.source === "draft").length;

/** True while no category has had its real product list supplied yet. */
export const productsAreProvisional = allProducts.every((p) => p.provisional);
