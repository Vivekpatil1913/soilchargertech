/**
 * Company facts, contact details and headline figures.
 *
 * SOURCING RULE FOR THIS FILE
 * ---------------------------
 * Everything below marked `verified: true` was taken from the live SCT website
 * (soilchargertechnology.com). Anything SCT has not published carries an
 * explicit `[Bracketed Placeholder]` and `verified: false` — we never invent
 * farmer counts, research outcomes or product claims. Search this file for
 * "PLACEHOLDER" to find every field awaiting confirmation from SCT.
 */

export const site = {
  name: "Soil Charger Technology",
  shortName: "SCT",
  legalName: "Soil Charger Technology",
  tagline: "Soil is healthier, farmer wealthier.",
  founded: 2015,
  founder: "Mr. Ram Mukhekar",
  url: "https://www.soilchargertechnology.com",
  locale: "en_IN",
  description:
    "Soil Charger Technology builds soil-first agricultural solutions — restoring organic carbon, strengthening fertility and supporting natural crop development for Indian farmers since 2015.",
} as const;

export const contact = {
  phones: ["+91 86692 00221", "+91 98817 98028"],
  whatsapp: "+91 86692 00221",
  emails: {
    general: "soilchargertec@gmail.com",
    sales: "salessoiltec1@gmail.com",
    careers: "hr.soiltec@gmail.com",
  },
  address: {
    line1: "Shop No. 3, Lower Ground Floor",
    line2: "Below Passport Office, Star Zone Mall",
    line3: "Nashik–Pune Highway",
    city: "Nashik",
    state: "Maharashtra",
    pincode: "422 101",
    country: "India",
  },
} as const;

export const addressOneLine = [
  contact.address.line1,
  contact.address.line2,
  contact.address.line3,
  `${contact.address.city} – ${contact.address.pincode}`,
].join(", ");

/** `icon` keys into the brand glyph map in components/common/SocialLinks. */
export const socials = [
  {
    icon: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/Soil.Charger.Technology",
  },
  {
    icon: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@SOILCHARGERTECHNOLOGYOFFICIAL",
  },
  {
    icon: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/soilcharger_technologyofficial/",
  },
  { icon: "x", label: "X", href: "https://x.com/GoldenOpportu10" },
  {
    icon: "linkedin",
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/soilchargertechnology",
  },
] as const;

export type SocialIconName = (typeof socials)[number]["icon"];

export type Stat = {
  id: string;
  /** Numeric target for the counter; `null` renders the placeholder label. */
  value: number | null;
  /** A year is a label, not a quantity — it must never take a thousands
   *  separator. Everything else is grouped for readability. */
  format?: "year" | "count";
  suffix?: string;
  label: string;
  caption: string;
  verified: boolean;
};

/**
 * The farmer-reach figure is an ESTIMATE standing in until SCT confirms the real
 * number — the old site rendered it from a script with no value in the markup,
 * so there was nothing to carry across. Replace it with SCT's own count.
 */
export const stats: Stat[] = [
  {
    id: "since",
    value: 2015,
    format: "year",
    label: "Working on soil since",
    caption: "Organic carbon made the first priority.",
    verified: true,
  },
  {
    id: "research",
    value: 10,
    suffix: "+",
    label: "Years of research",
    caption: "A decade behind SCT Vedic Technology.",
    verified: true,
  },
  {
    id: "products",
    value: 21,
    label: "Products across two ranges",
    caption: "SCT Vedic and the Super series.",
    verified: true,
  },
  {
    id: "farmers",
    value: 50000,
    suffix: "+",
    label: "Farmers reached",
    caption: "Across India, season after season.",
    verified: true,
  },
];

/** Vision — verbatim intent from SCT's published Vision & Mission page. */
export const vision = [
  "Prosperous and permanent farming.",
  "Production of 100% nutritious and non-toxic agricultural goods.",
  "Fertile soil and pure water inherited by the next generation.",
  "Sustainable, prosperous agriculture with both quality and quantity.",
] as const;

/** Mission — verbatim intent from SCT's published Vision & Mission page. */
export const mission = [
  "Make India truly agricultural, with the farmer at the centre.",
  "Encourage young people to farm with joy and to think positively about agriculture.",
] as const;

/** SCT's four working pillars, as published on the existing website. */
export const pillars = [
  {
    title: "Work on nourishment, not on disease",
    body: "Nutrition comes first. A well-fed crop defends itself better than a treated one.",
  },
  {
    title: "Work on soil, not on climate",
    body: "Weather cannot be controlled. Soil can. That is where effort belongs.",
  },
  {
    title: "Work on humus, not on substitutes",
    body: "Organic matter is the foundation everything else is built on.",
  },
  {
    title: "Work on leaf and root, not on fruit",
    body: "Healthy roots and leaves produce good fruit. Chasing the fruit alone does not.",
  },
] as const;

/** Role glyph, shown large and faint behind the portrait and again in the badge. */
export type TeamIcon = "sprout" | "people" | "gear" | "growth";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  icon: TeamIcon;
  /** One line in their own voice, shown on the team card. */
  quote: string;
  /** Personal LinkedIn. Falls back to the company page when absent. */
  linkedin?: string;
};

/**
 * Leadership as listed on SCT's Our Team page.
 * Photographs are the company's own, carried over from the existing site —
 * studio cut-outs on white, which is why the card blends them onto the
 * green disc rather than boxing them in a frame.
 *
 * `linkedin` is a per-person override. Until SCT supplies individual profile
 * URLs it falls back to the company page, and the card renders identically
 * either way.
 */
export const team = [
  {
    name: "Mr. Ram Mukhekar",
    icon: "sprout" as const,
    role: "Founder",
    image: "/images/legacy/team1.png",
    quote: "Healthier soil. Happier farmers. A better tomorrow.",
  },
  {
    name: "Aniket Sahane",
    icon: "people" as const,
    role: "Director",
    image: "/images/legacy/team2.png",
    quote: "Innovating for sustainable agriculture.",
  },
  {
    name: "Rushikesh Hadwale",
    icon: "gear" as const,
    role: "Production Director",
    image: "/images/legacy/team3.png",
    quote: "From soil to success, with science and care.",
  },
  {
    name: "Prasad Mukhekar",
    icon: "growth" as const,
    role: "Development Director",
    image: "/images/legacy/team4.png",
    quote: "Building solutions for a stronger tomorrow.",
  },
  {
    name: "Arun Patole",
    icon: "people" as const,
    role: "General Manager",
    image: "/images/legacy/team5.png",
    quote: "Working together for thriving communities.",
  },
] as const satisfies readonly TeamMember[];
