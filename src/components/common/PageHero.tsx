import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Heading, Shell } from "@/components/ui";
import Link from "@/shims/Link";

export type Crumb = { label: string; href?: string };

/**
 * PAGE HERO
 * =========
 * Every inner page opens with this, which is what makes them read as one site
 * rather than ten.
 *
 * It is a pale band, not a dark one. The previous version put every inner page
 * behind a deep-green slab with drifting orbs, because the header used to be
 * transparent on arrival and needed something dark to sit on. The header is
 * solid now, so that requirement is gone — and without it, a dark slab at the
 * top of ten consecutive pages is just noise. A page header's job is to say
 * where you are, and it does that better on paper.
 *
 * The breadcrumb is part of that job. It is the one thing a deep catalogue
 * page (`/products/<category>/<pack>`) genuinely needs and the old design had
 * nowhere to put.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Ancestors only — the current page is not a link and is not repeated. */
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-heading"
      className="ground-canvas border-b border-ink-100"
    >
      <Shell className="py-10 lg:py-14">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-400">
              <li>
                <Link href="/" className="transition-colors hover:text-forest-700">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden className="size-3 text-ink-300" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-forest-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink-600">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Heading id="page-heading" as="h1" eyebrow={eyebrow} title={title} lead={lead} />

        {children ? <div className="mt-8">{children}</div> : null}
      </Shell>
    </section>
  );
}
