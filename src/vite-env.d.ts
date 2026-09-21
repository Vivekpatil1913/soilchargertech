/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Overrides the canonical/JSON-LD origin. Useful on staging. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
