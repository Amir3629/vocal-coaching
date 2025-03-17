// Service types
export type ServiceType = 'gesangsunterricht' | 'vocal-coaching' | 'professioneller-gesang' | null;
export type FormStep = 'service' | 'details' | 'confirm';

// Form data interface
export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  // Vocal Coaching specific fields
  sessionType?: '1:1' | 'group' | 'online';
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  focusArea?: string[];
  // Workshop specific fields
  workshopTheme?: string;
  groupSize?: string;
  preferredDates?: string[];
  workshopDuration?: string;
  // Live Singing specific fields
  eventType?: 'wedding' | 'corporate' | 'private' | 'other';
  eventDate?: string;
  guestCount?: string;
  musicPreferences?: string[];
  jazzStandards?: string;
  // Common fields
  preferredDate?: string;
  preferredTime?: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

// Props interfaces
export interface BookingFormProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface ServiceSelectionProps {
  selectedService: ServiceType;
  onSelect: (service: ServiceType) => void;
}

export interface VocalCoachingFormProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export interface WorkshopFormProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export interface LiveSingingFormProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

export interface ConfirmationStepProps {
  formData: FormData;
  serviceType: ServiceType;
  onChange: (data: Partial<FormData>) => void;
} 