"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-switcher"

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentLang, toggleLanguage, t } = useLanguage()

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
            Mel jazz
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-[#C8A97E]">
              {t.nav.home}
            </a>
            <a href="#services" className="text-white hover:text-[#C8A97E]">
              {t.nav.services}
            </a>
            <a href="#about" className="text-white hover:text-[#C8A97E]">
              {t.nav.about}
            </a>
            <a href="#references" className="text-white hover:text-[#C8A97E]">
              {t.nav.references}
            </a>
            <a href="#testimonials" className="text-white hover:text-[#C8A97E]">
              {t.nav.testimonials}
            </a>
            <a href="#contact" className="text-white hover:text-[#C8A97E]">
              {t.nav.contact}
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