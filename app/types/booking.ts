export type ServiceType = 'vocal-coaching' | 'gesangsunterricht' | 'professioneller-gesang';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  [key: string]: any; // For service-specific fields
} 