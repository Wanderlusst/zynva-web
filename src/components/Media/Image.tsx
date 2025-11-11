import Image from 'next/image'

import { getOptimizedImageUrl } from '@/lib/media-utils'
import { urlFor } from '@/lib/sanity'

interface SanityImageProps {
  image: {
    asset: {
      _ref: string
    }
    order: number
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
}

export default function SanityImage({
  image,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style,
}: SanityImageProps) {
  if (!image?.asset?._ref) {
    console.warn('No image asset reference found')
    return null
  }

  const altText = `Image ${image.order}`
  const title = `Image ${image.order}`

  // Build the image URL with Sanity's image URL builder
  let imageBuilder = urlFor(image.asset._ref)

  // Apply hotspot if available
  if (image.hotspot) {
    imageBuilder = imageBuilder.fit('crop').focalPoint(
      image.hotspot.x,
      image.hotspot.y
    )
  }

  // Apply crop if available
  if (image.crop) {
    imageBuilder = imageBuilder.rect(
      image.crop.left,
      image.crop.top,
      image.crop.right - image.crop.left,
      image.crop.bottom - image.crop.top
    )
  }

  // Apply dimensions and quality
  if (width && height) {
    imageBuilder = imageBuilder.width(width).height(height)
  } else if (width) {
    imageBuilder = imageBuilder.width(width)
  } else if (height) {
    imageBuilder = imageBuilder.height(height)
  }

  const imageUrl = imageBuilder.auto('format').quality(quality).url()

  const imageProps = {
    src: imageUrl,
    alt: altText,
    title: title,
    className,
    priority,
    quality,
    style,
  }

  if (fill) {
    return (
      <Image
        {...imageProps}
        alt={altText}
        fill
        sizes={sizes}
      />
    )
  }

  if (width && height) {
    return (
      <Image
        {...imageProps}
        alt={altText}
        width={width}
        height={height}
      />
    )
  }

  // If no dimensions specified, use a default size
  return (
    <Image
      {...imageProps}
      alt={altText}
      width={800}
      height={600}
      sizes={sizes}
    />
  )
}
