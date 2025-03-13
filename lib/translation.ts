import { create } from 'zustand'
import { useState, useEffect } from 'react'

interface TranslationState {
  currentLanguage: 'de' | 'en'
  isTranslating: boolean
  setLanguage: (lang: 'de' | 'en') => void
  setIsTranslating: (state: boolean) => void
}

export const useTranslation = create<TranslationState>((set) => ({
  currentLanguage: 'de',
  isTranslating: false,
  setLanguage: (lang) => set({ currentLanguage: lang }),
  setIsTranslating: (state) => set({ isTranslating: state })
}))

const DEEPL_API_KEY = '3a52f5c8-1967-43a4-b037-790934c51c82:fx'

export async function translateText(text: string, targetLang: 'DE' | 'EN'): Promise<string> {
  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang,
      }),
    })

    if (!response.ok) {
      throw new Error('Translation failed')
    }

    const data = await response.json()
    return data.translations[0].text
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

export function useTranslatedText(text: string): { translatedText: string; isLoading: boolean } {
  const { currentLanguage, isTranslating } = useTranslation()
  const [translatedText, setTranslatedText] = useState(text)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function performTranslation() {
      if (currentLanguage === 'en') {
        setIsLoading(true)
        const translated = await translateText(text, 'EN')
        if (isMounted) {
          setTranslatedText(translated)
          setIsLoading(false)
        }
      } else {
        if (isMounted) {
          setTranslatedText(text)
          setIsLoading(false)
        }
      }
    }

    performTranslation()

    return () => {
      isMounted = false
    }
  }, [text, currentLanguage])

  return { translatedText, isLoading }
} 