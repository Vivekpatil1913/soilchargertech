import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { site } from '@/config/site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { MotionGate } from '@/components/motion/MotionGate'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld'
import './globals.css'

/**
 * Fonts are self-hosted by next/font — zero requests to fonts.googleapis.com,
 * zero layout shift. The old site made 2 render-blocking requests to Google
 * Fonts and loaded Font Awesome twice.
 *
 * Noto Sans Devanagari is deliberately NOT loaded here: it is ~200KB and only
 * the mr/hi locales need it. It gets loaded inside those route segments once
 * i18n lands, so English visitors never pay for it.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
  // MEASURED: setting `preload: false` here shaved ~0.3s off LCP but pushed CLS
  // from 0 to 0.173, because the mono face swapped in after paint and reflowed
  // every data value and eyebrow on the page. Net Lighthouse score fell 94 -> 88.
  // Preloading all three faces is the better trade.
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Fixes the old site's single biggest SEO failure: one identical
    // 22-character title across every page.
    default: `${site.name} — Soil Science for Regenerative Agriculture`,
    template: `%s | ${site.name}`,
  },
  description:
    'Soil Charger Technology builds soil-first agricultural inputs around organic carbon, humus and root development. Founded 2015 in Nashik, Maharashtra.',
  applicationName: site.name,
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: site.url,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0e0b' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/*
          Organization and WebSite schema, emitted once at the root so every
          page inherits the `@id` references that Product, Article and
          BreadcrumbList point back to. The legacy site had no structured data
          of any kind.
        */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <MotionGate>
          <SmoothScroll />
          <SkipLink />
          <Header />
          {/* `flex-1` keeps the footer at the bottom on short pages.
              `#main` is the skip-link target. */}
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionGate>
      </body>
    </html>
  )
}
