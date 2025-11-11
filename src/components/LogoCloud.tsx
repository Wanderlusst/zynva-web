'use client';

import Image from 'next/image';
import type { LogoCloudData } from '@/types/cms';

interface LogoCloudProps {
  logoCloudData?: LogoCloudData | null;
}

export default function LogoCloud({ logoCloudData }: LogoCloudProps) {
  // Use CMS data if available, otherwise don't render
  const logos = logoCloudData?.logos || [];
  
  // Don't render if no data
  if (!logoCloudData || logos.length === 0) {
    return null;
  }
  return (
    <div className="bg-[#f9f9f9] py-4 sm:py-6 overflow-hidden w-full">
      <div className="relative w-full overflow-hidden">
        {/* Marquee Container */}
        <div 
          className="flex whitespace-nowrap animate-marquee" 
          style={{ width: 'max-content' }}
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-12 flex-shrink-0"
            >
              {(() => {
                // Support both shapes: logo.url and logo.asset.url
                const logoUrl = (logo as any)?.logo?.url || logo.logo?.asset?.url || null
                if (!logoUrl) return null
                return (
                <div 
                  className="relative w-full h-full" 
                
                >
                  <Image
                    src={logoUrl}
                    alt={logo.name}
                    width={100}
                    height={100}
                    className="object-cover w-full  max-h-[40px] filter grayscale hover:grayscale-0 transition-all duration-300"
                    title={logo.name}
                  />
                </div>
                )
              })()}
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center justify-center mx-4 sm:mx-6 md:mx-8 lg:mx-12 flex-shrink-0"
            >
              {(() => {
                const logoUrl = (logo as any)?.logo?.url || logo.logo?.asset?.url || null
                if (!logoUrl) return null
                return (
                <div 
                  className="relative w-full h-full" 
          
                >
                  <Image
                    src={logoUrl}
                    alt={logo.name}
                    className="object-cover filter grayscale hover:grayscale-0 transition-all duration-300 w-full  max-h-[40px]"
                    title={logo.name}
                    width={100}
                    height={100}
                  />
                </div>
                )
              })()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
