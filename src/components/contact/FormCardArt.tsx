import { cn } from "@/lib/utils";

/**
 * FORM CARD ART
 * =============
 * The spot illustrations on the "other forms" cards on /contact, each sitting
 * on a soft disc that bleeds off the card's right edge.
 *
 * Export, distributor and careers are cut-outs that already carry their own
 * disc (public/images/contact). The product card instead stacks two real SCT
 * pouches on a drawn disc, because an illustrated bottle would be a product
 * that does not exist.
 *
 * All of it is decorative (`aria-hidden`); the card text carries the meaning.
 */

export type FormCardArtKind = "products" | "export" | "partnership" | "careers";

const CUTOUTS: Record<Exclude<FormCardArtKind, "products">, string> = {
  export: "/images/contact/export.webp",
  partnership: "/images/contact/distributor.webp",
  careers: "/images/contact/careers.webp",
};

const HOVER =
  "transition-transform duration-500 [transition-timing-function:var(--ease-expressive)] motion-safe:group-hover:scale-105";

/** A two-tone leaf, drawn pointing up from its base at (0, 0). */
function Leaf({
  x,
  y,
  rotate = 0,
  scale = 1,
}: {
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0C-13-10-15-30 0-46C15-30 13-10 0 0Z" fill="#2f9e57" />
      <path d="M0 0C9-12 10-30 0-46C15-30 13-10 0 0Z" fill="#1f7d42" />
      <path d="M0-2V-40" stroke="#bfe8cb" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

function ProductsArt({ tone }: { tone: "brand" | "saffron" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -right-6 top-12 -z-10 size-32 origin-right rounded-full",
        HOVER,
        tone === "saffron"
          ? "bg-radial from-saffron-100/90 to-saffron-50/40"
          : "bg-radial from-brand-100/90 to-brand-50/40",
      )}
    >
      <span className="absolute inset-3">
        <svg viewBox="0 0 120 120" className="absolute inset-0 size-full">
          <Leaf x={92} y={78} rotate={24} scale={0.9} />
          <Leaf x={22} y={96} rotate={-40} scale={0.7} />
        </svg>
        <img
          src="/images/products/root-charger-600.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute bottom-[6%] left-[8%] w-[52%] rotate-[-6deg] mix-blend-multiply"
        />
        <img
          src="/images/products/health-charger-600.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute bottom-[4%] left-[36%] w-[56%] rotate-[5deg] mix-blend-multiply"
        />
      </span>
    </span>
  );
}

export function FormCardArt({
  kind,
  tone = "brand",
}: {
  kind: FormCardArtKind;
  tone?: "brand" | "saffron";
}) {
  if (kind === "products") return <ProductsArt tone={tone} />;
  return (
    <img
      src={CUTOUTS[kind]}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className={cn(
        "pointer-events-none absolute right-0 top-12 -z-10 w-24 origin-right select-none",
        HOVER,
      )}
    />
  );
}
