import type { Application } from '@/types/application'

const SOURCE = 'soilchargertechnology.com'
const ARCHIVE = 'web.archive.org snapshot of soilchargertechnology.com, 2024-10-07'

/**
 * Crop photography, taken from the company's own recovered media rather than
 * stock. Each one shows the crop it is attached to — a pomegranate orchard, a
 * vegetable field under spray, and a trellised vineyard — so the imagery makes
 * no claim the page does not already make.
 */

/**
 * Applications.
 *
 * The existing site names crop contexts ONLY inside dosage strings — "Orchards
 * 3 to 5 liters per acre", "Vegetable 1 to 3 liters per acre", "5 to 7 ml for
 * grapes". Those three are therefore verified, but thin.
 *
 * The broader applications the brief asked for (Water, Environmental,
 * Industrial) have no source content whatsoever. They ship as flagged
 * placeholders so the routing, schema and UI are ready, and they are excluded
 * from navigation and sitemap until the client fills them in.
 */
export const applications: Application[] = [
  {
    slug: 'orchards',
    name: 'Orchards',
    excerpt:
      'Perennial fruit crops, the context most frequently named in the product dosage guidance.',
    description: [],
    productSlugs: ['super-soil-charger', 'super-fruit-charger'],
    image: {
      src: '/images/gallery/261.jpg',
      alt: 'Ripening pomegranates on the tree in an orchard',
      width: 1000,
      height: 450,
    },
    featured: true,
    meta: {
      provenance: 'needs-verification',
      source: `${SOURCE}/sub-product/88`,
      note: `Only the dosage rate is verifiable ("Orchards 3 to 5 liters per acre"). Descriptive copy and the full product mapping are still required. Photograph recovered from ${ARCHIVE}.`,
    },
  },
  {
    slug: 'vegetables',
    name: 'Vegetables',
    excerpt: 'Vegetable crops, named separately in product dosage guidance.',
    description: [],
    productSlugs: ['super-soil-charger', 'super-fruit-charger'],
    image: {
      src: '/images/articles/12.jpg',
      alt: 'A grower spraying rows of leafy vegetables',
      width: 636,
      height: 394,
    },
    featured: true,
    meta: {
      provenance: 'needs-verification',
      source: `${SOURCE}/sub-product/88`,
      note: `Only the dosage rate is verifiable ("Vegetable 1 to 3 liters per acre"). Descriptive copy is still required. Photograph recovered from ${ARCHIVE}.`,
    },
  },
  {
    slug: 'grapes',
    name: 'Grapes',
    excerpt: 'Called out with its own dosage rate, and the subject of a dedicated article.',
    description: [],
    productSlugs: ['super-fruit-charger'],
    image: {
      src: '/images/articles/17.jpg',
      alt: 'Bunches of green grapes hanging from a trellised vine',
      width: 400,
      height: 300,
    },
    featured: true,
    meta: {
      provenance: 'needs-verification',
      source: `${SOURCE}/sub-product/92`,
      note: `Verifiable only as a dosage exception ("5 to 7 ml for grapes") plus one article. Descriptive copy is still required. Photograph recovered from ${ARCHIVE}.`,
    },
  },
  {
    slug: 'water-management',
    name: 'Water Management',
    excerpt: '',
    description: [],
    productSlugs: [],
    image: undefined,
    featured: false,
    meta: {
      provenance: 'placeholder',
      note: 'Requested in the brief. No supporting content exists on the current website — the only water reference is the product name "Super Water Charger". Awaiting client content.',
    },
  },
  {
    slug: 'environmental',
    name: 'Environmental Applications',
    excerpt: '',
    description: [],
    productSlugs: [],
    image: undefined,
    featured: false,
    meta: {
      provenance: 'placeholder',
      note: 'Requested in the brief. No supporting content exists on the current website. Awaiting client content.',
    },
  },
  {
    slug: 'industrial',
    name: 'Industrial Applications',
    excerpt: '',
    description: [],
    productSlugs: [],
    image: undefined,
    featured: false,
    meta: {
      provenance: 'placeholder',
      note: 'Requested in the brief. No supporting content exists on the current website. Awaiting client content.',
    },
  },
]
