/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/vocal-coaching' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vocal-coaching/' : '',
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  optimizeFonts: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  experimental: {
    scrollRestoration: true
  }
}

module.exports = nextConfig