export default function imageLoader({ src, width, quality }) {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://amir3629.github.io/vocal-coaching'
    : ''
  
  return `${baseUrl}${src}?w=${width}&q=${quality || 75}`
} 