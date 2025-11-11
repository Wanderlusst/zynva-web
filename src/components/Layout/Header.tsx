'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useCTA } from '@/contexts/CTAContext';
import { usePostHog } from '@/hooks/usePostHog';
import { urlFor } from '@/lib/sanity';
import type { HeaderData } from '@/types/cms';
import Button from '../Button';
import Link from 'next/link';
import useMediaQuery from '../mediaHook';

interface HeaderProps {
  headerData?: HeaderData | null;
}

export default function Header({ headerData }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { trackButtonClick, trackLinkClick } = usePostHog();
  const { cta } = useCTA();
  const isMobile = useMediaQuery(768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={` w-full fixed top-0 left-0    z-[9999] ${isMobile ? 'bg-white' : (isScrolled ? 'bg-white' : 'bg-transparent')}`}>
      <div className="w-full  py-3 md:px-12 px-4 ">
        <div className="flex items-center justify-between w-full">
          {/* Logo Section */}
          <div className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              {/* Logo - using CMS data or placeholder */}
              <div className="flex items-center gap-1 max-h-[40px] w-full">
                <Link href="/">
                {headerData?.logo?.asset?.url ? (
                    <Image
                      src={headerData.logo.asset.url}
                      alt={headerData.logo.alt || 'Logo'}
                      width={100}
                      height={100}
                      className="object-cover max-h-[40px] w-full"
                    />
                ) : headerData?.logoText ? (
                  <div className="text-gray-900 text-sm sm:text-base" style={{ fontFamily: 'var(--font-manrope)' }}>
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
              {headerData?.navigation && headerData.navigation.length > 0 ? (
                headerData.navigation.map((item, index) => {
                  // Convert hash links to main page links
                  const url = item.url.startsWith('#') ? `/${item.url}` : item.url
                  return (
                    <a 
                      key={index}
                      href={url} 
                      onClick={() => trackLinkClick(item.label, item.url, { location: 'header' })}
                      className="text-[#101828] text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist"
                    >
                      {item.label}
                    </a>
                  )
                })
              ) : (
                // Fallback navigation
                <>
                  <a 
                    href="/#features" 
                    onClick={() => trackLinkClick('Features Nav', '#features', { location: 'header' })}
                    className="text-[#101828] text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist"
                  >
                    Features
                  </a>
                  <a 
                    href="/#integrations" 
                    onClick={() => trackLinkClick('Integrations Nav', '#integrations', { location: 'header' })}
                    className="text-[#101828] text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist"
                  >
                    Integrations
                  </a>
                  <a 
                    href="/#faqs" 
                    onClick={() => trackLinkClick('FAQs Nav', '#faqs', { location: 'header' })}
                    className="text-[#101828] text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist"
                  >
                    FAQs
                  </a>
                </>
              )}
            </nav>
          </div>

          {/* Right Section - CTA Button and Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
            {/* CTA Button - Hidden on small screens, visible on medium+ */}
            {cta.scheduleLink && (
              <Button 
                type="primary"
                link="/schedule"
                target="_blank"
                onClick={() => {
                  trackButtonClick('header_cta', { 
                    location: 'header', 
                    button_text: headerData?.ctaButton?.text || cta.primaryButtonText,
                    action: 'schedule_walkthrough'
                  })
                }}
                className="hidden sm:block"
                size="sm"
              >
                <span>{headerData?.ctaButton?.text || cta.primaryButtonText}</span>
              </Button>
            )}

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
                <div className="w-full h-0.5 bg-gray-900"></div>
                <div className="w-full h-0.5 bg-gray-900"></div>
                <div className="w-full h-0.5 bg-gray-900"></div>
              </div>
            </button>
          </div>
        </div>

            {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4 pt-4">
              {headerData?.navigation && headerData.navigation.length > 0 ? (
                headerData.navigation.map((item, index) => {
                  // Convert hash links to main page links
                  const url = item.url.startsWith('#') ? `/${item.url}` : item.url
                  return (
                    <a 
                      key={index}
                      href={url} 
                      className="text-[#101828] text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist"
                      onClick={() => {
                        trackLinkClick(item.label, item.url, { location: 'mobile_menu' });
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  )
                })
              ) : (
                // Fallback navigation
                <>
                  <a 
                    href="/#features" 
                    className="text-[#101828] text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist"
                    onClick={() => {
                      trackLinkClick('Features Nav', '#features', { location: 'mobile_menu' });
                      setIsMenuOpen(false);
                    }}
                  >
                    Features
                  </a>
                  <a 
                    href="/#integrations" 
                    className="text-[#101828] text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist"
                    onClick={() => {
                      trackLinkClick('Integrations Nav', '#integrations', { location: 'mobile_menu' });
                      setIsMenuOpen(false);
                    }}
                  >
                    Integrations
                  </a>
                  <a 
                    href="/#faqs" 
                    className="text-[#101828] text-base font-medium leading-6 hover:text-[#01b59e] transition-colors font-geist"
                    onClick={() => {
                      trackLinkClick('FAQs Nav', '#faqs', { location: 'mobile_menu' });
                      setIsMenuOpen(false);
                    }}
                  >
                    FAQs
                  </a>
                </>
              )}
              {/* Mobile CTA Button */}
              {cta.scheduleLink && (
                <div className="pt-4">
                  <Button 
                    type="primary"
                    link="/schedule"
                    target="_blank"
                    onClick={() => {
                      trackButtonClick('mobile_header_cta', { 
                        location: 'mobile_menu', 
                        button_text: headerData?.ctaButton?.text || cta.primaryButtonText,
                        action: 'schedule_walkthrough'
                      })
                    }}
                    className="w-full"
                    size="sm"
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
