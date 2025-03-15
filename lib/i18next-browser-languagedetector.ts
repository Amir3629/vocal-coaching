// Mock implementation of i18next-browser-languagedetector

// Mock LanguageDetector
const LanguageDetector = function() {
  return {
    type: 'languageDetector',
    init: () => {},
    detect: () => 'de',
    cacheUserLanguage: () => {}
  }
}

export default LanguageDetector 