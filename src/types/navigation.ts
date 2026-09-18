/**
 * Navigation item availability.
 *
 * `placeholder` items are rendered only in development and on staging
 * (NEXT_PUBLIC_ALLOW_PLACEHOLDERS=true), so the client can review the full
 * information architecture while real visitors never hit a route with nothing
 * behind it.
 */
export type NavStatus = 'live' | 'placeholder'

export interface NavItem {
  label: string
  href: string
  /** Short line used in the mega-menu and as a link title. */
  description?: string
  status?: NavStatus
  children?: NavItem[]
}

export interface FooterColumn {
  title: string
  items: NavItem[]
}
