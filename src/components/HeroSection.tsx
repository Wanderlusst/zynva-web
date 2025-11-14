'use client';

import React from 'react';

import { useCTA } from '@/contexts/CTAContext';
import { usePostHog } from '@/hooks/usePostHog';
import { Container, Section } from './structure';
import Button from './Button';
import VideoPlayer from './Media/VideoPlayer';


interface HeroSectionProps {
  heroSectionData?: {
    heroImages?: Array<{
      image: {
        asset: {
          _ref: string
          _type: string
          url?: string
        }
      }
      order: number
    }>
    heroSection?: {
      heading: string;
      keyHeading?: string | null;
      description: string;
    }
    subheadings?: string[];
    subheadings2?: string[];
    ctaButtonText?: string;
    ctaButtonLink?: string;
    practiceTypes?: string[];
    rotatingMessages?: string[];
  }
}

export default function HeroSection({ heroSectionData }: HeroSectionProps) {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();

  const subheading = heroSectionData?.subheadings?.[0] || "Product Growth Solution in Single Platform.";
  const heading = heroSectionData?.heroSection?.heading || "Managing business payments has never been easier";
  const description = heroSectionData?.heroSection?.description || "Never at water me might. On formed merits hunted unable merely by mr whence or. Possession the unpleasing simplicity her uncommonly.";

  return (
    <Section className="w-full flex flex-col items-center relative overflow-hidden min-h-[60vh] md:min-h-screen">
      {/* Background Video - Full Width and Height */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <VideoPlayer
            src="https://cdn.sanity.io/files/jni56u7c/develop/dde60e2a8b6ac21ae8384135f1c95473c3ea11b1.mp4"
            className="w-full h-full object-cover"
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            controls={false}
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {/* Light blur overlay with black shadow for text visibility */}
        <div 
          className="absolute inset-0 backdrop-blur-sm bg-black/60 z-10"
          style={{
            boxShadow: 'inset 0 0 150px rgba(0, 0, 0, 0.8)',
          }}
        ></div>
      </div>
      
      <Container 
        className="w-full flex flex-col items-center justify-center md:gap-0 gap-8 py-8 md:py-0 relative z-20 min-h-[60vh] md:min-h-screen"
      >
        <div className="w-full flex flex-col items-center justify-center gap-[50px] relative">
          <div className="flex flex-col gap-[32px] z-10 relative w-full max-w-[646px] items-center text-center">
            {/* <p className="font-geist text-2xl text-white font-medium leading-normal not-italic drop-shadow-lg">
              {subheading}
            </p> */}

            {/* Main Heading */}
            <h1 className="font-manrope font-extrabold text-3xl md:text-[60px] text-white leading-normal md:leading-[120%] tracking-[-1.2px] md:tracking-[-1.8px] w-full whitespace-pre-wrap drop-shadow-lg">
              {'All You Need. In One Software.'}
            </h1>
            
            {/* Description */}
            <p className="font-geist font-medium text-xl md:text-3xl text-white/90 leading-[28px] md:leading-[150%] tracking-[-0.36px] md:tracking-[-0.4px] w-full whitespace-pre-wrap drop-shadow-md">
              {'Manage patient visits, track revenue, monitor expenses, and control inventory all from one smart dashboard.'}
            </p>

            {/* CTA Button */}
            <div className="flex gap-[18px] md:pt-0 pt-2 items-center justify-center">
              {cta.scheduleLink && (
                <Button
                  type="primaryV3"
                  link="#cta-section"
                  onClick={() => {
                    trackButtonClick('hero_cta', { 
                      section: 'hero',
                      button_text: cta.primaryButtonText || 'Try for free',
                      action: 'schedule_walkthrough'
                    });
                    const ctaSection = document.getElementById('cta-section');
                    if (ctaSection) {
                      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <span>{cta.primaryButtonText || 'Try for free'}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
