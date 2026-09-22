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
        <Shell className="relative py-20 lg:py-28">
          <p className="text-eyebrow text-harvest-400">404</p>
          <h1 className="text-h1 mt-5 max-w-2xl text-white">
            This page seems to have been ploughed under.
          </h1>
          <p className="text-lead mt-6 max-w-xl text-white/60">
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
            <h2 className="text-eyebrow text-white/45">Or try one of these</h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-[0.9rem] font-medium text-white/75 backdrop-blur transition-colors hover:border-harvest-400/45 hover:text-white"
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
