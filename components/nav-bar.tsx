"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/components/language-switcher"
import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { translations: t } = useLanguage()

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* ML Signature Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-[100px] h-[50px]"
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
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("angebote")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-sm font-medium"
              >
                {t?.nav?.offers || "Services"}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-sm font-medium"
              >
                {t?.nav?.about || "About"}
              </button>
              <button
                onClick={() => scrollToSection("references")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-sm font-medium"
              >
                {t?.nav?.references || "References"}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-sm font-medium"
              >
                {t?.nav?.contact || "Contact"}
              </button>
              <Button
                onClick={() => window.open('https://chornextdoor.de', '_blank')}
                variant="outline"
                className="border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black rounded-full px-6 text-sm font-medium transition-all duration-300"
              >
                Chor Next Door
              </Button>
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden pt-20"
          >
            <div className="flex flex-col items-center space-y-6 p-8">
              <button
                onClick={() => scrollToSection("angebote")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg font-medium"
              >
                {t?.nav?.offers || "Services"}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg font-medium"
              >
                {t?.nav?.about || "About"}
              </button>
              <button
                onClick={() => scrollToSection("references")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg font-medium"
              >
                {t?.nav?.references || "References"}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[#C8A97E] hover:text-[#B69A6E] transition-colors duration-300 text-lg font-medium"
              >
                {t?.nav?.contact || "Contact"}
              </button>
              <Button
                onClick={() => window.open('https://chornextdoor.de', '_blank')}
                variant="outline"
                className="border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black rounded-full px-8 py-2 text-lg font-medium transition-all duration-300"
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

