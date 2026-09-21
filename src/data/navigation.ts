export type NavLink = {
  label: string;
  href: string;
  /** Short line shown in the mobile menu so the destination is obvious. */
  hint?: string;
};

/**
 * Primary navigation — six items, deliberately.
 *
 * The old site carried eleven top-level destinations across four dropdowns.
 * A farmer arriving on a phone does not need eleven choices; he needs to know
 * what this is and to find the products. So the bar carries only what serves
 * that: the idea, the catalogue, the proof — in photographs and in the
 * farmers' own films — the reading, and a way to make contact.
 *
 * Journey and Farmer Stories were not deleted — they were folded into /about
 * and the home page respectively, and still appear in the footer for anyone
 * looking for them.
 *
 * Every footer link must resolve to a route or an id that exists today. If a
 * section is renamed or removed, fix it here too rather than leaving a link
 * that scrolls nowhere.
 */
export const mainNav: NavLink[] = [
  { label: "About", href: "/about", hint: "Who we are, and why soil came first" },
  { label: "Technology", href: "/technology", hint: "The four pillars and three principles" },
  { label: "Products", href: "/products", hint: "21 products across two ranges" },
  { label: "Gallery", href: "/gallery", hint: "Photographs and films from the fields" },
  { label: "Knowledge", href: "/knowledge", hint: "Soil health, explained simply" },
  { label: "Contact", href: "/contact", hint: "Talk to our team" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About SCT", href: "/about" },
      { label: "Our Journey", href: "/about#journey" },
      { label: "Vision & Mission", href: "/about#vision" },
      { label: "Our Team", href: "/about#team" },
    ],
  },
  {
    heading: "Technology",
    links: [
      { label: "Four Pillars", href: "/technology#pillars" },
      { label: "The Science", href: "/technology#science" },
      { label: "Three Principles", href: "/technology#principles" },
      { label: "What 100% SCT Means", href: "/technology#hundred-percent" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "SCT Vedic", href: "/products?range=vedic" },
      { label: "Super Series", href: "/products?range=super" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Knowledge Centre", href: "/knowledge" },
      { label: "Photo Gallery", href: "/gallery#photos" },
      { label: "Video Gallery", href: "/gallery#videos" },
      { label: "Farmer Stories", href: "/#farmer-stories" },
      { label: "FAQs", href: "/contact#faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
