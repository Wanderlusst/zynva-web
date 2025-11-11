'use client';

import Image from 'next/image';

import { useCTA } from '@/contexts/CTAContext';
import { usePostHog } from '@/hooks/usePostHog';
import type { FooterData } from '@/types/cms';
import { Container, Section } from '../structure';
import Button from '../Button';
import Link from 'next/link';

interface FooterProps {
  footerData?: FooterData | null;
}

export default function Footer({ footerData }: FooterProps) {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  
  return (
    <Section bgColor="black">
      <Container padding='small_xl' className=' w-full px-0 pb-[20px] pt-[64px]'>
      <div className=" flex flex-col gap-3 ">
        {/* Main CTA Section */}
        <div className="bg-[#041910] w-full rounded-xl px-8 py-16 flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-1 md:max-w-[818px]  ">
            <h2 className="text-[26px] sm:text-5xl lg:text-[48px] text-white font-bold font-manrope md:leading-[60px] leading-tight tracking-tight text-center whitespace-pre-wrap">
              Ready to Supercharge Your Practice Growth? Book a Demo to Learn How.
            </h2>
          </div>
          {cta.scheduleLink && (
            <Button 
              type="primary"
              link="/schedule"
              target="_blank"
              onClick={() => {
                trackButtonClick('footer_cta', { 
                  location: 'footer_hero', 
                  button_text: cta.primaryButtonText,
                  action: 'schedule_walkthrough'
                })
              }}
            >
              <span>{cta.primaryButtonText}</span>
            </Button>
          )}
        </div>

        {/* Links Card */}
        <div className="flex gap-3 w-full">
          <div className="bg-zinc-900 flex-1  flex md:flex-row flex-col gap-2 items-center justify-between p-3 md:pl-8 rounded-xl">
            {/* Logo - left side */}
            <div className="flex items-center gap-2">
              <Link href="/">
              {(footerData?.logo?.asset?.url || footerData?.logoText) && (
                footerData.logo?.asset?.url ? (
                  <div className="relative h-full w-auto max-h-[44px]">
                    <Image
                      src={footerData.logo.asset.url}
                      alt={footerData.logo.alt || footerData.companyName || 'Logo'}
                      width={145}  
                      height={44}
                      className="object-contain max-h-[44px] w-full"
                    />
                  </div>
                ) : footerData.logoText ? (
                  <div className="text-white text-base font-semibold" style={{ fontFamily: 'var(--font-manrope)' }}>
                    <span>{footerData.logoText}</span>
                  </div>
                ) : null
              )}
              </Link>
            </div>

            {/* Legal Links - right side */}
            {/* <div className="flex gap-3 items-center pr-5">
              <button 
                onClick={() => trackButtonClick('privacy_policy', { location: 'footer' })}
                className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors font-inter px-0 py-1"
              >
                Privacy Policy
              </button>
              <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
              <button 
                onClick={() => trackButtonClick('terms_of_service', { location: 'footer' })}
                className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors font-inter px-0 py-1"
              >
                Terms of Service
              </button>
            </div> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center py-3">
          <div className="text-sm text-zinc-500 font-medium font-inter whitespace-nowrap">
            {footerData?.copyrightText || '© 2025 Zynva. All rights reserved.'}
          </div>
        </div>
      </div>
      </Container>
      </Section>
  );
}
