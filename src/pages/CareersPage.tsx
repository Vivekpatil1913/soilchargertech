import { Briefcase, GraduationCap, Mail, Phone, Store } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { DistributorForm } from "@/components/forms/DistributorForm";
import { InternshipForm } from "@/components/forms/InternshipForm";
import { JobVacancyForm } from "@/components/forms/JobVacancyForm";
import { Card, Heading, Reveal, Section, Shell } from "@/components/ui";
import { contact } from "@/data/site";
import { cn, telHref } from "@/lib/utils";

/**
 * CAREERS
 * =======
 * The old site's Career menu held three destinations — Internship, SCT
 * Business Recruitment and Job Vacancy — each opening a modal. All three
 * forms are here, with their fields intact.
 *
 * WHY THESE ARE INLINE RATHER THAN IN MODALS
 * ------------------------------------------
 * The enquiry and export forms stayed as modals, because those interrupt
 * whatever the visitor was reading and should hand the page straight back.
 * These three do not: applying is why someone came to this page at all. The
 * distributor form alone is 26 fields and six uploads, and a form that long
 * inside a scrolling modal on a phone is miserable — the visitor loses the
 * page behind it, cannot see how far through they are, and one stray tap on
 * the backdrop throws the lot away.
 *
 * So the three tracks are a switcher, and the chosen form opens beneath it on
 * the page. The tab is a real radio group rather than a set of buttons, so it
 * is operable with arrow keys and announces itself properly.
 *
 * DEEP LINKS
 * ----------
 * /careers#internship, /careers#distributor and /careers#employment each open
 * their own track — the footer and the contact page both link straight in.
 */

type TrackId = "internship" | "distributor" | "employment";

const TRACKS = [
  {
    id: "internship" as const,
    icon: GraduationCap,
    label: "Internship",
    title: "Learn the work in the field",
    blurb:
      "For students and recent graduates in agriculture or biotechnology. You will spend the season with the people doing the work, not filing their paperwork.",
    image: "/images/legacy/career1.png",
  },
  {
    id: "distributor" as const,
    icon: Store,
    label: "SCT business",
    title: "Become an SCT distributor",
    blurb:
      "SCT appoints distributors at village, taluka and district level. The application is long because the partnership is real — bring your documents and your own experience of the technology.",
    image: "/images/legacy/career2.png",
  },
  {
    id: "employment" as const,
    icon: Briefcase,
    label: "Job vacancy",
    title: "Join the team",
    blurb:
      "Field, production, sales and support roles across Maharashtra and beyond. Tell us what you have done and where you want to work.",
    image: "/images/legacy/career3.png",
  },
];

function isTrackId(value: string): value is TrackId {
  return value === "internship" || value === "distributor" || value === "employment";
}

