import { ReactNode } from 'react';
import { PortableText } from '@portabletext/react';

interface RichText {
  _type: string;
  children: Array<{
    _type: string;
    text: string;
    marks?: string[];
  }>;
  style?: string;
  markDefs?: Array<{
    _type: string;
    href?: string;
  }>;
}

interface SectionHeaderProps {
  isIntegrationSection?: boolean;
  subheading?: string;
  heading: string | RichText[];
  description?: string;
  subheading2?: string;
  children?: ReactNode;
  className?: string;
}

// Custom block component that handles all styles
const BlockComponent = ({ children, value }: any) => {
  const style = value?.style || 'normal';
  const styleMap: Record<string, { tag: string; className: string; style?: React.CSSProperties }> = {
    h1: { tag: 'h1', className: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111827] font-manrope' },
    h2: { tag: 'h2', className: 'text-[30px] lg:text-[40px] md:leading-[48px] leading-tight text-[#111827] font-manrope font-bold text-center px-2' },
    h3: { tag: 'h3', className: 'text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight sm:leading-tight md:leading-tight lg:leading-[48px] text-[#111827] font-manrope px-2 text-center', style: { fontWeight: 700 } },
    h4: { tag: 'h4', className: 'text-xl sm:text-2xl md:text-3xl text-gray-900 font-manrope ' },
    normal: { tag: 'div', className: 'text-[30px] lg:text-[40px] md:leading-[48px] leading-tight text-[#111827] font-manrope font-bold text-center' },
  };
  
  const config = styleMap[style] || styleMap['normal'];
  const Tag = config.tag as keyof JSX.IntrinsicElements;
  
  return <Tag className={config.className} style={config.style}>{children}</Tag>;
};

