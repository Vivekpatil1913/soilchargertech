import Link from "next/link";
import { Container } from "@/components/common/Container";
import { CTAButton } from "@/components/common/CTAButton";
import { mainNav } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-cream-100 pb-24 pt-[9rem] lg:pt-[12rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-24 size-[32rem] bloom bg-brand-200/45" />
        <div className="absolute -left-40 bottom-0 size-[26rem] bloom bg-saffron-200/45" />
      </div>

      <Container width="default" className="relative">
        <p className="text-eyebrow text-brand-700">404</p>
        <h1 className="text-h1 mt-5 max-w-2xl text-ink-900">
          This page seems to have been{" "}
          <span className="text-brand-600">ploughed under.</span>
        </h1>
        <p className="text-lead mt-6 max-w-xl text-ink-500">
          The page you were looking for is not here. It may have moved, or the link may be old.
          Everything else is still where it should be.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/" size="lg">
            Back to the homepage
          </CTAButton>
          <CTAButton href="/contact" variant="secondary" size="lg">
            Talk to an expert
          </CTAButton>
        </div>

        <nav aria-label="Site sections" className="mt-14">
          <h2 className="text-eyebrow text-ink-400">Or try one of these</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-full border border-hairline bg-white px-4 py-2.5 text-[0.88rem] font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
