'use client';

import React from 'react';

import { usePostHog } from '@/hooks/usePostHog';
import { Container, Section } from './structure';

// Apple Logo Icon
const AppleLogo = () => (
  <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 0C12.8 1.4 12.2 2.8 11.4 3.6C10.6 4.5 9.1 5.2 7.7 5C7.5 3.6 8.1 2.3 8.9 1.4C9.8 0.4 11.3 0 12.5 0ZM13.1 5.5C12.1 5.4 11.2 5.9 10.6 5.9C10 5.9 9.2 5.5 8.3 5.5C7.2 5.5 6.2 6 5.6 6.9C4.4 8.7 5.4 11.5 6.6 13.2C7.2 14 7.9 14.9 8.7 14.8C9.5 14.7 9.8 14.2 10.7 14.2C11.6 14.2 11.9 14.8 12.8 14.8C13.6 14.8 14.2 14 14.8 13.2C15.5 12.3 15.8 11.4 15.9 11.3C15.9 11.3 15.9 11.2 15.9 11.2C15.8 11.1 13.6 10.3 13.6 7.5C13.6 5.1 15.5 4.1 15.6 4C14.5 2.5 12.9 2.4 12.4 2.4C11.3 2.4 10.3 3 9.8 3C9.2 2.9 8.1 2.1 7 2.2C5.6 2.3 4.3 3.1 3.6 4.4C2.2 6.9 3.2 10.1 4.6 12.1C5.3 13.1 6.1 14.2 7.1 14.1C8 14 8.4 13.5 9.4 13.5C10.4 13.5 10.8 14.1 11.8 14C12.9 13.9 13.5 12.9 14.2 11.9C14.7 11.2 15.1 10.5 15.4 9.8C13.8 9.1 13.1 7.6 13.1 7.6C13.1 7.6 13.1 5.5 13.1 5.5Z" fill="white"/>
  </svg>
);

// Google Play Icon
const GooglePlayIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 2.5L15 15L1.5 27.5V2.5Z" fill="white"/>
    <path d="M20.5 13.5L1.5 2.5V27.5L20.5 13.5Z" fill="white" fillOpacity="0.6"/>
    <path d="M20.5 13.5L15 15L1.5 27.5L20.5 13.5Z" fill="white" fillOpacity="0.4"/>
    <path d="M20.5 13.5L15 15L1.5 2.5L20.5 13.5Z" fill="white" fillOpacity="0.2"/>
  </svg>
);

export default function AppDownloadSection() {
  const { trackButtonClick } = usePostHog();
  
  const handleAppStoreClick = () => {
    trackButtonClick('app_download_appstore', { 
      section: 'app_download',
      platform: 'appstore',
      action: 'download'
    });
  };
  
  const handleGooglePlayClick = () => {
    trackButtonClick('app_download_googleplay', { 
      section: 'app_download',
      platform: 'googleplay',
      action: 'download'
    });
  };
  
  return (
    <Section bgColor="white" padding="default" style={{scrollMarginTop: '73px'}}>
      <Container className='flex flex-col gap-8 md:gap-12'>
        {/* Section Header */}
        <div className="text-center">
          <div className="text-xs sm:text-sm text-[#f57059] tracking-wider uppercase mb-3 sm:mb-4 font-manrope font-bold">
            Project Management App
          </div>
          <h2 className="text-[30px] lg:text-[40px] md:leading-[48px] leading-tight text-[#111827] mb-4 font-manrope font-extrabold text-center max-w-[701px] mx-auto">
            Download our app and start your free trail to get started today!
          </h2>
          <p className="text-[#757095] text-center font-manrope text-base lg:text-[20px] leading-[28px] lg:leading-[35px] tracking-[-0.4px] max-w-[701px] mx-auto">
            End-to-end payments and financial management in a single solution.
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          {/* App Store Button */}
          <button
            onClick={handleAppStoreClick}
            className="bg-[#f57059] hover:bg-[#e65a44] transition-colors rounded-[47px] h-[53px] px-8 flex items-center gap-3 text-white font-manrope font-semibold text-[16px] leading-[30px] tracking-[-0.32px] shadow-lg hover:shadow-xl"
          >
            <AppleLogo />
            <span>Playstore</span>
          </button>

          {/* Google Play Button */}
          <button
            onClick={handleGooglePlayClick}
            className="bg-[#05796b] hover:bg-[#046b5e] transition-colors rounded-[80px] h-[53px] px-8 flex items-center gap-3 text-white font-manrope font-semibold text-[16px] leading-[30px] tracking-[-0.32px] shadow-[0px_38px_50px_0px_rgba(5,121,107,0.2)] hover:shadow-[0px_38px_50px_0px_rgba(5,121,107,0.3)]"
          >
            <GooglePlayIcon />
            <span>Google Play</span>
          </button>
        </div>
      </Container>
    </Section>
  );
}

