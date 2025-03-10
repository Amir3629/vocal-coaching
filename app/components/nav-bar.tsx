"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "./language-switcher"
import Link from "next/link"
import Image from "next/image"

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentLang, toggleLanguage, translations: t } = useLanguage()

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section with offset for fixed header
  const scrollToSection = (id: string) => {
    console.log(`Attempting to scroll to section: ${id}`)
    const element = document.getElementById(id)
    if (element) {
      console.log(`Found element with id: ${id}`)
      const offset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      
      console.log(`Scrolling to position: ${offsetPosition}`)
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })

      // Close mobile menu after clicking
      setIsMobileMenuOpen(false)
    } else {
      console.error(`Element with id "${id}" not found`)
      // If testimonials section is not found, try references as fallback
      if (id === "testimonials") {
        const referencesElement = document.getElementById("references")
        if (referencesElement) {
          const offset = 80
          const elementPosition = referencesElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - offset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          })
          setIsMobileMenuOpen(false)
        }
      }
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("hero")}
            className="relative w-20 h-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src={process.env.NODE_ENV === 'production' ? '/vocal-coaching/images/logo/ml-logo.PNG' : '/images/logo/ml-logo.PNG'}
                alt="ML Logo"
                width={40}
                height={40}
                className="h-auto w-auto object-contain filter brightness-0 invert"
                onError={(e) => {
                  console.error('Error loading logo:', e);
                  const img = e.target as HTMLImageElement;
                  img.src = process.env.NODE_ENV === 'production' ? '/vocal-coaching/images/logo/ml-logo.PNG' : '/images/logo/ml-logo.PNG';
                }}
              />
            </Link>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-[#C8A97E] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <motion.button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-[#C8A97E] transition-colors duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t?.nav?.offers || "Services"}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-[#C8A97E] transition-colors duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t?.nav?.about || "Über mich"}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("testimonials")}
              className="text-white hover:text-[#C8A97E] transition-colors duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t?.nav?.references || "Referenzen"}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-[#C8A97E] transition-colors duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t?.nav?.contact || "Kontakt"}
            </motion.button>
            
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-sm font-medium"
            >
              {currentLang === 'DE' ? 'EN' : 'DE'}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            className={`lg:hidden fixed inset-x-0 top-20 bg-black/95 backdrop-blur-md transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            initial={false}
            animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <motion.button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-white hover:text-[#C8A97E] transition-colors duration-300 text-sm font-medium py-2"
                whileHover={{ x: 10 }}
              >
                {t?.nav?.offers || "Services"}
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-white hover:text-[#C8A97E] transition-colors duration-300 text-sm font-medium py-2"
                whileHover={{ x: 10 }}
              >
                {t?.nav?.about || "Über mich"}
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left text-white hover:text-[#C8A97E] transition-colors duration-300 text-sm font-medium py-2"
                whileHover={{ x: 10 }}
              >
                {t?.nav?.references || "Referenzen"}
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-white hover:text-[#C8A97E] transition-colors duration-300 text-sm font-medium py-2"
                whileHover={{ x: 10 }}
              >
                {t?.nav?.contact || "Kontakt"}
              </motion.button>
              
              {/* Mobile Language Switcher */}
              <motion.button
                onClick={toggleLanguage}
                className="block w-full text-left text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-sm font-medium py-2"
                whileHover={{ x: 10 }}
              >
                {currentLang === 'DE' ? 'EN' : 'DE'}
              </motion.button>
            </div>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  )
}
