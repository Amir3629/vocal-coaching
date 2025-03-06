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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <>
      <section id="contact" className="relative min-h-screen py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/vocal-coaching/images/backgrounds/contact-bg.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
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
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(200,169,126,0.15)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#C8A97E]/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80 mb-1">Standort</h3>
                    <p className="text-base text-gray-400">Studio Berlin-Mitte</p>
                    <p className="text-base text-gray-400">Torstraße 177, 10115 Berlin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#C8A97E]/10 rounded-lg">
                    <Clock className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80 mb-1">Verfügbarkeit</h3>
                    <p className="text-base text-gray-400">Montag - Freitag</p>
                    <p className="text-base text-gray-400">09:00 - 21:00 Uhr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#C8A97E]/10 rounded-lg">
                    <Mail className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80 mb-1">Email</h3>
                    <p className="text-base text-gray-400">contact@melaniewainwright.de</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/5 border-b border-[#C8A97E]/20 px-4 py-3 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E] transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-white/5 border-b border-[#C8A97E]/20 px-4 py-3 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E] transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Nachricht"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full bg-white/5 border-b border-[#C8A97E]/20 px-4 py-3 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E] transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    className="inline-flex items-center px-6 py-2 bg-[#C8A97E] hover:bg-[#B69A6E] text-black text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-[0.98] hover:shadow-lg gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Senden</span>
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
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