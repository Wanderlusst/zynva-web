// CMS Data Types

// Simple image interface
export interface SimpleImageData {
  asset: {
    _ref: string
    _type: string
  }
  order: number
}

// Hero image interface
export interface HeroImageData {
  image: {
    asset: {
      _ref: string
      _type: string
    }
  }
  order: number
}

export interface HeroSectionData {
  _id: string
  title: string
  keyHeading?: string | null
  subtitle?: string
  description: string
  primaryButton?: {
    text: string
    url: string
  }
  secondaryButton?: {
    text: string
    url: string
  }
  backgroundImage?: SimpleImageData
  heroImages?: HeroImageData[]
  subheadings?: string[]
  subheadings2?: string[]
  features?: string[]
  isPublished: boolean
  _createdAt: string
  _updatedAt: string
}

export interface RichText {
  _type: string
  children: Array<{
    _type: string
    text: string
    marks?: string[]
  }>
  style?: string
  markDefs?: Array<{
    _type: string
    href?: string
  }>
}

export interface FeatureCard {
  headline: string
  headlineRich?: RichText[]
  description: string
  subheading?: string
  featureImage?: {
    asset: {
      _id: string
      _type: string
      url: string
    }
    alt?: string
  }
  benefits?: string[]
  cta?: {
    type: 'primary' | 'secondary'
    text: string
    onClick: () => void
  }
}

export interface FeatureData {
  _id: string
  title: string
  contentType: string
  slug?: {
    current: string
  }
  headline?: string
  headlineRich?: RichText[]
  description?: string
  subheading?: string
  featureCards?: FeatureCard[]
  _createdAt: string
  _updatedAt: string
}

export interface EMRCard {
  title: string
  heading?: string
  headingRich?: Array<{
    _type: string
    children: Array<{
      _type: string
      text: string
      marks?: string[]
    }>
    style?: string
  }>
  headline?: string
  description: string
  logo?: {
    asset: {
      _id: string
      _type: string
      url: string
    }
  }
}

export interface EMRIntegrationData {
  _id: string
  title: string
  contentType: string
  slug?: {
    current: string
  }
  headline?: string
  headlineRich?: RichText[]
  description?: string
  subheading?: string
  emrCards?: EMRCard[]
  _createdAt: string
  _updatedAt: string
}

export interface FlexibilityData {
  _id: string
  title: string
  description: string
  features?: string[]
  benefits?: string[]
  flexibilityCards?: Array<{ title: string; description: string }>
  isPublished: boolean
  _createdAt: string
  _updatedAt: string
}

export interface IntegrationItem {
  name: string
  headline?: string
  logo?: {
    _id: string
    _type: string
    url: string
  }
  url?: string
  color?: string
}

export interface IntegrationSectionData {
  _id: string
  title: string
  contentType: string
  slug?: {
    current: string
  }
  headline?: string
  headlineRich?: RichText[]
  description?: string
  subheading?: string
  therapyEMRs?: IntegrationItem[]
  phoneCommunication?: IntegrationItem[]
  _createdAt: string
  _updatedAt: string
  name?: string
}

export interface IntegrationData {
  _id: string
  name: string
  description: string
  logo?: SimpleImageData
  category?: string
  status: 'active' | 'inactive' | 'coming-soon'
  features?: string[]
  documentationUrl?: string
  _createdAt: string
  _updatedAt: string
}

export interface TestimonialItem {
  authorName: string
  authorBio?: string
  testimonialDescription: string
  avatar?: {
    asset: {
      _id: string
      _type: string
      url: string
    }
    alt?: string
  }
  rating?: number
  linkedinUrl?: string
  tags?: string[]
}

export interface TestimonialsSectionData {
  _id: string
  contentType: string
  headline?: string
  headlineRich?: RichText[]
  description?: string
  subheading?: string
  testimonials?: TestimonialItem[]
  _createdAt: string
  _updatedAt: string
}

export interface LogoCloudData {
  _id: string
  logos?: Array<{
    name: string
    logo?: {
      asset: {
        _id: string
        _type: string
        url: string
      }
    }
    url?: string
  }>
  carouselSettings?: {
    autoplay?: boolean
    speed?: number
    pauseOnHover?: boolean
  }
  _createdAt: string
  _updatedAt: string
}

export interface FAQData {
  _id: string
  question: string
  answer: string
  category?: string
  order: number
  isPublished: boolean
  _createdAt: string
  _updatedAt: string
}

export interface FAQSectionData {
  _id: string
  heading: string
  description?: string
  showCategoryName?: boolean
  faq?: FAQCategoryData[]
  _createdAt: string
  _updatedAt: string
}

export interface FAQCategoryData {
  categoryName: string
  questions: {
    question: string
    answer: string
  }[]
}

export interface FAQData {
  _id: string
  heading: string
  description?: string
  faqCategories: FAQCategoryData[]
  _createdAt: string
  _updatedAt: string
}

export interface HeaderData {
  _id: string
  title?: string
  logo?: {
    asset: {
      _id: string
      _type: string
      url: string
      metadata?: any
    }
    alt?: string
  }
  logoText?: string
  navigation?: Array<{
    label: string
    url: string
    isExternal?: boolean
    submenu?: Array<{
      label: string
      url: string
      isExternal?: boolean
    }>
  }>
  ctaButton?: {
    text: string
    url: string
    isExternal?: boolean
    style?: string
  }
  isActive?: boolean
}

export interface FooterData {
  _id: string
  companyName?: string
  description?: string
  logo?: {
    asset: {
      _id: string
      _type: string
      url: string
      metadata?: any
    }
    alt?: string
  }
  logoText?: string
  columns?: Array<{
    title: string
    links?: Array<{
      text: string
      url: string
      isExternal?: boolean
    }>
  }>
  socialLinks?: Array<{
    platform: string
    url: string
    icon?: {
      asset: {
        _id: string
        _type: string
        url: string
      }
      alt?: string
    }
  }>
  contactInfo?: {
    address?: string
    phone?: string
    email?: string
  }
  copyrightText?: string
  legalLinks?: Array<{
    text: string
    url: string
    isExternal?: boolean
  }>
  newsletterSignup?: {
    enabled?: boolean
    title?: string
    description?: string
    placeholder?: string
    buttonText?: string
  }
  isActive?: boolean
}

export interface SEOSettings {
  title?: string
  description?: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: {
    asset: {
      _id: string
      _type: string
      url: string
      metadata?: any
    }
    alt?: string
  }
  ogUrl?: string
  canonicalUrl?: string
}

export interface CTASectionData {
  formId?: string
  scheduleLink?: string
}

export interface HomepageData {
  heroSection: HeroSectionData | null
  featuresSection: FeatureData[]
  emrIntegrationSection: EMRIntegrationData | null
  flexibilitySection: FlexibilityData | null
  integrationSection: IntegrationSectionData | null
  testimonialsSection: TestimonialsSectionData[]
  logoCloud: LogoCloudData | null
  faqSection: FAQSectionData | null
  faqData: FAQData[]
  header: HeaderData | null
  footer: FooterData | null
  seoSettings?: SEOSettings | null
  ctaSection?: CTASectionData | null
}
