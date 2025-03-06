"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, Calendar as CalendarIcon } from "lucide-react"
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

const weekDays = [
  { id: "monday", label: "Montag", times: ["10:00", "14:00", "16:00", "18:00"] },
  { id: "tuesday", label: "Dienstag", times: ["11:00", "15:00", "17:00", "19:00"] },
  { id: "wednesday", label: "Mittwoch", times: ["10:00", "14:00", "16:00", "18:00"] },
  { id: "thursday", label: "Donnerstag", times: ["11:00", "15:00", "17:00", "19:00"] },
  { id: "friday", label: "Freitag", times: ["10:00", "14:00", "16:00", "18:00"] }
]

const timeSlots = {
  morning: {
    label: "Morgens",
    times: ["09:00", "10:00", "11:00"]
  },
  noon: {
    label: "Mittags",
    times: ["12:00", "13:00", "14:00"]
  },
  afternoon: {
    label: "Nachmittags",
    times: ["15:00", "16:00", "17:00", "18:00"]
  }
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
  }

  const resetAndClose = () => {
    setStep(1)
    setSelectedService("")
    setSelectedDay("")
    setSelectedTimeSlot("")
    setSelectedTime("")
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
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
              onClick={onClose}
            />
            
            <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto py-10">
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

                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mb-8">
                    {[1, 2, 3].map((stepNumber) => (
                      <div key={stepNumber} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= stepNumber ? 'bg-[#C8A97E] text-black' : 'bg-[#C8A97E]/20 text-[#C8A97E]'
                        }`}>
                          {stepNumber}
                        </div>
                        {stepNumber < 3 && (
                          <div className={`w-full h-0.5 mx-2 ${
                            step > stepNumber ? 'bg-[#C8A97E]' : 'bg-[#C8A97E]/20'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">Wählen Sie einen Service</h3>
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
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">Wählen Sie Tag und Zeit</h3>
                        
                        {/* Day Selection */}
                        <div className="grid grid-cols-5 gap-2 mb-6">
                          {weekDays.map((day) => (
                            <button
                              key={day.id}
                              onClick={() => setSelectedDay(day.id)}
                              className={`p-3 rounded-lg text-center transition-all ${
                                selectedDay === day.id
                                  ? "bg-[#C8A97E] text-black"
                                  : "bg-[#C8A97E]/10 text-white hover:bg-[#C8A97E]/20"
                              }`}
                            >
                              <span className="block text-sm font-medium">{day.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Time Slots */}
                        {selectedDay && (
                          <div className="space-y-4">
                            {Object.entries(timeSlots).map(([slot, { label, times }]) => (
                              <div key={slot} className="p-4 rounded-lg border border-white/10">
                                <h4 className="text-[#C8A97E] mb-3">{label}</h4>
                                <div className="grid grid-cols-3 gap-2">
                                  {times.map((time) => (
                                    <button
                                      key={time}
                                      onClick={() => {
                                        setSelectedTimeSlot(slot)
                                        setSelectedTime(time)
                                        setStep(3)
                                      }}
                                      className={`px-4 py-2 rounded text-sm transition-all ${
                                        selectedTime === time
                                          ? "bg-[#C8A97E] text-black"
                                          : "bg-black/20 text-gray-300 hover:bg-[#C8A97E]/20 hover:text-white"
                                      }`}
                                    >
                                      {time}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between mt-6">
                          <button
                            onClick={() => setStep(1)}
                            className="px-6 py-2 rounded-lg border border-white/10 hover:border-[#C8A97E]/50 text-white transition-all"
                          >
                            Zurück
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.form
                        key="step3"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-lg font-medium text-white mb-4">Ihre Informationen</h3>

                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border border-[#C8A97E]/20 bg-black/20 mb-6">
                            <h4 className="text-[#C8A97E] font-medium mb-2">Zusammenfassung</h4>
                            <div className="space-y-2 text-gray-300">
                              <p>Service: {services.find(s => s.id === selectedService)?.title}</p>
                              <p>Tag: {weekDays.find(d => d.id === selectedDay)?.label}</p>
                              <p>Zeit: {selectedTime} Uhr</p>
                            </div>
                          </div>

                          <div className="space-y-4">
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
                        </div>

                        <div className="flex justify-between mt-6">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-6 py-2 rounded-lg border border-white/10 hover:border-[#C8A97E]/50 text-white transition-all"
                          >
                            Zurück
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-[#C8A97E] hover:bg-[#B89A6F] text-black font-medium transition-all"
                          >
                            Buchung abschließen
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