"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/app/components/language-switcher"
import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentLang, toggleLanguage, translations: t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const logoPath = process.env.NODE_ENV === 'production' 
    ? "/vocal-coaching/images/logo/ml-signature.svg"
    : "/images/logo/ml-signature.svg"

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-24">
            {/* ML Signature Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-[140px] h-[70px]"
              >
                <Image
                  src={logoPath}
                  alt="ML Signature"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-12">
                <button
                  onClick={() => scrollToSection("angebote")}
                  className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-base tracking-wider"
                >
                  {t?.nav?.offers || "Angebote"}
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-base tracking-wider"
                >
                  {t?.nav?.about || "Über Mich"}
                </button>
                <button
                  onClick={() => scrollToSection("references")}
                  className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-base tracking-wider"
                >
                  {t?.nav?.references || "Referenzen"}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-base tracking-wider"
                >
                  {t?.nav?.contact || "Kontakt"}
                </button>
              </div>
              <div className="ml-12 border-l border-[#C8A97E]/20 pl-12">
                <motion.button
                  onClick={toggleLanguage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-base tracking-wider"
                >
                  {currentLang === 'DE' ? 'EN' : 'DE'}
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-[#C8A97E] p-2 hover:text-[#B69A6E] transition-colors duration-300" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden pt-24"
          >
            <div className="flex flex-col items-center space-y-8 p-8">
              <button
                onClick={() => scrollToSection("angebote")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg tracking-wider"
              >
                {t?.nav?.offers || "Angebote"}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg tracking-wider"
              >
                {t?.nav?.about || "Über Mich"}
              </button>
              <button
                onClick={() => scrollToSection("references")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg tracking-wider"
              >
                {t?.nav?.references || "Referenzen"}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg tracking-wider"
              >
                {t?.nav?.contact || "Kontakt"}
              </button>
              <div className="pt-4 border-t border-[#C8A97E]/20 w-24 text-center">
                <motion.button
                  onClick={toggleLanguage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg tracking-wider"
                >
                  {currentLang === 'DE' ? 'EN' : 'DE'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

