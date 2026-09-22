import type { LucideIcon } from "lucide-react";
import { BarChart3, Droplets, Eye, Leaf, Sprout, Target, Users } from "lucide-react";

import { Eyebrow, Reveal, Section, Shell } from "@/components/ui";
import { mission, vision } from "@/data/site";

/**
 * VISION & MISSION
 * ================
 * Two statement panels, text only. The previous version gave each one a
 * gradient ground, a blurred colour orb and its own accent family — five
 * decorated surfaces for eight sentences. These are the two most important
 * sentences SCT has written about itself, and decoration was getting in front
 * of them.
 *
 * Now they are set as a document: one panel on paper, one on canvas, the same
 * gold rule that heads every other section on the site, and the statements
 * themselves given the room. The only thing distinguishing the halves is the
 * ground, which is enough.
 */

type Panel = {
  key: string;
  eyebrow: string;
  headline: string;
  points: readonly string[];
  /** Index-matched to `points`; cycles if a list ever outgrows it. */
  pointIcons: readonly LucideIcon[];
  Icon: LucideIcon;
  /** The panel's ground. The only difference between the two. */
  surface: string;
};

const PANELS: readonly Panel[] = [
  {
    key: "vision",
    eyebrow: "Vision",
    headline: "What we are working towards",
    points: vision,
    pointIcons: [Sprout, Leaf, Droplets, BarChart3],
    Icon: Eye,
    surface: "bg-white",
  },
  {
    key: "mission",
    eyebrow: "Mission",
    headline: "What we are doing about it",
    points: mission,
    pointIcons: [Users, Sprout],
    Icon: Target,
    surface: "bg-canvas-50",
  },
];

export function VisionMission() {
  return (
    <Section ground="light" labelledBy="vision-heading" id="vision">
      <Shell>
        <div className="grid overflow-hidden rounded-2xl border border-ink-100 shadow-soft lg:grid-cols-2">
          {PANELS.map((panel, index) => (
            <Reveal key={panel.key} delay={index * 0.08} className="h-full">
              <PanelCard
                panel={panel}
                headingId={index === 0 ? "vision-heading" : undefined}
                divided={index === 1}
              />
            </Reveal>
          ))}
        </div>
      </Shell>
    </Section>
  );
}

function PanelCard({
  panel,
  headingId,
  divided,
}: {
  panel: Panel;
  headingId?: string;
  divided: boolean;
}) {
  const { Icon } = panel;

  return (
    <article
      className={`flex h-full flex-col p-7 sm:p-9 ${panel.surface} ${
        divided ? "border-t border-ink-100 lg:border-l lg:border-t-0" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-forest-50 text-forest-700">
          <Icon aria-hidden className="size-4" />
        </span>
        <Eyebrow>{panel.eyebrow}</Eyebrow>
      </div>

      <h2 id={headingId} className="text-h2 mt-5 text-ink-900">
        {panel.headline}
      </h2>
      <span aria-hidden className="rule-harvest mt-3" />

      <ul className="mt-7 space-y-4 border-t border-ink-100 pt-6">
        {panel.points.map((line, index) => {
          const PointIcon = panel.pointIcons[index % panel.pointIcons.length];
          return (
            <li key={line} className="flex items-start gap-3.5">
              <span
                aria-hidden
                className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-harvest-200 bg-harvest-50 text-harvest-700"
              >
                <PointIcon className="size-3.5" />
              </span>
              <span className="text-sm leading-relaxed text-ink-600">{line}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
