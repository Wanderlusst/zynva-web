'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

function PostHogProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize PostHog with error handling
    if (typeof window !== 'undefined') {
      try {
        const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
        const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

        // Check if PostHog is already initialized to avoid re-initialization
        if (posthog.__loaded) {
          // PostHog already initialized - no need to log anything
          return
        }

        if (posthogKey && posthogHost) {
          posthog.init(posthogKey, {
            api_host: posthogHost,
            person_profiles: 'identified_only',
            loaded: (posthog) => {
              
            },
            capture_pageview: false, // Manual pageview tracking only
            capture_pageleave: false, // Disabled to save events
            // Disable autocapture to save events - we track manually
            autocapture: false,
            // Disable session recording to save events
            session_recording: {
              recordCrossOriginIframes: false,
              maskAllInputs: true,
            },
            // Enable feature flags for A/B testing
            advanced_disable_feature_flags_on_first_load: false,
            // Enable request batching for better performance
            request_batching: true,
          })
        } else {
          
        }
      } catch (error) {
        console.error('PostHog initialization error:', error)
        // Continue without PostHog - don't break the app
      }
    }
  }, [])

  useEffect(() => {
    // Track pageviews with error handling
    if (pathname && typeof window !== 'undefined') {
      try {
        let url = window.origin + pathname
        if (searchParams && searchParams.toString()) {
          url = url + `?${searchParams.toString()}`
        }
        
        // Only track if PostHog is initialized and has a valid key
        const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
        if (posthogKey && typeof posthog.capture === 'function') {
          posthog.capture('$pageview', {
            $current_url: url,
          })
        }
      } catch (error) {
        // Silently fail pageview tracking - don't break the app
        if (process.env.NODE_ENV === 'development') {
          console.error('PostHog pageview tracking error:', error)
        }
      }
    }
  }, [pathname, searchParams])

  // Wrap PostHog provider with error handling
  try {
    return <PHProvider client={posthog}>{children}</PHProvider>
  } catch (error) {
    // If PostHog provider fails, just render children
    console.error('PostHog provider render error:', error)
    return <>{children}</>
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Error boundary wrapper to prevent PostHog from breaking the app
  try {
    return (
      <Suspense fallback={null}>
        <PostHogProviderInner>{children}</PostHogProviderInner>
      </Suspense>
    )
  } catch (error) {
    // If PostHog completely fails, just render children without tracking
    console.error('PostHog provider error:', error)
    return <>{children}</>
  }
}

