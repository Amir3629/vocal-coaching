"use client"

import React, { createContext, useState, useContext } from "react"
import { motion } from "framer-motion"

export const translations = {
  DE: {
    nav: {
      offers: "Angebote",
      about: "Über Mich",
      references: "Referenzen",
      contact: "Kontakt"
    },
    hero: {
      title: "Entdecke deine Stimme",
      subtitle: "Professionelles Vocal Coaching in Berlin",
      cta: "Jetzt starten"
    },
    about: {
      title: "Über Mich",
      description: "Halb Britin, halb Deutsche - und 100%ige Rheinländerin lebe ich freiwillig in Berlin.",
      readMore: "Mehr erfahren",
      readLess: "Weniger anzeigen",
      currentProjects: "Aktuelle Projekte",
      projectsText: "Als stolzes Mitglied der internationalen Berliner Jazzszene"
    },
    partners: {
      title: "Partner & Kollaborationen",
      subtitle: "Gemeinsam Musik gestalten"
    },
    services: {
      title: "Angebote",
      subtitle: "Maßgeschneiderte Gesangsausbildung"
    },
    testimonials: {
      title: "Was meine Schüler sagen",
      subtitle: "Erfahrungsberichte"
    },
    contact: {
      title: "Kontakt",
      subtitle: "Lass uns sprechen",
      form: {
        name: "Name",
        email: "E-Mail",
        message: "Nachricht",
        submit: "Senden"
      }
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
      title: "Discover Your Voice",
      subtitle: "Professional Vocal Coaching in Berlin",
      cta: "Get Started"
    },
    about: {
      title: "About Me",
      description: "Half British, half German - and 100% Rhinelander living voluntarily in Berlin.",
      readMore: "Read More",
      readLess: "Show Less",
      currentProjects: "Current Projects",
      projectsText: "As a proud member of Berlin's international jazz scene"
    },
    partners: {
      title: "Partners & Collaborations",
      subtitle: "Creating Music Together"
    },
    services: {
      title: "Services",
      subtitle: "Tailored Vocal Training"
    },
    testimonials: {
      title: "What My Students Say",
      subtitle: "Testimonials"
    },
    contact: {
      title: "Contact",
      subtitle: "Let's Talk",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send"
      }
    },
    legal: {
      privacy: "Privacy",
      terms: "Terms",
      imprint: "Imprint"
    },
    footer: {
      rights: "All Rights Reserved"
    }
  }
}

type Language = "DE" | "EN"

interface LanguageContextType {
  currentLang: Language
  toggleLanguage: () => void
  translations: typeof translations.DE | typeof translations.EN
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("DE")

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === "DE" ? "EN" : "DE")
  }

  const value = {
    currentLang,
    toggleLanguage,
    translations: translations[currentLang]
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

export default function LanguageSwitcher() {
  const { currentLang, toggleLanguage } = useLanguage()

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors text-sm font-medium"
    >
      {currentLang === 'DE' ? 'EN' : 'DE'}
    </motion.button>
  )
} 