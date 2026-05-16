'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, ChevronRight, Users, Palette, Server, Newspaper, Skull, TreePine, Mountain, Compass } from 'lucide-react'

const docsIconMap = {
  users: Users,
  palette: Palette,
  server: Server,
  newspaper: Newspaper,
  skull: Skull,
  tree: TreePine,
  mountain: Mountain,
  compass: Compass,
} as const

export type DocsIconName = keyof typeof docsIconMap

export function WikiHero({
  image,
  eyebrow,
  title,
  description,
  accent = '#3b82f6',
}: {
  image: string
  eyebrow: string
  title: string
  description: string
  accent?: string
}) {
  return (
    <header className="relative -mt-2 mb-10 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] aspect-[16/8] sm:aspect-[16/7]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(5,5,8,0.25) 0%, rgba(5,5,8,0.85) 70%, rgba(5,5,8,0.98) 100%)`,
        }}
      />
      <div className="absolute inset-0 flex items-end p-6 sm:p-10">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold mb-3"
            style={{
              background: `${accent}1f`,
              color: accent,
              border: `1px solid ${accent}33`,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
            />
            {eyebrow}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f1f1f7] mb-3 leading-[1.05]">
            {title}
          </h1>
          <p className="text-[#b5b5c8] text-base sm:text-lg leading-relaxed text-pretty">
            {description}
          </p>
        </div>
      </div>
    </header>
  )
}

export function StatGrid({
  items,
}: {
  items: { label: string; value: string; accent?: string }[]
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4"
        >
          <div className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-semibold mb-1">
            {s.label}
          </div>
          <div
            className="text-lg font-bold text-[#f1f1f7]"
            style={s.accent ? { color: s.accent } : undefined}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export function WikiTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0e0e15]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.06)]">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[#5a5a76] font-bold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[rgba(255,255,255,0.04)] last:border-0 hover:bg-[rgba(255,255,255,0.02)]"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${j === 0 ? 'text-[#f1f1f7] font-medium' : 'text-[#8a8aa3]'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function MobCard({
  name,
  type,
  health,
  damage,
  drops,
  notes,
  accent = '#3b82f6',
}: {
  name: string
  type: string
  health: string
  damage: string
  drops: string
  notes?: string
  accent?: string
}) {
  return (
    <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5 hover:border-[rgba(255,255,255,0.12)] transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="text-[#f1f1f7] font-bold text-lg leading-tight">{name}</h4>
          <div
            className="text-[10px] uppercase tracking-wider font-semibold mt-1"
            style={{ color: accent }}
          >
            {type}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] mb-3">
        <div>
          <span className="text-[#5a5a76]">Health: </span>
          <span className="text-[#f1f1f7] font-medium">{health}</span>
        </div>
        <div>
          <span className="text-[#5a5a76]">Damage: </span>
          <span className="text-[#f1f1f7] font-medium">{damage}</span>
        </div>
      </div>
      <div className="text-[13px] mb-2">
        <span className="text-[#5a5a76]">Drops: </span>
        <span className="text-[#8a8aa3]">{drops}</span>
      </div>
      {notes && <p className="text-[13px] text-[#8a8aa3] leading-relaxed mt-2">{notes}</p>}
    </div>
  )
}

