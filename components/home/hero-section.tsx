'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Users, Server, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/components/i18n-provider'

const trending = [
  'Annushkaz_Yuu',
  'Dexy_Yuu',
  'Dream',
  'Technoblade',
  'Notch',
  'jeb_',
  'GeorgeNotFound',
  'Sapnap',
]

export function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const { t } = useTranslation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    const isServerIP = q.includes('.') || q.includes(':')
    router.push(isServerIP ? `/server/${q}` : `/player/${q}`)
  }

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Minecraft cinematic background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/70 via-[#050508]/85 to-[#050508]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050508_80%)]" />
      </div>
      {/* Aurora backdrop */}
      <div className="aurora" aria-hidden />
      {/* Grid */}
      <div className="absolute inset-0 laby-grid pointer-events-none opacity-50" aria-hidden />
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(59,130,246,0.18), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.22)] mb-7 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]" />
          </span>
          <span className="text-xs text-[#cbd5ff] font-medium tracking-wide">
            {t('home.hero.badge')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 text-balance leading-[1.02] tracking-tight"
        >
          <span className="text-gradient">{t('home.hero.title')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-lg text-[#8a8aa3] mb-10 max-w-xl mx-auto text-pretty leading-relaxed"
        >
          {t('home.hero.subtitle')}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative group">
            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-[#3b82f6] via-[#7c3aed] to-[#3b82f6] rounded-2xl opacity-0 group-focus-within:opacity-60 blur-md transition-opacity duration-500" />
            <div className="relative flex items-center bg-[#0e0e15] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)] group-focus-within:border-[rgba(255,255,255,0.18)] transition-colors">
              <Search className="w-5 h-5 text-[#5a5a76] ml-5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('home.hero.searchPlaceholder')}
                className="flex-1 bg-transparent px-4 py-5 text-base text-[#f1f1f7] placeholder-[#5a5a76] outline-none min-w-0"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-2.5 mx-2 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_24px_-4px_rgba(59,130,246,0.5)]"
              >
                {t('player.search.button')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trending names */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-[#5a5a76] text-xs uppercase tracking-wider mr-1">
              Trending
            </span>
            {trending.slice(0, 6).map((name, i) => (
              <motion.button
                key={name}
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                onClick={() => router.push(`/player/${name}`)}
                className="group/chip flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#8a8aa3] hover:text-[#f1f1f7] hover:border-[rgba(255,255,255,0.18)] transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/skin/head/${name}`}
                  alt=""
                  width={16}
                  height={16}
                  className="rounded pixelated"
                />
                <span className="text-xs">{name}</span>
              </motion.button>
            ))}
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <QuickLink href="/player" icon={Users} label={t('home.features.playerSearch')} />
          <QuickLink href="/server" icon={Server} label={t('home.features.serverStatus')} />
          <QuickLink href="/news" icon={Newspaper} label={t('home.features.liveNews')} />
        </motion.div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center"
        >
          <Stat value="180M+" label={t('home.stats.players')} />
          <Divider />
          <Stat value="∞" label={t('home.stats.servers')} />
          <Divider />
          <Stat value="Live" label={t('home.stats.articles')} highlight />
        </motion.div>
      </div>
    </section>
  )
}

function QuickLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] text-[#8a8aa3] hover:text-[#f1f1f7] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.05)] transition-all text-sm"
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
      <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
    </Link>
  )
}

function Stat({
  value,
  label,
  highlight,
}: {
  value: string
  label: string
  highlight?: boolean
}) {
  return (
    <div>
      <div
        className={`text-2xl font-bold tracking-tight ${
          highlight ? 'text-[#22c55e]' : 'text-[#f1f1f7]'
        }`}
      >
        {highlight && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e] mr-2 animate-pulse align-middle" />
        )}
        {value}
      </div>
      <div className="text-[#5a5a76] text-xs uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  )
}

function Divider() {
  return <div className="hidden sm:block w-px h-8 bg-[rgba(255,255,255,0.08)]" />
}
