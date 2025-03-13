"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from 'react-i18next'
import { changeLanguage, getCurrentLanguage } from '../i18n'

// Keep the translations for components that don't get translated by i18next
const translations = {
  de: {
    nav: {
      home: "Start",
      services: "Unterricht",
      about: "Über mich",
      references: "Referenzen & Kooperationen",
      testimonials: "Erfahrungen",
      contact: "Kontakt",
    },
    hero: {
      title: "Entdecke deine Stimme",
      subtitle: "Professionelles Vocal Coaching in Berlin",
      cta: "Jetzt buchen"
    },
    music: {
      title: "Meine Musik"
    },
    video: {
      title: "Einblicke"
    },
    services: {
      title: "Angebote",
      singing: {
        title: "Gesangsunterricht",
        description: "Individueller Unterricht für alle Level",
        features: [
          "Stimmbildung",
          "Atemtechnik",
          "Interpretation",
          "Bühnenpräsenz"
        ],
        details: {
          includes: [
            "Stimmanalyse",
            "Individueller Trainingsplan",
            "Aufnahmen",
            "Übe-Material"
          ],
          suitable: [
            "Anfänger",
            "Fortgeschrittene",
            "Profis",
            "Alle Genres"
          ],
          duration: "60-90 min",
          location: "Online & Studio Berlin"
        }
      }
    },
    about: {
      title: "Über mich",
      intro: "Professionelle Sängerin & Vocal Coach",
      expanded: "Mit jahrelanger Erfahrung im Gesangsunterricht...",
      projects: {
        title: "Aktuelle Projekte",
        description: "Entdecken Sie meine aktuellen musikalischen Projekte"
      },
      more: "Mehr erfahren",
      less: "Weniger anzeigen"
    },
    references: {
      title: "Referenzen & Kooperationen"
    },
    testimonials: {
      title: "Erfahrungen"
    },
    contact: {
      title: "Kontakt",
      form: {
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
        send: "Senden"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Lessons",
      about: "About",
      references: "References & Collaborations",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    hero: {
      title: "Discover Your Voice",
      subtitle: "Professional Vocal Coaching in Berlin",
      cta: "Book Now"
    },
    music: {
      title: "My Music"
    },
    video: {
      title: "Insights"
    },
    services: {
      title: "Services",
      singing: {
        title: "Singing Lessons",
        description: "Individual lessons for all levels",
        features: [
          "Voice Training",
          "Breathing Technique",
          "Interpretation",
          "Stage Presence"
        ],
        details: {
          includes: [
            "Voice Analysis",
            "Individual Training Plan",
            "Recordings",
            "Practice Material"
          ],
          suitable: [
            "Beginners",
            "Advanced",
            "Professionals",
            "All Genres"
          ],
          duration: "60-90 min",
          location: "Online & Studio Berlin"
        }
      }
    },
    about: {
      title: "About Me",
      intro: "Professional Singer & Vocal Coach",
      expanded: "With years of experience in vocal training...",
      projects: {
        title: "Current Projects",
        description: "Discover my current musical projects"
      },
      more: "Learn More",
      less: "Show Less"
    },
    references: {
      title: "References & Collaborations"
    },
    testimonials: {
      title: "Testimonials"
    },
    contact: {
      title: "Contact",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send"
      }
    }
  }
}

type LanguageContextType = {
  currentLang: string
  toggleLanguage: () => void
  t: typeof translations.de | typeof translations.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<string>("de")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = getCurrentLanguage()
    setCurrentLang(lang)
  }, [])

  const toggleLanguage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true)
    const newLang = currentLang === "de" ? "en" : "de"
    
    changeLanguage(newLang).then(() => {
      setCurrentLang(newLang)
      localStorage.setItem('preferredLanguage', newLang)
      setTimeout(() => setIsTransitioning(false), 500)
    })
  }

  const value = {
    currentLang,
    toggleLanguage,
    t: translations[currentLang as keyof typeof translations]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation()
  
  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={toggleLanguage}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
    >
      <span className="text-sm font-medium text-white">
        {currentLang.toUpperCase()}
      </span>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 -bottom-8 text-xs text-white/70 whitespace-nowrap"
          >
            {t('language.switchTo')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default LanguageSwitcher; 