import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Prefixes image paths with the correct base path for GitHub Pages deployment
 * @param path The image path to prefix
 * @returns The prefixed path
 */
export function getImagePath(path: string): string {
  // If the path is already a full URL, return it as is
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  
  // If we're in production, prefix with the GitHub Pages base path
  if (process.env.NODE_ENV === 'production') {
    // Make sure the path starts with a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `/vocal-coaching${normalizedPath}`;
  }
  
  // In development, return the path as is
  return path;
}
