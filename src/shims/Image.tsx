import type { CSSProperties, ImgHTMLAttributes } from "react";

import { imageManifest } from "@/data/image-manifest";

/**
 * NEXT/IMAGE → PLAIN <img> SHIM
 * =============================
 * The site moved from Next.js to Vite. Rather than rewrite the JSX in twenty
 * components, this accepts the same props `next/image` did and renders a plain
 * `<img>`.
 *
 * What carries over:
 *   · `fill`     — absolutely fills the nearest positioned ancestor, same as Next.
 *   · `priority` — maps to eager loading + high fetch priority.
 *   · `sizes`    — passed straight through, and now actually load-bearing.
 *   · `srcSet`   — generated, see below.
 *
 * RESPONSIVE SOURCES
 * ------------------
 * Next generated these at request time and there is no server here any more,
 * so for a while they simply were not generated at all: `public/images` held
 * 26 MB of full-resolution JPEG and PNG, and the seventeen `sizes` props being
 * passed in were inert, because `sizes` does nothing without a `srcSet` to
 * choose from.
 *
 * scripts/optimise-images.mjs now emits WebP derivatives beside every source
 * and records them in src/data/image-manifest.ts. This looks a `src` up there
 * and builds the `srcSet` itself, so no call site had to change — and, more
 * usefully, an image added later gets responsive sources the moment someone
 * runs `npm run images`, rather than only if they remember to hand-write a
 * srcSet the way the product cards had to.
 *
 * An explicit `srcSet` prop always wins; the product pack shots pass their own.
 */

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  /** Fill the nearest positioned ancestor instead of using width/height. */
  fill?: boolean;
  /** Above-the-fold image: load eagerly and hint high priority. */
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  unoptimized?: boolean;
  loading?: "eager" | "lazy";
};

const FILL_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

/**
 * Builds `srcSet` and a best-effort `src` from the generated derivatives.
 *
 * `src` points at the 1200px WebP rather than the original: a browser that
 * ignores `srcSet` still gets a compressed file instead of a 2 MB JPEG, and
 * nothing then requests the originals at all — which is what lets the build
 * leave them out entirely.
 */
function responsive(src: string): { src: string; srcSet?: string } {
  const variants = imageManifest[src];
  if (!variants) return { src };

  const srcSet = variants.widths.map((w) => `${variants.base}-${w}.webp ${w}w`).join(", ");
  const fallbackWidth =
    variants.widths.find((w) => w >= 1200) ?? variants.widths[variants.widths.length - 1];

  return { src: `${variants.base}-${fallbackWidth}.webp`, srcSet };
}

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  sizes,
  srcSet,
  style,
  className,
  loading,
  // Swallowed: these were build-time hints to the Next image pipeline and have
  // no meaning for a plain <img>. Destructured so they never reach the DOM and
  // trigger an unknown-attribute warning.
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  ...rest
}: NextImageProps) {
  /* A caller-supplied srcSet is authoritative — the product pack shots pass
     their own 600/1200 pair, which is not in the manifest. */
  const resolved = srcSet ? { src, srcSet } : responsive(src);

  return (
    <img
      src={resolved.src}
      srcSet={resolved.srcSet}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      className={className}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      style={fill ? { ...FILL_STYLE, ...style } : style}
      {...rest}
    />
  );
}
