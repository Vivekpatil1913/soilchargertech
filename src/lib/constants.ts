import { site } from "@/data/site";

/** Canonical site origin, overridable per deployment. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? site.url;

export const SEO_DEFAULTS = {
  title: "Soil Charger Technology | Sustainable Agriculture & Soil Health",
  titleTemplate: "%s | Soil Charger Technology",
  description: site.description,
  keywords: [
    "soil health",
    "organic carbon",
    "sustainable agriculture India",
    "mycorrhiza",
    "soil fertility",
    "SCT Vedic",
    "SCT Saptapadi",
    "Soil Charger Technology",
    "Nashik agriculture",
    "natural farming",
  ],
} as const;

/** Languages offered by the header translator. */
export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];
