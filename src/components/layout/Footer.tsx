import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { LogoMark } from "@/components/layout/Logo";
import { footerNav, legalNav } from "@/data/navigation";
import { addressOneLine, contact, site, socials } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/utils";
import Link from "@/shims/Link";

/**
 * FOOTER
 * ======
 * Carries the destinations the five-item header deliberately dropped, so
 * nothing became unreachable when the navigation was cut back.
 *
 * Phone numbers, WhatsApp and the address sit above the link columns rather
 * than beneath them. For this audience the contact block is the most-used part
 * of a footer, not the fine print.
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
    <footer className="ground-forest text-sage-300">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 fx-mesh opacity-70" />
        <div className="bloom bloom-a absolute -left-32 -top-24 size-[28rem] bg-brand-500/20" />
      </div>

      <div className="shell-wide relative pb-5 pt-12 lg:pb-6 lg:pt-14">
        {/* ---- Brand + contact ------------------------------------------ */}
        <div className="grid gap-8 border-b border-white/10 pb-9 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid size-[4.5rem] place-items-center rounded-2xl bg-white p-2">
                <LogoMark />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold leading-tight text-white">
                  {site.name}
                </p>
                <p className="mt-0.5 text-[0.84rem] text-sage-400">{site.tagline}</p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-sage-300/80">
              {site.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {socials.map((social) => {
                const Icon = SOCIAL_ICON[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-sage-200 transition-colors hover:border-leaf-400/50 hover:text-white"
                    >
                      {Icon ? (
                        <Icon aria-hidden className="size-4" />
                      ) : (
                        <span aria-hidden className="text-[0.9rem] font-bold">
                          X
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-eyebrow text-leaf-400">Reach us</h2>
            <ul className="mt-5 space-y-4 text-[0.92rem]">
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telHref(phone)}
                    className="inline-flex items-center gap-3 text-sage-200 transition-colors hover:text-white"
                  >
                    <Phone aria-hidden className="size-4 shrink-0 text-leaf-400" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappHref(contact.whatsapp, "Hello SCT, I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sage-200 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="size-4 shrink-0 text-leaf-400" />
                  Message on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.emails.general}`}
                  className="inline-flex items-center gap-3 break-all text-sage-200 transition-colors hover:text-white"
                >
                  <Mail aria-hidden className="size-4 shrink-0 text-leaf-400" />
                  {contact.emails.general}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-eyebrow text-leaf-400">Find us</h2>
            <p className="mt-5 flex gap-3 text-[0.92rem] leading-relaxed text-sage-300/85">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-leaf-400" />
              <span>{addressOneLine}</span>
            </p>
            <p className="mt-5 text-[0.84rem] text-sage-400">
              Sales:{" "}
              <a
                href={`mailto:${contact.emails.sales}`}
                className="break-all transition-colors hover:text-white"
              >
                {contact.emails.sales}
              </a>
              <br />
              Careers:{" "}
              <a
                href={`mailto:${contact.emails.careers}`}
                className="break-all transition-colors hover:text-white"
              >
                {contact.emails.careers}
              </a>
            </p>
          </div>
        </div>

        {/* ---- Link columns --------------------------------------------- */}
        <nav aria-label="Footer" className="grid gap-8 pb-7 pt-9 sm:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="text-eyebrow text-sage-400">{group.heading}</h2>
              <ul className="mt-5 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.9rem] text-sage-300/85 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ---- Legal ----------------------------------------------------- */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-5 text-[0.84rem] text-sage-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
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
