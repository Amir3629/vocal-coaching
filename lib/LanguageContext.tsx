'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translateText, translateHtml } from './translation';

type Language = 'DE' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => Promise<string>;
  translateHtmlContent: (html: string) => Promise<string>;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('DE');
  const [isTranslating, setIsTranslating] = useState(false);

  const translate = async (text: string) => {
    if (language === 'DE') return text;
    setIsTranslating(true);
    try {
      const translated = await translateText(text, language);
      return translated;
    } finally {
      setIsTranslating(false);
    }
  };

  const translateHtmlContent = async (html: string) => {
    if (language === 'DE') return html;
    setIsTranslating(true);
    try {
      const translated = await translateHtml(html, language);
      return translated;
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, translateHtmlContent, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 