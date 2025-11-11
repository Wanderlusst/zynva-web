import { client } from './sanity'

// Helper function to get localized content
export async function getLocalizedContent<T>(
  query: string,
  language: string = 'en',
  params: Record<string, any> = {}
): Promise<T> {
  const localizedQuery = query.replace(
    /_type\s*==\s*["']([^"']+)["']/g,
    `_type == "$1" && __i18n_lang == "${language}"`
  )
  
  return client.fetch(localizedQuery, params)
}

// Common queries for localized content
export const queries = {
  // Get all pages for a specific language
  getPages: (language: string = 'en') => `
    *[_type == "page" && __i18n_lang == "${language}"] {
      _id,
      title,
      slug,
      content,
      _createdAt,
      _updatedAt
    } | order(_createdAt desc)
  `,

  // Get page by slug for a specific language
  getPageBySlug: (slug: string, language: string = 'en') => `
    *[_type == "page" && slug.current == $slug && __i18n_lang == "${language}"][0] {
      _id,
      title,
      slug,
      content,
      _createdAt,
      _updatedAt
    }
  `,

  // Get all testimonials for a specific language
  getTestimonials: (language: string = 'en') => `
    *[_type == "testimonial" && __i18n_lang == "${language}"] {
      _id,
      name,
      role,
      company,
      content,
      avatar,
      rating,
      featured,
      _createdAt,
      _updatedAt
    } | order(featured desc, _createdAt desc)
  `,

  // Get all integrations for a specific language
  getIntegrations: (language: string = 'en') => `
    *[_type == "integration" && __i18n_lang == "${language}"] {
      _id,
      name,
      description,
      logo,
      category,
      status,
      features,
      documentationUrl,
      _createdAt,
      _updatedAt
    } | order(name asc)
  `,

  // Get all features for a specific language
  getFeatures: (language: string = 'en') => `
    *[_type == "feature" && __i18n_lang == "${language}"] {
      _id,
      title,
      description,
      category->{
        _id,
        name,
        description,
        icon,
        color
      },
      icon,
      benefits,
      isHighlighted,
      order,
      _createdAt,
      _updatedAt
    } | order(order asc, _createdAt desc)
  `,

  // Get all FAQs for a specific language
  getFAQs: (language: string = 'en') => `
    *[_type == "faq" && __i18n_lang == "${language}"] {
      _id,
      question,
      answer,
      category,
      order,
      isPublished,
      _createdAt,
      _updatedAt
    } | order(order asc, _createdAt desc)
  `,

  // Get page content for a specific language
  getPageContent: (language: string = 'en') => `
    *[_type == "pageContent" && __i18n_lang == "${language}"] {
      _id,
      title,
      slug,
      metaDescription,
      header->{
        _id,
        logoImage,  
        navigation,
        ctaButton
      },
      footer->{
        _id,
        logo,
        description,
        columns,
        socialLinks,
        copyright,
        legalLinks
      },
      heroSection,
      contentSections,
      isPublished,
      _createdAt,
      _updatedAt
    } | order(_createdAt desc)
  `,

  // Get header (global, not language-specific)
  getHeader: () => `
    *[_type == "header"][0] {
      _id,
      logo,
      logoText,
      navigation,
      ctaButton
    }
  `,

  // Get footer (global, not language-specific)
  getFooter: () => `
    *[_type == "footer"][0] {
      _id,
      logo,
      logoText,
      description,
      columns,
      socialLinks,
      copyright,
      legalLinks
    }
  `,

  // Get all available languages
  getLanguages: () => `
    *[_type == "language"] {
      _id,
      id,
      title,
      isDefault
    } | order(isDefault desc, title asc)
  `,
}

// Helper function to get content with fallback to default language
export async function getContentWithFallback<T>(
  query: string,
  language: string = 'en',
  fallbackLanguage: string = 'en',
  params: Record<string, any> = {}
): Promise<T> {
  try {
    // Try to get content in the requested language
    const content = await getLocalizedContent<T>(query, language, params)
    
    // If no content found and language is not the fallback, try fallback language
    if (!content && language !== fallbackLanguage) {
      return getLocalizedContent<T>(query, fallbackLanguage, params)
    }
    
    return content
  } catch (error) {
    console.error('Error fetching localized content:', error)
    // Fallback to default language
    return getLocalizedContent<T>(query, fallbackLanguage, params)
  }
}