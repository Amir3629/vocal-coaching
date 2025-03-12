/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/vocal-coaching' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vocal-coaching/' : '',
  trailingSlash: true,
  optimizeFonts: true,
  experimental: {
    optimizeFonts: true,
  },
}

module.exports = nextConfig
