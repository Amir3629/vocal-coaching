"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mic, Music, Calendar, Check } from 'lucide-react'

// Service types
type ServiceType = 'gesangsunterricht' | 'vocal-coaching' | 'professioneller-gesang' | null

interface ServiceSelectionProps {
  selectedService: ServiceType
  onServiceSelect: (service: ServiceType) => void
}

export default function ServiceSelection({ selectedService, onServiceSelect }: ServiceSelectionProps) {
  const { t } = useTranslation()
  
  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.2
      }
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-semibold text-white">
          {t('booking.chooseService', 'Wählen Sie einen Dienst')}
        </h3>
        <p className="text-gray-400 mt-2">
          {t('booking.chooseServiceDesc', 'Wählen Sie den Dienst, den Sie buchen möchten')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Gesangsunterricht */}
        <motion.div 
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={0}
          className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 transform ${
            selectedService === 'gesangsunterricht' 
              ? 'bg-gradient-to-br from-[#1A1A1A] to-[#222] border-[#C8A97E] shadow-lg shadow-[#C8A97E]/10' 
              : 'bg-gradient-to-br from-[#0A0A0A] to-[#151515] border-gray-800 hover:border-[#C8A97E]/50'
          }`}
          onClick={() => onServiceSelect('gesangsunterricht')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
              <Mic className="w-6 h-6 text-[#C8A97E]" />
            </div>
            {selectedService === 'gesangsunterricht' && (
              <div className="w-6 h-6 rounded-full bg-[#C8A97E] flex items-center justify-center">
                <Check className="w-4 h-4 text-black" />
              </div>
            )}
          </div>
          
          <h4 className="text-xl font-medium text-white mb-1">
            {t('booking.gesangsunterricht', 'Gesangsunterricht')}
          </h4>
          <p className="text-gray-400 text-sm mb-2">
            60 min
          </p>
          
          <p className="text-gray-300 text-sm mb-4">
            {t('booking.gesangsunterrichtDesc', 'Individueller Gesangsunterricht für alle Niveaus. Verbessere deine Technik, erweitere deinen Stimmumfang und entwickle deinen eigenen Stil.')}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.stimmbildung', 'Stimmbildung')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.atemtechnik', 'Atemtechnik')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.interpretation', 'Interpretation')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.buhnenprasenz', 'Bühnenpräsenz')}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Vocal Coaching */}
        <motion.div 
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={1}
          className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 transform ${
            selectedService === 'vocal-coaching' 
              ? 'bg-gradient-to-br from-[#1A1A1A] to-[#222] border-[#C8A97E] shadow-lg shadow-[#C8A97E]/10' 
              : 'bg-gradient-to-br from-[#0A0A0A] to-[#151515] border-gray-800 hover:border-[#C8A97E]/50'
          }`}
          onClick={() => onServiceSelect('vocal-coaching')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
              <Music className="w-6 h-6 text-[#C8A97E]" />
            </div>
            {selectedService === 'vocal-coaching' && (
              <div className="w-6 h-6 rounded-full bg-[#C8A97E] flex items-center justify-center">
                <Check className="w-4 h-4 text-black" />
              </div>
            )}
          </div>
          
          <h4 className="text-xl font-medium text-white mb-1">
            {t('booking.vocalCoaching', 'Vocal Coaching')}
          </h4>
          <p className="text-gray-400 text-sm mb-2">
            60 min
          </p>
          
          <p className="text-gray-300 text-sm mb-4">
            {t('booking.vocalCoachingDesc', 'Professionelles Vocal Coaching mit der Complete Vocal Technique (CVT). Wissenschaftlich fundierte Methode für alle Gesangsstile.')}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.privateLessons', 'Private Lessons')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.onlineCoaching', 'Online Coaching')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.groupLessons', 'Group Lessons')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.cvtMethod', 'CVT Methode')}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Professioneller Gesang */}
        <motion.div 
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={2}
          className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 transform ${
            selectedService === 'professioneller-gesang' 
              ? 'bg-gradient-to-br from-[#1A1A1A] to-[#222] border-[#C8A97E] shadow-lg shadow-[#C8A97E]/10' 
              : 'bg-gradient-to-br from-[#0A0A0A] to-[#151515] border-gray-800 hover:border-[#C8A97E]/50'
          }`}
          onClick={() => onServiceSelect('professioneller-gesang')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#C8A97E]" />
            </div>
            {selectedService === 'professioneller-gesang' && (
              <div className="w-6 h-6 rounded-full bg-[#C8A97E] flex items-center justify-center">
                <Check className="w-4 h-4 text-black" />
              </div>
            )}
          </div>
          
          <h4 className="text-xl font-medium text-white mb-1">
            {t('booking.professionellerGesang', 'Professioneller Gesang')}
          </h4>
          <p className="text-gray-400 text-sm mb-2">
            {t('booking.nachVereinbarung', 'Nach Vereinbarung')}
          </p>
          
          <p className="text-gray-300 text-sm mb-4">
            {t('booking.professionellerGesangDesc', 'Professionelle Gesangsauftritte für Events und Veranstaltungen. Maßgeschneiderte Programme für Hochzeiten, Firmenfeiern und private Anlässe.')}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.liveAuftritte', 'Live-Auftritte')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.hochzeitenFeiern', 'Hochzeiten & Feiern')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.firmenevents', 'Firmenevents')}</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#C8A97E] mr-2"></div>
              <span>{t('booking.massgeschneiderteProgramme', 'Maßgeschneiderte Programme')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 