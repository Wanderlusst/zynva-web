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
  title: 'Zynva',
  description: 'All in one solution helping business',
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
