import { create } from 'zustand'
import { useState, useEffect } from 'react'
import { persist } from 'zustand/middleware'

interface TranslationState {
  currentLanguage: 'de' | 'en'
  isTranslating: boolean
  cache: Record<string, { en: string; timestamp: number }>
  setLanguage: (lang: 'de' | 'en') => void
  setIsTranslating: (state: boolean) => void
  addToCache: (key: string, translation: string) => void
}

// Cache duration: 7 days
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000

export const useTranslation = create<TranslationState>()(
  persist(
    (set) => ({
      currentLanguage: 'de',
      isTranslating: false,
      cache: {},
      setLanguage: (lang) => set({ currentLanguage: lang }),
      setIsTranslating: (state) => set({ isTranslating: state }),
      addToCache: (key, translation) => 
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: { en: translation, timestamp: Date.now() }
          }
        }))
    }),
    {
      name: 'translation-storage'
    }
  )
)

const DEEPL_API_KEY = process.env.NEXT_PUBLIC_DEEPL_API_KEY || '3a52f5c8-1967-43a4-b037-790934c51c82:fx'
let monthlyCharCount = 0
const MONTHLY_CHAR_LIMIT = 500000

export async function translateText(text: string, targetLang: 'DE' | 'EN'): Promise<string> {
  const { cache, addToCache } = useTranslation.getState()
  
  // If translating to German, return original text
  if (targetLang === 'DE') return text

  // Check cache first
  const cachedTranslation = cache[text]
  if (cachedTranslation && Date.now() - cachedTranslation.timestamp < CACHE_DURATION) {
    return cachedTranslation.en
  }

  // Check character limit
  if (monthlyCharCount + text.length > MONTHLY_CHAR_LIMIT) {
    console.warn('Monthly character limit approaching')
    return text
  }

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
        formality: 'more'
      }),
    })

    if (!response.ok) {
      throw new Error('Translation failed')
    }

    const data = await response.json()
    const translation = data.translations[0].text

    // Update character count
    monthlyCharCount += text.length

    // Cache the translation
    addToCache(text, translation)

    return translation
  } catch (error) {
    console.error('Translation error:', error)
    return text
  }
}

export function useTranslatedText(text: string) {
  const { currentLanguage, isTranslating, setIsTranslating } = useTranslation()
  const [translatedText, setTranslatedText] = useState(text)

  useEffect(() => {
    let isMounted = true

    async function performTranslation() {
      if (currentLanguage === 'de') {
        setTranslatedText(text)
        return
      }

      setIsTranslating(true)
      const translation = await translateText(text, 'EN')
      
      if (isMounted) {
        setTranslatedText(translation)
        setIsTranslating(false)
      }
    }

    performTranslation()

    return () => {
      isMounted = false
    }
  }, [text, currentLanguage, setIsTranslating])

  return {
    translatedText,
    isLoading: isTranslating
  }
} 