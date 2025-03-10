"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addMonths, subMonths, isSameDay, isBefore, startOfToday, startOfMonth, endOfMonth, eachDayOfInterval, isEqual } from "date-fns"
import { de } from "date-fns/locale"
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react"
import { z } from "zod"
import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { cn } from "@/lib/utils"
import SuccessMessage from "./success-message"
import LegalDocumentModal from "./legal-document-modal"
import LegalContent from "./legal-content"
import CustomAlert from "./custom-alert"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface TimeSlot {
  time: string
  available: boolean
}

interface Service {
  id: string;
  title: string;
  duration: string;
  description: string;
}

const services: Service[] = [
  {
    id: "einzelunterricht",
    title: "Einzelunterricht",
    duration: "60 min",
    description: "Individueller Gesangsunterricht"
  },
  {
    id: "gruppenunterricht",
    title: "Gruppenunterricht",
    duration: "90 min",
    description: "Lernen Sie in der Gruppe"
  },
  {
    id: "workshop",
    title: "Workshop",
    duration: "3 Stunden",
    description: "Intensives Gruppentraining"
  }
];

const skillLevels = [
  { id: "beginner", label: "Anfänger" },
  { id: "intermediate", label: "Fortgeschritten" },
  { id: "advanced", label: "Profi" }
]

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
]

