"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './language-switcher'
import { useTranslation } from 'react-i18next'
import ServiceSelection from './booking/service-selection'
import ProgressBar from './booking/progress-bar'

// Service types
type ServiceType = 'gesangsunterricht' | 'vocal-coaching' | 'professioneller-gesang' | null

// Form step type
type FormStep = 'service' | 'details' | 'confirm'

export default function BookingForm() {
  const { currentLang } = useLanguage()
  const { t } = useTranslation()
  
  // State for current step and service type
  const [currentStep, setCurrentStep] = useState<FormStep>('service')
  const [serviceType, setServiceType] = useState<ServiceType>(null)
  
  // Handle service selection
  const handleServiceSelect = (service: ServiceType) => {
    setServiceType(service)
    setCurrentStep('details')
  }
  
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
          <h2 className="text-3xl font-bold text-white mb-4">{t('booking.title', 'Booking')}</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            {t('booking.subtitle', 'Book your session or event with a few simple steps')}
          </p>
        </motion.div>
        
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />
        
        <div className="max-w-4xl mx-auto bg-[#0A0A0A] rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Step 1: Service Selection */}
            {currentStep === 'service' && (
              <ServiceSelection 
                selectedService={serviceType} 
                onServiceSelect={handleServiceSelect} 
              />
            )}
            
            {/* Step 2: Service Details (placeholder) */}
            {currentStep === 'details' && (
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {t('booking.detailsTitle', 'Service Details')}
                </h3>
                <p className="text-gray-300">
                  {t('booking.comingSoon', 'Service-specific details form coming soon')}
                </p>
                <button
                  onClick={() => setCurrentStep('service')}
                  className="mt-4 px-4 py-2 bg-[#2A2D4F] text-white rounded-md hover:bg-[#3A3D5F] transition-colors"
                >
                  {t('booking.back', 'Back')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}