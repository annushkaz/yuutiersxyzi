'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Scale,
  ChevronRight,
  Heart,
  Sparkles,
  Code2,
  Server,
  Shield,
  Zap,
  Users,
  Globe,
  BookOpen,
  Lock,
  FileText,
  Mail,
} from 'lucide-react'

const iconMap = {
  scale: Scale,
  heart: Heart,
  sparkles: Sparkles,
  code2: Code2,
  server: Server,
  shield: Shield,
  zap: Zap,
  users: Users,
  globe: Globe,
  bookOpen: BookOpen,
  lock: Lock,
  fileText: FileText,
  mail: Mail,
} as const

export type IconName = keyof typeof iconMap

export interface LegalSection {
  id: string
  title: string
}

interface LegalLayoutProps {
  eyebrow: string
  title: string
  subtitle?: string
  updated?: string
  heroImage?: string
  heroAccent?: string
  icon?: IconName
  sections?: LegalSection[]
  children: React.ReactNode
}

export function LegalLayout({
  eyebrow,
  title,
  subtitle,
  updated,
  heroImage,
  heroAccent = '#3b82f6',
  icon = 'scale',
  sections,
  children,
}: LegalLayoutProps) {
  const Icon = iconMap[icon] || Scale
  const [activeId, setActiveId] = useState<string | undefined>(sections?.[0]?.id)

  useEffect(() => {
    if (!sections || sections.length === 0) return
    const ids = sections.map((s) => s.id)
    const handler = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top - 120 <= 0) current = id
      }
      setActiveId(current)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [sections])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="relative mb-16 rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.06)]">
        {heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/40 via-[#050507]/80 to-[#050507]" />
          </>
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top, ${heroAccent}26, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 laby-grid opacity-20 pointer-events-none" />

        <div className="relative px-6 sm:px-12 py-16 sm:py-24 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: `${heroAccent}1a`,
              border: `1px solid ${heroAccent}33`,
            }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: heroAccent }} />
            <span
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: heroAccent }}
            >
              {eyebrow}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-[#f0f0f8] tracking-tight mb-4 leading-[1.05] text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[#a8a8c0] text-lg sm:text-xl leading-relaxed text-pretty max-w-2xl">
              {subtitle}
            </p>
          )}
          {updated && (
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#6a6a86]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              {updated}
            </div>
          )}
        </div>
      </header>

      {/* Body grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        <article className="prose-yuu min-w-0">{children}</article>

        {/* Sticky TOC */}
        {sections && sections.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-bold mb-4">
                On this page
              </p>
              <nav className="flex flex-col gap-1 border-l border-[rgba(255,255,255,0.06)]">
                {sections.map((s) => {
                  const active = activeId === s.id
                  return (
                    <Link
                      key={s.id}
                      href={`#${s.id}`}
                      className={`group flex items-center gap-2 -ml-px pl-4 py-1.5 text-sm border-l transition-colors ${
                        active
                          ? 'border-[#3b82f6] text-[#f0f0f8]'
                          : 'border-transparent text-[#6a6a86] hover:text-[#a8a8c0]'
                      }`}
                    >
                      <ChevronRight
                        className={`w-3 h-3 transition-transform ${
                          active ? 'translate-x-0.5 text-[#3b82f6]' : 'opacity-50'
                        }`}
                      />
                      {s.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

/* ----------------------------- Building blocks ---------------------------- */

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-10 mt-10 first:mt-0 first:pt-0 border-t border-[rgba(255,255,255,0.05)] first:border-0">
      <div className="flex items-baseline gap-3 mb-4">
        {number && (
          <span className="text-xs font-mono font-bold tracking-wider text-[#3b82f6] mt-1">
            {number}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8] tracking-tight !mt-0 !mb-0">
          {title}
        </h2>
      </div>
      <div className="space-y-4 [&>p]:!my-0 [&>ul]:!my-0">{children}</div>
    </section>
  )
}

export function LegalCallout({
  title,
  tone = 'info',
  children,
}: {
  title?: string
  tone?: 'info' | 'success' | 'warn'
  children: React.ReactNode
}) {
  const colors = {
    info: { border: 'rgba(59,130,246,0.25)', bg: 'rgba(59,130,246,0.06)', text: '#3b82f6' },
    success: { border: 'rgba(34,197,94,0.25)', bg: 'rgba(34,197,94,0.06)', text: '#22c55e' },
    warn: { border: 'rgba(250,170,80,0.25)', bg: 'rgba(250,170,80,0.06)', text: '#faa850' },
  }[tone]

  return (
    <div
      className="my-6 rounded-xl p-5 border"
      style={{ borderColor: colors.border, background: colors.bg }}
    >
      {title && (
        <p
          className="!m-0 mb-2 font-semibold text-[13px] uppercase tracking-wider"
          style={{ color: colors.text }}
        >
          {title}
        </p>
      )}
      <div className="text-[#c8c8da] text-[15px] leading-relaxed [&>p]:!m-0 [&>p+p]:!mt-2">
        {children}
      </div>
    </div>
  )
}

export function PrincipleGrid({
  items,
}: {
  items: { icon: IconName; title: string; description: string }[]
}) {
  return (
    <div className="not-prose grid sm:grid-cols-2 gap-3 my-8">
      {items.map((p) => {
        const Icon = iconMap[p.icon] || Scale
        return (
          <div
            key={p.title}
            className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0e0e15] p-5 hover:border-[rgba(255,255,255,0.12)] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#3b82f6]" />
              </div>
              <div>
                <h4 className="text-[#f0f0f8] font-semibold text-base !m-0 mb-1">{p.title}</h4>
                <p className="text-[#8a8aa3] text-sm leading-relaxed !m-0">{p.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function KVTable({
  rows,
}: {
  rows: { k: string; v: React.ReactNode }[]
}) {
  return (
    <div className="not-prose my-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0e0e15] overflow-hidden">
      {rows.map((r, i) => (
        <div
          key={r.k}
          className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 px-5 py-3.5 ${
            i > 0 ? 'border-t border-[rgba(255,255,255,0.05)]' : ''
          }`}
        >
          <div className="text-[12px] uppercase tracking-wider text-[#5a5a76] font-semibold">
            {r.k}
          </div>
          <div className="text-[14px] text-[#c8c8da] leading-relaxed">{r.v}</div>
        </div>
      ))}
    </div>
  )
}

export function StatRow({
  items,
}: {
  items: { value: string; label: string; accent?: string }[]
}) {
  return (
    <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0e0e15] p-5"
        >
          <div
            className="text-3xl font-bold tracking-tight !m-0 mb-1"
            style={{ color: s.accent || '#f0f0f8' }}
          >
            {s.value}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#5a5a76] font-semibold">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
