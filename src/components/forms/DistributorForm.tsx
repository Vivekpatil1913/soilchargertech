import { Send } from "lucide-react";
import { useState } from "react";

import { SuccessPanel } from "@/components/forms/FormModal";
import {
  FieldRow,
  FileField,
  FormStep,
  RequiredNote,
  SelectField,
  SubmitRow,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import {
  DISTRIBUTOR_DOCUMENTS,
  DISTRIBUTOR_QUESTIONS,
  DOCUMENT_ACCEPT,
  SHOP_LEVELS,
  STATE_OPTIONS,
  YES_NO,
} from "@/data/forms";
import {
  PHONE_PATTERN,
  PHONE_TITLE,
  deliver,
  describeFile,
  type Delivery,
  type FormGroup,
} from "@/lib/form-submit";

/**
 * SCT BUSINESS RECRUITMENT — DISTRIBUTOR APPLICATION
 * ==================================================
 * The largest form on the old site, carried across in full. Its four parts
 * are the old site's own, in the old site's order:
 *
 *   1. Personal Details    first / middle / last name, two mobile numbers,
 *                          email, state, district, taluka, village
 *   2. Business Details    address of where to start, then state, district,
 *                          taluka, village for that location
 *   3. Required Documents  Aadhaar (front and back), PAN, Shop ACT / NOC /
 *                          Rent Agreement, Light Bill, SCT purchase bill
 *   4. Necessary Questions shop level, whether they have used SCT, and the
 *                          four written answers
 *
 * DELIBERATE DIFFERENCES FROM THE OLD FORM
 * ----------------------------------------
 * · District, taluka and village were dependent dropdowns fed by an API that
 *   is not part of this build. They are free-text here. The same information
 *   is collected, and typing a taluka beats three cascading selects on a
 *   phone.
 * · Middle name was `required`. It is optional here — a required field that
 *   some applicants cannot truthfully fill blocks the whole application.
 * · The old form asked its questions in capitals ("* WHY YOU WANT TO TAKE
 *   DISTRIBUTORSHIP ?"). Same questions, sentence case.
 *
 * Six documents have to travel with this, so it goes to the careers inbox by
 * email and the success panel lists every file by name.
 */

const EMPTY = {
  firstName: "",
  middleName: "",
  lastName: "",
  mobile: "",
  altMobile: "",
  email: "",
  state: "",
  district: "",
  taluka: "",
  village: "",

  businessAddress: "",
  businessState: "",
  businessDistrict: "",
  businessTaluka: "",
  businessVillage: "",

  shopLevel: "",
  usedSct: "",
  whyDistributorship: "",
  sctExperience: "",
  farmExperience: "",
  goal: "",
};

type DocumentName = (typeof DISTRIBUTOR_DOCUMENTS)[number]["name"];
type DocumentFiles = Partial<Record<DocumentName, File | null>>;

export function DistributorForm() {
  const [form, setForm] = useState(EMPTY);
  const [documents, setDocuments] = useState<DocumentFiles>({});
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [sentDocuments, setSentDocuments] = useState<string[]>([]);

  const set = <K extends keyof typeof EMPTY>(key: K) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  function setDocument(name: DocumentName, file: File | null) {
    setDocuments((current) => ({ ...current, [name]: file }));
  }

  /** "Village, Taluka, District, State" — blanks fall out rather than leaving commas. */
  function place(village: string, taluka: string, district: string, state: string) {
    return [village, taluka, district, state].filter(Boolean).join(", ");
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const attached = DISTRIBUTOR_DOCUMENTS.map((document) => {
      const file = documents[document.name] ?? null;
      return `${document.label} — ${describeFile(file) || "to be attached"}`;
    });

    const groups: FormGroup[] = [
      {
        heading: "Personal details",
        answers: [
          {
            label: "Name",
            value: [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" "),
          },
          { label: "Mobile", value: form.mobile },
          { label: "Alternate mobile", value: form.altMobile },
          { label: "Email", value: form.email },
          {
            label: "Location",
            value: place(form.village, form.taluka, form.district, form.state),
          },
        ],
      },
      {
        heading: "Business details",
        answers: [
          { label: "Address of where to start", value: form.businessAddress },
          {
            label: "Business location",
            value: place(
              form.businessVillage,
              form.businessTaluka,
              form.businessDistrict,
              form.businessState,
            ),
          },
        ],
      },
      {
        heading: "Documents",
        answers: attached.map((line) => ({ label: "Document", value: line })),
      },
      {
        heading: "Questions",
        answers: [
          { label: "Where the shop can open", value: form.shopLevel },
          { label: "Has used Soil Charger Technology", value: form.usedSct },
          { label: DISTRIBUTOR_QUESTIONS[0].label, value: form.whyDistributorship },
          { label: DISTRIBUTOR_QUESTIONS[1].label, value: form.sctExperience },
          { label: DISTRIBUTOR_QUESTIONS[2].label, value: form.farmExperience },
          { label: DISTRIBUTOR_QUESTIONS[3].label, value: form.goal },
        ],
      },
    ];

    setSentDocuments(attached);
    setDelivery(
      deliver({ title: "SCT business / distributor application", destination: "careers", groups }),
    );
  }

  if (delivery) {
    return (
      <SuccessPanel
        delivery={delivery}
        attachments={sentDocuments}
        onReset={() => {
          setForm(EMPTY);
          setDocuments({});
          setDelivery(null);
        }}
        resetLabel="Start another application"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* ---- 1. Personal ------------------------------------------------- */}
      <FormStep index={1} title="Personal details" description="Who is applying, and where you are.">
        <FieldRow cols={3}>
          <TextField
            label="First name"
            value={form.firstName}
            onChange={set("firstName")}
            autoComplete="given-name"
            required
          />
          <TextField
            label="Middle name"
            value={form.middleName}
            onChange={set("middleName")}
            autoComplete="additional-name"
          />
          <TextField
            label="Last name"
            value={form.lastName}
            onChange={set("lastName")}
            autoComplete="family-name"
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
            label="Alternate mobile number"
            type="tel"
            value={form.altMobile}
            onChange={set("altMobile")}
            placeholder="A second number we can try"
            pattern={PHONE_PATTERN}
            title={PHONE_TITLE}
            inputMode="tel"
          />
        </FieldRow>

        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <FieldRow>
          <SelectField
            label="State"
            value={form.state}
            onChange={set("state")}
            options={STATE_OPTIONS}
            placeholder="Choose your state…"
            required
          />
          <TextField label="District" value={form.district} onChange={set("district")} required />
        </FieldRow>

        <FieldRow>
          <TextField label="Taluka" value={form.taluka} onChange={set("taluka")} required />
          <TextField label="Village / city" value={form.village} onChange={set("village")} required />
        </FieldRow>
      </FormStep>

      {/* ---- 2. Business ------------------------------------------------- */}
      <FormStep
        index={2}
        title="Business details"
        description="Where you intend to open. It can be the same place you live, or somewhere else."
      >
        <TextAreaField
          label="Address of where to start"
          value={form.businessAddress}
          onChange={set("businessAddress")}
          placeholder="Shop or premises address, with any landmark."
          rows={3}
          required
        />

        <FieldRow>
          <SelectField
            label="State"
            value={form.businessState}
            onChange={set("businessState")}
            options={STATE_OPTIONS}
            placeholder="Choose a state…"
            required
          />
          <TextField
            label="District"
            value={form.businessDistrict}
            onChange={set("businessDistrict")}
            required
          />
        </FieldRow>

        <FieldRow>
          <TextField
            label="Taluka"
            value={form.businessTaluka}
            onChange={set("businessTaluka")}
            required
          />
          <TextField
            label="Village / city"
            value={form.businessVillage}
            onChange={set("businessVillage")}
            required
          />
        </FieldRow>
      </FormStep>

      {/* ---- 3. Documents ------------------------------------------------ */}
      <FormStep
        index={3}
        title="Required documents"
        description="Pick each file here and the application will list them for you to attach before you send."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {DISTRIBUTOR_DOCUMENTS.map((document) => (
            <FileField
              key={document.name}
              label={document.label}
              file={documents[document.name] ?? null}
              onChange={(file) => setDocument(document.name, file)}
              accept={DOCUMENT_ACCEPT}
            />
          ))}
        </div>
      </FormStep>

      {/* ---- 4. Questions ------------------------------------------------ */}
      <FormStep
        index={4}
        title="A few questions"
        description="These are what SCT reads first. Answer them in your own words — short is fine."
      >
        <FieldRow>
          <SelectField
            label="Where can you open the shop?"
            value={form.shopLevel}
            onChange={set("shopLevel")}
            options={SHOP_LEVELS}
            required
          />
          <SelectField
            label="Have you used Soil Charger Technology?"
            value={form.usedSct}
            onChange={set("usedSct")}
            options={YES_NO}
            required
          />
        </FieldRow>

        <TextAreaField
          label={DISTRIBUTOR_QUESTIONS[0].label}
          value={form.whyDistributorship}
          onChange={set("whyDistributorship")}
          rows={3}
          required
        />
        <TextAreaField
          label={DISTRIBUTOR_QUESTIONS[1].label}
          value={form.sctExperience}
          onChange={set("sctExperience")}
          rows={3}
          hint="Leave this empty if you have not used it yet."
        />
        <TextAreaField
          label={DISTRIBUTOR_QUESTIONS[2].label}
          value={form.farmExperience}
          onChange={set("farmExperience")}
          rows={3}
          required
        />
        <TextAreaField
          label={DISTRIBUTOR_QUESTIONS[3].label}
          value={form.goal}
          onChange={set("goal")}
          rows={4}
          required
        />
      </FormStep>

      <SubmitRow
        label="Submit application"
        icon={<Send aria-hidden className="size-4" />}
        note={<RequiredNote />}
      />
    </form>
  );
}
