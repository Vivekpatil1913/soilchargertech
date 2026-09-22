import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { Brand, NoTranslate, protectBrand } from "@/components/common/NoTranslate";
import { LogoMark } from "@/components/layout/Logo";
import { footerNav, legalNav } from "@/data/navigation";
import { addressOneLine, contact, site, socials } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * FOOTER
 * ======
 * Carries the destinations the six-item header deliberately dropped, so
 * nothing became unreachable when the navigation was cut back.
 *
 * Contact sits above the link columns rather than beneath them. For this
 * audience the phone number is the most-used thing in a footer, not the fine
 * print — a farmer scrolling to the bottom is usually looking for a way to
 * call, and should not have to pass four columns of links to find it.
 */

const SOCIAL_ICON = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  x: null,
} as const;

export function Footer() {
  return (
    <footer className="ground-forest-deep grain relative overflow-hidden">
      <span aria-hidden className="edge-harvest" />
      <span aria-hidden className="grain-layer" />

      <div className="shell relative pb-6 pt-12 lg:pt-14">
        {/* ---- Brand + contact ------------------------------------------ */}
        <div className="grid gap-9 border-b border-white/10 pb-9 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-12">
          <div>
            <div className="flex items-center gap-3.5">
              <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-white p-1.5">
                <LogoMark />
              </span>
              <div>
                <Brand
                  as="p"
                  className="font-display text-base font-bold leading-tight text-white"
                />
                <p className="mt-1 text-xs text-harvest-300">{site.tagline}</p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {protectBrand(site.description)}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((social) => {
                const Icon = SOCIAL_ICON[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-lg border border-white/12 bg-white/[0.05] text-white/60 transition-colors hover:border-harvest-400/40 hover:text-harvest-300"
                    >
                      {Icon ? (
                        <Icon aria-hidden className="size-4" />
                      ) : (
                        <NoTranslate aria-hidden className="text-sm font-bold">
                          X
                        </NoTranslate>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-meta text-harvest-400/80">Reach us</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telHref(phone)}
                    className="inline-flex items-center gap-2.5 tabular-nums text-white/65 transition-colors hover:text-white"
                  >
                    <Phone aria-hidden className="size-3.5 shrink-0 text-harvest-400" />
                    <NoTranslate>{phone}</NoTranslate>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappHref(contact.whatsapp, "Hello SCT, I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-white/65 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="size-3.5 shrink-0 text-harvest-400" />
                  Message on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.emails.general}`}
                  className="inline-flex items-center gap-2.5 break-all text-white/65 transition-colors hover:text-white"
                >
                  <Mail aria-hidden className="size-3.5 shrink-0 text-harvest-400" />
                  <NoTranslate>{contact.emails.general}</NoTranslate>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-meta text-harvest-400/80">Find us</h2>
            <p className="mt-4 flex gap-2.5 text-sm leading-relaxed text-white/65">
              <MapPin aria-hidden className="mt-0.5 size-3.5 shrink-0 text-harvest-400" />
              <NoTranslate>{addressOneLine}</NoTranslate>
            </p>
            <dl className="mt-5 space-y-2 text-xs text-white/45">
              <div className="flex gap-2">
                <dt className="shrink-0">Sales</dt>
                <dd>
                  <a
                    href={`mailto:${contact.emails.sales}`}
                    className="break-all transition-colors hover:text-white"
                  >
                    <NoTranslate>{contact.emails.sales}</NoTranslate>
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0">Careers</dt>
                <dd>
                  <a
                    href={`mailto:${contact.emails.careers}`}
                    className="break-all transition-colors hover:text-white"
                  >
                    <NoTranslate>{contact.emails.careers}</NoTranslate>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ---- Link columns --------------------------------------------- */}
        <nav aria-label="Footer" className="grid gap-8 pb-8 pt-9 sm:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="text-meta text-white/40">{group.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-harvest-300"
                    >
                      {link.proper ? <NoTranslate>{link.label}</NoTranslate> : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ---- Legal ----------------------------------------------------- */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <NoTranslate pad="after">
              © {new Date().getFullYear()} {site.name}.
            </NoTranslate>
            All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
