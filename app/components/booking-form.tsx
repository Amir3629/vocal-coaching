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
        <h2 className="text-3xl font-bold text-center text-white mb-8">Booking Form</h2>
        <p className="text-center text-gray-300 mb-12">Coming soon: A service-specific booking process</p>
      </div>
    </section>
  )
}