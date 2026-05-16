'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Hash, Box, ArrowRight, Sparkles, Wrench } from 'lucide-react'

const TOOLS = [
  {
    href: '/tools/uuid-lookup',
    title: 'UUID Lookup',
    description: 'Convert any Minecraft username to a UUID. View name history sourced from Crafty.gg.',
    icon: Hash,
    color: '#22c55e',
    accent: 'from-[rgba(34,197,94,0.12)] to-transparent',
  },
  {
    href: '/tools/version-explorer',
    title: 'Version Explorer',
    description: 'Browse every Minecraft Java Edition version ever released. Filter by type and date.',
    icon: Box,
    color: '#10b981',
    accent: 'from-[rgba(16,185,129,0.12)] to-transparent',
  },
] as const

export function ToolsIndex() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[rgba(34,197,94,0.06)] via-[rgba(59,130,246,0.04)] to-transparent p-6 sm:p-10"
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%)' }}
          />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] text-[#22c55e] text-xs font-medium mb-4">
            <Wrench className="w-3 h-3" />
            <span>Free Minecraft tools</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-balance bg-gradient-to-br from-[#f0f0f8] to-[#8888aa] bg-clip-text text-transparent">
            Minecraft tools that just work.
          </h1>
          <p className="text-[#9c9cb8] text-base sm:text-lg mt-4 max-w-2xl text-pretty leading-relaxed">
            A small set of focused utilities for Minecraft players and developers. Free, fast, no
            signups, no ads.
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TOOLS.map((t, i) => {
          const Icon = t.icon
          return (
            <motion.div
              key={t.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={t.href}
                className={`group relative block h-full rounded-2xl border border-[rgba(255,255,255,0.06)] bg-gradient-to-br ${t.accent} p-5 hover:border-[rgba(255,255,255,0.12)] transition-colors`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: t.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-[#f0f0f8]">{t.title}</h2>
                    <p className="text-sm text-[#9c9cb8] mt-1 leading-relaxed">{t.description}</p>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-[#5a5a76] group-hover:text-[#f0f0f8] transition-colors shrink-0 mt-1"
                  />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 flex items-start gap-4">
        <Sparkles className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
        <div className="text-sm text-[#9c9cb8] leading-relaxed">
          <span className="text-[#f0f0f8] font-semibold">More on the way.</span> We&apos;re curating
          a tight set of tools that we actually use ourselves. Got an idea? Let us know on the{' '}
          <Link href="/community" className="text-[#22c55e] hover:underline">
            community page
          </Link>
          .
        </div>
      </div>
    </div>
  )
}
