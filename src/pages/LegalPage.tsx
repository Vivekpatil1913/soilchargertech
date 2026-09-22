import type { ReactNode } from "react";

import { Brand, NoTranslate, protectBrand } from "@/components/common/NoTranslate";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { Section, Shell } from "@/components/ui";
import { contact } from "@/data/site";

/**
 * LEGAL PAGE SHELL
 * ================
 * Privacy and Terms share one layout. Both are written in plain language
 * rather than boilerplate, because the audience reading them is the same
 * audience the rest of the site is written for.
 *
 * IMPORTANT: these are drafts describing how the site as built actually
 * behaves — it stores nothing, it has no backend, and the contact form opens
 * WhatsApp. They have not been reviewed by a lawyer and should be before
 * launch.
 */

export type LegalSection = { heading: string; paragraphs: ReactNode[] };

export function LegalPage({
  kind,
  title,
  lead,
  sections,
}: {
  kind: "privacy" | "terms";
  title: string;
  lead: string;
  sections: LegalSection[];
}) {
  const updated = "21 September 2026";

  return (
    <>
      <Seo
        title={title}
        description={lead}
        path={kind === "privacy" ? "/privacy" : "/terms"}
      />

      <PageHero eyebrow="Legal" title={title} lead={lead} />

      <Section ground="light">
        <Shell size="narrow">
          <p className="text-[0.86rem] text-ink-400">Last updated: {updated}</p>

          <div className="mt-10 space-y-11">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-h3 text-ink-900">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-[1.75] text-ink-600">
                  {section.paragraphs.map((paragraph, index) => (
                    /* Most paragraphs are plain strings from the page files and
                       several name the company mid-sentence; `protectBrand`
                       holds the name back while the sentence translates. */
                    <p key={index}>
                      {typeof paragraph === "string" ? protectBrand(paragraph) : paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-h3 text-ink-900">Questions about this page</h2>
              <div className="mt-4 space-y-4 text-[1rem] leading-[1.75] text-ink-600">
                <p>
                  Write to{" "}
                  <a
                    href={`mailto:${contact.emails.general}`}
                    className="font-semibold text-forest-700 underline-offset-4 hover:underline"
                  >
                    <NoTranslate>{contact.emails.general}</NoTranslate>
                  </a>{" "}
                  or call <NoTranslate pad="both">{contact.phones[0]},</NoTranslate>and
                  <Brand pad="both" />
                  will answer.
                </p>
              </div>
            </section>
          </div>

          <p className="mt-14 rounded-2xl border border-harvest-200 bg-harvest-50 p-6 text-[0.88rem] leading-relaxed text-harvest-800">
            This page is a plain-language draft describing how the website actually behaves today.
            It has not been reviewed by a lawyer and should be before the site goes live.
          </p>
        </Shell>
      </Section>
    </>
  );
}
