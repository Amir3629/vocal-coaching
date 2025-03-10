"use client"

import { createContext, useContext, useState } from "react"
import { motion } from "framer-motion"

const translations = {
  de: {
    nav: {
      services: "Angebote",
      about: "Über mich",
      references: "Referenzen",
      testimonials: "Erfahrungen",
      contact: "Kontakt",
    },
    references: {
      title: "Referenzen"
    },
    // ... other translations
  },
  en: {
    nav: {
      services: "Services",
      about: "About",
      references: "References",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    references: {
      title: "References"
    },
    // ... other translations
  },
}

const LanguageContext = createContext<{
  currentLang: string
  toggleLanguage: () => void
  t: typeof translations.de | typeof translations.en
}>({
  currentLang: "de",
  toggleLanguage: () => {},
  t: translations.de,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState("de")

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === "de" ? "en" : "de"))
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        toggleLanguage,
        t: translations[currentLang as keyof typeof translations],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export default function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${currentLang === "de" ? "text-[#C8A97E]" : "text-white/60"}`}>
          DE
        </span>
        <span className="text-white/30">|</span>
        <span className={`text-sm font-medium ${currentLang === "en" ? "text-[#C8A97E]" : "text-white/60"}`}>
          EN
        </span>
      </div>
    </motion.button>
  )
} 