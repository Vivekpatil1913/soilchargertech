import { MessageCircle, ShieldCheck } from "lucide-react";
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
import { IMAGE_ACCEPT, VIDEO_ACCEPT } from "@/data/forms";
import {
  PHONE_PATTERN,
  PHONE_TITLE,
  deliver,
  describeFile,
  type Delivery,
} from "@/lib/form-submit";

/**
 * ADD TESTIMONIAL
 * ===============
 * The old site's "ADD TESTIMONIAL" button, carried across with its fields:
 *
 *   Full Name · Mobile Number · Feedback · Upload Image · Upload Video
 *
 * ABOUT THE OTP STEP
 * ------------------
 * The old form verified the mobile number with an OTP before accepting the
 * testimonial. That needs a backend and an SMS gateway, neither of which
 * exists on this build, and a fake OTP screen that accepts any six digits is
 * worse than none — it looks like verification while verifying nothing.
 *
 * So the check is done differently rather than dropped: the testimonial is
 * sent over WhatsApp, which means it arrives from the farmer's own number.
 * That is the same assurance the OTP was buying — the person sending it
 * controls the phone — and it costs the farmer one tap instead of two screens.
 *
 * When a backend arrives, reinstate the real OTP in front of `deliver()` and
 * delete this note.
 *
 * CONSENT
 * -------
 * Nothing here is published automatically. src/data/testimonials.ts carries a
 * standing rule that a farmer's words, name and photograph only go on the site
 * with written consent, which is what the checkbox below records.
 */

const EMPTY = { name: "", mobile: "", feedback: "" };

export function TestimonialForm() {
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [sentMedia, setSentMedia] = useState<string[]>([]);

  const set = <K extends keyof typeof EMPTY>(key: K) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const media = [
      image ? `Photo — ${describeFile(image)}` : "",
      video ? `Video — ${describeFile(video)}` : "",
    ].filter(Boolean);

    setSentMedia(media);
    setDelivery(
      deliver({
        title: "Farmer testimonial",
        destination: "whatsapp",
        groups: [
          {
            answers: [
              { label: "Name", value: form.name },
              { label: "Mobile", value: form.mobile },
              { label: "Feedback", value: form.feedback },
              { label: "Attached", value: media.join(" · ") },
              {
                label: "Consent to publish",
                value: consent ? "Given — name, words and media may be used on the site" : "",
              },
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
        attachments={sentMedia.length > 0 ? sentMedia : undefined}
        onReset={() => {
          setForm(EMPTY);
          setImage(null);
          setVideo(null);
          setConsent(false);
          setDelivery(null);
        }}
        resetLabel="Add another"
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
          placeholder="Your name"
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

      <TextAreaField
        label="Your feedback"
        value={form.feedback}
        onChange={set("feedback")}
        placeholder="Your crop, what changed in the field, and over how long. Write in Marathi, Hindi or English — whichever you think in."
        rows={5}
        required
      />

      <FieldRow>
        <FileField
          label="Upload a photo"
          file={image}
          onChange={setImage}
          accept={IMAGE_ACCEPT}
          hint="Your field, your crop, or you in it."
        />
        <FileField
          label="Upload a video"
          file={video}
          onChange={setVideo}
          accept={VIDEO_ACCEPT}
          hint="A short clip from the field works best."
        />
      </FieldRow>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-hairline bg-sage-50 p-4 transition-colors duration-300 hover:border-brand-200">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
          className="mt-0.5 size-4 shrink-0 accent-brand-600"
        />
        <span className="text-[0.85rem] leading-relaxed text-ink-600">
          I am happy for Soil Charger Technology to publish my name, my words and anything I have
          attached on their website and social channels.
        </span>
      </label>

      <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50/60 p-4">
        <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-700" />
        <p className="text-[0.82rem] leading-relaxed text-ink-600">
          Your testimonial is sent from your own WhatsApp, so the team can see it really came from
          your number — no code to wait for.
        </p>
      </div>

      <SubmitRow
        label="Send testimonial"
        icon={<MessageCircle aria-hidden className="size-4" />}
        note={<RequiredNote />}
      />
    </form>
  );
}
