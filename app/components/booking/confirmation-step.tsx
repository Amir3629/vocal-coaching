"use client"

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Calendar, Users, Music, BookOpen, Target, Info } from 'lucide-react'

// Service types
type ServiceType = 'gesangsunterricht' | 'vocal-coaching' | 'professioneller-gesang' | null

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  
  // Live Singing fields
  eventType?: 'wedding' | 'corporate' | 'private' | 'other';
  eventDate?: string;
  guestCount?: string;
  musicPreferences?: string[];
  
  // Vocal Coaching fields
  sessionType?: '1:1' | 'group' | 'online';
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  focusArea?: string[];
  
  // Workshop fields
  workshopTheme?: string;
  groupSize?: string;
  preferredDates?: string[];
  
  // Legal
  termsAccepted: boolean;
}

interface ConfirmationStepProps {
  formData: FormData;
  serviceType: ServiceType;
  onChange: (data: Partial<FormData>) => void;
}

export default function ConfirmationStep({ formData, serviceType, onChange }: ConfirmationStepProps) {
  const { t } = useTranslation()
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  }
  
  // Get service name based on type
  const getServiceName = () => {
    switch(serviceType) {
      case 'gesangsunterricht':
        return t('booking.gesangsunterricht', 'Gesangsunterricht');
      case 'vocal-coaching':
        return t('booking.vocalCoaching', 'Vocal Coaching');
      case 'professioneller-gesang':
        return t('booking.professionellerGesang', 'Professioneller Gesang');
      default:
        return '';
    }
  }
  
  // Get event type name
  const getEventTypeName = () => {
    switch(formData.eventType) {
      case 'wedding':
        return t('booking.wedding', 'Hochzeit');
      case 'corporate':
        return t('booking.corporate', 'Firmenevent');
      case 'private':
        return t('booking.private', 'Private Feier');
      case 'other':
        return t('booking.other', 'Sonstiges');
      default:
        return '';
    }
  }
  
  // Get session type name
  const getSessionTypeName = () => {
    switch(formData.sessionType) {
      case '1:1':
        return t('booking.privateSession', 'Einzelunterricht');
      case 'group':
        return t('booking.groupSession', 'Gruppenunterricht');
      case 'online':
        return t('booking.onlineSession', 'Online Coaching');
      default:
        return '';
    }
  }
  
  // Get skill level name
  const getSkillLevelName = () => {
    switch(formData.skillLevel) {
      case 'beginner':
        return t('booking.beginner', 'Anfänger');
      case 'intermediate':
        return t('booking.intermediate', 'Fortgeschritten');
      case 'advanced':
        return t('booking.advanced', 'Profi');
      default:
        return '';
    }
  }
  
  // Get workshop theme name
  const getWorkshopThemeName = () => {
    switch(formData.workshopTheme) {
      case 'jazz-improv':
        return t('booking.jazzImprov', 'Jazz Improvisation');
      case 'vocal-health':
        return t('booking.vocalHealth', 'Stimmgesundheit');
      case 'performance':
        return t('booking.performance', 'Performance Skills');
      default:
        return '';
    }
  }
  
  // Get preferred dates formatted
  const getPreferredDatesFormatted = () => {
    if (!formData.preferredDates || formData.preferredDates.length === 0) return '';
    
    const dateMap: Record<string, string> = {
      'weekday-morning': t('booking.weekdayMorning', 'Wochentags vormittags'),
      'weekday-afternoon': t('booking.weekdayAfternoon', 'Wochentags nachmittags'),
      'weekday-evening': t('booking.weekdayEvening', 'Wochentags abends'),
      'weekend-morning': t('booking.weekendMorning', 'Wochenende vormittags'),
      'weekend-afternoon': t('booking.weekendAfternoon', 'Wochenende nachmittags'),
      'weekend-evening': t('booking.weekendEvening', 'Wochenende abends')
    };
    
    return formData.preferredDates.map(d => dateMap[d] || d).join(', ');
  }
  
  return (
    <div className="py-4 space-y-6 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">
          {t('booking.bookingSummary', 'Buchungsübersicht')}
        </h3>
        
        <div className="bg-[#1A1A1A] rounded-lg p-5 border border-gray-800">
          {/* Service Type */}
          <div className="mb-4 pb-3 border-b border-gray-800">
            <h4 className="text-lg font-medium text-white mb-2">
              {t('booking.selectedService', 'Ausgewählter Dienst')}
            </h4>
            <p className="text-[#C8A97E]">{getServiceName()}</p>
          </div>
          
          {/* Personal Information */}
          <div className="mb-4 pb-3 border-b border-gray-800">
            <h4 className="text-lg font-medium text-white mb-2">
              {t('booking.personalInfo', 'Persönliche Informationen')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <p className="text-gray-400 text-sm">{t('booking.name', 'Name')}:</p>
                <p className="text-white">{formData.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">{t('booking.email', 'E-Mail')}:</p>
                <p className="text-white">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">{t('booking.phone', 'Telefon')}:</p>
                <p className="text-white">{formData.phone}</p>
              </div>
            </div>
          </div>
          
          {/* Service-specific details */}
          {serviceType === 'professioneller-gesang' && (
            <div className="mb-4 pb-3 border-b border-gray-800">
              <h4 className="text-lg font-medium text-white mb-2">
                {t('booking.eventDetails', 'Veranstaltungsdetails')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-400 text-sm">{t('booking.eventType', 'Art der Veranstaltung')}:</p>
                  <p className="text-white">{getEventTypeName()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('booking.eventDate', 'Datum der Veranstaltung')}:</p>
                  <p className="text-white">{formatDate(formData.eventDate)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('booking.guestCount', 'Anzahl der Gäste')}:</p>
                  <p className="text-white">{formData.guestCount}</p>
                </div>
                {formData.musicPreferences && formData.musicPreferences.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm">{t('booking.musicPreferences', 'Musikvorlieben')}:</p>
                    <p className="text-white">{formData.musicPreferences.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {serviceType === 'vocal-coaching' && (
            <div className="mb-4 pb-3 border-b border-gray-800">
              <h4 className="text-lg font-medium text-white mb-2">
                {t('booking.sessionDetails', 'Session Details')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-400 text-sm">{t('booking.sessionType', 'Art der Session')}:</p>
                  <p className="text-white">{getSessionTypeName()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('booking.skillLevel', 'Erfahrungslevel')}:</p>
                  <p className="text-white">{getSkillLevelName()}</p>
                </div>
                {formData.focusArea && formData.focusArea.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm">{t('booking.focusAreas', 'Schwerpunkte')}:</p>
                    <p className="text-white">{formData.focusArea.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {serviceType === 'gesangsunterricht' && (
            <div className="mb-4 pb-3 border-b border-gray-800">
              <h4 className="text-lg font-medium text-white mb-2">
                {t('booking.workshopDetails', 'Workshop Details')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-400 text-sm">{t('booking.workshopTheme', 'Workshop-Thema')}:</p>
                  <p className="text-white">{getWorkshopThemeName()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{t('booking.groupSize', 'Gruppengröße')}:</p>
                  <p className="text-white">{formData.groupSize}</p>
                </div>
                {formData.preferredDates && formData.preferredDates.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm">{t('booking.preferredDates', 'Bevorzugte Termine')}:</p>
                    <p className="text-white">{getPreferredDatesFormatted()}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Additional Information */}
          {formData.message && (
            <div className="mb-4 pb-3 border-b border-gray-800">
              <h4 className="text-lg font-medium text-white mb-2">
                {t('booking.additionalInfo', 'Zusätzliche Informationen')}
              </h4>
              <p className="text-white whitespace-pre-line">{formData.message}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Terms and Conditions */}
      <div className="pt-4">
        <div className="flex items-start mb-4">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => onChange({ termsAccepted: e.target.checked })}
              className="w-4 h-4 accent-[#C8A97E] focus:ring-[#C8A97E] focus:ring-2"
              required
            />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
            {t('booking.termsAgreement', 'Ich akzeptiere die ')}
            <a href="/agb" target="_blank" className="text-[#C8A97E] hover:underline">
              {t('booking.termsAndConditions', 'AGB')}
            </a>
            {' '}{t('booking.andThe', 'und die ')}
            <a href="/datenschutz" target="_blank" className="text-[#C8A97E] hover:underline">
              {t('booking.privacyPolicy', 'Datenschutzerklärung')}
            </a>
            . *
          </label>
        </div>
        
        <p className="text-sm text-gray-400 mt-4">
          <Info className="w-4 h-4 inline-block mr-1 text-[#C8A97E]" />
          {t('booking.confirmationNote', 'Nach dem Absenden der Buchungsanfrage werden wir uns zeitnah mit Ihnen in Verbindung setzen, um die Details zu besprechen und einen Termin zu vereinbaren.')}
        </p>
      </div>
    </div>
  )
} 