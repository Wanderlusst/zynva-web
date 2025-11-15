'use client';

import React from 'react';

import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import { Container, Section, SectionHeader } from './structure';
import Button from './Button';

// Hardcoded process steps data
const processSteps = [
  {
    title: 'Data Migration',
    description: 'Seamlessly migrate your existing clinic data with our automated import tools. Transfer patient records, inventory, billing history, and more in just a few clicks.',
    icon: 'profile-circle'
  },
  {
    title: 'Quick Setup',
    description: 'Configure your clinic settings, staff roles, and preferences in minutes. Our intuitive interface makes setup effortless with guided wizards.',
    icon: 'setting-2'
  },
  {
    title: 'Manage Everything in 3 Clicks',
    description: 'Access all features from one dashboard. Manage patients, track revenue, monitor expenses, control inventory, and generate reports - everything you need in just 3 clicks.',
    icon: 'flash'
  }
];

// Icon SVG components
const ProfileIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 40C48.2843 40 55 33.2843 55 25C55 16.7157 48.2843 10 40 10C31.7157 10 25 16.7157 25 25C25 33.2843 31.7157 40 40 40Z" fill="black"/>
    <path d="M40 45C28.9543 45 20 53.9543 20 65V70H60V65C60 53.9543 51.0457 45 40 45Z" fill="black"/>
  </svg>
);

const SettingIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 50C45.5228 50 50 45.5228 50 40C50 34.4772 45.5228 30 40 30C34.4772 30 30 34.4772 30 40C30 45.5228 34.4772 50 40 50Z" stroke="black" strokeWidth="2"/>
    <path d="M40 20V10M40 70V60M20 40H10M70 40H60M25.86 25.86L18.64 18.64M61.36 61.36L54.14 54.14M25.86 54.14L18.64 61.36M61.36 18.64L54.14 25.86" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FlashIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45 10L25 45H40L35 70L55 35H40L45 10Z" fill="black"/>
  </svg>
);

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'profile-circle':
      return <ProfileIcon />;
    case 'setting-2':
      return <SettingIcon />;
    case 'flash':
      return <FlashIcon />;
    default:
      return <ProfileIcon />;
  }
};

export default function ProcessSection() {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  
  return (
    <Section id="process" bgColor="gray" padding="default" style={{scrollMarginTop: '73px'}}>
      <Container className='flex flex-col gap-12 md:gap-16'>
        {/* Section Header */}
        <SectionHeader
          heading="Get Started with Zynva in 3 Simple Steps"
          description="Migrate your data, complete quick setup, and start managing your entire clinic operations effortlessly. Everything you need, accessible in just 3 clicks."
        />

        {/* Process Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 relative">
          {processSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-[54px] relative w-full md:w-auto max-w-[320px]">
              {/* Icon Container */}
              <div className={`relative rounded-[80px] size-[160px] flex items-center justify-center process-icon-container ${
                index % 2 === 0 
                  ? 'bg-[#ffd9cf]' 
                  : 'bg-[#cdeedd]'
              }`}>
                <div className="relative size-[80px] flex items-center justify-center process-icon">
                  {getIcon(step.icon)}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 items-center text-center">
                <h3 className="font-manrope font-semibold text-[24px] text-[#282828] leading-[1.15] tracking-[-1.2px]">
                  {step.title}
                </h3>
                <p className="font-manrope font-normal text-[16px] text-black/60 leading-[32px] tracking-[-0.32px] whitespace-pre-wrap max-w-[320px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {cta.scheduleLink && (
          <div className="text-center flex justify-center pt-4">
            <Button 
              type="animated"
              link="#cta-section"
              onClick={() => {
                trackButtonClick('process_section_walkthrough', { 
                  section: 'process',
                  action: 'schedule_walkthrough'
                });
                const ctaSection = document.getElementById('cta-section');
                if (ctaSection) {
                  ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <span>Join Waiting List</span>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}

