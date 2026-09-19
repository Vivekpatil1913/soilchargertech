import { images } from "./images";

/**
 * Crop categories SCT's solutions are used across.
 * Categories only — no crop-specific dosage or performance claim is made here.
 */

export type Application = {
  id: string;
  title: string;
  examples: string;
  body: string;
  image: { src: string; alt: string };
};

export const applications: Application[] = [
  {
    id: "vegetables",
    title: "Vegetables",
    examples: "Tomato, brinjal, chilli, okra, gourds, leafy greens",
    body: "Short cycles and heavy picking pressure make soil condition and steady nutrition decide the whole season.",
    image: images.crops.vegetables,
  },
  {
    id: "fruits",
    title: "Fruits & vineyards",
    examples: "Grape, pomegranate, banana, mango, citrus",
    body: "Perennial plantings live with the same soil for years, so what happens below ground compounds season after season.",
    image: images.crops.grapes,
  },
  {
    id: "cereals",
    title: "Cereals",
    examples: "Wheat, rice, jowar, bajra, maize",
    body: "The staple crops, grown at scale, where small gains in soil condition carry across a large area.",
    image: images.crops.wheat,
  },
  {
    id: "pulses",
    title: "Pulses & oilseeds",
    examples: "Tur, gram, soybean, groundnut, moong",
    body: "Crops that work with soil biology by nature — and respond to soil that has the biology to work with.",
    image: images.crops.maize,
  },
  {
    id: "cash-crops",
    title: "Cash crops",
    examples: "Sugarcane, cotton",
    body: "Long-duration, high-demand crops that draw heavily on the soil and show the cost of depletion first.",
    image: images.crops.sugarcane,
  },
  {
    id: "horticulture",
    title: "Horticulture & plantations",
    examples: "Orchards, plantation crops, polyhouse cultivation",
    body: "Long-term plantings where soil is an asset being built or spent, not an input bought each season.",
    image: images.crops.banana,
  },
];
