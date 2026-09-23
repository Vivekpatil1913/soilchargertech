import { Send } from "lucide-react";
import { useState } from "react";

import { SuccessPanel } from "@/components/forms/FormModal";
import {
  FieldRow,
  FileField,
  RequiredNote,
  SubmitRow,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { RESUME_ACCEPT } from "@/data/forms";
import {
  PHONE_PATTERN,
  PHONE_TITLE,
  deliver,
  describeFile,
  formatDate,
  type Delivery,
} from "@/lib/form-submit";

/**
 * JOB VACANCY FORM
 * ================
 * Carried across from the old careers page unchanged:
 *
 *   Full Name · Email · Mobile Number · Qualification ·
 *   Previous Experience (From / To) · Address · Upload Resume
 *
 * The two experience dates were `required` on the old form, which locked out
 * anyone applying for their first job. They are optional here — the field is
 * still collected, a fresher can simply leave it empty, and the message says
 * "Fresher" when they do.
 */

const EMPTY = {
  name: "",
  email: "",
  mobile: "",
  qualification: "",
  experienceFrom: "",
  experienceTo: "",
  address: "",
};

export function JobVacancyForm() {
  const [form, setForm] = useState(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [sentResume, setSentResume] = useState<string>("");

  const set = <K extends keyof typeof EMPTY>(key: K) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const from = formatDate(form.experienceFrom);
    const to = formatDate(form.experienceTo);
    const experience = from || to ? [from || "—", to || "present"].join(" to ") : "Fresher";

    setSentResume(describeFile(resume));
    setDelivery(
      deliver({
        title: "Job application",
        destination: "careers",
        groups: [
          {
            answers: [
              { label: "Full name", value: form.name },
              { label: "Email", value: form.email },
              { label: "Mobile", value: form.mobile },
              { label: "Qualification", value: form.qualification },
              { label: "Previous experience", value: experience },
              { label: "Address", value: form.address },
              { label: "Resume", value: describeFile(resume) || "To be attached" },
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
        attachments={sentResume ? [`Resume — ${sentResume}`] : ["Your resume"]}
        onReset={() => {
          setForm(EMPTY);
          setResume(null);
          setDelivery(null);
        }}
        resetLabel="Send another application"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FieldRow>
        <TextField
          label="Full name"
          value={form.name}
          onChange={set("name")}
          placeholder="Your full name"
          autoComplete="name"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </FieldRow>

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
          label="Qualification"
          value={form.qualification}
          onChange={set("qualification")}
          placeholder="Highest qualification"
          required
        />
      </FieldRow>

      <fieldset>
        <legend className="mb-2 text-[0.85rem] font-semibold text-ink-700">
          Previous experience
        </legend>
        <FieldRow>
          <TextField label="From" type="date" value={form.experienceFrom} onChange={set("experienceFrom")} />
          <TextField label="To" type="date" value={form.experienceTo} onChange={set("experienceTo")} />
        </FieldRow>
        <p className="mt-1.5 text-[0.78rem] text-ink-400">
          Applying for your first job? Leave both dates empty.
        </p>
      </fieldset>

      <TextAreaField
        label="Address"
        value={form.address}
        onChange={set("address")}
        placeholder="Where you live — village, taluka, district."
        rows={3}
        required
      />

      <FileField
        label="Upload resume"
        file={resume}
        onChange={setResume}
        accept={RESUME_ACCEPT}
        required
        hint="PDF or Word. You will be asked to attach it to the email that opens."
      />

      <SubmitRow
        label="Send application"
        icon={<Send aria-hidden className="size-4" />}
        note={<RequiredNote />}
      />
    </form>
  );
}
