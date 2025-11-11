import type {
  EMRIntegrationData,
  FAQData,
  FAQSectionData,
  FeatureData,
  FlexibilityData,
  FooterData,
  HeaderData,
  HeroSectionData,
  HomepageData,
  IntegrationData,
  IntegrationSectionData,
  LogoCloudData,
  ProcessSectionData,
  TestimonialsSectionData} from '@/types/cms'

import { getSimpleImage } from './media-utils'
import { client, previewClient } from './sanity'

// Base query class with common functionality
abstract class BaseQuery {
  protected client = client
  protected language: string = 'en'
  protected isPreview: boolean = false

  constructor(language: string = 'en', isPreview: boolean = false) {
    this.language = language
    this.isPreview = isPreview
    this.client = isPreview ? previewClient : client
  }

  // Helper method to get localized content
  protected async getLocalizedContent<T>(
    query: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    const localizedQuery = query.replace(
      /_type\s*==\s*["']([^"']+)["']/g,
      `_type == "$1" && __i18n_lang == "${this.language}"`
    )
    
    return this.client.fetch(localizedQuery, params)
  }

  // Helper method to get content with fallback
  protected async getContentWithFallback<T>(
    query: string,
    fallbackLanguage: string = 'en',
    params: Record<string, any> = {}
  ): Promise<T> {
    try {
      const content = await this.getLocalizedContent<T>(query, params)
      
      if (!content && this.language !== fallbackLanguage) {
        const originalLanguage = this.language
        this.language = fallbackLanguage
        const fallbackContent = await this.getLocalizedContent<T>(query, params)
        this.language = originalLanguage
        return fallbackContent
      }
      
      return content
    } catch (error) {
      console.error('Error fetching localized content:', error)
      const originalLanguage = this.language
      this.language = fallbackLanguage
      const fallbackContent = await this.getLocalizedContent<T>(query, params)
      this.language = originalLanguage
      return fallbackContent
    }
  }

  // Helper method to simplify media assets
  protected simplifyMediaAssets(data: any): any {
    if (!data) return data

    if (Array.isArray(data)) {
      return data.map(item => this.simplifyMediaAssets(item))
    }

    if (typeof data === 'object') {
      const simplified = { ...data }
      
      // Simplify image fields
      if (simplified.image && typeof simplified.image === 'object') {
        simplified.image = {
          ...simplified.image,
          order: simplified.image.order || 0,
        }
      }

      // Simplify backgroundImage fields
      if (simplified.backgroundImage && typeof simplified.backgroundImage === 'object') {
        simplified.backgroundImage = {
          ...simplified.backgroundImage,
          order: simplified.backgroundImage.order || 0,
        }
      }

      // Simplify logo fields
      if (simplified.logo && typeof simplified.logo === 'object') {
        simplified.logo = {
          ...simplified.logo,
          order: simplified.logo.order || 0,
        }
      }

      // Simplify avatar fields
      if (simplified.avatar && typeof simplified.avatar === 'object') {
        simplified.avatar = {
          ...simplified.avatar,
          order: simplified.avatar.order || 0,
        }
      }

      // Recursively simplify nested objects
      Object.keys(simplified).forEach(key => {
        if (typeof simplified[key] === 'object' && simplified[key] !== null) {
          simplified[key] = this.simplifyMediaAssets(simplified[key])
        }
      })

      return simplified
    }

    return data
  }
}

// Layout queries class
export class LayoutQueries extends BaseQuery {
  constructor(language: string = 'en', isPreview: boolean = false) {
    super(language, isPreview)
  }
  // Get header data with localized support
  async getHeader(language: string = 'en'): Promise<HeaderData | null> {
    const query = `
      *[_type == "header" && language == $language][0] {
        _id,
        title,
        logoImage {
          asset->{
            _id,
            _type,
            _ref,
            url,
            metadata
          },
          alt
        },
        logoText,
        navigation[]{
          label,
          url,
          isExternal,
          submenu[]{
            label,
            url,
            isExternal
          }
        },
        ctaButton{
          text,
          url,
          isExternal,
          style
        },
        isActive
      }
    `
    // Try to get localized content, fallback to 'en' if not found
    try {
      let result = await this.client.fetch(query, { language })
      if (!result) {
        result = await this.client.fetch(query, { language: 'en' })
      }
      return result
    } catch (error) {
      console.error('Error fetching header:', error)
      return null
    }
  }

