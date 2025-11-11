'use client';

import Image from 'next/image';

import { useCTA } from '@/contexts/CTAContext';
import { usePostHog } from '@/hooks/usePostHog';
import { Container, Section } from './structure';


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
    <Section className="w-full flex flex-col items-center relative bg-white">
      <Container 
        className="w-full flex flex-col items-start justify-center md:gap-0 gap-8 py-0 pt-[40px] md:!pb-0 md:px-auto md:!py-0 md:!pt-[118px] md:mt-0 mt-12 !pb-0 relative"
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
                <a
                  href="/schedule"
                  target="_blank"
                  onClick={() => {
                    trackButtonClick('hero_cta', { 
                      section: 'hero',
                      button_text: cta.primaryButtonText || 'Try for free',
                      action: 'schedule_walkthrough'
                    })
                  }}
                  className="bg-[#05796b] h-[55px] rounded-[80px] shadow-[0px_38px_50px_0px_rgba(5,121,107,0.2)] px-[32px] flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <span className="font-manrope font-semibold text-[18px] text-white leading-normal">
                    {cta.primaryButtonText || 'Try for free'}
                  </span>
                </a>
              )}
            </div>

            {/* Statistics */}
            <div className="flex flex-col md:flex-row gap-[50px] items-start pt-[32px]">
              <div className="flex flex-col items-start">
                <p className="font-manrope font-bold text-[24px] md:text-[26px] text-[#282828] leading-[48px] md:leading-[52px] tracking-[-1.2px] md:tracking-[-1.3px]">
                  195k+ Users
                </p>
                <p className="font-manrope font-light text-[16px] text-[#8593a3] leading-[25.6px] tracking-[-0.8px] w-[236px] whitespace-pre-wrap">
                  Delightful remarkably mr on announcing themselves entreaties favourable.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-manrope font-bold text-[24px] md:text-[26px] text-[#282828] leading-[48px] md:leading-[52px] tracking-[-1.2px] md:tracking-[-1.3px]">
                  $400m+ Saved
                </p>
                <p className="font-manrope font-light text-[16px] text-[#8593a3] leading-[25.6px] tracking-[-0.8px] w-[232px] whitespace-pre-wrap">
                  About to in so terms voice at. Equal an would is found seems of and concluded.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image Gallery - Desktop */}
          <div className="hidden md:flex flex-1 justify-end w-auto absolute right-0 xl:right-[-94px] bottom-0 top-[118px] max-w-[48%]">
            <div className="relative w-full h-full">
              {imagesToUse && imagesToUse[0] && (
                <Image
                  src={imagesToUse[0]}
                  alt="Business payments illustration"
                  className="object-contain w-full h-full object-center"
                  sizes="(min-width: 768px) 704px, 100vw"
                  width={704}
                  height={653}
                  title="Business payments"
                  priority={true}
                />
              )}
            </div>
          </div>
        </div>

        {/* Image Gallery Section - Mobile */}
        <div className="block md:hidden w-full -mx-4 mt-8">
          <div className="h-[400px] w-[calc(100%+32px)] overflow-hidden md:rounded-2xl relative">
            {imagesToUse && imagesToUse[0] && (
              <Image
                src={imagesToUse[0]}
                alt="Business payments"
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
            )}
          </div>
        </div>

      </Container>
    </Section>
  );
}
