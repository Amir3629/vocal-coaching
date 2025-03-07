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

  const canProceedToStep3 = selectedDays.length > 0 && selectedTime !== null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
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
                    {/* Days Selection */}
                    <div className="mb-8">
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

                    {/* Actions */}
                    <div className="mt-8 flex justify-end gap-3">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Abbrechen
                      </button>
                      {selectedDays.length > 0 && selectedTime !== null && (
                        <button
                          onClick={() => setStep(3)}
                          className="px-6 py-2 bg-[#C8A97E] text-black text-sm font-medium rounded-lg hover:bg-[#B69A6E] transition-colors"
                        >
                          Weiter
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
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
    </>
  )
} 