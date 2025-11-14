'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useCTA } from '@/contexts/CTAContext';
import { usePostHog } from '@/hooks/usePostHog';
import type { HeaderData, FooterData } from '@/types/cms';
import Button from '../Button';
import Link from 'next/link';
import useMediaQuery from '../mediaHook';

interface HeaderProps {
  headerData?: HeaderData | null;
  footerData?: FooterData | null;
}

export default function Header({ headerData, footerData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { trackButtonClick, trackLinkClick } = usePostHog();
  const { cta } = useCTA();
  const isMobile = useMediaQuery(768);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
        setIsScrollingUp(false);
      } 
      // Show header when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
        setIsScrollingUp(true);
      } 
      // Hide header when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsScrollingUp(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const hasWhiteBackground = isScrollingUp && lastScrollY > 10;

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-[9999] transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } bg-[#faf6f5] ${
        hasWhiteBackground ? 'md:bg-[#faf6f5]' : 'md:bg-transparent'
      } ${
        isMenuOpen ? 'shadow-lg' : ''
      }`}
    >
      <div className="w-full py-3 md:px-12 px-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo Section */}
          <div className="flex items-center ">
            <div className="flex items-center gap-2">
              {/* Logo - using CMS data or placeholder */}
              <div className="flex items-center gap-1 max-h-[40px] w-full">
                <Link href="/">
                {footerData?.logo?.asset?.url ? (
                  // Always use footer logo on mobile (header is white), conditionally on desktop
                  <Image
                    src={footerData.logo.asset.url}
                    alt={footerData.logo.alt || 'Logo'}
                    width={100}
                    height={100}
                    className="object-cover max-h-[40px] w-full"
                  />
                ) : headerData?.logoImage?.asset?.url ? (
                  <Image
                    src={headerData.logoImage.asset.url}
                    alt={headerData.logoImage.alt || 'Logo'}
                    width={100}
                    height={100}
                    className="object-cover max-h-[40px] w-full"
                  />
                ) : headerData?.logoText ? (
                  <div className={`text-sm sm:text-base text-black ${
                    hasWhiteBackground ? 'md:text-black' : 'md:text-white'
                  }`} style={{ fontFamily: 'var(--font-manrope)' }}>
                    <span className="font-semibold">{headerData.logoText}</span>
                  </div>
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#01b59e] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">N</span>
                  </div>
                )}
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <nav className="flex items-center gap-6">
              {/* Hardcoded menu items */}
              <a 
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Services Nav', '#services', { location: 'header' });
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist ${
                  hasWhiteBackground ? 'text-black' : 'text-white'
                }`}
              >
                Services
              </a>
              <a 
                href="#process"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Process Nav', '#process', { location: 'header' });
                  const processSection = document.getElementById('process');
                  if (processSection) {
                    processSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist ${
                  hasWhiteBackground ? 'text-black' : 'text-white'
                }`}
              >
                Process
              </a>
              <a 
                href="#testimonial"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Testimonial Nav', '#testimonial', { location: 'header' });
                  const testimonialSection = document.getElementById('testimonial');
                  if (testimonialSection) {
                    testimonialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist ${
                  hasWhiteBackground ? 'text-black' : 'text-white'
                }`}
              >
                Testimonial
              </a>
            </nav>
          </div>

          {/* Right Section - CTA Button and Language Selector */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 ">
            {/* CTA Button - Hidden on mobile, visible on medium+ */}
            <div className="hidden md:flex gap-[18px] md:pt-0 pt-2 items-start">
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

            {/* Language Selector - Hidden on small screens */}
            {/* <div className="hidden sm:block border border-gray-200 rounded-lg p-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">US</span>
                </div>
              </div>
            </div> */}

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1">
                <div className="w-full h-0.5 bg-black md:bg-white"></div>
                <div className="w-full h-0.5 bg-black md:bg-white"></div>
                <div className="w-full h-0.5 bg-black md:bg-white"></div>
              </div>
            </button>
          </div>
        </div>

            {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 border-t bg-[#faf6f5] ${hasWhiteBackground ? 'border-gray-300' : 'border-gray-200'}`}>
            <nav className="flex flex-col gap-4 pt-4 items-center text-center">
              {/* Hardcoded menu items */}
              <a 
                href="#services"
                className="text-base font-medium leading-6 text-black hover:text-[#01b59e] transition-colors font-geist"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Services Nav', '#services', { location: 'mobile_menu' });
                  setIsMenuOpen(false);
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Services
              </a>
              <a 
                href="#process"
                className="text-base font-medium leading-6 text-black hover:text-[#01b59e] transition-colors font-geist"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Process Nav', '#process', { location: 'mobile_menu' });
                  setIsMenuOpen(false);
                  const processSection = document.getElementById('process');
                  if (processSection) {
                    processSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Process
              </a>
              <a 
                href="#testimonial"
                className="text-base font-medium leading-6 text-black hover:text-[#01b59e] transition-colors font-geist"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Testimonial Nav', '#testimonial', { location: 'mobile_menu' });
                  setIsMenuOpen(false);
                  const testimonialSection = document.getElementById('testimonial');
                  if (testimonialSection) {
                    testimonialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Testimonial
              </a>
              {/* Mobile CTA Button */}
              {cta.scheduleLink && (
                <div className="pt-4">
                  <Button 
                    type="primaryV3"
                    link="#cta-section"
                    onClick={() => {
                      trackButtonClick('mobile_header_cta', { 
                        location: 'mobile_menu', 
                        button_text: headerData?.ctaButton?.text || cta.primaryButtonText,
                        action: 'schedule_walkthrough'
                      });
                      setIsMenuOpen(false);
                      const ctaSection = document.getElementById('cta-section');
                      if (ctaSection) {
                        ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="w-full"
                  >
                    <span>{headerData?.ctaButton?.text || cta.primaryButtonText}</span>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
