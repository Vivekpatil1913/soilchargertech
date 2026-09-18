import { ImageResponse } from 'next/og'
import { content } from '@/lib/content/repository'
import { site } from '@/config/site'

export const alt = 'Product'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  const products = await content.getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

/**
 * Per-product Open Graph card.
 *
 * Shows the product name, its range, and the published application rate —
 * the dosage line is the most useful thing the company publishes, so it is
 * also the most useful thing to put on a shared link.
 *
 * Note: no description is rendered. Product copy can be withheld for containing
 * an unverified claim (see the content generator), and an OG card is exactly
 * the kind of surface where such a claim would get screenshotted and spread.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await content.getProduct(slug)

  const name = product?.name ?? site.name
  const range = product?.line === 'vedic' ? 'SCT Vedic range' : 'Super range'
  const rate = product?.ratio

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
          style={{ color: '#b49f83', fontSize: 22, letterSpacing: 4, textTransform: 'uppercase' }}
        >
          {range}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ color: '#faf8f5', fontSize: 68, lineHeight: 1.05, letterSpacing: -2 }}>
          {name}
        </div>
        {rate && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ color: '#7b664d', fontSize: 20, letterSpacing: 3 }}>APPLICATION RATE</div>
            <div style={{ color: '#6dd53c', fontSize: 30 }}>{rate.slice(0, 90)}</div>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #242820',
          paddingTop: 32,
          color: '#d0c0a9',
          fontSize: 24,
        }}
      >
        <div>{site.name}</div>
        <div style={{ color: '#7b664d' }}>soilchargertechnology.com</div>
      </div>
    </div>,
    size
  )
}
