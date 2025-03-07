"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle } from "lucide-react"

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
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="relative overflow-hidden rounded-xl bg-[#0A0A0A] border border-[#C8A97E]/20 shadow-[0_8px_32px_rgba(200,169,126,0.15)] backdrop-blur-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97E]/5 via-transparent to-transparent" />
            
            <div className="relative p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#C8A97E]/10">
                  <AlertCircle className="w-6 h-6 text-[#C8A97E]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2">Bitte akzeptieren Sie die Regeln</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Um fortzufahren, müssen Sie unseren Nutzungsbedingungen zustimmen.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAccept}
                      className="px-4 py-2 rounded-lg bg-[#C8A97E] hover:bg-[#B69A6E] text-black text-sm font-medium transition-all duration-300 transform hover:scale-[0.98]"
                    >
                      Akzeptieren
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-4 py-2 rounded-lg border border-[#C8A97E]/20 hover:border-[#C8A97E]/40 text-white text-sm transition-all duration-300 transform hover:scale-[0.98]"
                    >
                      Ablehnen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 