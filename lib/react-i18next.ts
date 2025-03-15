// Mock implementation of react-i18next
import React from 'react'

// Mock useTranslation hook
export function useTranslation() {
  return {
    t: (key: string, options?: any) => key,
    i18n: {
      language: 'de',
      changeLanguage: (lng: string) => Promise.resolve(lng)
    },
    ready: true
  }
}

// Mock Trans component
export function Trans({ i18nKey, children }: { i18nKey: string, children?: React.ReactNode }) {
  return <>{children || i18nKey}</>
}

// Mock withTranslation HOC
export function withTranslation() {
  return function(Component: React.ComponentType<any>) {
    return function WrappedComponent(props: any) {
      return <Component t={(key: string) => key} i18n={{}} {...props} />
    }
  }
}

// Mock initReactI18next
export const initReactI18next = {
  type: 'i18next',
  init: () => {}
}

// Mock I18nextProvider
export function I18nextProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
} 