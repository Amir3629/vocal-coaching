'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './language-switcher';

interface TranslatedTextProps {
  text: string;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  html?: boolean;
  translations?: {
    de: string;
    en: string;
  };
}

const motionProps = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: { duration: 0.3 },
};

export default function TranslatedText({ 
  text, 
  as = 'div', 
  className = '', 
  html = false,
  translations
}: TranslatedTextProps) {
  const { currentLang } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // If translations are provided, use them
    if (translations) {
      setIsTransitioning(true);
      const newText = currentLang === 'de' ? translations.de : translations.en;
      setTranslatedText(newText);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    } else {
      // Otherwise just use the original text
      setTranslatedText(text);
    }
  }, [text, currentLang, translations]);

  const combinedClassName = `${className} ${isTransitioning ? 'opacity-50' : ''}`;

  // Render the appropriate motion component based on the 'as' prop
  const renderComponent = () => {
    const commonProps = {
      key: translatedText,
      ...motionProps,
      className: combinedClassName,
    };

    // Handle HTML content vs text content
    if (as === 'div') {
      return html 
        ? <motion.div {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.div {...commonProps}>{translatedText}</motion.div>;
    } else if (as === 'span') {
      return html 
        ? <motion.span {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.span {...commonProps}>{translatedText}</motion.span>;
    } else if (as === 'p') {
      return html 
        ? <motion.p {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.p {...commonProps}>{translatedText}</motion.p>;
    } else if (as === 'h1') {
      return html 
        ? <motion.h1 {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.h1 {...commonProps}>{translatedText}</motion.h1>;
    } else if (as === 'h2') {
      return html 
        ? <motion.h2 {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.h2 {...commonProps}>{translatedText}</motion.h2>;
    } else if (as === 'h3') {
      return html 
        ? <motion.h3 {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.h3 {...commonProps}>{translatedText}</motion.h3>;
    } else if (as === 'h4') {
      return html 
        ? <motion.h4 {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.h4 {...commonProps}>{translatedText}</motion.h4>;
    } else if (as === 'h5') {
      return html 
        ? <motion.h5 {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.h5 {...commonProps}>{translatedText}</motion.h5>;
    } else if (as === 'h6') {
      return html 
        ? <motion.h6 {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.h6 {...commonProps}>{translatedText}</motion.h6>;
    } else {
      return html 
        ? <motion.div {...commonProps} dangerouslySetInnerHTML={{ __html: translatedText }} />
        : <motion.div {...commonProps}>{translatedText}</motion.div>;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderComponent()}
    </AnimatePresence>
  );
} 