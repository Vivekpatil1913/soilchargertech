import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { images } from "@/data/images";
import { contact } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/utils";
import { Container } from "@/components/common/Container";
import { CTAButton } from "@/components/common/CTAButton";
import { ScrollReveal, RevealItem } from "@/components/common/ScrollReveal";
import { fadeUp } from "@/lib/animations";

/**
 * FINAL CALL TO ACTION
 * ====================
 * Four audiences, one door. A farmer, an agronomist, a dealer and an
 * organisation all arrive with different questions, so rather than a single
 * generic form, the section puts the direct routes — phone, WhatsApp, email —
 * in front of them alongside the contact page.
 *
 * Phone and WhatsApp come first on purpose: for most of SCT's audience that is
 * the fastest and most familiar way to reach a company.
 */

const ROUTES = [
  {
    icon: Phone,
    label: "Call the team",
    value: contact.phones[0],
    href: telHref(contact.phones[0]),
    external: false,
  },
  {
    icon: MessageCircle,
    label: "Message on WhatsApp",
    value: contact.whatsapp,
    href: whatsappHref(contact.whatsapp, "Hello SCT, I would like to know more about your solutions."),
    external: true,
  },
  {
    icon: Mail,
    label: "Email us",
    value: contact.emails.general,
    href: `mailto:${contact.emails.general}`,
    external: false,
  },
];

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="section-y bg-cream-50">
      <Container width="wide">
        {/* text-cream-100 so anything inside inherits a light colour by
            default — a link added here later cannot accidentally land on the
            dark panel still carrying the page's near-black body colour. */}
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-900 text-cream-100">
          {/* Field photograph, held well back behind the copy */}
          <div aria-hidden className="absolute inset-0">
            <Image
              src={images.hero.landscape.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900/95 to-brand-800/90" />
            <div className="absolute -right-24 -top-24 size-[26rem] bloom bg-leaf-500/20" />
            <div className="absolute inset-0 grain-layer opacity-[0.3]" />
          </div>

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:p-16">
            <ScrollReveal stagger={0.1}>
              <RevealItem variants={fadeUp}>
                <span className="text-eyebrow text-leaf-400">Let&apos;s begin</span>
              </RevealItem>

              <RevealItem variants={fadeUp}>
                <h2 id="cta-heading" className="text-h1 mt-5 text-white">
                  Let&apos;s build a healthier future for{" "}
                  <span className="text-leaf-400">Indian agriculture.</span>
                </h2>
              </RevealItem>

              <RevealItem variants={fadeUp}>
                <p className="text-lead mt-6 max-w-xl text-cream-200/75">
                  Whether you farm, advise farmers, distribute inputs or run an agricultural
                  organisation — talk to SCT about what is happening in your soil, and what can be
                  done about it.
                </p>
              </RevealItem>

              <RevealItem variants={fadeUp}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <CTAButton href="/contact" variant="inverse" size="lg">
                    Talk to SCT
                  </CTAButton>
                  <CTAButton href="/products" variant="onDark" size="lg">
                    Explore products
                  </CTAButton>
                </div>
              </RevealItem>

              <RevealItem variants={fadeUp}>
                <p className="mt-8 flex items-start gap-2.5 text-[0.85rem] text-cream-200/60">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-leaf-400" />
                  {contact.address.line2}, {contact.address.line3}, {contact.address.city} –{" "}
                  {contact.address.pincode}
                </p>
              </RevealItem>
            </ScrollReveal>

            {/* ---- Direct routes ---------------------------------------------- */}
            <ScrollReveal stagger={0.09} as="ul" className="space-y-3">
              {ROUTES.map((route) => (
                <RevealItem key={route.label} variants={fadeUp} as="li">
                  <a
                    href={route.href}
                    {...(route.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur transition-[background-color,border-color,transform] duration-400 [transition-timing-function:var(--ease-out-soft)] hover:border-white/35 hover:bg-white/15 motion-safe:hover:translate-x-1 sm:p-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-leaf-400/15 text-leaf-400">
                      <route.icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.78rem] font-semibold uppercase tracking-wider text-cream-200/55">
                        {route.label}
                      </span>
                      <span className="mt-0.5 block truncate font-display text-[0.98rem] font-bold text-white">
                        {route.value}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-cream-200/40 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
