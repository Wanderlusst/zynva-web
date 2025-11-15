import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface ButtonProps {
  type?: 'primary' | 'primarySm' | 'primaryV3' | 'secondary' | 'underline'  | 'video' | 'animated'
  alter?: 'bgWhite' | 'borderWhite' | 'disabled' | 'default'
  children?: React.ReactNode
  link?: any
  target?: '_blank' | '_self' | '_parent' | '_top' | ''
  isDemo?: boolean
  [x: string]: any
  className?: string
  locale?: string | false
  onClick?: () => void
}

const Button: React.FunctionComponent<ButtonProps> = ({
  type,
  alter,
  children,
  link,
  isDemo,
  target,
  className,
  locale,
  onClick,
  ...rest
}) => {
  const baseClasses = clsx(
    'relative inline-flex items-center justify-center whitespace-nowrap gap-[8px] transition-all duration-300 ease-linear',
    {
      'rounded-[8px] text-gray-950 font-geist font-medium leading-[24px] tracking-wide [&>*]:relative [&>span]:text-[#030712] [&>span]:font-geist [&>span]:text-base [&>span]:font-medium [&>span]:leading-6 [&>span]:tracking-normal [&_span]:text-[#030712] [&_span]:font-geist [&_span]:text-base [&_span]:font-medium [&_span]:leading-6 [&_span]:tracking-normal':
        type !== 'primaryV3' && type !== undefined && type !== 'animated',
      'rounded-[40px] bg-[#9bdabb] h-[50px] px-[32px] [&>span]:font-manrope [&>span]:font-semibold [&>span]:text-[16px] [&>span]:text-black [&>span]:leading-normal [&_span]:font-manrope [&_span]:font-semibold [&_span]:text-[16px] [&>span]:text-black [&>span]:leading-normal':
        type === 'primaryV3',
    }
  )
  
  const customClasses = clsx({
    'px-6 py-2.5 before:content-[""] before:absolute before:inset-[1px] before:rounded-[8px] before:border before:border-white/10 before:bg-[#B5EB92] p-[1px] text-base bg-gradient-to-r from-[#B5EB92] to-white shadow-[0_0_0_1px_#92D96A] hover:shadow-[0_0_0_2px_#92D96A] hover:from-white hover:to-[#B5EB92]':
      type === 'primary',
    'p-[1px] text-sm bg-gradient-to-r from-[#B5EB92] to-white shadow-[0_0_0_1px_#92D96A] hover:shadow-[0_0_0_2px_#92D96A] hover:from-white hover:to-[#B5EB92]':
      type === 'primarySm',
    'border-2 bg:white/10 border-[rgba(74,60,225,0.15)] hover:border-[rgba(74,60,225,0.15)] hover:bg-black/5 py-2.5 px-6':
      type === 'secondary',
    'text-base font-normal underline decoration-dotted decoration-2 underline-offset-4':
      type === 'underline',
    'text-white border border-white/30 px-[17px] py-[10px]':
      type === 'video',
    'animated-button':
      type === 'animated',
  }) 

  const combinedClasses = clsx(baseClasses, customClasses, className)
  
  // Star SVG component for animated button
  const StarSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      version="1.1"
      style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', fillRule: 'evenodd', clipRule: 'evenodd' } as React.CSSProperties}
      viewBox="0 0 784.11 815.53"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
        <path
          className="fil0"
          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        ></path>
      </g>
    </svg>
  )

  if (link) {
    return (
      <>
        <Link
          href={link}
          className={combinedClasses}
          target={target}
          onClick={onClick}
          {...rest}
        >
          {type === 'animated' && (
            <>
              <div className="star-1">
                <StarSVG />
              </div>
              <div className="star-2">
                <StarSVG />
              </div>
              <div className="star-3">
                <StarSVG />
              </div>
              <div className="star-4">
                <StarSVG />
              </div>
              <div className="star-5">
                <StarSVG />
              </div>
              <div className="star-6">
                <StarSVG />
              </div>
            </>
          )}
          {children}
        </Link>
      </>
    )
  }

  return (
    <button className={combinedClasses} onClick={onClick} {...rest}>
      {type === 'animated' && (
        <>
          <div className="star-1">
            <StarSVG />
          </div>
          <div className="star-2">
            <StarSVG />
          </div>
          <div className="star-3">
            <StarSVG />
          </div>
          <div className="star-4">
            <StarSVG />
          </div>
          <div className="star-5">
            <StarSVG />
          </div>
          <div className="star-6">
            <StarSVG />
          </div>
        </>
      )}
      {children}
    </button>
  )
}

export default Button