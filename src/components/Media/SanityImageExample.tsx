import type { SimpleImageData } from '@/types/cms'

import SanityImage from './Image'

interface SanityImageExampleProps {
  heroImage?: SimpleImageData
  featureImages?: SimpleImageData[]
  logos?: Array<{
    name: string
    logo: SimpleImageData
  }>
}

export default function SanityImageExample({ 
  heroImage, 
  featureImages = [], 
  logos = [] 
}: SanityImageExampleProps) {
  return (
    <div className="space-y-8">
      {/* Hero Image Example */}
      {heroImage && (
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
          <SanityImage 
            image={heroImage}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        </div>
      )}

      {/* Feature Images Grid */}
      {featureImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureImages.map((image, index) => (
            <div key={index} className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <SanityImage 
                image={image}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <h3 className="font-semibold">Image {image.order}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Logo Cloud Example */}
      {logos.length > 0 && (
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {logos.map((logoItem, index) => (
            <div key={index} className="relative h-12 w-32">
              <SanityImage 
                image={logoItem.logo}
                fill
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                sizes="128px"
              />
            </div>
          ))}
        </div>
      )}

      {/* Responsive Image with Custom Sizing */}
      {heroImage && (
        <div className="max-w-md mx-auto">
          <SanityImage 
            image={heroImage}
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
    </div>
  )
}
