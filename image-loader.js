module.exports = function imageLoader({ src, width, quality }) {
  // Remove any leading slashes
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // If the src is already an absolute URL, return it as is
  if (cleanSrc.startsWith('http')) {
    return cleanSrc;
  }
  
  // In development, use relative paths
  if (process.env.NODE_ENV === 'development') {
    return `/${cleanSrc}`;
  }
  
  // For production, use the basePath from next.config.js
  return `/vocal-coaching-website/${cleanSrc}`;
} 