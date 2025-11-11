'use client';

import Image from 'next/image';

import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import type { EMRIntegrationData, EMRCard } from '@/types/cms';
import { Container, Section, SectionHeader } from './structure';
import Button from './Button';

interface EMRIntegrationSectionProps {
  emrIntegrationData?: EMRIntegrationData | null;
}

export default function EMRIntegrationSection({ emrIntegrationData }: EMRIntegrationSectionProps) {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  
  // Use CMS data if available
  const emrCards = emrIntegrationData?.emrCards || [];
  
  // If no data, don't render
  if (!emrIntegrationData || emrCards.length === 0) {
    return null;
  }
  
  // Get heading from rich text or normal headline
  const getHeading = () => {
    if (emrIntegrationData.headlineRich && Array.isArray(emrIntegrationData.headlineRich) && emrIntegrationData.headlineRich.length > 0) {
      return emrIntegrationData.headlineRich;
    }
    const normalHeadline = emrIntegrationData.headline || emrIntegrationData.title || "Work Directly From Neo.";
    return normalHeadline;
  };
  
  
  
  return (
    <Section bgColor="white" padding="default" style={{scrollMarginTop: '73px'}}>
      <Container className='flex flex-col d:gap-16 gap-12'>
        {/* Section Header */}
        <SectionHeader
          heading={getHeading()}
          description={emrIntegrationData.description || "Neo isn't just connected to your EMR—it's deeply integrated. Handle critical workflows without ever leaving the platform."}
        />

        {/* EMR Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-12  ">
          {emrCards.map((card, index) => (
            <div key={index} className=' rounded-xl overflow-hidden   flex md:flex-col flex-col-reverse'>
              {/* Logo */}
              {card.logo?.asset?.url && (
                <div className="w-full  relative rounded-[18px] overflow-hidden  bg-[50%] bg-no-repeat bg-[#cde8eb]">
                  <Image
                    src={card.logo.asset.url}
                    alt={card.title}
                    width={292}
                    height={150}
                    className="object-contain w-full h-full"
                    title={card.title}
                    priority={true}
                  />
                </div>
              )}

              {/* Content */}
              <div className="md:px-3 md:py-6 pl-0 p-4">
                <h3 className="text-2xl sm:text-3xl md:text-[30px] text-[#09090B] mb-3 font-manrope font-bold leading-tight sm:leading-tight md:leading-[40px]">
                  {card.title}
                </h3>
            
                <p className="text-sm sm:text-base text-[#364153] leading-relaxed mb-4 font-geist font-normal">
                  {card.description}
                </p>
                {card.headline && (
                  <div className="inline-flex items-center justify-center gap-[10px] px-2 py-1 bg-gray-100 rounded mb-2">
                    <p className="text-xs text-gray-950 font-geist font-semibold leading-5 tracking-wider uppercase">
                      {card.headline}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="
    rounded-3xl 
    bg-[linear-gradient(270deg,rgba(1,181,158,0.20)_31.25%,rgba(1,181,158,0.05)_100%)] 
    md:p-6 p-3 sm:p-8 md:mb-8 md-3 relative overflow-hidden
  ">
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.363 3.32223C13.4259 3.36993 13.4787 3.42956 13.5184 3.49769C13.5582 3.56583 13.5841 3.64114 13.5948 3.71931C13.6054 3.79748 13.6005 3.87698 13.5804 3.95325C13.5602 4.02953 13.5252 4.10109 13.4774 4.16383L7.07743 12.5638C7.02552 12.6319 6.95965 12.688 6.88424 12.7285C6.80884 12.769 6.72565 12.7929 6.64025 12.7986C6.55486 12.8042 6.46923 12.7916 6.38913 12.7615C6.30903 12.7313 6.2363 12.6844 6.17583 12.6238L2.57583 9.02383C2.46984 8.91009 2.41215 8.75965 2.41489 8.60421C2.41763 8.44877 2.4806 8.30046 2.59053 8.19053C2.70046 8.0806 2.84877 8.01763 3.00421 8.01489C3.15965 8.01215 3.31009 8.06985 3.42383 8.17583L6.53903 11.2902L12.523 3.43663C12.6193 3.31019 12.7619 3.22713 12.9194 3.20569C13.0769 3.18424 13.2364 3.22615 13.363 3.32223Z" fill="#008236"/>
              </svg>
              <p className="text-sm md:text-base text-gray-700 font-geist leading-relaxed">
                <span className="font-semibold">Works with any therapy EMR</span>
                <span className="hidden sm:inline"> — WebPT, Raintree, Clinicient, and more</span>
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.363 3.32223C13.4259 3.36993 13.4787 3.42956 13.5184 3.49769C13.5582 3.56583 13.5841 3.64114 13.5948 3.71931C13.6054 3.79748 13.6005 3.87698 13.5804 3.95325C13.5602 4.02953 13.5252 4.10109 13.4774 4.16383L7.07743 12.5638C7.02552 12.6319 6.95965 12.688 6.88424 12.7285C6.80884 12.769 6.72565 12.7929 6.64025 12.7986C6.55486 12.8042 6.46923 12.7916 6.38913 12.7615C6.30903 12.7313 6.2363 12.6844 6.17583 12.6238L2.57583 9.02383C2.46984 8.91009 2.41215 8.75965 2.41489 8.60421C2.41763 8.44877 2.4806 8.30046 2.59053 8.19053C2.70046 8.0806 2.84877 8.01763 3.00421 8.01489C3.15965 8.01215 3.31009 8.06985 3.42383 8.17583L6.53903 11.2902L12.523 3.43663C12.6193 3.31019 12.7619 3.22713 12.9194 3.20569C13.0769 3.18424 13.2364 3.22615 13.363 3.32223Z" fill="#008236"/>
              </svg>
              <p className="text-sm md:text-base text-gray-700 font-geist leading-relaxed">
                <span className="font-semibold">Real-time sync</span>
                <span className="hidden sm:inline"> keeps your team on the same page</span>
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {cta.scheduleLink && (
          <div className="text-center flex justify-center">
            <Button 
              type="primary"
              link="/schedule"
              target="_blank"
              onClick={() => {
                trackButtonClick('emr_integration_walkthrough', { 
                  section: 'emr_integration',
                  action: 'schedule_walkthrough'
                })
              }}
              size="md"
            >
              <span>Schedule a Walkthrough</span>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
