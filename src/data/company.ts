const SOURCE = 'soilchargertechnology.com'
const verified = (path: string) => ({ provenance: 'verified' as const, source: `${SOURCE}${path}` })

/**
 * The founder's statement, condensed from the About section. Every sentence
 * corresponds to one on the live site; nothing is added.
 */
export const founderStatement = {
  intro:
    'After the Green Revolution, the pursuit of higher yields interfered with the natural life cycle of crops and led to the overuse of chemicals. The health of both crop and soil was endangered.',
  paragraphs: [
    'Recognising this threat in 2015, SCT gave first priority to increasing soil fertility and organic carbon, and set out to provide a strong source of it.',
    'From there the work moved to stopping soil pollution with viable alternatives, replacing synthetic plant growth regulators with natural hormone development supported by mycorrhiza, and ending the flow of toxic pollutants applied in the name of crop protection.',
    'We have faith in agriculture and soil to complete the farmer’s dream.',
  ],
  meta: verified('/about-us'),
}

/** Verbatim from /vision-mission. */
export const vision = {
  points: [
    'Prosperous and permanent farming.',
    'Production of 100% nutritious and non-toxic agricultural goods.',
    'Inheritance of fertile soil and pure water for the next generation.',
    'Sustainable and prosperous agriculture, in quality and quantity.',
  ],
  meta: verified('/vision-mission'),
}

export const mission = {
  points: [
    'To make India truly agricultural and bring about a farmers’ state.',
    'To encourage young people to cultivate with joy, and to think positively about agriculture.',
  ],
  meta: verified('/vision-mission'),
}

/**
 * Founder portrait, recovered from the Internet Archive. The other four team
 * members have no photograph anywhere in the recovered media, so their cards
 * keep a placeholder rather than borrowing someone else's face.
 */
export const founderPortrait = {
  src: '/images/about/270420241033535.jpg',
  alt: 'Portrait of Mr. Ram Mukhekar, founder of Soil Charger Technology',
  width: 962,
  height: 1015,
}

/** Verbatim from /our-team. */
export const team = [
  { name: 'Aniket Sahane', role: 'Director' },
  { name: 'Rushikesh Hadwale', role: 'Production Director' },
  { name: 'Prasad Mukhekar', role: 'Development Director' },
  { name: 'Arun Patole', role: 'General Manager' },
  { name: 'Bhausaheb Khemnar', role: 'Technical Expert' },
] as const

export const teamMeta = verified('/our-team')

/**
 * Benefits shown in "Why this technology".
 *
 * Every one is drawn directly from a verified product function list — mostly
 * Super Soil Charger's. Nothing here is a marketing claim written by us.
 */
export const benefits = [
  {
    title: 'Organic carbon',
    description: 'Helps to increase organic carbon in the soil.',
    meta: verified('/sub-product/88'),
  },
  {
    title: 'Root development',
    description: 'Fertiliser uptake increases as the number of white roots grows.',
    meta: verified('/sub-product/88'),
  },
  {
    title: 'pH and EC control',
    description: 'Controls the pH of the soil and its electrical conductivity.',
    meta: verified('/sub-product/88'),
  },
  {
    title: 'Chelation',
    description: 'Assists the chelation of metals and chemical fertilisers already in the soil.',
    meta: verified('/sub-product/88'),
  },
  {
    title: 'Microbial activity',
    description: 'Increases the metabolism of micro-organisms in the soil.',
    meta: verified('/sub-product/88'),
  },
  {
    title: 'Stress tolerance',
    description:
      'Reduces stress on the crop under low water, and protects it from extreme cold and extreme heat.',
    meta: verified('/sub-product/88'),
  },
]
