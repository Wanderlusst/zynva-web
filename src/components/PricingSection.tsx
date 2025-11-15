'use client';

import React from 'react';

import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import { Container, Section, SectionHeader } from './structure';
import Button from './Button';

// Check icon component
const CheckIcon = ({ className = '' }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
  </svg>
);

// Cross icon component
const CrossIcon = ({ className = '' }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="currentColor"/>
  </svg>
);

// Hardcoded pricing plans data
const pricingPlans = [
  {
    name: 'BASIC PLAN',
    price: '$0',
    period: 'Per month',
    description: 'Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured.',
    features: [
      { text: 'Customer Support', included: true },
      { text: 'Free User Account', included: true },
      { text: 'Monthly Reports', included: false },
      { text: 'Multiple Devices', included: false }
    ],
    buttonText: 'Join for free',
    buttonType: 'secondary' as const,
    isPremium: false
  },
  {
    name: 'PREMIUM PLAN',
    price: '$49',
    period: 'Per month',
    description: 'On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe.',
    features: [
      { text: 'Customer Support', included: true },
      { text: 'Upto 10 Users', included: true },
      { text: 'Monthly Reports', included: true },
      { text: 'Multiple Devices Supported', included: true }
    ],
    buttonText: 'Get the premium',
    buttonType: 'primaryV3' as const,
    isPremium: true,
    badge: 'Best choice'
  }
];

export default function PricingSection() {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  
  return (
    <Section bgColor="white" padding="default" style={{scrollMarginTop: '73px'}}>
      <Container className='flex flex-col gap-12 md:gap-16'>
        {/* Section Header */}
        <SectionHeader
          heading="Start today, with free or premium plan, you choose"
          description="With lots of unique and useful features, you can easily manage your wallet easily without any problem."
        />

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[32px] relative">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col gap-8 p-8 rounded-2xl w-full md:w-[362px] ${
                plan.isPremium 
                  ? 'bg-[#05796b] text-white shadow-[0px_8px_80px_0px_rgba(5,121,107,0.32)]' 
                  : 'bg-white text-[#282828] shadow-[0px_8px_80px_0px_rgba(167,167,167,0.24)]'
              }`}
            >
              {/* Badge for premium plan */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#282828] px-8 py-4 rounded-[80px]">
                  <p className="font-manrope font-medium text-[14px] text-white tracking-[-0.7px]">
                    {plan.badge}
                  </p>
                </div>
              )}

              {/* Plan Name */}
              <p className={`font-manrope font-medium text-[16px] tracking-[0.96px] uppercase ${
                plan.isPremium ? 'text-white' : 'text-[#05796b]'
              }`}>
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className={`font-manrope font-bold text-[64px] leading-[1.15] ${
                    plan.isPremium ? 'text-white' : 'text-[#282828]'
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`font-manrope font-bold text-[16px] tracking-[-0.8px] ${
                    plan.isPremium ? 'text-white' : 'text-[#8593a3]'
                  }`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className={`font-manrope font-medium text-[16px] leading-[2] tracking-[-0.8px] ${
                plan.isPremium ? 'text-white' : 'text-[#8593a3]'
              }`}>
                {plan.description}
              </p>

              {/* Divider */}
              <div className={`h-px w-full ${
                plan.isPremium ? 'bg-[rgba(255,255,255,0.16)]' : 'bg-[rgba(133,147,163,0.16)]'
              }`} />

              {/* Features List */}
              <div className="flex flex-col gap-4">
                {plan.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex} 
                    className={`flex gap-5 items-center ${
                      !feature.included ? 'opacity-64' : ''
                    }`}
                  >
                    {feature.included ? (
                      <CheckIcon className={plan.isPremium ? 'text-white' : 'text-[#05796b]'} />
                    ) : (
                      <CrossIcon className={plan.isPremium ? 'text-white' : 'text-[#ff6954]'} />
                    )}
                    <p className={`font-manrope font-medium text-[16px] leading-[2] tracking-[-0.8px] ${
                      plan.isPremium ? 'text-white' : 'text-[#8593a3]'
                    }`}>
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {plan.isPremium ? (
                <Button
                  type="animated"
                  link={cta.scheduleLink ? "#cta-section" : undefined}
                  onClick={() => {
                    trackButtonClick('pricing_premium_cta', { 
                      section: 'pricing',
                      plan: 'premium',
                      action: 'get_premium'
                    });
                    const ctaSection = document.getElementById('cta-section');
                    if (ctaSection) {
                      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="bg-white text-[#282828] hover:opacity-90 border border-[rgba(255,255,255,0.32)]"
                >
                  <span className="text-[#282828]">{plan.buttonText}</span>
                </Button>
              ) : (
                <button
                  className={`w-full border rounded-[80px] px-8 py-4 flex items-center justify-center font-manrope font-semibold text-[18px] tracking-[-0.9px] transition-all ${
                    plan.isPremium
                      ? 'bg-white text-[#282828] border-[rgba(255,255,255,0.32)]'
                      : 'border-[rgba(133,147,163,0.32)] text-[#8593a3] hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    trackButtonClick('pricing_basic_cta', { 
                      section: 'pricing',
                      plan: 'basic',
                      action: 'join_free'
                    })
                  }}
                >
                  {plan.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

