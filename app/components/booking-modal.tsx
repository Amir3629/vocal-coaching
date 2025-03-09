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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-xl bg-[#0A0A0A] rounded-xl shadow-xl border border-[#C8A97E]/20 overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-[#C8A97E]/10">
              <h2 className="text-xl font-medium text-white">
                {step === 1 ? "Terminanfrage" :
                 step === 2 ? "Uhrzeit wählen" :
                 step === 3 ? "Persönliche Daten" :
                 "Buchung bestätigt"}
              </h2>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#C8A97E]" />
                    </button>
                    <h3 className="text-lg font-medium text-white">
                      {format(currentDate, "MMMM yyyy", { locale: de })}
                    </h3>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-[#C8A97E]" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                      <div key={day} className="text-center text-sm text-gray-400 py-2">
                        {day}
                      </div>
                    ))}
                    {days.map((day, index) => (
                      <button
                        key={day.toString()}
                        onClick={() => handleDateSelect(day)}
                        disabled={!isSameMonth(day, currentDate)}
                        className={`
                          aspect-square flex items-center justify-center rounded-lg text-sm
                          ${!isSameMonth(day, currentDate) ? "text-gray-600" :
                            isToday(day) ? "bg-[#C8A97E]/20 text-[#C8A97E]" :
                            isSameDay(day, selectedDate || new Date()) ? "bg-[#C8A97E] text-black" :
                            "text-white hover:bg-white/5"}
                          transition-colors
                        `}
                      >
                        {format(day, "d")}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-gray-400 mb-4">
                    Verfügbare Zeiten am {format(selectedDate!, "dd.MM.yyyy", { locale: de })}:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`
                          p-3 rounded-lg text-sm font-medium
                          ${slot.available ? 
                            slot.time === selectedTime ?
                              "bg-[#C8A97E] text-black" :
                              "bg-white/5 text-white hover:bg-white/10" :
                            "bg-white/5 text-gray-500 cursor-not-allowed"}
                          transition-colors
                        `}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">E-Mail</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Level</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] transition-colors"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="beginner">Anfänger</option>
                      <option value="intermediate">Fortgeschritten</option>
                      <option value="advanced">Profi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Nachricht</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#C8A97E] transition-colors"
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400">
                      Ich akzeptiere die <a href="/agb" className="text-[#C8A97E] hover:underline">AGB</a> und die <a href="/datenschutz" className="text-[#C8A97E] hover:underline">Datenschutzerklärung</a>
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
            <div className="p-6 border-t border-[#C8A97E]/10">
              <div className="flex justify-between">
                {step > 1 && step < 4 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 text-white hover:text-[#C8A97E] transition-colors text-sm font-medium"
                  >
                    Zurück
                  </button>
                )}
                {step < 4 && (
                  <button
                    onClick={step === 3 ? handleSubmit : () => {}}
                    disabled={step === 2 && !selectedTime}
                    className={`px-6 py-2 rounded-lg text-sm font-medium
                      ${step === 3 ?
                        "bg-[#C8A97E] hover:bg-[#B89A6F] text-black" :
                        "bg-white/5 text-white hover:bg-white/10"}
                      transition-colors ml-auto`}
                  >
                    {step === 3 ? "Jetzt Buchen" : "Weiter"}
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