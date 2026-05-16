'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Server, History, ArrowRight, Users, Globe } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'

const popularServers = [
  { ip: 'mc.hypixel.net', name: 'Hypixel', players: '45,000+' },
  { ip: 'play.cubecraft.net', name: 'CubeCraft', players: '10,000+' },
  { ip: 'mc.mineplex.com', name: 'Mineplex', players: '5,000+' },
  { ip: 'play.hivemc.com', name: 'The Hive', players: '8,000+' },
  { ip: 'play.wynncraft.com', name: 'Wynncraft', players: '3,000+' },
  { ip: 'mc.manacube.net', name: 'Manacube', players: '2,000+' },
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
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
              <Server className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#f0f0f8] mb-4">Server Status</h1>
            <p className="text-[#8888aa] max-w-md mx-auto">
              Check the status of any Minecraft server. View player count, MOTD, version, and more.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="mb-12"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative flex items-center bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
                <Globe className="w-5 h-5 text-[#4a4a6a] ml-5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter server IP (e.g., mc.hypixel.net)..."
                  className="flex-1 bg-transparent px-4 py-5 text-lg text-[#f0f0f8] placeholder-[#4a4a6a] outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white px-6 py-3 m-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Check
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.form>

          {/* Popular Servers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-[#4a4a6a]" />
              <h2 className="text-[#4a4a6a] text-sm uppercase tracking-wide">Popular Servers</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {popularServers.map((server, i) => (
                <motion.button
                  key={server.ip}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  onClick={() => router.push(`/server/${server.ip}`)}
                  className="group rounded-xl bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] p-4 text-left hover:border-[rgba(255,255,255,0.14)] hover:bg-[#16161f] transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#16161f] flex items-center justify-center">
                      <Server className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                    <div>
                      <p className="text-[#f0f0f8] font-medium">{server.name}</p>
                      <p className="text-[#4a4a6a] text-xs font-mono">{server.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#22c55e] text-sm">
                    <Users className="w-4 h-4" />
                    <span>{server.players}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