export default function CareersPage() {
  const { hash } = useLocation();
  const [active, setActive] = useState<TrackId>("internship");
  const formRef = useRef<HTMLDivElement>(null);
  /* Skips the scroll on first paint — arriving at /careers should not jump
     past the hero, but choosing a track later should bring the form into view. */
  const mounted = useRef(false);

  useEffect(() => {
    const target = hash.replace("#", "");
    if (isTrackId(target)) setActive(target);
  }, [hash]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  const track = TRACKS.find((item) => item.id === active) ?? TRACKS[0];

  return (
    <>
      <Seo
        title="Careers"
        description="Work with Soil Charger Technology — internships, distributor partnerships and job openings across India. Apply from Nashik, Maharashtra."
        path="/careers"
      />

      <PageHero
        eyebrow="Careers"
        title={
          <>
            Work where the <span className="text-shine">soil is.</span>
          </>
        }
        lead="Three ways to join SCT — as an intern, as a distributor, or on the team. Every application below reaches the same people."
      />

      {/* ---- The three tracks -------------------------------------------- */}
      <Section ground="light" labelledBy="tracks-heading">
        <Shell size="wide">
          <Heading
            id="tracks-heading"
            eyebrow="Pick your route"
            align="center"
            title="Which of these is you?"
            lead="Choose a track and its form opens below. Nothing is submitted until you press the button at the end of it."
          />

          <div
            role="radiogroup"
            aria-label="Choose a career track"
            className="mt-14 grid gap-5 lg:grid-cols-3"
          >
            {TRACKS.map((item, index) => {
              const Icon = item.icon;
              const selected = item.id === active;
              return (
                <Reveal key={item.id} delay={index * 0.08} className="h-full">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "group flex h-full w-full flex-col rounded-2xl border p-7 text-left transition-all duration-400 [transition-timing-function:var(--ease-expressive)] motion-safe:hover:-translate-y-1",
                      selected
                        ? "border-brand-400 bg-brand-50/70 shadow-card"
                        : "border-hairline bg-surface hover:border-brand-300 hover:shadow-card",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-squircle ring-1 ring-inset transition-transform duration-400 motion-safe:group-hover:scale-110",
                        selected
                          ? "bg-brand-600 text-white ring-brand-600"
                          : "bg-brand-50 text-brand-700 ring-brand-200",
                      )}
                    >
                      <Icon aria-hidden className="size-6" />
                    </span>

                    <p className="text-eyebrow mt-6 text-brand-700">{item.label}</p>
                    <h3 className="mt-2 font-display text-[1.2rem] font-bold leading-tight text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-500">
                      {item.blurb}
                    </p>

                    <span
                      className={cn(
                        "mt-6 inline-flex items-center gap-2 text-[0.9rem] font-bold",
                        selected ? "text-brand-700" : "text-ink-400 group-hover:text-brand-700",
                      )}
                    >
                      {selected ? "Form open below" : "Choose this track"}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </Shell>
      </Section>

      {/* ---- The chosen form --------------------------------------------- */}
      <Section ground="tint" labelledBy="application-heading" id={active}>
        {/* `narrow` (48rem) squeezed the two-column rows to ~360px a side and
            left the distributor form's three-name row unusable. The default
            shell opens it up; the inner cap keeps a "Full name" box from
            running the width of a desktop screen.

            The cap is a plain div rather than `className="max-w-5xl"` on the
            Shell: `shell` is a custom `@utility` with its own max-width, so
            overriding it from outside would come down to which of two equally
            specific utilities Tailwind happens to emit last. */}
        <Shell size="default">
          <div className="mx-auto w-full max-w-5xl">
            <div ref={formRef} className="scroll-mt-28">
              <Reveal>
                <Card className="p-7 sm:p-10" lift={false}>
                  <Heading
                    id="application-heading"
                    eyebrow={track.label}
                    title={track.title}
                    lead={track.blurb}
                  />

                  <div className="mt-10">
                    {active === "internship" ? <InternshipForm /> : null}
                    {active === "distributor" ? <DistributorForm /> : null}
                    {active === "employment" ? <JobVacancyForm /> : null}
                  </div>
                </Card>
              </Reveal>
            </div>

            {/* ---- Talk to a person instead ------------------------------- */}
            <Reveal delay={0.08}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href={telHref(contact.phones[0])}
                  className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-all duration-400 hover:border-brand-300 hover:shadow-card motion-safe:hover:-translate-y-1"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-squircle bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200">
                    <Phone aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.74rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                      Rather talk?
                    </span>
                    <span className="block font-display text-[0.98rem] font-bold text-ink-900">
                      {contact.phones[0]}
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${contact.emails.careers}`}
                  className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-all duration-400 hover:border-brand-300 hover:shadow-card motion-safe:hover:-translate-y-1"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-squircle bg-saffron-50 text-saffron-700 ring-1 ring-inset ring-saffron-200">
                    <Mail aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.74rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                      Careers inbox
                    </span>
                    <span className="block break-all font-display text-[0.98rem] font-bold text-ink-900">
                      {contact.emails.careers}
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>
    </>
  );
}
