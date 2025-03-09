"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const translations = {
  DE: {
    nav: {
      home: "Start",
      about: "Über Mich",
      services: "Angebote",
      testimonials: "Referenzen",
      contact: "Kontakt"
    },
    hero: {
      title: "Professionelles Vocal Coaching",
      subtitle: "Jazz • Pop • Musical",
      cta: "Jetzt buchen"
    },
    about: {
      title: "Über Mich",
      readMore: "Mehr erfahren",
      readLess: "Weniger anzeigen"
    },
    services: {
      title: "Meine Angebote",
      privateTitle: "Einzelunterricht",
      privateDesc: "Individuelles Coaching für deine Stimme",
      groupTitle: "Gruppenunterricht",
      groupDesc: "Gemeinsam Singen und Lernen",
      workshopTitle: "Workshops",
      workshopDesc: "Intensive Trainingseinheiten",
      includes: "Beinhaltet",
      suitable: "Geeignet für",
      duration: "Dauer",
      location: "Ort",
      price: "Preis"
    },
    testimonials: {
      title: "Was meine Schüler sagen"
    },
    contact: {
      title: "Kontakt",
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      send: "Senden"
    },
    footer: {
      rights: "Alle Rechte vorbehalten",
      legal: {
        privacy: "Datenschutz",
        terms: "AGB",
        imprint: "Impressum"
      }
    },
    partners: {
      title: "Partner & Kollaborationen"
    }
  },
  EN: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      testimonials: "Testimonials",
      contact: "Contact"
    },
    hero: {
      title: "Professional Vocal Coaching",
      subtitle: "Jazz • Pop • Musical",
      cta: "Book Now"
    },
    about: {
      title: "About Me",
      readMore: "Read More",
      readLess: "Show Less"
    },
    services: {
      title: "My Services",
      privateTitle: "Private Lessons",
      privateDesc: "Individual coaching for your voice",
      groupTitle: "Group Classes",
      groupDesc: "Learn and sing together",
      workshopTitle: "Workshops",
      workshopDesc: "Intensive training sessions",
      includes: "Includes",
      suitable: "Suitable for",
      duration: "Duration",
      location: "Location",
      price: "Price"
    },
    testimonials: {
      title: "What My Students Say"
    },
    contact: {
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send"
    },
    footer: {
      rights: "All rights reserved",
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms",
        imprint: "Imprint"
      }
    },
    partners: {
      title: "Partners & Collaborations"
    }
  }
}

type Language = "DE" | "EN"
type TranslationType = typeof translations.DE

interface LanguageContextType {
  currentLanguage: Language
  translations: TranslationType
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("DE")
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") as Language
    if (savedLang && (savedLang === "DE" || savedLang === "EN")) {
      setCurrentLanguage(savedLang)
    }
    setIsInitialLoad(false)
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem("preferredLanguage", lang)
  }

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      translations: translations[currentLanguage],
      setLanguage
    }}>
      <AnimatePresence mode="wait">
        {!isInitialLoad && (
          <motion.div
            key={currentLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
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
  const { currentLanguage, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(currentLanguage === "DE" ? "EN" : "DE")
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-30 px-4 py-1.5 bg-black/80 backdrop-blur-sm border border-[#C8A97E] rounded-full text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black transition-all duration-300 text-sm font-light tracking-wider"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        key={currentLanguage}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {currentLanguage === "DE" ? "EN" : "DE"}
      </motion.span>
    </motion.button>
  )
}