  // Get footer data with localized support
  async getFooter(language: string = 'en'): Promise<FooterData | null> {
    const query = `
      *[_type == "footer" && language == $language][0] {
        _id,
        companyName,
        description,
        logo {
          asset->{
            _id,
            _type,
            url,
            metadata
          },
          alt
        },
        logoText,
        columns[]{
          title,
          links[]{
            text,
            url,
            isExternal
          }
        },
        socialLinks[]{
          platform,
          url,
          icon{
            asset->{
              _id,
              _type,
              url
            },
            alt
          }
        },
        contactInfo{
          address,
          phone,
          email
        },
        copyrightText,
        legalLinks[]{
          text,
          url,
          isExternal
        },
        newsletterSignup{
          enabled,
          title,
          description,
          placeholder,
          buttonText
        },
        isActive
      }
    `
    // Try to get localized content, fallback to 'en' if not found
    try {
      let result = await this.client.fetch(query, { language })
      if (!result) {
        result = await this.client.fetch(query, { language: 'en' })
      }
      return result
    } catch (error) {
      console.error('Error fetching footer:', error)
      return null
    }
  }
}

// Content queries class
export class ContentQueries extends BaseQuery {
  constructor(language: string = 'en', isPreview: boolean = false) {
    super(language, isPreview)
  }
  // Get all pages
  async getPages() {
    const query = `
      *[_type == "pageLayout"] {
        _id,
        heroSection,
        subheadings,
        subheadings2,
        heroImages[]{
          image{
            asset->{
              _id,
              _type,
              url,
              metadata
            }
          },
          order
        },
        globalContent,
        _createdAt,
        _updatedAt
      } | order(_createdAt desc)
    `
    return this.client.fetch(query)
  }

  // Get page by slug
  async getPageBySlug(slug: string) {
    const query = `
      *[_type == "pageLayout"][0] {
        _id,
        heroSection,
        subheadings,
        subheadings2,
        heroImages[]{
          image{
            asset->{
              _id,
              _type,
              url,
              metadata
            }
          },
          order
        },
        globalContent,
        _createdAt,
        _updatedAt
      }
    `
    return this.client.fetch(query, { slug })
  }

  // Get page content with all sections
  async getPageContent() {
    const query = `
      *[_type == "pageLayout"] {
        _id,
        heroSection,
        subheadings,
        subheadings2,
        heroImages[]{
          image{
            asset->{
              _id,
              _type,
              url,
              metadata
            }
          },
          order
        },
        globalContent,
        header->{
          _id,
          logo,
          title,
          navigation,
          ctaButton
        },
        footer->{
          _id,
          logo,
          title,
          description,
          columns,
          socialLinks,
          copyright,
          legalLinks
        },
        _createdAt,
        _updatedAt
      } | order(_createdAt desc)
    `
    return this.client.fetch(query)
  }
}

// Section queries class
export class SectionQueries extends BaseQuery {
  constructor(language: string = 'en', isPreview: boolean = false) {
    super(language, isPreview)
  }
  // Get hero section data
  async getHeroSection(): Promise<HeroSectionData | null> {
    const query = `
      *[_type == "pageLayout"][0] {
        _id,
        heroSection {
          heading,
          keyHeading,
          description
        },
        subheadings,
        subheadings2,
        heroImages[]{
          image{
            asset->{
              _id,
              _type,
              url,
              metadata
            }
          },
          order
        },
        _createdAt,
        _updatedAt
      }
    `
    return this.client.fetch(query)
  }

  // Get SEO settings data
  async getSEOSettings() {
    const query = `
      *[_type == "pageLayout"][0] {
        seoSettings {
          title,
          description,
          keywords,
          ogTitle,
          ogDescription,
          ogImage {
            asset->{
              _id,
              _type,
              url,
              metadata
            },
            alt
          },
          ogUrl,
          canonicalUrl
        }
      }
    `
    const result = await this.client.fetch(query)
    return result?.seoSettings || null
  }

