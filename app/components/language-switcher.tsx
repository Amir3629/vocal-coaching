"use client"

import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translation"

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useTranslation()

  const toggleLanguage = () => {
    setLanguage(currentLanguage === "de" ? "en" : "de")
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${currentLanguage === "de" ? "text-[#C8A97E]" : "text-white/60"}`}>
          DE
        </span>
        <span className="text-white/30">|</span>
        <span className={`text-sm font-medium ${currentLanguage === "en" ? "text-[#C8A97E]" : "text-white/60"}`}>
          EN
        </span>
      </div>
    </motion.button>
  )
} 