import { IsoCertification } from "@/components/common/IsoCertification";
import { Seo } from "@/components/common/Seo";
import { Benefits } from "@/components/home/Benefits";
import { ContactCta } from "@/components/home/ContactCta";
import { FieldVideo } from "@/components/home/FieldVideo";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
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
 * Twelve sections, in the order a visitor asks the questions:
 *
 *   who is this        → Hero
 *   is that my problem → Problem
 *   are they real      → FieldVideo
 *   what is their idea → Pillars
 *   what do they do    → Method
 *   what can I buy     → Products      ← the section the page is built to reach
 *   what do I get      → Benefits
 *   why them           → WhySct
 *   who else uses it   → Proof
 *   can I see it       → Gallery
 *   can I trust them   → IsoCertification
 *   how do I reach them→ ContactCta
 *
 * WHY THE VIDEO IS NO LONGER FIRST
 * --------------------------------
 * It used to open the page, above the hero. Three things were wrong with that
 * on a phone, which is where most of this audience arrives:
 *
 *   · the band is floored at a fixed height, so it owned the entire first
 *     screen and pushed the <h1>, the proposition and both CTAs below the fold;
 *   · its only call to action points at YouTube, so the first thing a visitor
 *     could act on sent them off the site before they knew what was sold;
 *   · it carries an <h2>, which meant the document ran h2 before h1.
 *
 * Nothing about the section itself was wrong — it was in the wrong place.
 * "Show me this is real" is the live question once the problem has landed, not
 * before anything has been said, so it now sits third, between Problem and
 * Pillars. Full-bleed there still reads as a chapter break.
 *
 * Grounds alternate deliberately: forest, soil and tint bands break the page
 * into chapters, and the products section sits on the darkest ground so the
 * white cards carry the most contrast on the page.
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
      <Problem />
      <FieldVideo />
      <Pillars />
      <Method />
      <Products />
      <Benefits />
      <WhySct />
      <Proof />
      <Gallery />
      <IsoCertification />
      <ContactCta />
    </>
  );
}
