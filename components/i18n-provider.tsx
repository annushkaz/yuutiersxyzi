'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Locale, defaultLocale, getLocaleFromStorage, setLocaleToStorage } from '@/lib/i18n'
import enMessages from '@/messages/en.json'
import esMessages from '@/messages/es.json'

type Messages = typeof enMessages

const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  es: esMessages,
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
  messages: Messages
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLocaleState(getLocaleFromStorage())
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setLocaleToStorage(newLocale)
  }, [])

  const messages = messagesMap[locale]

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const keys = key.split('.')
      let value: unknown = messages

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k]
        } else {
          return key // Return key if translation not found
        }
      }

      if (typeof value !== 'string') return key

      // Replace params like {name} with actual values
      if (params) {
        return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
          return str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue))
        }, value)
      }

      return value
    },
    [messages]
  )

  // Prevent hydration mismatch by rendering default locale until mounted
  const contextValue: I18nContextType = {
    locale: mounted ? locale : defaultLocale,
    setLocale,
    t,
    messages: mounted ? messages : messagesMap[defaultLocale],
  }

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function useTranslation() {
  const { t, locale } = useI18n()
  return { t, locale }
}
