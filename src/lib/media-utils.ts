import { urlFor } from './sanity'

export interface MediaAsset {
  asset: {
    _ref: string
    _type: 'reference'
  }
  order: number
}

export interface ImageAsset {
  _id: string
  _type: 'sanity.imageAsset'
  assetId: string
  extension: string
  metadata: {
    dimensions: {
      width: number
      height: number
      aspectRatio: number
    }
    lqip?: string
    palette?: any
  }
  mimeType: string
  originalFilename?: string
  path: string
  sha1hash: string
  size: number
  uploadId: string
  url: string
}

export interface FileAsset {
  _id: string
  _type: 'sanity.fileAsset'
  assetId: string
  extension: string
  mimeType: string
  originalFilename?: string
  path: string
  sha1hash: string
  size: number
  uploadId: string
  url: string
}

export interface SimpleImage {
  url: string
  order: number
  dimensions?: {
    width: number
    height: number
    aspectRatio: number
  }
  lqip?: string
}

/**
 * Get simple image data with order and metadata
 */
export function getSimpleImage(mediaAsset: MediaAsset, imageAsset?: ImageAsset): SimpleImage | null {
  if (!mediaAsset?.asset?._ref) return null

  const builder = urlFor(mediaAsset.asset._ref)
  const url = builder.auto('format').quality(85).url()

  return {
    url,
    order: mediaAsset.order,
    dimensions: imageAsset?.metadata?.dimensions,
    lqip: imageAsset?.metadata?.lqip,
  }
}

/**
 * Generate responsive image URLs with different sizes
 */
export function getResponsiveImageUrls(
  assetRef: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string[] {
  return sizes.map(size => 
    urlFor(assetRef)
      .width(size)
      .auto('format')
      .quality(85)
      .url()
  )
}

/**
 * Get optimized image URL with specific parameters
 */
export function getOptimizedImageUrl(
  assetRef: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  } = {}
): string {
  const { width, height, quality = 85, format = 'auto' } = options
  
  let builder = urlFor(assetRef)
  
  if (width) builder = builder.width(width)
  if (height) builder = builder.height(height)
  if (format !== 'auto') builder = builder.format(format)
  
  return builder.quality(quality).url()
}

/**
 * Extract alt text from various media asset formats
 */
export function extractAltText(asset: any): string {
  if (typeof asset === 'string') return asset
  if (asset?.alt) return asset.alt
  if (asset?.asset?.originalFilename) return asset.asset.originalFilename
  if (asset?.originalFilename) return asset.originalFilename
  return 'Image'
}

/**
 * Extract title from various media asset formats
 */
export function extractTitle(asset: any): string | undefined {
  if (asset?.title) return asset.title
  if (asset?.asset?.originalFilename) return asset.asset.originalFilename
  if (asset?.originalFilename) return asset.originalFilename
  return undefined
}
