/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: false,
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: ['github.com', 'amir3629.github.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/vocal-coaching' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vocal-coaching/' : '',
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  optimizeFonts: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig