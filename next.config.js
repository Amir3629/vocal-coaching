/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/vocal-coaching' : '',
  images: {
    unoptimized: true,
  },
  // Remove trailing slash for GitHub Pages
  trailingSlash: false,
  // Disable server-side features
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig