import { useTranslation } from 'react-i18next';
import { ServiceType } from '@/app/types/booking';
import VocalCoachingForm from './vocal-coaching-form';
import GesangsunterrichtForm from './gesangsunterricht-form';
import ProfessionalSingingForm from './professional-singing-form';

interface ServiceSpecificStepProps {
  serviceType: ServiceType;
  formData: any;
  onFormDataChange: (data: any) => void;
}

export default function ServiceSpecificStep({ serviceType, formData, onFormDataChange }: ServiceSpecificStepProps) {
  const { t } = useTranslation();

  const renderServiceForm = () => {
    switch (serviceType) {
      case 'vocal-coaching':
        return (
          <VocalCoachingForm
            formData={formData}
            onFormDataChange={onFormDataChange}
          />
        );
      case 'gesangsunterricht':
        return (
          <GesangsunterrichtForm
            formData={formData}
            onFormDataChange={onFormDataChange}
          />
        );
      case 'professioneller-gesang':
        return (
          <ProfessionalSingingForm
            formData={formData}
            onFormDataChange={onFormDataChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderServiceForm()}
    </div>
  );
} 