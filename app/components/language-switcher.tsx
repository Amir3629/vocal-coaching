"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<'DE' | 'EN'>('DE')

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'DE' ? 'EN' : 'DE')
    // TODO: Implement actual language switching logic
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
        {currentLang === 'DE' ? 'EN' : 'DE'}
      </Button>
    </motion.div>
  )
} 