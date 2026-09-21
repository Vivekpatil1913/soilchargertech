import type { CSSProperties, ImgHTMLAttributes } from "react";

/**
 * NEXT/IMAGE → PLAIN <img> SHIM
 * =============================
 * The site moved from Next.js to Vite. Rather than rewrite the JSX in twenty
 * components, this accepts the same props `next/image` did and renders a plain
 * `<img>`.
 *
 * What carries over:
 *   · `fill`     — absolutely fills the nearest positioned ancestor, same as Next.
 *   · `priority`— maps to eager loading + high fetch priority.
 *   · `sizes`    — passed straight through; still meaningful with `srcSet`.
 *
 * What does NOT carry over: automatic AVIF/WebP conversion and responsive
 * `srcSet` generation. Next did that at request time and there is no server
 * here any more. Source images in /public must therefore be pre-sized and
 * pre-compressed — see docs/README.md.
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

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  sizes,
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
  return (
    <img
      src={src}
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
