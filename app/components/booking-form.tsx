"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  
  // State for showing the booking form
  const [isOpen, setIsOpen] = useState(false)
  
  // State for current step and service type
  const [currentStep, setCurrentStep] = useState<FormStep>('service')
  const [serviceType, setServiceType] = useState<ServiceType>(null)
  
  // Handle service selection
  const handleServiceSelect = (service: ServiceType) => {
    setServiceType(service)
    setCurrentStep('details')
  }
  
  // Open booking form
  const openBookingForm = () => {
    setIsOpen(true)
    // Reset form state
    setCurrentStep('service')
    setServiceType(null)
  }
  
  // Close booking form
  const closeBookingForm = () => {
    setIsOpen(false)
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
          <h2 className="text-3xl font-bold text-white mb-4">{t('booking.title', 'Buchung')}</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            {t('booking.subtitle', 'Buchen Sie Ihre Gesangsstunde oder Ihren Event mit wenigen Klicks')}
          </p>
          
          <button
            onClick={openBookingForm}
            className="mt-8 px-8 py-3 bg-[#C8A97E] text-black font-medium rounded-md hover:bg-[#D4AF37] transition-colors"
          >
            {t('booking.bookNow', 'Jetzt buchen')}
          </button>
        </motion.div>
        
        {/* Booking Form Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeBookingForm}
            >
              <motion.div
                className="w-full max-w-4xl bg-[#0A0A0A] rounded-lg shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">{t('booking.title', 'Buchung')}</h2>
                  
                  {/* Progress Bar */}
                  <ProgressBar currentStep={currentStep} onClose={closeBookingForm} />
                  
                  {/* Step 1: Service Selection */}
                  {currentStep === 'service' && (
                    <ServiceSelection 
                      selectedService={serviceType} 
                      onServiceSelect={handleServiceSelect} 
                    />
                  )}
                  
                  {/* Step 2: Date Selection (placeholder) */}
                  {currentStep === 'details' && (
                    <div className="py-6">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-semibold text-white">
                          {t('booking.selectDate', 'Datum wählen')}
                        </h3>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#C8A97E] text-black flex items-center justify-center font-semibold mr-2">
                            2
                          </div>
                          <span className="text-white font-medium">
                            {t('booking.datum', 'Datum')}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6">
                        {t('booking.dateSelectionComingSoon', 'Terminauswahl wird in Kürze verfügbar sein')}
                      </p>
                      
                      <div className="flex justify-between">
                        <button
                          onClick={() => setCurrentStep('service')}
                          className="px-6 py-2 border border-gray-700 text-gray-300 rounded-md hover:border-gray-500 transition-colors"
                        >
                          {t('booking.back', 'Zurück')}
                        </button>
                        
                        <button
                          onClick={() => setCurrentStep('confirm')}
                          className="px-6 py-2 bg-[#C8A97E] text-black font-medium rounded-md hover:bg-[#D4AF37] transition-colors"
                        >
                          {t('booking.continue', 'Weiter')}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Details (placeholder) */}
                  {currentStep === 'confirm' && (
                    <div className="py-6">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-semibold text-white">
                          {t('booking.confirmDetails', 'Details bestätigen')}
                        </h3>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#C8A97E] text-black flex items-center justify-center font-semibold mr-2">
                            3
                          </div>
                          <span className="text-white font-medium">
                            {t('booking.details', 'Details')}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6">
                        {t('booking.detailsComingSoon', 'Detailseingabe wird in Kürze verfügbar sein')}
                      </p>
                      
                      <div className="flex justify-between">
                        <button
                          onClick={() => setCurrentStep('details')}
                          className="px-6 py-2 border border-gray-700 text-gray-300 rounded-md hover:border-gray-500 transition-colors"
                        >
                          {t('booking.back', 'Zurück')}
                        </button>
                        
                        <button
                          onClick={closeBookingForm}
                          className="px-6 py-2 bg-[#C8A97E] text-black font-medium rounded-md hover:bg-[#D4AF37] transition-colors"
                        >
                          {t('booking.finish', 'Abschließen')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}