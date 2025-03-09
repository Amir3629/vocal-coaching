"use client"

import { useEffect, useState, useContext } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-switcher"

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { currentLang, toggleLanguage, translations: t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Calculate header height (80px) plus some padding
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
        // Add easing function for smoother animation
      })

      // Add focus for accessibility
      element.setAttribute('tabindex', '-1')
      element.focus({ preventScroll: true })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* ML Signature Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-[100px] h-[50px]"
            >
              <Image
                src={process.env.NODE_ENV === 'production' 
                  ? "/vocal-coaching/images/logo/ml-signature.svg"
                  : "/images/logo/ml-signature.svg"}
                alt="ML Signature"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.button
              onClick={() => scrollToSection("angebote")}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t?.nav?.offers || "Angebote"}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("about")}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t?.nav?.about || "Über Mich"}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("references")}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t?.nav?.references || "Referenzen"}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300"
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
        </nav>
      </div>
    </motion.header>
  )
} 