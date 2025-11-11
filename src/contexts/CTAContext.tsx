'use client'

import React, { createContext, useContext, ReactNode } from 'react'

// CTA Configuration Interface
interface CTAConfig {
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  rotatingMessages: string[]
  practiceTypes: string[]
  formId?: string
  scheduleLink?: string
}

// Context Interface
interface CTAContextType {
  cta: CTAConfig
}

// Default CTA Configuration
const defaultCTA: CTAConfig = {
  primaryButtonText: 'Schedule a Walkthrough',
  primaryButtonLink: '#contact',
  secondaryButtonText: 'Learn More',
  secondaryButtonLink: '#features',
  rotatingMessages: [
    'To Cut Time on Payer Calls',
    'To Convert More New Patients',
    'To Keep Every Therapist Booked',
    'To Stay on Top of Every Referral',
    'To Track Front Desk Performance',
  ],
  practiceTypes: [
    'Physical Therapy Practices',
    'Pediatric Therapy Practices',
    'Occupational Therapy Practices',
    'Speech Therapy Practices',
    'Chiropractic Therapy Practices',
  ],
}

// Create Context
const CTAContext = createContext<CTAContextType>({
  cta: defaultCTA,
})

// Context Provider Props
interface CTAProviderProps {
  children: ReactNode
  customCTA?: Partial<CTAConfig>
}

// Context Provider Component
export function CTAProvider({ children, customCTA }: CTAProviderProps) {
  const cta = {
    ...defaultCTA,
    ...customCTA,
  }

  return (
    <CTAContext.Provider value={{ cta }}>
      {children}
    </CTAContext.Provider>
  )
}

// Custom Hook to use CTA Context
export function useCTA() {
  const context = useContext(CTAContext)
  
  if (!context) {
    throw new Error('useCTA must be used within a CTAProvider')
  }
  
  return context
}

// Export types
export type { CTAConfig, CTAContextType }

