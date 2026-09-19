import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { TechnologySection } from "@/components/home/TechnologySection";
import { VedicSection } from "@/components/home/VedicSection";
import { SaptapadiSection } from "@/components/home/SaptapadiSection";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { ApplicationsSection } from "@/components/home/ApplicationsSection";
import { FarmerSection } from "@/components/home/FarmerSection";
import { VisionSection } from "@/components/home/VisionSection";
import { YouthSection } from "@/components/home/YouthSection";
import { FarmerStories } from "@/components/home/FarmerStories";
import { KnowledgeSection } from "@/components/home/KnowledgeSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Soil Charger Technology | Sustainable Agriculture & Soil Health",
  description:
    "Reviving soil, nourishing crops, empowering farmers. Since 2015, Soil Charger Technology has worked on organic carbon, soil fertility and sustainable crop management for Indian farmers. Nashik, Maharashtra.",
  alternates: { canonical: "/" },
};

/**
 * HOMEPAGE
 * ========
 * The order below is the argument, and it is meant to be read top to bottom:
 *
 *   there is a problem underground  →  here is how we approached it  →
 *   here is how long that took  →  here is the science  →  here is what came
 *   of it  →  here is how to use it  →  here is who it is for  →  here is
 *   what we are aiming at  →  here is how to reach us.
 *
 * Each section is its own component with its own data source, so the story can
 * be re-sequenced by moving a line in this file.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <JourneyTimeline />
      <TechnologySection />
      <VedicSection />
      <SaptapadiSection />
      <ProductShowcase />
      <ApplicationsSection />
      <FarmerSection />
      <VisionSection />
      <YouthSection />
      <FarmerStories />
      <KnowledgeSection />
      <FinalCTA />
    </>
  );
}
