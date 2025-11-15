'use client'

import { usePostHog as usePH } from 'posthog-js/react'

export const usePostHog = () => {
  const posthog = usePH()

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    try {
      if (posthog && posthog.__loaded && typeof posthog.capture === 'function') {
        posthog.capture(eventName, properties)
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog event tracked:', eventName, properties)
        }
      } else if (process.env.NODE_ENV === 'development') {
        console.warn('PostHog not ready to track event:', {
          eventName,
          hasPosthog: !!posthog,
          isLoaded: posthog?.__loaded,
          hasCapture: typeof posthog?.capture === 'function'
        })
      }
    } catch (error) {
      // Silently fail - don't break the app
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog trackEvent error:', error)
      }
    }
  }

  const trackButtonClick = (buttonName: string, properties?: Record<string, any>) => {
    try {
      trackEvent('button_clicked', {
        button_name: buttonName,
        ...properties,
      })
    } catch (error) {
      // Silently fail - don't break the app
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog trackButtonClick error:', error)
      }
    }
  }

  const trackLinkClick = (linkName: string, url: string, properties?: Record<string, any>) => {
    try {
      trackEvent('link_clicked', {
        link_name: linkName,
        url,
        ...properties,
      })
    } catch (error) {
      // Silently fail - don't break the app
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog trackLinkClick error:', error)
      }
    }
  }

  const trackFormSubmit = (formName: string, properties?: Record<string, any>) => {
    try {
      trackEvent('form_submitted', {
        form_name: formName,
        ...properties,
      })
    } catch (error) {
      // Silently fail - don't break the app
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog trackFormSubmit error:', error)
      }
    }
  }

  const identifyUser = (userId: string, properties?: Record<string, any>) => {
    try {
      if (posthog && typeof posthog.identify === 'function') {
        posthog.identify(userId, {
          ...properties,
          // Add timestamp for workflow automation
          last_seen: new Date().toISOString(),
          // Add platform info
          platform: 'web',
          // Add user agent info (if needed for workflows)
          user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        })
      }
    } catch (error) {
      // Silently fail - don't break the app
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog identifyUser error:', error)
      }
    }
  }

  const setUserProperties = (properties: Record<string, any>) => {
    try {
      if (posthog && typeof posthog.people?.set === 'function') {
        posthog.people.set(properties)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog setUserProperties error:', error)
      }
    }
  }

  const incrementUserProperty = (property: string, value: number = 1) => {
    try {
      // PostHog doesn't have increment, so we'll use set with the current value + increment
      // This is a simplified version - for actual incrementing, you'd need to track current values
      if (posthog && typeof posthog.people?.set === 'function') {
        // Note: This sets the value, doesn't increment. For true incrementing,
        // you'd need to fetch current value first or track it separately
        posthog.people.set({ [property]: value })
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog incrementUserProperty error:', error)
      }
    }
  }

  const trackFormFieldChange = (formName: string, fieldName: string, hasValue: boolean, properties?: Record<string, any>) => {
    try {
      trackEvent('form_field_changed', {
        form_name: formName,
        field_name: fieldName,
        has_value: hasValue,
        ...properties,
      })
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('PostHog trackFormFieldChange error:', error)
      }
    }
  }

  return {
    trackEvent,
    trackButtonClick,
    trackLinkClick,
    trackFormSubmit,
    trackFormFieldChange,
    identifyUser,
    setUserProperties,
    incrementUserProperty,
    posthog,
  }
}

