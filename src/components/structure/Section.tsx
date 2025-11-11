import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: 'white' | 'gray' | 'midnightGradient' | 'black';
  padding?: 'default' | 'small' | 'large' | 'small_xl';
  id?: string;
  style?: React.CSSProperties;
}

export default function Section({ 
  children, 
  className = '',
  bgColor = 'white',
  padding = 'default',
  id,
  style 
}: SectionProps) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-[#f9f9f9]',
    midnightGradient: 'bg-midnightGradient',
    black: 'bg-black'
  };


  return (
    <section 
      id={id}
      style={style}
      className={`flex flex-col w-full items-center justify-center ${bgColors[bgColor]}  ${className}`}
    >
      {children}
    </section>
  );
}
