'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Users,
  Server,
  Newspaper,
  BookOpen,
  Menu,
  X,
  Sparkles,
  Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlobalSearch } from './global-search'
import { LanguageSelector } from '@/components/language-selector'
import { useTranslation } from '@/components/i18n-provider'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { t } = useTranslation()

  const navItems = [
    { href: '/', label: t('common.home'), icon: Sparkles },
    { href: '/player', label: t('common.players'), icon: Users },
    { href: '/server', label: t('common.servers'), icon: Server },
    { href: '/news', label: t('common.news'), icon: Newspaper },
    { href: '/wiki', label: t('common.wiki'), icon: BookOpen },
    { href: '/team', label: t('common.team'), icon: Heart },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgba(255,255,255,0.06)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="YuuTiers"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg group-hover:scale-105 transition-transform"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.4))' }}
                />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22c55e] rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="text-lg font-bold bg-gradient-to-r from-[#22c55e] to-[#3b82f6] bg-clip-text text-transparent">
                  YuuTiers
                </span>
                <span className="text-[#8888aa] text-xs">.xyz</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                        : 'text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[rgba(255,255,255,0.04)]'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <LanguageSelector />
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#8888aa] hover:text-[#f0f0f8] hover:border-[rgba(255,255,255,0.14)] transition-all"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{t('navbar.search')}</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-1.5 font-mono text-[10px] font-medium text-[#4a4a6a]">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[rgba(255,255,255,0.04)] transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[rgba(255,255,255,0.06)]"
            >
              <nav className="px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href))

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                          : 'text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[rgba(255,255,255,0.04)]'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
