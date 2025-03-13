"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import TranslatedText from "./translated-text"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-black/95 text-white p-4 z-50"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-center sm:text-left">
              <TranslatedText text="Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. Durch die weitere Nutzung der Website stimmen Sie der Verwendung von Cookies zu." />
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
                onClick={handleDecline}
              >
                <TranslatedText text="Ablehnen" />
              </Button>
              <Button
                className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black"
                onClick={handleAccept}
              >
                <TranslatedText text="Akzeptieren" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}