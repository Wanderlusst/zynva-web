'use client';

import React from 'react';

import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import { Container, Section, SectionHeader } from './structure';
import Button from './Button';
import VideoPlayer from './Media/VideoPlayer';

// Hardcoded process steps data
const processSteps = [
  {
    title: 'Data Migration',
    description: 'Seamlessly migrate your existing clinic data with our automated import tools. Transfer patient records, inventory, billing history, and more in just a few clicks.',
    videoUrl: 'https://cdn.sanity.io/files/jni56u7c/develop/fb2d9d006301f4600b753a0875559e963c3d3cc1.mp4'
  },
  {
    title: 'Quick Setup',
    description: 'Configure your clinic settings, staff roles, and preferences in minutes. Our intuitive interface makes setup effortless with guided wizards.',
    videoUrl: 'https://cdn.sanity.io/files/jni56u7c/develop/856f272ff375e829bcda12ba033c742e5318fa49.mp4'
  },
  {
    title: 'Manage Everything in 3 Clicks',
    description: 'Access all features from one dashboard. Manage patients, track revenue, monitor expenses, control inventory, and generate reports - everything you need in just 3 clicks.',
    videoUrl: 'https://cdn.sanity.io/files/jni56u7c/develop/099092de1cf4ed30a4e404e03a6975d25a094eac.mp4'
  }
];


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
              {/* Video Container */}
              <div className="relative flex items-center justify-center process-icon-container">
                <div className="relative size-[80px] flex items-center justify-center  rounded-full overflow-hidden">
                  <VideoPlayer
                    src={step.videoUrl}
                    className="w-full h-full object-cover rounded-full"
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    controls={false}
                  />
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

