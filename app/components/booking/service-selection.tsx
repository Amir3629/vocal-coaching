"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mic, MusicIcon, Calendar } from 'lucide-react'

// Service types
type ServiceType = 'gesangsunterricht' | 'vocal-coaching' | 'professioneller-gesang' | null

interface ServiceSelectionProps {
  selectedService: ServiceType
  onServiceSelect: (service: ServiceType) => void
}

export default function ServiceSelection({ selectedService, onServiceSelect }: ServiceSelectionProps) {
  const { t } = useTranslation()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold text-white mb-6">{t('booking.chooseService', 'Choose a Service')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gesangsunterricht */}
        <div 
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            selectedService === 'gesangsunterricht' 
              ? 'border-[#C8A97E] bg-[#2A2D4F]/20' 
              : 'border-gray-800 hover:border-gray-700'
          }`}
          onClick={() => onServiceSelect('gesangsunterricht')}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#2A2D4F] flex items-center justify-center">
              <Mic className="w-8 h-8 text-[#C8A97E]" />
            </div>
          </div>
          <h4 className="text-xl font-medium text-white text-center mb-2">
            {t('booking.gesangsunterricht', 'Gesangsunterricht')}
          </h4>
          <p className="text-gray-400 text-center text-sm">
            {t('booking.gesangsunterrichtDesc', 'Individueller Gesangsunterricht für alle Niveaus')}
          </p>
        </div>
        
        {/* Vocal Coaching */}
        <div 
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            selectedService === 'vocal-coaching' 
              ? 'border-[#C8A97E] bg-[#2A2D4F]/20' 
              : 'border-gray-800 hover:border-gray-700'
          }`}
          onClick={() => onServiceSelect('vocal-coaching')}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#2A2D4F] flex items-center justify-center">
              <MusicIcon className="w-8 h-8 text-[#C8A97E]" />
            </div>
          </div>
          <h4 className="text-xl font-medium text-white text-center mb-2">
            {t('booking.vocalCoaching', 'Vocal Coaching (CVT)')}
          </h4>
          <p className="text-gray-400 text-center text-sm">
            {t('booking.vocalCoachingDesc', 'Professionelles Coaching mit Complete Vocal Technique')}
          </p>
        </div>
        
        {/* Professioneller Gesang */}
        <div 
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
            selectedService === 'professioneller-gesang' 
              ? 'border-[#C8A97E] bg-[#2A2D4F]/20' 
              : 'border-gray-800 hover:border-gray-700'
          }`}
          onClick={() => onServiceSelect('professioneller-gesang')}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#2A2D4F] flex items-center justify-center">
              <Calendar className="w-8 h-8 text-[#C8A97E]" />
            </div>
          </div>
          <h4 className="text-xl font-medium text-white text-center mb-2">
            {t('booking.professionellerGesang', 'Professioneller Gesang')}
          </h4>
          <p className="text-gray-400 text-center text-sm">
            {t('booking.professionellerGesangDesc', 'Buchung für Events, Hochzeiten und Firmenveranstaltungen')}
          </p>
        </div>
      </div>
    </motion.div>
  )
} 