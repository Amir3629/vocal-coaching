"use client"

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, Users, Music, Info } from 'lucide-react'

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  eventType?: 'wedding' | 'corporate' | 'private' | 'other';
  eventDate?: string;
  guestCount?: string;
  musicPreferences?: string[];
  jazzStandards?: string;
  termsAccepted: boolean;
}

interface LiveSingingFormProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export default function LiveSingingForm({ formData, onChange }: LiveSingingFormProps) {
  const { t } = useTranslation()
  
  // Handle checkbox changes for music preferences
  const handleMusicPreferenceChange = (preference: string) => {
    const currentPreferences = formData.musicPreferences || []
    
    if (currentPreferences.includes(preference)) {
      // Remove preference if already selected
      onChange({
        musicPreferences: currentPreferences.filter(p => p !== preference)
      })
    } else {
      // Add preference if not already selected
      onChange({
        musicPreferences: [...currentPreferences, preference]
      })
    }
  }
  
  return (
    <div className="py-4 space-y-6 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">
          {t('booking.personalInfo', 'Persönliche Informationen')}
        </h3>
        
        {/* Name, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              {t('booking.name', 'Name')} *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg text-white focus:border-[#C8A97E] focus:outline-none transition-colors"
              placeholder={t('booking.namePlaceholder', 'Ihr vollständiger Name')}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              {t('booking.email', 'E-Mail')} *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg text-white focus:border-[#C8A97E] focus:outline-none transition-colors"
              placeholder={t('booking.emailPlaceholder', 'Ihre E-Mail-Adresse')}
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              {t('booking.phone', 'Telefon')} *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg text-white focus:border-[#C8A97E] focus:outline-none transition-colors"
              placeholder={t('booking.phonePlaceholder', 'Ihre Telefonnummer')}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-6 space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-[#C8A97E]" />
          {t('booking.eventDetails', 'Veranstaltungsdetails')}
        </h3>
        
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('booking.eventType', 'Art der Veranstaltung')} *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => onChange({ eventType: 'wedding' })}
              className={`px-4 py-2 rounded-lg border ${
                formData.eventType === 'wedding'
                  ? 'bg-[#C8A97E]/20 border-[#C8A97E] text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-600'
              } transition-colors text-sm`}
            >
              {t('booking.wedding', 'Hochzeit')}
            </button>
            
            <button
              type="button"
              onClick={() => onChange({ eventType: 'corporate' })}
              className={`px-4 py-2 rounded-lg border ${
                formData.eventType === 'corporate'
                  ? 'bg-[#C8A97E]/20 border-[#C8A97E] text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-600'
              } transition-colors text-sm`}
            >
              {t('booking.corporate', 'Firmenevent')}
            </button>
            
            <button
              type="button"
              onClick={() => onChange({ eventType: 'private' })}
              className={`px-4 py-2 rounded-lg border ${
                formData.eventType === 'private'
                  ? 'bg-[#C8A97E]/20 border-[#C8A97E] text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-600'
              } transition-colors text-sm`}
            >
              {t('booking.private', 'Private Feier')}
            </button>
            
            <button
              type="button"
              onClick={() => onChange({ eventType: 'other' })}
              className={`px-4 py-2 rounded-lg border ${
                formData.eventType === 'other'
                  ? 'bg-[#C8A97E]/20 border-[#C8A97E] text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-600'
              } transition-colors text-sm`}
            >
              {t('booking.other', 'Sonstiges')}
            </button>
          </div>
        </div>
        
        {/* Event Date */}
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300 mb-1">
            {t('booking.eventDate', 'Datum der Veranstaltung')} *
          </label>
          <input
            type="date"
            id="eventDate"
            value={formData.eventDate || ''}
            onChange={(e) => onChange({ eventDate: e.target.value })}
            className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg text-white focus:border-[#C8A97E] focus:outline-none transition-colors"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        {/* Guest Count */}
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <Users className="w-4 h-4 mr-1 text-[#C8A97E]" />
            {t('booking.guestCount', 'Anzahl der Gäste')}
          </label>
          <select
            id="guestCount"
            value={formData.guestCount || ''}
            onChange={(e) => onChange({ guestCount: e.target.value })}
            className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg text-white focus:border-[#C8A97E] focus:outline-none transition-colors appearance-none"
          >
            <option value="">{t('booking.selectOption', 'Bitte wählen')}</option>
            <option value="1-50">1-50</option>
            <option value="51-100">51-100</option>
            <option value="101-150">101-150</option>
            <option value="150+">150+</option>
          </select>
        </div>
        
        {/* Jazz Standards */}
        <div>
          <label htmlFor="jazzStandards" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <Music className="w-4 h-4 mr-1 text-[#C8A97E]" />
            {t('booking.jazzStandards', 'Jazz Standards')}
          </label>
          <textarea
            id="jazzStandards"
            value={formData.jazzStandards || ''}
            onChange={(e) => onChange({ jazzStandards: e.target.value })}
            className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg text-white focus:border-[#C8A97E] focus:outline-none transition-colors min-h-[100px]"
            placeholder={t('booking.jazzStandardsPlaceholder', 'Spezifische Jazz Standards oder Songs, die Sie hören möchten (z.B. "Fly Me To The Moon", "Autumn Leaves", etc.)')}
          />
        </div>
        
        {/* Additional Information */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <Info className="w-4 h-4 mr-1 text-[#C8A97E]" />
            {t('booking.additionalInfo', 'Zusätzliche Informationen')}
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => onChange({ message: e.target.value })}
            className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg text-white focus:border-[#C8A97E] focus:outline-none transition-colors min-h-[100px]"
            placeholder={t('booking.additionalInfoPlaceholder', 'Besondere Wünsche oder Anforderungen')}
          />
        </div>
      </div>
    </div>
  )
} 