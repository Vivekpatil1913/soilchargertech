/**
 * FORM VOCABULARY
 * ===============
 * Every option list the old site's forms offered, carried across unchanged.
 *
 * SOURCING RULE
 * -------------
 * The lists below were read out of the live markup at
 * soilchargertechnology.com (captured 2026-09-23), not retyped from memory.
 * Where SCT's spelling differs from the conventional one — "Chattisgadh",
 * "Kerla", "Panjab" — the conventional spelling is used for the label the
 * farmer reads, and SCT's original is kept in `legacy` so a submission can
 * still be matched against their existing records.
 *
 * The old site's state dropdown posted opaque numeric IDs (`value="515914"`)
 * that only its own database understood. Those IDs are deliberately not
 * carried over: this build has no backend to look them up in, and a submission
 * that reads "Maharashtra" is more useful to whoever reads it than one that
 * reads "2".
 *
 * District / taluka / village were three dependent dropdowns fed by an API on
 * the old site. There is no such API here, so they are free-text fields — the
 * information collected is identical, and a farmer typing his own taluka is
 * faster than three cascading selects on a phone anyway.
 */

/** The 36 states and union territories SCT's dropdown offered, in its order. */
export const INDIAN_STATES: { label: string; legacy?: string }[] = [
  { label: "Andaman & Nicobar Islands", legacy: "Andaman" },
  { label: "Andhra Pradesh", legacy: "Andrapradesh" },
  { label: "Arunachal Pradesh", legacy: "Arunachal pradesh" },
  { label: "Assam" },
  { label: "Bihar" },
  { label: "Chandigarh" },
  { label: "Chhattisgarh", legacy: "Chattisgadh" },
  { label: "Dadra & Nagar Haveli", legacy: "Dadra" },
  { label: "Daman & Diu", legacy: "Daman" },
  { label: "Delhi" },
  { label: "Goa" },
  { label: "Gujarat", legacy: "Gujrat" },
  { label: "Haryana", legacy: "Hariyana" },
  { label: "Himachal Pradesh", legacy: "Himachal pradesh" },
  { label: "Jammu & Kashmir", legacy: "Jammu kashmir" },
  { label: "Jharkhand" },
  { label: "Karnataka" },
  { label: "Kerala", legacy: "Kerla" },
  { label: "Lakshadweep" },
  { label: "Madhya Pradesh", legacy: "Madhya pradesh" },
  { label: "Maharashtra" },
  { label: "Manipur" },
  { label: "Meghalaya" },
  { label: "Mizoram" },
  { label: "Nagaland" },
  { label: "Odisha" },
  { label: "Punjab", legacy: "Panjab" },
  { label: "Puducherry" },
  { label: "Rajasthan" },
  { label: "Sikkim" },
  { label: "Tamil Nadu", legacy: "Tamilnadu" },
  { label: "Telangana" },
  { label: "Tripura" },
  { label: "Uttarakhand" },
  { label: "Uttar Pradesh", legacy: "Utterpradesh" },
  { label: "West Bengal", legacy: "West Bengol" },
];

export const STATE_OPTIONS = INDIAN_STATES.map((state) => state.label);

/**
 * The ten products the old enquiry form listed as checkboxes.
 *
 * Four of them — Super Fungi Charger, Super Pest Charger, Krushi Amrut and
 * Green Gujrat — are named here but have no page anywhere on SCT's site (see
 * docs/sct-legacy-content.md §16). They are kept regardless: a farmer who can
 * name the product he wants should be able to tick it, whether or not we have
 * a page for it yet.
 */
export const ENQUIRY_PRODUCTS = [
  "Super Soil Charger",
  "Super Fruit Charger",
  "Super Flower Charger",
  "Super Crop Charger",
  "Super Size Charger",
  "Super Water Charger",
  "Super Fungi Charger",
  "Super Pest Charger",
  "Krushi Amrut",
  "Green Gujrat",
] as const;

/** Department routing, exactly as the old enquiry modal offered it. */
export const ENQUIRY_DEPARTMENTS = ["SCT Consulting", "SCT Sales", "SCT Management"] as const;

/** "* WHERE YOU CAN OPEN THE SHOP ?" */
export const SHOP_LEVELS = ["Village Level", "Taluka Level", "District Level"] as const;

/** "* CAN YOU USED SOIL CHARGER TECHNOLOGY ?" */
export const YES_NO = ["Yes", "No"] as const;

/**
 * The six documents the distributor application required as uploads.
 * Labels are SCT's own, corrected only for spelling.
 */
export const DISTRIBUTOR_DOCUMENTS = [
  { name: "aadhaarFront", label: "Aadhaar Card (front side)" },
  { name: "aadhaarBack", label: "Aadhaar Card (back side)" },
  { name: "panCard", label: "PAN Card" },
  { name: "shopAct", label: "Shop ACT / NOC / Rent Agreement" },
  { name: "lightBill", label: "Light Bill" },
  { name: "purchaseBill", label: "SCT Product Purchase Bill" },
] as const;

/**
 * The six free-text questions under "Necessary Questions :".
 * Sentence case rather than the original all-caps — the content is unchanged.
 */
export const DISTRIBUTOR_QUESTIONS = [
  {
    name: "whyDistributorship",
    label: "Why do you want to take distributorship?",
  },
  {
    name: "sctExperience",
    label: "If you have used SCT, tell us your experience and what you observed",
  },
  {
    name: "farmExperience",
    label: "Share your experience in farm and garden",
  },
  {
    name: "goal",
    label:
      "How many farmers do you want to work with, roughly how far can you take the technology, and what is your goal?",
  },
] as const;

/** Accepted upload types, shared by every file field on the site. */
export const RESUME_ACCEPT = ".pdf,.doc,.docx";
export const DOCUMENT_ACCEPT = ".pdf,.jpg,.jpeg,.png";
export const IMAGE_ACCEPT = "image/*";
export const VIDEO_ACCEPT = "video/*";
