import { ImageResponse } from 'next/og'
import { site } from '@/config/site'

export const alt = `${site.name} — soil science for regenerative agriculture`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Default Open Graph card.
 *
 * Generated rather than shipped as a static asset because there is no usable
 * brand imagery: every image on the legacy site returns 404. This renders the
 * design system's own language — carbon ground, hairline rule, one charge
 * accent — so shared links look deliberate rather than blank.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0c0e0b',
        padding: 80,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 10, height: 10, background: '#6dd53c' }} />
        <div
          style={{
            color: '#b49f83',
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          {/* Satori requires an explicit display on any element with more than
              one child node, so interpolations are joined into one string. */}
          {`Since ${site.foundedYear} · ${site.address.city}`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ color: '#faf8f5', fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
          Work on the soil,
        </div>
        <div style={{ color: '#6dd53c', fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
          not on the symptoms.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #242820',
          paddingTop: 32,
          color: '#d0c0a9',
          fontSize: 26,
        }}
      >
        <div>{site.name}</div>
        <div style={{ color: '#7b664d' }}>soilchargertechnology.com</div>
      </div>
    </div>,
    size
  )
}
