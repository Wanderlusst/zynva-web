import { Metadata } from 'next'

import HeroSection from '@/components/HeroSection';
import CTASection from '@/components/CTASection';
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
    const heroDescription = (homepageData.heroSection as any)?.heroSection?.description || homepageData.heroSection?.description || 'Manage patient visits, track revenue, monitor expenses, and control inventory all from one smart dashboard. Zynva is the complete business management solution for clinics and medical practices.'
    const fallbackDescription = heroDescription
    
    return generateSEOMetadata(
      homepageData.seoSettings,
      'Zynva - All-in-One Business Management Software for Clinics',
      fallbackDescription
    )
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Zynva - All-in-One Business Management Software for Clinics',
      description: 'Manage patient visits, track revenue, monitor expenses, and control inventory all from one smart dashboard. Complete business management solution for clinics.',
      keywords: [
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
      ],
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
      {/* <ProcessSection /> */}
      <TestimonialsSection />
      <CTASection />
      {/* { <FAQSection faqSectionData={data.faqSection} faqData={data.faqData} />} */}
      
    </>
  )
}
