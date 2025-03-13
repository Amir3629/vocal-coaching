'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

interface TranslatedTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  html?: boolean;
}

export default function TranslatedText({ text, as = 'span', className = '', html = false }: TranslatedTextProps) {
  const { language, translate, translateHtmlContent } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const translateContent = async () => {
      setIsTransitioning(true);
      const translated = html 
        ? await translateHtmlContent(text)
        : await translate(text);
      setTranslatedText(translated);
      setIsTransitioning(false);
    };

    translateContent();
  }, [text, language, translate, translateHtmlContent, html]);

  const Component = motion[as as keyof typeof motion];

  return (
    <AnimatePresence mode="wait">
      <Component
        key={translatedText}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${className} ${isTransitioning ? 'opacity-50' : ''}`}
      >
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: translatedText }} />
        ) : (
          translatedText
        )}
      </Component>
    </AnimatePresence>
  );
} 