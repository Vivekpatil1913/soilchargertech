import type { FooterColumn, NavItem } from '@/types/navigation'

/**
 * Site navigation, per the approved Phase 2 sitemap.
 *
 * Deliberate changes from the legacy IA:
 *  - Technology is promoted to first position. The 4 Pillars and 3 Principles
 *    are the only genuinely ownable IP; the old site buried them mid-homepage.
 *  - Contact is a real route. The old site's "Contact" was an anchor to
 *    #Footer — there was no contact page at all.
 *  - Distributorship is lifted out of "Career". It is a sales funnel, not a job
 *    application, and it was three levels deep.
 *  - About/Vision-Mission/Our Team collapse into /about; they were three pages
 *    of duplicate content.
 */
export const mainNav: NavItem[] = [
  {
    label: 'Technology',
    href: '/technology',
    children: [
      {
        label: 'How It Works',
        href: '/technology/how-it-works',
        description: 'The four pillars and three principles, end to end',
      },
      {
        label: 'Advantages',
        href: '/technology/advantages',
        description: 'What the technology changes in the soil',
      },
      {
        label: 'Research & Development',
        href: '/technology/research',
        description: 'Organic carbon, humus and mycorrhiza',
        status: 'placeholder',
      },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'All Products', href: '/products', description: '21 products across two ranges' },
      { label: 'Super Range', href: '/products?line=super', description: 'The original range' },
      { label: 'SCT Vedic Range', href: '/products?line=vedic', description: 'The later range' },
    ],
  },
  { label: 'Applications', href: '/applications' },
  { label: 'Projects', href: '/projects', status: 'placeholder' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      {
        label: 'Articles',
        href: '/resources/articles',
        description: '21 articles, English and Marathi',
      },
      { label: 'Videos', href: '/resources/videos', description: 'Field and training videos' },
      { label: 'Brochures', href: '/resources/brochures', status: 'placeholder' },
      { label: 'FAQ', href: '/resources/faq', status: 'placeholder' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Company', href: '/about', description: 'Founded 2015 in Nashik' },
      { label: 'Leadership', href: '/about/leadership', description: 'The team' },
      { label: 'Certifications', href: '/about/certifications', status: 'placeholder' },
    ],
  },
]

/** Primary header CTA. */
export const headerCta: NavItem = { label: 'Contact', href: '/contact' }

export const footerNav: FooterColumn[] = [
  {
    title: 'Technology',
    items: [
      { label: 'Overview', href: '/technology' },
      { label: 'How It Works', href: '/technology/how-it-works' },
      { label: 'Advantages', href: '/technology/advantages' },
      { label: 'Research & Development', href: '/technology/research', status: 'placeholder' },
    ],
  },
  {
    title: 'Products',
    items: [
      { label: 'All Products', href: '/products' },
      { label: 'Super Range', href: '/products?line=super' },
      { label: 'SCT Vedic Range', href: '/products?line=vedic' },
      { label: 'Applications', href: '/applications' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Projects', href: '/projects', status: 'placeholder' },
      { label: 'Careers', href: '/careers' },
      { label: 'Distributorship', href: '/distributorship' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Articles', href: '/resources/articles' },
      { label: 'Videos', href: '/resources/videos' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'FAQ', href: '/resources/faq', status: 'placeholder' },
    ],
  },
]

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/legal/privacy', status: 'placeholder' },
  { label: 'Terms of Use', href: '/legal/terms', status: 'placeholder' },
]

/**
 * Placeholder routes are hidden in production so no visitor lands on an empty
 * page, but stay visible in dev/staging for client review of the full IA.
 */
export function isNavItemVisible(item: NavItem): boolean {
  if (item.status !== 'placeholder') return true
  return (
    process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ALLOW_PLACEHOLDERS === 'true'
  )
}

export function visibleNav(items: NavItem[]): NavItem[] {
  return items.filter(isNavItemVisible).map((item) => ({
    ...item,
    children: item.children?.filter(isNavItemVisible),
  }))
}
