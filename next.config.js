/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  basePath: '/vocal-coaching',
  assetPrefix: '/vocal-coaching/',
  trailingSlash: true,
}

module.exports = nextConfig