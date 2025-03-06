"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false")
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-[#C8A97E]/20 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-2">Cookie-Einstellungen</h3>
                <p className="text-gray-400 text-sm">
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                  Weitere Informationen finden Sie in unserer{" "}
                  <a href="/datenschutz" className="text-[#C8A97E] hover:underline">
                    Datenschutzerklärung
                  </a>
                  .
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecline}
                  className="px-6 py-2 rounded-lg border border-white/10 hover:border-[#C8A97E]/50 text-white transition-all text-sm"
                >
                  Ablehnen
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 rounded-lg bg-[#C8A97E] hover:bg-[#B69A6E] text-black transition-all text-sm font-medium"
                >
                  Akzeptieren
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 