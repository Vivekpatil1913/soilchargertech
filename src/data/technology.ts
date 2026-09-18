import type { Pillar, Principle, TimelineEntry } from '@/types/technology'

const SOURCE = 'soilchargertechnology.com'
const verified = (path = '') => ({ provenance: 'verified' as const, source: `${SOURCE}${path}` })

/**
 * The four pillars — verbatim from the homepage "4-piller Of Soil Charger
 * Technology" section.
 *
 * This is the company's only genuinely ownable, teachable framework, and on the
 * legacy site it was four unstyled cards halfway down a 427 KB page. It becomes
 * the spine of the new site.
 */
export const pillars: Pillar[] = [
  {
    index: 1,
    focus: 'Nourishment',
    against: 'Disease',
    statement: 'Work on nourishment, not on disease.',
    meta: verified(),
  },
  {
    index: 2,
    focus: 'Soil',
    against: 'Climate',
    statement: 'Work on soil, not on climate.',
    meta: verified(),
  },
  {
    index: 3,
    focus: 'Humus',
    against: 'Other things',
    statement: 'Work on humus, not with other things.',
    meta: verified(),
  },
  {
    index: 4,
    focus: 'Leaf and roots',
    against: 'Fruits',
    statement: 'Work on leaf and roots, not on fruits.',
    meta: verified(),
  },
]

/**
 * The three principles — verbatim from "3-Principle Of Soil Charger
 * Technology". Lightly repunctuated for readability; no meaning changed and
 * nothing added.
 */
export const principles: Principle[] = [
  {
    index: 1,
    name: 'Method',
    label: 'Follow Nutrition',
    rules: [
      'A basal dose of Krushi Amrut, Root Charger and Nutri Charger should be given every 60 days, as per the requirement of the plant.',
      'In every application to soil, drip or drenching — at least once a week — use Soil Charger 1 litre and Health Charger 600 g per acre.',
      'Each spray must be mixed with a Fruit Charger.',
    ],
    meta: verified(),
  },
  {
    index: 2,
    name: 'Rule',
    label: 'Avoid Damage',
    rules: [
      'Do not cultivate any soil in a way that causes movement or exposure. Mulching should not be done with part of the trunk. Weeds should not be cut in rainy weather or while it is raining — do it in a dry environment.',
      'Do not use any chemical fertiliser, granular or water-soluble.',
      'For crop protection use only Pest Fighter, Pest Cleaner, Disease Fighter and Fungi Cleaner. Do not use any chemicals.',
    ],
    meta: verified(),
  },
  {
    index: 3,
    name: 'Meditation',
    label: 'Keep Learning',
    rules: [
      'Watch the daily videos posted on the YouTube channel and prepare notes and comments. This is the breath of SCT Vedic.',
      'Study the articles published daily in the WhatsApp group. This is the water for SCT Vedic users.',
      'Spend 3–5 minutes each day in discussion with at least one other user — new or experienced — directly or by phone. This is the food for SCT users.',
    ],
    meta: verified(),
  },
]

/**
 * The founder's account of how the technology developed, from the About
 * section. Every entry paraphrases a sentence that exists on the live site.
 */
export const timeline: TimelineEntry[] = [
  {
    period: '2015',
    title: 'Organic carbon first',
    description:
      'Recognising the threat to crop and soil health after the Green Revolution, SCT gave first priority to increasing soil fertility and organic carbon, and to providing a strong source of it.',
    meta: verified('/about-us'),
  },
  {
    title: 'An alternative to soil pollution',
    description:
      'Realising the importance of organic carbon, SCT worked to stop soil pollution by providing strong alternatives.',
    meta: verified('/about-us'),
  },
  {
    title: 'Replacing synthetic PGR',
    description:
      'The third step was to stop the use of synthetic plant growth regulators, and to support the development of natural hormones in crops with the help of mycorrhiza.',
    meta: verified('/about-us'),
  },
  {
    period: '2021',
    title: 'SCT Saptapadi',
    description:
      'The fourth step was to stop the flow of toxic pollutants applied in the name of crop protection. SCT Saptapadi management was introduced in 2021.',
    meta: verified('/about-us'),
  },
  {
    period: '2015–19 →',
    title: 'SCT Vedic',
    description:
      'Between 2015 and 2019 SCT alone could not meet crop demand without chemical fertilisers. SCT Vedic emerged from that work as the next step.',
    meta: {
      provenance: 'needs-verification',
      source: `${SOURCE}/about-us`,
      note: 'The source also claims "10 years of research" by "Vedic Scientists". That claim is omitted here pending evidence — see unverifiedClaims in src/config/site.ts.',
    },
  },
]

/**
 * The knowledge loop described in the third principle — YouTube, WhatsApp and
 * farmer-to-farmer discussion. A genuine differentiator that the legacy site
 * buried inside a modal.
 */
export const knowledgeLoop = [
  {
    channel: 'Daily video',
    role: 'The breath',
    description:
      'Videos posted daily to the YouTube channel, watched with notes and comments prepared.',
  },
  {
    channel: 'Daily articles',
    role: 'The water',
    description: 'Articles published every day in the WhatsApp group and studied by users.',
  },
  {
    channel: 'Farmer to farmer',
    role: 'The food',
    description:
      '3–5 minutes of daily discussion with another user, new or experienced, in person or by phone.',
  },
] as const
