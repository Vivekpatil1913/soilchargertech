import type { Metadata } from "next";

import { images } from "@/data/images";
import { PageHero } from "@/components/common/PageHero";
import { FarmerStories } from "@/components/home/FarmerStories";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Farmer Stories",
  description:
    "Experiences from farmers working with Soil Charger Technology, in their own words. Stories are published only with the farmer's consent.",
  alternates: { canonical: "/farmer-stories" },
};

export default function FarmerStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Farmer stories"
        image={images.farmers.group}
        title={
          <>
            The part of this website that has to be{" "}
            <span className="text-leaf-400">earned.</span>
          </>
        }
        lead="A farmer telling another farmer what happened in their field is worth more than anything a company can write about itself. Which is exactly why nothing goes here until it is real and consented."
      />

      <FarmerStories />
      <FinalCTA />
    </>
  );
}
