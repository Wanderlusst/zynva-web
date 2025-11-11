'use client';

import React from 'react';

import { Container, Section, SectionHeader } from './structure';

// Service card data
const services = [
  {
    title: 'Project Management',
    options: '30 options available',
    icon: 'grid'
  },
  {
    title: 'Design & Creatives',
    options: '13 options available',
    icon: 'gem'
  },
  {
    title: 'Web & Mobile Development',
    options: '40 options available',
    icon: 'pen'
  },
  {
    title: 'Marketing & Communication',
    options: '27 options available',
    icon: 'lightning'
  },
  {
    title: 'Customer Support',
    options: '17 options available',
    icon: 'headset'
  },
  {
    title: 'Business Development',
    options: '22 options available',
    icon: 'briefcase'
  },
  {
    title: 'Human Resources',
    options: '21 options available',
    icon: 'people'
  },
  {
    title: '+4 More',
    options: '170+ options available',
    icon: null,
    isSpecial: true
  }
];

// Icon components
const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="black" strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="black" strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="black" strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="black" strokeWidth="2"/>
  </svg>
);

const GemIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 22L22 7L12 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20H21M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.5626 2.87868 19.1022 3.10218 19.5 3.5C19.8978 3.89782 20.1213 4.43739 20.1213 5C20.1213 5.56261 19.8978 6.10218 19.5 6.5L7 19L2 20L3 15L16.5 1.5C16.8978 1.10218 17.4374 0.878683 18 0.878683C18.5626 0.878683 19.1022 1.10218 19.5 1.5L16.5 3.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LightningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeadsetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18V12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C17.4696 21 16.9609 20.7893 16.5858 20.4142C16.2107 20.0391 16 19.5304 16 19V16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H21V19ZM3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H6C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19V16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14H3V19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="black" strokeWidth="2"/>
    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="black" strokeWidth="2"/>
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

const getIcon = (iconName: string | null) => {
  if (!iconName) return null;
  
  switch (iconName) {
    case 'grid':
      return <GridIcon />;
    case 'gem':
      return <GemIcon />;
    case 'pen':
      return <PenIcon />;
    case 'lightning':
      return <LightningIcon />;
    case 'headset':
      return <HeadsetIcon />;
    case 'briefcase':
      return <BriefcaseIcon />;
    case 'people':
      return <PeopleIcon />;
    default:
      return null;
  }
};

export default function ServicesSection() {
  return (
    <Section bgColor="white" padding="default" style={{scrollMarginTop: '73px'}}>
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
              className={`rounded-[15px] h-[237px] p-6 flex flex-col gap-4 ${
                service.isSpecial
                  ? 'bg-[#cdeedd] text-black'
                  : 'bg-[#ffd9d0] border border-[#e7e7e7]'
              }`}
            >
              {!service.isSpecial && (
                <>
                  {/* Icon Container */}
                  <div className="bg-[#fffefc] rounded-[5px] size-[40px] flex items-center justify-center">
                    {getIcon(service.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="font-manrope font-bold text-[20px] text-black leading-[28px] tracking-[-0.4px]">
                    {service.title.split(' ').map((word, i, arr) => (
                      <React.Fragment key={i}>
                        {word}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>

                  {/* Options */}
                  <p className="font-manrope font-medium text-[12px] text-[#757095] leading-[30px] tracking-[-0.24px]">
                    {service.options}
                  </p>
                </>
              )}

              {service.isSpecial && (
                <div className="flex flex-col justify-center items-center h-full gap-2">
                  <p className="font-manrope font-bold text-[33px] text-black leading-[28px] tracking-[-0.66px]">
                    {service.title}
                  </p>
                  <p className="font-manrope font-bold text-[30px] text-black leading-[28px] tracking-[-0.6px]">
                    More
                  </p>
                  <p className="font-manrope font-medium text-[12px] text-black leading-[30px] tracking-[-0.24px]">
                    {service.options}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

