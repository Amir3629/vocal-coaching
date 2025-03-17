"use client"

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Calendar, Users, Music, BookOpen, Target, Info, Clock, AlertCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LegalDocumentModal from '../legal-document-modal'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

// Dynamically import legal document contents
const DatenschutzContent = dynamic(
  () => import("@/app/datenschutz/page").catch(() => () => (
    <div className="text-red-500">Failed to load Datenschutz content</div>
  )),
  { loading: () => <p className="text-gray-400">Loading...</p>, ssr: false }
)

const AGBContent = dynamic(
  () => import("@/app/agb/page").catch(() => () => (
    <div className="text-red-500">Failed to load AGB content</div>
  )),
  { loading: () => <p className="text-gray-400">Loading...</p>, ssr: false }
)

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
  jazzStandards?: string;
  
  // Vocal Coaching fields
  sessionType?: '1:1' | 'group' | 'online';
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  focusArea?: string[];
  preferredDate?: string;
  preferredTime?: string;
  
  // Workshop fields
  workshopTheme?: string;
  groupSize?: string;
  preferredDates?: string[];
  workshopDuration?: string;
  
  // Legal
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

interface ConfirmationStepProps {
  formData: FormData;
  serviceType: ServiceType;
  onChange: (data: Partial<FormData>) => void;
}

export default function ConfirmationStep({ formData, serviceType, onChange }: ConfirmationStepProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [showAGB, setShowAGB] = useState(false)
  const [showDatenschutz, setShowDatenschutz] = useState(false)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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
        return t('booking.jazzWorkshop', 'Jazz Workshop');
      case 'vocal-coaching':
        return t('booking.vocalCoachingAndGesang', 'Vocal Coaching & Gesangsunterricht');
      case 'professioneller-gesang':
        return t('booking.liveJazzPerformance', 'Live Jazz Performance');
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
  
  // Get workshop duration
  const getWorkshopDuration = () => {
    switch(formData.workshopDuration) {
      case '2h':
        return t('booking.twoHours', '2 Stunden');
      case '4h':
        return t('booking.fourHours', '4 Stunden');
      case 'full-day':
        return t('booking.fullDay', 'Ganztägig (6-8 Stunden)');
      case 'multi-day':
        return t('booking.multiDay', 'Mehrtägig (nach Vereinbarung)');
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
  
  // Check if all required fields are filled
  const validateForm = () => {
    const missing: string[] = [];
    
    if (!formData.termsAccepted) {
      missing.push(t('booking.termsAndConditions', 'AGB'));
    }
    
    if (!formData.privacyAccepted) {
      missing.push(t('booking.privacyPolicy', 'Datenschutzerklärung'));
    }
    
    setMissingFields(missing);
    return missing.length === 0;
  }
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true)
      setShowSuccessNotification(true)
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        // Redirect to success page
        router.push('/booking/success')
      }, 2000)
    }
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
                {formData.jazzStandards && (
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm">{t('booking.jazzStandards', 'Jazz Standards')}:</p>
                    <p className="text-white">{formData.jazzStandards}</p>
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
                {formData.preferredDate && (
                  <div>
                    <p className="text-gray-400 text-sm">{t('booking.preferredDate', 'Bevorzugtes Datum')}:</p>
                    <p className="text-white">{formatDate(formData.preferredDate)}</p>
                  </div>
                )}
                {formData.preferredTime && (
                  <div>
                    <p className="text-gray-400 text-sm">{t('booking.preferredTime', 'Bevorzugte Uhrzeit')}:</p>
                    <p className="text-white">{formData.preferredTime}</p>
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
                {formData.workshopDuration && (
                  <div>
                    <p className="text-gray-400 text-sm">{t('booking.workshopDuration', 'Workshop-Dauer')}:</p>
                    <p className="text-white">{getWorkshopDuration()}</p>
                  </div>
                )}
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
        {/* Error message for missing fields */}
        <AnimatePresence>
          {missingFields.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 500, damping: 30 } }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-200 text-sm">
                  {t('booking.acceptTermsError', 'Bitte akzeptieren Sie die folgenden Bedingungen:')}
                </p>
                <ul className="list-disc list-inside text-red-300 text-sm mt-1">
                  {missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="space-y-3">
          <div className="flex items-start">
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
              <button 
                type="button"
                onClick={() => setShowAGB(true)}
                className="text-[#C8A97E] hover:underline focus:outline-none"
              >
                {t('booking.termsAndConditions', 'AGB')}
              </button>
              . *
            </label>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacy"
                type="checkbox"
                checked={formData.privacyAccepted || false}
                onChange={(e) => onChange({ privacyAccepted: e.target.checked })}
                className="w-4 h-4 accent-[#C8A97E] focus:ring-[#C8A97E] focus:ring-2"
                required
              />
            </div>
            <label htmlFor="privacy" className="ml-2 text-sm text-gray-300">
              {t('booking.privacyAgreement', 'Ich akzeptiere die ')}
              <button 
                type="button"
                onClick={() => setShowDatenschutz(true)}
                className="text-[#C8A97E] hover:underline focus:outline-none"
              >
                {t('booking.privacyPolicy', 'Datenschutzerklärung')}
              </button>
              . *
            </label>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mt-4">
          <Info className="w-4 h-4 inline-block mr-1 text-[#C8A97E]" />
          {t('booking.confirmationNote', 'Nach dem Absenden der Buchungsanfrage werden wir uns zeitnah mit Ihnen in Verbindung setzen, um die Details zu besprechen und einen Termin zu vereinbaren.')}
        </p>
        
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3 bg-[#C8A97E] text-black font-medium rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('booking.submitting', 'Wird gesendet...')}
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                {t('booking.submitBooking', 'Buchung absenden')}
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccessNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] border border-[#C8A97E] rounded-lg shadow-lg p-4 flex items-center z-50 min-w-[300px]"
          >
            <div className="w-10 h-10 rounded-full bg-[#C8A97E]/20 flex items-center justify-center mr-3">
              <Check className="w-5 h-5 text-[#C8A97E]" />
            </div>
            <div>
              <h4 className="text-white font-medium">
                {t('booking.bookingSuccess', 'Buchung erfolgreich!')}
              </h4>
              <p className="text-gray-400 text-sm">
                {t('booking.bookingSuccessMessage', 'Wir werden uns in Kürze bei Ihnen melden.')}
              </p>
            </div>
            <button
              onClick={() => setShowSuccessNotification(false)}
              className="ml-auto text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Legal Document Modals */}
      <LegalDocumentModal isOpen={showAGB} onClose={() => setShowAGB(false)}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {t('booking.termsAndConditions', 'AGB')}
          </h2>
          <div className="prose prose-invert max-w-none">
            <AGBContent />
          </div>
        </div>
      </LegalDocumentModal>
      
      <LegalDocumentModal isOpen={showDatenschutz} onClose={() => setShowDatenschutz(false)}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {t('booking.privacyPolicy', 'Datenschutzerklärung')}
          </h2>
          <div className="prose prose-invert max-w-none">
            <DatenschutzContent />
          </div>
        </div>
      </LegalDocumentModal>
    </div>
  )
} 