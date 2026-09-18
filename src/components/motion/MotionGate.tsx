'use client'

import { createContext, useContext, useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

/** The server has no media queries; assume motion is allowed and correct on mount. */
const getServerSnapshot = () => false

const ReducedMotionContext = createContext(false)

/**
 * Reads `prefers-reduced-motion` ONCE at the root and shares it, so twenty
 * animated components do not each attach their own matchMedia listener.
 *
 * `useSyncExternalStore` is the correct primitive here — matchMedia is an
 * external store, and this avoids the cascading re-render that a
 * useState/useEffect pair causes on mount.
 *
 * The server snapshot is `false`, which is safe because no content is ever
 * animation-gated: every element renders at its resting, visible state and
 * animation only moves it. A reduced-motion user sees the finished layout
 * either way.
 */
export function MotionGate({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // NOTE: no LazyMotion provider here. Motion is not used in the layout shell —
  // it is reserved for route-level UI (modals, accordions, the technology
  // story), where it code-splits per route instead of loading on every page.
  return <ReducedMotionContext.Provider value={reduced}>{children}</ReducedMotionContext.Provider>
}

/** True when the visitor has asked the OS to reduce motion. */
export function usePrefersReducedMotion() {
  return useContext(ReducedMotionContext)
}