  // Get CTA section data
  async getCTASection() {
    const query = `
      *[_type == "pageLayout"][0] {
        ctaSection {
          formId,
          scheduleLink
        }
      }
    `
    const result = await this.client.fetch(query)
    return result?.ctaSection || null
  }

  // Get features section data
  async getFeaturesSection(): Promise<FeatureData[]> {
    const query = `
      *[_type == "dynamicContent" && contentType == "feature-cards"] {
        _id,
        title,
        contentType,
        slug,
        headline,
        headlineRich[]{
          children[]{
            _type,
            text,
            marks
          },
          style,
          markDefs[]
        },
        description,
        subheading,
        featureCards[]{
          headline,
          headlineRich[]{
            children[]{
              _type,
              text,
              marks
            },
            style,
            markDefs[]
          },
          description,
          subheading,
          featureImage{
            asset->{
              _id,
              _type,
              url,
              metadata
            },
            alt
          },
          benefits[]
        },
        _createdAt,
        _updatedAt
      } | order(_createdAt desc)
    `
    return this.client.fetch(query)
  }

  // Get EMR integration section data
  async getEMRIntegrationSection(): Promise<EMRIntegrationData | null> {
    const query = `
      *[_type == "dynamicContent" && contentType == "emr-cards"][0] {
        _id,
        title,
        contentType,
        slug,
        headline,
        headlineRich[]{
          children[]{
            _type,
            text,
            marks
          },
          style,
          markDefs[]
        },
        description,
        subheading,
        emrCards[]{
          title,
          heading,
          headingRich,
          headline,
          description,
          logo{
            asset->{
              _id,
              _type,
              url,
              metadata
            }
          }
        },
        _createdAt,
        _updatedAt
      }
    `
    return this.client.fetch(query)
  }

  // Get flexibility section data
  async getFlexibilitySection(): Promise<FlexibilityData | null> {
    const query = `
      *[_type == "dynamicContent" && contentType == "flexibility-cards"][0] {
        headline,
        headlineRich,
        subheading,
        _id,
        title,
        contentType,
        description,
        features,
        benefits,
        flexibilityCards,
        _createdAt,
        _updatedAt
      }
    `
    return this.client.fetch(query)
  }

  // Get integrations section data
  async getIntegrationsSection(): Promise<IntegrationSectionData | null> {
    const query = `
      *[_type == "dynamicContent" && contentType == "integration-section"][0] {
        _id,
        title,
        contentType,
        slug,
        headline,
        headlineRich,
        description,
        subheading,
        "therapyEMRs": integrationSection.therapyEMRs[] {
          name,
          headline,
          "logo": logo.asset-> {
            _id,
            _type,
            url
          },
          url,
          color
        },
        "phoneCommunication": integrationSection.phoneCommunication[] {
          name,
          headline,
          "logo": logo.asset-> {
            _id,
            _type,
            url
          },
          url,
          color
        },
        _createdAt,
        _updatedAt
      }
    `
    return this.client.fetch(query)
  }

  // Get testimonials section data
  async getTestimonialsSection(): Promise<TestimonialsSectionData[]> {
    const query = `
      *[_type == "dynamicContent" && contentType == "testimonial-section"] {
        _id,
        contentType,
        headline,
        headlineRich[],
        description,
        subheading,
        "testimonials": testimonialSection.testimonials[] {
          authorName,
          authorBio,
          testimonialDescription,
          avatar{
            asset->{
              _id,
              _type,
              url
            }
          },
          rating,
          linkedinUrl,
          tags
        },
        _createdAt,
        _updatedAt
      } | order(_createdAt desc)
    `
    return this.client.fetch(query)
  }

  // Get logo cloud data
  async getLogoCloud(): Promise<LogoCloudData | null> {
    const query = `
      *[_type == "dynamicContent" && contentType == "logo-cloud-carousel"][0] {
        _id,
        contentType,
        "logos": logoCloudCarousel.logos[] {
          name,
          "logo": logo.asset-> {
            _id,
            _type,
            url
          },
          url
        },
        carouselSettings,
        _createdAt,
        _updatedAt
      }
    `
    const result = await this.client.fetch(query)
    return result
  }

  // Get FAQ section data
  async getFAQSection(): Promise<FAQSectionData | null> {
    const query = `
      *[_type == "faqSection"][0] {
        _id,
        heading,
        description,
        showCategoryName,
        faq,
        _createdAt,
        _updatedAt
      }
    `
    return this.client.fetch(query)
  }

