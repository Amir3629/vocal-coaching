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
  types?: ServiceType[];
}

interface ServiceType {
  id: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: "singen",
    title: "Singen",
    duration: "60 min",
    description: "Professioneller Gesangsunterricht",
    types: [
      {
        id: "private",
        title: "Einzelunterricht",
        description: "Individuelles Training"
      },
      {
        id: "online",
        title: "Online Coaching",
        description: "Flexibel von zu Hause"
      },
      {
        id: "group",
        title: "Gruppenunterricht",
        description: "Lernen in der Gruppe"
      }
    ]
  },
  {
    id: "vocal-coaching",
    title: "Vocal Coaching",
    duration: "60 min",
    description: "CVT-basiertes Stimmtraining",
    types: [
      {
        id: "private",
        title: "Einzelunterricht",
        description: "Individuelles Training"
      },
      {
        id: "online",
        title: "Online Coaching",
        description: "Flexibel von zu Hause"
      },
      {
        id: "group",
        title: "Gruppenunterricht",
        description: "Lernen in der Gruppe"
      }
    ]
  },
  {
    id: "workshop",
    title: "Workshop",
    duration: "3 Stunden",
    description: "Intensives Gruppentraining"
  }
];

const skillLevels = [
  { id: "beginner", title: "Anfänger", description: "Erste Schritte in der Musik" },
  { id: "intermediate", title: "Fortgeschritten", description: "Grundlagen sind vorhanden" },
  { id: "advanced", title: "Profi", description: "Fortgeschrittene Techniken" }
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
]

