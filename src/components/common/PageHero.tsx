import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { ScrollReveal, RevealItem } from "./ScrollReveal";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Optional background photograph. Without one the hero stays on cream. */
  image?: { src: string; alt: string };
  children?: ReactNode;
};

/**
 * The opening band shared by every inner page, so /about and /products feel
 * like the same site rather than two different ones. Top padding clears the
 * fixed header at every breakpoint.
 */
export function PageHero({ eyebrow, title, lead, image, children }: PageHeroProps) {
  const hasImage = Boolean(image);

  return (
    <section
      /* Read by the `:has()` rule in globals.css that lifts the fixed header's
         links to cream while it is sitting over this hero. Set here rather than
         in the header because only the hero knows how dark it is. */
      data-hero={hasImage ? "dark" : "light"}
      className={cn(
        "relative overflow-hidden pb-14 pt-[7.5rem] sm:pb-16 lg:pb-20 lg:pt-[10rem]",
        hasImage ? "bg-brand-950 text-cream-100" : "bg-cream-100",
      )}
    >
      {hasImage && image ? (
        <div aria-hidden className="absolute inset-0">
          <Image src={image.src} alt="" fill sizes="100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-brand-950/78" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-brand-950/85" />
        </div>
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-24 size-[32rem] bloom bg-brand-200/45" />
          <div className="absolute -left-40 top-1/2 size-[26rem] bloom bg-saffron-200/45" />
        </div>
      )}

      <Container width="wide" className="relative">
        <ScrollReveal stagger={0.09} className="max-w-3xl">
          <RevealItem variants={fadeUp}>
            <span
              className={cn(
                "text-eyebrow inline-flex items-center gap-2",
                hasImage ? "text-leaf-400" : "text-brand-700",
              )}
            >
              <span aria-hidden className="size-1.5 rounded-full bg-current" />
              {eyebrow}
            </span>
          </RevealItem>

          <RevealItem variants={fadeUp}>
            <h1 className={cn("text-h1 mt-5", hasImage ? "text-white" : "text-ink-900")}>
              {title}
            </h1>
          </RevealItem>

          {lead ? (
            <RevealItem variants={fadeUp}>
              <p
                className={cn(
                  "text-lead mt-6",
                  hasImage ? "text-cream-200/75" : "text-ink-500",
                )}
              >
                {lead}
              </p>
            </RevealItem>
          ) : null}

          {children ? (
            <RevealItem variants={fadeUp}>
              <div className="mt-9">{children}</div>
            </RevealItem>
          ) : null}
        </ScrollReveal>
      </Container>
    </section>
  );
}
