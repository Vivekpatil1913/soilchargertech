'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { contactSchema, REQUIREMENTS, type ContactInput } from '@/lib/forms/schemas'
import { cn } from '@/lib/utils/cn'
import { Field, controlClasses } from './Field'

interface ContactFormProps {
  /** Pre-selects the requirement and records which product prompted the enquiry. */
  productSlug?: string
  productName?: string
}

export function ContactForm({ productSlug, productName }: ContactFormProps) {
  const [state, setState] = useState<
    | { status: 'idle' | 'submitting' }
    | { status: 'success'; reference: string }
    | { status: 'error'; message: string }
  >({ status: 'idle' })

  // Timing floor: anything submitted implausibly fast is a bot. Seeded in an
  // effect rather than at `useRef(Date.now())`, because a lazy initialiser runs
  // during render and `Date.now()` is impure.
  const mountedAt = useRef(0)
  const successRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      requirement: productSlug ? 'Product enquiry' : undefined,
      productSlug: productSlug ?? '',
      website: '',
    },
  })

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  // Move focus to the confirmation so keyboard and screen-reader users are told
  // the submission worked, rather than being left on a vanished form.
  useEffect(() => {
    if (state.status === 'success') successRef.current?.focus()
  }, [state.status])

  const onSubmit = async (values: ContactInput) => {
    const elapsedMs = mountedAt.current ? Date.now() - mountedAt.current : 0
    setState({ status: 'submitting' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, elapsedMs }),
      })

      const body = (await response.json()) as {
        reference?: string
        error?: string
        fieldErrors?: Record<string, string>
      }

      if (!response.ok) {
        // Re-attach server-side field errors to their inputs.
        if (body.fieldErrors) {
          for (const [field, message] of Object.entries(body.fieldErrors)) {
            setError(field as keyof ContactInput, { message })
          }
        }
        setState({ status: 'error', message: body.error ?? 'Something went wrong.' })
        return
      }

      setState({ status: 'success', reference: body.reference ?? '' })
    } catch {
      setState({
        status: 'error',
        message: 'We could not reach the server. Please check your connection and try again.',
      })
    }
  }

  if (state.status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border-accent/40 bg-charge-50 flex flex-col gap-4 rounded-sm border p-8"
      >
        <Check aria-hidden="true" className="text-accent size-6" />
        <h3 className="text-h4 font-display text-ink">Enquiry received.</h3>
        <p className="text-ink-muted">
          Thank you — we will reply to the email address you gave. If it is urgent, phone or
          WhatsApp is faster.
        </p>
        {state.reference && (
          <p className="data-value text-ink-subtle">Reference: {state.reference}</p>
        )}
      </div>
    )
  }

  const busy = isSubmitting || state.status === 'submitting'

  return (
    <form
      /* Built inside the event handler, not during render: calling
         `handleSubmit(onSubmit)` in the JSX means the closure — and the refs and
         `Date.now()` inside it — is constructed in the render phase. */
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event)
      }}
      noValidate
      className="flex flex-col gap-6"
    >
      {productName && (
        <p className="border-hairline bg-surface-sunken rounded-sm border px-4 py-3 text-[0.9375rem]">
          Enquiring about <strong className="text-ink">{productName}</strong>
        </p>
      )}

      {/* Honeypot: hidden from sight AND from assistive technology, so no human
          can reach it. `tabIndex={-1}` keeps it out of the tab order too. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website-url">Website</label>
        <input
          id="website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required error={errors.name?.message}>
          {(props) => (
            <input
              {...props}
              {...register('name')}
              type="text"
              autoComplete="name"
              className={controlClasses}
            />
          )}
        </Field>

        <Field label="Company" error={errors.company?.message}>
          {(props) => (
            <input
              {...props}
              {...register('company')}
              type="text"
              autoComplete="organization"
              className={controlClasses}
            />
          )}
        </Field>

        <Field label="Email" required error={errors.email?.message}>
          {(props) => (
            <input
              {...props}
              {...register('email')}
              type="email"
              autoComplete="email"
              inputMode="email"
              className={controlClasses}
            />
          )}
        </Field>

        <Field label="Phone" required error={errors.phone?.message}>
          {(props) => (
            <input
              {...props}
              {...register('phone')}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className={controlClasses}
            />
          )}
        </Field>

        <Field label="Country" required error={errors.country?.message}>
          {(props) => (
            <input
              {...props}
              {...register('country')}
              type="text"
              autoComplete="country-name"
              className={controlClasses}
            />
          )}
        </Field>

        <Field label="Requirement" required error={errors.requirement?.message}>
          {(props) => (
            <select {...props} {...register('requirement')} className={controlClasses}>
              <option value="">Choose one…</option>
              {REQUIREMENTS.map((requirement) => (
                <option key={requirement} value={requirement}>
                  {requirement}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Field
        label="Message"
        required
        error={errors.message?.message}
        hint="Crop, area under cultivation and current practice help us answer properly."
      >
        {(props) => (
          <textarea
            {...props}
            {...register('message')}
            rows={6}
            className={cn(controlClasses, 'resize-y')}
          />
        )}
      </Field>

      {/* `defaultValue` as well as the RHF default, so the value is present in
          the server-rendered HTML rather than only after hydration. */}
      <input type="hidden" defaultValue={productSlug ?? ''} {...register('productSlug')} />

      {state.status === 'error' && (
        <p role="alert" className="border-danger/40 bg-danger/5 text-danger rounded-sm border p-4">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={busy} aria-busy={busy}>
          {busy ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>
        <p className="text-caption text-ink-subtle">
          We use your details only to reply to this enquiry.
        </p>
      </div>
    </form>
  )
}
