export default function imageLoader({ src, width, quality }) {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://amir3629.github.io/vocal-coaching'
    : ''
  
  // Remove any leading slashes to prevent double slashes in the URL
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src
  
  return `${baseUrl}/${cleanSrc}`
} 