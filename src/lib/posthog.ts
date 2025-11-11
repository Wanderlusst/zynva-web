import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (posthogKey && posthogHost) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
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
        // Enable person profiles for workflow targeting
        person_profiles: 'identified_only',
        // Enable request batching for better performance
        request_batching: true,
      })
    }
  }
}

export default posthog

