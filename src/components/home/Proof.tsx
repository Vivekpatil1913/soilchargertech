import { ChevronLeft, ChevronRight, PlayCircle, Quote, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Card, Heading, Reveal, Section, Shell } from "@/components/ui";
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
 *                 more
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
    <Section id="farmer-stories" ground="light" labelledBy="proof-heading">
      <Shell size="wide">
        <Heading
          id="proof-heading"
          eyebrow="From the field"
          align="center"
          title={
            <>
              Don&apos;t take our word. <span className="text-brand-600">Take theirs.</span>
            </>
          }
          lead="Farmers who use SCT talk about it in their own words, in their own language — on the phone, in the WhatsApp group, and on camera in their own fields."
        />

        {slides ? (
          <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <Reveal className="min-w-0">
              <TestimonialSlider items={testimonials} />
            </Reveal>
            <Reveal delay={0.12} className="h-full">
              <ChannelCard />
            </Reveal>
          </div>
        ) : (
          <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1fr_0.9fr]">
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
    const distance = step(track) || 1;
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

      <div className="mt-7 flex items-center justify-end gap-2.5">
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
      className="grid size-11 place-items-center rounded-full border border-hairline bg-surface text-ink-700 transition-all duration-300 [transition-timing-function:var(--ease-expressive)] hover:border-brand-300 hover:text-brand-700 hover:shadow-card disabled:pointer-events-none disabled:opacity-35 motion-safe:hover:-translate-y-0.5"
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
    <Card className="h-full p-7 sm:p-8">
      <Quote aria-hidden className="size-8 shrink-0 text-brand-300" />

      <blockquote className="mt-5 flex-1">
        <p
          lang="mr"
          className="font-display text-[1.08rem] font-semibold leading-relaxed text-ink-900"
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <footer className="mt-6 border-t border-hairline pt-5">
        <p lang="mr" className="font-display text-[0.98rem] font-bold text-ink-900">
          {testimonial.name}
        </p>
        <p lang="mr" className="mt-0.5 text-[0.85rem] text-ink-500">
          {testimonial.location}
        </p>
      </footer>
    </Card>
  );
}

/** The channel — SCT's real proof archive. */
function ChannelCard() {
  return (
    <a
      href={youtube}
      target="_blank"
      rel="noopener noreferrer"
      className="group ground-forest relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7 transition-transform duration-400 motion-safe:hover:-translate-y-1 sm:p-8"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 fx-mesh opacity-80" />
        <div className="bloom bloom-a absolute -right-20 -top-16 size-[18rem] bg-brand-500/25" />
      </div>

      <div className="relative">
        <span className="grid size-12 place-items-center rounded-squircle bg-white/10 text-leaf-300 ring-1 ring-inset ring-white/15 transition-transform duration-400 motion-safe:group-hover:scale-110">
          <PlayCircle aria-hidden className="size-6" />
        </span>

        <h3 className="mt-6 font-display text-[1.25rem] font-bold leading-tight text-white">
          Years of farmers, on camera
        </h3>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-sage-300/85">
          SCT posts a video every day. Fields, crops, mistakes and results — farmers talking in
          Marathi about what actually happened on their own land.
        </p>
      </div>

      <p className="relative mt-7 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-leaf-400">
        <Users aria-hidden className="size-4" />
        Watch on the SCT channel
      </p>
    </a>
  );
}
