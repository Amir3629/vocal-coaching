"use client"

import { useState, createContext, useContext, useEffect } from "react"
import { motion } from "framer-motion"

export const translations = {
  DE: {
    nav: {
      services: "Leistungen",
      about: "Über Mich",
      gallery: "Galerie",
      testimonials: "Referenzen",
      contact: "Kontakt",
      choir: "Chor Next Door",
      contactButton: "Kontakt",
      choirButton: "Chor Next Door"
    },
    hero: {
      title: "Professionelles Vocal Coaching in Berlin",
      subtitle: "Jazz • Pop • Musical",
      cta: "Jetzt buchen"
    },
    services: {
      title: "Leistungen",
      privateTitle: "Einzelunterricht",
      privateDesc: "Individueller Gesangsunterricht für alle Level",
      workshopTitle: "Workshops & Seminare",
      workshopDesc: "Gruppenunterricht und spezielle Themen",
      performanceTitle: "Performance Coaching",
      performanceDesc: "Bühnenpräsenz und Auftrittsvorbereitung",
      choirTitle: "Chor Next Door",
      choirDesc: "Werde Teil unseres innovativen Chorprojekts"
    },
    about: {
      title: "Über Mich",
      intro: "Halb Britin, halb Deutsche - und 100%ige Rheinländerin lebe ich freiwillig in Berlin.",
      experience: "Nach meinem Studium an der Hochschule für Musik und Tanz Köln vertiefte ich meine Kenntnisse in Jazz-Gesang und Improvisation.",
      current: "Aktuelle Projekte",
      currentText: "Als stolzes Mitglied der internationalen Berliner Jazzszene bin ich nicht nur als Sängerin aktiv, sondern auch als Vocal Coach bei der Bandleiter Ausbildung in Wiesbaden tätig."
    },
    testimonials: {
      title: "Was meine Schüler sagen",
      readMore: "Mehr erfahren",
      showLess: "Weniger anzeigen"
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
    partners: {
      title: "Partner & Kooperationen"
    },
    footer: {
      rights: "Alle Rechte vorbehalten",
      legal: {
        imprint: "Impressum",
        privacy: "Datenschutz",
        terms: "AGB"
      }
    }
  },
  EN: {
    nav: {
      services: "Services",
      about: "About",
      gallery: "Gallery",
      testimonials: "Testimonials",
      contact: "Contact",
      choir: "Choir Next Door",
      contactButton: "Contact",
      choirButton: "Choir Next Door"
    },
    hero: {
      title: "Professional Vocal Coaching in Berlin",
      subtitle: "Jazz • Pop • Musical",
      cta: "Book Now"
    },
    services: {
      title: "Services",
      privateTitle: "Private Lessons",
      privateDesc: "Individual vocal training for all levels",
      workshopTitle: "Workshops & Seminars",
      workshopDesc: "Group lessons and special topics",
      performanceTitle: "Performance Coaching",
      performanceDesc: "Stage presence and performance preparation",
      choirTitle: "Choir Next Door",
      choirDesc: "Join our innovative choir project"
    },
    about: {
      title: "About Me",
      intro: "Half British, half German - and 100% Rhinelander living in Berlin by choice.",
      experience: "After studying at the Cologne University of Music and Dance, I deepened my knowledge in jazz singing and improvisation.",
      current: "Current Projects",
      currentText: "As a proud member of Berlin's international jazz scene, I'm not only active as a singer but also as a vocal coach at the band leader training in Wiesbaden."
    },
    testimonials: {
      title: "What My Students Say",
      readMore: "Read More",
      showLess: "Show Less"
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
    partners: {
      title: "Partners & Collaborations"
    },
    footer: {
      rights: "All rights reserved",
      legal: {
        imprint: "Imprint",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions"
      }
    }
  }
};

// Create language context with default values
export const LanguageContext = createContext<{
  language: 'DE' | 'EN';
  setLanguage: (lang: 'DE' | 'EN') => void;
  translations: typeof translations.DE;
}>({
  language: 'DE',
  setLanguage: () => {},
  translations: translations.DE // Provide default translations
});

// Create language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'DE' | 'EN'>('DE');

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'EN' || savedLang === 'DE') {
      setLanguage(savedLang);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const currentTranslations = translations[language];

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      translations: currentTranslations 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    const newLang = language === 'DE' ? 'EN' : 'DE';
    setLanguage(newLang);
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-6 right-6 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onClick={toggleLanguage}
        className="bg-[#0A0A0A]/80 backdrop-blur-sm text-[#C8A97E] hover:text-[#B69A6E] hover:bg-[#C8A97E]/10 rounded-full px-4 py-2 text-sm font-medium border border-[#C8A97E]/20"
      >
        {language === 'DE' ? 'EN' : 'DE'}
      </motion.button>
    </motion.div>
  )
} 