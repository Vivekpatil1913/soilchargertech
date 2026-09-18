import type { ContactValues } from './schemas'
import { site } from '@/config/site'

/**
 * Transactional email.
 *
 * SERVER ONLY. Nothing here may be imported from a Client Component — it reads
 * secrets from the environment, and the guard below turns a mistaken import
 * into a loud crash rather than a silent credential leak into the browser
 * bundle. The legacy site exposed its API endpoints directly in page source.
 *
 * Uses the Resend REST API over `fetch` rather than an SDK, to avoid adding a
 * dependency for two HTTP calls.
 */
if (typeof window !== 'undefined') {
  throw new Error('lib/forms/mailer must never be imported into client code.')
}

/** Enquiries are routed by requirement, matching the contact page. */
function recipientFor(requirement: ContactValues['requirement']): string {
  const sales = process.env.SALES_TO_EMAIL || site.contacts.sales.email
  const careers = process.env.CAREERS_TO_EMAIL || site.contacts.careers.email
  const general = process.env.CONTACT_TO_EMAIL || site.contacts.general.email

  switch (requirement) {
    case 'Bulk or trade order':
    case 'Distributorship':
    case 'Export enquiry':
      return sales
    case 'Careers':
      return careers
    default:
      return general
  }
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function renderBody(values: ContactValues, reference: string) {
  const rows: Array<[string, string]> = [
    ['Name', values.name],
    ['Company', values.company || '—'],
    ['Email', values.email],
    ['Phone', values.phone],
    ['Country', values.country],
    ['Requirement', values.requirement],
    ...(values.productSlug ? ([['Product', values.productSlug]] as Array<[string, string]>) : []),
    ['Reference', reference],
  ]

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    values.message,
  ].join('\n')

  const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="color:#7b664d">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`
  )
  .join('\n')}
<tr><td style="color:#7b664d;vertical-align:top">Message</td><td>${escapeHtml(values.message).replace(/\n/g, '<br>')}</td></tr>
</table>`

  return { text, html }
}

export interface SendResult {
  delivered: boolean
  /** True when no provider is configured and the enquiry was only logged. */
  loggedOnly: boolean
}

export async function sendEnquiry(values: ContactValues, reference: string): Promise<SendResult> {
  const to = recipientFor(values.requirement)
  const from = process.env.MAIL_FROM_EMAIL
  const apiKey = process.env.RESEND_API_KEY
  const { text, html } = renderBody(values, reference)

  // No provider configured (local development). Log rather than pretend to send
  // — silently swallowing an enquiry is the worst possible failure mode.
  if (!apiKey || !from) {
    console.info(`[enquiry ${reference}] no mail provider configured; would send to ${to}\n${text}`)
    return { delivered: false, loggedOnly: true }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      // Replies go straight back to the enquirer, not to the website address.
      reply_to: values.email,
      subject: `${values.requirement} — ${values.name}${values.company ? ` (${values.company})` : ''}`,
      text,
      html,
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Mail provider rejected the message (${response.status}): ${detail}`)
  }

  return { delivered: true, loggedOnly: false }
}
