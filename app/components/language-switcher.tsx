"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { translations } from "@/app/translations"

export const translations = {
  DE: {
    nav: {
      offers: "Angebote",
      about: "Über Mich",
      references: "Referenzen",
      contact: "Kontakt"
    },
    hero: {
      title: "Vocal Coaching in Berlin",
      subtitle: "Entdecke deine Stimme",
      cta: "Jetzt buchen"
    },
    about: {
      title: "Über Mich",
      description: "Halb Britin, halb Deutsche - und 100%ige Rheinländerin lebe ich freiwillig in Berlin. Meine musikalische Reise begann früh: vom Kinderchor über den Gospelchor \"Crescendo\" bis hin zu \"Die Männer\", einer der ersten Girl Bands in Deutschland.",
      readMore: "Mehr erfahren",
      readLess: "Weniger anzeigen",
      currentProjects: "Aktuelle Projekte",
      projectsText: "Als stolzes Mitglied der internationalen Berliner Jazzszene bin ich nicht nur als Sängerin aktiv, sondern auch als Vocal Coach bei der Bandleiter Ausbildung in Wiesbaden tätig."
    },
    services: {
      title: "Angebote",
      privateTitle: "Einzelunterricht",
      privateDesc: "Individuelles Vocal Coaching",
      workshopTitle: "Workshops",
      workshopDesc: "Gruppenunterricht & Seminare",
      performanceTitle: "Performance Coaching",
      performanceDesc: "Bühnenauftritte & Präsenz",
      choirTitle: "Chor Next Door",
      choirDesc: "Innovatives Chorprojekt"
    },
    gallery: {
      title: "Galerie",
      viewMore: "Mehr anzeigen"
    },
    testimonials: {
      title: "Was meine Schüler sagen"
    },
    contact: {
      title: "Kontakt",
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      send: "Senden",
      success: "Nachricht gesendet!",
      error: "Ein Fehler ist aufgetreten."
    },
    legal: {
      privacy: "Datenschutz",
      terms: "AGB",
      imprint: "Impressum"
    },
    footer: {
      rights: "Alle Rechte vorbehalten"
    }
  },
  EN: {
    nav: {
      offers: "Services",
      about: "About",
      references: "References",
      contact: "Contact"
    },
    hero: {
      title: "Vocal Coaching in Berlin",
      subtitle: "Discover your voice",
      cta: "Book now"
    },
    about: {
      title: "About Me",
      description: "Half British, half German - and 100% Rhinelander living voluntarily in Berlin. My musical journey started early: from children's choir through gospel choir \"Crescendo\" to \"Die Männer\", one of the first girl bands in Germany.",
      readMore: "Read more",
      readLess: "Show less",
      currentProjects: "Current Projects",
      projectsText: "As a proud member of Berlin's international jazz scene, I'm not only active as a singer but also as a vocal coach at the bandleader training in Wiesbaden."
    },
    services: {
      title: "Services",
      privateTitle: "Private Lessons",
      privateDesc: "Individual Vocal Coaching",
      workshopTitle: "Workshops",
      workshopDesc: "Group Classes & Seminars",
      performanceTitle: "Performance Coaching",
      performanceDesc: "Stage Performance & Presence",
      choirTitle: "Choir Next Door",
      choirDesc: "Innovative Choir Project"
    },
    gallery: {
      title: "Gallery",
      viewMore: "View more"
    },
    testimonials: {
      title: "What My Students Say"
    },
    contact: {
      title: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      success: "Message sent!",
      error: "An error occurred."
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      imprint: "Imprint"
    },
    footer: {
      rights: "All rights reserved"
    }
  }
}

type Language = "DE" | "EN"

interface LanguageContextType {
  currentLang: Language
  toggleLanguage: () => void
  translations: typeof translations.DE | typeof translations.EN
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("DE")

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLang") as Language
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = currentLang === "DE" ? "EN" : "DE"
    setCurrentLang(newLang)
    localStorage.setItem("preferredLang", newLang)
  }

  return (
    <LanguageContext.Provider value={{
      currentLang,
      toggleLanguage,
      translations: translations[currentLang]
    }}>
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

export default function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={toggleLanguage}
        className="relative text-sm font-medium text-white hover:text-[#C8A97E] transition-colors"
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