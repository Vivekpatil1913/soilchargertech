import { LegalPage, type LegalSection } from "@/pages/LegalPage";

const SECTIONS: LegalSection[] = [
  {
    heading: "What this website is",
    paragraphs: [
      "This is the information website of Soil Charger Technology, Nashik. It describes the company, its method and its products. You cannot buy anything on it — to order, speak to the SCT team or an appointed distributor.",
    ],
  },
  {
    heading: "About the product information",
    paragraphs: [
      "Product descriptions, benefits, dosage rates and pack sizes shown here are reproduced from Soil Charger Technology's own published material. Where SCT has not published something, the page says so rather than filling the gap with a guess.",
      "Dosage figures are general guidance for the product, not a recommendation for your specific field. Soil, crop, stage and season all change what is right. Before applying anything, speak to the SCT team about your own situation.",
      "Product photographs are Soil Charger Technology's own. They have been resized and placed on a consistent background for the website; the packs themselves are unretouched. Pack contents and labelling may be updated from time to time.",
    ],
  },
  {
    heading: "Results",
    paragraphs: [
      "Farming outcomes depend on soil, weather, water, crop variety, timing and management — most of which are outside anybody's control. Nothing on this site is a guarantee of yield, quality or income.",
      "Where a farmer's experience is quoted on this site, it is that farmer's own account of what happened on their land. It is not a prediction of what will happen on yours.",
    ],
  },
  {
    heading: "Translation",
    paragraphs: [
      "Marathi and Hindi versions of these pages are produced by Google Translate. Machine translation makes mistakes. Where a translated page and the English page disagree, the English page is the one that was written by us.",
    ],
  },
  {
    heading: "Links away from this site",
    paragraphs: [
      "This site links to YouTube, WhatsApp, Google Maps and social media. Those services are run by other companies under their own terms, and we are not responsible for what they do.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We update this site as products, guidance and the company change. The date at the top of this page shows when these terms were last revised.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kind="terms"
      title="Terms & Conditions"
      lead="The terms that apply when you use this website, written the same way as everything else on it."
      sections={SECTIONS}
    />
  );
}
