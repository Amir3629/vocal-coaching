"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={scrollToTop}
              className="text-2xl font-bold text-white hover:text-[#C8A97E] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              MW
            </motion.button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-white hover:text-[#C8A97E] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-[#C8A97E] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-white hover:text-[#C8A97E] transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-white hover:text-[#C8A97E] transition-colors"
              >
                Testimonials
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full px-6"
              >
                Contact
              </Button>
              <Button
                onClick={() => window.open('https://chornextdoor.de', '_blank')}
                variant="outline"
                className="border-2 border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black rounded-full px-6"
              >
                Chor Next Door
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden pt-20"
          >
            <div className="flex flex-col items-center space-y-8 p-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-xl text-white hover:text-[#C8A97E] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-xl text-white hover:text-[#C8A97E] transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-xl text-white hover:text-[#C8A97E] transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-xl text-white hover:text-[#C8A97E] transition-colors"
              >
                Testimonials
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full px-8 py-2 w-full"
              >
                Contact
              </Button>
              <Button
                onClick={() => window.open('https://chornextdoor.de', '_blank')}
                variant="outline"
                className="border-2 border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black rounded-full px-8 py-2 w-full"
              >
                Chor Next Door
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 