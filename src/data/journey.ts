/**
 * SCT's timeline. Every milestone below is drawn from the company's own
 * published account of its history — no dates or outcomes have been added.
 */

export type Milestone = {
  year: string;
  title: string;
  summary: string;
  body: string;
  /** The objective SCT set itself at this point. */
  focus: string;
};

export const journey: Milestone[] = [
  {
    year: "2015",
    title: "The beginning",
    focus: "Organic carbon first",
    summary: "Soil fertility and organic carbon are made the first priority.",
    body:
      "After the Green Revolution, the pursuit of yield pushed fertiliser and chemical use far beyond what the crop cycle could absorb. Soil paid for it. Recognising that in 2015, SCT set itself one objective before any other: restore fertility by providing a strong and reliable source of organic carbon.",
  },
  {
    year: "2015–2019",
    title: "Research and learning",
    focus: "Honest limits, steady progress",
    summary: "Years of field trial, and an honest account of what was still missing.",
    body:
      "In these years SCT solutions alone could not fully meet a crop's requirement — chemical fertiliser was still needed alongside them. Rather than claim otherwise, the company kept testing in the field, and used the gap as the brief for everything that followed.",
  },
  {
    year: "2021",
    title: "SCT Saptapadi",
    focus: "Management, not just inputs",
    summary: "A structured seven-step approach to crop management.",
    body:
      "Thousands of farmers showed, through their own experience, that nutrition plays a real part in protecting a crop. Saptapadi came out of that — and out of studying where crop management goes wrong — as a structured way to think about the whole season rather than a single spray.",
  },
  {
    year: "Today",
    title: "SCT Vedic",
    focus: "A decade of research, applied",
    summary: "Roughly ten years of research turned into Vedic Technology.",
    body:
      "Vedic Technology grew out of the foundation SCT had already built. Around ten years of work — Vedic scientists, the SCT team and accumulated agricultural experience together — produced it. Today SCT Vedic is the company's clearest step toward a more sustainable agricultural future for India.",
  },
];

/** The four steps of SCT's development strategy, as the company describes them. */
export const strategySteps = [
  {
    number: "01",
    title: "Restore organic carbon",
    body: "Give the soil a strong, dependable source of organic carbon — the first objective, set in 2015.",
  },
  {
    number: "02",
    title: "Strengthen soil fertility",
    body: "Offer real alternatives to the practices that pollute soil, so fertility builds instead of depleting.",
  },
  {
    number: "03",
    title: "Support natural crop development",
    body: "Reduce dependence on synthetic PGRs, supporting the crop's own hormone development with the help of mycorrhiza.",
  },
  {
    number: "04",
    title: "Reduce toxic inputs",
    body: "Cut the flow of toxic pollutants applied in the name of crop protection, and let nutrition do more of that work.",
  },
] as const;
