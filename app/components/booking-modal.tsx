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
import { Calendar } from "@/components/ui/calendar"

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

const TimeGrid = ({ times, selectedTime, onTimeSelect }: { 
  times: string[], 
  selectedTime: string | null,
  onTimeSelect: (time: string) => void 
}) => (
  <div className="grid grid-cols-4 gap-2 p-2">
    {times.map((time) => (
      <button
        key={time}
        onClick={() => onTimeSelect(time)}
        className={`p-2 rounded-lg text-center transition-all ${
          selectedTime === time
            ? "bg-[#C8A97E] text-black"
            : "bg-white/5 hover:bg-white/10 text-white"
        }`}
      >
        {time}
      </button>
    ))}
  </div>
)

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
  const [date, setDate] = useState<Date>()

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;
    
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xl p-0 overflow-hidden bg-[#0A0A0A]/95 border border-[#C8A97E]/20 backdrop-blur-lg">
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
              <h2 className="text-xl font-medium text-[#C8A97E]">
                {currentStep === "1" && "Service auswählen"}
                {currentStep === "2" && "Datum auswählen"}
                {currentStep === "3" && "Uhrzeit auswählen"}
                {currentStep === "4" && "Persönliche Daten"}
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
                className="min-h-[350px] max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar pr-2"
              >
                {/* Step 1: Service Selection */}
                {currentStep === "1" && (
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => (
                      <motion.button
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={cn(
                          "p-6 rounded-lg border text-left transition-all",
                          "hover:border-[#C8A97E] hover:bg-[#C8A97E]/10",
                          selectedService === service.id
                            ? "border-[#C8A97E] bg-[#C8A97E]/10"
                            : "border-white/10 bg-black/40"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="text-xl font-medium text-white mb-2">{service.title}</h3>
                        <p className="text-base text-white/70 mb-1">{service.duration}</p>
                        <p className="text-sm text-white/60">{service.description}</p>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Step 2: Date Selection */}
                {currentStep === "2" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white mb-4">Datum auswählen</h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={de}
                        className="bg-transparent border-[#C8A97E]/20"
                        classNames={{
                          day_selected: "bg-[#C8A97E] text-black",
                          day: "hover:bg-white/10",
                          head_cell: "text-[#C8A97E]",
                          nav_button: "hover:bg-white/10",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Time Selection */}
                {currentStep === "3" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white mb-4">Uhrzeit auswählen</h3>
                    <div className="bg-white/5 rounded-lg">
                      <TimeGrid
                        times={[
                          "09:00", "10:00", "11:00", "12:00",
                          "13:00", "14:00", "15:00", "16:00",
                          "17:00", "18:00", "19:00", "20:00"
                        ]}
                        selectedTime={selectedTime}
                        onTimeSelect={handleTimeSelect}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Form */}
                {currentStep === "4" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {skillLevels.map((level) => (
                        <motion.button
                          key={level.id}
                          type="button"
                          onClick={() => handleLevelSelect(level.id)}
                          className={cn(
                            "p-4 rounded-lg border text-left transition-all",
                            "hover:border-[#C8A97E] hover:bg-[#C8A97E]/10",
                            selectedLevel === level.id
                              ? "border-[#C8A97E] bg-[#C8A97E]/10"
                              : "border-white/10 bg-black/40"
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <h3 className="text-base font-medium text-white mb-1">{level.title}</h3>
                          <p className="text-sm text-white/60">{level.description}</p>
                        </motion.button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 rounded-lg border bg-black/40 text-white placeholder-white/40",
                            "focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50",
                            errors.name ? "border-red-500" : "border-white/10 focus:border-[#C8A97E]"
                          )}
                          placeholder="Ihr vollständiger Name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 rounded-lg border bg-black/40 text-white placeholder-white/40",
                            "focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50",
                            errors.email ? "border-red-500" : "border-white/10 focus:border-[#C8A97E]"
                          )}
                          placeholder="ihre@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                          Telefon <span className="text-white/40">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={cn(
                            "w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40",
                            "text-white placeholder-white/40 focus:border-[#C8A97E]",
                            "focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50"
                          )}
                          placeholder="+49"
                        />
                      </div>

                      <div className="mt-6">
                        <div className="flex items-start space-x-2">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              id="terms"
                              name="termsAccepted"
                              checked={formData.termsAccepted}
                              onChange={handleInputChange}
                              className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#C8A97E] focus:ring-[#C8A97E]/50"
                            />
                          </div>
                          <div className="text-sm">
                            <label htmlFor="terms" className="text-white/80">
                              Ich akzeptiere die{" "}
                              <button
                                type="button"
                                onClick={() => setShowLegalModal("agb")}
                                className="text-[#C8A97E] hover:text-[#B89A6F] underline"
                              >
                                AGB
                              </button>{" "}
                              und{" "}
                              <button
                                type="button"
                                onClick={() => setShowLegalModal("datenschutz")}
                                className="text-[#C8A97E] hover:text-[#B89A6F] underline"
                              >
                                Datenschutzerklärung
                              </button>
                            </label>
                            {errors.terms && (
                              <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                          Nachricht <span className="text-white/40">(optional)</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className={cn(
                            "w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40",
                            "text-white placeholder-white/40 focus:border-[#C8A97E]",
                            "focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50",
                            "resize-none"
                          )}
                          placeholder="Ihre Nachricht an uns..."
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className={cn(
                        "w-full px-6 py-3 mt-6 rounded-lg font-medium text-black",
                        "bg-[#C8A97E] hover:bg-[#B89A6F] transition-colors"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Absenden
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              {currentStep !== "1" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep((prev) => (parseInt(prev) - 1).toString() as Step)}
                  className="px-6 py-3 rounded-lg border border-white/20 hover:border-[#C8A97E] transition-colors text-base text-white/80 hover:text-white"
                >
                  Zurück
                </motion.button>
              )}
              
              {currentStep !== "5" ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (currentStep === "1" && !selectedService) return;
                    if (currentStep === "2" && !date) return;
                    if (currentStep === "3" && !selectedTime) return;
                    setCurrentStep((prev) => (parseInt(prev) + 1).toString() as Step);
                  }}
                  className={cn(
                    "px-6 py-3 rounded-lg transition-colors ml-auto text-base font-medium",
                    "bg-[#C8A97E] hover:bg-[#B89A6F] text-black"
                  )}
                  disabled={
                    (currentStep === "1" && !selectedService) ||
                    (currentStep === "2" && !date) ||
                    (currentStep === "3" && !selectedTime)
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
                    "px-4 py-2 rounded-lg transition-colors ml-auto text-sm",
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
      </Dialog>

      {/* Legal Document Modals - Now with higher z-index */}
      <Dialog open={showLegalModal === "agb"} onOpenChange={() => setShowLegalModal(null)}>
        <DialogContent className="max-w-2xl p-6 bg-[#0A0A0A] border border-[#C8A97E]/20 z-[70]">
          <h2 className="text-2xl font-light text-[#C8A97E] mb-4">Allgemeine Geschäftsbedingungen</h2>
          <LegalContent type="agb" />
        </DialogContent>
      </Dialog>

      <Dialog open={showLegalModal === "datenschutz"} onOpenChange={() => setShowLegalModal(null)}>
        <DialogContent className="max-w-2xl p-6 bg-[#0A0A0A] border border-[#C8A97E]/20 z-[70]">
          <h2 className="text-2xl font-light text-[#C8A97E] mb-4">Datenschutzerklärung</h2>
          <LegalContent type="datenschutz" />
        </DialogContent>
      </Dialog>

      {/* Success Message */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <h2 className="text-xl font-medium text-[#C8A97E] mb-4">Buchung erfolgreich!</h2>
          <p className="text-white/70">Vielen Dank für Ihre Buchung. Wir werden uns in Kürze bei Ihnen melden.</p>
        </DialogContent>
      </Dialog>
    </>
  );
} 