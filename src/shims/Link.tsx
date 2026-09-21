import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * NEXT/LINK → REACT ROUTER SHIM
 * =============================
 * Same `href` prop the components already pass. Internal paths go through React
 * Router so navigation stays client-side; anything external, a `mailto:`, a
 * `tel:`, a `https://wa.me/` or an in-page `#hash` falls back to a real anchor,
 * because Router would otherwise try to resolve it as a route and 404.
 */

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

/** True for anything React Router should not own. */
function isExternal(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("//") ||
    href.startsWith("#")
  );
}

export default function Link({
  href,
  children,
  prefetch: _prefetch,
  scroll: _scroll,
  replace,
  ...rest
}: LinkProps) {
  if (isExternal(href)) {
    const opensNewTab = href.startsWith("http") || href.startsWith("//");
    return (
      <a
        href={href}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href} replace={replace} {...rest}>
      {children}
    </RouterLink>
  );
}
