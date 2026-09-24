import { MotionConfig } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { ScrollToTop } from "@/components/common/ScrollToTop";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { GoogleTranslateMount } from "@/components/layout/LanguageSwitcher";
import { Header } from "@/components/layout/Header";
import { mountAnalytics, trackOutboundClicks } from "@/lib/analytics";
import HomePage from "@/pages/HomePage";

/**
 * Home ships in the main bundle — it is what almost every visitor lands on.
 * Everything else is split, so a farmer on a slow connection downloads the
 * home page and nothing more until they navigate.
 */
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const CareersPage = lazy(() => import("@/pages/CareersPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const KnowledgeArticlePage = lazy(() => import("@/pages/KnowledgeArticlePage"));
const KnowledgePage = lazy(() => import("@/pages/KnowledgePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const TechnologyPage = lazy(() => import("@/pages/TechnologyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <span className="size-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
    </div>
  );
}

/**
 * `reducedMotion="user"` is load-bearing, not a nicety.
 *
 * globals.css has a three-level reduced-motion contract, but all three levels
 * are CSS: the global kill zeroes `animation-duration` and `transition-duration`,
 * and `motion-safe:` gates the hover lifts. None of that reaches framer-motion,
 * which animates by writing inline styles frame by frame — so every <Reveal>
 * on the site, the hero's masked line reveal and the modal's enter/exit were
 * still running at full amplitude for a visitor who had explicitly asked for
 * reduced motion. This is the level that covers them: framer-motion reads the
 * media query itself and holds animated properties at their target values.
 */
export default function App() {
  useEffect(() => {
    mountAnalytics();
    return trackOutboundClicks();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ScrollToTop />
      <GoogleTranslateMount />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:category" element={<CategoryPage />} />
            <Route path="/products/:category/:product" element={<ProductDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/knowledge/:slug" element={<KnowledgeArticlePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </MotionConfig>
  );
}
