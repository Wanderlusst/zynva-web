'use client';

import React, { useState } from 'react';

import { usePostHog } from '@/hooks/usePostHog';
import { useCTA } from '@/contexts/CTAContext';
import { Container, Section } from './structure';

// Wave Input Component
const WaveInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  required = true 
}: { 
  label: string; 
  type?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => {
  const labelChars = label.split('');

  return (
    <div className="wave-group relative w-full">
      <input
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        className="input text-white"
      />
      <span className="bar"></span>
      <label className="label">
        {labelChars.map((char, index) => (
          <span
            key={index}
            className="label-char"
            style={{ '--index': index } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </label>
    </div>
  );
};

export default function CTASection() {
  const { trackButtonClick } = usePostHog();
  const { cta } = useCTA();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinicName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    trackButtonClick('cta_section_form_submit', { 
      section: 'cta',
      action: 'form_submit',
      form_data: formData
    });

    try {
      // Send as JSON to match Google Apps Script expectation (e.postData.contents)
      const jsonData = {
        name: formData.name,
        email: formData.email,
        clinic: formData.clinicName
      };

      const response = await fetch('https://script.google.com/macros/s/AKfycbyrg-yULMRybrhnRIHe3yjq8Z_jjRH85vdeXyxKREBLZZ2nHUuCroZx2tW2TxJ_qha9mg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
      });

      // Since no-cors mode doesn't allow reading response, we assume success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', clinicName: '' });
      
      // Don't reset - keep showing success message
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Section bgColor="gray" padding="default" style={{scrollMarginTop: '73px'}} id="cta-section">
      <Container className='w-full'>
        <div className="relative bg-[#05796b] rounded-2xl min-h-[438px] flex flex-col items-center justify-center px-4 md:px-8 py-12 overflow-hidden">


          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-[763px] w-full">
            {/* Heading Card */}
            {/* <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg w-full"> */}
              <h2 className="font-manrope font-bold text-xl md:text-4xl text-white leading-normal md:leading-[50px] tracking-normal">
                Curious to know more? Join our waitlist today and be the first to experience it.
            </h2>
            {/* </div> */}

            {/* Show form or success message */}
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center gap-4 w-full max-w-[500px]">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white text-center font-manrope font-bold text-2xl md:text-3xl">
                    Thank you for joining the waitlist!
                  </p>
                  <p className="text-white/90 text-center font-manrope font-medium text-lg md:text-xl">
                    We'll be in touch soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-[500px] flex flex-col gap-8">
                <WaveInput
                  label="Name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                />
                <WaveInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />
                <WaveInput
                  label="Clinic Name"
                  type="text"
                  value={formData.clinicName}
                  onChange={handleInputChange('clinicName')}
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#01b59e] text-white hover:bg-[#019a87] disabled:opacity-50 disabled:cursor-not-allowed font-manrope px-8 py-4 rounded-[50px] transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                  <span className={isSubmitting ? 'text-white' : 'text-white font-medium md:text-xl text-base btn-shine'}>
                    {isSubmitting ? 'Submitting...' : 'Get early access'}
                  </span>
                </button>
                
                {submitStatus === 'error' && (
                  <p className="text-red-200 text-center font-manrope font-medium mt-2">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

