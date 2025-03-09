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
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md" : "bg-transparent"
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
            <button
              onClick={() => scrollToSection("angebote")}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors"
            >
              {t?.nav?.offers || "Angebote"}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors"
            >
              {t?.nav?.about || "Über Mich"}
            </button>
            <button
              onClick={() => scrollToSection("references")}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors"
            >
              {t?.nav?.references || "Referenzen"}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors"
            >
              {t?.nav?.contact || "Kontakt"}
            </button>
            
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors text-sm font-medium"
            >
              {currentLang === 'DE' ? 'EN' : 'DE'}
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  )
} 