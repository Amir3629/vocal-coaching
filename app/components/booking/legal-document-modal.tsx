import { useTranslation } from 'react-i18next';

interface LegalDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'terms' | 'privacy';
}

export default function LegalDocumentModal({ isOpen, onClose, documentType }: LegalDocumentModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const getDocumentContent = () => {
    if (documentType === 'terms') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">1. Allgemeine Bedingungen</h3>
          <p className="text-gray-300">
            {t('legal.terms.general', 'Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung der Gesangsdienstleistungen von Melvocalcoaching.')}
          </p>
          
          <h3 className="text-lg font-semibold text-white">2. Vertragsschluss</h3>
          <p className="text-gray-300">
            {t('legal.terms.contract', 'Der Vertrag kommt durch die Bestätigung der Buchungsanfrage zustande.')}
          </p>
          
          <h3 className="text-lg font-semibold text-white">3. Preise und Zahlungsbedingungen</h3>
          <p className="text-gray-300">
            {t('legal.terms.pricing', 'Die Preise für die Gesangsdienstleistungen werden im Voraus festgelegt und sind in Euro zu zahlen.')}
          </p>
          
          <h3 className="text-lg font-semibold text-white">4. Stornierung</h3>
          <p className="text-gray-300">
            {t('legal.terms.cancellation', 'Stornierungen sind bis zu 24 Stunden vor der gebuchten Zeit möglich.')}
          </p>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">1. Datenschutz</h3>
          <p className="text-gray-300">
            {t('legal.privacy.dataProtection', 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.')}
          </p>
          
          <h3 className="text-lg font-semibold text-white">2. Datenerhebung</h3>
          <p className="text-gray-300">
            {t('legal.privacy.dataCollection', 'Wir erheben nur die Daten, die für die Durchführung unserer Dienstleistungen notwendig sind.')}
          </p>
          
          <h3 className="text-lg font-semibold text-white">3. Datenverarbeitung</h3>
          <p className="text-gray-300">
            {t('legal.privacy.dataProcessing', 'Ihre Daten werden sicher verarbeitet und nicht an Dritte weitergegeben.')}
          </p>
          
          <h3 className="text-lg font-semibold text-white">4. Ihre Rechte</h3>
          <p className="text-gray-300">
            {t('legal.privacy.yourRights', 'Sie haben das Recht auf Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten.')}
          </p>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-[#1A1A1A] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {documentType === 'terms' 
                ? t('legal.terms.title', 'Allgemeine Geschäftsbedingungen')
                : t('legal.privacy.title', 'Datenschutzerklärung')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {getDocumentContent()}
          </div>
        </div>
      </div>
    </div>
  );
} 