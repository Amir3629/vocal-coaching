"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'

// Form step type
type FormStep = 'service' | 'details' | 'confirm'

interface ProgressBarProps {
  currentStep: FormStep
  onClose?: () => void
}

export default function ProgressBar({ currentStep, onClose }: ProgressBarProps) {
  const { t } = useTranslation()
  
  return (
    <div className="max-w-4xl mx-auto mb-6 relative">
      {/* Close button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 text-gray-400 hover:text-white"
          aria-label="Close booking form"
        >
          <X size={24} />
        </button>
      )}
      
      <div className="flex justify-between items-center">
        {/* Step 1: Service */}
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
            currentStep === 'service' 
              ? 'bg-[#C8A97E] text-black' 
              : 'bg-[#2A2D4F] text-white'
          }`}>
            <span className="font-semibold">1</span>
          </div>
          <span className={`text-sm ${
            currentStep === 'service' ? 'text-[#C8A97E]' : 'text-gray-400'
          }`}>
            {t('booking.dienst', 'Dienst')}
          </span>
        </div>
        
        {/* Connector */}
        <div className="flex-1 h-0.5 mx-2 bg-gray-800">
          <motion.div 
            className="h-full bg-[#C8A97E]"
            initial={{ width: '0%' }}
            animate={{ width: currentStep === 'service' ? '0%' : currentStep === 'details' ? '50%' : '100%' }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Step 2: Date */}
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
            currentStep === 'details' 
              ? 'bg-[#C8A97E] text-black' 
              : currentStep === 'confirm' 
                ? 'bg-[#2A2D4F] text-white' 
                : 'bg-[#1A1A1A] text-gray-500'
          }`}>
            <span className="font-semibold">2</span>
          </div>
          <span className={`text-sm ${
            currentStep === 'details' ? 'text-[#C8A97E]' : 'text-gray-400'
          }`}>
            {t('booking.datum', 'Datum')}
          </span>
        </div>
        
        {/* Connector */}
        <div className="flex-1 h-0.5 mx-2 bg-gray-800">
          <motion.div 
            className="h-full bg-[#C8A97E]"
            initial={{ width: '0%' }}
            animate={{ width: currentStep === 'confirm' ? '100%' : '0%' }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Step 3: Details */}
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
            currentStep === 'confirm' 
              ? 'bg-[#C8A97E] text-black' 
              : 'bg-[#1A1A1A] text-gray-500'
          }`}>
            <span className="font-semibold">3</span>
          </div>
          <span className={`text-sm ${
            currentStep === 'confirm' ? 'text-[#C8A97E]' : 'text-gray-400'
          }`}>
            {t('booking.details', 'Details')}
          </span>
        </div>
      </div>
    </div>
  )
} 