/**
 * SCT SAPTAPADI — seven steps
 * ===========================
 * VERIFIED: SCT introduced Saptapadi in 2021 as a structured approach to crop
 * management, developed after studying where crop management commonly goes
 * wrong. That much the company states publicly.
 *
 * NOT PUBLISHED: SCT has not published the wording of the seven individual
 * steps. We have therefore NOT invented them. The seven positions below are
 * filled with SCT's own published framework — its four working pillars and its
 * three principles, which together number seven — and the section renders a
 * visible note saying so. Replace `steps` with SCT's official Saptapadi wording
 * once the agronomy team supplies it, and delete `PENDING_NOTE`.
 */

/**
 * Icon keys, not icon components — this file stays free of React so it can be
 * imported anywhere. SaptapadiSection maps each key to a Lucide icon.
 */
export type SaptapadiIcon =
  | "nourishment"
  | "soil"
  | "humus"
  | "leafRoot"
  | "method"
  | "rule"
  | "study";

export type SaptapadiStep = {
  index: number;
  kind: "pillar" | "principle";
  icon: SaptapadiIcon;
  title: string;
  body: string;
};

export const PENDING_NOTE =
  "The seven positions below follow SCT's four working pillars and three principles. Final Saptapadi wording is to be confirmed by SCT's agronomy team.";

export const steps: SaptapadiStep[] = [
  {
    index: 1,
    kind: "pillar",
    icon: "nourishment",
    title: "Work on nourishment, not on disease",
    body: "Feed the crop properly and far less has to be treated later. Nutrition comes before intervention.",
  },
  {
    index: 2,
    kind: "pillar",
    icon: "soil",
    title: "Work on soil, not on climate",
    body: "No one controls the weather. Soil is the part of the season that does answer to effort, so that is where the work goes.",
  },
  {
    index: 3,
    kind: "pillar",
    icon: "humus",
    title: "Work on humus, not on substitutes",
    body: "Organic matter is the foundation. Everything built without it has to be rebuilt every season.",
  },
  {
    index: 4,
    kind: "pillar",
    icon: "leafRoot",
    title: "Work on leaf and root, not on fruit",
    body: "Good fruit is the result of healthy roots and leaves. Chasing the fruit directly skips the part that produces it.",
  },
  {
    index: 5,
    kind: "principle",
    icon: "method",
    title: "Method — follow the protocol",
    body: "Application protocols for soil and plant care, followed through the season rather than applied in a hurry when something goes wrong.",
  },
  {
    index: 6,
    kind: "principle",
    icon: "rule",
    title: "Rule — what to leave out",
    body: "The chemical inputs the approach deliberately does without, and the reasoning behind each exclusion.",
  },
  {
    index: 7,
    kind: "principle",
    icon: "study",
    title: "Study — keep learning",
    body: "Saptapadi asks the farmer to stay engaged: attend, observe, compare, and bring what the field shows back into the next season.",
  },
];
