/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/vocal-coaching' : '',
  images: {
    loader: 'custom',
    loaderFile: './app/image-loader.js'
  }
}

module.exports = nextConfig
