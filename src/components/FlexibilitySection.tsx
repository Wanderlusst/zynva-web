import { Container, Section, SectionHeader } from './structure';
import type { FlexibilityData } from '@/types/cms';
import { Queries } from '@/lib/queries'

interface FlexibilitySectionProps {
  flexibilityData?: FlexibilityData | null;
}

export default async function FlexibilitySection({ flexibilityData }: FlexibilitySectionProps) {
  const data = flexibilityData ?? await new Queries('en').sections.getFlexibilitySection()
  if (!data) return null;

  const heading = (data as any).headlineRich || (data as any).headline || '';
  const description = data.description;

  const cards = (data.flexibilityCards && data.flexibilityCards.length > 0)
    ? data.flexibilityCards.slice(0, 2).map(c => ({ title: c.title, description: c.description }))
    : [0, 1].map((index) => ({
        title: data?.features?.[index] || '',
        description: data?.benefits?.[index] || '',
      }));
  
  return (
    <Section bgColor="gray" padding="default">
      <Container className='md:gap-16 gap-12'>
        {/* Section Header */}
        <SectionHeader
          heading={heading}
          description={description}
        />

        {/* Deployment Options */}
        <div className="flex xl:flex-row flex-col items-center justify-center gap-12 sm:gap-16 lg:gap-24 w-full">
          {/* First Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full lg:max-w-[520px] lg:flex-shrink-0">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Icon */}
              <div   style={{
                            background: "linear-gradient(270deg, #01B59E 0%, #CCF0EC 100%)",
                          }} className="flex items-center justify-center gap-2 rounded-full   px-6 py-3 w-[72px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V21.286C2.00002 21.4264 2.04167 21.5637 2.11969 21.6804C2.1977 21.7971 2.30858 21.8881 2.43831 21.9419C2.56803 21.9956 2.71077 22.0097 2.84849 21.9823C2.9862 21.9549 3.1127 21.8873 3.212 21.788L5.414 19.586C5.78899 19.2109 6.29761 19.0001 6.828 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3H22V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 9L22 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-gray-950 font-manrope text-[20px] font-bold leading-[24px] tracking-[0]"
                  style={{ fontStyle: 'normal', letterSpacing: '0' }}
                >
                  {cards[0]?.title}
                </h3>
                <p
                  className="text-gray-700 font-geist text-[16px] font-normal leading-[24px] tracking-[0]"
                  style={{ fontStyle: 'normal', letterSpacing: '0' }}
                >
                  {cards[0]?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="flex flex-row lg:flex-col items-center justify-center gap-3">
            {/* Top Line */}
            <div
              className="hidden lg:block w-[2px] h-[72px]"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.20) 44.23%, rgba(0,0,0,0.00) 100%)',
                borderRadius: '9999px',
              }}
            ></div>
            <div
              className="block lg:hidden h-[2px] w-[72px]"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.20) 44.23%, rgba(0,0,0,0.00) 100%)',
                borderRadius: '9999px',
              }}
            ></div>
            {/* OR Badge */}
            <div
              className="flex flex-col items-start gap-[32px] rounded-[24px] bg-[#01B59E] p-[24px]"
            >
              <span
                className="text-white text-center font-manrope text-[24px] font-bold leading-[32px] tracking-[0] w-full"
                style={{ fontStyle: 'normal', letterSpacing: '0' }}
              >OR</span>
            </div>
            {/* Bottom Line */}
            <div
              className="hidden lg:block w-[2px] h-[72px]"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.20) 44.23%, rgba(0,0,0,0.00) 100%)',
                borderRadius: '9999px',
              }}
            ></div>
            <div
              className="block lg:hidden h-[2px] w-[72px]"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.20) 44.23%, rgba(0,0,0,0.00) 100%)',
                borderRadius: '9999px',
              }}
            ></div>
          </div>

          {/* Second Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full lg:max-w-[520px] lg:flex-shrink-0">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Icon */}
              <div className="flex items-center justify-center gap-2 rounded-[6666px]  border-white/20 bg-gradient-to-l from-[#01B59E] to-[#CCF0EC] backdrop-blur-[5.333px] min-h-[29.333px] px-6 py-3 w-[72px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13.832 16.568C14.0385 16.6628 14.2712 16.6845 14.4917 16.6294C14.7122 16.5744 14.9073 16.4458 15.045 16.265L15.4 15.8C15.5863 15.5516 15.8279 15.35 16.1056 15.2111C16.3833 15.0723 16.6895 15 17 15H20C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C15.2261 22 10.6477 20.1036 7.27208 16.7279C3.89642 13.3523 2 8.7739 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4V7C9 7.31049 8.92771 7.61672 8.78885 7.89443C8.65 8.17214 8.44839 8.41371 8.2 8.6L7.732 8.951C7.54842 9.09118 7.41902 9.29059 7.36579 9.51535C7.31256 9.74012 7.33878 9.97638 7.44 10.184C8.80668 12.9599 11.0544 15.2048 13.832 16.568Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-gray-950 font-manrope text-[20px] font-bold leading-[24px] tracking-[0]"
                  style={{ fontStyle: 'normal', letterSpacing: '0' }}
                >
                  {cards[1]?.title}
                </h3>
                <p
                  className="text-gray-700 font-geist text-[16px] font-normal leading-[24px] tracking-[0]"
                  style={{ fontStyle: 'normal', letterSpacing: '0' }}
                >
                  {cards[1]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
