'use client'

import { useEffect } from 'react'
import MeetingsEmbed from '@/components/Hubspot/MeetingsEmbed'
import { useCTA } from '@/contexts/CTAContext'
import { usePostHog } from '@/hooks/usePostHog'
import { SectionHeader } from '@/components/structure'

export default function SchedulePage() {
  const { cta } = useCTA()
  const { trackEvent } = usePostHog()

  useEffect(() => {
    trackEvent('schedule_page_viewed', {
      page: 'schedule',
      meeting_url: cta?.scheduleLink || 'default'
    })
  }, [trackEvent, cta?.scheduleLink])
  
  const formatMeetingUrl = (url: string | undefined): string => {
    const defaultUrl = 'https://meetings.hubspot.com/rohit-ganapathy/opal-voice-physio?embed=true'
    
    if (!url || url === 'undefined' || url.trim() === '') {
      return defaultUrl
    }
    
    if (url.includes('/schedule') || url.startsWith('/')) {
      return defaultUrl
    }
    
    if (url.includes('meetings.hubspot.com')) {
      const urlWithoutEmbed = url.split('?embed=')[0].split('&embed=')[0]
      const formattedUrl = `${urlWithoutEmbed}?embed=true`
      return formattedUrl
    }
    
    return defaultUrl
  }
  
  const meetingUrl = formatMeetingUrl(cta?.scheduleLink)
  
  const safeMeetingUrl = meetingUrl && meetingUrl !== 'undefined' && typeof meetingUrl === 'string'
    ? meetingUrl
    : 'https://meetings.hubspot.com/rohit-ganapathy/opal-voice-physio?embed=true'

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 md:pt-44 pt-28">
      <div className="w-full max-w-5xl">
        <div className="text-center md:mb-[72px] mb-12">   
        <SectionHeader heading="Join Waiting List" 
        description="Join our waiting list to be notified when Zynva becomes available and see how it can transform your practice and supercharge your growth" />
         </div>
        <div className="">
          <MeetingsEmbed key={safeMeetingUrl} meetingUrl={safeMeetingUrl} />
        </div>
      </div>
    </div>
  )
}

