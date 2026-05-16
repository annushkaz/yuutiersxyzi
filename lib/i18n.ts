export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function getLocaleFromStorage(): Locale {
  if (typeof window === 'undefined') return defaultLocale
  const stored = localStorage.getItem('locale')
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale
  }
  // Try to detect from browser
  const browserLang = navigator.language.split('-')[0]
  if (locales.includes(browserLang as Locale)) {
    return browserLang as Locale
  }
  return defaultLocale
}

export function setLocaleToStorage(locale: Locale): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('locale', locale)
}
