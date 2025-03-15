declare module 'i18next' {
  const content: any;
  export default content;
  export type InitOptions = any;
}

declare module 'react-i18next' {
  export const useTranslation: () => {
    t: (key: string, options?: any) => string;
    i18n: {
      language: string;
      changeLanguage: (lng: string) => Promise<string>;
    };
    ready: boolean;
  };
  export const Trans: React.FC<{ i18nKey: string; children?: React.ReactNode }>;
  export const withTranslation: () => (Component: React.ComponentType<any>) => React.FC<any>;
  export const initReactI18next: { type: string; init: () => void };
  export const I18nextProvider: React.FC<{ children: React.ReactNode }>;
}

declare module 'i18next-browser-languagedetector' {
  const content: any;
  export default content;
} 