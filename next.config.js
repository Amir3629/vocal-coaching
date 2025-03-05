/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vocal-coaching-website',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
    path: '/vocal-coaching-website',
    domains: ['amir3629.github.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amir3629.github.io',
        pathname: '/vocal-coaching-website/**',
      },
    ],
  },
  // This is required for GitHub Pages
  assetPrefix: '/vocal-coaching-website/',
  // Add trailing slash to match GitHub Pages behavior
  trailingSlash: true,
}

module.exports = nextConfig