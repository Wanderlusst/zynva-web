import { Metadata } from 'next'

import EMRIntegrationSection from '@/components/EMRIntegrationSection';
import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturesSection';
import FlexibilitySection from '@/components/FlexibilitySection';
import HeroSection from '@/components/HeroSection';
import IntegrationsSection from '@/components/IntegrationsSection';
import LogoCloud from '@/components/LogoCloud';
import AppDownloadSection from '@/components/AppDownloadSection';
import CTASection from '@/components/CTASection';
import PricingSection from '@/components/PricingSection';
import ProcessSection from '@/components/ProcessSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { generateSEOMetadata } from '@/components/SEOHeader';
import { Queries } from '@/lib/queries'
import type { HomepageData, IntegrationSectionData } from '@/types/cms'

export async function generateMetadata(): Promise<Metadata> {
  const queries = new Queries('en')
  
  try {
    const homepageData = await queries.getHomepageData()
    const heroHeading = (homepageData.heroSection as any)?.heroSection?.heading || (homepageData.heroSection as any)?.heading || 'Zynva'
    const heroDescription = (homepageData.heroSection as any)?.heroSection?.description || homepageData.heroSection?.description || 'Comprehensive healthcare solutions for modern practices'
    const fallbackTitle = heroHeading
    const fallbackDescription = heroDescription
    
    return generateSEOMetadata(
      homepageData.seoSettings,
      fallbackTitle,
      fallbackDescription
    )
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Zynva',
      description: 'Comprehensive healthcare solutions for modern practices',
    }
  }
}

export async function generateStaticParams() {
  return []
}

async function getHomepageData(): Promise<HomepageData> {
  const queries = new Queries('en')
  
  try {
    const data = await queries.getHomepageData()
    // Fetch FAQ data separately
    const faqData = await queries.sections.getFAQs()
    return {
      ...data,
      faqData
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
      // Return empty data structure as fallback
    return {
      heroSection: null,
      featuresSection: [],
      emrIntegrationSection: null,
      flexibilitySection: null,
      integrationSection: null,
      testimonialsSection: [],
      logoCloud: null,
      faqSection: null,
      faqData: [],
      processSection: null,
      header: null,
      footer: null,
      seoSettings: null,
      ctaSection: null
    }
  }
}

export default async function Home() {
  const data = await getHomepageData()

  return (
    <>
      <HeroSection heroSectionData={data.heroSection as any} />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      {data.logoCloud && data.logoCloud.logos && data.logoCloud.logos.length > 0 && <LogoCloud logoCloudData={data.logoCloud} />}
      { <FAQSection faqSectionData={data.faqSection} faqData={data.faqData} />}
      
    </>
  )
}
