export default function imageLoader({ src, width, quality }) {
  const baseUrl = process.env.NODE_ENV === 'production' ? '/vocal-coaching' : ''
  return `${baseUrl}${src}?w=${width}&q=${quality || 75}`
} 