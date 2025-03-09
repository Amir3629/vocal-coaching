"use client"

import { useState, createContext, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Create language context
export const LanguageContext = createContext<{
  language: 'DE' | 'EN';
  setLanguage: (lang: 'DE' | 'EN') => void;
}>({
  language: 'DE',
  setLanguage: () => {},
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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
      <Button
        variant="ghost"
        onClick={toggleLanguage}
        className="text-[#C8A97E] hover:text-[#B69A6E] hover:bg-[#C8A97E]/10 rounded-full px-3 py-1 text-sm font-medium"
      >
        {language === 'DE' ? 'EN' : 'DE'}
      </Button>
    </motion.div>
  )
} 