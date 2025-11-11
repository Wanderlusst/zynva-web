import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  padding?: 'default' | 'small' | 'large' | 'small_xl' | 'small_2xl';
  style?:any
}

export default function Container({ children, className = '', padding = 'default',style }: ContainerProps) {
  const paddings = {
    default: 'py-16 sm:py-24 md:py-[130px] lg:px-8 px-4 ',
    small: 'py-12 sm:py-16 px-4 sm:px-6',
    large: 'py-20 sm:py-32 md:py-40 px-4 sm:px-6',
    small_xl: 'py-20  md:pt-[96px] md:pb-[20px] lg:px-8 px-4 sm:px-6',
    small_2xl: 'md:!py-[96px] px-4 sm:px-6 p-16 '
  } as const;

  return (
    <div style={style} className={`flex flex-col w-full  max-w-7xl ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}
