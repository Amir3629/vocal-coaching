/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vocal-coaching-website',
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // This is required for GitHub Pages
  assetPrefix: '/vocal-coaching-website/',
}

module.exports = nextConfig