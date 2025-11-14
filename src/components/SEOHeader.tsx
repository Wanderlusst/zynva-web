import type { Metadata } from 'next'
import type { SEOSettings } from '@/types/cms'

interface SEOHeaderProps {
  seoSettings?: SEOSettings | null
  fallbackTitle?: string
  fallbackDescription?: string
}

/**
 * SEOHeader component - Generates metadata for the page based on SEO settings from CMS
 * This component is used to pass SEO data to Next.js generateMetadata function
 */
export function generateSEOMetadata(
  seoSettings?: SEOSettings | null,
  fallbackTitle: string = 'Zynva',
  fallbackDescription: string = 'Comprehensive healthcare solutions for modern practices'
): Metadata {
  // Hardcode title to Zynva
  const title = 'Zynva'
  const description = seoSettings?.description || fallbackDescription
  const keywords = seoSettings?.keywords || ['healthcare', 'EMR', 'integration', 'medical software']
  
  // Open Graph data - hardcode title to Zynva
  const ogTitle = 'Zynva'
  const ogDescription = seoSettings?.ogDescription || description
  const ogImage = seoSettings?.ogImage?.asset?.url
  const ogUrl = seoSettings?.ogUrl
  
  // Canonical URL
  const canonicalUrl = seoSettings?.canonicalUrl

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            alt: seoSettings?.ogImage?.alt || ogTitle,
          },
        ],
      }),
      ...(ogUrl && { url: ogUrl }),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      ...(ogImage && {
        images: [ogImage],
      }),
    },
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
  }

  return metadata
}

/**
 * SEOHeader component - This is a client component that can be used if needed
 * For server-side rendering, use generateSEOMetadata function instead
 */
export default function SEOHeader({ seoSettings, fallbackTitle, fallbackDescription }: SEOHeaderProps) {
  // This component is mainly for reference
  // The actual SEO metadata should be generated using generateSEOMetadata in generateMetadata function
  return null
}
