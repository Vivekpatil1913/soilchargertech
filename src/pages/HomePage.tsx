import { Seo } from "@/components/common/Seo";
import { Benefits } from "@/components/home/Benefits";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero, StatBand } from "@/components/home/Hero";
import { Knowledge } from "@/components/home/Knowledge";
import { Method } from "@/components/home/Method";
import { Pillars } from "@/components/home/Pillars";
import { Problem } from "@/components/home/Problem";
import { Products } from "@/components/home/Products";
import { Proof } from "@/components/home/Proof";
import { WhySct } from "@/components/home/WhySct";
import { contact, site } from "@/data/site";
import { SITE_URL } from "@/lib/constants";

/**
 * HOMEPAGE
 * ========
 * Ten bands, in the order a visitor asks the questions:
 *
 *   who is this          → Hero
 *   how big are they     → StatBand
 *   what is wrong        → Problem
 *   what is their idea   → Pillars
 *   what can I buy       → Products     ← the band the page is built to reach
 *   what do I do with it → Method
 *   what do I get        → Benefits
 *   why them             → WhySct
 *   who else uses it     → Proof
 *   where do I learn     → Knowledge
 *   how do I reach them  → ContactCta
 *
 * Grounds alternate canvas → white → canvas → forest, which is what breaks a
 * long page into chapters. Only two bands on the whole page are dark: Products
 * and the closing call to action. That is deliberate — a dark band is the
 * loudest thing the design system has, so it is spent on the catalogue and on
 * the one action, and on nothing else.
 */
export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/soillogo.jpg`,
    description: site.description,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.pincode,
      addressCountry: "IN",
    },
    contactPoint: contact.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.replace(/\s/g, ""),
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "mr", "hi"],
    })),
  };

  return (
    <>
      <Seo
        title="Soil Charger Technology — Feed the soil, the crop follows"
        bareTitle
        description={`Organic soil inputs from Nashik since ${site.founded}. 21 products across the SCT Vedic and Super ranges — built to rebuild organic carbon, strengthen roots and feed crops naturally, with no chemical fertiliser.`}
        path="/"
        jsonLd={jsonLd}
      />

      <Hero />
      <StatBand />
      <Problem />
      <Pillars />
      <Products />
      <Method />
      <Benefits />
      <WhySct />
      <Proof />
      <Knowledge />
      <ContactCta />
    </>
  );
}
