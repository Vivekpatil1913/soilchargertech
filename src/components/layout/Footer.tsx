import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, legalNav } from "@/data/navigation";
import { addressOneLine, contact, site } from "@/data/site";
import { images } from "@/data/images";
import { telHref } from "@/lib/utils";
import { Container } from "@/components/common/Container";
import { SocialLinks } from "@/components/common/SocialLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";


/**
 * Footer.
 *
 * The page body stays bright throughout; the footer is the one deep band, in
 * brand green rather than black, so the site closes on the brand's own colour
 * instead of a generic dark slab.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-cream-200">
      {/* Soft organic bloom, kept very low contrast so text stays legible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 size-[34rem] bloom bg-brand-700/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 right-0 size-[30rem] bloom bg-saffron-700/20"
      />

      <Container width="wide" className="relative">
        <div className="grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-16">
          {/* ---- Brand + contact ------------------------------------------ */}
          <div>
            {/* The client's logo, used exactly as supplied. */}
            <Link
              href="/"
              aria-label="Soil Charger Technology — go to homepage"
              className="relative block h-20 w-[5.25rem]"
            >
              <Image
                src="/logo/sct-logo.png"
                alt="Soil Charger Technology"
                fill
                sizes="84px"
                className="object-contain"
              />
            </Link>

            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-cream-200/75">
              Working on soil since {site.founded} — restoring organic carbon, strengthening
              fertility, and building agriculture that leaves the ground better than it found it.
            </p>

            <address className="mt-8 space-y-4 not-italic text-[0.9rem]">
              <div className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-leaf-400" />
                <span className="text-cream-200/75">{addressOneLine}</span>
              </div>
              <div className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-leaf-400" />
                <span className="flex flex-col gap-1">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={telHref(phone)}
                      className="inline-block py-1 text-cream-200/75 transition-colors hover:text-white"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </div>
              <div className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-leaf-400" />
                <a
                  href={`mailto:${contact.emails.general}`}
                  className="inline-block break-all py-1 text-cream-200/75 transition-colors hover:text-white"
                >
                  {contact.emails.general}
                </a>
              </div>
            </address>

            <div className="mt-8 flex items-center gap-4">
              <Image
                src={images.certification.iso.src}
                alt={images.certification.iso.alt}
                width={72}
                height={72}
                className="h-12 w-auto rounded-md bg-white/95 p-1.5"
              />
              <p className="text-xs leading-relaxed text-cream-200/55">
                ISO 9001:2008 certified
                <br />
                Nashik, Maharashtra, India
              </p>
            </div>
          </div>

          {/* ---- Link columns --------------------------------------------- */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerNav.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-eyebrow text-leaf-400">{column.heading}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="group inline-flex py-1.5 text-[0.9rem] text-cream-200/70 transition-colors hover:text-white"
                      >
                        <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-leaf-400/60">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ---- Bottom bar -------------------------------------------------- */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between">
          <SocialLinks tone="onDark" />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <LanguageSwitcher tone="onDark" />
            {legalNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-block py-1.5 text-[0.85rem] text-cream-200/65 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="border-t border-white/10 py-6 text-[0.8rem] text-cream-200/45">
          © {year} {site.legalName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
