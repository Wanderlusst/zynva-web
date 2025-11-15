/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable the new app directory
    appDir: true,
    // Enable instrumentation
    instrumentationHook: true,
  },
  images: {
    domains: ['cdn.sanity.io', 'www.figma.com', 'images.unsplash.com'],
  },
}

export default nextConfig