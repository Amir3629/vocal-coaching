"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Mail, Send } from "lucide-react"
import Image from "next/image"
import SuccessMessage from "./success-message"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [bgImageError, setBgImageError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <>
      <section id="contact" className="relative min-h-screen py-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C8A97E]/20 via-[#C8A97E]/5 to-transparent opacity-40" />
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(200,169,126,0.1)_0deg,transparent_60deg,rgba(200,169,126,0.1)_120deg,transparent_180deg,rgba(200,169,126,0.1)_240deg,transparent_300deg,rgba(200,169,126,0.1)_360deg)]" />
          </div>
          {!bgImageError && (
            <div className="absolute inset-0">
              <Image
                src={process.env.NODE_ENV === 'production'
                  ? "/vocal-coaching/images/backgrounds/contact-bg.jpg"
                  : "/images/backgrounds/contact-bg.jpg"}
                alt="Contact Background"
                fill
                className="object-cover mix-blend-overlay opacity-40"
                priority
                onError={() => setBgImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading mb-4">Kontakt</h2>
            <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-8 border border-white/10 shadow-[0_8px_32px_rgba(200,169,126,0.15)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#C8A97E]/10 rounded-lg shrink-0">
                    <MapPin className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80 mb-1">Standort</h3>
                    <p className="text-base text-gray-400">Studio Berlin-Mitte</p>
                    <p className="text-base text-gray-400">Torstraße 177, 10115 Berlin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#C8A97E]/10 rounded-lg shrink-0">
                    <Clock className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80 mb-1">Verfügbarkeit</h3>
                    <p className="text-base text-gray-400">Montag - Freitag</p>
                    <p className="text-base text-gray-400">09:00 - 21:00 Uhr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#C8A97E]/10 rounded-lg shrink-0">
                    <Mail className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80 mb-1">Email</h3>
                    <p className="text-base text-gray-400">info@melanie-wainwright.de</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Ihre Nachricht"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A97E] transition-colors resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="max-w-[200px] mx-auto bg-[#C8A97E] hover:bg-[#B89A6F] text-black font-medium rounded-lg px-5 py-2.5 flex items-center justify-center gap-2 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4" />
                    Nachricht senden
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SuccessMessage
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Nachricht gesendet!"
        message="Vielen Dank für Ihre Nachricht. Ich werde mich in Kürze bei Ihnen melden."
      />
    </>
  )
} 