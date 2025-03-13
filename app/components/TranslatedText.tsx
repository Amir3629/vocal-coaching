'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

type MotionComponent = typeof motion.div;

interface TranslatedTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  html?: boolean;
}

const motionProps = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: { duration: 0.3 },
};

export default function TranslatedText({ text, as = 'div', className = '', html = false }: TranslatedTextProps) {
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

  const MotionTag = motion[as] as MotionComponent;

  return (
    <AnimatePresence mode="wait">
      <MotionTag
        key={translatedText}
        {...motionProps}
        className={`${className} ${isTransitioning ? 'opacity-50' : ''}`}
        {...(html ? { dangerouslySetInnerHTML: { __html: translatedText } } : { children: translatedText })}
      />
    </AnimatePresence>
  );
} 