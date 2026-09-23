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
  type Delivery,
} from "@/lib/form-submit";

/**
 * INTERNSHIP FORM
 * ===============
 * Carried across from the old careers page unchanged:
 *
 *   Full Name · Email · Mobile Number · Qualification · Address · Upload Resume
 *
 * Goes to the careers inbox by email rather than to WhatsApp, because a resume
 * has to travel with it and WhatsApp cannot take an attachment from a web
 * page. The success panel names the file the applicant picked so they know
 * exactly what to attach to the draft.
 */

const EMPTY = { name: "", email: "", mobile: "", qualification: "", address: "" };

export function InternshipForm() {
  const [form, setForm] = useState(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [sentResume, setSentResume] = useState<string>("");

  const set = <K extends keyof typeof EMPTY>(key: K) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSentResume(describeFile(resume));
    setDelivery(
      deliver({
        title: "Internship application",
        destination: "careers",
        groups: [
          {
            answers: [
              { label: "Full name", value: form.name },
              { label: "Email", value: form.email },
              { label: "Mobile", value: form.mobile },
              { label: "Qualification", value: form.qualification },
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
          placeholder="B.Sc. Agriculture, diploma, …"
          required
        />
      </FieldRow>

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
        label="Apply for internship"
        icon={<Send aria-hidden className="size-4" />}
        note={<RequiredNote />}
      />
    </form>
  );
}
