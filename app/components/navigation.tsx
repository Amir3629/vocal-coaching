"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "./language-switcher"
import LanguageSwitcher from "./language-switcher"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()

  const logoPath = process.env.NODE_ENV === 'production'
    ? "/vocal-coaching/vocal-coaching/images/logo/ml-logo.PNG"
    : "/vocal-coaching/images/logo/ml-logo.PNG"

  const links = [
    { href: "/#services", label: t.nav.services },
    { href: "/#about", label: t.nav.about },
    { href: "/#references", label: t.nav.references },
    { href: "/#testimonials", label: t.nav.testimonials },
    { href: "/#contact", label: t.nav.contact },
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname !== '/') {
      router.push('/')
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            onClick={handleLogoClick}
            className="relative w-32 h-12 -mt-1 ml-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={logoPath}
                alt="Mel jazz"
                fill
                className="object-contain brightness-0 invert hover:opacity-80 transition-opacity"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(link.href.split('#')[1] ? `#${link.href.split('#')[1]}` : 'body')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#C8A97E]"
                    : "text-white hover:text-[#C8A97E]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center pl-4 border-l border-white/10">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transform transition-transform ${
                  isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-opacity ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transform transition-transform ${
                  isOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(false)
                      const element = document.querySelector(link.href.split('#')[1] ? `#${link.href.split('#')[1]}` : 'body')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className={`text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "text-[#C8A97E]"
                        : "text-white hover:text-[#C8A97E]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Language Switcher */}
                <div className="pt-4 border-t border-white/10">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 