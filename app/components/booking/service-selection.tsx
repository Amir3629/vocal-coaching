"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mic, MusicIcon, Calendar, Check } from 'lucide-react'
import Image from 'next/image'

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
      className="py-6"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-white">
          {t('booking.chooseService', 'Dienst')}
        </h3>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#C8A97E] text-black flex items-center justify-center font-semibold mr-2">
            1
          </div>
          <span className="text-white font-medium">
            {t('booking.dienst', 'Dienst')}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Gesangsunterricht */}
        <div 
          className={`p-6 rounded-lg border border-gray-800 cursor-pointer transition-all duration-300 hover:border-[#C8A97E]/50 ${
            selectedService === 'gesangsunterricht' 
              ? 'bg-[#1A1A1A] border-[#C8A97E]' 
              : 'bg-[#0A0A0A]'
          }`}
          onClick={() => onServiceSelect('gesangsunterricht')}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center mr-3">
              <Mic className="w-5 h-5 text-[#C8A97E]" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-white">
                {t('booking.gesangsunterricht', 'Gesangsunterricht')}
              </h4>
              <p className="text-gray-400 text-sm">
                60 min
              </p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4">
            Individueller Gesangsunterricht für alle Niveaus. Verbessere deine Technik, erweitere deinen Stimmumfang und entwickle deinen eigenen Stil.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Stimmbildung</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Atemtechnik</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Interpretation</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Bühnenpräsenz</span>
            </div>
          </div>
        </div>
        
        {/* Vocal Coaching */}
        <div 
          className={`p-6 rounded-lg border border-gray-800 cursor-pointer transition-all duration-300 hover:border-[#C8A97E]/50 ${
            selectedService === 'vocal-coaching' 
              ? 'bg-[#1A1A1A] border-[#C8A97E]' 
              : 'bg-[#0A0A0A]'
          }`}
          onClick={() => onServiceSelect('vocal-coaching')}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center mr-3">
              <MusicIcon className="w-5 h-5 text-[#C8A97E]" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-white">
                {t('booking.vocalCoaching', 'Vocal Coaching')}
              </h4>
              <p className="text-gray-400 text-sm">
                60 min
              </p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4">
            Professionelles Vocal Coaching mit der Complete Vocal Technique (CVT). Wissenschaftlich fundierte Methode für alle Gesangsstile.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Private Lessons</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Online Coaching</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Group Lessons</span>
            </div>
          </div>
        </div>
        
        {/* Professioneller Gesang */}
        <div 
          className={`p-6 rounded-lg border border-gray-800 cursor-pointer transition-all duration-300 hover:border-[#C8A97E]/50 ${
            selectedService === 'professioneller-gesang' 
              ? 'bg-[#1A1A1A] border-[#C8A97E]' 
              : 'bg-[#0A0A0A]'
          }`}
          onClick={() => onServiceSelect('professioneller-gesang')}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-[#C8A97E]" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-white">
                {t('booking.professionellerGesang', 'Professioneller Gesang')}
              </h4>
              <p className="text-gray-400 text-sm">
                Nach Vereinbarung
              </p>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4">
            Professionelle Gesangsauftritte für Events und Veranstaltungen. Maßgeschneiderte Programme für Hochzeiten, Firmenfeiern und private Anlässe.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Live-Auftritte</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Hochzeiten & Feiern</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Firmenevents</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>Maßgeschneiderte Programme</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 