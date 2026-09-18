import type { Product } from '@/types/product'
import { PlaceholderNotice } from '@/components/ui'

/**
 * Specification table.
 *
 * Only rows with a verified source are rendered. The rows a buyer would
 * normally expect — NPK, pH, EC, CFU count, composition, shelf life,
 * certification — do not exist anywhere on the legacy site for any of the 21
 * products, so they are listed as outstanding rather than filled with
 * plausible-looking numbers.
 */
const MISSING_SPECS = [
  'Composition / active ingredients',
  'NPK or nutrient analysis',
  'pH and EC of the concentrate',
  'Microbial count (CFU/ml), where applicable',
  'Shelf life and storage conditions',
  'Compatibility and tank-mix guidance',
  'Registration / licence number',
]

export function ProductSpecifications({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-8">
      {product.specifications.length > 0 && (
        <table className="w-full text-left">
          <caption className="sr-only">Published specifications for {product.name}</caption>
          <tbody className="border-hairline border-t">
            {product.specifications.map((spec) => (
              <tr key={spec.label} className="border-hairline border-b">
                <th scope="row" className="text-ink-muted w-2/5 py-4 pr-6 align-top font-normal">
                  {spec.label}
                </th>
                <td className="data-value text-ink py-4 align-top">
                  {spec.value}
                  {spec.unit && <span className="text-ink-subtle ml-1">{spec.unit}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <PlaceholderNotice
        label={`Technical specifications — ${product.name}`}
        meta={{
          provenance: 'placeholder',
          source: `soilchargertechnology.com/sub-product/${product.legacyId}`,
          note: `Not published for any of the 21 products: ${MISSING_SPECS.join('; ')}.`,
        }}
      />
    </div>
  )
}
