'use client';

import React from 'react';
import Image from 'next/image';

import { useCTA } from '@/contexts/CTAContext';
import { usePostHog } from '@/hooks/usePostHog';
import { Container, Section } from './structure';
import Button from './Button';


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
  
  const imagesToUse = heroSectionData?.heroImages && heroSectionData.heroImages.length > 0 
    ? heroSectionData.heroImages
        .sort((a, b) => a.order - b.order)
        .map(img => img.image.asset.url || img.image.asset._ref)
    : '';

  const subheading = heroSectionData?.subheadings?.[0] || "Product Growth Solution in Single Platform.";
  const heading = heroSectionData?.heroSection?.heading || "Managing business payments has never been easier";
  const description = heroSectionData?.heroSection?.description || "Never at water me might. On formed merits hunted unable merely by mr whence or. Possession the unpleasing simplicity her uncommonly.";

  return (
    <Section className="w-full flex flex-col items-center relative !bg-[#faf6f5] overflow-hidden">
      {/* Background Ellipse - Top Right Corner */} 
      <div className="absolute top-0 right-0 w-[60%] h-[40%] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 100% 0%, rgba(205, 238, 221, 0.15) 0%, rgba(205, 238, 221, 0.05) 50%, transparent 100%)',
          }}
        />
      </div>
      
      <Container 
        className="w-full flex flex-col items-start justify-center md:gap-0 gap-8 py-0 pt-[40px] md:!pb-0 md:px-auto md:!py-0 md:!pt-[118px] md:mt-0 mt-12 !pb-0 relative z-10"
      >
        <div className="w-full flex flex-col md:flex-row gap-[50px] items-start md:items-start relative">
          <div className="flex flex-shrink-0 flex-col gap-[32px] md:px-0 z-10 relative w-full md:w-auto md:max-w-[646px]">
            <p className="font-manrope text-[22px] text-black leading-normal not-italic">
              {subheading}
            </p>

            {/* Main Heading */}
            <h1 className="font-manrope font-extrabold text-[48px] md:text-[60px] text-black leading-[64px] md:leading-[80px] tracking-[-1.2px] md:tracking-[-1.8px] w-full whitespace-pre-wrap">
              {heading}
            </h1>
            
            {/* Description */}
            <p className="font-manrope font-normal text-[18px] md:text-[20px] text-[#757095] leading-[28px] md:leading-[35px] tracking-[-0.36px] md:tracking-[-0.4px] w-full md:max-w-[569px] whitespace-pre-wrap">
              {description}
            </p>

            {/* CTA Button */}
            <div className="flex gap-[18px] md:pt-0 pt-2 items-start">
              {cta.scheduleLink && (
                <Button
                  type="primaryV3"
                  link="/schedule"
                  target="_blank"
                  onClick={() => {
                    trackButtonClick('hero_cta', { 
                      section: 'hero',
                      button_text: cta.primaryButtonText || 'Try for free',
                      action: 'schedule_walkthrough'
                    })
                  }}
                >
                  <span>{cta.primaryButtonText || 'Try for free'}</span>
                </Button>
              )}
            </div>
          </div>

          <div className="md:flex justify-end w-auto flex-1">
            <div className='w-full h-full flex justify-end'>
              {imagesToUse && imagesToUse[0] && (
                <Image
                  src={imagesToUse[0]}
                  alt="Business payments illustration"
                  className="object-contain md:max-w-[480px] h-full rounded-2xl object-bottom"
                  width={704}
                  height={653}
                  title="Business payments"
                  priority={true}
                />
              )}
            </div>
          </div>
        </div>


      </Container>
    </Section>
  );
}
