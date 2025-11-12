'use client';

import React from 'react';

import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import { Container, Section } from './structure';
import Button from './Button';

export default function CTASection() {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  
  return (
    <Section bgColor="gray" padding="default" style={{scrollMarginTop: '73px'}}>
      <Container className='w-full'>
        <div className="relative bg-[#05796b] rounded-2xl h-[438px] flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden">
          {/* Decorative Vector Elements */}
          <div className="absolute left-[280px] top-[58px] hidden md:block">
            <svg width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
              <path d="M74 0L91.5 56.5L148 74L91.5 91.5L74 148L56.5 91.5L0 74L56.5 56.5L74 0Z" fill="white"/>
            </svg>
          </div>
          
          <div className="absolute right-[1067px] top-[49px] hidden md:block">
            <svg width="105" height="17" viewBox="0 0 105 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
              <path d="M0 8.5L105 8.5" stroke="white" strokeWidth="2" strokeDasharray="4 4"/>
            </svg>
          </div>

          <div className="absolute left-[198px] bottom-[16px] hidden md:block">
            <svg width="101" height="16" viewBox="0 0 101 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
              <path d="M0 8L101 8" stroke="white" strokeWidth="2" strokeDasharray="4 4"/>
            </svg>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-[763px]">
            {/* Heading */}
            <h2 className="font-manrope font-extrabold text-[32px] md:text-[56px] text-white leading-[40px] md:leading-[61px] tracking-[-0.96px] md:tracking-[-1.68px]">
              Discover a better way to manage purchases.
            </h2>

            {/* CTA Button */}
            {cta.scheduleLink && (
              <Button
                type="primaryV3"
                link="/schedule"
                target="_blank"
                onClick={() => {
                  trackButtonClick('cta_section_get_started', { 
                    section: 'cta',
                    action: 'get_started'
                  })
                }}
                className="bg-[#ff7f5c] hover:bg-[#ff6b47] text-white border-none shadow-none rounded-[50px] px-8 py-4 h-[67px]"
              >
                <span className="font-manrope font-bold text-[18px] text-white tracking-[-0.36px]">
                  Get Started Now
                </span>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

