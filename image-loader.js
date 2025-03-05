module.exports = function imageLoader({ src, width, quality }) {
  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // If the src is already an absolute URL, return it as is
  if (cleanSrc.startsWith('http')) {
    return src;
  }
  
  // In development, use relative paths
  if (process.env.NODE_ENV === 'development') {
    return `/${cleanSrc}`;
  }
  
  // For production, use the basePath
  return `/vocal-coaching-website/${cleanSrc}`;
} 