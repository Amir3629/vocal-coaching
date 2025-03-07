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
    const container = document.querySelector('.steps-container');
    if (container) {
      container.classList.add('slide-left');
      setTimeout(() => {
        setStep(2);
        container.classList.remove('slide-left');
      }, 500);
    }
  }

  const handleNextStep = () => {
    if ((step === 2 && selectedDays.length > 0 && selectedTime)) {
      const container = document.querySelector('.steps-container');
      if (container) {
        container.classList.add('slide-left');
        setTimeout(() => {
          setStep(prev => prev + 1);
          container.classList.remove('slide-left');
        }, 500);
      }
    }
  }

  const handlePrevStep = () => {
    const container = document.querySelector('.steps-container');
    if (container) {
      container.classList.add('slide-right');
      setTimeout(() => {
        setStep(prev => prev - 1);
        container.classList.remove('slide-right');
      }, 500);
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
                  transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                  className="relative w-full max-w-lg bg-[#0A0A0A] rounded-xl border border-[#C8A97E]/20 shadow-2xl"
                >
                  {/* Header */}
                  <div className="px-8 py-5 border-b border-[#C8A97E]/10 flex items-center justify-between">
                    <h2 className="text-2xl font-medium text-[#C8A97E]">Terminanfrage</h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-[#C8A97E]/10 rounded-lg transition-all duration-300"
                    >
                      <X className="w-5 h-5 text-[#C8A97E]" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        className="steps-container"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {step === 1 && (
                          <div className="space-y-6">
                            <h3 className="text-xl font-medium text-white mb-4">Wählen Sie einen Service</h3>
                            <div className="grid grid-cols-1 gap-3">
                              {services.map((service, index) => (
                                <motion.button
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  key={service.id}
                                  onClick={() => handleServiceSelect(service.id)}
                                  className={`
                                    w-full flex flex-col items-start p-4 rounded-lg transition-all duration-300
                                    ${selectedService === service.id
                                      ? 'bg-[#C8A97E] text-black shadow-lg shadow-[#C8A97E]/20'
                                      : 'bg-white/5 text-white hover:bg-white/10 hover:shadow-lg hover:shadow-[#C8A97E]/10'
                                    }
                                  `}
                                >
                                  <h4 className="font-medium mb-1">{service.title}</h4>
                                  <p className={`text-sm ${selectedService === service.id ? 'text-black/70' : 'text-gray-400'}`}>
                                    {service.description}
                                  </p>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-medium text-white mb-4">Bevorzugte Tage</h3>
                              <div className="grid grid-cols-5 gap-2 mb-6">
                                {weekDays.map((day, index) => (
                                  <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={day.id}
                                    onClick={() => handleDaySelect(day.id)}
                                    className={`
                                      py-3 rounded-lg text-sm font-medium transition-all duration-300
                                      ${selectedDays.includes(day.id)
                                        ? 'bg-[#C8A97E] text-black shadow-lg shadow-[#C8A97E]/20'
                                        : 'bg-white/5 text-white hover:bg-white/10 hover:shadow-lg hover:shadow-[#C8A97E]/10'
                                      }
                                    `}
                                  >
                                    {day.label}
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-xl font-medium text-white mb-4">Bevorzugte Zeit</h3>
                              <div className="space-y-2">
                                {timeSlots.map((slot, index) => (
                                  <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (index * 0.1) + 0.3 }}
                                    key={slot.id}
                                    onClick={() => handleTimeSelect(slot.id)}
                                    className={`
                                      w-full flex items-center p-4 rounded-lg transition-all duration-300
                                      ${selectedTime === slot.id
                                        ? 'bg-[#C8A97E] text-black shadow-lg shadow-[#C8A97E]/20'
                                        : 'bg-white/5 text-white hover:bg-white/10 hover:shadow-lg hover:shadow-[#C8A97E]/10'
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
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-6">
                            <h3 className="text-xl font-medium text-white mb-4">Ihre Kontaktdaten</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  value={formData.name}
                                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                  className="w-full px-4 py-3 bg-white/5 border border-[#C8A97E]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A97E]/40 transition-all duration-300"
                                  placeholder="Ihr vollständiger Name"
                                  required
                                />
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  value={formData.email}
                                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                  className="w-full px-4 py-3 bg-white/5 border border-[#C8A97E]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A97E]/40 transition-all duration-300"
                                  placeholder="Ihre Email-Adresse"
                                  required
                                />
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                  Telefon (optional)
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  value={formData.phone}
                                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full px-4 py-3 bg-white/5 border border-[#C8A97E]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A97E]/40 transition-all duration-300"
                                  placeholder="Ihre Telefonnummer"
                                />
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                  Nachricht (optional)
                                </label>
                                <textarea
                                  id="message"
                                  value={formData.message}
                                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                  className="w-full px-4 py-3 bg-white/5 border border-[#C8A97E]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A97E]/40 transition-all duration-300 min-h-[100px] resize-none"
                                  placeholder="Ihre Nachricht an uns"
                                />
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-6"
                              >
                                <label className="flex items-start gap-3">
                                  <input
                                    type="checkbox"
                                    required
                                    className="mt-1 rounded border-[#C8A97E]/20 bg-white/5 text-[#C8A97E] focus:ring-[#C8A97E] focus:ring-offset-0"
                                  />
                                  <span className="text-sm text-gray-400">
                                    Mit dem Absenden des Formulars stimme ich den{" "}
                                    <Link href="/legal/datenschutz" className="text-[#C8A97E] hover:underline">
                                      Datenschutzbestimmungen
                                    </Link>{" "}
                                    und{" "}
                                    <Link href="/legal/agb" className="text-[#C8A97E] hover:underline">
                                      AGB
                                    </Link>{" "}
                                    zu. Ich bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden.
                                  </span>
                                </label>
                              </motion.div>
                            </form>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Single Navigation Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 flex justify-between"
                    >
                      {step > 1 && (
                        <button
                          onClick={handlePrevStep}
                          className="px-6 py-2.5 text-sm font-medium text-[#C8A97E] hover:bg-[#C8A97E]/10 rounded-lg transition-all duration-300"
                        >
                          Zurück
                        </button>
                      )}
                      {step < 3 ? (
                        <button
                          onClick={handleNextStep}
                          disabled={!selectedService || (step === 2 && (!selectedDays.length || !selectedTime))}
                          className={`
                            px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ml-auto
                            ${(!selectedService || (step === 2 && (!selectedDays.length || !selectedTime)))
                              ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                              : 'bg-[#C8A97E] text-black hover:shadow-lg hover:shadow-[#C8A97E]/20'
                            }
                          `}
                        >
                          Weiter
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={!formData.name || !formData.email}
                          className={`
                            px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ml-auto
                            ${(!formData.name || !formData.email)
                              ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                              : 'bg-[#C8A97E] text-black hover:shadow-lg hover:shadow-[#C8A97E]/20'
                            }
                          `}
                        >
                          Absenden
                        </button>
                      )}
                    </motion.div>
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