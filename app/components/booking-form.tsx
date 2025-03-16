"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-switcher'
import { useTranslation } from 'react-i18next'
import { Check, ChevronRight, Info, MusicIcon, Mic, Calendar, Users } from 'lucide-react'

// Brand colors
const BRAND_COLORS = {
  primary: '#2A2D4F', // Dark blue
  secondary: '#C8A97E', // Gold
  accent: '#D4AF37', // Brighter gold
  dark: '#1A1A1A',
  light: '#F5F5F5',
}

// Service types
type ServiceType = 'gesangsunterricht' | 'vocal-coaching' | 'professioneller-gesang' | null

// Form step type
type FormStep = 'service' | 'details' | 'confirm'

// Base form data interface
interface BaseFormData {
  name: string
  email: string
  phone: string
  message: string
  termsAccepted: boolean
  cancellationAccepted: boolean
}

// Gesangsunterricht specific form data
interface GesangsunterrichtFormData extends BaseFormData {
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | null
  goals: string[]
  lessonType: 'in-person' | 'online' | null
}

// Vocal Coaching specific form data
interface VocalCoachingFormData extends BaseFormData {
  sessionType: 'group' | 'private' | null
  cvtFocusAreas: string[]
  availability: string
}

// Professioneller Gesang specific form data
interface ProfessionellerGesangFormData extends BaseFormData {
  eventType: 'wedding' | 'corporate' | 'private' | 'other' | null
  guestCount: number | null
  duration: number | null
  musicPreferences: string
}

// Union type for all form data
type FormData = 
  | (GesangsunterrichtFormData & { serviceType: 'gesangsunterricht' })
  | (VocalCoachingFormData & { serviceType: 'vocal-coaching' })
  | (ProfessionellerGesangFormData & { serviceType: 'professioneller-gesang' })
  | { serviceType: null }

