import type { ContentMeta } from '@/types/content'

export interface FaqEntry {
  question: string
  /** Each paragraph of the answer. */
  answer: string[]
  meta: ContentMeta
}

const SOURCE = 'soilchargertechnology.com'
const verified = (path = '') => ({ provenance: 'verified' as const, source: `${SOURCE}${path}` })

/**
 * FAQ.
 *
 * The legacy site has no FAQ page. Every entry below is answered strictly from
 * content that IS published there — the three principles, the four pillars and
 * the product dosage lines. Nothing is invented.
 *
 * The questions a prospective buyer would most want answered — price,
 * availability, certification, shelf life, crop-specific programmes — cannot be
 * answered from any source, and are listed in `unansweredQuestions` instead of
 * being guessed at.
 */
export const faq: FaqEntry[] = [
  {
    question: 'What is Soil Charger Technology?',
    answer: [
      'A soil-first approach to crop nutrition developed from 2015, built around increasing organic carbon and soil fertility rather than treating symptoms in the crop.',
      'It is expressed as four pillars — work on nourishment not disease, on soil not climate, on humus not other things, and on leaf and roots not fruits.',
    ],
    meta: verified(),
  },
  {
    question: 'How often should the basal dose be applied?',
    answer: [
      'A basal dose of Krushi Amrut, Root Charger and Nutri Charger is given every 60 days, adjusted to the requirement of the plant.',
      'Separately, in every soil, drip or drenching application — at least once a week — Soil Charger 1 litre and Health Charger 600 g are used per acre. Each spray is mixed with a Fruit Charger.',
    ],
    meta: verified(),
  },
  {
    question: 'Can chemical fertiliser be used alongside it?',
    answer: [
      'No. The second principle states plainly that no chemical fertiliser should be used, granular or water-soluble.',
      'For crop protection, only Pest Fighter, Pest Cleaner, Disease Fighter and Fungi Cleaner are to be used, and no chemicals.',
    ],
    meta: verified(),
  },
  {
    question: 'Are there practices to avoid?',
    answer: [
      'Yes. Soil should not be cultivated in a way that causes movement or exposure, and mulching should not be done with part of the trunk.',
      'Weeds should not be cut in rainy weather or while it is raining — that work is done in a dry environment.',
    ],
    meta: verified(),
  },
  {
    question: 'What is the third principle about?',
    answer: [
      'Continuous learning. Users watch the daily videos posted to the YouTube channel and keep notes, study the articles published daily in the WhatsApp group, and spend three to five minutes a day discussing the method with another user.',
      'The company describes these three habits as the breath, the water and the food of an SCT user.',
    ],
    meta: verified(),
  },
  {
    question: 'How much product is used per acre?',
    answer: [
      'It depends on the product and the crop. Super Soil Charger, for example, is published at 3 to 5 litres per acre for orchards and 1 to 3 litres per acre for vegetables, monthly.',
      'Every product page carries its own published application rate and pack sizes.',
    ],
    meta: verified('/sub-product/88'),
  },
]

/**
 * Questions that cannot be answered from any published source. Surfaced on the
 * FAQ page as outstanding rather than answered speculatively.
 */
export const unansweredQuestions: ContentMeta & { questions: string[] } = {
  provenance: 'placeholder',
  note: 'None of these can be answered from the current website. Answers required from the client.',
  questions: [
    'What do the products cost, and how are they sold?',
    'Where can they be bought, and which regions have distributors?',
    'What is the shelf life and how should product be stored?',
    'Is the product certified for organic certification schemes?',
    'How long before results are visible, and how is that measured?',
    'Is there a crop-specific programme, and who advises on it?',
    'What is the SCT Saptapadi management referred to on the About page?',
  ],
}
