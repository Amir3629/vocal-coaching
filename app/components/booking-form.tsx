"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/components/language-switcher'
import { useTranslation } from 'react-i18next'
import { ServiceType, FormStep, FormData, BookingFormProps } from '@/app/components/booking/types'
import ServiceSelection from '@/app/components/booking/service-selection'
import ProgressBar from '@/app/components/booking/progress-bar'
import LiveSingingForm from '@/app/components/booking/live-singing-form'
import VocalCoachingForm from '@/app/components/booking/vocal-coaching-form'
import WorkshopForm from '@/app/components/booking/workshop-form'
import ConfirmationStep from '@/app/components/booking/confirmation-step'
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react'

export default function BookingForm({ isOpen: externalIsOpen, onClose }: BookingFormProps) {
  const { currentLang } = useLanguage()
  const { t } = useTranslation()
  
  // State for showing the booking form
  const [isOpen, setIsOpen] = useState(false)
  
  // State for current step and service type
  const [currentStep, setCurrentStep] = useState<FormStep>('service')
  const [serviceType, setServiceType] = useState<ServiceType>(null)
  
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    termsAccepted: false,
    privacyAccepted: false
  })
  
  // Handle external isOpen prop
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);
  
  // Handle service selection
  const handleServiceSelect = (service: ServiceType) => {
    setServiceType(service)
    setCurrentStep('details')
  }
  
  // Handle form data changes
  const handleFormChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
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
  const goToPrevStep = () => {
    if (currentStep === 'details') {
      setCurrentStep('service')
    } else if (currentStep === 'confirm') {
      setCurrentStep('details')
    }
  }
  
  // Submit form
  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    
    // Show success message and close form
    alert(t('booking.successMessage', 'Buchung erfolgreich eingereicht! Wir werden uns in Kürze bei Ihnen melden.'))
    closeBookingForm()
  }
  
  // Close booking form
  const closeBookingForm = () => {
    setIsOpen(false)
    // Reset form state
    setCurrentStep('service')
    setServiceType(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      termsAccepted: false,
      privacyAccepted: false
    })
    
    // Call external onClose if provided
    if (onClose) {
      onClose();
    }
  }
  
  // Determine if form is valid for current step
  const isCurrentStepValid = () => {
    if (currentStep === 'service') {
      return serviceType !== null
    }
    
    if (currentStep === 'details') {
      // Basic validation for details step
      return formData.name.trim() !== '' && 
             formData.email.trim() !== '' && 
             formData.phone.trim() !== ''
    }
    
    if (currentStep === 'confirm') {
      return formData.termsAccepted
    }
    
    return false
  }
  
  // Render service-specific form based on selected service
  const renderServiceForm = () => {
    switch(serviceType) {
      case 'professioneller-gesang':
        return (
          <LiveSingingForm 
            formData={formData} 
            onChange={handleFormChange} 
          />
        )
      case 'vocal-coaching':
        return (
          <VocalCoachingForm 
            formData={formData} 
            onChange={handleFormChange} 
          />
        )
      case 'gesangsunterricht':
        return (
          <WorkshopForm 
            formData={formData} 
            onChange={handleFormChange} 
          />
        )
      default:
        return null
    }
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-[#121212] border border-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Progress Steps */}
        <div className="bg-[#1A1A1A] p-3 border-b border-gray-800">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 'details' ? 'bg-[#C8A97E] text-black' : 'bg-gray-800 text-gray-400'
              }`}>
                <span className="text-xs font-medium">1</span>
              </div>
              <span className="text-xs mt-1 text-gray-400">{t('booking.service', 'Dienst')}</span>
            </div>
            
            {/* Connector */}
            <div className="w-full max-w-[60px] h-[2px] bg-gray-800 mx-1">
              <div className={`h-full bg-[#C8A97E] transition-all duration-300 ${
                currentStep >= 'details' ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 'details' ? 'bg-[#C8A97E] text-black' : 'bg-gray-800 text-gray-400'
              }`}>
                <span className="text-xs font-medium">2</span>
              </div>
              <span className="text-xs mt-1 text-gray-400">{t('booking.details', 'Details')}</span>
            </div>
            
            {/* Connector */}
            <div className="w-full max-w-[60px] h-[2px] bg-gray-800 mx-1">
              <div className={`h-full bg-[#C8A97E] transition-all duration-300 ${
                currentStep >= 'confirm' ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 'confirm' ? 'bg-[#C8A97E] text-black' : 'bg-gray-800 text-gray-400'
              }`}>
                <span className="text-xs font-medium">3</span>
              </div>
              <span className="text-xs mt-1 text-gray-400">{t('booking.confirmation', 'Bestätigen')}</span>
            </div>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-4">
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #1A1A1A;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #C8A97E;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #B69A6E;
            }
          `}</style>
          
          {/* Service Selection Step */}
          {currentStep === 'service' && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <h2 className="text-xl font-semibold text-white mb-4">
                {t('booking.selectService', 'Wählen Sie einen Dienst')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* ... service cards ... */}
              </div>
            </div>
          )}
          
          {/* Details Step */}
          {currentStep === 'details' && renderServiceForm()}
          
          {/* Confirmation Step */}
          {currentStep === 'confirm' && (
            <ConfirmationStep 
              formData={formData} 
              serviceType={serviceType}
              onChange={handleFormChange}
            />
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="bg-[#1A1A1A] p-3 border-t border-gray-800 flex justify-between">
          {/* Back Button */}
          {currentStep > 'service' && (
            <button
              type="button"
              onClick={goToPrevStep}
              className="px-3 py-1.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors text-sm"
            >
              {t('booking.back', 'Zurück')}
            </button>
          )}
          
          {/* Next Button - Only show on Service and Details steps */}
          {currentStep < 'confirm' && (
            <button
              type="button"
              onClick={goToNextStep}
              disabled={!isCurrentStepValid()}
              className={`px-4 py-1.5 rounded-lg text-sm ${
                isCurrentStepValid() 
                  ? 'bg-[#C8A97E] text-black hover:bg-[#D4AF37]' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              } transition-colors ml-auto`}
            >
              {t('booking.next', 'Weiter')}
            </button>
          )}
          
          {/* Submit Button */}
          {currentStep === 'confirm' && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isCurrentStepValid()}
              className={`px-4 py-1.5 rounded-lg text-sm ${
                isCurrentStepValid()
                  ? 'bg-[#C8A97E] text-black hover:bg-[#D4AF37]'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              } transition-colors ml-auto`}
            >
              {t('booking.submit', 'Absenden')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}