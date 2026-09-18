import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, Download } from 'lucide-react'
import {
  Badge,
  Button,
  DataValue,
  Eyebrow,
  PlaceholderNotice,
  Section,
  SectionHeading,
} from '@/components/ui'

/**
 * Design system reference. Development and staging only — never indexed, and
 * 404s in production unless placeholder mode is explicitly on.
 */
export const metadata: Metadata = {
  title: 'Design System',
  robots: { index: false, follow: false },
}

/**
 * Written out in full rather than interpolated: Tailwind scans source text
 * statically, so `bg-charge-${step}` would emit no CSS at all.
 */
const CHARGE = [
  ['50', 'bg-charge-50'],
  ['100', 'bg-charge-100'],
  ['200', 'bg-charge-200'],
  ['300', 'bg-charge-300'],
  ['400', 'bg-charge-400'],
  ['500', 'bg-charge-500'],
  ['600', 'bg-charge-600'],
  ['700', 'bg-charge-700'],
  ['800', 'bg-charge-800'],
  ['900', 'bg-charge-900'],
  ['950', 'bg-charge-950'],
] as const

const SOIL = [
  ['50', 'bg-soil-50'],
  ['100', 'bg-soil-100'],
  ['200', 'bg-soil-200'],
  ['300', 'bg-soil-300'],
  ['400', 'bg-soil-400'],
  ['500', 'bg-soil-500'],
  ['600', 'bg-soil-600'],
  ['700', 'bg-soil-700'],
  ['800', 'bg-soil-800'],
  ['900', 'bg-soil-900'],
  ['950', 'bg-soil-950'],
] as const

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={`border-hairline h-16 rounded-sm border ${className}`} />
      <span className="text-caption text-ink-subtle font-mono">{name}</span>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-hairline flex flex-col gap-4 border-t py-8 lg:flex-row lg:gap-12">
      <p className="eyebrow lg:w-48 lg:shrink-0 lg:pt-1">{label}</p>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default function KitchenSinkPage() {
  const visible =
    process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ALLOW_PLACEHOLDERS === 'true'

  if (!visible) notFound()

  return (
    <>
      <Section rhythm="compact" grid>
        <Eyebrow index={0}>Design System</Eyebrow>
        <h1 className="text-display-lg mt-5">Charged Soil</h1>
        <p className="text-body-lg text-ink-muted mt-5 max-w-2xl">
          Warm carbon ground, hairline technical rules, generous whitespace, and one high-voltage
          green used as sparingly as an indicator lamp.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="compact">
        <SectionHeading index={1} eyebrow="Foundations" title="Colour" />

        <div className="mt-10 flex flex-col gap-8">
          <div>
            <p className="text-caption text-ink-muted mb-3">
              Charge — accent only. Never more than ~5% of a viewport.
            </p>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
              {CHARGE.map(([name, bg]) => (
                <Swatch key={name} name={name} className={bg} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-caption text-ink-muted mb-3">
              Soil — warm neutral carrying ~90% of the UI.
            </p>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
              {SOIL.map(([name, bg]) => (
                <Swatch key={name} name={name} className={bg} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-caption text-ink-muted mb-3">Carbon &amp; Mineral</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              <Swatch name="carbon" className="bg-carbon" />
              <Swatch name="carbon-raised" className="bg-carbon-raised" />
              <Swatch name="carbon-line" className="bg-carbon-line" />
              <Swatch name="mineral-400" className="bg-mineral-400" />
              <Swatch name="mineral-500" className="bg-mineral-500" />
              <Swatch name="mineral-600" className="bg-mineral-600" />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="compact" tone="sunken">
        <SectionHeading index={2} eyebrow="Foundations" title="Typography" />

        <div className="mt-10">
          <Row label="Display XL">
            <p className="text-display-xl">Soil is a system</p>
          </Row>
          <Row label="Display LG">
            <p className="text-display-lg">Organic carbon first</p>
          </Row>
          <Row label="Heading 2">
            <p className="text-h2">Work on nourishment, not on disease</p>
          </Row>
          <Row label="Heading 3">
            <p className="text-h3">Work on soil, not on climate</p>
          </Row>
          <Row label="Body LG">
            <p className="text-body-lg text-ink-muted max-w-2xl">
              Recognising this threat in 2015, SCT gave first priority to increasing soil fertility
              and organic carbon.
            </p>
          </Row>
          <Row label="Body">
            <p className="text-body text-ink-muted max-w-2xl">
              Sterile soil converts into fertile soil. There is an increase in the metabolism of
              micro-organisms in the soil.
            </p>
          </Row>
          <Row label="Mono / data">
            <div className="flex flex-wrap items-baseline gap-6">
              <DataValue value="3–5" unit="L/acre" size="lg" />
              <DataValue value="600" unit="g" size="lg" />
              <DataValue value="20" unit="L" size="lg" />
              <DataValue value="60" unit="days" size="lg" />
            </div>
          </Row>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="compact">
        <SectionHeading
          index={3}
          eyebrow="Components"
          title="Buttons"
          description="One primitive. Renders an anchor when href is present, a button otherwise — navigation is never faked with a click handler."
        />

        <div className="mt-10">
          <Row label="Variants">
            <div className="flex flex-wrap items-center gap-4">
              <Button>
                Talk to an agronomist <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button variant="secondary">
                <Download aria-hidden="true" className="size-4" /> Download brochure
              </Button>
              <Button variant="ghost">View all products</Button>
              <Button variant="link" href="/dev/kitchen-sink">
                Read the method
              </Button>
            </div>
          </Row>
          <Row label="Sizes">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </Row>
          <Row label="Disabled">
            <Button disabled>Submitting…</Button>
          </Row>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="compact" tone="sunken">
        <SectionHeading index={4} eyebrow="Components" title="Badges & provenance" />

        <div className="mt-10">
          <Row label="Badges">
            <div className="flex flex-wrap gap-3">
              <Badge>SCT Vedic</Badge>
              <Badge tone="accent">Soil</Badge>
              <Badge tone="mineral">Water</Badge>
              <Badge tone="warning">Unverified</Badge>
            </div>
          </Row>
          <Row label="Placeholder">
            <div className="flex max-w-2xl flex-col gap-4">
              <PlaceholderNotice
                label="Case study results"
                meta={{
                  provenance: 'placeholder',
                  note: 'No project or field data exists on the current website. Awaiting client data before this section renders.',
                }}
              />
              <PlaceholderNotice
                label="ISO certification"
                meta={{
                  provenance: 'needs-verification',
                  source: 'soilchargertechnology.com (footer)',
                  note: 'ISO 9001:2008 was withdrawn in 2018. Need the current certificate number and issuing body.',
                }}
              />
            </div>
          </Row>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="compact" tone="dark" grid>
        <SectionHeading
          index={5}
          eyebrow="Surfaces"
          title="Inverted surface"
          description="The identical components, with no class names changed. Only the semantic token layer flips."
        />

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button>
            Primary <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link" href="/dev/kitchen-sink">
            Link
          </Button>
          <Badge>SCT Vedic</Badge>
          <DataValue value="1,000,000" unit="farmers" size="lg" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="compact">
        <SectionHeading index={6} eyebrow="Foundations" title="Hairline grid & elevation" />

        <div className="border-hairline bg-hairline mt-10 grid gap-px border md:grid-cols-3">
          {[
            { k: 'Borders, not shadows', v: '1px hairline' },
            { k: 'Radius ceiling', v: '8px' },
            { k: 'Shadows in system', v: '2' },
          ].map((item) => (
            <div key={item.k} className="bg-surface p-8">
              <p className="eyebrow">{item.k}</p>
              <p className="text-h3 mt-3">{item.v}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
