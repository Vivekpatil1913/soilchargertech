import { BarChart3, Cog, Sprout as SproutIcon, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, Heading, Reveal, Section, Shell } from "@/components/ui";
import { socials, team, type TeamIcon, type TeamMember } from "@/data/site";
import { cn } from "@/lib/utils";
import Image from "@/shims/Image";

/**
 * TEAM
 * ====
 * Five people, five cards, one row on desktop.
 *
 * Three things carry the design:
 *
 * 1. The portraits are studio cut-outs on a white background, so instead of a
 *    photo frame each one is laid over a tinted panel and the white is dropped
 *    with `mix-blend-multiply`. The blend needs an opaque backdrop inside the
 *    same stacking context: the panel paints its own tint and Card's hover
 *    transform closes the context, so the multiply never reaches the section.
 *
 * 2. `object-cover object-top` crops the bottom of the square source against
 *    the panel's rounded edge. That straight cut is deliberate — it is what
 *    stops five loosely-framed photographs from ending at five different
 *    heights.
 *
 * 3. The tint alternates green / sand down the row. Five near-identical
 *    portraits side by side otherwise read as one flat green field.
 */

const COMPANY_LINKEDIN =
  socials.find((s) => s.icon === "linkedin")?.href ??
  "https://in.linkedin.com/company/soilchargertechnology";

const ROLE_GLYPH: Record<TeamIcon, LucideIcon> = {
  sprout: SproutIcon,
  people: Users,
  gear: Cog,
  growth: BarChart3,
};

/**
 * Hand-set blob radii, cycled so no two neighbours share a silhouette —
 * one shared radius across the row makes it look stamped.
 */
const BLOB_SHAPE = [
  "46% 54% 44% 56% / 52% 48% 52% 48%",
  "56% 44% 52% 48% / 44% 56% 44% 56%",
  "50% 50% 40% 60% / 56% 44% 56% 44%",
  "42% 58% 52% 48% / 48% 52% 48% 52%",
] as const;

/** The two tints the row alternates between. */
const TINT = {
  green: {
    panel: "bg-[#f3f9f0]",
    blob: "bg-[#dbecd5]",
    mark: "text-[#a6cf98]",
    badge: "bg-[#e9f5e4] text-forest-700",
  },
  sand: {
    panel: "bg-[#faf6ee]",
    blob: "bg-[#ece1cb]",
    mark: "text-[#cdbb95]",
    badge: "bg-[#f3ebd8] text-harvest-700",
  },
} as const;

/**
 * The solid LinkedIn "in", rather than lucide's outline version. At 17px the
 * outline glyph goes wiry; the filled wordmark is what reads as LinkedIn.
 */
function LinkedinMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-.96 1.84-1.97 3.79-1.97 4.05 0 4.8 2.53 4.8 5.83v6.07h-4v-5.38c0-1.28-.02-2.93-1.87-2.93-1.88 0-2.16 1.4-2.16 2.84v5.47h-4V9.75Z" />
    </svg>
  );
}

/**
 * The sprout. Drawn rather than imported because the one leaf asset in
 * /public is a photographic grape leaf, which does not sit next to flat UI.
 * `seed` keeps the gradient ids unique across the five cards.
 */
