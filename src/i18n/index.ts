import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from '@/i18n/locales/en/translation.json'
import frTranslation from '@/i18n/locales/fr/translation.json'
import jaTranslation from '@/i18n/locales/ja/translation.json'
import mgTranslation from '@/i18n/locales/mg/translation.json'

export const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ja', name: '日本語' },
  { code: 'mg', name: 'Malagasy' },
] as const

export type SupportedLanguageCode = (typeof supportedLanguages)[number]['code']

export const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  ja: { translation: jaTranslation },
  mg: { translation: mgTranslation },
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'ja', 'mg'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
