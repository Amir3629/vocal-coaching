"use client"

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ProgressBar from './progress-bar'
import ServiceSelection from './service-selection'
import LiveSingingForm from './live-singing-form'
import VocalCoachingForm from './vocal-coaching-form'
import WorkshopForm from './workshop-form'
import ConfirmationStep from './confirmation-step'
import SubmitButton from './submit-button'
import { useRouter, useSearchParams } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ServiceSelectionStep from './service-selection-step'
import PersonalInfoStep from './personal-info-step'
import ServiceSpecificStep from './service-specific-step'
import LegalDocumentModal from './legal-document-modal'
import { ServiceType, FormData } from '@/app/types/booking'

interface BookingFormProps {
  onClose: () => void;
}

interface Step {
  id: number;
  name: string;
}

export default function BookingForm({ onClose }: BookingFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLegalDocument, setShowLegalDocument] = useState(false)
  const [documentType, setDocumentType] = useState<'terms' | 'privacy'>('terms')
  
  // Initialize form data with empty values
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    termsAccepted: false,
    privacyAccepted: false
  })
  
  const steps: Step[] = [
    { id: 1, name: t('booking.steps.serviceSelection', 'Service Auswahl') },
    { id: 2, name: t('booking.steps.details', 'Details') },
    { id: 3, name: t('booking.steps.confirmation', 'Bestätigung') },
  ]
  
  // Handle service selection from URL parameter
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam && ['gesangsunterricht', 'vocal-coaching', 'professioneller-gesang'].includes(serviceParam)) {
      setSelectedService(serviceParam as ServiceType)
    }
  }, [searchParams])
  
  // Handle service selection
  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service)
    setCurrentStep(2)
  }
  
  // Handle form data changes
  const handleFormChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }
  
  // Go to next step
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  // Go to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      
      // Redirect to success page
      router.push('/booking/success')
    }, 1500)
  }
  
  const handleLegalDocumentClick = (type: 'terms' | 'privacy') => {
    setDocumentType(type)
    setShowLegalDocument(true)
  }
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelectionStep
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
          />
        )
      case 2:
        return (
          <ServiceSpecificStep
            serviceType={selectedService!}
            formData={formData}
            onFormDataChange={handleFormChange}
          />
        )
      case 3:
        return (
          <ConfirmationStep
            formData={formData}
            onFormDataChange={handleFormChange}
            onSubmit={handleSubmit}
            onLegalDocumentClick={handleLegalDocumentClick}
          />
        )
      default:
        return null
    }
  }
  
  // Check if the current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!selectedService
      case 2:
        // Basic validation for service-specific forms
        if (selectedService === 'professioneller-gesang') {
          return !!formData.eventType && !!formData.eventDate
        } else if (selectedService === 'vocal-coaching') {
          return !!formData.sessionType && !!formData.skillLevel
        } else if (selectedService === 'gesangsunterricht') {
          return !!formData.workshopTheme && !!formData.groupSize
        }
        return false
      case 3:
        return formData.termsAccepted && formData.privacyAccepted
      default:
        return false
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1A1A1A] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {t('booking.title', 'Buchungsanfrage')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {/* Progress Steps */}
            <div className="mb-8">
              <nav aria-label="Progress">
                <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                  {steps.map((step) => (
                    <li key={step.id} className="md:flex-1">
                      <div
                        className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                          currentStep >= step.id
                            ? 'border-[#C8A97E]'
                            : 'border-gray-700'
                        }`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            currentStep >= step.id
                              ? 'text-[#C8A97E]'
                              : 'text-gray-500'
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Form Steps */}
            <div className="space-y-6">
              {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A97E] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('booking.back', 'Zurück')}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#C8A97E] hover:bg-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C8A97E] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === steps.length
                  ? t('booking.submit', 'Absenden')
                  : t('booking.next', 'Weiter')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <LegalDocumentModal
        isOpen={showLegalDocument}
        onClose={() => setShowLegalDocument(false)}
        documentType={documentType}
      />
    </div>
  )
} 