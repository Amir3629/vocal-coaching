"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addMonths, subMonths, isSameDay, isBefore, startOfToday } from "date-fns"
import { de } from "date-fns/locale"
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react"
import { z } from "zod"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface TimeSlot {
  time: string
  available: boolean
}

const services = [
  {
    id: "private",
    title: "Einzelunterricht",
    duration: "60 min",
    price: "80€"
  },
  {
    id: "group",
    title: "Gruppenunterricht",
    duration: "90 min",
    price: "40€ pro Person"
  },
  {
    id: "workshop",
    title: "Workshop",
    duration: "3 Stunden",
    price: "120€"
  }
]

const skillLevels = [
  { id: "beginner", label: "Anfänger" },
  { id: "intermediate", label: "Fortgeschritten" },
  { id: "advanced", label: "Profi" }
]

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    message: "",
    acceptTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const validateEmail = (email: string) => {
    return z.string().email().safeParse(email).success
  }

  const handleNext = () => {
    if (currentStep === 1 && !selectedService) {
      setErrors({ service: "Bitte wählen Sie einen Service aus" })
      return
    }
    if (currentStep === 2 && !selectedDate) {
      setErrors({ date: "Bitte wählen Sie ein Datum aus" })
      return
    }
    if (currentStep === 3 && !selectedTime) {
      setErrors({ time: "Bitte wählen Sie eine Uhrzeit aus" })
      return
    }
    if (currentStep === 4) {
      const newErrors: Record<string, string> = {}
      if (!formData.name) newErrors.name = "Name ist erforderlich"
      if (!formData.email) newErrors.email = "Email ist erforderlich"
      if (!validateEmail(formData.email)) newErrors.email = "Ungültige Email-Adresse"
      if (!formData.level) newErrors.level = "Bitte wählen Sie Ihr Level aus"
      if (!formData.acceptTerms) newErrors.terms = "Bitte akzeptieren Sie die Bedingungen"
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
    }
    setErrors({})
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic here
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#0A0A0A] rounded-xl shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6">
              <div className="mb-8">
                <div className="w-full bg-gray-800 h-2 rounded-full">
                  <motion.div
                    className="h-full bg-[#C8A97E] rounded-full"
                    animate={{ width: `${(currentStep / 5) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Wählen Sie Ihren Service
                      </h2>
                      <div className="grid gap-4">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`p-4 rounded-lg border transition-all ${
                              selectedService === service.id
                                ? "border-[#C8A97E] bg-[#C8A97E]/10"
                                : "border-gray-700 hover:border-[#C8A97E]/50"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-white font-medium">{service.title}</h3>
                                <p className="text-gray-400 text-sm">
                                  {service.duration} • {service.price}
                                </p>
                              </div>
                              {selectedService === service.id && (
                                <Check className="w-5 h-5 text-[#C8A97E]" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.service && (
                        <p className="text-red-500 text-sm">{errors.service}</p>
                      )}
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Wählen Sie ein Datum
                      </h2>
                      {/* Calendar component */}
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Wählen Sie eine Uhrzeit
                      </h2>
                      <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: 8 }, (_, i) => {
                          const hour = 10 + i
                          return (
                            <button
                              key={hour}
                              onClick={() => handleTimeSelect(`${hour}:00`)}
                              className={`p-3 rounded-lg text-center transition-all ${
                                selectedTime === `${hour}:00`
                                  ? "bg-[#C8A97E] text-black"
                                  : "bg-gray-800 hover:bg-gray-700 text-white"
                              }`}
                            >
                              {`${hour}:00`}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Ihre Informationen
                      </h2>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#C8A97E]"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#C8A97E]"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Telefon (optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#C8A97E]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Level
                        </label>
                        <select
                          value={formData.level}
                          onChange={(e) =>
                            setFormData({ ...formData, level: e.target.value })
                          }
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#C8A97E]"
                        >
                          <option value="">Bitte wählen</option>
                          {skillLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                        {errors.level && (
                          <p className="text-red-500 text-sm mt-1">{errors.level}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Nachricht (optional)
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          rows={3}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#C8A97E]"
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={formData.acceptTerms}
                          onChange={(e) =>
                            setFormData({ ...formData, acceptTerms: e.target.checked })
                          }
                          className="mt-1"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-300">
                          Ich akzeptiere die{" "}
                          <a
                            href="/legal/agb"
                            target="_blank"
                            className="text-[#C8A97E] hover:underline"
                          >
                            AGB
                          </a>{" "}
                          und{" "}
                          <a
                            href="/legal/datenschutz"
                            target="_blank"
                            className="text-[#C8A97E] hover:underline"
                          >
                            Datenschutzerklärung
                          </a>
                        </label>
                      </div>
                      {errors.terms && (
                        <p className="text-red-500 text-sm">{errors.terms}</p>
                      )}
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-[#C8A97E]/20 mx-auto flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-[#C8A97E]" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        Buchung erfolgreich!
                      </h2>
                      <p className="text-gray-400">
                        Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && currentStep < 5 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 text-white hover:bg-white/5 rounded-lg transition-colors text-sm"
                  >
                    Zurück
                  </button>
                )}
                {currentStep < 5 ? (
                  <button
                    onClick={handleNext}
                    className="ml-auto px-6 py-2 bg-[#C8A97E] hover:bg-[#B69A6E] text-black rounded-lg transition-colors text-sm"
                  >
                    {currentStep === 4 ? "Jetzt buchen" : "Weiter"}
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="ml-auto px-6 py-2 bg-[#C8A97E] hover:bg-[#B69A6E] text-black rounded-lg transition-colors text-sm"
                  >
                    Schließen
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 