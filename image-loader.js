export default function imageLoader({ src }) {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://amir3629.github.io/vocal-coaching'
    : ''
  
  return `${baseUrl}${src}`
} 