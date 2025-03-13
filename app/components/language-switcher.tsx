"use client"

import { createContext, useContext, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Add Google Translate type definitions
declare global {
  interface Window {
    translateTo: (lang: string) => void;
    translationInitialized: boolean;
  }
}

// Keep the translations for components that don't get translated by Google Translate
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lastToggleTime = useRef(0)
  const toggleAttempts = useRef(0)
  const maxRetries = 10

  // Initialize language from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferredLanguage') || 'de';
      setCurrentLang(savedLang);
      
      // Apply the saved language on initial load
      const applyInitialLanguage = () => {
        if (!window.translationInitialized) {
          if (toggleAttempts.current < maxRetries) {
            toggleAttempts.current++;
            setTimeout(applyInitialLanguage, 1000);
            return;
          }
        }
        
        try {
          if (window.translateTo) {
            window.translateTo(savedLang);
          }
        } catch (error) {
          console.error('Error applying initial language:', error);
        }
      };
      
      // Start with a delay to ensure Google Translate is initialized
      setTimeout(applyInitialLanguage, 2000);
    }
  }, []);

  const toggleLanguage = () => {
    if (isTransitioning) return;
    
    const now = Date.now();
    if (now - lastToggleTime.current < 2000) return;
    lastToggleTime.current = now;
    
    setIsTransitioning(true);
    const newLang = currentLang === "de" ? "en" : "de";
    
    const applyTranslation = () => {
      if (!window.translationInitialized) {
        if (toggleAttempts.current < maxRetries) {
          toggleAttempts.current++;
          setTimeout(applyTranslation, 1000);
          return;
        }
      }
      
      try {
        if (window.translateTo) {
          window.translateTo(newLang);
          localStorage.setItem('preferredLanguage', newLang);
          setCurrentLang(newLang);
        }
      } catch (error) {
        console.error('Error toggling language:', error);
      } finally {
        setTimeout(() => setIsTransitioning(false), 1000);
      }
    };
    
    applyTranslation();
  };

  return (
    <LanguageContext.Provider value={{ currentLang, toggleLanguage, t: translations[currentLang as keyof typeof translations] }}>
      {children}
    </LanguageContext.Provider>
  );
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
            {currentLang === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Add default export for backward compatibility
export default LanguageSwitcher; 