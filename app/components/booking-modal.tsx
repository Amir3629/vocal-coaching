"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import SuccessMessage from "./success-message"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const services = [
  {
    id: "private",
    title: "Private Gesangsstunden",
    description: "Individueller Unterricht für alle Levels"
  },
  {
    id: "jazz",
    title: "Jazz Improvisation",
    description: "Spezialisierung auf Jazz-Gesang"
  },
  {
    id: "performance",
    title: "Aufführungs Coaching",
    description: "Vorbereitung für Auftritte"
  },
  {
    id: "piano",
    title: "Piano/Vocal-Koordination",
    description: "Begleitung am Klavier"
  }
]

const timeSlots = [
  { id: "morning", label: "Vormittags", time: "09:00 - 12:00" },
  { id: "afternoon", label: "Nachmittags", time: "12:00 - 16:00" },
  { id: "evening", label: "Abends", time: "16:00 - 21:00" }
]

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
  }

  const resetAndClose = () => {
    setStep(1)
    setSelectedService("")
    setSelectedTime("")
    setFormData({
      name: "",
      email: "",
      message: ""
    })
    onClose()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
              onClick={onClose}
            />
            
            <div className="fixed inset-0 z-[9999] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring",
                  duration: 1.5,
                  bounce: 0.1,
                  stiffness: 80,
                  damping: 15
                }}
                className="w-[calc(100%-2rem)] md:w-full max-w-2xl"
              >
                <div className="relative bg-[#0A0A0A] rounded-xl p-6 md:p-8 border border-[#C8A97E]/20 w-full">
                  <button
                    onClick={resetAndClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="mb-8">
                    <h2 className="text-2xl font-light text-white">Booking</h2>
                    <div className="w-12 h-0.5 bg-[#C8A97E] mt-2"></div>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          {services.map((service) => (
                            <motion.button
                              key={service.id}
                              onClick={() => {
                                setSelectedService(service.id)
                                setStep(2)
                              }}
                              className={`p-4 rounded-lg border text-left transition-all ${
                                selectedService === service.id
                                  ? "border-[#C8A97E] bg-[#C8A97E]/10"
                                  : "border-white/10 hover:border-[#C8A97E]/50"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <h4 className="text-white font-medium mb-1">{service.title}</h4>
                              <p className="text-sm text-gray-400">{service.description}</p>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.form
                        key="step2"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => setSelectedTime(slot.id)}
                              className={`p-4 rounded-lg border text-center transition-all ${
                                selectedTime === slot.id
                                  ? "border-[#C8A97E] bg-[#C8A97E]/10"
                                  : "border-white/10 hover:border-[#C8A97E]/50"
                              }`}
                            >
                              <div className="text-white font-medium">{slot.label}</div>
                              <div className="text-sm text-gray-400">{slot.time}</div>
                            </button>
                          ))}
                        </div>

                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full bg-white/5 border-b border-[#C8A97E]/20 px-4 py-3 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full bg-white/5 border-b border-[#C8A97E]/20 px-4 py-3 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Nachricht</label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={4}
                            className="w-full bg-white/5 border-b border-[#C8A97E]/20 px-4 py-3 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E] resize-none"
                          ></textarea>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Zurück
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-[#C8A97E] hover:bg-[#B69A6E] text-black text-sm font-medium rounded-lg transition-colors"
                          >
                            Absenden
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <SuccessMessage
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false)
          resetAndClose()
        }}
        title="Buchung erfolgreich!"
        message="Vielen Dank für Ihre Anfrage. Ich werde mich in Kürze bei Ihnen melden."
      />
    </>
  )
} 