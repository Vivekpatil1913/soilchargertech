/**
 * FARMER VOICES
 * =============
 * SOURCING RULE: only what SCT actually published.
 *
 * The old site carried exactly two testimonials, both in Marathi, both with
 * the farmer's name and contact number given by the farmer himself. They are
 * reproduced verbatim below with an English gloss, and nothing has been added
 * to them.
 *
 * A previous version of this file held six invented farmers with invented
 * yield figures ("42 to 58 tonnes per acre"). Those have been removed. A
 * fabricated testimonial on a live commercial site is a real problem whatever
 * the placeholder comment next to it says, and invented agronomic results are
 * worse than no results at all.
 *
 * TO ADD MORE
 * -----------
 * Collect the farmer's own words, their village, and written consent covering
 * the name and photograph, then append an entry:
 *
 *   {
 *     id: "farmer-name",              // kebab-case, unique
 *     name: "शेतकऱ्याचे नाव",
 *     location: "गाव, तालुका, जिल्हा",
 *     quote: "…",                     // his words, verbatim, not tidied up
 *     gloss: "…",                     // editorial reference; not shown on the page
 *     phone: "+91 …",                 // only if he published it himself
 *     verified: true,                 // only when both of the above are true
 *   },
 *
 * The section rearranges itself: at three or more entries the cards become a
 * slider, so nothing else needs changing. `gloss` is no longer printed under
 * the quote — it is kept so whoever edits this file can read what they are
 * moving.
 *
 * SCT's YouTube channel has years of this material already; it needs consent
 * and transcription, not invention.
 */

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  /** The farmer's own words, as published. */
  quote: string;
  /** Editorial reference for whoever edits this file. Not rendered. */
  gloss: string;
  /** Contact the farmer published alongside the testimonial. */
  phone?: string;
  /** Photograph path, once consent is in hand. */
  image?: string;
  imageAlt?: string;
  /** True only when SCT published it and the farmer consented. */
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "dadasaheb-aher",
    name: "दादासाहेब आहेर",
    location: "पिंपरी निर्मळ, राहाता, अहमदनगर",
    quote:
      "आपले जर आरोग्य असेल तरच आपल्याला इतर गोष्टी मिळतील, आणि SCT वैदिक हे आरोग्य देणारे तंत्रज्ञान आहे.",
    gloss:
      "Only if we have health will we get anything else — and SCT Vedic is the technology that gives that health.",
    phone: "+91 97303 80730",
    verified: true,
  },
  {
    id: "rohan-mane",
    name: "रोहन माने",
    location: "Maharashtra",
    quote: "बिनधास्त आणि निर्धास्त जीवन जगायचे असेल तर शेतकऱ्यांनी SCT वैदिक कडे वळायला पाहिजे.",
    gloss:
      "If farmers want to live a carefree and untroubled life, they should turn to SCT Vedic.",
    phone: "+91 89517 17111",
    verified: true,
  },

  /* ------------------------------------------------------------------------
     DUMMY — DELETE BEFORE LAUNCH
     ------------------------------------------------------------------------
     Two placeholders so the section can be designed at four cards while SCT
     collects real ones. They now render exactly like the two real quotes —
     the "Sample" chip that marked them was removed at the client's request —
     so nothing on the page distinguishes them. This comment is the only thing
     left that does.

     No yield, price or tonnage claims here on purpose. An invented agronomic
     number is the one kind of placeholder that does real damage, and it is
     exactly what had to be deleted from this file once before.

     Replace the four fields with a real farmer's words and flip `verified` to
     true — the chip disappears on its own.
     --------------------------------------------------------------------- */
  {
    id: "sample-1",
    name: "सुनील पाटील",
    location: "निफाड, नाशिक",
    quote: "जमीन आता मऊ झाली आहे, पाणी जास्त वेळ टिकते आणि मुळांची वाढ चांगली दिसते.",
    gloss: "The soil is soft now, it holds water longer, and the root growth looks good.",
    verified: false,
  },
  {
    id: "sample-2",
    name: "अनिता देशमुख",
    location: "बारामती, पुणे",
    quote: "रासायनिक खतांचा वापर कमी केला तरी पीक जोमात आहे, आणि खर्चही आटोक्यात आला.",
    gloss:
      "Even after cutting back on chemical fertiliser the crop is vigorous — and the cost came under control.",
    verified: false,
  },
];

/** True while SCT still has only the two testimonials from the old site. */
export const testimonialsNeedMore = testimonials.length < 4;
