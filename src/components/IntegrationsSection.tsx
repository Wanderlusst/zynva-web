'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import { IntegrationSectionData } from '@/types/cms';
import { Container, Section, SectionHeader } from './structure';
import Button from './Button';
import { FormModal } from './Hubspot/FormModal';

interface IntegrationsSectionProps {
  integrationData?: IntegrationSectionData | null;
}

export default function IntegrationsSection({ integrationData }: IntegrationsSectionProps) {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use CMS data if available, otherwise show nothing
  const therapyEMRs = integrationData?.therapyEMRs || [];
  const phoneCommunication = integrationData?.phoneCommunication || [];

  // Don't render if no data
  if (!integrationData || (therapyEMRs.length === 0 && phoneCommunication.length === 0)) {
    return null;
  }

  let headline = integrationData.name || 'Integrations';

  return (
    <Section bgColor="midnightGradient" style={{scrollMarginTop: '75px'}} id='integrations'>
      <Container padding="small_2xl" className="relative z-10 w-full md:gap-16 gap-12 px-6">
        <SectionHeader
          heading={integrationData.headline || 'Integrations'}
          description={integrationData.description}
          isIntegrationSection={true}
        />

        {/* Integration Icons */}
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16  w-full justify-center  ">
          {/* Therapy EMRs */}
          {therapyEMRs.length > 0 && (
            <div className="flex md:flex-col flex-col-reverse gap-6 items-center">
              <div className="flex gap-6 md:gap-8 items-end justify-center flex-wrap md:flex-nowrap">
                {therapyEMRs.map((integration, index) => (
                  <div key={index} className="flex flex-col items-center group relative">
                    <div className="rounded-lg sm:rounded-xl  transition-all duration-300 flex flex-col items-center justify-center gap-2 ">
                      {integration.logo?.url ? (
                        <div className="rounded-md sm:rounded-lg h-full w-full flex items-center justify-center flex-wrap md:no-wrap">
                          <Image
                            src={integration.logo.url}
                            alt={integration.name}
                            width={60}
                            height={60}
                            title={integration.name}
                            priority={true}
                            className="object-cover rounded-xl h-full max-h-[60px]"
                          />
                        </div>
                      ) : (
                        <div className={`${integration.color || 'bg-[#35b454]'} rounded-md sm:rounded-lg w-12 h-12 sm:w-15 sm:h-15 flex items-center justify-center`}>
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded"></div>
                        </div>
                      )}
                               {integration.name && (
                      <div 
                      className="
                        mt-0  
                        group-hover:block 
                        text-white              
                        text-xs                 
                        font-normal             
                        leading-4               
                        tracking-normal         
                        font-sans               
                        rounded 
                        whitespace-nowrap 
                        text-center
                        z-10 
                        shadow-lg
                      "
                    >
                      {integration.name}
                    </div>
                    )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider Line */}
              <div className="flex items-center gap-2 sm:gap-4 md:gap-6 w-full">
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-geist whitespace-nowrap">
                  Therapy EMRs
                </span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>
            </div>
          )}

          {/* Phone & Communication */}
          {phoneCommunication.length > 0 && (
            <div className="flex md:flex-col flex-col-reverse gap-6 items-center">
              <div className="flex gap-6 md:gap-8 items-end justify-center flex-wrap md:flex-nowrap">
                {phoneCommunication.map((integration, index) => (
                  <div key={index} className="flex flex-col items-center group relative">
                    <div className="rounded-lg sm:rounded-xl  transition-all duration-300 flex flex-col items-center justify-center gap-2 ">
                      {integration.logo?.url ? (
                        <div className="rounded-md sm:rounded-lg h-full w-full flex items-center justify-center flex-wrap md:no-wrap">
                          <Image
                            src={integration.logo.url}
                            alt={integration.name}
                            width={60}
                            height={60}
                            className="object-contain rounded-xl h-full max-h-[60px]"
                            title={integration.name}
                            priority={true}
                          />
                        </div>
                      ) : (
                        <div className={`${integration.color || 'bg-[#35b454]'} rounded-md sm:rounded-lg w-12 h-12 sm:w-15 sm:h-15 flex items-center justify-center`}>
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded"></div>
                        </div>
                      )}
                      {integration.name && (
                      <div 
                      className="
                        mt-0  
                        group-hover:block 
                        text-white              
                        text-xs                 
                        font-normal             
                        leading-4               
                        tracking-normal         
                        font-sans               
                        rounded 
                        whitespace-nowrap 
                        text-center
                        z-10 
                        shadow-lg
                      "
                    >
                      {integration.name}
                    </div>
                    )}
                    </div>
       
                  </div>
                ))}
              </div>

              {/* Divider Line */}
              <div className="flex items-center gap-2 sm:gap-4 md:gap-6 w-full">
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-geist whitespace-nowrap">
                  Phone & Communication
                </span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center ">
          {cta.scheduleLink && (
            <Button
              type="primary"
              link="/schedule"
              target="_blank"
              onClick={() => {
                trackButtonClick('integration_walkthrough', { 
                  section: 'integrations',
                  action: 'schedule_walkthrough'
                })
              }}
              className="w-full sm:w-auto"
            >
              <span className="text-gray-950"> Schedule a Walkthrough</span>
            </Button>
          )}
          <button
            onClick={() => {
              trackButtonClick('request_integration', { section: 'integrations' })
              setIsModalOpen(true)
            }}
            className="backdrop-blur-sm bg-white/10 border-2 border-white/40 rounded-lg px-4 sm:px-6 py-2.5 sm:py-2.5 text-white text-sm sm:text-base whitespace-nowrap hover:bg-white/20 transition-colors font-geist w-full sm:w-auto"
          >
            Request an Integration
          </button>
        </div>
      </Container>
      
      {isModalOpen && (
        <FormModal
          onClose={() => setIsModalOpen(false)}
          source="integrations_section"
          source1="request_integration_button"
        />
      )}
    </Section>
  );
}
