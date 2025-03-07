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
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-bg.jpg"
            alt="Contact background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto bg-black/80 backdrop-blur-sm rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Kontakt</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#C8A97E]" />
                <div>
                  <h3 className="font-medium">Standort</h3>
                  <p className="text-gray-400">Studio Berlin-Mitte<br />Torstraße 177, 10115 Berlin</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C8A97E]" />
                <div>
                  <h3 className="font-medium">Verfügbarkeit</h3>
                  <p className="text-gray-400">Montag - Freitag<br />09:00 - 21:00 Uhr</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C8A97E]" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:info@melanie-wainwright.de" className="text-gray-400 hover:text-[#C8A97E] transition-colors">
                    info@melanie-wainwright.de
                  </a>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Ihre Nachricht</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A97E]"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#C8A97E] text-black font-medium py-2 rounded-lg hover:bg-[#C8A97E]/90 transition-colors"
              >
                Senden
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessMessage
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Nachricht gesendet!"
        message="Vielen Dank für Ihre Nachricht. Ich werde mich in Kürze bei Ihnen melden."
      />
    </>
  )
} 