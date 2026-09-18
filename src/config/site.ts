import type { ContentMeta } from '@/types/content'

/**
 * Company facts.
 *
 * SOURCE OF TRUTH: everything here was read off the live site on 2026-09-18.
 * Nothing has been invented. Items the client must confirm are listed in
 * `unverifiedClaims` below and are deliberately NOT rendered anywhere until
 * they are resolved.
 */

const SOURCE = 'soilchargertechnology.com'

export const site = {
  name: 'Soil Charger Technology',
  shortName: 'SCT',
  /** Update to the production domain at launch. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.soilchargertechnology.com',
  locale: 'en_IN',
  defaultLocale: 'en' as const,
  locales: ['en', 'mr', 'hi'] as const,

  /** Verbatim from the About section. */
  founder: {
    name: 'Mr. Ram Mukhekar',
    role: 'Founder, Soil Charger Technology',
    location: 'Nashik, Maharashtra',
  },

  /** "Recognizing this threat in 2015, SCT gave first priority to increase soil
   *  fertility and organic carbon." — About section. */
  foundedYear: 2015,

  address: {
    street: 'Shop No. 3, Lower Ground Floor, Below Passport Office, Star Zone Mall',
    locality: 'Nashik–Pune Highway',
    city: 'Nashik',
    region: 'Maharashtra',
    postalCode: '422101',
    country: 'IN',
    countryName: 'India',
  },

  /**
   * Routed contacts. The old site scattered 3 emails and 3 phone numbers with
   * no indication of which to use — this structure is the fix.
   */
  contacts: {
    general: {
      label: 'General enquiries',
      email: 'soilchargertec@gmail.com',
      phone: '+918669200221',
      phoneDisplay: '+91 86692 00221',
    },
    sales: {
      label: 'Sales & distribution',
      email: 'salessoiltec1@gmail.com',
      phone: '+919881798028',
      phoneDisplay: '+91 98817 98028',
    },
    careers: {
      label: 'Careers',
      email: 'hr.soiltec@gmail.com',
      phone: null,
      phoneDisplay: null,
    },
  },

  /**
   * OPEN ITEM #3: four WhatsApp numbers are live on the old site
   * (8669200221, 8669950005, 9545710002, 8669200226). Using the number that is
   * also the primary published phone until the client confirms.
   */
  whatsapp: {
    number: '918669200221',
    display: '+91 86692 00221',
    defaultMessage: 'Hello, I would like to know more about Soil Charger Technology.',
  },

  social: {
    youtube: 'https://www.youtube.com/@SOILCHARGERTECHNOLOGYOFFICIAL',
    facebook: 'https://www.facebook.com/Soil.Charger.Technology',
    instagram: 'https://www.instagram.com/sct_vedic_technology_official/',
    /**
     * OPEN ITEM #4/#5: the old site's LinkedIn href is a generic ad-tracking
     * feed URL (not a company page) and the Twitter handle is @GoldenOpportu10,
     * which reads as off-brand. Both omitted until confirmed — a broken or
     * wrong `sameAs` actively harms Organization schema.
     */
    linkedin: null,
    twitter: null,
  },
} as const

/**
 * Claims the old site makes that must NOT be republished until the client
 * provides evidence. Surfaced by `npm run audit:content`.
 */
export const unverifiedClaims: Array<ContentMeta & { id: string; claim: string }> = [
  {
    id: 'iso-certification',
    claim: 'AN ISO 9001:2008 CERTIFIED COMPANY',
    provenance: 'needs-verification',
    source: `${SOURCE} (footer)`,
    note: 'ISO 9001:2008 was withdrawn in 2018 and superseded by ISO 9001:2015. Need the current certificate number, issuing body and validity dates before this appears anywhere.',
  },
  {
    id: 'government-patent',
    claim: 'Patented agricultural products of the Government of India',
    provenance: 'needs-verification',
    source: `${SOURCE}/sub-product/88`,
    note: 'Need patent/registration numbers. Unsubstantiated patent claims carry legal risk and will not be rendered.',
  },
  {
    id: 'legal-entity-name',
    claim: 'Soil Charger Technologies INC',
    provenance: 'needs-verification',
    source: `${SOURCE} (footer)`,
    note: 'Footer uses "Technologies INC"; the rest of the site uses "Soil Charger Technology". Organization schema needs the registered legal name.',
  },
  {
    id: 'market-position',
    claim: "India's Leading Organic Farming Group",
    provenance: 'needs-verification',
    source: `${SOURCE} (hero)`,
    note: 'Superlative market claim with no cited basis. Recommend replacing with a factual, defensible statement.',
  },
  {
    id: 'research-duration',
    claim: '10 years of research by Vedic Scientists',
    provenance: 'needs-verification',
    source: `${SOURCE} (about)`,
    note: 'Need named researchers, institutions or published work to render this as a credibility claim.',
  },
]

export type Site = typeof site