type Step = "1" | "2" | "3" | "4" | "5"

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  termsAccepted: boolean;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("1")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedServiceType, setSelectedServiceType] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [showLegalModal, setShowLegalModal] = useState<"agb" | "datenschutz" | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    const service = services.find(s => s.id === serviceId);
    if (service?.types) {
      setCurrentStep("2");
    } else {
      setCurrentStep("3");
    }
  };

  const handleServiceTypeSelect = (typeId: string) => {
    setSelectedServiceType(typeId);
    setCurrentStep("3");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep("4");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep("5");
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      setErrors({ terms: "Bitte akzeptieren Sie die AGB und Datenschutzerklärung" });
      return;
    }

    try {
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        resetForm();
      }, 3000);
    } catch (error) {
      setErrors({ submit: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." });
    }
  };

  const resetForm = () => {
    setSelectedService("");
    setSelectedServiceType("");
    setSelectedDate(null);
    setSelectedTime("");
    setSelectedLevel("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      termsAccepted: false
    });
    setCurrentStep("1");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-[#0A0A0A] border border-[#C8A97E]/20">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A1A1A]">
          <motion.div
            className="h-full bg-[#C8A97E]"
            initial={{ width: "0%" }}
            animate={{ width: `${(parseInt(currentStep) / 5) * 100}%` }}
          />
        </div>

        <div className="p-6">
          {/* Step Title */}
          <motion.div
            key={`title-${currentStep}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-light text-[#C8A97E]">
              {currentStep === "1" && "Service auswählen"}
              {currentStep === "2" && "Art des Unterrichts"}
              {currentStep === "3" && "Datum auswählen"}
              {currentStep === "4" && "Uhrzeit auswählen"}
              {currentStep === "5" && "Persönliche Daten"}
            </h2>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-[400px]"
            >
              {/* Step 1: Service Selection */}
              {currentStep === "1" && (
                <div className="grid gap-4">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className={cn(
                        "p-6 rounded-xl border text-left transition-all",
                        "hover:border-[#C8A97E] hover:bg-[#C8A97E]/5",
                        selectedService === service.id
                          ? "border-[#C8A97E] bg-[#C8A97E]/5"
                          : "border-white/10 bg-black/20"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3 className="text-lg font-medium text-white">{service.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{service.duration}</p>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 2: Service Type Selection */}
              {currentStep === "2" && (
                <div className="grid gap-4">
                  {services.find(s => s.id === selectedService)?.types?.map((type) => (
                    <motion.button
                      key={type.id}
                      onClick={() => handleServiceTypeSelect(type.id)}
                      className={cn(
                        "p-6 rounded-xl border text-left transition-all",
                        "hover:border-[#C8A97E] hover:bg-[#C8A97E]/5",
                        selectedServiceType === type.id
                          ? "border-[#C8A97E] bg-[#C8A97E]/5"
                          : "border-white/10 bg-black/20"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3 className="text-lg font-medium text-white">{type.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{type.description}</p>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 3: Date Selection */}
              {currentStep === "3" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                      className="p-2 rounded-lg hover:bg-white/5"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <h3 className="text-lg font-medium">
                      {format(currentDate, "MMMM yyyy", { locale: de })}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                      className="p-2 rounded-lg hover:bg-white/5"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
                      <div key={day} className="text-center text-sm text-gray-400 py-2">
                        {day}
                      </div>
                    ))}
                    {eachDayOfInterval({
                      start: startOfMonth(currentDate),
                      end: endOfMonth(currentDate)
                    }).map((day) => {
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isDisabled = isBefore(day, startOfToday());
                      return (
                        <motion.button
                          key={day.toString()}
                          onClick={() => !isDisabled && handleDateSelect(day)}
                          className={cn(
                            "p-3 rounded-lg text-center transition-all",
                            isSelected && "bg-[#C8A97E] text-black",
                            !isSelected && !isDisabled && "hover:bg-[#C8A97E]/10",
                            isDisabled && "opacity-25 cursor-not-allowed"
                          )}
                          whileHover={!isDisabled ? { scale: 1.1 } : {}}
                          whileTap={!isDisabled ? { scale: 0.9 } : {}}
                          disabled={isDisabled}
                        >
                          {format(day, "d")}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Time Selection */}
              {currentStep === "4" && (
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "p-4 rounded-xl border text-center transition-all",
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

              {/* Step 5: Contact Form */}
              {currentStep === "5" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {skillLevels.map((level) => (
                      <motion.button
                        key={level.id}
                        type="button"
                        onClick={() => handleLevelSelect(level.id)}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all",
                          "hover:border-[#C8A97E] hover:bg-[#C8A97E]/5",
                          selectedLevel === level.id
                            ? "border-[#C8A97E] bg-[#C8A97E]/5"
                            : "border-white/10 bg-black/20"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="font-medium text-white">{level.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{level.description}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-[#C8A97E] transition-colors"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-[#C8A97E] transition-colors"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Telefon (optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-[#C8A97E] transition-colors"
                    />
                    <textarea
                      placeholder="Nachricht (optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-[#C8A97E] transition-colors min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                      className="mt-1.5"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400">
                      Ich akzeptiere die{" "}
                      <button
                        type="button"
                        onClick={() => setShowLegalModal("agb")}
                        className="text-[#C8A97E] hover:underline"
                      >
                        AGB
                      </button>{" "}
                      und{" "}
                      <button
                        type="button"
                        onClick={() => setShowLegalModal("datenschutz")}
                        className="text-[#C8A97E] hover:underline"
                      >
                        Datenschutzerklärung
                      </button>
                    </label>
                  </div>

                  {errors.terms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.terms}
                    </motion.p>
                  )}
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-6 border-t border-white/10">
            {currentStep !== "1" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentStep((prev) => (parseInt(prev) - 1).toString() as Step)}
                className="px-6 py-2 rounded-lg border border-white/10 hover:border-[#C8A97E] transition-colors"
              >
                Zurück
              </motion.button>
            )}
            
            {currentStep !== "5" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentStep === "1" && !selectedService) return;
                  if (currentStep === "2" && !selectedServiceType) return;
                  if (currentStep === "3" && !selectedDate) return;
                  if (currentStep === "4" && !selectedTime) return;
                  setCurrentStep((prev) => (parseInt(prev) + 1).toString() as Step);
                }}
                className={cn(
                  "px-6 py-2 rounded-lg transition-colors ml-auto",
                  "bg-[#C8A97E] hover:bg-[#B89A6F] text-black"
                )}
                disabled={
                  (currentStep === "1" && !selectedService) ||
                  (currentStep === "2" && !selectedServiceType) ||
                  (currentStep === "3" && !selectedDate) ||
                  (currentStep === "4" && !selectedTime)
                }
              >
                Weiter
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className={cn(
                  "px-6 py-2 rounded-lg transition-colors ml-auto",
                  "bg-[#C8A97E] hover:bg-[#B89A6F] text-black"
                )}
                disabled={!formData.termsAccepted || !formData.name || !formData.email}
              >
                Absenden
              </motion.button>
            )}
          </div>
        </div>
      </DialogContent>

      {/* Legal Document Modals */}
      <LegalDocumentModal
        isOpen={showLegalModal === "agb"}
        onClose={() => setShowLegalModal(null)}
        title="Allgemeine Geschäftsbedingungen"
      >
        <LegalContent type="agb" />
      </LegalDocumentModal>

      <LegalDocumentModal
        isOpen={showLegalModal === "datenschutz"}
        onClose={() => setShowLegalModal(null)}
        title="Datenschutzerklärung"
      >
        <LegalContent type="datenschutz" />
      </LegalDocumentModal>

      {/* Success Message */}
      <SuccessMessage
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Buchung erfolgreich!"
        message="Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigungs-E-Mail."
      />
    </Dialog>
  );
} 