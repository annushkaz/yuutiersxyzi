'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Compass } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/components/i18n-provider'

export function DimensionsShowcase() {
  const { t } = useTranslation()

  const dims = [
    {
      name: t('home.dimensions.overworld'),
      description: t('home.dimensions.overworldDesc'),
      image: '/minecraft-landscape.jpg',
      color: '#22c55e',
      tag: t('home.dimensions.homeDimension'),
      href: '/docs/overworld',
    },
    {
      name: t('home.dimensions.nether'),
      description: t('home.dimensions.netherDesc'),
      image: '/nether-bg.jpg',
      color: '#ef4444',
      tag: t('home.dimensions.hotDimension'),
      href: '/docs/nether',
    },
    {
      name: t('home.dimensions.end'),
      description: t('home.dimensions.endDesc'),
      image: '/end-bg.jpg',
      color: '#a78bfa',
      tag: t('home.dimensions.endgame'),
      href: '/docs/end',
    },
  ]

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] mb-4">
            <Compass className="w-3 h-3 text-[#60a5fa]" />
            <span className="text-xs text-[#8a8aa3] font-medium">{t('home.dimensions.eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f1f1f7] mb-4 tracking-tight leading-tight">
            {t('home.dimensions.title')}
          </h2>
          <p className="text-[#8a8aa3] leading-relaxed text-lg">
            {t('home.dimensions.description')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {dims.map((d, i) => (
            <Link href={d.href} key={d.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] aspect-[3/4] cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt={d.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${d.color}15, transparent 60%)`,
                  }}
                />

                <div className="absolute top-4 left-4">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold backdrop-blur-md"
                    style={{
                      background: `${d.color}25`,
                      color: d.color,
                      border: `1px solid ${d.color}40`,
                    }}
                  >
                    {d.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.08)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] flex items-center justify-center group-hover:bg-[rgba(255,255,255,0.18)] transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-2xl font-bold text-white mb-1.5 tracking-tight">
                    {d.name}
                  </h3>
                  <p className="text-[#cbd5ff]/80 text-sm leading-relaxed line-clamp-3">
                    {d.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
