import type { LucideIcon } from "lucide-react";
import { BarChart3, Droplets, Eye, Leaf, Sprout, Target, Users } from "lucide-react";
import type { ReactNode } from "react";

import { Reveal, Section, Shell } from "@/components/ui";
import { mission, vision } from "@/data/site";

/**
 * VISION & MISSION
 * ================
 * Two statement cards, text only. Each carries its own tinted ground — green
 * for the vision, warm for the mission — so the pair reads as one statement in
 * two halves rather than as two more content blocks.
 *
 * Every accent is declared per panel as a full class string rather than being
 * assembled from a colour name — Tailwind only sees classes it can read whole,
 * so `bg-${tone}-100` would compile to nothing.
 */

type Panel = {
  key: string;
  eyebrow: string;
  /** The heading, with its own accent break — the two cards split differently. */
  headline: ReactNode;
  points: readonly string[];
  /** Index-matched to `points`; cycles if a list ever outgrows it. */
  pointIcons: readonly LucideIcon[];
  Icon: LucideIcon;
  /** Accents. */
  card: string;
  bloom: string;
  iconWrap: string;
  eyebrowColor: string;
  rule: string;
  bullet: string;
};

const PANELS: readonly Panel[] = [
  {
    key: "vision",
    eyebrow: "Vision",
    headline: (
      <>
        What we are
        <br />
        <span className="text-brand-700">working towards</span>
      </>
    ),
    points: vision,
    pointIcons: [Sprout, Leaf, Droplets, BarChart3],
    Icon: Eye,
    card: "bg-[linear-gradient(135deg,#ffffff_0%,#f7fbf8_48%,#e9f7ee_100%)]",
    bloom: "bg-brand-200/45",
    iconWrap: "bg-brand-100 text-brand-700",
    eyebrowColor: "text-brand-700",
    rule: "bg-gradient-to-r from-brand-200 to-transparent",
    bullet: "bg-brand-50 text-brand-600 ring-1 ring-brand-100",
  },
  {
    key: "mission",
    eyebrow: "Mission",
    headline: (
      <>
        What we are
        <br />
        doing <span className="text-brand-700">about it</span>
      </>
    ),
    points: mission,
    pointIcons: [Users, Sprout],
    Icon: Target,
    card: "bg-[linear-gradient(135deg,#ffffff_0%,#fffaf4_48%,#ffeedc_100%)]",
    bloom: "bg-saffron-200/45",
    iconWrap: "bg-saffron-100 text-saffron-600",
    eyebrowColor: "text-saffron-700",
    rule: "bg-gradient-to-r from-saffron-200 to-transparent",
    bullet: "bg-saffron-50 text-saffron-600 ring-1 ring-saffron-100",
  },
];

export function VisionMission() {
  return (
    <Section ground="tint" labelledBy="vision-heading" id="vision">
      <Shell size="wide">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
          {PANELS.map((panel, index) => (
            <Reveal key={panel.key} delay={index * 0.08} className="h-full">
              <PanelCard panel={panel} headingId={index === 0 ? "vision-heading" : undefined} />
            </Reveal>
          ))}
        </div>
      </Shell>
    </Section>
  );
}

function PanelCard({ panel, headingId }: { panel: Panel; headingId?: string }) {
  const { Icon } = panel;

  return (
    <article
      className={`group shadow-card relative isolate h-full overflow-hidden rounded-3xl border border-white/80 p-6 transition-all duration-400 [transition-timing-function:var(--ease-expressive)] hover:shadow-card-lg motion-safe:hover:-translate-y-1 sm:p-7 lg:p-8 ${panel.card}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-16 -top-20 size-56 rounded-full blur-3xl ${panel.bloom}`}
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-full ${panel.iconWrap}`}
          >
            <Icon aria-hidden className="size-[1.05rem]" strokeWidth={2.1} />
          </span>
          <p className={`text-eyebrow ${panel.eyebrowColor}`}>{panel.eyebrow}</p>
          <span aria-hidden className={`h-px flex-1 ${panel.rule}`} />
        </div>

        <h2
          id={headingId}
          className="mt-6 font-display text-[clamp(1.35rem,1.1rem+0.85vw,1.8rem)] font-extrabold leading-[1.18] text-ink-900"
        >
          {panel.headline}
        </h2>

        <ul className="mt-6 space-y-3.5">
          {panel.points.map((line, index) => {
            const PointIcon = panel.pointIcons[index % panel.pointIcons.length];
            return (
              <li key={line} className="flex items-start gap-3.5">
                <span
                  aria-hidden
                  className={`mt-px grid size-8 shrink-0 place-items-center rounded-full ${panel.bullet}`}
                >
                  <PointIcon className="size-[0.95rem]" strokeWidth={2} />
                </span>
                <span className="text-[0.94rem] leading-relaxed text-ink-600">{line}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
