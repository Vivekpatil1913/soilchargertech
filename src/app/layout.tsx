import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoogleTranslate } from "@/components/layout/GoogleTranslate";
import { MotionProvider } from "@/components/common/MotionProvider";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { SITE_URL, SEO_DEFAULTS } from "@/lib/constants";
import { addressOneLine, contact, site, socials } from "@/data/site";

/**
 * Two families, no more: Plus Jakarta Sans carries the headings — it has the
 * warmth and the wide counters that keep large agricultural typography from
 * feeling corporate — and Inter handles body copy, where its tall x-height
 * keeps long Marathi- and Hindi-translated paragraphs readable.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_DEFAULTS.title,
    template: SEO_DEFAULTS.titleTemplate,
  },
  description: SEO_DEFAULTS.description,
  keywords: [...SEO_DEFAULTS.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: SITE_URL,
    siteName: site.name,
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [{ url: "/logo/sct-logo.png", width: 500, height: 480, alt: `${site.name} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: ["/logo/sct-logo.png"],
  },
  icons: { icon: "/logo/sct-logo.png", apple: "/logo/sct-logo.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Agriculture",
};

export const viewport: Viewport = {
  themeColor: "#1b8a4b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Organisation schema so search engines resolve SCT as a real business. */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/sct-logo.png`,
  description: site.description,
  foundingDate: String(site.founded),
  founder: { "@type": "Person", name: site.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: addressOneLine,
    addressLocality: contact.address.city,
    addressRegion: contact.address.state,
    postalCode: contact.address.pincode,
    addressCountry: "IN",
  },
  contactPoint: contact.phones.map((phone) => ({
    "@type": "ContactPoint",
    telephone: phone,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "mr", "hi"],
  })),
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          // Serialised server-side from a literal we control — no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />

        <MotionProvider>
          <SmoothScroll />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>

        <GoogleTranslate />
      </body>
    </html>
  );
}