type Step = "1" | "2" | "3" | "4" | "5"

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  termsAccepted: boolean;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("1")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [showAGBModal, setShowAGBModal] = useState(false)
  const [showDatenschutzModal, setShowDatenschutzModal] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    termsAccepted: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTermsAlert, setShowTermsAlert] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep("4"); // Automatically progress to contact form after time selection
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentStep("2"); // Automatically progress to next step
  };

  const handleNext = () => {
    if (currentStep === "1" && !selectedService) {
      setErrors({ service: "Bitte wählen Sie einen Service aus" })
      return
    }
    if (currentStep === "2" && !selectedDate) {
      setErrors({ date: "Bitte wählen Sie ein Datum aus" })
      return
    }
    if (currentStep === "3" && !selectedTime) {
      setErrors({ time: "Bitte wählen Sie eine Uhrzeit aus" })
      return
    }
    if (currentStep === "4" && !termsAccepted) {
      setShowTermsAlert(true)
      return
    }
    if (currentStep === "4") {
      handleSubmit(new Event('submit') as any)
      return
    }
    setErrors({})
    const nextStep = (parseInt(currentStep) + 1).toString() as Step
    setCurrentStep(nextStep)
  }

  const handleBack = () => {
    setCurrentStep((prev) => (parseInt(prev) - 1).toString() as Step)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = "Name ist erforderlich"
    if (!formData.email) newErrors.email = "Email ist erforderlich"
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Ungültige Email-Adresse"
    if (!formData.service) newErrors.service = "Bitte wählen Sie einen Service aus"
    if (!termsAccepted) {
      setShowTermsAlert(true)
      return
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      // Show success message
      setShowSuccessMessage(true)
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        termsAccepted: false
      })
      setSelectedService("")
      setSelectedDate(null)
      setSelectedTime("")
      setTermsAccepted(false)
      
      // Close modal after a delay
      setTimeout(() => {
        setCurrentStep("1")
        onClose()
        setShowSuccessMessage(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
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

  const calendarDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  const getStepTitle = (step: Step) => {
    switch (step) {
      case "1":
        return "Service auswählen"
      case "2":
        return "Datum auswählen"
      case "3":
        return "Uhrzeit auswählen"
      case "4":
        return "Kontaktdaten"
      default:
        return ""
    }
  }

  const getStepDescription = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId)
    if (!service) return ""
    return `${service.duration} • ${service.description}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        {/* Progress Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A1A1A] overflow-hidden rounded-t-lg">
          <motion.div
            className="h-full bg-[#C8A97E]"
            initial={{ width: "0%" }}
            animate={{ width: `${(parseInt(currentStep) / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-light text-[#C8A97E]">{getStepTitle(currentStep)}</h2>
          {selectedService && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-400 mt-1"
            >
              {getStepDescription(selectedService)}
            </motion.p>
          )}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step 1: Service Selection */}
            {currentStep === "1" && (
              <div className="grid gap-4">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={cn(
                      "p-4 rounded-lg border text-left transition-all",
                      "hover:border-[#C8A97E] hover:bg-[#C8A97E]/5",
                      selectedService === service.id
                        ? "border-[#C8A97E] bg-[#C8A97E]/5"
                        : "border-white/10 bg-black/20"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="font-medium text-white">{service.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{service.duration}</p>
                    <p className="text-sm text-gray-400">{service.description}</p>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Step 2: Date Selection */}
            {currentStep === "2" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-medium">
                    {format(currentDate, "MMMM yyyy", { locale: de })}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                    <div key={day} className="text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((day, i) => {
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isDisabled = isBefore(day, startOfToday());
                    return (
                      <motion.button
                        key={day.toString()}
                        onClick={() => !isDisabled && handleDateSelect(day)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          isSelected && "bg-[#C8A97E] text-black",
                          !isSelected && !isDisabled && "hover:bg-[#C8A97E]/10",
                          isDisabled && "opacity-25 cursor-not-allowed"
                        )}
                        whileHover={!isDisabled ? { scale: 1.1 } : {}}
                        whileTap={!isDisabled ? { scale: 0.95 } : {}}
                      >
                        {format(day, "d")}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {currentStep === "3" && (
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={cn(
                      "p-3 rounded-lg border text-center transition-all",
                      "hover:border-[#C8A97E] hover:bg-[#C8A97E]/5",
                      selectedTime === time
                        ? "border-[#C8A97E] bg-[#C8A97E]/5"
                        : "border-white/10 bg-black/20"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {time}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Step 4: Contact Form */}
            {currentStep === "4" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={cn(
                      "mt-1 w-full p-2 rounded-lg bg-black/20 border border-white/10",
                      "focus:outline-none focus:border-[#C8A97E]",
                      errors.name && "border-red-500"
                    )}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={cn(
                      "mt-1 w-full p-2 rounded-lg bg-black/20 border border-white/10",
                      "focus:outline-none focus:border-[#C8A97E]",
                      errors.email && "border-red-500"
                    )}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefon (optional)</Label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 w-full p-2 rounded-lg bg-black/20 border border-white/10 focus:outline-none focus:border-[#C8A97E]"
                  />
                </div>

                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Nachricht (optional)</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="mt-1 w-full p-2 rounded-lg bg-black/20 border border-white/10 focus:outline-none focus:border-[#C8A97E] min-h-[100px]"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    Ich akzeptiere die{" "}
                    <button
                      type="button"
                      onClick={() => setShowAGBModal(true)}
                      className="text-[#C8A97E] hover:underline"
                    >
                      AGB
                    </button>{" "}
                    und{" "}
                    <button
                      type="button"
                      onClick={() => setShowDatenschutzModal(true)}
                      className="text-[#C8A97E] hover:underline"
                    >
                      Datenschutzerklärung
                    </button>
                  </label>
                </div>
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep !== "1" && (
            <Button variant="outline" onClick={handleBack}>
              Zurück
            </Button>
          )}
          {currentStep !== "4" ? (
            <Button
              onClick={handleNext}
              className="ml-auto"
              disabled={
                (currentStep === "1" && !selectedService) ||
                (currentStep === "2" && !selectedDate) ||
                (currentStep === "3" && !selectedTime)
              }
            >
              Weiter
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="ml-auto"
              disabled={!termsAccepted || !formData.name || !formData.email}
            >
              Absenden
            </Button>
          )}
        </div>
      </DialogContent>

      {/* Success Message */}
      <SuccessMessage
        isOpen={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        title="Buchung erfolgreich!"
        message="Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigungs-E-Mail."
      />

      {/* Terms Alert */}
      <CustomAlert
        isOpen={showTermsAlert}
        onClose={() => setShowTermsAlert(false)}
        onAccept={() => setTermsAccepted(true)}
        message="Bitte akzeptieren Sie die AGB und Datenschutzerklärung, um fortzufahren."
      />

      {/* Legal Document Modals */}
      <LegalDocumentModal
        isOpen={showAGBModal}
        onClose={() => setShowAGBModal(false)}
        title="Allgemeine Geschäftsbedingungen"
      >
        <LegalContent type="agb" />
      </LegalDocumentModal>

      <LegalDocumentModal
        isOpen={showDatenschutzModal}
        onClose={() => setShowDatenschutzModal(false)}
        title="Datenschutzerklärung"
      >
        <LegalContent type="datenschutz" />
      </LegalDocumentModal>
    </Dialog>
  )
} 