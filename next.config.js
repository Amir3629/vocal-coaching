/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vocal-coaching',
  images: {
    unoptimized: true,
  },
  // Disable server-side features
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig