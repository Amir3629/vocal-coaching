"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import '../../lib/i18n'

export type LanguageContextType = {
  currentLang: string
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language || 'de')

  useEffect(() => {
    let isMounted = true

    const savedLang = localStorage.getItem('language') || 'de'
    if (isMounted) {
      setCurrentLang(savedLang)
      i18n.changeLanguage(savedLang)
      document.documentElement.lang = savedLang
    }

    return () => {
      isMounted = false
    }
  }, [i18n])

  const toggleLanguage = () => {
    const newLang = currentLang === 'de' ? 'en' : 'de'
    setCurrentLang(newLang)
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
    document.documentElement.lang = newLang
  }

  return (
    <LanguageContext.Provider value={{ currentLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="text-white hover:text-[#C8A97E] transition-colors"
      aria-label="Toggle language"
    >
      {currentLang.toUpperCase()}
    </button>
  )
} 