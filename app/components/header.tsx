"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/translation"

export default function Header() {
  const { currentLanguage, setLanguage } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'de' ? 'en' : 'de')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center space-x-8">
          {/* Your existing navigation items */}
        </nav>
        
        <motion.button
          onClick={toggleLanguage}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative px-4 py-2 rounded-lg text-white/70 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">
            {currentLanguage.toUpperCase()}
          </span>
          <motion.div
            className="absolute inset-0 bg-white/5 rounded-lg"
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      </div>
    </header>
  )
} 