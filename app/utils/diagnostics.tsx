"use client"

import React, { useState, useEffect } from "react"

export function DebugPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [sections, setSections] = useState<string[]>([])

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Find all sections with IDs
    const sectionElements = document.querySelectorAll('[id]')
    const sectionIds = Array.from(sectionElements).map(el => el.id)
    
    // Log found sections
    sectionIds.forEach(id => {
      console.log(`Section with id "${id}" found`)
    })
    
    setSections(sectionIds)

    // Add keyboard shortcut to toggle debug panel (Ctrl+Shift+D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg shadow-lg max-w-xs max-h-96 overflow-auto">
      <h3 className="text-sm font-bold mb-2">Debug Panel (Ctrl+Shift+D)</h3>
      <div className="text-xs">
        <p className="mb-2">Sections:</p>
        <ul className="list-disc pl-4">
          {sections.map(id => (
            <li key={id} className="mb-1">
              <button 
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-blue-300 hover:underline"
              >
                {id}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 