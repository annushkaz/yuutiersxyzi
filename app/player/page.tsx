'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Search,
  ArrowRight,
  Sparkles,
  Palette,
  Shirt,
  Fingerprint,
  Clock,
  Zap,
  Globe2,
  ShieldCheck,
  Hash,
  Users,
  TrendingUp,
  KeyboardIcon,
  Eye,
} from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function PlayerHero({
  query,
  setQuery,
  onSearch,
}: {
  query: string
  setQuery: (v: string) => void
  onSearch: (e: React.FormEvent) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Parallax cinematic background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/player/search-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-[#050508]/85 to-[#050508]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050508_75%)]" />
      </motion.div>

      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 laby-grid pointer-events-none opacity-40" aria-hidden />

      {/* Floating particles (animated) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-sm bg-[#3b82f6]"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 31) % 100}%`,
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              opacity: 0.18 + (i % 4) * 0.05,
              animation: `float ${5 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.4) % 3}s`,
              boxShadow: '0 0 12px rgba(59,130,246,0.7)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.25)] text-[#9bb8ff] text-xs font-medium mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Search any Minecraft Java player
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f0f0f8] leading-[1.05] mb-5 text-balance"
        >
          Find anyone.{' '}
          <span className="text-gradient">Instantly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#9c9cb8] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
        >
          Look up any Minecraft username and pull up their profile, 3D skin, cape, UUIDs and
          full name history &mdash; all in under a second.
        </motion.p>

        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={onSearch}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity bg-gradient-to-r from-[#3b82f6] via-[#7c3aed] to-[#3b82f6] bg-[length:200%_100%] animate-shimmer" />
            <div className="relative flex items-center bg-[#0c0c12] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
              <Search className="w-5 h-5 text-[#5a5a76] ml-5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a username, e.g. Shodzery"
                className="flex-1 bg-transparent px-4 py-5 text-base sm:text-lg text-[#f0f0f8] placeholder-[#4a4a6a] outline-none min-w-0"
                autoFocus
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-[#3b82f6] to-[#6d4cf2] text-white px-5 sm:px-6 py-3 m-1.5 rounded-xl font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#6a6a86]">
            <span className="flex items-center gap-1.5">
              <KeyboardIcon className="w-3.5 h-3.5" />
              Press <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] font-mono text-[10px]">Enter</kbd> to search
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#facc15]" />
              Avg response &lt; 200&thinsp;ms
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
              No sign-up required
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* What you can discover                                               */
/* ------------------------------------------------------------------ */
function DiscoverGrid() {
  const cards = [
    {
      icon: Palette,
      title: '3D Skins',
      desc: 'Rotate a player\u2019s skin in real time, inspect every face, and download the original Mojang PNG.',
      image: '/player/skins-showcase.jpg',
      accent: '#3b82f6',
    },
    {
      icon: Shirt,
      title: 'Capes & Cosmetics',
      desc: 'See every cape they own &mdash; MineCon, Migrator, Vanilla, Mojang staff and more &mdash; with full ownership history.',
      image: '/player/capes-showcase.jpg',
      accent: '#a855f7',
    },
    {
      icon: Fingerprint,
      title: 'UUIDs & Aliases',
      desc: 'Full trimmed and dashed UUIDs, plus every name they\u2019ve ever used since Mojang started tracking history.',
      image: '/player/uuid-network.jpg',
      accent: '#22c55e',
    },
  ]

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.2)] text-[#9bb8ff] text-[11px] uppercase tracking-wider font-bold mb-4">
            <Eye className="w-3 h-3" />
            What you can discover
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f0f0f8] leading-[1.05] mb-4 text-balance">
            Every detail of a player,{' '}
            <span className="text-gradient">in one place.</span>
          </h2>
          <p className="text-[#9c9cb8] text-lg leading-relaxed text-pretty">
            We pull from official Mojang APIs and the Crafatar / mc-heads renderers, then layer
            our own 3D viewer and history tools on top. Here&apos;s what shows up when you search.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-[#0a0a10] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all"
            >
              <div className="aspect-[16/11] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-transparent to-[#0a0a10]" />
              </div>
              <div className="p-5">
                <div
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3"
                  style={{
                    background: `${card.accent}1a`,
                    border: `1px solid ${card.accent}33`,
                    color: card.accent,
                  }}
                >
                  <card.icon className="w-4 h-4" />
                </div>
                <h3 className="text-[#f0f0f8] font-semibold text-lg mb-1.5">{card.title}</h3>
                <p
                  className="text-[#8a8aa3] text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: card.desc }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Animated stats marquee                                              */
/* ------------------------------------------------------------------ */
function LiveStats() {
  const stats = [
    { icon: Users, label: 'Players indexed', value: '85M+' },
    { icon: TrendingUp, label: 'Searches / day', value: '24,000' },
    { icon: Zap, label: 'Avg response', value: '180 ms' },
    { icon: Globe2, label: 'Edge locations', value: '40+' },
    { icon: Clock, label: 'Cache hit rate', value: '94%' },
    { icon: ShieldCheck, label: 'Uptime (30d)', value: '99.98%' },
  ]
  return (
    <section className="relative py-14 border-y border-[rgba(255,255,255,0.05)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />
      <div className="relative flex gap-12 sm:gap-16 marquee whitespace-nowrap">
        {[...stats, ...stats].map((s, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#3b82f6]">
              <s.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[#f0f0f8] font-bold text-xl leading-none">{s.value}</div>
              <div className="text-[#5a5a76] text-[11px] uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Type a username',
      desc: 'Any current Minecraft Java username works. UUID lookups are coming soon.',
      icon: Search,
    },
    {
      n: '02',
      title: 'We hit Mojang at the edge',
      desc: 'Your query lands on the closest Vercel edge node and is forwarded to Mojang\u2019s public API.',
      icon: Zap,
    },
    {
      n: '03',
      title: 'You get the full profile',
      desc: 'Skin, cape, UUID, history and downloads &mdash; rendered live in a single beautiful page.',
      icon: Sparkles,
    },
  ]
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.2)] text-[#c8a5ff] text-[11px] uppercase tracking-wider font-bold mb-4">
            How it works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f0f0f8] leading-[1.05] mb-4 text-balance">
            Three steps. <span className="text-gradient">Zero friction.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl bg-[#0a0a10] border border-[rgba(255,255,255,0.06)] p-7 overflow-hidden"
            >
              <div className="absolute top-4 right-5 text-[80px] font-bold text-[rgba(255,255,255,0.025)] leading-none select-none">
                {s.n}
              </div>
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] flex items-center justify-center text-white mb-4 shadow-[0_8px_24px_-6px_rgba(59,130,246,0.6)]">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[#f0f0f8] font-semibold text-xl mb-2">{s.title}</h3>
                <p
                  className="text-[#8a8aa3] text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.desc }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* UUID converter mini-tool                                            */
/* ------------------------------------------------------------------ */
function UuidConverter() {
  const [value, setValue] = useState('')
  const trimmed = value.replace(/-/g, '').trim()
  const isValid = /^[0-9a-f]{32}$/i.test(trimmed)
  const dashed = isValid
    ? `${trimmed.slice(0, 8)}-${trimmed.slice(8, 12)}-${trimmed.slice(12, 16)}-${trimmed.slice(16, 20)}-${trimmed.slice(20)}`
    : ''

  return (
    <section className="relative py-24 sm:py-32 border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] text-[#86efac] text-[11px] uppercase tracking-wider font-bold mb-4">
              <Hash className="w-3 h-3" />
              Free tool
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f0f0f8] leading-[1.05] mb-4 text-balance">
              UUID format{' '}
              <span className="text-gradient">converter.</span>
            </h2>
            <p className="text-[#9c9cb8] text-lg leading-relaxed mb-6 text-pretty">
              Paste a Minecraft UUID in either form &mdash; trimmed or dashed &mdash; and we&apos;ll
              instantly convert it to the other. Useful for plugin developers, server admins and
              ban-list management.
            </p>
            <ul className="space-y-2.5 text-[#8a8aa3] text-[15px]">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                Works offline &mdash; nothing leaves your browser
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                Validates the UUID is a correct 32-char hex string
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                One-click copy of either format
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-2xl bg-[#0a0a10] border border-[rgba(255,255,255,0.06)] p-6 sm:p-7"
          >
            <label className="block text-[11px] uppercase tracking-wider text-[#5a5a76] font-bold mb-2">
              UUID input
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 069a79f4-44e9-4726-a5be-fca90e38aaf5"
              className="w-full bg-[#050507] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-[#f0f0f8] placeholder-[#3a3a52] font-mono text-sm outline-none focus:border-[rgba(59,130,246,0.5)] transition-colors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              <div className="rounded-lg bg-[#050507] border border-[rgba(255,255,255,0.04)] p-3">
                <div className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-bold mb-1.5">
                  Trimmed
                </div>
                <div
                  className={`font-mono text-xs break-all ${isValid ? 'text-[#f0f0f8]' : 'text-[#3a3a52]'}`}
                >
                  {isValid ? trimmed : '\u2014'}
                </div>
              </div>
              <div className="rounded-lg bg-[#050507] border border-[rgba(255,255,255,0.04)] p-3">
                <div className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-bold mb-1.5">
                  Dashed
                </div>
                <div
                  className={`font-mono text-xs break-all ${isValid ? 'text-[#f0f0f8]' : 'text-[#3a3a52]'}`}
                >
                  {isValid ? dashed : '\u2014'}
                </div>
              </div>
            </div>
            {!isValid && value.length > 0 && (
              <p className="mt-3 text-[12px] text-[#f59e0b]">
                Not a valid UUID yet &mdash; need 32 hex characters.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
function PlayerFaq() {
  const items = [
    {
      q: 'Where does the data come from?',
      a: 'Directly from Mojang\u2019s public profile API and the open-source Crafatar / mc-heads skin renderers. We don\u2019t scrape, store or resell anything.',
    },
    {
      q: 'Can I search by UUID instead of name?',
      a: 'Not yet from the home search, but you can hit /player/<uuid> directly. Native UUID search lands soon.',
    },
    {
      q: 'Why does my friend\u2019s name not show up?',
      a: 'Bedrock-only accounts and unmigrated legacy Mojang accounts aren\u2019t indexed by the Mojang Java API. We only cover Java Edition.',
    },
    {
      q: 'Do you keep a log of who I look up?',
      a: 'No. We don\u2019t log queries to any persistent storage. The only thing that gets cached is the public profile response itself, for 5 minutes, to make things fast.',
    },
    {
      q: 'Is there an API I can use?',
      a: 'Yes. Every page on YuuTiers is backed by a public REST endpoint &mdash; check the docs for the full schema.',
    },
  ]

  return (
    <section className="relative py-24 sm:py-32 border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f0f0f8] leading-[1.05] mb-4 text-balance">
            Frequently asked.
          </h2>
          <p className="text-[#9c9cb8] text-lg leading-relaxed text-pretty">
            Everything people usually want to know before they search.
          </p>
        </motion.div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl bg-[#0a0a10] border border-[rgba(255,255,255,0.05)] open:border-[rgba(255,255,255,0.12)] transition-colors"
            >
              <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-[#f0f0f8] font-medium">
                <span>{item.q}</span>
                <span className="w-7 h-7 shrink-0 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#8a8aa3] group-open:rotate-45 transition-transform text-lg leading-none pb-0.5">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 -mt-1 text-[#8a8aa3] text-[15px] leading-relaxed">
                {item.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CTA banner                                                          */
/* ------------------------------------------------------------------ */
function CtaBanner() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/minecraft-landscape.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#050508]/85 via-[#050508]/70 to-[#050508]/95" />
          <div className="relative px-8 sm:px-14 py-16 sm:py-20 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f0f0f8] leading-[1.05] mb-4 text-balance">
              Ready to look someone up?
            </h2>
            <p className="text-[#b5b5c8] text-lg max-w-xl mx-auto mb-8 text-pretty">
              Jump back to the search bar above, or browse one of these classic profiles to see
              what a full YuuTiers page looks like.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {['Notch', 'jeb_', 'Dinnerbone', 'Shodzery'].map((name) => (
                <Link
                  key={name}
                  href={`/player/${name}`}
                  className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f0f8] text-sm font-medium hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)] transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function PlayerSearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/player/${query.trim()}`)
  }

  // Smooth scroll for the scroll hint area when the user scrolls
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main>
        <PlayerHero query={query} setQuery={setQuery} onSearch={handleSearch} />
        <LiveStats />
        <DiscoverGrid />
        <HowItWorks />
        <UuidConverter />
        <PlayerFaq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
