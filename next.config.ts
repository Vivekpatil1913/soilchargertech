import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Lets a build write somewhere other than .next — useful for verifying a
     production build while a dev server is running against the default
     directory, and for parallel CI builds. Unset in normal use. */
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
  },
  poweredByHeader: false,
};

export default nextConfig;
