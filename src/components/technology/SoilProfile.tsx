/**
 * Soil profile cross-section.
 *
 * Inline SVG rather than an image, for three reasons: the legacy media library
 * is entirely 404 so there is no photograph to use; vector stays crisp at any
 * viewport; and in Milestone 9 GSAP scrubs these layers directly — the root
 * network draws on, the humus band thickens — which is only possible with
 * addressable DOM nodes.
 *
 * Purely illustrative. Every factual claim lives in the adjacent text, and the
 * graphic is `aria-hidden` so screen readers get the prose, not a decoration.
 */
export function SoilProfile({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sp-humus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-charge-500)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-charge-500)" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="sp-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-soil-500)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--color-soil-700)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Horizon bands */}
      <g data-layer="horizons">
        <rect x="0" y="96" width="400" height="104" fill="url(#sp-humus)" />
        <rect x="0" y="200" width="400" height="120" fill="url(#sp-deep)" />
        <rect x="0" y="320" width="400" height="160" fill="url(#sp-deep)" opacity="0.5" />

        <g stroke="currentColor" strokeWidth="1" opacity="0.18">
          <line x1="0" y1="96" x2="400" y2="96" />
          <line x1="0" y1="200" x2="400" y2="200" />
          <line x1="0" y1="320" x2="400" y2="320" />
        </g>
      </g>

      {/* Surface line — the ground */}
      <line
        x1="0"
        y1="96"
        x2="400"
        y2="96"
        stroke="var(--color-charge-500)"
        strokeWidth="1.5"
        opacity="0.55"
      />

      {/* Shoot above ground */}
      <g
        data-layer="shoot"
        stroke="var(--color-charge-400)"
        strokeWidth="1.75"
        strokeLinecap="round"
      >
        <path d="M200 96 V34" />
        <path d="M200 62 C 176 54, 164 40, 162 24" />
        <path d="M200 74 C 224 66, 236 52, 238 36" />
      </g>

      {/* Root network — the thing the technology actually works on */}
      <g
        data-layer="roots"
        stroke="var(--color-charge-500)"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M200 96 V300" />
        <path d="M200 140 C 168 158, 146 178, 132 210" />
        <path d="M200 140 C 232 158, 254 178, 268 210" />
        <path d="M200 196 C 176 216, 162 240, 156 272" />
        <path d="M200 196 C 224 216, 238 240, 244 272" />
        <path d="M200 250 C 186 272, 180 296, 180 322" />
        <path d="M200 250 C 214 272, 220 296, 220 322" />
      </g>

      {/* Fine white-root tips — "increasing the number of white roots" */}
      <g data-layer="root-tips" stroke="var(--color-charge-300)" strokeWidth="0.85" opacity="0.7">
        <path d="M132 210 l-16 14M132 210 l-6 20M268 210 l16 14M268 210 l6 20" />
        <path d="M156 272 l-13 16M156 272 l-2 20M244 272 l13 16M244 272 l2 20" />
        <path d="M180 322 l-10 18M220 322 l10 18M200 300 l0 22" />
      </g>

      {/* Microbial activity in the humus band */}
      <g data-layer="microbes" fill="var(--color-charge-400)" opacity="0.5">
        {[
          [64, 128],
          [104, 158],
          [148, 132],
          [258, 150],
          [304, 126],
          [340, 164],
          [86, 182],
          [316, 186],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" />
        ))}
      </g>

      {/* Depth ticks — the engineering-drawing motif */}
      <g
        data-layer="ticks"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        fontFamily="var(--font-mono)"
      >
        <line x1="16" y1="96" x2="28" y2="96" />
        <line x1="16" y1="200" x2="28" y2="200" />
        <line x1="16" y1="320" x2="28" y2="320" />
      </g>
    </svg>
  )
}
