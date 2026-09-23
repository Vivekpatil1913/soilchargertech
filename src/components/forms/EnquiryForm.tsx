import { MessageCircle } from "lucide-react";
import { useState } from "react";

import { SuccessPanel } from "@/components/forms/FormModal";
import {
  CheckboxGroup,
  FieldRow,
  RequiredNote,
  SelectField,
  SubmitRow,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { ENQUIRY_DEPARTMENTS, ENQUIRY_PRODUCTS } from "@/data/forms";
import { PHONE_PATTERN, PHONE_TITLE, deliver, type Delivery } from "@/lib/form-submit";

/**
 * ENQUIRY FORM
 * ============
 * Site-wide on the old build — it sat in the footer of every page, so it is in
 * the footer here too. Fields carried across exactly:
 *
 *   Your Name · Your Email · Mobile Number · product checkboxes (ten) ·
 *   Comment, plus the department routing the old modal offered
 *   (SCT Consulting / SCT Sales / SCT Management).
 *
 * The product list is the old one verbatim, including the four products SCT
 * names here but has no page for. See src/data/forms.ts for why they stay.
 *
 * Goes to WhatsApp rather than to email: this is the form a farmer standing in
 * a field fills in, and it is the shortest route to an answer.
 */

const EMPTY = { name: "", email: "", mobile: "", department: "", comment: "" };

export function EnquiryForm({ initialProducts = [] }: { initialProducts?: string[] }) {
  const [form, setForm] = useState(EMPTY);
  const [products, setProducts] = useState<string[]>(initialProducts);
  const [delivery, setDelivery] = useState<Delivery | null>(null);

  const set = <K extends keyof typeof EMPTY>(key: K) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  function toggleProduct(product: string) {
    setProducts((current) =>
      current.includes(product) ? current.filter((item) => item !== product) : [...current, product],
    );
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setDelivery(
      deliver({
        title: "Product enquiry",
        destination: "whatsapp",
        groups: [
          {
            answers: [
              { label: "Name", value: form.name },
              { label: "Email", value: form.email },
              { label: "Mobile", value: form.mobile },
              { label: "For the attention of", value: form.department },
              { label: "Products", value: products.join(", ") },
              { label: "Comment", value: form.comment },
            ],
          },
        ],
      }),
    );
  }

  if (delivery) {
    return (
      <SuccessPanel
        delivery={delivery}
        onReset={() => {
          setForm(EMPTY);
          setProducts([]);
          setDelivery(null);
        }}
        resetLabel="Send another enquiry"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FieldRow>
        <TextField
          label="Your name"
          value={form.name}
          onChange={set("name")}
          placeholder="Full name"
          autoComplete="name"
          required
        />
        <TextField
          label="Mobile number"
          type="tel"
          value={form.mobile}
          onChange={set("mobile")}
          placeholder="10-digit number"
          pattern={PHONE_PATTERN}
          title={PHONE_TITLE}
          inputMode="tel"
          autoComplete="tel"
          required
        />
      </FieldRow>

      <FieldRow>
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <SelectField
          label="Who should see this?"
          value={form.department}
          onChange={set("department")}
          options={ENQUIRY_DEPARTMENTS}
          placeholder="Choose a team…"
        />
      </FieldRow>

      <CheckboxGroup
        label="Which products are you asking about?"
        options={ENQUIRY_PRODUCTS}
        selected={products}
        onToggle={toggleProduct}
        hint="Tick as many as you need — or leave them all blank and describe it below."
      />

      <TextAreaField
        label="Your question"
        value={form.comment}
        onChange={set("comment")}
        placeholder="Your crop, your soil, and what you would like to know."
        rows={4}
      />

      <SubmitRow
        label="Send enquiry"
        icon={<MessageCircle aria-hidden className="size-4" />}
        note={<RequiredNote />}
      />
    </form>
  );
}
