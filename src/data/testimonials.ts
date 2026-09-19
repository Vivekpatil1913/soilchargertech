/**
 * FARMER STORIES — DEMO DATA
 * ==========================
 * These entries are illustrative sample content used to demonstrate the
 * carousel with realistic copy and photography. They are NOT real farmers and
 * must be replaced before launch with stories SCT has verified and for which
 * the farmer has given written consent covering their name, village and
 * photograph.
 *
 * When replacing: keep `quote` to two or three sentences in the farmer's own
 * phrasing, and point `image` at their consented photograph.
 */

import { images } from "@/data/images";

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  crop: string;
  quote: string;
  result: string;
  /** Photograph path once consent is in hand. */
  image?: string;
  imageAlt?: string;
  isPlaceholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "story-1",
    name: "Ramesh Patil",
    location: "Kasbe Digraj, Sangli, Maharashtra",
    crop: "Sugarcane",
    quote:
      "My land had gone hard and white with salt, and water would just sit on top of it. After two seasons with Soil Charger the soil crumbles in my hand again and the cane roots go down deep. I have cut my chemical fertiliser by nearly half.",
    result: "Cane yield up from 42 to 58 tonnes per acre over two seasons",
    image: images.farmers.bullock.src,
    imageAlt: "Ramesh Patil standing beside his bullock cart at the edge of his sugarcane field",
    isPlaceholder: true,
  },
  {
    id: "story-2",
    name: "Sunita Jadhav",
    location: "Pimpalgaon, Nashik, Maharashtra",
    crop: "Grapes",
    quote:
      "For years the vines looked fine but the bunches were small and uneven. The SCT team tested my soil first and told me what was missing instead of just selling me a bag. Now the berries size up together and the exporter takes almost my whole crop.",
    result: "Export-grade bunches rose from 55% to 82% of the harvest",
    image: images.farmers.woman.src,
    imageAlt: "Sunita Jadhav standing among her grape vines",
    isPlaceholder: true,
  },
  {
    id: "story-3",
    name: "Bhagwan Shinde",
    location: "Ashti, Beed, Maharashtra",
    crop: "Cotton",
    quote:
      "We get very little rain here, so what matters to me is how long the soil holds moisture. Since we started using Soil Charger the field stays damp four or five days longer after watering, and the crop does not wilt the way it used to in May.",
    result: "Two fewer irrigation cycles per season, measured over three years",
    image: images.farmers.tractor.src,
    imageAlt: "Bhagwan Shinde preparing his cotton field with a tractor",
    isPlaceholder: true,
  },
  {
    id: "story-4",
    name: "Kavita Bhosale",
    location: "Karad, Satara, Maharashtra",
    crop: "Paddy",
    quote:
      "I farm two and a half acres and I cannot afford to experiment. I tried it on one plot first and kept the rest as it was. The difference in tillering was clear enough by the second season that I moved the whole field over.",
    result: "Paddy yield up 22% on the treated plot against her own control plot",
    image: images.farmers.harvest.src,
    imageAlt: "Kavita Bhosale harvesting paddy by hand in her field",
    isPlaceholder: true,
  },
];
