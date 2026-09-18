import type { Statistic, Testimonial } from '@/types/technology'

const SOURCE = 'soilchargertechnology.com'

/**
 * Figures taken from the legacy homepage counters (`data-max` attributes).
 *
 * IMPORTANT — every one is `needs-verification`. They are the company's own
 * published numbers, but nothing on the site substantiates them, and the live
 * page renders two of them wrongly: 155,000 and 5,000 are both suffixed "K",
 * so the page reads "155000 K YOUTUBE SUBSCRIBER". The raw values are used
 * here and the bogus multiplier is dropped rather than reproduced.
 *
 * These render on staging behind a PlaceholderNotice until the client confirms
 * them. See open item #6.
 */
const unverified = (note: string) => ({
  provenance: 'needs-verification' as const,
  source: `${SOURCE} (homepage counters)`,
  note,
})

export const statistics: Statistic[] = [
  {
    label: 'Farmers',
    value: 1_000_000,
    suffix: '+',
    meta: unverified('Published as data-max="1000000" with a "+" suffix. No basis cited.'),
  },
  {
    label: 'YouTube subscribers',
    value: 155_000,
    meta: unverified(
      'Published as data-max="155000" but rendered with a "K" suffix, so the live site reads "155000 K". The raw value is used here. Verifiable against the public channel.'
    ),
  },
  {
    label: 'App downloads',
    value: 5_000,
    meta: unverified(
      'Published as data-max="5000" with an erroneous "K" suffix. No app is linked anywhere on the site.'
    ),
  },
  {
    label: 'Seminars held',
    value: 50_000,
    meta: unverified('Published as data-max="50000". No basis cited.'),
  },
  {
    label: 'Distributors',
    value: 460,
    meta: unverified('Published as data-max="460". No distributor list exists on the site.'),
  },
]

/**
 * The only two testimonials on the entire legacy site, both in Marathi.
 *
 * The source publishes each farmer's personal mobile number in plain text
 * alongside the quote. Those are deliberately omitted — republishing private
 * phone numbers is a data-protection problem, not a credibility signal.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'आपले जर आरोग्य असेल तरच आपल्याला इतर गोष्टी मिळतील, आणि SCT वैदिक हे आरोग्य देणारे तंत्रज्ञान आहे',
    author: 'दादासाहेब आहेर',
    location: 'पिंपरी निर्मल, राहता, अहमदनगर',
    language: 'mr',
    meta: {
      provenance: 'verified',
      source: `${SOURCE} (testimonials)`,
      note: 'Published mobile number omitted. An English translation is needed for the en locale.',
    },
  },
  {
    quote: 'बिनधास्त आणि नीरधास्त जीवन जगायचे असेल तर शेतकऱ्यांनी SCT वैदिक कडे वळायला पाहिजे.',
    author: 'रोहन माने',
    language: 'mr',
    meta: {
      provenance: 'verified',
      source: `${SOURCE} (testimonials)`,
      note: 'Published mobile number omitted. An English translation is needed for the en locale.',
    },
  },
]
