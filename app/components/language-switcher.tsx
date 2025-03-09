"use client"

import { useState, createContext, useContext, useEffect } from "react"
import { motion } from "framer-motion"

// Create language context
export const LanguageContext = createContext<{
  language: 'DE' | 'EN';
  setLanguage: (lang: 'DE' | 'EN') => void;
  translations: Record<string, any>;
}>({
  language: 'DE',
  setLanguage: () => {},
  translations: {}
});

const translations = {
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
    // Add more translations here
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
    // Add more translations here
  }
};

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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translations[language] }}>
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