'use client';

import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import { Container, Section, SectionHeader } from './structure';
import Button from './Button';
import type { TestimonialsSectionData, TestimonialItem } from '@/types/cms'
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  testimonialsSection?: TestimonialsSectionData | null
}

export default function TestimonialSection({ testimonialsSection }: Props) {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  const testimonials: TestimonialItem[] = testimonialsSection?.testimonials || []
  const first = Array.isArray(testimonials) && testimonials.length > 0 ? testimonials[0] : null

  if (!first) {
    return null
  }

  // Prefer section-provided copy; fall back to sensible defaults
  const getHeading = () => {
    if (testimonialsSection?.headlineRich && testimonialsSection.headlineRich.length > 0) {
      return testimonialsSection.headlineRich
    }
    return testimonialsSection?.headline || 'What our customers say'
  }

  const getDescription = () => {
    return testimonialsSection?.description || "Teams trust Neo to streamline workflows and deliver better patient outcomes."
  }

  return (
    <Section bgColor="gray" padding="default">
      <Container className="relative z-10 w-full md:gap-16 gap-12 md:!pb-24 ">
        <SectionHeader
          subheading={testimonialsSection?.subheading || ''}
          heading={getHeading()}
          description={getDescription()}
        />

<div className='flex flex-col items-center justify-center'>
          <div className="backdrop-blur-[35px] backdrop-filter md:bg-white md:border md:border-white/20 rounded-[18px] md:p-3 flex md:flex-row flex-col-reverse md:gap-3 gap-6 md:max-w-[1032px] w-full justify-center items-center">
            <div className=" flex flex-col justify-between h-full gap-4 px-0 md:px-8">
              <div className="flex items-start justify-between mb-4 w-full h-auto">
                <div className="flex flex-col gap-0.5 w-full ">
                  <h4 className="text-xl md:text-2xl font-semibold font-inter text-gray-900 leading-[1.2]">
                    {first.authorName}
                  </h4>
                  {first.authorBio ? (
                    <p className="text-base font-inter text-gray-700/70 leading-[1.5]">
                      {first.authorBio}
                    </p>
                  ) : null}
                </div>
                {first.linkedinUrl ? (
                  <Link
                    href={first.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-6 h-6 rounded hover:opacity-80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_637_33259)">
                        <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="#111827"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_637_33259">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                ) : (
                  <div className="w-6 h-6" />
                )}
              </div>

              <p className="text-base md:text-lg text-gray-900 font-medium font-inter leading-[1.5] opacity-70">
                {first.testimonialDescription}
              </p>

            </div>

            <div className=" rounded-[14px] flex overflow-hidden flex-shrink-0 w-full max-w-[350px] h-full">
              {first.avatar?.asset?.url && (
                <Image 
                  src={first.avatar.asset.url} 
                  alt={first.authorName} 
                  width={350}
                  height={350}
                  title={first.authorName}
                  className="max-w-[350px]   h-full object-cover"
                />
              )}
            </div>
          </div>

            {/* Bottom tags */}
            <div className="md:mt-8 flex justify-center pt-[20px] md:pb-[10px]">
                <div className="flex flex-wrap items-center gap-[14px]">
                  {(first.tags || []).map((tag, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-[3.329px] rounded-full bg-gray-100 border border-gray-200 font-geist text-[14px] leading-[19.974px] text-[#030712]"
                      style={{ padding: '4.994px 13.316px', borderWidth: '0.832px' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.9021 3.45606C13.9675 3.50568 14.0225 3.56771 14.0638 3.63859C14.1052 3.70948 14.1322 3.78782 14.1432 3.86914C14.1543 3.95047 14.1492 4.03317 14.1282 4.11252C14.1073 4.19188 14.0709 4.26632 14.0212 4.33159L7.36309 13.0703C7.30909 13.1411 7.24056 13.1995 7.16212 13.2416C7.08368 13.2837 6.99713 13.3086 6.90829 13.3145C6.81945 13.3204 6.73038 13.3073 6.64704 13.2759C6.56371 13.2445 6.48805 13.1957 6.42514 13.1327L2.67998 9.38756C2.56972 9.26924 2.5097 9.11273 2.51255 8.95102C2.5154 8.78932 2.58091 8.63503 2.69527 8.52066C2.80964 8.4063 2.96392 8.34079 3.12563 8.33794C3.28734 8.33509 3.44385 8.39511 3.56217 8.50537L6.80298 11.7453L13.0283 3.57507C13.1285 3.44353 13.2768 3.35713 13.4406 3.33481C13.6044 3.3125 13.7704 3.35611 13.9021 3.45606Z" fill="#00A63E"/>
                      </svg>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              </div>

 
        {cta.scheduleLink && (
          <div className="flex justify-center ">
            <Button 
              type="primaryV3"
              link="/schedule"
              target="_blank"
              onClick={() => {
                trackButtonClick('testimonial_walkthrough', { 
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
