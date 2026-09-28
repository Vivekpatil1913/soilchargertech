import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Play, PlayCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Card, Reveal, Section, Shell } from "@/components/ui";
import { socials } from "@/data/site";
import { testimonials, type Testimonial } from "@/data/testimonials";

/**
 * PROOF, IN OTHER FARMERS' VOICES
 * ===============================
 * Real testimonials only, in Marathi, reproduced verbatim from SCT's own site
 * — see src/data/testimonials.ts for the sourcing rule and for why the
 * invented ones were deleted.
 *
 * An entry with `verified: false` is a placeholder. Nothing on the card says
 * so any more — the "Sample" chip was removed at the client's request — so the
 * only guard left is the DUMMY block at the end of src/data/testimonials.ts,
 * which must be deleted before launch.
 *
 * The cards show the farmer's own words and nothing else. The English gloss
 * kept in the data is editorial reference for whoever maintains this file; it
 * is deliberately not rendered, because a translation printed under a quote
 * reads as a subtitle on the farmer rather than as his voice.
 *
 * The section reads whatever src/data/testimonials.ts holds and changes shape
 * on its own:
 *
 *   up to two   → they sit side by side, as they have until now
 *   three plus  → they become a slider, one card per step, driven by the
 *                 arrows, so the section never grows taller as SCT collects
 *                 more. There is deliberately no dot indicator under it.
 *
 * Because two quotes will not carry a section on their own, the strongest
 * proof SCT actually has runs alongside them: a YouTube channel with years of
 * farmers filmed in their own fields. That is a far better answer to "does
 * this work" than six quotes nobody can verify, and it sends the visitor
 * somewhere they can judge for themselves.
 *
 * The old site's "ADD TESTIMONIAL" band used to close this section. It has
 * been removed at the client's request. The dialog behind it still exists —
 * components/forms/TestimonialForm.tsx and the TestimonialLauncher in
 * components/forms/launchers.tsx — so it can be reattached from anywhere with
 * a single <TestimonialLauncher> without rebuilding the form.
 */

/** Above this count the quotes slide instead of sitting in a row. */
const SLIDE_ABOVE = 2;

const youtube = socials.find((social) => social.icon === "youtube")?.href ?? "#";

export function Proof() {
  const slides = testimonials.length > SLIDE_ABOVE;

  return (
    <Section
      id="farmer-stories"
      ground="light"
      labelledBy="proof-heading"
      className="overflow-hidden py-12! md:py-14! xl:py-16!"
    >
      <ProofBackdrop />

      <Shell size="wide" className="relative">
        <header className="relative flex flex-col items-center text-center">
          <Reveal>
            <p className="text-eyebrow inline-flex items-center gap-3 text-brand-700">
              <span aria-hidden className="hidden h-px w-24 bg-brand-200 sm:block" />
              <span aria-hidden className="size-2 rounded-full bg-brand-600" />
              From the field
              <span aria-hidden className="hidden h-px w-24 bg-brand-200 sm:block" />
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2
              id="proof-heading"
              className="mt-4 font-serif text-[2rem] font-bold leading-[1.05] tracking-[-0.02em] text-ink-900 sm:text-[2.5rem] lg:text-[2.9rem]"
            >
              Don&rsquo;t take our word. <span className="text-brand-600">Take theirs.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-body mx-auto mt-3 max-w-2xl text-ink-500 sm:text-[1rem]">
              Farmers who use SCT talk about it in their own words, in their own language — on
              the phone, in the WhatsApp group, and on camera in their own fields.
            </p>
          </Reveal>

          <LeafSprig className="absolute left-[10%] top-8 hidden w-10 -rotate-12 text-leaf-400/60 lg:block" />
          <LeafSprig className="absolute right-[12%] top-16 hidden w-8 rotate-[40deg] text-leaf-400/50 lg:block" />
        </header>

        {slides ? (
          <div className="mt-9 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Reveal className="min-w-0">
              <TestimonialSlider items={testimonials} />
            </Reveal>
            <Reveal delay={0.12} className="h-full lg:pb-[4.25rem]">
              <ChannelCard />
            </Reveal>
          </div>
        ) : (
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 0.09} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
            <Reveal delay={0.18} className="h-full">
              <ChannelCard />
            </Reveal>
          </div>
        )}
      </Shell>
    </Section>
  );
}

/** Soft waves and a stray sprig behind the section — decoration only. */
function ProofBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg
        className="absolute inset-x-0 top-28 h-[30rem] w-full text-brand-100"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 150C240 70 420 70 640 130S1080 230 1440 100V0H0Z" opacity=".25" />
        <path d="M0 400V260C260 180 480 310 760 260S1200 150 1440 220V400Z" opacity=".35" />
      </svg>
      <LeafSprig className="absolute -left-1 bottom-20 hidden w-24 rotate-[25deg] text-leaf-400/45 xl:block" />
    </div>
  );
}

/** A single leaf on a short stem, drawn in currentColor. */
function LeafSprig({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 48 64" fill="none" className={className}>
      <path
        d="M24 62C24 46 22 34 16 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M16 24C4 16 4 2 4 2s18 2 24 14c5 10 2 20-2 24-6-2-10-8-10-16Z" fill="currentColor" />
      <path d="M8 6c6 8 11 16 15 28" stroke="white" strokeWidth="1" opacity=".5" />
    </svg>
  );
}

