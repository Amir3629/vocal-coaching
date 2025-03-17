import { useTranslation } from 'react-i18next';
import VocalCoachingForm from './vocal-coaching-form';
import WorkshopForm from './workshop-form';
import LiveSingingForm from './live-singing-form';

interface ServiceSpecificStepProps {
  serviceType: string | null;
  formData: any;
  onChange: (data: any) => void;
}

export default function ServiceSpecificStep({ serviceType, formData, onChange }: ServiceSpecificStepProps) {
  const { t } = useTranslation();

  if (!serviceType) {
    return null;
  }

  switch (serviceType) {
    case 'vocal-coaching':
      return <VocalCoachingForm formData={formData} onChange={onChange} />;
    case 'gesangsunterricht':
      return <WorkshopForm formData={formData} onChange={onChange} />;
    case 'professioneller-gesang':
      return <LiveSingingForm formData={formData} onChange={onChange} />;
    default:
      return null;
  }
} 