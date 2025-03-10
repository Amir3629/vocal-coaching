"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { translations } from "@/app/translations"

type Language = keyof typeof translations
type TranslationType = typeof translations[Language]

interface LanguageContextType {
  currentLang: Language
  toggleLanguage: () => void
  t: TranslationType
}

export const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("DE")

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang") as Language
    if (savedLang && (savedLang === "DE" || savedLang === "EN")) {
      setCurrentLang(savedLang)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = currentLang === "DE" ? "EN" : "DE"
    setCurrentLang(newLang)
    localStorage.setItem("preferredLang", newLang)
  }

  const value = {
    currentLang,
    toggleLanguage,
    t: translations[currentLang]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export default function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10 hover:bg-black/60 transition-colors"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={toggleLanguage}
        className="relative text-sm font-medium text-white hover:text-[#C8A97E] transition-colors"
        aria-label={`Switch to ${currentLang === "DE" ? "English" : "German"}`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentLang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            {currentLang === "DE" ? "EN" : "DE"}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  )
} 