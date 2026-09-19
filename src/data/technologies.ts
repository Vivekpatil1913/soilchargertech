/**
 * The science SCT works with, written for a farmer rather than an agronomist.
 * Each entry explains a mechanism SCT already references publicly; none of them
 * claims a measured result.
 */

export type Technology = {
  id: string;
  title: string;
  marathi?: string;
  short: string;
  body: string;
};

export const technologies: Technology[] = [
  {
    id: "organic-carbon",
    title: "Organic carbon",
    short: "The single number that tells you how alive your soil is.",
    body:
      "Organic carbon is what feeds soil life, holds water and keeps soil crumbly instead of hard. When it falls, everything else on the farm gets harder — water runs off, roots struggle, and more input is needed for the same result. Raising it back up was SCT's first objective, and it remains the foundation of everything the company makes.",
  },
  {
    id: "mycorrhiza",
    title: "Mycorrhiza",
    short: "A fungal network that extends the reach of every root.",
    body:
      "Mycorrhizal fungi live with plant roots and stretch far beyond them into the soil, bringing back water and nutrients the root could never have reached alone. SCT works with mycorrhiza to support a crop's own hormone development — so growth is guided from inside the plant rather than forced from outside with synthetic regulators.",
  },
  {
    id: "natural-hormones",
    title: "Natural crop hormones",
    short: "Let the plant set its own pace.",
    body:
      "Every crop already knows how to root, flower and fill. Synthetic plant growth regulators override that timing; a plant supported to make its own hormones keeps it. SCT's third development step was precisely this — a safer alternative to synthetic PGRs.",
  },
  {
    id: "soil-biology",
    title: "Soil biology",
    short: "Soil is not a container. It is a living population.",
    body:
      "A gram of healthy soil holds an enormous working population of microbes. They unlock nutrients that are present but unavailable, build structure and defend the root zone. Feed them organic matter and they work for the whole season, for free.",
  },
  {
    id: "crop-nutrition",
    title: "Crop nutrition as protection",
    short: "A well-fed crop defends itself better than a treated one.",
    body:
      "Thousands of farmers have shown through their own experience that nutrition plays a real role in protecting a crop. It is the reasoning behind SCT's first pillar — work on nourishment, not on disease — and behind the company's fourth development step, reducing toxic inputs applied in the name of protection.",
  },
  {
    id: "vedic",
    title: "SCT Vedic Technology",
    short: "Roughly ten years of research, brought into one system.",
    body:
      "Vedic Technology was developed over about a decade through collaboration between Vedic scientists, the SCT team and long agricultural experience. It builds directly on the foundation SCT laid from 2015 onward, and is the company's most complete answer to the question it started with.",
  },
];

/**
 * The chain shown in the Technology section's ecosystem diagram.
 * Deliberately short and plain — a farmer should follow it at a glance.
 */
export const soilChain = [
  { label: "Soil", note: "Where every season begins" },
  { label: "Organic carbon", note: "Food for soil life" },
  { label: "Microbial activity", note: "Nutrients unlocked" },
  { label: "Root development", note: "Wider reach, stronger anchor" },
  { label: "Plant nutrition", note: "Fed from the inside" },
  { label: "Healthy crop", note: "Quality with quantity" },
  { label: "Farmer prosperity", note: "The point of all of it" },
] as const;
