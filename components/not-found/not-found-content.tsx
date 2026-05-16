'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Home,
  Search,
  Compass,
  ArrowLeft,
  Users,
  Server,
  BookOpen,
  Newspaper,
  Activity,
  Sparkles,
} from 'lucide-react'

interface FloatingBlock {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  rotation: number
  color: string
}

const BLOCK_COLORS = [
  'linear-gradient(135deg, #22c55e, #16a34a)', // grass
  'linear-gradient(135deg, #78716c, #57534e)', // stone
  'linear-gradient(135deg, #b45309, #92400e)', // dirt
  'linear-gradient(135deg, #3b82f6, #1d4ed8)', // diamond
  'linear-gradient(135deg, #fbbf24, #d97706)', // gold
]

const QUICK_LINKS = [
  { href: '/player', label: 'Players', icon: Users, color: '#22c55e' },
  { href: '/server', label: 'Servers', icon: Server, color: '#3b82f6' },
  { href: '/wiki', label: 'Wiki', icon: BookOpen, color: '#a855f7' },
  { href: '/news', label: 'News', icon: Newspaper, color: '#f59e0b' },
  { href: '/status', label: 'Status', icon: Activity, color: '#10b981' },
  { href: '/tools', label: 'Tools', icon: Compass, color: '#22c55e' },
]

export function NotFoundContent() {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [blocks, setBlocks] = useState<FloatingBlock[]>([])
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate floating blocks only on the client to avoid hydration mismatch
  useEffect(() => {
    const next: FloatingBlock[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 24 + Math.random() * 48,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 6,
      rotation: Math.random() * 360,
      color: BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)],
    }))
    setBlocks(next)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    // If looks like a username, send to player page; if has dots, send to server
    if (q.includes('.') || q.includes(':')) {
      router.push(`/server/${encodeURIComponent(q)}`)
    } else if (/^[A-Za-z0-9_]{2,16}$/.test(q)) {
      router.push(`/player/${encodeURIComponent(q)}`)
    } else {
      router.push(`/wiki?q=${encodeURIComponent(q)}`)
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem-200px)] overflow-hidden flex items-center">
      {/* ─── Floating Minecraft-style blocks ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {blocks.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-md opacity-20"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.size,
              height: b.size,
              background: b.color,
              boxShadow: 'inset -4px -4px 0 rgba(0,0,0,0.25), inset 4px 4px 0 rgba(255,255,255,0.15)',
            }}
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -30, 0],
                    rotate: [b.rotation, b.rotation + 90, b.rotation],
                  }
            }
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ─── Glow accents ─── */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.10), transparent 70%)',
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          {/* Big 404 with portal effect */}
          <div className="relative inline-block">
            <motion.h1
              animate={
                reduce
                  ? undefined
                  : {
                      textShadow: [
                        '0 0 40px rgba(168,85,247,0.4)',
                        '0 0 60px rgba(168,85,247,0.6)',
                        '0 0 40px rgba(168,85,247,0.4)',
                      ],
                    }
              }
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[7rem] sm:text-[10rem] font-black leading-none tracking-tighter bg-gradient-to-br from-[#a855f7] via-[#3b82f6] to-[#22c55e] bg-clip-text text-transparent select-none"
            >
              404
            </motion.h1>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.3)] text-[#a855f7] text-xs font-medium backdrop-blur">
              <Sparkles className="w-3 h-3" />
              <span>Lost in the End</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-[#f0f0f8] text-balance">
              This page took an Ender Pearl
              <br className="hidden sm:block" />
              <span className="text-[#8888aa]"> and never came back.</span>
            </h2>
            <p className="text-[#9c9cb8] max-w-xl mx-auto text-base leading-relaxed text-pretty">
              The page you&apos;re looking for has been mined, lost or simply doesn&apos;t exist. Try
              searching for a player, a server, or jump back to a known dimension.
            </p>
          </motion.div>

          {/* Smart search */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSearch}
            className="max-w-md mx-auto"
          >
            <div className="relative group">
              <div
                className="absolute inset-0 rounded-xl blur-lg opacity-30 group-focus-within:opacity-60 transition-opacity"
                style={{ background: 'linear-gradient(90deg, #a855f7, #3b82f6, #22c55e)' }}
              />
              <div className="relative flex items-center gap-2 rounded-xl bg-[rgba(0,0,0,0.6)] border border-[rgba(255,255,255,0.08)] focus-within:border-[rgba(168,85,247,0.5)] transition-colors backdrop-blur">
                <Search className="w-4 h-4 text-[#8888aa] ml-4" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for a player, server or wiki article..."
                  className="flex-1 bg-transparent py-3 pr-2 text-sm text-[#f0f0f8] placeholder:text-[#5a5a76] outline-none"
                />
                <button
                  type="submit"
                  className="m-1 px-3 py-2 rounded-lg bg-[#a855f7] text-[#0a0a0f] text-xs font-semibold hover:bg-[#9333ea] transition-colors"
                >
                  Go
                </button>
              </div>
            </div>
            <p className="text-[11px] text-[#5a5a76] mt-2">
              Tip: type a username, a server IP or any wiki keyword.
            </p>
          </motion.form>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22c55e] text-[#0a0a0f] font-semibold text-sm hover:bg-[#16a34a] transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Overworld
            </Link>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] text-[#f0f0f8] font-medium text-sm hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back
            </button>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            <div className="flex items-center justify-center gap-2 text-[#5a5a76] text-xs uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5" />
              Or explore these dimensions
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 max-w-3xl mx-auto">
              {QUICK_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)] transition-all"
                  >
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${link.color}15`,
                        border: `1px solid ${link.color}30`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: link.color }} />
                    </span>
                    <span className="text-xs font-medium text-[#c0c0d0] group-hover:text-[#f0f0f8]">
                      {link.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
