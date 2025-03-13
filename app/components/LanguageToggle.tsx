'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, isTranslating } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'DE' ? 'EN' : 'DE');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
        ${isTranslating ? 'opacity-50 cursor-wait' : 'hover:bg-[#C8A97E]/10'}
        border border-[#C8A97E]/30 text-[#C8A97E]`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isTranslating}
    >
      <motion.span
        key={language}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {language}
      </motion.span>
      {isTranslating && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-4 h-4 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
    </motion.button>
  );
} 