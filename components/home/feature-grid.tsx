'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Server, Newspaper, ArrowUpRight, Activity, Globe2 } from 'lucide-react'
import { useTranslation } from '@/components/i18n-provider'

export function FeatureGrid() {
  const { t } = useTranslation()

  const features = [
    {
      href: '/player',
      icon: Users,
      title: t('home.features.playerSearch'),
      description: t('home.features.playerSearchDesc'),
      color: '#3b82f6',
      chip: 'Profiles',
      glow: 'rgba(59,130,246,0.18)',
    },
    {
      href: '/server',
      icon: Server,
      title: t('home.features.serverStatus'),
      description: t('home.features.serverStatusDesc'),
      color: '#22c55e',
      chip: 'Live ping',
      glow: 'rgba(34,197,94,0.16)',
    },
    {
      href: '/news',
      icon: Newspaper,
      title: t('home.features.liveNews'),
      description: t('home.features.liveNewsDesc'),
      color: '#a78bfa',
      chip: 'Realtime',
      glow: 'rgba(167,139,250,0.18)',
    },
  ]

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] mb-5">
            <Activity className="w-3 h-3 text-[#60a5fa]" />
            <span className="text-xs text-[#8a8aa3] font-medium">
              {t('home.features.title')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f1f1f7] mb-4 tracking-tight leading-tight">
            {t('home.features.title')}
          </h2>
          <p className="text-[#8a8aa3] leading-relaxed text-lg">
            {t('home.hero.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group"
              >
                <Link
                  href={f.href}
                  className="glow-card relative block h-full rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-6 hover:bg-[#13131c] transition-all overflow-hidden"
                >
                  <div
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${f.glow}, transparent 70%)` }}
                  />

                  <div className="relative flex items-start justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ring-inset"
                      style={{
                        background: `${f.color}14`,
                        // @ts-expect-error custom CSS var
                        '--tw-ring-color': `${f.color}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: f.color }} />
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: f.color, background: `${f.color}14` }}
                      >
                        {f.chip}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#5a5a76] group-hover:text-[#f1f1f7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>

                  <h3 className="relative text-[#f1f1f7] font-semibold text-base mb-2 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="relative text-[#8a8aa3] text-sm leading-relaxed line-clamp-3">
                    {f.description}
                  </p>

                  <div className="relative mt-6 pt-5 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-xs">
                    <span className="text-[#5a5a76]">{t('common.learnMore')}</span>
                    <Globe2 className="w-3.5 h-3.5 text-[#5a5a76] group-hover:text-[#f1f1f7] transition-colors" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
