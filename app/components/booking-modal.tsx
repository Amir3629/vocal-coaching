"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock } from "lucide-react"
import SuccessMessage from "./success-message"
import Link from "next/link"

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

const weekDays = [
  { id: "monday", label: "Montag" },
  { id: "tuesday", label: "Dienstag" },
  { id: "wednesday", label: "Mittwoch" },
  { id: "thursday", label: "Donnerstag" },
  { id: "friday", label: "Freitag" }
]

const timeSlots = {
  morning: {
    label: "Morgens",
    description: "09:00 - 12:00 Uhr"
  },
  noon: {
    label: "Mittags",
    description: "12:00 - 15:00 Uhr"
  },
  afternoon: {
    label: "Nachmittags",
    description: "15:00 - 18:00 Uhr"
  },
  evening: {
    label: "Abends",
    description: "18:00 - 21:00 Uhr"
  }
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleDaySelect = (dayId: string) => {
    setSelectedDays(prev => {
      if (prev.includes(dayId)) {
        return prev.filter(d => d !== dayId)
      }
      return [...prev, dayId]
    })
  }

  const handleTimeSlotSelect = (slotId: string) => {
    setSelectedTimeSlots(prev => {
      if (prev.includes(slotId)) {
        return prev.filter(s => s !== slotId)
      }
      return [...prev, slotId]
    })
  }

  const canProceedToStep3 = selectedDays.length > 0 && selectedTimeSlots.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
  }

  const resetAndClose = () => {
    setStep(1)
    setSelectedService("")
    setSelectedDays([])
    setSelectedTimeSlots([])
    setFormData({
      name: "",
      email: "",
      phone: "",
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
              onClick={onClose}
            />
            
            <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">Wählen Sie einen Service</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((service) => (
                            <button
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
                            >
                              <h4 className="text-white font-medium mb-1">{service.title}</h4>
                              <p className="text-sm text-gray-400">{service.description}</p>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">Wählen Sie Ihre bevorzugten Tage und Zeiten</h3>
                        
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Tage (Mehrfachauswahl möglich)</label>
                          <div className="grid grid-cols-5 gap-2 mb-6">
                            {weekDays.map((day) => (
                              <button
                                key={day.id}
                                onClick={() => handleDaySelect(day.id)}
                                className={`p-3 rounded-lg text-center transition-all ${
                                  selectedDays.includes(day.id)
                                    ? "bg-[#C8A97E] text-black"
                                    : "bg-[#C8A97E]/10 text-white hover:bg-[#C8A97E]/20"
                                }`}
                              >
                                <span className="block text-sm font-medium">{day.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Zeiten (Mehrfachauswahl möglich)</label>
                          <div className="grid grid-cols-1 gap-4">
                            {Object.entries(timeSlots).map(([slot, { label, description }]) => (
                              <button
                                key={slot}
                                onClick={() => handleTimeSlotSelect(slot)}
                                className={`p-4 rounded-lg border text-left transition-all ${
                                  selectedTimeSlots.includes(slot)
                                    ? "border-[#C8A97E] bg-[#C8A97E]/10"
                                    : "border-white/10 hover:border-[#C8A97E]/50"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-white font-medium">{label}</h4>
                                    <p className="text-sm text-gray-400">{description}</p>
                                  </div>
                                  <Clock className="w-5 h-5 text-[#C8A97E]" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between mt-6">
                          <button
                            onClick={() => setStep(1)}
                            className="px-6 py-2 rounded-lg border border-white/10 hover:border-[#C8A97E]/50 text-white transition-all"
                          >
                            Zurück
                          </button>
                          {selectedDays.length > 0 && selectedTimeSlots.length > 0 && (
                            <button
                              onClick={() => setStep(3)}
                              className="px-6 py-2 rounded-lg bg-[#C8A97E] hover:bg-[#B89A6F] text-black font-medium transition-all"
                            >
                              Weiter
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.form
                        key="step3"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">Ihre Informationen</h3>

                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border border-[#C8A97E]/20 bg-black/20">
                            <h4 className="text-[#C8A97E] font-medium mb-2">Zusammenfassung</h4>
                            <div className="space-y-2 text-gray-300">
                              <p>Service: {services.find(s => s.id === selectedService)?.title}</p>
                              <p>Tage: {selectedDays.map(d => weekDays.find(day => day.id === d)?.label).join(", ")}</p>
                              <p>Zeiten: {selectedTimeSlots.map(s => timeSlots[s as keyof typeof timeSlots]?.label).join(", ")}</p>
                            </div>
                          </div>

                          <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/20 text-white placeholder-gray-400 focus:border-[#C8A97E]/50 focus:outline-none transition-all"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/20 text-white placeholder-gray-400 focus:border-[#C8A97E]/50 focus:outline-none transition-all"
                          />
                          <input
                            type="tel"
                            placeholder="Telefon (optional)"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/20 text-white placeholder-gray-400 focus:border-[#C8A97E]/50 focus:outline-none transition-all"
                          />
                          <textarea
                            placeholder="Nachricht (optional)"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/20 text-white placeholder-gray-400 focus:border-[#C8A97E]/50 focus:outline-none transition-all h-32 resize-none"
                          />
                        </div>

                        <div className="mt-4">
                          <button
                            type="submit"
                            className="w-full bg-[#C8A97E] text-white px-4 py-2 rounded hover:bg-[#B89A6E] transition-colors"
                          >
                            Jetzt Buchen
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {showSuccess && (
                    <SuccessMessage 
                      onClose={resetAndClose}
                      title="Buchung erfolgreich!"
                      message={`Vielen Dank für Ihre Buchung, ${formData.name}! Wir werden uns in Kürze bei Ihnen melden.`}
                      isOpen={showSuccess}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 