"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Simulated available time slots
  const timeSlots = ["10:00", "11:00", "14:00", "15:00", "16:00"]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#1a1a1a] rounded-xl p-6 md:p-8 shadow-xl border border-[#C8A97E]/20"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>

            {isSuccess ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                <h3 className="text-2xl font-bold mb-4 text-[#C8A97E]">Buchung Bestätigt!</h3>
                <p className="text-gray-300 mb-6">
                  Ihre Buchung wurde erfolgreich abgeschlossen. Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen
                  Details.
                </p>
                <Button className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black" onClick={onClose}>
                  Schließen
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Unterricht Buchen</h2>
                  <div className="w-16 h-1 bg-[#C8A97E]"></div>
                </div>

                <div className="space-y-6">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium">Datum & Zeit wählen</h3>
                        <span className="text-sm text-[#C8A97E]">Schritt 1/3</span>
                      </div>

                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-[#C8A97E]/20"
                        disabled={(date) => {
                          const now = new Date()
                          return date < now || date.getDay() === 0
                        }}
                      />

                      {selectedDate && (
                        <div className="space-y-4">
                          <Label>Verfügbare Zeiten</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                className={`${
                                  selectedTime === time
                                    ? "bg-[#C8A97E] hover:bg-[#B89A6F] text-black"
                                    : "border-[#C8A97E]/20 hover:border-[#C8A97E] hover:bg-[#C8A97E]/10"
                                }`}
                                onClick={() => setSelectedTime(time)}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        className="w-full bg-[#C8A97E] hover:bg-[#B89A6F] text-black mt-4"
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setStep(2)}
                      >
                        Weiter
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium">Unterrichtsdetails</h3>
                        <span className="text-sm text-[#C8A97E]">Schritt 2/3</span>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Unterrichtstyp</Label>
                          <Select>
                            <SelectTrigger className="border-[#C8A97E]/20">
                              <SelectValue placeholder="Wählen Sie einen Unterrichtstyp" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="private">Private Gesangsstunden</SelectItem>
                              <SelectItem value="jazz">Jazz Improvisation</SelectItem>
                              <SelectItem value="performance">Aufführungs Coaching</SelectItem>
                              <SelectItem value="piano">Piano/Vocal-Koordination</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Unterrichtsort</Label>
                          <RadioGroup defaultValue="studio">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="studio" id="studio" />
                              <Label htmlFor="studio">Studio (Berlin-Mitte)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="online" id="online" />
                              <Label htmlFor="online">Online</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {selectedPlatform === "online" && (
                          <div className="space-y-2">
                            <Label>Online Platform</Label>
                            <Select onValueChange={setSelectedPlatform}>
                              <SelectTrigger className="border-[#C8A97E]/20">
                                <SelectValue placeholder="Wählen Sie eine Platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="zoom">Zoom</SelectItem>
                                <SelectItem value="skype">Skype</SelectItem>
                                <SelectItem value="teams">Microsoft Teams</SelectItem>
                                <SelectItem value="meet">Google Meet</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button
                          variant="outline"
                          className="border-[#C8A97E]/20 hover:bg-[#C8A97E]/10"
                          onClick={() => setStep(1)}
                        >
                          Zurück
                        </Button>
                        <Button className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black" onClick={() => setStep(3)}>
                          Weiter
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium">Persönliche Daten</h3>
                        <span className="text-sm text-[#C8A97E]">Schritt 3/3</span>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Vorname</Label>
                            <Input className="border-[#C8A97E]/20 bg-black/20" />
                          </div>
                          <div className="space-y-2">
                            <Label>Nachname</Label>
                            <Input className="border-[#C8A97E]/20 bg-black/20" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" className="border-[#C8A97E]/20 bg-black/20" />
                        </div>

                        <div className="space-y-2">
                          <Label>Telefon (optional)</Label>
                          <Input type="tel" className="border-[#C8A97E]/20 bg-black/20" />
                        </div>

                        <div className="space-y-2">
                          <Label>Anmerkungen</Label>
                          <textarea className="w-full h-24 px-3 py-2 rounded-md border border-[#C8A97E]/20 bg-black/20 resize-none focus:outline-none focus:ring-2 focus:ring-[#C8A97E]" />
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button
                          variant="outline"
                          className="border-[#C8A97E]/20 hover:bg-[#C8A97E]/10"
                          onClick={() => setStep(2)}
                        >
                          Zurück
                        </Button>
                        <Button
                          className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Wird gesendet..." : "Buchung abschließen"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

