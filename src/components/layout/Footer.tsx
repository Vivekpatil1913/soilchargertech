import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Youtube } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { site } from '@/config/site'
import { footerNav, legalNav, visibleNav } from '@/config/navigation'
import { Container } from '@/components/ui'

interface Social {
  href: string
  label: string
  Icon: LucideIcon
}

/**
 * LinkedIn and Twitter are absent by design — the legacy site's LinkedIn href
 * was a generic ad-tracking URL and its Twitter handle reads as off-brand.
 * See `unverifiedClaims` in src/config/site.ts.
 */
const socials: Social[] = [
  { href: site.social.youtube, label: 'YouTube', Icon: Youtube },
  { href: site.social.facebook, label: 'Facebook', Icon: Facebook },
  { href: site.social.instagram, label: 'Instagram', Icon: Instagram },
].filter((social) => Boolean(social.href))

export function Footer() {
  const { address, contacts } = site
  const year = new Date().getFullYear()

  return (
    <footer className="surface-dark border-hairline border-t">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          {/* Identity + routed contact details */}
          <div className="flex flex-col gap-8 lg:col-span-4">
            <div>
              <p className="font-display text-h4 text-ink">{site.name}</p>
              <p className="text-body text-ink-muted mt-3 max-w-xs">
                Soil-first agricultural inputs, built around organic carbon and root development.
                Founded {site.foundedYear} in {address.city}.
              </p>
            </div>

            <address className="flex flex-col gap-4 not-italic">
              <div className="flex gap-3">
                <MapPin aria-hidden="true" className="text-accent mt-0.5 size-4 shrink-0" />
                <span className="text-ink-muted text-[0.9375rem]">
                  {address.street}, {address.locality}, {address.city} — {address.postalCode},{' '}
                  {address.region}, {address.countryName}
                </span>
              </div>

              {/* The old site scattered 3 numbers and 3 emails with no routing.
                  Labelling who handles what is the fix. */}
              {Object.values(contacts).map((contact) => (
                <div key={contact.email} className="flex gap-3">
                  <Mail aria-hidden="true" className="text-accent mt-0.5 size-4 shrink-0" />
                  <span className="text-[0.9375rem]">
                    <span className="text-ink-subtle text-caption block">{contact.label}</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-ink-muted hover:text-accent"
                    >
                      {contact.email}
                    </a>
                    {contact.phone && (
                      <>
                        {' · '}
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-ink-muted hover:text-accent"
                        >
                          {contact.phoneDisplay}
                        </a>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </address>

            {socials.length > 0 && (
              <ul className="flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${site.name} on ${label}`}
                      className="border-hairline text-ink-muted hover:border-accent hover:text-accent inline-flex size-10 items-center justify-center rounded-sm border transition-colors"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sitemap */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {footerNav.map((column) => {
              const items = visibleNav(column.items)
              if (items.length === 0) return null
              return (
                <nav key={column.title} aria-label={column.title}>
                  <p className="eyebrow text-ink-subtle">{column.title}</p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-ink-muted hover:text-accent text-[0.9375rem] transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )
            })}
          </div>
        </div>

        <div className="border-hairline flex flex-col gap-4 border-t py-7 sm:flex-row sm:items-center sm:justify-between">
          {/* Year is computed, not hardcoded — the old footer read "©2026". */}
          <p className="text-caption text-ink-subtle">
            © {year} {site.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-5">
            {visibleNav(legalNav).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-caption text-ink-subtle hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/sitemap.xml"
                className="text-caption text-ink-subtle hover:text-accent transition-colors"
              >
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
