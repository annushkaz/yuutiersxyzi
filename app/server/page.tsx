'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Search,
  ArrowRight,
  Globe,
  Zap,
  Wifi,
  Activity,
  TrendingUp,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const SUGGESTIONS = [
  'mc.hypixel.net',
  'play.cubecraft.net',
  'play.wynncraft.com',
  'mc.advancius.net',
  'play.hivemc.com',
]

export default function ServerSearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/server/${query.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#050507] relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none diagonal-bg opacity-70" aria-hidden />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="diagonal-bg-orb-a" />
        <div className="diagonal-bg-orb-b" />
      </div>
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(5,5,8,0.4),rgba(5,5,8,0.85))]" aria-hidden />

      <Navbar />

      <main className="relative min-h-[calc(100vh-80px)] flex items-center pt-24 pb-20">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#4ade80] text-xs font-semibold mb-6">
              <Activity className="w-3.5 h-3.5" />
              Live status from mcsrvstat.us
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f0f0f8] leading-[1.05] mb-5 text-balance">
              Every Minecraft server,{' '}
              <span className="text-gradient">live.</span>
            </h1>
            <p className="text-[#9c9cb8] text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
              Drop in any Java or Bedrock IP and instantly get player count, MOTD, version, ping
              and the server icon — updated in real time.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="mb-6"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#22c55e] via-[#3b82f6] to-[#22c55e] rounded-2xl blur opacity-30 group-focus-within:opacity-60 transition-opacity" />
              <div className="relative flex items-center bg-[#0c0c12] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
                <Globe className="w-5 h-5 text-[#5a5a76] ml-5 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter server IP — e.g. mc.hypixel.net"
                  className="flex-1 bg-transparent px-4 py-5 text-base sm:text-lg text-[#f0f0f8] placeholder-[#4a4a6a] outline-none min-w-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#3b82f6] text-white px-5 sm:px-6 py-2.5 mx-2 rounded-xl text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity shadow-[0_4px_24px_-4px_rgba(34,197,94,0.5)]"
                >
                  Check
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#6a6a86]">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#facc15]" />
                Sub-second pings
              </span>
              <span className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-[#22c55e]" />
                Java &amp; Bedrock
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#3b82f6]" />
                Live player counts
              </span>
            </div>
          </motion.form>

          {/* Quick suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#5a5a76] mr-1">
              <Search className="w-3 h-3 inline mr-1" />
              Try
            </span>
            {SUGGESTIONS.map((ip) => (
              <button
                key={ip}
                type="button"
                onClick={() => router.push(`/server/${ip}`)}
                className="px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-xs font-mono text-[#9c9cb8] hover:text-[#f1f1f7] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/5 transition-all"
              >
                {ip}
              </button>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
