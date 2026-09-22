import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { ScrollToTop } from "@/components/common/ScrollToTop";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { GoogleTranslateMount } from "@/components/layout/LanguageSwitcher";
import { Header } from "@/components/layout/Header";
import HomePage from "@/pages/HomePage";

/**
 * Home ships in the main bundle — it is what almost every visitor lands on.
 * Everything else is split, so a farmer on a slow connection downloads the
 * home page and nothing more until they navigate.
 */
const AboutPage = lazy(() => import("@/pages/AboutPage"));
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
      <span className="size-9 animate-spin rounded-full border-2 border-ink-200 border-t-forest-600" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <GoogleTranslateMount />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-forest-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="pt-[4.5rem] lg:pt-[7.75rem]">
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
