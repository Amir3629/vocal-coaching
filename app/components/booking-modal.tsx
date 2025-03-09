"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"
import { de } from "date-fns/locale"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface TimeSlot {
  time: string
  available: boolean
}

const timeSlots: TimeSlot[] = [
  { time: "09:00 - 10:00", available: true },
  { time: "10:00 - 11:00", available: true },
  { time: "11:00 - 12:00", available: false },
  { time: "12:00 - 13:00", available: true },
  { time: "14:00 - 15:00", available: true },
  { time: "15:00 - 16:00", available: true },
  { time: "16:00 - 17:00", available: false },
  { time: "17:00 - 18:00", available: true },
  { time: "18:00 - 19:00", available: true },
  { time: "19:00 - 20:00", available: true }
]

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    message: "",
    acceptTerms: false
  })

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setSelectedDate(null)
        setSelectedTime(null)
        setFormData({
          name: "",
          email: "",
          phone: "",
          level: "",
          message: "",
          acceptTerms: false
        })
      }, 300)
    }
  }, [isOpen])

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleNext = () => {
    if (step === 1 && selectedDate) {
      setStep(2)
    } else if (step === 2 && selectedTime) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here we'll integrate with Google Calendar API
    console.log("Booking submitted:", {
      date: selectedDate,
      time: selectedTime,
      ...formData
    })
    // Show success message and close
    setStep(4)
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
            className="relative w-full max-w-lg bg-[#0A0A0A] rounded-xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#C8A97E]/20">
              <h2 className="text-xl font-medium text-white">
                {step === 1 ? "Terminanfrage" : 
                 step === 2 ? "Uhrzeit wählen" : 
                 "Persönliche Daten"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Calendar Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#C8A97E]" />
                    </button>
                    <h3 className="text-lg font-medium text-white">
                      {format(currentDate, 'MMMM yyyy', { locale: de })}
                    </h3>
                    <button
                      onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-[#C8A97E]" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
                      <div key={day} className="text-sm text-gray-400 py-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }).map((_, index) => {
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1)
                      const isSelected = selectedDate && date.getTime() === selectedDate.getTime()
                      const isToday = new Date().toDateString() === date.toDateString()
                      const isPast = date < new Date()

                      return (
                        <button
                          key={index}
                          onClick={() => !isPast && handleDateSelect(date)}
                          disabled={isPast}
                          className={`
                            p-2 rounded-lg text-sm font-medium transition-all
                            ${isSelected
                              ? 'bg-[#C8A97E] text-black'
                              : isToday
                                ? 'bg-white/10 text-white'
                                : isPast
                                  ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                  : 'bg-white/5 text-white hover:bg-white/10 hover:scale-105'
                            }
                          `}
                        >
                          {index + 1}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg text-white mb-4">
                    Verfügbare Zeiten am {selectedDate && format(selectedDate, 'd. MMMM yyyy', { locale: de })}:
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Time slots */}
                    {Array.from({ length: 8 }).map((_, index) => {
                      const time = `${9 + index * 1.5}:00 - ${10.5 + index * 1.5}:00`
                      return (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-3 rounded-lg text-sm font-medium transition-all
                            ${selectedTime === time
                              ? 'bg-[#C8A97E] text-black'
                              : 'bg-white/5 text-white hover:bg-white/10'
                            } ${index % 2 === 0 ? 'transform hover:scale-105' : ''}`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-[#C8A97E]/20 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] focus:ring-1 focus:ring-[#C8A97E] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-[#C8A97E]/20 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] focus:ring-1 focus:ring-[#C8A97E] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-[#C8A97E]/20 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] focus:ring-1 focus:ring-[#C8A97E] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Level
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full bg-white/5 border border-[#C8A97E]/20 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] focus:ring-1 focus:ring-[#C8A97E] transition-colors"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="beginner">Anfänger</option>
                      <option value="intermediate">Fortgeschritten</option>
                      <option value="advanced">Profi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Nachricht
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-[#C8A97E]/20 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] focus:ring-1 focus:ring-[#C8A97E] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="w-4 h-4 rounded border-[#C8A97E]/20 bg-white/5 text-[#C8A97E] focus:ring-[#C8A97E] focus:ring-offset-0"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-300">
                      Ich akzeptiere die <a href="/agb" target="_blank" className="text-[#C8A97E] hover:underline">AGB</a> und die <a href="/datenschutz" target="_blank" className="text-[#C8A97E] hover:underline">Datenschutzerklärung</a>
                    </label>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#C8A97E]/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#C8A97E]" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Buchung bestätigt!</h3>
                  <p className="text-gray-400 mb-6">
                    Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[#C8A97E]/20">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Zurück
                </button>
              ) : (
                <div></div>
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={step === 1 ? !selectedDate : !selectedTime}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    (step === 1 ? !selectedDate : !selectedTime)
                      ? "bg-[#C8A97E]/50 cursor-not-allowed"
                      : "bg-[#C8A97E] hover:bg-[#B69A6E]"
                  }`}
                >
                  Weiter
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    !formData.acceptTerms
                      ? "bg-[#C8A97E]/50 cursor-not-allowed"
                      : "bg-[#C8A97E] hover:bg-[#B69A6E]"
                  }`}
                >
                  Jetzt Buchen
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 