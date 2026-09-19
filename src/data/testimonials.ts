/**
 * FARMER STORIES — PLACEHOLDER DATA
 * =================================
 * Every field here is a bracketed placeholder on purpose. We do not publish
 * farmer names, locations, or results that SCT has not verified and consented
 * to. The carousel, layout and animation are production-ready; swap the strings
 * below for real, consented stories and the section ships as-is.
 *
 * When replacing: keep `quote` to two or three sentences, and record written
 * consent from the farmer for their name, village and photograph.
 */

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  crop: string;
  quote: string;
  result: string;
  /** Photograph path once consent is in hand. */
  image?: string;
  isPlaceholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "story-1",
    name: "[Farmer Name]",
    location: "[Village, District, Maharashtra]",
    crop: "[Crop]",
    quote:
      "[Farmer's own words about working with SCT — what the soil was like before, what changed, and over how many seasons. Two to three sentences, recorded and consented.]",
    result: "[Verified result]",
    isPlaceholder: true,
  },
  {
    id: "story-2",
    name: "[Farmer Name]",
    location: "[Village, District]",
    crop: "[Crop]",
    quote:
      "[Farmer's own words. Keep the farmer's phrasing rather than rewriting it into marketing language — the value of this section is that it sounds like a farmer, not like a brochure.]",
    result: "[Verified result]",
    isPlaceholder: true,
  },
  {
    id: "story-3",
    name: "[Farmer Name]",
    location: "[Village, District]",
    crop: "[Crop]",
    quote:
      "[Farmer's own words. If the story includes a measured outcome, note who measured it and when, so the claim can stand behind itself.]",
    result: "[Verified result]",
    isPlaceholder: true,
  },
  {
    id: "story-4",
    name: "[Farmer Name]",
    location: "[Village, District]",
    crop: "[Crop]",
    quote:
      "[Farmer's own words about the change they observed in their field across seasons.]",
    result: "[Verified result]",
    isPlaceholder: true,
  },
];
