'use client';

import Image from 'next/image';
import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import type { FeatureData, FeatureCard, RichText } from '@/types/cms';
import CheckIcon from './Icons/CheckIcon';
import { Container, Section, SectionHeader } from './structure';
import Button from './Button';

interface FeaturesSectionProps {
  featuresSectionData?: FeatureData[];
}

interface StackedCardProps {
  feature: {
    id: string;
    title: string;
    heading: string;
    description: string;
    items: string[];
    cta?: { text: string; type: string; onClick?: () => void; link?: string; target?: string };
  };
  index: number;
  totalCards: number;
  imageUrl?: string;
  imageAlt: string;
  cardRef: (el: HTMLDivElement | null) => void;
  isMobile: boolean;
}

function StackedCard({ feature, index, totalCards, imageUrl, imageAlt, cardRef, isMobile }: StackedCardProps) {
  const cardElementRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure ref is attached to DOM before enabling useScroll
  useLayoutEffect(() => {
    if (cardElementRef.current && !isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  // Track scroll progress for this specific card (only on desktop)
  // Only enable when mounted and not on mobile
  const { scrollYProgress } = useScroll({
    target: isMounted && !isMobile ? cardElementRef : undefined,
    offset: ["start end", "end start"]
  });

  // const scale = useTransform(
  //   scrollYProgress,
  //   [1, 1.5, 2],
  //   [1, 1, 0.6]
  // );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [120, 40, 0, -30, -100]
  );

  const top= useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 100, 200, 300, 400, 500],
  );

  // 3D rotation effect that reverses smoothly
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75],
    [12, 5, 0, -2]
  );

  return (
    <motion.div
      ref={(el) => {
        if (el) {
          (cardElementRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          cardRef(el);
        }
      }}
      style={{
        // scale,
        opacity: 1,
        ...(isMobile ? {} : {
          rotateX,
          position: 'sticky',
          top, // Same top position for all cards - they stack on top
          zIndex: index + 1, // Higher index = higher z-index (stack on top)
          transformOrigin: 'top center',
        }),
      }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl md:p-3">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-full">
          {imageUrl && (
            <div className="w-full h-full lg:max-w-[489px] rounded-xl overflow-hidden  relative ">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={495}
                height={476}
                className="flex flex-col justify-center w-full  lg:h-[495px]  lg:min-w-[495px] lg:max-w-[495px]"
                title={imageAlt}
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
            <div>
              <h3 className="text-[#030712]/70 font-geist text-[14px] leading-[20px] font-normal uppercase tracking-[0.8px]">
                {feature.heading}
              </h3>
              {feature.description && (
                <h4 className="text-[#09090B] font-manrope md:text-[30px] text-[24px] md:leading-[40px]  leading-normal font-bold md:my-1">
                  {feature.description}
                </h4>
              )}
            </div>

            {/* Feature List */}
            {feature.items && feature.items.length > 0 && (
              <div className="space-y-0 mb-6 sm:mb-8">
                {feature.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-3 py-3 sm:py-3.5 border-b border-[#030712] border-opacity-10">
                    <div className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-1">
                      <CheckIcon />
                    </div>
                    <p className="text-[#030712] font-geist text-[16px] leading-6 font-normal">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            {feature.cta && (
              <Button
                type={feature.cta.type as "primary" | "secondary" | "video" | "primarySm" | "underline"}
                link={feature.cta.link}
                target={feature.cta.target as "_blank" | "_self" | "_parent" | "_top" | "" | undefined}
                onClick={feature.cta.onClick}
                className="w-fit"
              >
                <span>{feature.cta.text}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection({ featuresSectionData }: FeaturesSectionProps) {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  const features = useMemo(() => {
    return featuresSectionData?.[0]?.featureCards?.map((card: FeatureCard, index: number) => {
      const getCardHeadline = () => {
        if (card.headlineRich && card.headlineRich.length > 0) {
          return card.headlineRich.map((block: RichText) =>
            block.children.map((child) => child.text).join('')
          ).join(' ');
        }
        return card.headline || '';
      };

      return {
        id: `feature-${index}`,
        title: card.subheading || getCardHeadline() || `Feature ${index + 1}`,
        heading: getCardHeadline(),
        description: card.description || '',
        items: card.benefits || [],
        cta: card.cta || (cta.scheduleLink ? {
          text: 'Join Waiting List',
          type: 'primary',
          link: '#cta-section',
          onClick: () => {
            trackButtonClick('feature_cta', { 
              feature_id: `feature-${index}`, 
              feature_title: card.subheading || getCardHeadline() || `Feature ${index + 1}`,
              action: 'schedule_walkthrough'
            });
            const ctaSection = document.getElementById('cta-section');
            if (ctaSection) {
              ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        } : undefined)
      };
    }) || [];
  }, [featuresSectionData, trackButtonClick, cta.scheduleLink]);

  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const tabButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isClickScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile scroll listener to update active tab
  useEffect(() => {
    if (!isMobile) return;

    const handleMobileScroll = () => {
      if (isClickScrollingRef.current) return;

      const headerHeight = 73;
      const tabHeight = 80;
      const threshold = headerHeight + tabHeight + 50; // Scroll threshold - where cards start being considered

      // Find which card is most visible/centered in viewport
      let bestMatch = { index: activeFeatureIndex, score: -Infinity };

      features.forEach((feature, index) => {
        const card = cardRefs.current[feature.id];
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top;
        const cardBottom = cardRect.bottom;
        const cardHeight = cardRect.height;
        const viewportHeight = window.innerHeight;

        // Only consider cards that have at least some portion visible above threshold
        if (cardBottom < threshold || cardTop > viewportHeight) {
          return; // Card is completely above threshold or below viewport
        }

        // Calculate how much of the card is visible above the threshold
        const visibleTop = Math.max(cardTop, threshold);
        const visibleBottom = Math.min(cardBottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Only score if card has meaningful visibility (at least 30% visible)
        if (visibleHeight < cardHeight * 0.3) {
          return;
        }
        
        // Calculate center position of card relative to viewport
        const cardCenter = cardTop + cardHeight / 2;
        const viewportCenter = threshold + (viewportHeight - threshold) / 2;
        const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
        
        // Score based on visibility and proximity to center
        // Higher visibility and closer to center = higher score
        const visibilityScore = visibleHeight / cardHeight;
        const centerScore = 1 - Math.min(distanceFromCenter / viewportHeight, 1);
        const score = visibilityScore * 0.7 + centerScore * 0.3;

        if (score > bestMatch.score) {
          bestMatch = { index, score };
        }
      });

      // Update active index if we found a better match and it's visible enough
      // Use a higher threshold to prevent premature switching
      if (bestMatch.index !== activeFeatureIndex && bestMatch.score > 0.4) {
        setActiveFeatureIndex(bestMatch.index);

        // Update tab button scroll position
        const feature = features[bestMatch.index];
        if (feature) {
          const tabButton = tabButtonRefs.current[feature.id];
          if (tabButton) {
            // Use requestAnimationFrame to avoid scroll conflicts
            requestAnimationFrame(() => {
              tabButton.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
              });
            });
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMobileScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    // Also check on initial load
    handleMobileScroll();
    
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [isMobile, features, activeFeatureIndex]);

  const [isContainerMounted, setIsContainerMounted] = useState(false);

  // Ensure container ref is attached to DOM before enabling useScroll
  useLayoutEffect(() => {
    if (containerRef.current && !isContainerMounted) {
      setIsContainerMounted(true);
    }
  }, [isContainerMounted]);

  // Track scroll progress of the entire features container (only on desktop)
  const { scrollYProgress } = useScroll({
    target: isContainerMounted && !isMobile ? containerRef : undefined,
    offset: ["start end", "end start"]
  });

  // Function 1: Handle scroll behavior - updates active card based on scroll position (desktop only)
  const handleScrollBehavior = (latest: number) => {
    // Only work on desktop
    if (isMobile) return;
    
    // Don't update if user is clicking tabs - prevents fighting between scroll and click
    if (isClickScrollingRef.current) return;
    
    // Calculate which card should be active based on scroll progress
    // Use a slightly offset calculation to handle both directions smoothly
    const progress = Math.max(0, Math.min(1, latest));
    const newIndex = Math.min(
      Math.floor(progress * features.length * 1.2), // Multiply by 1.2 for better sensitivity
      features.length - 1
    );
    
    if (newIndex !== activeFeatureIndex && newIndex >= 0) {
      setActiveFeatureIndex(newIndex);
    }
  };

  // Update active feature index based on scroll progress (desktop only)
  useMotionValueEvent(scrollYProgress, "change", handleScrollBehavior);

  // Function 2: Handle click - simple scroll on mobile, stacking on desktop
  const handleClickStack = (featureId: string, index: number) => {
    // Immediately update active index for instant visual feedback
    setActiveFeatureIndex(index);
    
    // Set flag to prevent scroll listener from interfering
    isClickScrollingRef.current = true;
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Wait for DOM to be ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const cardElement = cardRefs.current[featureId];
        if (!cardElement) return;
        
        if (isMobile) {
          // Mobile: Simple scroll to card
          const headerHeight = 73;
          const tabHeight = 80;
          const cardRect = cardElement.getBoundingClientRect();
          const cardTop = window.pageYOffset + cardRect.top;
          
          window.scrollTo({
            top: Math.max(0, cardTop - headerHeight - tabHeight - 20),
            behavior: 'smooth'
          });
          
          // Center tab button on mobile after scroll
          const tabButton = tabButtonRefs.current[featureId];
          if (tabButton) {
            setTimeout(() => {
              tabButton.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
              });
            }, 100);
          }
          
          // Re-enable scroll listener after scroll animation completes (longer delay for mobile)
          scrollTimeoutRef.current = setTimeout(() => {
            isClickScrollingRef.current = false;
          }, 1000);
        } else {
          // Desktop: Stacking behavior
          const container = containerRef.current;
          if (!container) return;
          
          // Fixed offsets
          const headerHeight = 73;
          const tabHeight = 80;
          const stickyCardTop = 100; // Where cards stick in viewport
          const cardGap = 40; // 20px gap between cards (space-y-5)
          
          // Get container position
          const containerRect = container.getBoundingClientRect();
          const containerTop = window.pageYOffset + containerRect.top;
          
          // Calculate accumulated height of all previous cards
          // This ensures each previous card is fully scrolled past before the clicked card sticks
          let accumulatedHeight = 0;
          
          if (index > 0) {
            // Sum all previous card heights + gaps
            for (let i = 0; i < index; i++) {
              const prevCardId = features[i]?.id;
              const prevCard = cardRefs.current[prevCardId];
              
              if (prevCard) {
                // Get the full height of the previous card
                // offsetHeight gives the element's layout height including padding and borders
                accumulatedHeight += prevCard.offsetHeight;
                
                // Add gap after each card (space-y-5 creates margin-bottom)
                if (i < index - 1) {
                  accumulatedHeight += cardGap;
                }
              }
            }
            
            // Add gap to ensure proper spacing and full coverage
            accumulatedHeight += cardGap;
            
            // Add small buffer (10px) to ensure complete coverage and prevent any overlap
            accumulatedHeight += 10;
          }
          
          // Calculate target scroll position
          // Scroll to: container top + accumulated heights - offsets
          // This positions the page so the clicked card reaches the sticky position
          // and all previous cards are fully scrolled past with proper gap
          const targetScroll = containerTop + accumulatedHeight - headerHeight - tabHeight - stickyCardTop;
          
          // Perform smooth scroll to position the card correctly
          window.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: 'smooth'
          });
          
          // Re-enable scroll listener after scroll animation completes
          scrollTimeoutRef.current = setTimeout(() => {
            isClickScrollingRef.current = false;
          }, 1500);
        }
      });
    });
  };

  const sectionHeader = featuresSectionData?.[0] || null;

   const getSectionHeading = () => {
    if (sectionHeader?.headlineRich && Array.isArray(sectionHeader.headlineRich) && sectionHeader.headlineRich.length > 0) {
      return sectionHeader.headlineRich; // Return rich text array
    }
    return sectionHeader?.headline || sectionHeader?.title || 'Features'; // Return normal string
  };

  const sectionHeading = getSectionHeading();
  const sectionDescription = sectionHeader?.description || '';

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <Section bgColor="gray" id='features'>
      <Container className="md:gap-16 gap-12" padding="default">
        <SectionHeader
          heading={sectionHeading}
          description={sectionDescription}
        />
        <div className="sticky top-[73px] z-10 md:z-[100] md:pb-[40px] md:pt-[34px] pb-4 pt-2 pointer-events-auto">
          <div className="bg-white rounded-full p-1.5 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-x-auto scrollbar-hide w-full xl:w-fit mx-auto relative pointer-events-auto">
            <div
              className="flex items-center gap-2 sm:gap-[10px] min-w-max"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  ref={(el) => { tabButtonRefs.current[feature.id] = el; }}    
                  onClick={() => {
                    handleClickStack(feature.id, index);
                    trackButtonClick('feature_tab', { feature_id: feature.id, feature_title: feature.title });
                  }}
                  className={`
                    px-4 sm:px-6 py-2 sm:py-2.5 
                    rounded-full 
                    text-sm sm:text-base font-medium 
                    transition-all duration-200 
                    whitespace-nowrap flex-shrink-0 
                    scroll-snap-align-start
                    relative z-10
                    cursor-pointer
                    ${activeFeatureIndex === index
                      ? 'bg-gray-950 text-white'
                      : 'text-gray-950 md:hover:bg-gray-100 active:bg-gray-200'
                    }
                  `}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stacked Cards Container - Scroll Driven */}
        <motion.div 
          ref={containerRef}
          className="w-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-10">
            {features.map((feature, index) => {
              const cmsCard = featuresSectionData?.[0]?.featureCards?.[index];
              const imageUrl = cmsCard?.featureImage?.asset?.url;
              const imageAlt = cmsCard?.featureImage?.alt || feature.heading;

              return (
                <StackedCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  totalCards={features.length}
                  imageUrl={imageUrl}
                  imageAlt={imageAlt}
                  cardRef={(el) => { cardRefs.current[feature.id] = el; }}
                  isMobile={isMobile}
                />
              );
              })}
              {/* Spacer to allow smooth scrolling and animations (desktop only) */}
              {!isMobile && <div className="h-[480px]" aria-hidden="true" />}
            </div>
        </motion.div>
      </Container>
    </Section>
  );
}