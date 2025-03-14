// Mock implementation of i18n to avoid dependency issues

// Mock i18next
const i18n = {
  language: 'de',
  t: (key: string, options?: any) => key,
  changeLanguage: (lng: string) => Promise.resolve(lng),
  on: (event: string, callback: Function) => {
    // Mock implementation
    return i18n
  },
  use: (plugin: any) => {
    // Mock implementation
    return i18n
  },
  init: (config: any) => {
    // Mock implementation
    return Promise.resolve(i18n)
  }
}

// Mock react-i18next
export const initReactI18next = {
  type: 'i18next',
  init: () => {}
}

// Mock i18next-browser-languagedetector
export default i18n

// Mock LanguageDetector
export const LanguageDetector = {
  type: 'languageDetector',
  init: () => {},
  detect: () => 'de',
  cacheUserLanguage: () => {}
}

// Mock types for compatibility
export type InitOptions = {
  resources: any
  lng: string
  fallbackLng: string
  supportedLngs: string[]
  debug: boolean
  interpolation: {
    escapeValue: boolean
  }
  detection: {
    order: string[]
    lookupQuerystring: string
    lookupLocalStorage: string
    caches: string[]
  }
  react: {
    useSuspense: boolean
  }
}
