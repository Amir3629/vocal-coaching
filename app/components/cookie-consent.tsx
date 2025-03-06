"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown, ChevronUp, Check } from "lucide-react"

interface CookieSettings {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // Always true and disabled
    analytics: true,
    marketing: false,
    preferences: true
  })
  
  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent")
    if (!hasConsent) {
      setIsVisible(true)
    } else {
      try {
        const savedSettings = JSON.parse(hasConsent)
        setSettings(savedSettings)
      } catch (e) {
        setIsVisible(true)
      }
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(settings))
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted))
    setIsVisible(false)
  }

  const handleDecline = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    localStorage.setItem("cookieConsent", JSON.stringify(minimalConsent))
    setIsVisible(false)
  }

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'necessary') return // Can't toggle necessary cookies
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-0 left-0 right-0 p-4 z-[999]"
          >
            <div className="max-w-2xl mx-auto bg-[#080505]/90 backdrop-blur-md border border-[#C8A97E]/20 rounded-xl p-6 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-medium text-white">Cookie-Einstellungen</h3>
                <button
                  onClick={handleDecline}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-300 mb-6">
                Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. 
                Sie können selbst entscheiden, welche Kategorien Sie aktivieren möchten.
              </p>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[#C8A97E] hover:text-[#B69A6E] transition-colors mb-4"
              >
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showDetails ? "Details ausblenden" : "Details anzeigen"}
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4 mb-6"
                  >
                    {/* Necessary Cookies */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="font-medium text-white">Notwendige Cookies</p>
                        <p className="text-sm text-gray-400">Diese Cookies sind für die Grundfunktionen der Website erforderlich.</p>
                      </div>
                      <div className="relative">
                        <button
                          disabled
                          className="w-12 h-6 bg-[#C8A97E] rounded-full relative cursor-not-allowed opacity-50"
                        >
                          <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </button>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="font-medium text-white">Analyse Cookies</p>
                        <p className="text-sm text-gray-400">Helfen uns zu verstehen, wie Besucher mit der Website interagieren.</p>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => toggleSetting('analytics')}
                          className={`w-12 h-6 ${settings.analytics ? 'bg-[#C8A97E]' : 'bg-gray-600'} rounded-full relative transition-colors`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.analytics ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="font-medium text-white">Marketing Cookies</p>
                        <p className="text-sm text-gray-400">Werden verwendet, um personalisierte Werbung anzuzeigen.</p>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => toggleSetting('marketing')}
                          className={`w-12 h-6 ${settings.marketing ? 'bg-[#C8A97E]' : 'bg-gray-600'} rounded-full relative transition-colors`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.marketing ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Preference Cookies */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <p className="font-medium text-white">Präferenz Cookies</p>
                        <p className="text-sm text-gray-400">Speichern Ihre Einstellungen und Präferenzen für eine bessere Nutzung.</p>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => toggleSetting('preferences')}
                          className={`w-12 h-6 ${settings.preferences ? 'bg-[#C8A97E]' : 'bg-gray-600'} rounded-full relative transition-colors`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.preferences ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Nur Notwendige
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-black rounded-lg transition-colors"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-[#C8A97E] hover:bg-[#B69A6E] text-black text-sm font-medium rounded-lg transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 