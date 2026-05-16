'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
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
  FileText,
  MessageCircle,
  ChevronDown,
  Grid3x3,
  ScrollText,
  Palette,
  Activity,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlobalSearch } from './global-search'
import { LanguageSelector } from '@/components/language-selector'
import { useTranslation } from '@/components/i18n-provider'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  // Close "more" dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    if (moreOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [moreOpen])

  // Primary nav (always visible) — keep this lean for spacing
  const primaryNav = [
    { href: '/', label: t('common.home'), icon: Sparkles },
    { href: '/player', label: t('common.players'), icon: Users },
    { href: '/server', label: t('common.servers'), icon: Server },
    { href: '/wiki', label: t('common.wiki'), icon: BookOpen },
    { href: '/docs', label: t('common.docs'), icon: FileText },
  ]

  // Secondary nav (under "More" dropdown) — gives breathing room in the header
  const moreNav = [
    { href: '/status', label: 'Status', icon: Activity, accent: '#10b981' },
    { href: '/tools', label: 'Tools', icon: Wrench, accent: '#3b82f6' },
    { href: '/changelogs', label: 'Changelogs', icon: ScrollText, accent: '#f59e0b' },
    { href: '/skin-editor', label: 'Skin Editor', icon: Palette, accent: '#a855f7' },
    { href: '/news', label: t('common.news'), icon: Newspaper, accent: '#3b82f6' },
    { href: '/community', label: 'Community', icon: MessageCircle, accent: '#22c55e' },
    { href: '/team', label: t('common.team'), icon: Heart, accent: '#ef4444' },
  ]

  const allNav = [...primaryNav, ...moreNav]
  const isMoreActive = moreNav.some(
    (item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)),
  )

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgba(255,255,255,0.06)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="YuuTiers"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-lg group-hover:scale-105 transition-transform"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.4))' }}
                />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="text-base font-bold bg-gradient-to-r from-[#22c55e] to-[#3b82f6] bg-clip-text text-transparent">
                  YuuTiers
                </span>
                <span className="text-[#8888aa] text-[11px]">.xyz</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center max-w-2xl">
              {primaryNav.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                        : 'text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[rgba(255,255,255,0.04)]'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                )
              })}

              {/* More dropdown */}
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isMoreActive || moreOpen
                      ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                      : 'text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[rgba(255,255,255,0.04)]'
                  )}
                >
                  <Grid3x3 className="w-3.5 h-3.5" />
                  More
                  <ChevronDown
                    className={cn('w-3.5 h-3.5 transition-transform', moreOpen && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.14 }}
                      className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0c0c12] border border-[rgba(255,255,255,0.08)] shadow-2xl shadow-black/60 overflow-hidden p-1.5"
                    >
                      {moreNav.map((item) => {
                        const Icon = item.icon
                        const isActive =
                          pathname === item.href ||
                          (item.href !== '/' && pathname.startsWith(item.href))
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMoreOpen(false)}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                              isActive
                                ? 'bg-[rgba(255,255,255,0.05)] text-[#f0f0f8]'
                                : 'text-[#9c9cb8] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#f0f0f8]',
                            )}
                          >
                            <span
                              className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                              style={{
                                background: `${item.accent}15`,
                                border: `1px solid ${item.accent}30`,
                              }}
                            >
                              <Icon className="w-3.5 h-3.5" style={{ color: item.accent }} />
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <LanguageSelector />
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#8888aa] hover:text-[#f0f0f8] hover:border-[rgba(255,255,255,0.14)] transition-all"
              >
                <Search className="w-3.5 h-3.5" />
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
                {allNav.map((item) => {
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
