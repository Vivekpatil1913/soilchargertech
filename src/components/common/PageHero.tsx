import type { ReactNode } from "react";

import { Heading, Shell } from "@/components/ui";

/**
 * PAGE HERO
 * =========
 * Every inner page opens with this, which is what makes them read as one site
 * rather than ten. Always the forest ground with the fx layers, so the header
 * has a dark band to sit transparent over on arrival, exactly as on home.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className="ground-forest">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 fx-mesh" />
        <div className="absolute inset-0 fx-streaks opacity-60" />
        <div className="absolute inset-0 fx-dots opacity-50" />
        <div className="bloom bloom-a absolute -left-40 -top-32 size-[32rem] bg-brand-500/25" />
        <div className="bloom bloom-b absolute -bottom-32 -right-28 size-[26rem] bg-leaf-500/15" />
      </div>

      <Shell size="wide" className="relative pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-44">
        <Heading
          id="page-heading"
          as="h1"
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          tone="onDark"
        />
        {children ? <div className="mt-9">{children}</div> : null}
      </Shell>
    </section>
  );
}
