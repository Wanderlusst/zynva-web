'use client';

import React from 'react';

import { Container, Section, SectionHeader } from './structure';
import Button from './Button';
import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';

// Service card data
const services = [
  {
    title: 'Patient Management',
    options: 'Keep track of every visit, treatment, and history effortlessly. Manage appointments, follow-ups, and patient data in one place.',
    icon: 'patient'
  },
  {
    title: 'Revenue & Expense Tracking',
    options: 'In every business, it\'s essential to know where your money goes. Zynva helps you track revenue and expenses effortlessly, giving you clear insights into where you spend more - and how to grow smarter',
    icon: 'money'
  },
  {
    title: 'Inventory Management',
    options: 'Never run out of essential or fast-selling products again. Track stock levels, usage, and availability in real time - effortlessly.',
    icon: 'inventory'
  },
  {
    title: 'Business Insights',
    options: 'Make data-driven decisions with real-time analytics. Understand your growth, top services, and profit trends.',
    icon: 'chart'
  },
  {
    title: 'Staff & Role Management',
    options: 'Assign roles, set permissions, and monitor staff performance with ease. Keep your team organized, secure, and productive.',
    icon: 'people'
  },
  {
    title: 'Billing & PDF Downloads',
    options: 'Simplify your billing process with accuracy and speed. Generate professional invoices, track payments, and download detailed PDF reports instantly for seamless recordkeeping and compliance.',
    icon: 'document'
  },

];

// Icon components
const PatientIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9H15M12 6V12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MoneyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="black" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" stroke="black" strokeWidth="2"/>
    <path d="M6 10H6.01M18 14H18.01" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const InventoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7L3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 11H16M8 15H16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3V21H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 16L11 12L15 8L21 14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 14H15V8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8M16 17H8M10 9H8" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PeopleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const getIcon = (iconName: string | null) => {
  if (!iconName) return null;
  
  switch (iconName) {
    case 'patient':
      return <PatientIcon />;
    case 'money':
      return <MoneyIcon />;
    case 'inventory':
      return <InventoryIcon />;
    case 'chart':
      return <ChartIcon />;
    case 'people':
      return <PeopleIcon />;
    case 'document':
      return <DocumentIcon />;
    case 'plus':
      return <PlusIcon />;
    default:
      return null;
  }
};

export default function ServicesSection() {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  return (
    <Section id="services" bgColor="white" padding="default" style={{scrollMarginTop: '73px'}}>
      <Container className='flex flex-col gap-12 md:gap-16'>
        {/* Section Header */}
        <SectionHeader
          subheading="Our Services"
          heading="Save Time Managing Your Business With Our Best Services"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`rounded-[15px] min-h-[237px] p-6 flex flex-col gap-4 ${
                'bg-[#f6f6f7] border border-[#e7e7e7]'
              }`}
            >
                <>
                  {/* Icon Container */}
                  <div className=" rounded-[5px] size-[40px] flex items-center justify-center">
                    {getIcon(service.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="font-manrope font-bold text-xl text-black leading-[1.15] tracking-[-0.4px]">
                    {service.title}
                  </h3>

                  {/* Options */}
                  <p className="font-manrope font-medium text-base text-black/60 leading-normal tracking-[0.6px]  overflow-hidden">
                    {service.options}
                  </p>
                </>
              


            </div>
          ))}
        </div>

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

