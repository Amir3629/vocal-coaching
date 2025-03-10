/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/vocal-coaching' : '',
  transpilePackages: ['lucide-react'],
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
