"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import TranslatedText from "./translated-text"
import { useTranslation } from "@/lib/translation"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { currentLanguage, setLanguage } = useTranslation()

  const menuItems = [
    { id: "unterricht", label: "Unterricht" },
    { id: "about", label: "Über mich" },
    { id: "references", label: "Referenzen & Kooperationen" },
    { id: "experience", label: "Erfahrungen" },
    { id: "contact", label: "Kontakt" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'de' ? 'en' : 'de')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-white font-medium">
            <TranslatedText text="Mel jazz" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-white/70 hover:text-white transition-colors"
              >
                <TranslatedText text={item.label} />
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              {currentLanguage.toUpperCase()}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-white/70 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <TranslatedText text={item.label} />
                  </a>
                ))}
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 w-fit rounded border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
                >
                  {currentLanguage.toUpperCase()}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}