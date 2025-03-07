"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cookie, Shield, Info } from "lucide-react"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      // Add a small delay before showing the consent
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Cookie Consent Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl"
          >
            <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-[#C8A97E]/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              {/* Background Pattern */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97E]/10 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(200,169,126,0.1),transparent_70%)]" />
              </div>

              {/* Content */}
              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-[#C8A97E]/10">
                    <Cookie className="w-6 h-6 text-[#C8A97E]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2">Cookie-Einstellungen</h2>
                    <p className="text-gray-400 text-sm">
                      Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten.
                    </p>
                  </div>
                  <button
                    onClick={handleDecline}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Features */}
                <div className="grid gap-4 mb-6 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#C8A97E]/5">
                      <Shield className="w-5 h-5 text-[#C8A97E]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white mb-1">Sicherheit & Leistung</h3>
                      <p className="text-xs text-gray-400">Essenzielle Cookies für die Funktionalität der Website</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#C8A97E]/5">
                      <Info className="w-5 h-5 text-[#C8A97E]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white mb-1">Personalisierung</h3>
                      <p className="text-xs text-gray-400">Cookies für ein maßgeschneidertes Nutzererlebnis</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleAccept}
                    className="flex-1 px-6 py-2.5 bg-[#C8A97E] hover:bg-[#B69A6E] text-black font-medium rounded-xl transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Alle akzeptieren
                  </motion.button>
                  <motion.button
                    onClick={handleDecline}
                    className="flex-1 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Nur essenzielle Cookies
                  </motion.button>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-xs text-gray-400">
                    Durch Klicken auf "Alle akzeptieren" stimmen Sie der Verwendung aller Cookies zu. 
                    Weitere Informationen finden Sie in unserer{" "}
                    <a href="#" className="text-[#C8A97E] hover:underline">Datenschutzerklärung</a>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 