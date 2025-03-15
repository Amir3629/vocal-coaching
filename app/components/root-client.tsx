"use client"

import React, { useEffect } from "react"

interface RootClientProps {
  children: React.ReactNode
  className?: string
}

export default function RootClient({ children, className = "" }: RootClientProps) {
  useEffect(() => {
    // Add any client-side initialization here
    const handleResize = () => {
      // Example: Update CSS variables based on viewport size
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }

    // Initial call
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={className}>
      {children}
    </div>
  )
} 