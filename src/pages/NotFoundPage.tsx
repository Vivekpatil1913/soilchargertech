import { Seo } from "@/components/common/Seo";
import { Button, Shell } from "@/components/ui";
import { mainNav } from "@/data/navigation";
import Link from "@/shims/Link";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you were looking for is not here."
        path="/404"
        noindex
      />

      <section className="ground-forest">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 fx-mesh" />
          <div className="absolute inset-0 fx-dots opacity-50" />
          <div className="bloom bloom-a absolute -left-40 -top-32 size-[32rem] bg-brand-500/25" />
          <div className="bloom bloom-b absolute -bottom-32 -right-28 size-[26rem] bg-saffron-500/15" />
        </div>

        <Shell className="relative pb-28 pt-36 sm:pt-44 lg:pb-32 lg:pt-52">
          <p className="text-eyebrow text-leaf-400">404</p>
          <h1 className="text-h1 mt-5 max-w-2xl text-white">
            This page seems to have been <span className="text-shine">ploughed under.</span>
          </h1>
          <p className="text-lead mt-6 max-w-xl text-sage-300/85">
            The page you were looking for is not here. It may have moved, or the link may be old.
            Everything else is still where it should be.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Back to the homepage
            </Button>
            <Button href="/products" variant="onDark" size="lg">
              See the products
            </Button>
          </div>

          <nav aria-label="Site sections" className="mt-12">
            <h2 className="text-eyebrow text-sage-400">Or try one of these</h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-[0.9rem] font-medium text-sage-200 backdrop-blur transition-colors hover:border-leaf-400/45 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Shell>
      </section>
    </>
  );
}
