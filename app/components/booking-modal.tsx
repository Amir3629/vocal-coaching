"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addMonths, subMonths, isSameDay, isBefore, startOfToday, startOfMonth, endOfMonth, eachDayOfInterval, isEqual } from "date-fns"
import { de } from "date-fns/locale"
import { ChevronLeft, ChevronRight, X, Check, Music, Mic, Users } from "lucide-react"
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
    title: "Gesangsperformance",
    duration: "Nach Vereinbarung",
    description: "Professionelle Gesangsdarbietung für Events, Feiern und besondere Anlässe",
    types: [
      {
        id: "solo",
        title: "Solo-Performance",
        description: "Individuelle Gesangsdarbietung"
      },
      {
        id: "band",
        title: "Mit Band",
        description: "Performance mit Klavierbegleitung, Gitarre und weiteren Instrumenten"
      },
      {
        id: "custom",
        title: "Maßgeschneidert",
        description: "Individuell angepasste Performance"
      }
    ]
  },
  {
    id: "vocal-coaching",
    title: "Vocal Coaching",
    duration: "60 min",
    description: "Professionelles Stimmtraining nach der Complete Vocal Technique (CVT) - einer wissenschaftlich fundierten Methode für alle Gesangsstile",
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
    description: "Intensives Gruppentraining für Gesangstechniken und Performance"
  }
];

