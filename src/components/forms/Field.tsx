'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils/cn'

interface FieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  /** Receives the ids it must wire up, so labelling is never left to chance. */
  children: (props: {
    id: string
    'aria-describedby': string | undefined
    'aria-invalid': boolean
    'aria-required': boolean
  }) => React.ReactNode
}

const controlClasses =
  'w-full rounded-sm border bg-surface px-4 py-3 text-ink placeholder:text-ink-subtle ' +
  'transition-colors duration-200 border-hairline hover:border-ink-subtle ' +
  'aria-[invalid=true]:border-danger'

/**
 * Wraps one form control with its label, hint and error message.
 *
 * The render-prop shape exists so the control cannot be rendered without the
 * `id` and `aria-describedby` that tie it to its label and error text —
 * accessible labelling becomes the path of least resistance rather than
 * something to remember.
 *
 * Errors use `role="alert"` so a screen reader announces them when they appear.
 */
export function Field({ label, error, hint, required, className, children }: FieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-ink text-[0.9375rem] font-medium">
        {label}
        {required && (
          <span className="text-accent ml-1" aria-hidden="true">
            *
          </span>
        )}
        {!required && <span className="text-ink-subtle text-caption ml-2">Optional</span>}
      </label>

      {hint && (
        <p id={hintId} className="text-caption text-ink-subtle">
          {hint}
        </p>
      )}

      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': Boolean(error),
        'aria-required': Boolean(required),
      })}

      {error && (
        <p id={errorId} role="alert" className="text-caption text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export { controlClasses }
