'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import { Container, Section, SectionHeader } from './structure';
import Button from './Button';

// Hardcoded testimonials data
const testimonials = [
  {
    authorName: 'Danial H',
    authorTitle: 'CEO GetNextDesign',
    testimonial: 'Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now.',
    rating: 5,
    imageUrl: null // Will use placeholder
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 0L17.8856 9.2918L27.5 10.2918L20.3072 16.7082L22.1928 26.2082L14.5 21L6.80718 26.2082L8.69282 16.7082L1.5 10.2918L11.1144 9.2918L14.5 0Z"
            fill={i < rating ? '#FFD700' : '#E5E7EB'}
          />
        </svg>
      ))}
    </div>
  );
};

// Quote icon component
const QuoteIcon = () => (
  <svg width="31" height="27" viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0ZM12.5 20C8.91015 20 6 17.0899 6 13.5C6 9.91015 8.91015 7 12.5 7C16.0899 7 19 9.91015 19 13.5C19 17.0899 16.0899 20 12.5 20Z" fill="#1B1C31"/>
  </svg>
);

// Arrow icons
const LeftArrow = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="white" className="shadow-lg"/>
    <path d="M35 20L25 30L35 40" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RightArrow = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="white" className="shadow-lg"/>
    <path d="M25 20L35 30L25 40" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function TestimonialsSection() {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentTestimonial = testimonials[currentIndex];
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    trackButtonClick('testimonial_navigation', { 
      section: 'testimonials',
      action: 'previous',
      index: currentIndex
    });
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    trackButtonClick('testimonial_navigation', { 
      section: 'testimonials',
      action: 'next',
      index: currentIndex
    });
  };
  
  return (
    <Section bgColor="white" padding="default" style={{scrollMarginTop: '73px'}}>
      <Container className='flex flex-col gap-12 md:gap-16 relative'>
        {/* Section Header */}
        <SectionHeader
          subheading="Testimonials"
          heading="Check what our clients are saying"
        />

        {/* Testimonial Content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
          {/* Left Side - Image */}
          <div className="relative w-full md:w-[402px] h-[479px] rounded-2xl overflow-hidden bg-[#e8f2ff] flex-shrink-0">
            {/* Placeholder for image - you can replace with actual image */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <div className="text-6xl">👤</div>
            </div>
            {/* Navigation Arrow - Left */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hover:opacity-80 transition-opacity"
              aria-label="Previous testimonial"
            >
              <LeftArrow />
            </button>
            {/* Navigation Arrow - Right */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hover:opacity-80 transition-opacity"
              aria-label="Next testimonial"
            >
              <RightArrow />
            </button>
          </div>

          {/* Right Side - Testimonial Text */}
          <div className="flex flex-col gap-6 md:max-w-[554px]">
            {/* Quote Icon */}
            <div className="mb-2">
              <QuoteIcon />
            </div>

            {/* Star Rating */}
            <div className="mb-4">
              <StarRating rating={currentTestimonial.rating} />
            </div>

            {/* Testimonial Text */}
            <p className="font-manrope font-bold text-[30px] text-[#1b1c31] leading-[41px] tracking-[-0.6px] mb-6">
              {currentTestimonial.testimonial}
            </p>

            {/* Author Info */}
            <div className="flex flex-col gap-2">
              <p className="font-manrope font-bold text-[20px] text-black leading-[30px] tracking-[-0.6px]">
                {currentTestimonial.authorName}
              </p>
              <p className="font-manrope font-medium text-[16px] text-[#757095] leading-[24px] tracking-[-0.32px]">
                {currentTestimonial.authorTitle}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {cta.scheduleLink && (
          <div className="text-center flex justify-center pt-4">
            <Button 
              type="primaryV3"
              link="/schedule"
              target="_blank"
              onClick={() => {
                trackButtonClick('testimonials_section_walkthrough', { 
                  section: 'testimonials',
                  action: 'schedule_walkthrough'
                })
              }}
            >
              <span>Schedule a Walkthrough</span>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}

