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
  title: 'Schedule a Walkthrough',
  icons: {
    icon: '/FavIcon1.ico',
  },
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
              <Header headerData={header} />
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
