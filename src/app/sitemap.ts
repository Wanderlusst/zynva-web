import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opalvoice.io'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ]
}

