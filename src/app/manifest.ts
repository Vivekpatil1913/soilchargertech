import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description:
      'Soil-first agricultural inputs built around organic carbon, humus and root development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f5',
    theme_color: '#0c0e0b',
    lang: 'en-IN',
  }
}
