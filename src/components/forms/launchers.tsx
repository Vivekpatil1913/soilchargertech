import { useState, type ReactNode } from "react";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ExportForm } from "@/components/forms/ExportForm";
import { FormModal } from "@/components/forms/FormModal";
import { TestimonialForm } from "@/components/forms/TestimonialForm";

/**
 * MODAL LAUNCHERS
 * ===============
 * The three forms that stay modal — enquiry, export and testimonial — are each
 * opened from more than one place on the site. Rather than every call site
 * repeating the same `useState` and the same modal copy, each form gets a
 * launcher that owns its own open state and renders whatever trigger the call
 * site passes as children.
 *
 * So a footer button and a contact-page card can open the identical dialog
 * while looking nothing like each other:
 *
 *   <EnquiryLauncher className="…">Product enquiry</EnquiryLauncher>
 *
 * The three career forms deliberately have no launcher — they live inline on
 * /careers. See that page for why.
 */

type TriggerProps = {
  children: ReactNode;
  className?: string;
  /** For icon-only triggers, where the children are not readable text. */
  ariaLabel?: string;
};

export function EnquiryLauncher({
  children,
  className,
  ariaLabel,
  initialProducts,
}: TriggerProps & { initialProducts?: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={ariaLabel} className={className}>
        {children}
      </button>

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Enquiry"
        title="Ask about a product"
        description="Tick what you are interested in, tell us about your field, and the team will come back to you."
      >
        <EnquiryForm initialProducts={initialProducts} />
      </FormModal>
    </>
  );
}

export function ExportLauncher({ children, className, ariaLabel }: TriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={ariaLabel} className={className}>
        {children}
      </button>

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Export"
        title="Export enquiry"
        description="For buyers and distributors outside our usual routes. Tell us what you need and where it has to reach."
      >
        <ExportForm />
      </FormModal>
    </>
  );
}

export function TestimonialLauncher({ children, className, ariaLabel }: TriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={ariaLabel} className={className}>
        {children}
      </button>

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Your turn"
        title="Add your testimonial"
        description="If SCT changed something in your field, other farmers should hear it from you rather than from us."
      >
        <TestimonialForm />
      </FormModal>
    </>
  );
}
