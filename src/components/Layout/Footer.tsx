'use client';

import Image from 'next/image';
import Link from 'next/link';

import { usePostHog } from '@/hooks/usePostHog';
import type { FooterData } from '@/types/cms';
import { Container, Section } from '../structure';

interface FooterProps {
  footerData?: FooterData | null;
}

// Social media icons
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3333 0H1.66667C0.75 0 0 0.75 0 1.66667V18.3333C0 19.25 0.75 20 1.66667 20H18.3333C19.25 20 20 19.25 20 18.3333V1.66667C20 0.75 19.25 0 18.3333 0ZM6.25 16.6667H3.33333V7.5H6.25V16.6667ZM4.79167 6.25C3.91667 6.25 3.33333 5.66667 3.33333 4.79167C3.33333 3.91667 3.91667 3.33333 4.79167 3.33333C5.66667 3.33333 6.25 3.91667 6.25 4.79167C6.25 5.66667 5.66667 6.25 4.79167 6.25ZM16.6667 16.6667H13.75V12.0833C13.75 11.0417 13.75 9.79167 12.375 9.79167C10.9583 9.79167 10.7083 10.8333 10.7083 12.0833V16.6667H7.79167V7.5H10.625V8.75H10.6667C11.0417 8.08333 11.9167 7.375 13.3333 7.375C16.25 7.375 16.6667 9.58333 16.6667 12.7083V16.6667Z" fill="#181433"/>
  </svg>
);

const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.477 0 0 4.17 0 9.315c0 2.982 1.707 5.618 4.27 7.076V20l4.29-2.357c1.14.315 2.35.484 3.44.484 5.523 0 10-4.17 10-9.315C22 4.17 17.523 0 10 0zm5.565 7.5l-3.97 4.207-4.535-4.207L11.03 12l3.97-4.207L19.535 12l-3.97-4.5z" fill="#181433"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3333 4.75c-.683.3-1.417.5-2.183.592.783-.467 1.383-1.208 1.666-2.092-.733.433-1.542.75-2.408.917-.691-.733-1.675-1.192-2.758-1.192-2.083 0-3.775 1.692-3.775 3.775 0 .292.033.583.1.858-3.142-.158-5.925-1.658-7.783-3.933-.325.558-.508 1.208-.508 1.9 0 1.308.667 2.467 1.675 3.142-.617-.02-1.2-.192-1.708-.475v.042c0 1.833 1.308 3.358 3.042 3.708-.317.083-.65.133-1 .133-.242 0-.483-.025-.717-.075.483 1.508 1.883 2.608 3.542 2.633-1.3 1.017-2.933 1.625-4.708 1.625-.308 0-.608-.017-.908-.05 1.675 1.075 3.667 1.7 5.808 1.7 6.967 0 10.767-5.775 10.767-10.775 0-.167 0-.325-.008-.483.742-.533 1.383-1.2 1.892-1.958z" fill="#181433"/>
  </svg>
);

const TwooIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="#181433" strokeWidth="2" fill="none"/>
    <path d="M6 10L9 13L14 7" stroke="#181433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Hardcoded footer data
const footerLinks = {
  contact: {
    email: 'zynva@gmail.com',
    phone: '+91-9876543210'
  }
};

export default function Footer({ footerData }: FooterProps) {
  const { trackLinkClick } = usePostHog();
  
  return (
    <Section bgColor="white" className="relative overflow-hidden">
      {/* Background Ellipse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(205, 238, 221, 0.15) 0%, rgba(205, 238, 221, 0.05) 50%, transparent 100%)',
          }}
        />
      </div>
      
      <Container padding='small_xl' className='w-full relative z-10'>
        <div className="flex flex-col gap-8">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between">
            {/* Left Side - Logo and Description */}
            <div className="flex flex-col gap-4 md:max-w-[213px]">
              {/* Company Name */}
              <Link href="/" className="w-fit">
                {/* <h3 className="font-manrope font-bold text-[21px] text-[#1b1c31] leading-[28px] tracking-[-0.42px]">
                  {footerData?.companyName || footerData?.logoText || 'Zynva'}
                </h3> */}
                <Image src={footerData?.logo?.asset?.url || ''} alt={footerData?.logo?.alt || ''} width={100} height={100} />
                </Link>
              
              {/* Description */}
              <p className="font-manrope font-normal text-[16px] text-black/60 leading-[28px] tracking-[-0.32px]">
                {footerData?.description || 'All-in-one business management software for clinics. Manage patients, track revenue, monitor expenses, and control inventory from one smart dashboard.'}
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4 items-center">
                <Link 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackLinkClick('LinkedIn', 'https://www.linkedin.com/company/zynva/about/?viewAsMember=true', { location: 'footer' })}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </Link>
                {/* <Link 
                  href="https://messenger.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackLinkClick('Messenger', 'https://messenger.com', { location: 'footer' })}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Messenger"
                >
                  <MessengerIcon />
                </Link>
                <Link 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackLinkClick('Twitter', 'https://twitter.com', { location: 'footer' })}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </Link>
                <Link 
                  href="https://twoo.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackLinkClick('Twoo', 'https://twoo.com', { location: 'footer' })}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Twoo"
                >
                  <TwooIcon />
                </Link> */}
              </div>
            </div>

            {/* Right Side - Contact Us */}
            <div className="flex flex-col gap-[12px]">
              <h4 className="font-manrope font-bold text-[21px] text-[#181433] leading-[24px]">
                Contact Us
              </h4>
              <div className="flex flex-col gap-[12px]">
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="font-manrope font-normal text-[16px] text-[#181433] leading-[24px] hover:text-[#05796b] transition-colors flex items-center gap-2"
                  onClick={() => trackLinkClick('Email', `mailto:${footerLinks.contact.email}`, { location: 'footer' })}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3H14V3.5L7.5 7.75L1 3.5V3ZM1 4.25L7.5 8.5L14 4.25V12H1V4.25Z" fill="#181433"/>
                  </svg>
                  {footerLinks.contact.email}
                </a>
                <a
                  href={`tel:${footerLinks.contact.phone.replace(/-/g, '')}`}
                  className="font-manrope font-normal text-[16px] text-[#181433] leading-[24px] hover:text-[#05796b] transition-colors flex items-center gap-2"
                  onClick={() => trackLinkClick('Phone', `tel:${footerLinks.contact.phone}`, { location: 'footer' })}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.65432 1.08108C3.78261 0.698864 4.18284 0.5 4.5 0.5H10.5C10.8172 0.5 11.2174 0.698864 11.3457 1.08108L12.8457 5.58108C12.9739 5.96329 12.8172 6.5 12.5 6.5H11V12.5C11 12.7761 10.7761 13 10.5 13H4.5C4.22386 13 4 12.7761 4 12.5V6.5H2.5C2.18284 6.5 2.02609 5.96329 2.15432 5.58108L3.65432 1.08108ZM4.72386 1.5L3.42386 5.5H4.5V12.5H10.5V5.5H11.5761L10.2761 1.5H4.72386Z" fill="#181433"/>
                  </svg>
                  {footerLinks.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="bg-[#f8f8fe] h-[2px] w-full" />

          {/* Copyright */}
          <div className="flex items-center justify-center ">
            <p className=" font-normal text-base font-geist text-[#181433] leading-[26px] tracking-[-0.48px] text-center capitalize">
              Copyright @ {new Date().getFullYear()} Zynva. All Rights Reserved.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
