// Mock implementation of i18next

const i18next = {
  language: 'de',
  t: (key: string, options?: any) => key,
  changeLanguage: (lng: string) => Promise.resolve(lng),
  on: (event: string, callback: Function) => {
    // Mock implementation
    return i18next
  },
  use: (plugin: any) => {
    // Mock implementation
    return i18next
  },
  init: (config: any) => {
    // Mock implementation
    return Promise.resolve(i18next)
  },
  // Add other methods as needed
  createInstance: () => i18next,
  exists: () => true,
  getFixedT: () => ((key: string) => key),
  loadNamespaces: () => Promise.resolve(),
  loadLanguages: () => Promise.resolve(),
  dir: () => 'ltr'
}

export default i18next

// Export types
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