  // Get FAQ data from faq schema
  async getFAQs(): Promise<FAQData[]> {
    const query = `
      *[_type == "faq"] {
        _id,
        heading,
        description,
        faqCategories[] {
          categoryName,
          questions[] {
            question,
            answer
          }
        },
        _createdAt,
        _updatedAt
      } | order(_createdAt desc)
    `
    return this.client.fetch(query)
  }

  // Get process section data
  async getProcessSection(): Promise<ProcessSectionData | null> {
    const query = `
      *[_type == "dynamicContent" && contentType == "process-section"][0] {
        _id,
        title,
        contentType,
        slug,
        headline,
        headlineRich[]{
          children[]{
            _type,
            text,
            marks
          },
          style,
          markDefs[]
        },
        description,
        subheading,
        steps[]{
          title,
          description,
          icon{
            asset->{
              _id,
              _type,
              url,
              metadata
            },
            alt
          },
          order
        } | order(order asc),
        _createdAt,
        _updatedAt
      }
    `
    return this.client.fetch(query)
  }
}

// Miscellaneous queries class
export class MiscellaneousQueries extends BaseQuery {
  constructor(language: string = 'en', isPreview: boolean = false) {
    super(language, isPreview)
  }
  // Get all FAQs
  async getFAQs() {
    const query = `
      *[_type == "faqSection"] {
        _id,
        heading,
        description,
        faq,
        _createdAt,
        _updatedAt
      } | order(_createdAt desc)
    `
    return this.client.fetch(query)
  }

  // Get all available languages
  async getLanguages() {
    const query = `
      *[_type == "language"] {
        _id,
        id,
        title,
        isDefault
      } | order(isDefault desc, title asc)
    `
    return this.client.fetch(query)
  }
}

// Main queries class that combines all query classes
export class Queries extends BaseQuery {
  public layout: LayoutQueries
  public content: ContentQueries
  public sections: SectionQueries
  public miscellaneous: MiscellaneousQueries

  constructor(language: string = 'en', isPreview: boolean = false) {
    super(language, isPreview)
    this.layout = new LayoutQueries(language, isPreview)
    this.content = new ContentQueries(language, isPreview)
    this.sections = new SectionQueries(language, isPreview)
    this.miscellaneous = new MiscellaneousQueries(language, isPreview)
  }

  // Method to get all homepage data at once
  async getHomepageData(): Promise<HomepageData> {
    try {
      const [
        heroSection,
        featuresSection,
        emrIntegrationSection,
        flexibilitySection,
        integrationsSection,
        testimonialsSection,
        logoCloud,
        faqSection,
        processSection,
        header,
        footer,
        seoSettings,
        ctaSection
      ] = await Promise.all([
        this.sections.getHeroSection(),
        this.sections.getFeaturesSection(),
        this.sections.getEMRIntegrationSection(),
        this.sections.getFlexibilitySection(),
        this.sections.getIntegrationsSection(),
        this.sections.getTestimonialsSection(),
        this.sections.getLogoCloud(),
        this.sections.getFAQSection(),
        this.sections.getProcessSection(),
        this.layout.getHeader(),
        this.layout.getFooter(),
        this.sections.getSEOSettings(),
        this.sections.getCTASection()
      ])

      const homepageData = {
        heroSection,
        featuresSection,
        emrIntegrationSection,
        flexibilitySection,
        integrationSection: integrationsSection,
        testimonialsSection,
        logoCloud,
        faqSection,
        processSection,
        header,
        footer,
        seoSettings,
        ctaSection
      }

      // Simplify all media assets
      return this.simplifyMediaAssets(homepageData)
    } catch (error) {
      console.error('Error fetching homepage data:', error)
      throw error
    }
  }

  // Method to get page data by slug
  async getPageData(slug: string) {
    try {
      const [page, header, footer] = await Promise.all([
        this.content.getPageBySlug(slug),
        this.layout.getHeader(),
        this.layout.getFooter()
      ])

      return {
        page,
        header,
        footer
      }
    } catch (error) {
      console.error('Error fetching page data:', error)
      throw error
    }
  }
}

// Export default instance
export const queries = new Queries()
