'use client'

import { useEffect, useRef } from 'react'

interface MeetingsEmbedProps {
  meetingUrl?: string
}

export default function MeetingsEmbed({ 
  meetingUrl = 'https://meetings.hubspot.com/rohit-ganapathy/opal-voice-physio?embed=true'
}: MeetingsEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const isInitializedRef = useRef(false)
  
  const DEFAULT_URL = 'https://meetings.hubspot.com/rohit-ganapathy/opal-voice-physio?embed=true'
  
  const normalizedUrl = meetingUrl && meetingUrl !== 'undefined' && typeof meetingUrl === 'string' 
    ? meetingUrl 
    : DEFAULT_URL

  const getValidUrl = (url: string | undefined): string => {
    if (!url || url === 'undefined' || url.trim() === '') {
      return DEFAULT_URL
    }

    if (url.includes('/schedule') || url.startsWith('/') || !url.startsWith('http')) {
      return DEFAULT_URL
    }

    if (!url.includes('meetings.hubspot.com')) {
      return DEFAULT_URL
    }

    let formattedUrl = url
    if (!url.includes('?embed=true') && !url.includes('&embed=true')) {
      const baseUrl = url.split('?')[0].split('#')[0]
      formattedUrl = `${baseUrl}?embed=true`
    }

    return formattedUrl
  }

  useEffect(() => {
    if (!containerRef.current) return

    const validUrl = getValidUrl(normalizedUrl)

    const container = containerRef.current
    // Capture ref value for cleanup
    const containerElement = containerRef.current
    
    // Complete cleanup
    container.innerHTML = ''
    
    // Remove any existing iframes
    const existingIframes = document.querySelectorAll('iframe[src*="meetings.hubspot.com"]')
    existingIframes.forEach(iframe => iframe.remove())
    
    // Remove any existing scripts
    const existingScripts = document.querySelectorAll('script[src*="MeetingsEmbedCode.js"]')
    existingScripts.forEach(script => script.remove())
    
    // CRITICAL: Set data-src BEFORE loading the script
    container.setAttribute('class', 'meetings-iframe-container')
    container.setAttribute('data-src', validUrl)
    
    // Force a reflow
    void container.offsetHeight
    
    // Now load the script - it will find the data-src already set
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
    script.async = true
    scriptRef.current = script

    script.onload = () => {
      isInitializedRef.current = true
    }

    script.onerror = () => {
      // Failed to load script
    }

    document.body.appendChild(script)

    // Cleanup
    return () => {
      isInitializedRef.current = false
      
      if (containerElement) {
        containerElement.innerHTML = ''
        containerElement.removeAttribute('data-src')
      }
      
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.remove()
        scriptRef.current = null
      }
      
      // Clean up iframes
      const iframes = document.querySelectorAll('iframe[src*="meetings.hubspot.com"]')
      iframes.forEach(iframe => iframe.remove())
      
      // Clean up scripts
      const scripts = document.querySelectorAll('script[src*="MeetingsEmbedCode.js"]')
      scripts.forEach(script => script.remove())
    }
  }, [normalizedUrl])

  return (
    <div 
      ref={containerRef}
      className="meetings-iframe-container w-full min-h-[600px]"
    />
  )
}