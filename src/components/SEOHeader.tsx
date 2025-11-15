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
  fallbackTitle: string = 'Zynva - All-in-One Business Management Software for Clinics',
  fallbackDescription: string = 'Manage patient visits, track revenue, monitor expenses, and control inventory all from one smart dashboard. Zynva is the complete business management solution for clinics and medical practices.'
): Metadata {
  // Helper function to filter out Opal Voice references
  const filterOpalVoice = (text: string | undefined): string | undefined => {
    if (!text) return undefined
    return text
      .replace(/Opal Voice/gi, 'Zynva')
      .replace(/opalvoice/gi, 'zynva')
      .replace(/opal voice/gi, 'Zynva')
  }

  // Hardcode title to Zynva
  const title = fallbackTitle
  // Filter out any Opal Voice references from description
  const rawDescription = seoSettings?.description || fallbackDescription
  const description = filterOpalVoice(rawDescription) || fallbackDescription
  
  // Use proper Zynva keywords
  const defaultKeywords = [
    'clinic management software',
    'patient management system',
    'medical practice software',
    'revenue tracking software',
    'expense management',
    'inventory management for clinics',
    'business insights dashboard',
    'staff management software',
    'billing software for clinics',
    'healthcare business software',
  ]
  const keywords = seoSettings?.keywords || defaultKeywords
  
  // Open Graph data - use Zynva title
  const ogTitle = fallbackTitle
  const rawOgDescription = seoSettings?.ogDescription || description
  const ogDescription = filterOpalVoice(rawOgDescription) || description
  const ogImage = seoSettings?.ogImage?.asset?.url
  // Filter out opalvoice.io URLs
  const ogUrl = seoSettings?.ogUrl?.replace(/opalvoice\.io/gi, 'zynva.com') || undefined
  
  // Canonical URL - filter out opalvoice.io
  const canonicalUrl = seoSettings?.canonicalUrl?.replace(/opalvoice\.io/gi, 'zynva.com') || undefined

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
