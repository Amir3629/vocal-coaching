"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../app/components/language-switcher"

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { translations } = useLanguage()

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

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("top")}
              className="text-2xl font-light tracking-wider text-white hover:text-[#C8A97E] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ML
            </motion.button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-light text-white hover:text-[#C8A97E] transition-colors duration-300"
              >
                {translations.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm font-light text-white hover:text-[#C8A97E] transition-colors duration-300"
              >
                {translations.nav.services}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-sm font-light text-white hover:text-[#C8A97E] transition-colors duration-300"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm font-light text-white hover:text-[#C8A97E] transition-colors duration-300"
              >
                {translations.nav.testimonials}
              </button>
              <div className="h-4 w-px bg-white/20" />
              <Button
                onClick={() => window.open('https://chornextdoor.de', '_blank')}
                variant="outline"
                className="border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black rounded-full px-5 py-1 text-sm transition-all duration-300"
              >
                Chor Next Door
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full px-5 py-1 text-sm transition-all duration-300"
              >
                {translations.nav.contact}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-white p-2 -mr-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-md md:hidden"
          >
            <motion.div 
              className="flex flex-col items-center justify-center h-full space-y-8 p-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <button
                onClick={() => scrollToSection("about")}
                className="text-xl font-light text-white hover:text-[#C8A97E] transition-colors duration-300"
              >
                {translations.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-xl font-light text-white hover:text-[#C8A97E] transition-colors duration-300"
              >
                {translations.nav.services}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-xl font-light text-white hover:text-[#C8A97E] transition-colors duration-300"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-xl font-light text-white hover:text-[#C8A97E] transition-colors duration-300"
              >
                {translations.nav.testimonials}
              </button>
              <div className="h-px w-16 bg-white/20 my-4" />
              <Button
                onClick={() => window.open('https://chornextdoor.de', '_blank')}
                variant="outline"
                className="border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black rounded-full px-8 py-2 text-lg transition-all duration-300"
              >
                Chor Next Door
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full px-8 py-2 text-lg transition-all duration-300"
              >
                {translations.nav.contact}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

