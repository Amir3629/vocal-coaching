"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-switcher"

export default function TestNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Test different ways of using useLanguage
  const context = useLanguage() // Raw usage
  console.log("Raw context:", context)

  const { currentLang, toggleLanguage, t } = useLanguage() // Correct destructuring
  console.log("Destructured values:", { currentLang, toggleLanguage, t })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-white font-medium text-xl">
            Logo
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {/* Using t directly from useLanguage */}
            <a href="#home" className="text-white hover:text-[#C8A97E]">
              {t.nav.home}
            </a>
            <a href="#services" className="text-white hover:text-[#C8A97E]">
              {t.nav.services}
            </a>
            <a href="#about" className="text-white hover:text-[#C8A97E]">
              {t.nav.about}
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            Menu
          </button>
        </div>
      </div>
    </nav>
  )
} 