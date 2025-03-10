"use client"

import { createContext, useContext, useState } from "react"
import { motion } from "framer-motion"

const translations = {
  de: {
    nav: {
      home: "Start",
      services: "Angebote",
      about: "Über mich",
      references: "Referenzen",
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
      title: "Referenzen"
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
      services: "Services",
      about: "About",
      references: "References",
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
      title: "Partners & Collaborations"
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