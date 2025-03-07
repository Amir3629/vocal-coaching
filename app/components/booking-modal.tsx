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

const timeSlots = [
  {
    id: "morning",
    label: "Vormittag",
    time: "09:00 - 12:00",
    icon: Clock
  },
  {
    id: "noon",
    label: "Mittag",
    time: "12:00 - 15:00",
    icon: Clock
  },
  {
    id: "afternoon",
    label: "Nachmittag",
    time: "15:00 - 18:00",
    icon: Clock
  },
  {
    id: "evening",
    label: "Abend",
    time: "18:00 - 21:00",
    icon: Clock
  }
]

const weekDays = [
  { id: "monday", label: "Mo" },
  { id: "tuesday", label: "Di" },
  { id: "wednesday", label: "Mi" },
  { id: "thursday", label: "Do" },
  { id: "friday", label: "Fr" }
]

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleDaySelect = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    )
  }

  const handleTimeSelect = (timeId: string) => {
    setSelectedTime(timeId === selectedTime ? null : timeId)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setShowSuccess(true)
    }
  }

  const resetAndClose = () => {
    setStep(1)
    setSelectedService("")
    setSelectedDays([])
    setSelectedTime(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    })
    setShowSuccess(false)
    onClose()
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep(2)
  }

  const handleNextStep = () => {
    if (step < 3 && ((step === 1 && selectedService) || (step === 2 && selectedDays.length > 0 && selectedTime))) {
      setStep(prev => prev + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1)
    }
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
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="min-h-full flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-lg bg-[#0A0A0A] rounded-xl border border-[#C8A97E]/20 shadow-2xl"
                >
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-[#C8A97E]/10 flex items-center justify-between">
                    <h2 className="text-xl font-medium text-white">Terminanfrage</h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Service Selection */}
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <h3 className="text-sm font-medium text-gray-400 mb-4">Wählen Sie einen Service</h3>
                          <div className="grid grid-cols-1 gap-3">
                            {services.map((service) => (
                              <button
                                key={service.id}
                                onClick={() => handleServiceSelect(service.id)}
                                className={`
                                  w-full flex flex-col items-start p-4 rounded-lg transition-all duration-200
                                  ${selectedService === service.id
                                    ? 'bg-[#C8A97E] text-black'
                                    : 'bg-white/5 text-white hover:bg-white/10'
                                  }
                                `}
                              >
                                <h4 className="font-medium mb-1">{service.title}</h4>
                                <p className={`text-sm ${selectedService === service.id ? 'text-black/70' : 'text-gray-400'}`}>
                                  {service.description}
                                </p>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Time Selection */}
                      {step === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-8"
                        >
                          {/* Days Selection */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-4">Bevorzugte Tage</h3>
                            <div className="grid grid-cols-5 gap-2">
                              {weekDays.map((day) => (
                                <button
                                  key={day.id}
                                  onClick={() => handleDaySelect(day.id)}
                                  className={`
                                    py-3 rounded-lg text-sm font-medium transition-all duration-200
                                    ${selectedDays.includes(day.id)
                                      ? 'bg-[#C8A97E] text-black'
                                      : 'bg-white/5 text-white hover:bg-white/10'
                                    }
                                  `}
                                >
                                  {day.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time Slots */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-4">Bevorzugte Zeit</h3>
                            <div className="space-y-2">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot.id}
                                  onClick={() => handleTimeSelect(slot.id)}
                                  className={`
                                    w-full flex items-center p-4 rounded-lg transition-all duration-200
                                    ${selectedTime === slot.id
                                      ? 'bg-[#C8A97E] text-black'
                                      : 'bg-white/5 text-white hover:bg-white/10'
                                    }
                                  `}
                                >
                                  <slot.icon className={`w-5 h-5 ${selectedTime === slot.id ? 'text-black' : 'text-[#C8A97E]'}`} />
                                  <div className="ml-4 text-left">
                                    <p className="font-medium">{slot.label}</p>
                                    <p className={`text-sm ${selectedTime === slot.id ? 'text-black/70' : 'text-gray-400'}`}>
                                      {slot.time}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Navigation */}
                          <div className="flex justify-between">
                            <button
                              onClick={handlePrevStep}
                              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                              Zurück
                            </button>
                            {selectedDays.length > 0 && selectedTime && (
                              <button
                                onClick={handleNextStep}
                                className="px-6 py-2 bg-[#C8A97E] text-black text-sm font-medium rounded-lg hover:bg-[#B69A6E] transition-colors"
                              >
                                Weiter
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Personal Information */}
                      {step === 3 && (
                        <motion.form
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          onSubmit={handleSubmit}
                          className="space-y-6"
                        >
                          {/* Booking Summary */}
                          <div className="p-4 rounded-lg bg-white/5 space-y-2">
                            <h4 className="text-[#C8A97E] font-medium mb-2">Zusammenfassung</h4>
                            <p className="text-sm text-gray-400">
                              Service: {services.find(s => s.id === selectedService)?.title}
                            </p>
                            <p className="text-sm text-gray-400">
                              Tage: {selectedDays.map(d => weekDays.find(day => day.id === d)?.label).join(", ")}
                            </p>
                            <p className="text-sm text-gray-400">
                              Zeit: {timeSlots.find(t => t.id === selectedTime)?.label} ({timeSlots.find(t => t.id === selectedTime)?.time})
                            </p>
                          </div>

                          {/* Form Fields */}
                          <div className="space-y-4">
                            <input
                              type="text"
                              placeholder="Name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              className="w-full px-4 py-3 bg-white/5 border-b border-[#C8A97E]/20 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E] transition-all"
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="w-full px-4 py-3 bg-white/5 border-b border-[#C8A97E]/20 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E] transition-all"
                            />
                            <input
                              type="tel"
                              placeholder="Telefon (optional)"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-3 bg-white/5 border-b border-[#C8A97E]/20 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E] transition-all"
                            />
                            <textarea
                              placeholder="Nachricht (optional)"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              rows={4}
                              className="w-full px-4 py-3 bg-white/5 border-b border-[#C8A97E]/20 rounded-t-lg text-white placeholder-white/40 focus:outline-none focus:border-[#C8A97E] transition-all resize-none"
                            />
                          </div>

                          {/* Legal Text */}
                          <div className="space-y-2">
                            <p className="text-xs text-gray-400">
                              Mit dem Absenden stimmen Sie unseren{" "}
                              <Link href="#" className="text-[#C8A97E] hover:underline">
                                AGB
                              </Link>{" "}
                              zu.
                            </p>
                            <p className="text-xs text-gray-400">
                              Sie haben ein 14-tägiges Widerrufsrecht.
                            </p>
                          </div>

                          {/* Navigation */}
                          <div className="flex justify-between">
                            <button
                              type="button"
                              onClick={handlePrevStep}
                              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                              Zurück
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2 bg-[#C8A97E] text-black text-sm font-medium rounded-lg hover:bg-[#B69A6E] transition-colors"
                            >
                              Jetzt Buchen
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      <SuccessMessage
        isOpen={showSuccess}
        onClose={resetAndClose}
        title="Buchung erfolgreich!"
        message={`Vielen Dank für Ihre Buchung, ${formData.name}! Wir werden uns in Kürze bei Ihnen melden.`}
      />
    </>
  )
} 