const skillLevels = [
  { id: "beginner", title: "Einsteiger", description: "Erste Schritte in der Musik" },
  { id: "intermediate", title: "Erfahren", description: "Grundlagen sind vorhanden" },
  { id: "advanced", title: "Professionell", description: "Fortgeschrittene Techniken" }
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
    className={`group relative w-full p-6 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden ${
      isSelected 
        ? 'bg-gradient-to-br from-[#C8A97E]/20 to-[#C8A97E]/5 border-2 border-[#C8A97E] shadow-[0_0_20px_rgba(200,169,126,0.2)]' 
        : 'bg-black/20 hover:bg-[#C8A97E]/5 border-2 border-white/10 hover:border-[#C8A97E]/50'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    {/* Background Image with Blur Effect */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter blur-sm group-hover:blur-none opacity-30 group-hover:opacity-40"
      style={{ 
        backgroundImage: `url(/images/${service.id}-bg.jpg)`,
        transform: isSelected ? 'scale(1.1)' : 'scale(1)'
      }}
    />

    <div className="relative flex flex-col h-full z-10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-medium text-white mb-1 drop-shadow-lg">{service.title}</h3>
          <p className="text-[#C8A97E] drop-shadow-md">{service.duration}</p>
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
      <p className="text-gray-100 text-sm font-medium drop-shadow-lg">{service.description}</p>
      {service.types && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.types.map((type) => (
              <div key={type.id} className="flex items-center gap-2 text-sm text-gray-200">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                <span className="drop-shadow-md">{type.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Icon */}
      <div className="absolute top-4 left-4 text-[#C8A97E] opacity-50 group-hover:opacity-100">
        {service.id === "singen" && <Music className="w-6 h-6" />}
        {service.id === "vocal-coaching" && <Mic className="w-6 h-6" />}
        {service.id === "workshop" && <Users className="w-6 h-6" />}
      </div>
    </div>
  </motion.div>
)

const TimeGrid = ({ times, selectedTime, onTimeSelect }: { 
  times: string[], 
  selectedTime: string | null,
  onTimeSelect: (time: string) => void 
}) => (
  <div className="flex flex-wrap justify-center gap-2 max-w-[500px] mx-auto">
    {times.map((time) => (
      <button
        key={time}
        onClick={() => onTimeSelect(time)}
        className={`relative w-[70px] h-[70px] rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
          selectedTime === time
            ? "bg-[#C8A97E] text-black shadow-[0_0_20px_rgba(200,169,126,0.3)]"
            : "bg-white/5 text-white hover:bg-[#C8A97E]/10 border border-[#C8A97E]/20"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {time}
        </div>
        {selectedTime === time && (
          <motion.div
            layoutId="timeSelection"
            className="absolute inset-0 rounded-xl bg-[#C8A97E] -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
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
  const [selectedLocation, setSelectedLocation] = useState<"studio" | "online" | "">("")
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
    e.preventDefault();
    if (!formData.termsAccepted) {
      setErrors({ termsAccepted: "You must accept the terms and conditions." });
      return;
    }
    setShowSuccess(true);
    
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
    setSelectedLocation("");
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
        if (selectedService === "vocal-coaching" && !selectedLocation) {
          return false;
        }
        return selectedTime !== "";
      case "4":
        return formData.name && formData.email && formData.phone && formData.termsAccepted && selectedLevel !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === "1") setCurrentStep("2")
    else if (currentStep === "2") setCurrentStep("3")
    else if (currentStep === "3") setCurrentStep("4")
  }

  const handleBack = () => {
    if (currentStep === "2") setCurrentStep("1")
    else if (currentStep === "3") setCurrentStep("2")
    else if (currentStep === "4") setCurrentStep("3")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div role="dialog" aria-labelledby="booking-modal-title" aria-describedby="booking-modal-description">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                onClick={onClose}
              />
              <div className="fixed inset-0 flex items-center justify-center z-[61] overflow-y-auto p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="w-[90%] max-w-[500px] max-h-[85vh] bg-[#0A0A0A] rounded-xl border border-[#C8A97E]/20 shadow-2xl overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-[#C8A97E]/20">
                    <h3 id="booking-modal-title" className="text-lg font-medium text-white">Buchung</h3>
                    <button
                      onClick={onClose}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 overflow-y-auto max-h-[calc(85vh-8rem)] custom-scrollbar">
                    <div className="space-y-4">
                      {currentStep === "1" && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          {services.map((service) => (
                            <ServiceOption
                              key={service.id}
                              service={service}
                              isSelected={selectedService === service.id}
                              onSelect={() => handleServiceSelect(service.id)}
                            />
                          ))}
                        </motion.div>
                      )}

                      {currentStep === "2" && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col items-center justify-center w-full"
                        >
                          <div className="flex items-center justify-center w-full">
                            <div className="w-full max-w-[350px] flex justify-center">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                disabled={(date) =>
                                  date < new Date() || date > addMonths(new Date(), 2)
                                }
                                initialFocus
                                className="rounded-lg border border-[#C8A97E]/20 bg-black/20 w-full"
                                locale={de}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === "3" && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col items-center justify-center w-full py-4 space-y-6"
                        >
                          {selectedService === "vocal-coaching" && (
                            <div className="w-full space-y-2">
                              <label className="text-sm text-gray-400">Unterrichtsort</label>
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => setSelectedLocation("studio")}
                                  className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                    selectedLocation === "studio"
                                      ? "bg-[#C8A97E] text-black shadow-[0_0_20px_rgba(200,169,126,0.3)]"
                                      : "bg-white/5 text-white hover:bg-[#C8A97E]/10 border border-[#C8A97E]/20"
                                  }`}
                                >
                                  Im Studio
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedLocation("online")}
                                  className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                    selectedLocation === "online"
                                      ? "bg-[#C8A97E] text-black shadow-[0_0_20px_rgba(200,169,126,0.3)]"
                                      : "bg-white/5 text-white hover:bg-[#C8A97E]/10 border border-[#C8A97E]/20"
                                  }`}
                                >
                                  Online
                                </button>
                              </div>
                            </div>
                          )}
                          
                          <TimeGrid
                            times={timeSlots}
                            selectedTime={selectedTime}
                            onTimeSelect={handleTimeSelect}
                          />
                        </motion.div>
                      )}

                      {currentStep === "4" && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="booking-form-description">
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              aria-label="Name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A97E] transition-colors"
                            />
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A97E] transition-colors"
                            />
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Telefon"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A97E] transition-colors"
                            />
                            <textarea
                              name="message"
                              placeholder="Nachricht (optional)"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A97E] transition-colors resize-none"
                            />
                            
                            {/* Skill Level Selection */}
                            <div className="space-y-2">
                              <label className="text-sm text-gray-400">Erfahrungsniveau</label>
                              <div className="flex gap-3">
                                {skillLevels.map((level) => (
                                  <button
                                    key={level.id}
                                    type="button"
                                    onClick={() => handleLevelSelect(level.id)}
                                    className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                      selectedLevel === level.id
                                        ? "bg-[#C8A97E] text-black shadow-[0_0_20px_rgba(200,169,126,0.3)]"
                                        : "bg-white/5 text-white hover:bg-[#C8A97E]/10 border border-[#C8A97E]/20"
                                    }`}
                                  >
                                    {level.title}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  name="termsAccepted"
                                  id="terms"
                                  checked={formData.termsAccepted}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      termsAccepted: e.target.checked,
                                    })
                                  }
                                  required
                                  className="appearance-none w-3.5 h-3.5 rounded border border-[#C8A97E]/30 bg-white/5 checked:bg-[#C8A97E] checked:border-[#C8A97E] transition-all duration-200 cursor-pointer"
                                />
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-black transition-opacity opacity-0 peer-checked:opacity-100">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                              </div>
                              <label htmlFor="terms" className="text-xs text-gray-400">
                                Ich akzeptiere die{" "}
                                <button
                                  type="button"
                                  onClick={() => setShowLegalModal("agb")}
                                  className="text-[#C8A97E] hover:text-[#B69A6E] underline"
                                >
                                  AGB
                                </button>{" "}
                                und{" "}
                                <button
                                  type="button"
                                  onClick={() => setShowLegalModal("datenschutz")}
                                  className="text-[#C8A97E] hover:text-[#B69A6E] underline"
                                >
                                  Datenschutzerklärung
                                </button>
                              </label>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Footer Navigation */}
                  <div className="p-4 border-t border-[#C8A97E]/20">
                    <div className="flex justify-between gap-4">
                      {currentStep !== "1" && (
                        <button
                          onClick={handleBack}
                          className="px-6 py-2 rounded-lg border border-[#C8A97E]/30 text-[#C8A97E] hover:bg-[#C8A97E]/10 transition-colors"
                        >
                          Zurück
                        </button>
                      )}
                      <button
                        onClick={currentStep === "4" ? handleSubmit : handleNext}
                        disabled={!canProceedToNextStep()}
                        aria-label={currentStep === "4" ? "Submit Booking" : "Next Step"}
                        className={`px-6 py-2 rounded-lg transition-colors ${
                          canProceedToNextStep()
                            ? "bg-[#C8A97E] text-black hover:bg-[#B69A6E]"
                            : "bg-[#C8A97E]/50 text-black/50 cursor-not-allowed"
                        } ${currentStep === "1" ? "ml-auto" : ""}`}
                      >
                        {currentStep === "4" ? "Buchen" : "Weiter"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <SuccessMessage
          isOpen={showSuccess}
          onClose={() => {
            setShowSuccess(false)
            onClose()
          }}
          title="Buchung erfolgreich!"
          message="Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigung per Email."
        />

        {/* Legal Document Modals */}
        <AnimatePresence mode="wait">
          {showLegalModal === "agb" && (
            <motion.div 
              className="fixed inset-0 z-[200]" 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-2xl bg-[#0A0A0A] rounded-xl border border-[#C8A97E]/20 shadow-2xl overflow-hidden"
                  >
                    <div className="p-6">
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
            </motion.div>
          )}

          {showLegalModal === "datenschutz" && (
            <motion.div 
              className="fixed inset-0 z-[200]" 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-2xl bg-[#0A0A0A] rounded-xl border border-[#C8A97E]/20 shadow-2xl overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="prose prose-invert max-w-none">
                        <LegalContent type="datenschutz" />
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Messages */}
        {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
      </div>
    </Dialog>
  )
} 