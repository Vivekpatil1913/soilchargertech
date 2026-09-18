import { z } from 'zod'

/**
 * One schema, two consumers.
 *
 * `react-hook-form` validates against this in the browser for instant
 * feedback, and the Route Handler re-validates against the very same object on
 * the server. The client is never trusted — it is only given a head start.
 *
 * The legacy site's export form had no `name` attributes on its inputs and no
 * `action` on the form, so it was structurally incapable of submitting
 * anything at all.
 */

const trimmed = (max: number) => z.string().trim().max(max)

export const REQUIREMENTS = [
  'Product enquiry',
  'Bulk or trade order',
  'Distributorship',
  'Technical or agronomy advice',
  'Export enquiry',
  'Careers',
  'Other',
] as const

export const contactSchema = z.object({
  name: trimmed(120).min(2, 'Please enter your name.'),

  company: trimmed(160).optional().or(z.literal('')),

  email: z.email('Please enter a valid email address.').max(200),

  /**
   * Deliberately permissive. The audience is largely Indian growers who write
   * numbers in many shapes (+91, 0-prefixed, spaced, hyphenated), and rejecting
   * a valid number is far more costly here than accepting an odd one.
   */
  phone: trimmed(32)
    .min(6, 'Please enter a contact number.')
    .regex(/^[0-9+()\-.\s]+$/, 'Please use digits, spaces, + ( ) - only.'),

  country: trimmed(80).min(2, 'Please enter your country.'),

  requirement: z.enum(REQUIREMENTS, { message: 'Please choose a requirement.' }),

  message: trimmed(4000).min(10, 'Please tell us a little more — at least 10 characters.'),

  /** Set when the enquiry came from a product page. */
  productSlug: trimmed(120).optional().or(z.literal('')),

  /**
   * Honeypot. Hidden from sight AND from screen readers, so no human ever sees
   * it; anything that fills it is automated.
   *
   * Deliberately permissive HERE. Rejecting it in the schema returns a field
   * error naming `website`, which tells a bot precisely which input to leave
   * alone next time. The check belongs in the Route Handler, where a filled
   * honeypot returns a convincing fake success instead.
   */
  website: trimmed(200).optional(),

  /**
   * Milliseconds the form was on screen before submission. Humans take seconds;
   * scripted posts are near-instant.
   */
  elapsedMs: z.coerce.number().int().nonnegative().optional(),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactValues = z.output<typeof contactSchema>

/** Anything faster than this was not typed by a person. */
export const MIN_SUBMIT_MS = 2500

export type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; reference: string }
  | { status: 'error'; message: string }
