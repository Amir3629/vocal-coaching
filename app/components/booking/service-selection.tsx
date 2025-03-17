"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mic, Music, Calendar, Check } from 'lucide-react'
import { ServiceType, ServiceSelectionProps } from './types'

export default function ServiceSelection({ selectedService, onSelect }: ServiceSelectionProps) {
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
          {t('booking.selectService', 'Wählen Sie einen Dienst')}
        </h3>
        <p className="text-gray-400 mt-2">
          {t('booking.chooseServiceDesc', 'Wählen Sie den Dienst, den Sie buchen möchten')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Vocal Coaching Card */}
        <button
          onClick={() => onSelect('vocal-coaching')}
          className="group relative bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 hover:border-[#C8A97E] transition-all duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#C8A97E] bg-opacity-10 flex items-center justify-center mb-3 group-hover:bg-opacity-20 transition-all duration-300">
              <svg className="w-6 h-6 text-[#C8A97E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {t('booking.vocalCoaching', 'Vocal Coaching')}
            </h3>
            <p className="text-sm text-gray-400">
              {t('booking.vocalCoachingDesc', 'Professionelle Gesangsausbildung für Anfänger und Fortgeschrittene')}
            </p>
          </div>
        </button>

        {/* Live Singing Card */}
        <button
          onClick={() => onSelect('professioneller-gesang')}
          className="group relative bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 hover:border-[#C8A97E] transition-all duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#C8A97E] bg-opacity-10 flex items-center justify-center mb-3 group-hover:bg-opacity-20 transition-all duration-300">
              <svg className="w-6 h-6 text-[#C8A97E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {t('booking.liveSinging', 'Live Singing')}
            </h3>
            <p className="text-sm text-gray-400">
              {t('booking.liveSingingDesc', 'Professioneller Gesang für Events und Auftritte')}
            </p>
          </div>
        </button>

        {/* Workshop Card */}
        <button
          onClick={() => onSelect('gesangsunterricht')}
          className="group relative bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 hover:border-[#C8A97E] transition-all duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#C8A97E] bg-opacity-10 flex items-center justify-center mb-3 group-hover:bg-opacity-20 transition-all duration-300">
              <svg className="w-6 h-6 text-[#C8A97E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {t('booking.workshop', 'Workshop')}
            </h3>
            <p className="text-sm text-gray-400">
              {t('booking.workshopDesc', 'Intensive Gesangsworkshops für Gruppen')}
            </p>
          </div>
        </button>
      </div>
    </motion.div>
  )
} 