export function BiomeCard({
  name,
  climate,
  description,
  features,
  accent = '#22c55e',
}: {
  name: string
  climate: string
  description: string
  features: string[]
  accent?: string
}) {
  return (
    <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[#f1f1f7] font-bold text-lg">{name}</h4>
        <span
          className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded"
          style={{
            background: `${accent}1a`,
            color: accent,
            border: `1px solid ${accent}33`,
          }}
        >
          {climate}
        </span>
      </div>
      <p className="text-[#8a8aa3] text-[14px] leading-relaxed mb-3">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {features.map((f) => (
          <span
            key={f}
            className="px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[11px] text-[#8a8aa3]"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  )
}

export function DocsTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <header className="mb-10">
      {eyebrow && (
        <div className="text-xs uppercase tracking-wider text-[#60a5fa] font-semibold mb-3">
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#f1f1f7] tracking-tight mb-4 leading-tight">
        {title}
      </h1>
      {description && (
        <p className="text-[#8a8aa3] text-lg leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </header>
  )
}

export function DocsSection({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-32">
      <h2 className="text-2xl font-bold text-[#f1f1f7] tracking-tight mb-4 flex items-center gap-3">
        <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#3b82f6] to-[#7c3aed]" />
        {title}
      </h2>
      <div className="space-y-4 text-[#8a8aa3] leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  )
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-[#0e0e15] border border-[rgba(255,255,255,0.07)] text-[#60a5fa] text-[13px] font-mono">
      {children}
    </code>
  )
}

export function CodeBlock({
  children,
  language = 'bash',
}: {
  children: string
  language?: string
}) {
  return (
    <div className="rounded-xl bg-[#08080c] border border-[rgba(255,255,255,0.06)] overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[rgba(255,255,255,0.05)]">
        <span className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-semibold">
          {language}
        </span>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] text-[#cbd5ff] font-mono leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'success'
  title?: string
  children: React.ReactNode
}) {
  const colors = {
    info: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)', text: '#60a5fa' },
    warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', text: '#f59e0b' },
    success: { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', text: '#22c55e' },
  }[type]
  return (
    <div
      className="rounded-xl p-4 my-4"
      style={{ background: colors.bg, borderLeft: `3px solid ${colors.border}` }}
    >
      {title && (
        <p className="font-semibold text-sm mb-1" style={{ color: colors.text }}>
          {title}
        </p>
      )}
      <div className="text-[#cbd5ff] text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export function FeatureRow({
  href,
  icon,
  title,
  desc,
  color,
}: {
  href: string
  icon: DocsIconName
  title: string
  desc: string
  color: string
}) {
  const Icon = docsIconMap[icon] || Users
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4 hover:border-[rgba(255,255,255,0.14)] transition-colors group not-prose"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}14` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[#f1f1f7] font-semibold text-sm mb-0.5">{title}</p>
        <p className="text-[#8a8aa3] text-sm">{desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-[#5a5a76] group-hover:text-[#f1f1f7] group-hover:translate-x-0.5 transition-all mt-1" />
    </Link>
  )
}

export function EndpointCard({
  method,
  path,
  description,
}: {
  method: string
  path: string
  description: string
}) {
  return (
    <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4 hover:border-[rgba(255,255,255,0.14)] transition-colors">
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/25">
          {method}
        </span>
        <code className="text-[#f1f1f7] font-mono text-sm">{path}</code>
      </div>
      <p className="text-[#8a8aa3] text-sm">{description}</p>
    </div>
  )
}

export function DocsPager({
  prev,
  next,
}: {
  prev?: { href: string; label: string }
  next?: { href: string; label: string }
}) {
  return (
    <nav className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col items-start gap-1 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.18)] transition-all"
        >
          <span className="text-[10px] uppercase tracking-wider text-[#5a5a76]">Previous</span>
          <span className="flex items-center gap-2 text-[#f1f1f7] font-medium text-sm">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {prev.label}
          </span>
        </Link>
      ) : <div />}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.18)] transition-all text-right"
        >
          <span className="text-[10px] uppercase tracking-wider text-[#5a5a76]">Next</span>
          <span className="flex items-center gap-2 text-[#f1f1f7] font-medium text-sm">
            {next.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      ) : <div />}
    </nav>
  )
}

export function PillarCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: DocsIconName
  title: string
  desc: string
  color: string
}) {
  const Icon = docsIconMap[icon] || Compass
  return (
    <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4 not-prose">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
        style={{ background: `${color}15` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <p className="text-[#f1f1f7] font-semibold text-sm">{title}</p>
      <p className="text-[#5a5a76] text-xs mt-0.5">{desc}</p>
    </div>
  )
}
