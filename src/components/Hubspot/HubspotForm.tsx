'use client'

import { useEffect, useRef } from 'react'
import { usePostHog } from '@/hooks/usePostHog'

interface HubSpotFormProps {
  formId?: string
  source?: string
  source1?: string
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string
          formId: string
          region: string
          target: string
          onFormReady?: ($form: any) => void
          onFormSubmit?: ($form: any) => void
          onFormSubmitted?: ($form: any, data: any) => void
        }) => void
      }
    }
  }
}

const HubSpotForm = ({ formId, source, source1 }: HubSpotFormProps) => {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)
  const { identifyUser, trackEvent } = usePostHog()
  const formSubmittedRef = useRef(false)

  useEffect(() => {
    if (!formId) {
      console.warn('HubSpot form ID is not provided')
      return
    }

    const createForm = () => {
      if (window.hbspt && formContainerRef.current && formId) {
        // Clear any existing form
        if (formContainerRef.current) {
          formContainerRef.current.innerHTML = ''
        }
        
        window.hbspt.forms.create({
          portalId: '4832409',
          formId: formId,
          region: 'na1',
          target: '#hubspotForm',
          onFormSubmitted: ($form: any, data: any) => {
            // Prevent duplicate tracking
            if (formSubmittedRef.current) return
            formSubmittedRef.current = true

            // Extract essential user information
            let userEmail = ''
            let userName = ''

            // Parse HubSpot form data - only extract essential fields
            if (data && Array.isArray(data)) {
              data.forEach((field: any) => {
                if (field.name && field.value) {
                  // Extract key user information
                  if (field.name === 'email' || field.name.includes('email')) {
                    userEmail = field.value
                  }
                  if (field.name === 'firstname' || field.name === 'first_name') {
                    userName = field.value
                  }
                  if (field.name === 'lastname' || field.name === 'last_name') {
                    userName = userName ? `${userName} ${field.value}` : field.value
                  }
                }
              })
            }

            // Identify user if email is available
            if (userEmail) {
              identifyUser(userEmail, {
                email: userEmail,
                name: userName || undefined,
                form_source: source || 'unknown',
                form_source1: source1 || 'unknown',
              })
            }

            // Track only essential submission event for workflows
            trackEvent('form_submission_success', {
              form_id: formId,
              form_name: 'hubspot_integration_request',
              source: source || 'unknown',
              source1: source1 || 'unknown',
              user_email: userEmail || undefined,
              user_name: userName || undefined,
              submission_timestamp: new Date().toISOString(),
            })
          },
        })
      }
    }

    // Check if script is already loaded
    if (window.hbspt) {
      createForm()
      return
    }

    // Load script if not already loaded
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script')
      script.charset = 'utf-8'
      script.type = 'text/javascript'
      script.src = '//js.hsforms.net/forms/embed/v2.js'
      script.async = true

      script.onload = () => {
        scriptLoadedRef.current = true
        createForm()
      }

      document.body.appendChild(script)
    }

    // Cleanup function - capture ref value at effect time
    const containerElement = formContainerRef.current
    return () => {
      if (containerElement) {
        containerElement.innerHTML = ''
      }
      formSubmittedRef.current = false
    }
  }, [formId, source, source1, identifyUser, trackEvent])

  if (!formId) {
    return null
  }

  return (
    <div className="red">
    <div id="hubspotForm" ref={formContainerRef}></div>
    </div>
  )
}

export default HubSpotForm
