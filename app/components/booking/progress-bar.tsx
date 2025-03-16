"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Form step type
type FormStep = 'service' | 'details' | 'confirm'

interface ProgressBarProps {
  currentStep: FormStep
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const { t } = useTranslation()
  
  // Progress percentage based on current step
  const getProgressPercentage = () => {
    switch (currentStep) {
      case 'service': return 33
      case 'details': return 66
      case 'confirm': return 100
      default: return 0
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-[#2A2D4F]">
            {currentStep === 'service' ? t('booking.step1', 'Step 1') : 
             currentStep === 'details' ? t('booking.step2', 'Step 2') : 
             t('booking.step3', 'Step 3')}
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
            {t('booking.serviceStep', 'Service')}
          </div>
          <div className={currentStep === 'details' ? 'text-[#C8A97E] font-medium' : ''}>
            {t('booking.detailsStep', 'Details')}
          </div>
          <div className={currentStep === 'confirm' ? 'text-[#C8A97E] font-medium' : ''}>
            {t('booking.confirmStep', 'Confirm')}
          </div>
        </div>
      </div>
    </div>
  )
} 