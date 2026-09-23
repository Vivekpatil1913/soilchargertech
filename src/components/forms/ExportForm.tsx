import { Send } from "lucide-react";
import { useState } from "react";

import { SuccessPanel } from "@/components/forms/FormModal";
import {
  FieldRow,
  RequiredNote,
  SelectField,
  SubmitRow,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { STATE_OPTIONS } from "@/data/forms";
import { PHONE_PATTERN, PHONE_TITLE, deliver, type Delivery } from "@/lib/form-submit";

/**
 * EXPORT FORM
 * ===========
 * The old site opened this one from the hero. Fields carried across exactly:
 *
 *   Name/Company Name · Mobile Number · City · State · Country · Pincode
 *   · Requirements
 *
 * Two changes, neither of them to what is collected:
 *
 *   · State was a free-text box on the old site next to a 36-item dropdown on
 *     the distributor form. It is the dropdown here, so the same answer is
 *     spelled the same way in both.
 *   · Country defaults to India rather than starting empty. Every other field
 *     on the old form assumed an Indian address; an export enquirer who is not
 *     in India can simply type over it.
 *
 * Goes to the sales inbox, not the general one — this is a buying enquiry.
 */

const EMPTY = {
  name: "",
  mobile: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  requirements: "",
};

export function ExportForm() {
  const [form, setForm] = useState(EMPTY);
  const [delivery, setDelivery] = useState<Delivery | null>(null);

  const set = <K extends keyof typeof EMPTY>(key: K) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setDelivery(
      deliver({
        title: "Export enquiry",
        destination: "sales",
        groups: [
          {
            answers: [
              { label: "Name / Company", value: form.name },
              { label: "Mobile", value: form.mobile },
              { label: "City", value: form.city },
              { label: "State", value: form.state },
              { label: "Country", value: form.country },
              { label: "Pincode", value: form.pincode },
              { label: "Requirements", value: form.requirements },
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
          setDelivery(null);
        }}
        resetLabel="Send another enquiry"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <TextField
        label="Name / Company name"
        value={form.name}
        onChange={set("name")}
        placeholder="Who are we speaking to?"
        autoComplete="organization"
        required
      />

      <FieldRow>
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
        <TextField
          label="City"
          value={form.city}
          onChange={set("city")}
          placeholder="City or town"
          autoComplete="address-level2"
          required
        />
      </FieldRow>

      <FieldRow>
        <SelectField
          label="State"
          value={form.state}
          onChange={set("state")}
          options={STATE_OPTIONS}
          placeholder="Choose your state…"
          required
        />
        <TextField
          label="Country"
          value={form.country}
          onChange={set("country")}
          autoComplete="country-name"
          required
        />
      </FieldRow>

      <TextField
        label="Pincode"
        value={form.pincode}
        onChange={set("pincode")}
        placeholder="6-digit pincode"
        inputMode="numeric"
        autoComplete="postal-code"
        className="sm:max-w-[16rem]"
        required
      />

      <TextAreaField
        label="Your requirements"
        value={form.requirements}
        onChange={set("requirements")}
        placeholder="Which products, what quantity, and where they need to reach."
        rows={4}
        required
      />

      <SubmitRow label="Send enquiry" icon={<Send aria-hidden className="size-4" />} note={<RequiredNote />} />
    </form>
  );
}