export default function BookingForm() {
  const { currentLang } = useLanguage()
  const { t } = useTranslation()
  
  // State for current step and service type
  const [currentStep, setCurrentStep] = useState<FormStep>('service')
  const [serviceType, setServiceType] = useState<ServiceType>(null)
  
  // Initialize form data with default values
  const [formData, setFormData] = useState<FormData>({
    serviceType: null,
  })
  
  // Progress percentage based on current step
  const getProgressPercentage = () => {
    switch (currentStep) {
      case 'service': return 33
      case 'details': return 66
      case 'confirm': return 100
      default: return 0
    }
  }
  
  // Handle service selection
  const handleServiceSelect = (service: ServiceType) => {
    setServiceType(service)
    
    // Initialize form data based on service type
    if (service === 'gesangsunterricht') {
      setFormData({
        serviceType: 'gesangsunterricht',
        name: '',
        email: '',
        phone: '',
        message: '',
        termsAccepted: false,
        cancellationAccepted: false,
        skillLevel: null,
        goals: [],
        lessonType: null,
      })
    } else if (service === 'vocal-coaching') {
      setFormData({
        serviceType: 'vocal-coaching',
        name: '',
        email: '',
        phone: '',
        message: '',
        termsAccepted: false,
        cancellationAccepted: false,
        sessionType: null,
        cvtFocusAreas: [],
        availability: '',
      })
    } else if (service === 'professioneller-gesang') {
      setFormData({
        serviceType: 'professioneller-gesang',
        name: '',
        email: '',
        phone: '',
        message: '',
        termsAccepted: false,
        cancellationAccepted: false,
        eventType: null,
        guestCount: null,
        duration: null,
        musicPreferences: '',
      })
    }
    
    // Move to next step
    setCurrentStep('details')
  }
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({
        ...formData,
        [name]: checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }
  
  // Handle multi-select options (like goals or focus areas)
  const handleMultiSelectChange = (field: string, value: string) => {
    if (formData.serviceType === 'gesangsunterricht') {
      const currentValues = [...formData.goals]
      if (currentValues.includes(value)) {
        setFormData({
          ...formData,
          goals: currentValues.filter(item => item !== value),
        })
      } else {
        setFormData({
          ...formData,
          goals: [...currentValues, value],
        })
      }
    } else if (formData.serviceType === 'vocal-coaching') {
      const currentValues = [...formData.cvtFocusAreas]
      if (currentValues.includes(value)) {
        setFormData({
          ...formData,
          cvtFocusAreas: currentValues.filter(item => item !== value),
        })
      } else {
        setFormData({
          ...formData,
          cvtFocusAreas: [...currentValues, value],
        })
      }
    }
  }
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.termsAccepted || !formData.cancellationAccepted) {
      alert(t('booking.acceptTermsError'))
      return
    }
    
    // Submit form data (this would typically be an API call)
    console.log('Form submitted:', formData)
    
    // Show success message or redirect
    alert(t('booking.successMessage'))
    
    // Reset form
    setServiceType(null)
    setCurrentStep('service')
    setFormData({ serviceType: null })
  }
  
  // Go to next step
  const goToNextStep = () => {
    if (currentStep === 'service') {
      setCurrentStep('details')
    } else if (currentStep === 'details') {
      setCurrentStep('confirm')
    }
  }
  
  // Go to previous step
  const goToPreviousStep = () => {
    if (currentStep === 'details') {
      setCurrentStep('service')
    } else if (currentStep === 'confirm') {
      setCurrentStep('details')
    }
  }
  
  // Auto-save form data to localStorage
  useEffect(() => {
    if (formData.serviceType) {
      localStorage.setItem('bookingFormData', JSON.stringify(formData))
    }
  }, [formData])
  
  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('bookingFormData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData
        if (parsedData.serviceType) {
          setFormData(parsedData)
          setServiceType(parsedData.serviceType)
        }
      } catch (error) {
        console.error('Error parsing saved form data:', error)
      }
    }
  }, [])
  
  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">{t('booking.title')}</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">{t('booking.subtitle')}</p>
        </motion.div>
        
        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-[#2A2D4F]">
                {currentStep === 'service' ? t('booking.step1') : 
                 currentStep === 'details' ? t('booking.step2') : 
                 t('booking.step3')}
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-white">
                  {getProgressPercentage()}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#1A1A1A]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#C8A97E]"
              ></motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <div className={currentStep === 'service' ? 'text-[#C8A97E] font-medium' : ''}>
                {t('booking.serviceStep')}
              </div>
              <div className={currentStep === 'details' ? 'text-[#C8A97E] font-medium' : ''}>
                {t('booking.detailsStep')}
              </div>
              <div className={currentStep === 'confirm' ? 'text-[#C8A97E] font-medium' : ''}>
                {t('booking.confirmStep')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-[#0A0A0A] rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Selection */}
              {currentStep === 'service' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">{t('booking.chooseService')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Gesangsunterricht */}
                    <div 
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        serviceType === 'gesangsunterricht' 
                          ? 'border-[#C8A97E] bg-[#2A2D4F]/20' 
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                      onClick={() => handleServiceSelect('gesangsunterricht')}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-[#2A2D4F] flex items-center justify-center">
                          <Mic className="w-8 h-8 text-[#C8A97E]" />
                        </div>
                      </div>
                      <h4 className="text-xl font-medium text-white text-center mb-2">
                        {t('booking.gesangsunterricht')}
                      </h4>
                      <p className="text-gray-400 text-center text-sm">
                        {t('booking.gesangsunterrichtDesc')}
                      </p>
                    </div>
                    
                    {/* Vocal Coaching */}
                    <div 
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        serviceType === 'vocal-coaching' 
                          ? 'border-[#C8A97E] bg-[#2A2D4F]/20' 
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                      onClick={() => handleServiceSelect('vocal-coaching')}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-[#2A2D4F] flex items-center justify-center">
                          <MusicIcon className="w-8 h-8 text-[#C8A97E]" />
                        </div>
                      </div>
                      <h4 className="text-xl font-medium text-white text-center mb-2">
                        {t('booking.vocalCoaching')}
                      </h4>
                      <p className="text-gray-400 text-center text-sm">
                        {t('booking.vocalCoachingDesc')}
                      </p>
                    </div>
                    
                    {/* Professioneller Gesang */}
                    <div 
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        serviceType === 'professioneller-gesang' 
                          ? 'border-[#C8A97E] bg-[#2A2D4F]/20' 
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                      onClick={() => handleServiceSelect('professioneller-gesang')}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-[#2A2D4F] flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-[#C8A97E]" />
                        </div>
                      </div>
                      <h4 className="text-xl font-medium text-white text-center mb-2">
                        {t('booking.professionellerGesang')}
                      </h4>
                      <p className="text-gray-400 text-center text-sm">
                        {t('booking.professionellerGesangDesc')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Service-specific Details */}
              {currentStep === 'details' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-white">
                      {serviceType === 'gesangsunterricht' && t('booking.gesangsunterrichtDetails')}
                      {serviceType === 'vocal-coaching' && t('booking.vocalCoachingDetails')}
                      {serviceType === 'professioneller-gesang' && t('booking.professionellerGesangDetails')}
                    </h3>
                    <button 
                      type="button"
                      onClick={goToPreviousStep}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {t('booking.back')}
                    </button>
                  </div>
                  
                  {/* Common fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-gray-300 mb-2">{t('booking.name')}</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.serviceType ? formData.name : ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('booking.email')}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.serviceType ? formData.email : ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('booking.phone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.serviceType ? formData.phone : ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Gesangsunterricht specific fields */}
                  {serviceType === 'gesangsunterricht' && formData.serviceType === 'gesangsunterricht' && (
                    <div className="mb-8">
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">{t('booking.skillLevel')}</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button
                            type="button"
                            className={`py-3 px-4 rounded-md border ${
                              formData.skillLevel === 'beginner' 
                                ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                            onClick={() => setFormData({...formData, skillLevel: 'beginner'})}
                          >
                            {t('booking.beginner')}
                          </button>
                          <button
                            type="button"
                            className={`py-3 px-4 rounded-md border ${
                              formData.skillLevel === 'intermediate' 
                                ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                            onClick={() => setFormData({...formData, skillLevel: 'intermediate'})}
                          >
                            {t('booking.intermediate')}
                          </button>
                          <button
                            type="button"
                            className={`py-3 px-4 rounded-md border ${
                              formData.skillLevel === 'advanced' 
                                ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                            onClick={() => setFormData({...formData, skillLevel: 'advanced'})}
                          >
                            {t('booking.advanced')}
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">{t('booking.goals')}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['expandRange', 'improveStamina', 'learnTechnique', 'preparePerformance'].map((goal) => (
                            <div 
                              key={goal}
                              className={`py-3 px-4 rounded-md border cursor-pointer ${
                                formData.goals.includes(goal) 
                                  ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                  : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                              }`}
                              onClick={() => handleMultiSelectChange('goals', goal)}
                            >
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                  formData.goals.includes(goal) ? 'border-[#C8A97E] bg-[#C8A97E]/20' : 'border-gray-600'
                                }`}>
                                  {formData.goals.includes(goal) && <Check className="w-3 h-3 text-[#C8A97E]" />}
                                </div>
                                <span>{t(`booking.goal_${goal}`)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">{t('booking.lessonType')}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            type="button"
                            className={`py-3 px-4 rounded-md border ${
                              formData.lessonType === 'in-person' 
                                ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                            onClick={() => setFormData({...formData, lessonType: 'in-person'})}
                          >
                            {t('booking.inPerson')}
                          </button>
                          <button
                            type="button"
                            className={`py-3 px-4 rounded-md border ${
                              formData.lessonType === 'online' 
                                ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                            onClick={() => setFormData({...formData, lessonType: 'online'})}
                          >
                            {t('booking.online')}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Vocal Coaching specific fields */}
                  {serviceType === 'vocal-coaching' && formData.serviceType === 'vocal-coaching' && (
                    <div className="mb-8">
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">{t('booking.sessionType')}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            type="button"
                            className={`py-3 px-4 rounded-md border ${
                              formData.sessionType === 'private' 
                                ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                            onClick={() => setFormData({...formData, sessionType: 'private'})}
                          >
                            {t('booking.privateSession')}
                          </button>
                          <button
                            type="button"
                            className={`py-3 px-4 rounded-md border ${
                              formData.sessionType === 'group' 
                                ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                            onClick={() => setFormData({...formData, sessionType: 'group'})}
                          >
                            {t('booking.groupSession')}
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">{t('booking.cvtFocusAreas')}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['jazzPhrasing', 'vocalModes', 'improvisation', 'performance'].map((area) => (
                            <div 
                              key={area}
                              className={`py-3 px-4 rounded-md border cursor-pointer ${
                                formData.cvtFocusAreas.includes(area) 
                                  ? 'bg-[#2A2D4F] border-[#C8A97E] text-white' 
                                  : 'bg-[#1A1A1A] border-gray-800 text-gray-400 hover:border-gray-700'
                              }`}
                              onClick={() => handleMultiSelectChange('cvtFocusAreas', area)}
                            >
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                  formData.cvtFocusAreas.includes(area) ? 'border-[#C8A97E] bg-[#C8A97E]/20' : 'border-gray-600'
                                }`}>
                                  {formData.cvtFocusAreas.includes(area) && <Check className="w-3 h-3 text-[#C8A97E]" />}
                                </div>
                                <span>{t(`booking.cvtArea_${area}`)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">{t('booking.availability')}</label>
                        <input
                          type="text"
                          name="availability"
                          value={formData.availability}
                          onChange={handleInputChange}
                          placeholder={t('booking.availabilityPlaceholder')}
                          className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Professioneller Gesang specific fields */}
                  {serviceType === 'professioneller-gesang' && formData.serviceType === 'professioneller-gesang' && (
                    <div className="mb-8">
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">{t('booking.eventType')}</label>
                        <select
                          name="eventType"
                          value={formData.eventType || ''}
                          onChange={(e) => setFormData({...formData, eventType: e.target.value as any})}
                          className="w-full bg-[#1A1A1A] border border-gray-800 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:border-transparent"
                        >
                          <option value="">{t('booking.selectEventType')}</option>
                          <option value="wedding">{t('booking.wedding')}</option>
                          <option value="corporate">{t('booking.corporate')}</option>
                          <option value="private">{t('booking.privateEvent')}</option>
                          <option value="other">{t('booking.otherEvent')}</option>
                        </select>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2">{t('booking.guestCount')}</label>