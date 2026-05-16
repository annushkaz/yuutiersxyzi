'use client'

import { motion } from 'framer-motion'
import { Pickaxe, Sword, Diamond, Gem, Crown, Sparkles, TreePine, Flame } from 'lucide-react'

const items = [
  { icon: Pickaxe, label: 'Mine smarter' },
  { icon: Diamond, label: '180M+ players' },
  { icon: Sword, label: 'Track servers' },
  { icon: Gem, label: 'Real-time skins' },
  { icon: Crown, label: 'Free forever' },
  { icon: Sparkles, label: 'No ads, no tracking' },
  { icon: TreePine, label: 'Open APIs' },
  { icon: Flame, label: 'Built by the community' },
]

export function StatsMarquee() {
  // duplicate for infinite loop
  const loop = [...items, ...items]

  return (
    <section className="relative py-10 border-y border-[rgba(255,255,255,0.05)] bg-[#070710] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{ background: 'linear-gradient(to right, #070710, transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{ background: 'linear-gradient(to left, #070710, transparent)' }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex animate-marquee"
        style={{ width: 'max-content' }}
      >
        {loop.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-8 text-[#8a8aa3] whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-[#60a5fa]" />
              <span className="text-sm font-medium tracking-wide uppercase">
                {item.label}
              </span>
              <span className="text-[#3a3a52]">•</span>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}