function Sprout({ seed, className }: { seed: string; className?: string }) {
  const blade = `sprout-blade-${seed}`;
  const stem = `sprout-stem-${seed}`;

  return (
    <svg viewBox="0 0 104 158" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={blade} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8cc96a" />
          <stop offset="100%" stopColor="#d4ecbe" />
        </linearGradient>
        <linearGradient id={stem} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#4d8f3e" />
          <stop offset="100%" stopColor="#7cbb5c" />
        </linearGradient>
      </defs>

      {/* Stem first, so both blades sit over the join. */}
      <path
        d="M57 157C57 118 55 88 50 62"
        stroke={`url(#${stem})`}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Lower-left blade */}
      <path d="M48 104C44 79 29 62 4 55c-7 26 13 50 44 49Z" fill={`url(#${blade})`} />
      <path
        d="M47 103C38 88 24 74 7 64"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Upper-right blade, the larger of the two */}
      <path d="M52 69C50 36 64 12 97 1c9 32-11 63-45 68Z" fill={`url(#${blade})`} />
      <path
        d="M53 68C62 47 76 28 94 13"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const Glyph = ROLE_GLYPH[member.icon];
  const tint = TINT[index % 2 === 1 ? "sand" : "green"];

  return (
    <Card className="h-full rounded-[20px]">
      {/* ---- Portrait --------------------------------------------------
          Panel, blob, sprout and badge are all decoration; only the
          photograph carries meaning, so only it takes an alt text. */}
      <div className="relative p-2">
        <div className={cn("relative aspect-[8/7] overflow-hidden rounded-[14px]", tint.panel)}>
          <span
            aria-hidden
            style={{ borderRadius: BLOB_SHAPE[index % BLOB_SHAPE.length] }}
            className={cn(
              "absolute inset-x-[4%] bottom-[-14%] top-[4%] transition-transform duration-[900ms] [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:scale-[1.04]",
              tint.blob,
            )}
          />

          <div
            aria-hidden
            className={cn(
              "absolute right-[7%] top-[7%] w-[30%] transition-transform duration-[900ms] [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:-translate-y-1",
              tint.mark,
            )}
          >
            {/* The role glyph is skipped where it would duplicate the sprout. */}
            {member.icon !== "sprout" ? (
              <Glyph className="ml-auto size-[52%]" strokeWidth={2.2} />
            ) : null}
            <Sprout
              seed={String(index)}
              className={cn("w-[62%]", member.icon === "sprout" ? "ml-auto w-[72%]" : "-mt-[10%]")}
            />
          </div>

          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
            className="object-cover object-top mix-blend-multiply transition-transform duration-[900ms] [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:scale-[1.04]"
          />
        </div>

        {/* Sits outside the clipped panel so the circle stays a full circle. */}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-1 left-1 grid size-10 place-items-center rounded-full ring-2 ring-white",
            tint.badge,
          )}
        >
          <Glyph className="size-[1.15rem]" strokeWidth={2.2} />
        </span>
      </div>

      {/* ---- Details ---------------------------------------------------- */}
      <div className="flex flex-1 flex-col items-center px-4 pb-5 pt-3 text-center">
        <h3 className="font-display text-[1.02rem] font-bold leading-snug text-ink-900">
          {member.name}
        </h3>
        <p className="mt-1 text-[0.86rem] font-semibold text-forest-700">{member.role}</p>

        <blockquote className="mt-3 text-balance text-[0.82rem] leading-relaxed text-ink-500">
          &ldquo;{member.quote}&rdquo;
        </blockquote>

        <div className="mt-auto flex w-full justify-end pt-4">
          <a
            href={member.linkedin ?? COMPANY_LINKEDIN}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${member.name} on LinkedIn`}
            className="grid size-9 place-items-center rounded-lg bg-canvas-100 text-ink-800 transition-colors duration-300 hover:bg-forest-600 hover:text-white"
          >
            <LinkedinMark className="size-[1.05rem]" />
          </a>
        </div>
      </div>
    </Card>
  );
}

export function TeamSection() {
  return (
    <Section ground="light" labelledBy="team-heading" id="team">
      <Shell size="wide">
        <Heading
          id="team-heading"
          eyebrow="The team"
          align="center"
          title={
            <>
              The people <span className="text-forest-700">behind it</span>
            </>
          }
          lead="A passionate team working towards healthier soil, stronger farms and a brighter tomorrow."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {team.map((member, index) => (
            <Reveal key={member.name} as="li" delay={index * 0.06} className="h-full">
              <TeamCard member={member} index={index} />
            </Reveal>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