// PortableText component configuration
const portableTextComponents = {
  block: {
    // Use a single handler for all block types
    normal: ({ children }: any) => <BlockComponent value={{ style: 'normal' }}>{children}</BlockComponent>,
    h1: ({ children }: any) => <BlockComponent value={{ style: 'h1' }}>{children}</BlockComponent>,
    h2: ({ children }: any) => <BlockComponent value={{ style: 'h2' }}>{children}</BlockComponent>,
    h3: ({ children }: any) => <BlockComponent value={{ style: 'h3' }}>{children}</BlockComponent>,
    h4: ({ children }: any) => <BlockComponent value={{ style: 'h4' }}>{children}</BlockComponent>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a 
        href={value?.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  },
  // Fallback for unknown block types
  unknownType: ({ value, isInline }: any) => {
    console.warn('Unknown block type:', JSON.stringify(value, null, 2), 'isInline:', isInline);
    // If it's a block with a style property, render the raw text content
    if (!isInline && value?.children) {
      // Extract text from children spans
      const textContent = value.children
        .map((child: any) => child.text || '')
        .join('');
      
      const style = value.style || 'normal';
      const styleMap: Record<string, { className: string; style?: React.CSSProperties }> = {
        h1: { className: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111827] font-manrope' },
        h2: { className: 'text-[30px] lg:text-[40px] md:leading-[48px] leading-tight text-[#111827] font-manrope font-bold text-center px-2' },
        h3: { className: 'text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight sm:leading-tight md:leading-tight lg:leading-[48px] text-[#111827] font-manrope px-2 text-center', style: { fontWeight: 700 } },
        h4: { className: 'text-xl sm:text-2xl md:text-3xl text-gray-900 font-manrope' },
        normal: { className: 'text-[30px] lg:text-[40px] md:leading-[48px] leading-tight text-[#111827] font-manrope font-bold text-center px-2' },
      };
      
      const styleConfig = styleMap[style] || styleMap['normal'];
      return <div className={styleConfig.className} style={styleConfig.style}>{textContent}</div>;
    }
    return <div className="text-red-500">Unknown type: {value?._type || 'unknown'}</div>;
  },
  unknownMark: ({ children, markType }: any) => {
    console.warn('Unknown mark type:', markType);
    return <span>{children}</span>;
  },
};

// PortableText configuration for integration section (white text on dark bg)
const portableTextComponentsIntegration = {
  block: {
    normal: ({ children }: any) => <BlockComponent value={{ style: 'normal' }}><span className="text-white">{children}</span></BlockComponent>,
    h1: ({ children }: any) => <BlockComponent value={{ style: 'h1' }}><span className="text-white">{children}</span></BlockComponent>,
    h2: ({ children }: any) => <BlockComponent value={{ style: 'h2' }}><span className="text-white">{children}</span></BlockComponent>,
    h3: ({ children }: any) => <BlockComponent value={{ style: 'h3' }}><span className="text-white">{children}</span></BlockComponent>,
    h4: ({ children }: any) => <BlockComponent value={{ style: 'h4' }}><span className="text-white">{children}</span></BlockComponent>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-white">{children}</em>,
    link: ({ children, value }: any) => (
      <a 
        href={value?.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white underline"
      >
        {children}
      </a>
    ),
  },
  unknownType: ({ value, isInline }: any) => {
    if (!isInline && value?.children) {
      const textContent = value.children.map((child: any) => child.text || '').join('');
      return <div className="text-[40px] leading-[48px] text-white font-manrope font-bold text-center">{textContent}</div>;
    }
    return <div className="text-white">Unknown type: {value?._type || 'unknown'}</div>;
  },
  unknownMark: ({ children }: any) => <span className="text-white">{children}</span>,
};

export default function SectionHeader({
  isIntegrationSection = false,
  subheading,
  heading,
  description,
  subheading2,
  children,
  className = '',
}: SectionHeaderProps) {
  // Check if heading is rich text array
  const isRichText = Array.isArray(heading);
  
  if (isRichText) {
    
    const enrichedHeading = (heading as RichText[]).map((block: any) => {
      if (!block._type) {
        return { ...block, _type: 'block' };
      }
      return block;
    });
    
    return (
      <div className={`text-center   ${className}`}>
        {subheading && (
          <div className="text-xs sm:text-sm text-gray-950 opacity-70 tracking-wider uppercase mb-3 sm:mb-4 font-geist">
            {subheading}
          </div>
        )}
        <div className="max-w-[620px] mx-auto">
          <PortableText value={enrichedHeading} components={isIntegrationSection ? portableTextComponentsIntegration : portableTextComponents} />
          {subheading2 && (
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight sm:leading-tight md:leading-tight lg:leading-[48px] text-gray-900 mb-6 font-manrope px-2 text-center" style={{ fontWeight: 700 }}>
              {subheading2}
            </h3>
          )}
          {description && (
            <p className={`${isIntegrationSection ? 'text-white/60' : 'text-[#364153]'} mt-4 text-center font-geist text-base lg:text-lg leading-[28px] font-normal tracking-normal`}>
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    );
  }
  
  return (
    <div className={`text-center  ${className}`}>
      {subheading && (
        <div className="text-xs sm:text-sm text-gray-950 opacity-70 tracking-wider uppercase mb-3 sm:mb-4 font-geist">
          {subheading}
        </div>
      )}
      <div className="">
        <div>
        <h2 className={`text-[30px] lg:text-[40px] md:leading-[48px] leading-tight ${isIntegrationSection ? 'text-white' : 'text-[#111827]'} mb-4 font-manrope font-bold text-center`}>
          {heading}
        </h2>
        </div>
        <div className='max-w-[620px] mx-auto'>
        {subheading2 && (
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight sm:leading-tight md:leading-tight lg:leading-[48px] text-gray-900 mb-6 font-manrope px-2 text-center" style={{ fontWeight: 700 }}>
            {subheading2}
          </h3>
        )}
        {description && (
          <p className={`mx-auto  ${isIntegrationSection ? 'text-white/60' : 'text-[#364153]'} text-center font-geist text-base lg:text-lg leading-[28px] font-normal tracking-normal`}>
            {description}
          </p>
        )}
        </div>
      </div>
      {children}
    </div>
  );
}
