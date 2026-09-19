import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { applications } from "@/data/applications";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { CTAButton } from "@/components/common/CTAButton";
import { fadeUp } from "@/lib/animations";

/**
 * APPLICATIONS
 * ============
 * Crop families rather than a list of every crop — a farmer recognises their own
 * category immediately, and the section stays honest that crop-specific guidance
 * comes from SCT's team, not from a web page.
 *
 * Photography-led: the image is the content here, so copy sits over it and the
 * whole card is one large tap target on mobile. The description is revealed on
 * hover on desktop and shown permanently on touch, where there is no hover.
 */
export function ApplicationsSection() {
  return (
    <section aria-labelledby="applications-heading" className="section-y bg-cream-100">
      <Container width="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Where it works"
            title={
              <>
                From a half-acre plot to{" "}
                <span className="text-brand-600">a full plantation.</span>
              </>
            }
            lead="Soil is soil, whatever grows in it. These are the crop families SCT's solutions are used across."
            className="max-w-2xl"
          />
          <CTAButton href="/applications" variant="secondary" className="shrink-0">
            All applications
          </CTAButton>
        </div>

        <ScrollReveal
          stagger={0.08}
          as="ul"
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3"
        >
          {applications.map((app) => (
            <RevealItem key={app.id} variants={fadeUp} as="li">
              <article className="group relative h-full overflow-hidden rounded-2xl bg-ink-900 shadow-soft transition-shadow duration-400 hover:shadow-lift">
                <div className="relative aspect-[4/5] sm:aspect-[4/4.4]">
                  <Image
                    src={app.image.src}
                    alt={app.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-[1100ms] [transition-timing-function:var(--ease-out-soft)] motion-safe:group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/35 to-ink-900/5"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    <Link href="/applications" className="after:absolute after:inset-0">
                      {app.title}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-[0.8rem] font-medium text-leaf-300">{app.examples}</p>
                  <p className="mt-3 max-h-24 text-[0.86rem] leading-relaxed text-white/75 transition-[max-height,opacity,margin] duration-500 [transition-timing-function:var(--ease-out-soft)] lg:mt-0 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:mt-3 lg:group-hover:max-h-32 lg:group-hover:opacity-100">
                    {app.body}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-[background-color,color,transform] duration-400 group-hover:bg-white group-hover:text-brand-700 motion-safe:group-hover:-translate-y-0.5"
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </article>
            </RevealItem>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
