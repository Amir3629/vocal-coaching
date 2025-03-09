"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-switcher"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { translations: t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offset = 80 // Height of the navbar
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setIsOpen(false) // Close mobile menu after clicking
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    setIsOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#" onClick={scrollToTop} className="text-white text-2xl font-semibold">
            Logo
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors">
              {t.nav.services}
            </a>
            <a href="#about" className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors">
              {t.nav.about}
            </a>
            <a href="#testimonials" className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors">
              {t.nav.testimonials}
            </a>
            <a href="#contact" className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors">
              {t.nav.contact}
            </a>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full px-6"
            >
              {t.nav.contact}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#C8A97E] hover:text-[#B69A6E] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
              <a href="#services" className="text-xl text-white hover:text-[#C8A97E] transition-colors">
                {t.nav.services}
              </a>
              <a href="#about" className="text-xl text-white hover:text-[#C8A97E] transition-colors">
                {t.nav.about}
              </a>
              <a href="#testimonials" className="text-xl text-white hover:text-[#C8A97E] transition-colors">
                {t.nav.testimonials}
              </a>
              <Button
                onClick={() => {
                  scrollToSection("contact")
                  setIsOpen(false)
                }}
                className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full px-8 py-3 text-lg w-full max-w-[200px]"
              >
                {t.nav.contact}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 