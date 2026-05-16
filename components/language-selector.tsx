'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { Locale, locales } from '@/lib/i18n'

const localeLabels: Record<Locale, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
}

export function LanguageSelector() {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#8888aa] hover:text-[#f0f0f8] hover:border-[rgba(255,255,255,0.14)] transition-all text-sm"
        aria-label={t('common.language')}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeLabels[locale].flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 w-40 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.08)] shadow-xl overflow-hidden"
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc)
                    setOpen(false)
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm transition-colors ${
                    locale === loc
                      ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                      : 'text-[#8a8aa3] hover:text-[#f1f1f7] hover:bg-[rgba(255,255,255,0.04)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{localeLabels[loc].flag}</span>
                    <span>{localeLabels[loc].label}</span>
                  </span>
                  {locale === loc && <Check className="w-4 h-4" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
