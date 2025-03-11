"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addMonths, subMonths, isSameDay, isBefore, startOfToday, startOfMonth, endOfMonth, eachDayOfInterval, isEqual } from "date-fns"
import { de } from "date-fns/locale"
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react"
import { z } from "zod"
import { Dialog } from "@/app/components/ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { cn } from "@/lib/utils"
import SuccessMessage from "./success-message"
import LegalDocumentModal from "./legal-document-modal"
import LegalContent from "./legal-content"
import CustomAlert from "./custom-alert"
import { Calendar } from "@/app/components/ui/calendar"

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

type Step = "1" | "2" | "3" | "4"

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  termsAccepted: boolean;
}

const ServiceOption = ({ service, isSelected, onSelect }: { 
  service: Service, 
  isSelected: boolean, 
  onSelect: () => void 
}) => (
  <motion.div
    onClick={onSelect}
    className={`relative w-full p-6 rounded-xl transition-all duration-300 cursor-pointer ${
      isSelected 
        ? 'bg-gradient-to-br from-[#C8A97E]/20 to-[#C8A97E]/5 border-2 border-[#C8A97E] shadow-[0_0_20px_rgba(200,169,126,0.2)]' 
        : 'bg-black/20 hover:bg-[#C8A97E]/5 border-2 border-white/10 hover:border-[#C8A97E]/50'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-medium text-white mb-1">{service.title}</h3>
          <p className="text-[#C8A97E]">{service.duration}</p>
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-[#C8A97E] flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-black" />
          </motion.div>
        )}
      </div>
      <p className="text-gray-300 text-sm">{service.description}</p>
      {service.types && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.types.map((type) => (
              <div key={type.id} className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 rounded-full bg-[#C8A97E]" />
                <span>{type.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </motion.div>
)

const TimeGrid = ({ times, selectedTime, onTimeSelect }: { 
  times: string[], 
  selectedTime: string | null,
  onTimeSelect: (time: string) => void 
}) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto p-1">
    {times.map((time) => (
      <button
        key={time}
        onClick={() => onTimeSelect(time)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          selectedTime === time
            ? "bg-[#C8A97E] text-black"
            : "bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        {time}
      </button>
    ))}
  </div>
)

const disabledDays = {
  before: new Date(new Date().setHours(new Date().getHours() + 12)), // Disable dates less than 12 hours from now
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("1")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedServiceType, setSelectedServiceType] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
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
    if (serviceId === "workshop") {
      setCurrentStep("2");
    } else if (services.find(s => s.id === serviceId)?.types) {
      setCurrentStep("2");
    } else {
      setCurrentStep("3");
    }
  };

  const handleServiceTypeSelect = (typeId: string) => {
    setSelectedServiceType(typeId);
    setCurrentStep("3");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      if (selectedService === "workshop") {
        setCurrentStep("4")
      } else {
        setCurrentStep("3")
      }
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep("4");
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    
    // Close success message after 3 seconds with smooth animation
    setTimeout(() => {
      const successTimeout = setTimeout(() => {
        setShowSuccess(false)
        // After success message fades out, close the modal smoothly
        setTimeout(() => {
          onClose()
        }, 500) // Additional delay for smooth transition
      }, 3000)
      return () => clearTimeout(successTimeout)
    }, 0)
  }

  const resetForm = () => {
    setSelectedService("");
    setSelectedServiceType("");
    setSelectedDate(undefined);
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

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case "1":
        return selectedService !== "";
      case "2":
        return selectedDate !== undefined;
      case "3":
        return selectedTime !== "";
      case "4":
        return formData.name && formData.email && formData.phone && formData.termsAccepted;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceedToNextStep()) return;
    
    const nextStep = (parseInt(currentStep) + 1).toString() as Step;
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    if (selectedService === "workshop" && currentStep === "4") {
      setCurrentStep("2");
    } else {
      const prevStep = (parseInt(currentStep) - 1).toString() as Step;
      setCurrentStep(prevStep);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100]" onClick={(e) => e.stopPropagation()}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-xl bg-[#0A0A0A] rounded-xl border border-[#C8A97E]/20 shadow-2xl overflow-hidden"
                >
                  {/* Modal content */}
                  <div className="p-4">
                    {/* Steps content with transitions */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* Service Selection */}
                        {currentStep === "1" && (
                          <div className="space-y-6">
                            <h3 className="text-xl font-medium text-white">Service auswählen</h3>
                            <div className="grid gap-4">
                              {services.map((service) => (
                                <ServiceOption
                                  key={service.id}
                                  service={service}
                                  isSelected={selectedService === service.id}
                                  onSelect={() => handleServiceSelect(service.id)}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Date Selection */}
                        {currentStep === "2" && (
                          <div className="flex flex-col items-center justify-center w-full">
                            <h3 className="text-lg font-medium text-white mb-4">Wählen Sie ein Datum</h3>
                            <div className="w-full max-w-sm mx-auto bg-[#0A0A0A] rounded-lg p-4">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                disabled={(date) => {
                                  const tomorrow = new Date();
                                  tomorrow.setDate(tomorrow.getDate() + 1);
                                  tomorrow.setHours(0, 0, 0, 0);
                                  return date < tomorrow || date.getDay() === 0;
                                }}
                                className="w-full border-none bg-transparent text-white"
                              />
                            </div>
                          </div>
                        )}

                        {/* Time Selection */}
                        {currentStep === "3" && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white mb-4">Wählen Sie eine Uhrzeit</h3>
                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                              <div className="grid grid-cols-3 gap-3 p-4 bg-white/5 rounded-lg">
                                {timeSlots.map((time, index) => (
                                  <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleTimeSelect(time)}
                                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                      selectedTime === time
                                        ? "bg-[#C8A97E] text-black"
                                        : "bg-black/20 text-white hover:bg-[#C8A97E]/20"
                                    }`}
                                  >
                                    {time}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Personal Information */}
                        {currentStep === "4" && (
                          <div className="space-y-6">
                            <h3 className="text-xl font-medium text-white">Persönliche Daten</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="text-sm font-medium text-white/80 mb-2 block">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full bg-black/20 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A97E] transition-colors"
                                  placeholder="Ihr vollständiger Name"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-white/80 mb-2 block">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full bg-black/20 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A97E] transition-colors"
                                  placeholder="ihre.email@beispiel.de"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-white/80 mb-2 block">Telefon</label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full bg-black/20 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A97E] transition-colors"
                                  placeholder="+49 123 45678900"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-white/80 mb-2 block">Nachricht (optional)</label>
                                <textarea
                                  name="message"
                                  value={formData.message}
                                  onChange={handleInputChange}
                                  rows={4}
                                  className="w-full bg-black/20 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A97E] transition-colors resize-none"
                                  placeholder="Ihre Nachricht an uns..."
                                />
                              </div>
                              <div className="md:col-span-2">
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-black/20 border-2 border-white/10">
                                  <input
                                    type="checkbox"
                                    id="termsAccepted"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                                    className="mt-1 h-4 w-4 rounded border-2 border-white/10 text-[#C8A97E] focus:ring-[#C8A97E]"
                                    required
                                  />
                                  <label htmlFor="termsAccepted" className="text-sm text-gray-300">
                                    Ich akzeptiere die <button type="button" onClick={() => setShowLegalModal("agb")} className="text-[#C8A97E] hover:underline">AGB</button> und die <button type="button" onClick={() => setShowLegalModal("datenschutz")} className="text-[#C8A97E] hover:underline">Datenschutzerklärung</button>
                                  </label>
                                </div>
                                {errors.terms && (
                                  <p className="text-red-500 text-sm mt-2">{errors.terms}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons with transitions */}
                    <div className="mt-6 flex justify-between gap-4">
                      {currentStep !== "1" && (
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          onClick={handleBack}
                          className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                        >
                          Zurück
                        </motion.button>
                      )}
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        onClick={currentStep === "4" ? handleSubmit : handleNext}
                        disabled={!canProceedToNextStep()}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          canProceedToNextStep()
                            ? "bg-[#C8A97E] hover:bg-[#B69A6E] text-black"
                            : "bg-gray-600 cursor-not-allowed text-gray-300"
                        }`}
                      >
                        {currentStep === "4" ? "Absenden" : "Weiter"}
                      </motion.button>
                    </div>
                  </div>

                  {/* Close button */}
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Legal Document Modal */}
      <AnimatePresence>
        {showLegalModal === "agb" && (
          <div className="fixed inset-0 z-[200]" onClick={(e) => e.stopPropagation()}>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-2xl bg-[#0A0A0A] rounded-xl border border-[#C8A97E]/20 shadow-2xl overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-medium text-[#C8A97E] mb-4">AGB</h2>
                    <div className="prose prose-invert max-w-none">
                      <LegalContent type="agb" />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLegalModal(null)}
                    className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {showLegalModal === "datenschutz" && (
          <LegalDocumentModal
            isOpen={true}
            onClose={() => setShowLegalModal(null)}
            title="Datenschutzerklärung"
          >
            <LegalContent type="datenschutz" />
          </LegalDocumentModal>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#0A0A0A] rounded-xl p-6 border border-[#C8A97E]/20 shadow-2xl w-[90%] max-w-md z-[201]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#C8A97E]/20 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-[#C8A97E]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Buchung erfolgreich!</h3>
                <p className="text-gray-400">Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigung per E-Mail.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Dialog>
  );
} 