import { images } from "./images";

/**
 * KNOWLEDGE CENTRE
 * ================
 * Article stubs written for a farmer audience. Each `excerpt` explains a
 * principle SCT already works from; none reports a study, trial result or
 * measured figure. `body` is a placeholder — full articles are to be written
 * with SCT's agronomy team, ideally in Marathi and Hindi alongside English.
 */

export type Article = {
  slug: string;
  category: "Soil Health" | "Crop Nutrition" | "Sustainable Farming" | "Farmer Education";
  title: string;
  excerpt: string;
  readingTime: string;
  image: { src: string; alt: string };
  body: string;
};

const BODY_PLACEHOLDER =
  "[Full article to be written with SCT's agronomy team, and translated into Marathi and Hindi.]";

export const articles: Article[] = [
  {
    slug: "what-organic-carbon-really-does",
    category: "Soil Health",
    title: "What organic carbon actually does in your field",
    excerpt:
      "It holds water, feeds soil life and keeps soil crumbly instead of hard. When it drops, every other job on the farm gets harder.",
    readingTime: "4 min read",
    image: images.soil.compost,
    body: BODY_PLACEHOLDER,
  },
  {
    slug: "mycorrhiza-explained-simply",
    category: "Soil Health",
    title: "Mycorrhiza, explained without the jargon",
    excerpt:
      "A fungal network that reaches far past the root and brings back water and nutrients the root alone would never find.",
    readingTime: "5 min read",
    image: images.soil.mycorrhiza,
    body: BODY_PLACEHOLDER,
  },
  {
    slug: "why-soil-not-climate",
    category: "Sustainable Farming",
    title: "Why we say: work on soil, not on climate",
    excerpt:
      "No one controls the rain. Soil is the part of the season that answers to effort — which makes it the place to spend it.",
    readingTime: "3 min read",
    image: images.soil.profile,
    body: BODY_PLACEHOLDER,
  },
  {
    slug: "nutrition-as-crop-protection",
    category: "Crop Nutrition",
    title: "Nutrition as crop protection",
    excerpt:
      "Farmers have shown through their own experience that a well-fed crop needs less defending. Here is the reasoning behind it.",
    readingTime: "5 min read",
    image: images.crops.vegetables,
    body: BODY_PLACEHOLDER,
  },
  {
    slug: "reading-your-soil",
    category: "Farmer Education",
    title: "Reading your own soil, without a laboratory",
    excerpt:
      "Colour, smell, crumb and how water behaves after rain. Four things any farmer can check before spending on anything.",
    readingTime: "6 min read",
    image: images.soil.survey,
    body: BODY_PLACEHOLDER,
  },
  {
    slug: "leaf-and-root-first",
    category: "Crop Nutrition",
    title: "Leaf and root first — why the fruit comes last",
    excerpt:
      "Good fruit is a result, not a target. Everything that produces it happens earlier, and further down.",
    readingTime: "4 min read",
    image: images.crops.grapes,
    body: BODY_PLACEHOLDER,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