/* ==========================================================================
   THE SLIDER
   --------------------------------------------------------------------------
   A scroll-snap track rather than a transform carousel: a trackpad swipe, a
   touch drag and the arrows all move the same thing, and the step is measured
   from the cards themselves, so one card per view on a phone and two on a
   desktop needs no breakpoint bookkeeping here.
   ========================================================================== */

function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** Distance from one card to the next, gap included. */
  const step = (track: HTMLUListElement) => {
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    if (!first) return track.clientWidth;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  };

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const end = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= end - 4);
  }, [items.length]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * step(track), behavior: "smooth" });
  };

  return (
    <div className="flex h-full flex-col">
      <ul
        ref={trackRef}
        onScroll={sync}
        aria-label="Farmer testimonials"
        className="-mx-1 flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((testimonial) => (
          <li
            key={testimonial.id}
            className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-0.625rem)]"
          >
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-center gap-4">
        <SliderArrow direction="prev" onClick={() => nudge(-1)} disabled={atStart} />
        <SliderArrow direction="next" onClick={() => nudge(1)} disabled={atEnd} />
      </div>
    </div>
  );
}

function SliderArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="grid size-12 place-items-center rounded-full border border-hairline bg-surface text-ink-900 shadow-sm transition-all duration-300 [transition-timing-function:var(--ease-expressive)] hover:border-brand-300 hover:text-brand-700 hover:shadow-card disabled:pointer-events-none disabled:opacity-35 motion-safe:hover:-translate-y-0.5"
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}

/* ==========================================================================
   CARDS
   ========================================================================== */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="relative h-full overflow-hidden p-6 sm:p-7">
      <QuoteMark className="w-10 text-brand-200" />

      <blockquote className="relative mt-4 flex-1">
        <p
          lang="mr"
          className="text-[1.1rem] font-medium leading-[1.65] text-ink-900 sm:text-[1.2rem]"
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="relative mt-5">
        <span aria-hidden className="block h-0.5 w-14 rounded-full bg-brand-600" />
        <p lang="mr" className="mt-3.5 font-display text-[1.15rem] font-bold text-brand-700">
          {testimonial.name}
        </p>
        <p lang="mr" className="mt-1 flex items-center gap-2 text-[0.9rem] text-ink-500">
          <MapPin aria-hidden className="size-4 shrink-0 fill-brand-600 text-surface" />
          {testimonial.location}
        </p>
      </footer>

      <QuoteMark className="pointer-events-none absolute bottom-6 right-6 w-14 rotate-180 text-ink-900/[0.06]" />
    </Card>
  );
}

/** A heavy, filled opening quote mark. */
function QuoteMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 48" fill="currentColor" className={className}>
      <path d="M0 48V29C0 13 8 3 24 0l3 7C18 10 14 16 14 23h12v25Zm36 0V29c0-16 8-26 24-29l3 7c-9 3-13 9-13 16h12v25Z" />
    </svg>
  );
}

/** The channel — SCT's real proof archive. */
function ChannelCard() {
  return (
    <a
      href={youtube}
      target="_blank"
      rel="noopener noreferrer"
      className="group ground-forest relative flex h-full flex-col overflow-hidden rounded-2xl p-7 shadow-card transition-transform duration-400 motion-safe:hover:-translate-y-1 sm:p-7"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 fx-mesh opacity-80" />
        <div className="bloom bloom-a absolute -right-20 -top-16 size-[18rem] bg-brand-500/25" />
        <LeafBranch className="absolute -right-8 top-6 w-36 text-leaf-400/20 transition-transform duration-700 motion-safe:group-hover:rotate-3" />
      </div>

      <div className="relative flex items-center gap-4">
        <span className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/25 transition-transform duration-400 motion-safe:group-hover:scale-110">
          <Play aria-hidden className="ml-0.5 size-5 fill-current" />
        </span>
        <span className="text-eyebrow text-white/85">From the field</span>
      </div>

      <h3 className="relative mt-5 font-serif text-[1.7rem] font-bold leading-[1.1] text-white sm:text-[1.85rem]">
        Years of farmers, <br className="hidden sm:block" />
        on camera
      </h3>
      <p className="relative mb-6 mt-3 text-[0.95rem] leading-relaxed text-sage-300/90">
        SCT posts a video every day. Fields, crops, mistakes and results — farmers talking in
        their own words.
      </p>

      <span className="relative mt-auto inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-600 px-6 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-300 group-hover:bg-brand-500">
        <PlayCircle aria-hidden className="size-5" />
        Watch farmer stories
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
        />
      </span>
    </a>
  );
}

/** A leafy branch silhouette for the channel card. */
function LeafBranch({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 160 220" fill="currentColor" className={className}>
      <path d="M40 220C60 160 80 110 130 20" stroke="currentColor" strokeWidth="3" fill="none" />
      <path d="M118 40c-2-22 12-36 34-40 2 22-10 38-34 40Z" />
      <path d="M100 72c-24-4-36-20-34-42 22 2 36 18 34 42Z" />
      <path d="M92 90c6-24 26-34 50-30-6 24-26 34-50 30Z" />
      <path d="M76 124c-24 0-40-14-42-36 22-2 40 12 42 36Z" />
      <path d="M68 142c8-22 28-30 50-24-8 22-28 30-50 24Z" />
      <path d="M56 176c-22 2-38-10-42-32 22-4 38 10 42 32Z" />
    </svg>
  );
}
