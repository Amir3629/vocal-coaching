/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/vocal-coaching' : '',
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vocal-coaching/' : '',
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig