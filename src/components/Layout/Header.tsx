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
      
      // Close mobile menu when scrolling
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      
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
  }, [lastScrollY, isMenuOpen]);

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
              <div className="flex items-center gap-1 max-h-[40px] w-full">
                <Link href="/">
                {(() => {
                  // Desktop: white logo by default, black logo when scrolling up
                  // Mobile: always use footer logo (black) since header is always white
                  const blackLogoUrl = footerData?.logo?.asset?.url;
                  const whiteLogoUrl = headerData?.logoImage?.asset?.url;
                  
                  // On desktop: use black logo when scrolling up, white logo otherwise
                  // On mobile: always use black logo
                  const shouldUseBlackLogo = isMobile 
                    ? !!blackLogoUrl 
                    : (isScrollingUp && lastScrollY > 10 && !!blackLogoUrl);
                  const shouldUseWhiteLogo = !isMobile && !shouldUseBlackLogo && !!whiteLogoUrl;
                  
                  if (shouldUseBlackLogo && footerData?.logo?.asset?.url) {
                    return (
                      <Image
                        src={footerData.logo.asset.url}
                        alt={footerData.logo.alt || 'Logo'}
                        width={100}
                        height={100}
                        className="object-cover max-h-[40px] w-full"
                      />
                    );
                  } else if (shouldUseWhiteLogo && headerData?.logoImage?.asset?.url) {
                    return (
                      <Image
                        src={headerData.logoImage.asset.url}
                        alt={headerData.logoImage.alt || 'Logo'}
                        width={100}
                        height={100}
                        className="object-cover max-h-[40px] w-full"
                      />
                    );
                  } else if (blackLogoUrl && footerData?.logo) {
                    // Fallback to footer logo if white logo not available
                    return (
                      <Image
                        src={footerData.logo.asset.url}
                        alt={footerData.logo.alt || 'Logo'}
                        width={100}
                        height={100}
                        className="object-cover max-h-[40px] w-full"
                      />
                    );
                  } else if (headerData?.logoText) {
                    // Filter out Opal Voice references
                    const logoText = headerData.logoText
                      .replace(/Opal Voice/gi, 'Zynva')
                      .replace(/opalvoice/gi, 'Zynva')
                      .replace(/opal voice/gi, 'Zynva');
                    return (
                      <div className={`text-sm sm:text-base text-black ${
                        hasWhiteBackground ? 'md:text-black' : 'md:text-white'
                      }`} style={{ fontFamily: 'var(--font-manrope)' }}>
                        <span className="font-semibold">{logoText}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#01b59e] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs sm:text-sm">N</span>
                      </div>
                    );
                  }
                })()}
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
                    const headerHeight = 73;
                    const elementPosition = servicesSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist ${
                  hasWhiteBackground ? 'text-black' : 'text-white'
                }`}
              >
                Services
              </a>
              {/* <a 
                href="#process"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Process Nav', '#process', { location: 'header' });
                  const processSection = document.getElementById('process');
                  if (processSection) {
                    const headerHeight = 73;
                    const elementPosition = processSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist ${
                  hasWhiteBackground ? 'text-black' : 'text-white'
                }`}
              >
                Process
              </a> */}
              <a 
                href="#testimonial"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Testimonial Nav', '#testimonial', { location: 'header' });
                  const testimonialSection = document.getElementById('testimonial');
                  if (testimonialSection) {
                    const headerHeight = 73;
                    const elementPosition = testimonialSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
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
                  type="animated"
                  link="#cta-section"
                  onClick={() => {
                    trackButtonClick('hero_cta', { 
                      section: 'hero',
                      button_text: 'Join Waiting List',
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
                  setTimeout(() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      const headerHeight = 73;
                      const elementPosition = servicesSection.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }, 100);
                }}
              >
                Services
              </a>
              <a 
                href="#testimonial"
                className="text-base font-medium leading-6 text-black hover:text-[#01b59e] transition-colors font-geist"
                onClick={(e) => {
                  e.preventDefault();
                  trackLinkClick('Testimonial Nav', '#testimonial', { location: 'mobile_menu' });
                  setIsMenuOpen(false);
                  setTimeout(() => {
                    const testimonialSection = document.getElementById('testimonial');
                    if (testimonialSection) {
                      const headerHeight = 73;
                      const elementPosition = testimonialSection.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }, 100);
                }}
              >
                Testimonial
              </a>
              {/* Mobile CTA Button */}
              {cta.scheduleLink && (
                <div className="pt-4">
                  <Button 
                    type="animated"
                    link="#cta-section"
                    onClick={() => {
                      trackButtonClick('mobile_header_cta', { 
                        location: 'mobile_menu', 
                        button_text: 'Join Waiting List',
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
                    <span>Join Waiting List</span>
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
