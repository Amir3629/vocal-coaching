"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, MapPin, Music, Mic, Users, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { Calendar as CalendarComponent } from "../components/ui/calendar"
import { useLanguage } from "./language-switcher"
import { useTranslation } from 'react-i18next'
import { cn } from "../../lib/utils"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

type Service = "singing" | "coaching" | "performance"

interface FormData {
  service: Service | null
  date: Date | null
  name: string
  email: string
  phone: string
  message: string
  experienceLevel: "beginner" | "intermediate" | "professional" | null
  termsAccepted: boolean
  level?: string
  guests?: string
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    service: null,
    date: null,
    name: "",
    email: "",
    phone: "",
    message: "",
    experienceLevel: null,
    termsAccepted: false
  })
  const [isClosing, setIsClosing] = useState(false)
  const { currentLang } = useLanguage()
  const { t } = useTranslation()
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setFormData({
        service: null,
        date: null,
        name: "",
        email: "",
        phone: "",
        message: "",
        experienceLevel: null,
        termsAccepted: false
      })
      setIsClosing(false)
    }
  }, [isOpen])
  
  const handleServiceSelect = (service: Service) => {
    setFormData(prev => ({ ...prev, service }))
    setStep(2)
  }
  
  const handleDateSelect = (date: Date | null) => {
    setFormData(prev => ({ ...prev, date }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleExperienceLevelSelect = (level: "beginner" | "intermediate" | "professional") => {
    setFormData(prev => ({ ...prev, experienceLevel: level }))
  }
  
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    // For now, just close the modal
    handleSmoothClose()
  }
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }
  
  const handleSmoothClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 500)
  }
  
  if (!isOpen) return null
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  }
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }
  
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-1">
              <ServiceCard
                title={currentLang === "de" ? "Gesangsunterricht" : "Singing Lessons"}
                subtitle={currentLang === "de" ? "60 min" : "60 min"}
                description={
                  currentLang === "de"
                    ? "Individueller Gesangsunterricht für alle Niveaus. Verbessere deine Technik, erweitere deinen Stimmumfang und entwickle deinen eigenen Stil."
                    : "Individual singing lessons for all levels. Improve your technique, expand your vocal range, and develop your own style."
                }
                icon={<Mic className="w-6 h-6" />}
                features={
                  currentLang === "de"
                    ? ["Stimmbildung", "Atemtechnik", "Interpretation", "Bühnenpräsenz"]
                    : ["Voice Training", "Breathing Technique", "Interpretation", "Stage Presence"]
                }
                onClick={() => handleServiceSelect("singing")}
                isSelected={formData.service === "singing"}
                currentLang={currentLang}
              />
              
              <ServiceCard
                title={currentLang === "de" ? "Vocal Coaching" : "Vocal Coaching"}
                subtitle={currentLang === "de" ? "60 min" : "60 min"}
                description={
                  currentLang === "de"
                    ? "Professionelles Vocal Coaching mit der Complete Vocal Technique (CVT). Wissenschaftlich fundierte Methode für alle Gesangsstile."
                    : "Professional voice training using the Complete Vocal Technique (CVT). A scientifically based method for all singing styles."
                }
                icon={<Mic className="w-6 h-6" />}
                features={
                  currentLang === "de"
                    ? ["Private Lessons", "Online Coaching", "Group Lessons"]
                    : ["Private Lessons", "Online Coaching", "Group Lessons"]
                }
                onClick={() => handleServiceSelect("coaching")}
                isSelected={formData.service === "coaching"}
                currentLang={currentLang}
              />
              
              <ServiceCard
                title={currentLang === "de" ? "Professioneller Gesang" : "Professional Singing"}
                subtitle={currentLang === "de" ? "Nach Vereinbarung" : "As arranged"}
                description={
                  currentLang === "de"
                    ? "Professionelle Gesangsauftritte für Events und Veranstaltungen. Maßgeschneiderte Programme für Hochzeiten, Firmenfeiern und private Anlässe."
                    : "Professional vocal performances for events and occasions. Customized programs for weddings, corporate events, and private celebrations."
                }
                icon={<Music className="w-6 h-6" />}
                features={
                  currentLang === "de"
                    ? ["Live-Auftritte", "Hochzeiten & Feiern", "Firmenevents", "Maßgeschneiderte Programme"]
                    : ["Live Performances", "Weddings & Celebrations", "Corporate Events", "Customized Programs"]
                }
                onClick={() => handleServiceSelect("singing")}
                isSelected={formData.service === "singing"}
                currentLang={currentLang}
              />
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {formData.service === "singing" ? (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    {currentLang === "de" ? "Event Details" : "Event Details"}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {currentLang === "de" ? "Event-Typ" : "Event Type"}
                      </label>
                      <select
                        className="w-full bg-black/50 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50"
                        value={formData.level || ""}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      >
                        <option value="">{currentLang === "de" ? "Bitte wählen" : "Please select"}</option>
                        <option value="wedding">{currentLang === "de" ? "Hochzeit" : "Wedding"}</option>
                        <option value="corporate">{currentLang === "de" ? "Firmenevent" : "Corporate Event"}</option>
                        <option value="private">{currentLang === "de" ? "Private Feier" : "Private Celebration"}</option>
                        <option value="cultural">{currentLang === "de" ? "Kulturelles Event" : "Cultural Event"}</option>
                        <option value="other">{currentLang === "de" ? "Sonstiges" : "Other"}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {currentLang === "de" ? "Ungefähre Gästeanzahl" : "Approximate Number of Guests"}
                      </label>
                      <input
                        type="number"
                        className="w-full bg-black/50 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50"
                        value={formData.guests || ""}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        placeholder={currentLang === "de" ? "z.B. 50" : "e.g. 50"}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">
                  {currentLang === "de" ? "Wählen Sie ein Datum" : "Select a Date"}
                </h3>
                <div className="flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={formData.date || undefined}
                    onSelect={(date) => handleDateSelect(date || null)}
                    className="rounded-md border-white/10 bg-black/30"
                    classNames={{
                      day_selected: "bg-[#C8A97E] text-black hover:bg-[#C8A97E] hover:text-black focus:bg-[#C8A97E] focus:text-black",
                      day_today: "bg-white/10 text-white",
                      day_outside: "text-white/30",
                      day: "hover:bg-white/10 focus:bg-white/10",
                      head_cell: "text-white/70 font-normal",
                      nav_button: "hover:bg-white/10 p-1 rounded-full",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      caption: "flex justify-center py-2 relative items-center",
                      caption_label: "text-sm font-medium text-white",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-white/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      root: "bg-transparent text-white"
                    }}
                    locale={currentLang === "de" ? de : undefined}
                  />
                </div>
                
                {formData.date && (
                  <div className="mt-4 p-3 bg-white/5 rounded-md border border-white/10">
                    <p className="text-white text-center">
                      {currentLang === "de" ? "Ausgewähltes Datum:" : "Selected date:"}{" "}
                      <span className="font-medium text-[#C8A97E]">
                        {format(formData.date, "PPP", { locale: currentLang === "de" ? de : undefined })}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={currentLang === "de" ? "Name" : "Name"}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50 focus:border-[#C8A97E] transition-all"
                    required
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={currentLang === "de" ? "E-Mail" : "E-mail"}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50 focus:border-[#C8A97E] transition-all"
                    required
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={currentLang === "de" ? "Telefon" : "Phone"}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50 focus:border-[#C8A97E] transition-all"
                  />
                </div>
                
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={currentLang === "de" ? "Nachricht (optional)" : "Message (optional)"}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#C8A97E]/50 focus:border-[#C8A97E] transition-all min-h-[100px] resize-none"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">
                  {currentLang === "de" ? "Erfahrungslevel" : "Experience Level"}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleExperienceLevelSelect("beginner")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      formData.experienceLevel === "beginner"
                        ? "bg-[#C8A97E] text-black"
                        : "bg-black/40 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {formData.experienceLevel === "beginner" && (
                      <Check className="w-4 h-4 inline-block mr-1" />
                    )}
                    {currentLang === "de" ? "Anfänger" : "Beginner"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExperienceLevelSelect("intermediate")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      formData.experienceLevel === "intermediate"
                        ? "bg-[#C8A97E] text-black"
                        : "bg-black/40 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {formData.experienceLevel === "intermediate" && (
                      <Check className="w-4 h-4 inline-block mr-1" />
                    )}
                    {currentLang === "de" ? "Fortgeschritten" : "Intermediate"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExperienceLevelSelect("professional")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      formData.experienceLevel === "professional"
                        ? "bg-[#C8A97E] text-black"
                        : "bg-black/40 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {formData.experienceLevel === "professional" && (
                      <Check className="w-4 h-4 inline-block mr-1" />
                    )}
                    {currentLang === "de" ? "Profi" : "Professional"}
                  </button>
                </div>
              </div>
              
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleTermsChange}
                    className="w-5 h-5 bg-black/40 border border-white/20 rounded text-[#C8A97E] focus:ring-[#C8A97E] focus:ring-offset-0 focus:ring-offset-transparent"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-white/70">
                    {currentLang === "de" ? "Ich akzeptiere die " : "I accept the "}
                    <a href="#" className="text-[#C8A97E] hover:underline">
                      {currentLang === "de" ? "Allgemeinen Geschäftsbedingungen" : "Terms & Conditions"}
                    </a>
                    {currentLang === "de" ? " und " : " and "}
                    <a href="#" className="text-[#C8A97E] hover:underline">
                      {currentLang === "de" ? "Datenschutzrichtlinie" : "Privacy Policy"}
                    </a>
                  </label>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#C8A97E] hover:bg-[#D4B88F] text-black font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:ring-offset-2 focus:ring-offset-black"
                >
                  {currentLang === "de" ? "Buchen" : "Book"}
                </button>
              </div>
            </form>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
        initial="hidden"
        animate={isClosing ? "exit" : "visible"}
        exit="exit"
        variants={backdropVariants}
        transition={{ duration: 0.5 }}
        onClick={handleSmoothClose}
      >
        <motion.div
          className="relative bg-black/80 backdrop-blur-md border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
          initial="hidden"
          animate={isClosing ? "exit" : "visible"}
          exit="exit"
          variants={modalVariants}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.5 
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-xl font-medium text-white">
              {currentLang === "de" ? "Buchung" : "Booking"}
            </h2>
            <button
              onClick={handleSmoothClose}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="px-4 pt-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#C8A97E] text-black' : 'bg-white/10 text-white/70'}`}>
                  1
                </div>
                <span className={`text-sm ${step >= 1 ? 'text-white' : 'text-white/50'}`}>
                  {currentLang === "de" ? "Dienst" : "Service"}
                </span>
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-[#C8A97E]' : 'bg-white/10'}`}></div>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#C8A97E] text-black' : 'bg-white/10 text-white/70'}`}>
                  2
                </div>
                <span className={`text-sm ${step >= 2 ? 'text-white' : 'text-white/50'}`}>
                  {currentLang === "de" ? "Datum" : "Date"}
                </span>
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-[#C8A97E]' : 'bg-white/10'}`}></div>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#C8A97E] text-black' : 'bg-white/10 text-white/70'}`}>
                  3
                </div>
                <span className={`text-sm ${step >= 3 ? 'text-white' : 'text-white/50'}`}>
                  {currentLang === "de" ? "Details" : "Details"}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 flex justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 flex items-center gap-2 text-white bg-black/40 hover:bg-white/10 rounded-md transition-colors border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
                {currentLang === "de" ? "Zurück" : "Back"}
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={step === 1 && !formData.service || step === 2 && !formData.date}
                className={`px-4 py-2 flex items-center gap-2 rounded-md transition-colors ${
                  (step === 1 && !formData.service) || (step === 2 && !formData.date)
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-[#C8A97E] hover:bg-[#D4B88F] text-black"
                }`}
              >
                {currentLang === "de" ? "Weiter" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

interface ServiceCardProps {
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  features: string[]
  onClick: () => void
  isSelected: boolean
  currentLang: string
}

function ServiceCard({ title, subtitle, description, icon, features, onClick, isSelected, currentLang }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1
      }}
      className={`relative p-4 rounded-lg cursor-pointer overflow-hidden transition-all duration-500 ${
        isSelected
          ? "bg-[#C8A97E]/20 border-[#C8A97E] shadow-[0_0_15px_rgba(200,169,126,0.3)]"
          : "bg-black/40 border-white/10 hover:bg-black/60"
      } border`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        minHeight: isHovered ? '420px' : '320px',
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, min-height, background-color'
      }}
    >
      {isSelected && (
        <motion.div
          className="absolute top-2 right-2 bg-[#C8A97E] text-black p-1 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <Check className="w-4 h-4" />
        </motion.div>
      )}
      
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-full transition-colors duration-300 ${isSelected ? "bg-[#C8A97E] text-black" : "bg-white/10 text-[#C8A97E]"}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="text-sm text-[#C8A97E]">{subtitle}</p>
        </div>
      </div>
      
      <p className="text-sm text-white/80 mb-4">{description}</p>
      
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
            <span className="text-sm text-white/70">{feature}</span>
          </div>
        ))}
      </div>
      
      <AnimatePresence mode="sync">
        {isHovered && (
          <motion.div 
            className="mt-4 space-y-3 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: {
                height: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.5
                },
                opacity: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }
            }}
            exit={{ 
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.5
                },
                opacity: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }
            }}
          >
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-white/70 italic">
                {isSelected ? 
                  (currentLang === "de" ? "Ausgewählt" : "Selected") : 
                  (currentLang === "de" ? "Klicken um auszuwählen" : "Click to select")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 