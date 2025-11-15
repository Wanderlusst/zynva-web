import './globals.css'


import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'

import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'
import { CTAProvider } from '@/contexts/CTAContext'
import { PostHogProvider } from '@/components/PostHogProvider'
import { Queries } from '@/lib/queries'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const geist = GeistSans

export const metadata: Metadata = {
  title: {
    default: 'Zynva - All-in-One Business Management Software for Clinics',
    template: '%s | Zynva',
  },
  description: 'Manage patient visits, track revenue, monitor expenses, and control inventory all from one smart dashboard. Zynva is the complete business management solution for clinics and medical practices.',
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
    'PDF invoice generator',
    'healthcare business software',
    'practice management system',
    'medical office software',
    'clinic administration software',
    'patient data management',
    'appointment management',
    'medical billing software',
    'healthcare analytics',
    'clinic operations software',
    'all-in-one clinic software',
  ],
  authors: [{ name: 'Zynva' }],
  creator: 'Zynva',
  publisher: 'Zynva',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zynva.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Zynva - All-in-One Business Management Software for Clinics',
    description: 'Manage patient visits, track revenue, monitor expenses, and control inventory all from one smart dashboard. Complete business management solution for clinics.',
    siteName: 'Zynva',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zynva - All-in-One Business Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zynva - All-in-One Business Management Software for Clinics',
    description: 'Manage patient visits, track revenue, monitor expenses, and control inventory all from one smart dashboard.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'healthcare software',
}

async function getLayoutData(language: string = 'en') {
  const queries = new Queries('en')
  
  try {
    const [header, footer, ctaSection] = await Promise.all([
      queries.layout.getHeader(language),
      queries.layout.getFooter(language),
      queries.sections.getCTASection()
    ])
    
    return { header, footer, ctaSection }
  } catch (error) {
    console.error('Error fetching layout data:', error)
    return { header: null, footer: null, ctaSection: null }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { header, footer, ctaSection } = await getLayoutData()
  
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${geist.variable}`}>
        <PostHogProvider>
          <CTAProvider customCTA={{
            formId: ctaSection?.formId,
            scheduleLink: ctaSection?.scheduleLink
          }}>
            <div className="min-h-screen">
              <Header headerData={header} footerData={footer} />
              <main>
                {children}
              </main>
              <Footer footerData={footer} />
            </div>
          </CTAProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
