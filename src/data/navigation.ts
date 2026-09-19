export type NavLink = {
  label: string;
  href: string;
  /** Short line shown in the mobile menu so the destination is obvious. */
  hint?: string;
};

/** Primary navigation. Kept to eight items so the bar never feels crowded. */
export const mainNav: NavLink[] = [
  { label: "About SCT", href: "/about", hint: "Who we are and what we believe" },
  { label: "Our Journey", href: "/journey", hint: "2015 to today" },
  { label: "Technology", href: "/technology", hint: "The soil science behind our work" },
  { label: "Products", href: "/products", hint: "SCT Vedic and Super ranges" },
  { label: "Applications", href: "/applications", hint: "Crops we work with" },
  { label: "Farmer Stories", href: "/farmer-stories", hint: "Experiences from the field" },
  { label: "Knowledge", href: "/knowledge", hint: "Soil health, explained simply" },
  { label: "Contact", href: "/contact", hint: "Talk to our team" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About SCT", href: "/about" },
      { label: "Our Journey", href: "/journey" },
      { label: "Vision & Mission", href: "/about#vision" },
      { label: "Our Team", href: "/about#team" },
    ],
  },
  {
    heading: "Technology",
    links: [
      { label: "Soil & Organic Carbon", href: "/technology#organic-carbon" },
      { label: "Mycorrhiza", href: "/technology#mycorrhiza" },
      { label: "SCT Vedic", href: "/technology#vedic" },
      { label: "SCT Saptapadi", href: "/technology#saptapadi" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "SCT Vedic Range", href: "/products?range=vedic" },
      { label: "Super Series", href: "/products?range=super" },
      { label: "All Products", href: "/products" },
      { label: "Applications", href: "/applications" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Knowledge Centre", href: "/knowledge" },
      { label: "Farmer Stories", href: "/farmer-stories" },
      { label: "FAQs", href: "/contact#faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
