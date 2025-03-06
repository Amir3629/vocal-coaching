/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amir3629.github.io',
        pathname: '/vocal-coaching/**',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/vocal-coaching' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vocal-coaching/' : '',
  trailingSlash: true,
}

module.exports = nextConfig