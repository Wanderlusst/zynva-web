'use client';

import { useState } from 'react';
import { Container, Section } from './structure';
import type { FAQSectionData, FAQData } from '@/types/cms';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isExpanded?: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  faqs: FAQItem[];
}

interface FAQSectionProps {
  faqSectionData?: FAQSectionData | null;
  faqData?: FAQData[];
}

// Helper functions to convert CMS data to component format
const convertFaqDocsToCategories = (faqData?: FAQData[]): FAQCategory[] => {
  if (!faqData || faqData.length === 0) return [];

  const faqDoc = faqData[0];
  if (!faqDoc.faqCategories || !Array.isArray(faqDoc.faqCategories)) return [];

  return faqDoc.faqCategories
    .filter((category) => typeof category.categoryName === 'string' && category.categoryName.trim().length > 0)
    .map((category, index) => ({
      id: `category-${index}`,
      name: category.categoryName.trim(),
      faqs: (category.questions || []).map((qa, qIndex) => ({
        id: `faq-${index}-${qIndex}`,
        question: qa.question,
        answer: qa.answer,
        isExpanded: qIndex === 0,
      })),
    }));
};

const convertFaqSectionToCategories = (faqSectionData?: FAQSectionData | null): FAQCategory[] => {
  if (!faqSectionData || !Array.isArray(faqSectionData.faq)) return [];

  return faqSectionData.faq
    .filter((category: any) => typeof category.category === 'string' && category.category.trim().length > 0)
    .map((category: any, index: number) => ({
      id: `section-category-${index}`,
      name: category.category.trim(),
      faqs: (category.questions || []).map((qa: any, qIndex: number) => ({
        id: `section-faq-${index}-${qIndex}`,
        question: qa.question,
        answer: qa.answer,
        isExpanded: qIndex === 0,
      })),
    }));
};


export default function FAQSection({ faqSectionData, faqData }: FAQSectionProps) {
  // Prefer standalone FAQ docs; fallback to embedded faq in faqSection
  const docCategories = convertFaqDocsToCategories(faqData);
  const sectionCategories = docCategories.length === 0 ? convertFaqSectionToCategories(faqSectionData) : [];
  const cmsFaqData = docCategories.length > 0 ? docCategories : sectionCategories;
  const validCategories = cmsFaqData.filter(cat => typeof cat.name === 'string' && cat.name.trim().length > 0);
  
  // Get showCategoryName setting from CMS or default to true
  const showCategoryName = faqSectionData?.showCategoryName ?? true;
  const shouldShowCategories = showCategoryName && validCategories.length > 1;
  
  const [activeCategory, setActiveCategory] = useState(validCategories[0]?.id || cmsFaqData[0]?.id || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const currentCategory = validCategories.find(cat => cat.id === activeCategory) || validCategories[0] || cmsFaqData[0];

  // If no FAQ data is available, show a message
  if (cmsFaqData.length === 0) {
    return (
      <Section id="faq" bgColor="gray" padding="large" className="px-4">
        <Container>
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {faqSectionData?.heading || 'Frequently Asked Questions'}
            </h2>
            <p className="text-gray-600">
              FAQ content is being updated. Please check back soon.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        // If clicking on an already expanded item, close it
        newSet.delete(itemId);
      } else {
        // If clicking on a new item, close all others and open this one
        newSet.clear();
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <Section id="faq" bgColor="white" padding="large" className="lg:px-8 px-4">
      <Container  className='md:p-auto  !px-0'>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 sm:mb-[82px]">
          <div className="flex flex-col justify-center relative shrink-0 mb-4 lg:mb-0 md:max-w-[396px]">
            <h2 className="font-['Manrope',_sans-serif] md:text-[40px] text-[26px] md:leading-[48px] leading-tight font-bold text-[#030712]">
              {faqSectionData?.heading || 'Frequently Asked Questions'}
            </h2>
            {faqSectionData?.description && (
              <p className="font-['Inter',_sans-serif] text-[16px] leading-[145%] font-normal text-[#4A5565] mt-2">
                {faqSectionData.description}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start lg:items-end leading-relaxed not-italic relative shrink-0 text-sm sm:text-base">
            <p className="font-['Inter',_sans-serif] font-normal relative shrink-0 text-gray-700">
              For queries contact
            </p>
            <Link href="mailto:hello@opalvoice.io" className="font-['Inter',_sans-serif] font-medium relative shrink-0 text-[#01b59e]">
              hello@opalvoice.io
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Mobile Category Selector */}
          {shouldShowCategories && (
            <div className="w-full lg:hidden">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-gray-300 transition-colors group"
              >
                <span className="text-lg font-medium text-gray-950 font-['Geist',_sans-serif]">
                  {currentCategory?.name || 'FAQs'}
                </span>
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-gray-300 transition-colors">
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 text-gray-700 ${
                      isMobileMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
            </div>
          )}
            
            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && shouldShowCategories && (
              <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 relative">
                {validCategories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-100 last:border-b-0 ${
                      activeCategory === category.id
                        ? 'bg-[#ffd9d0] text-gray-950 font-medium'
                        : 'text-gray-600 hover:bg-[#ffd9d0]'
                    }`}
                  >
                    <span className="text-base font-['Geist',_sans-serif]">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar Navigation */}
          {shouldShowCategories && (
            <div className="hidden lg:block w-96 flex-shrink-0">
              <div className="flex flex-col gap-6 items-start sticky top-24">
                {/* {cmsFaqData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                      activeCategory === category.id
                        ? 'bg-white text-gray-950 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span className="text-lg leading-7 font-['Geist',_sans-serif]">
                      {category.name}
                    </span>
                  </button>
                ))} */}
              </div>
            </div>
          )}

          {/* FAQ Items */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-4 sm:gap-6">
              {currentCategory?.faqs?.map((item) => {
                const isExpanded = expandedItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-2xl bg-white transition-all duration-300"
                    style={{
                      borderRadius: '16px',
                      border: '1px solid #E5E7EB',
                      background: isExpanded ? '#ffd9d0' : 'white'
                    }}
                  >
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={`w-full p-4 sm:p-6 text-left transition-colors duration-200 ${isExpanded ? '!pb-0' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-['Geist',_sans-serif] font-medium text-base sm:text-lg leading-6 sm:leading-7 text-gray-950 pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 text-gray-600 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="pt-3 border-t border-gray-200">
                          <p className="font-['Inter',_sans-serif] font-normal text-sm sm:text-base leading-relaxed text-gray-600">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
      </Container>
    </Section>
  );
}
