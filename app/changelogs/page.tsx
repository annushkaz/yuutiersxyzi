'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ScrollText,
  Loader2,
  X,
  Calendar,
  Tag,
  Search,
  ExternalLink,
  Sparkles,
  Bug,
  Box,
  Filter,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { cn } from '@/lib/utils'

interface PatchEntry {
  title: string
  version: string
  type: string // "release" | "snapshot"
  image: { url: string; title: string } | null
  contentPath: string
  id: string
  date: string
  shortText: string
}

interface PatchDetail {
  title: string
  version: string
  body: string
  date?: string
  type?: string
  image?: { url: string; title: string }
}

async function fetchIndex(platform: 'java' | 'bedrock'): Promise<PatchEntry[]> {
  const res = await fetch(`/api/changelogs?type=${platform}`)
  if (!res.ok) throw new Error('Failed to fetch changelogs')
  const data = await res.json()
  return data.entries || []
}

async function fetchDetail(contentPath: string): Promise<PatchDetail> {
  const res = await fetch(`/api/changelogs?id=${encodeURIComponent(contentPath)}`)
  if (!res.ok) throw new Error('Failed to fetch detail')
  return res.json()
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return new Date(date).toLocaleDateString()
}

const TYPE_FILTERS = [
  { id: 'all', label: 'All', icon: ScrollText },
  { id: 'release', label: 'Releases', icon: Box },
  { id: 'snapshot', label: 'Snapshots', icon: Sparkles },
  { id: 'pre_release', label: 'Pre-releases', icon: Bug },
  { id: 'release_candidate', label: 'Release Candidates', icon: Tag },
]

export default function ChangelogsPage() {
  const [platform, setPlatform] = useState<'java' | 'bedrock'>('java')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<PatchEntry | null>(null)

  const { data: entries = [], isLoading, error } = useQuery({
    queryKey: ['changelogs', platform],
    queryFn: () => fetchIndex(platform),
    staleTime: 5 * 60 * 1000,
  })

  const { data: detail, isLoading: loadingDetail } = useQuery({
    queryKey: ['changelog-detail', selected?.contentPath],
    queryFn: () => fetchDetail(selected!.contentPath),
    enabled: !!selected,
    staleTime: 60 * 60 * 1000,
  })

  const filtered = entries.filter((e) => {
    const entryType = e.type || 'release'
    if (typeFilter !== 'all' && entryType !== typeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        (e.title || '').toLowerCase().includes(q) ||
        (e.version || '').toLowerCase().includes(q) ||
        (e.shortText || '').toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated diagonal background */}
      <div className="fixed inset-0 pointer-events-none diagonal-bg opacity-80" aria-hidden />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="diagonal-bg-orb-a" />
        <div className="diagonal-bg-orb-b" />
      </div>
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(5,5,8,0.5),rgba(5,5,8,0.9))]" aria-hidden />

      <Navbar />

      <main className="relative z-10 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] text-xs font-medium mb-4">
              <ScrollText className="w-3.5 h-3.5" />
              Live from Mojang
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f1f1f7] mb-3 text-balance">
              Minecraft Changelogs
            </h1>
            <p className="text-[#8a8aa3] max-w-2xl mx-auto text-pretty">
              Every official patch note from Mojang &mdash; releases, snapshots, pre-releases and
              release candidates. Updated in real time straight from the Minecraft launcher feed.
            </p>
          </motion.div>

          {/* Platform tabs + search */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-center gap-1 p-1 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] w-fit mx-auto">
              {(['java', 'bedrock'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPlatform(p)
                    setTypeFilter('all')
                  }}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize',
                    platform === p
                      ? 'bg-[#f59e0b] text-[#0a0a0f]'
                      : 'text-[#8a8aa3] hover:text-[#f1f1f7]',
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a76]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by version, title or content"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-sm text-[#f1f1f7] placeholder:text-[#5a5a76] focus:border-[#f59e0b]/40 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] overflow-x-auto scrollbar-hide">
                {TYPE_FILTERS.map((t) => {
                  const Icon = t.icon
                  const active = typeFilter === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTypeFilter(t.id)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                        active
                          ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30'
                          : 'text-[#8a8aa3] hover:text-[#f1f1f7] border border-transparent',
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* List */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#f59e0b] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-[#ef4444]">
              <Filter className="w-8 h-8 mx-auto mb-3 opacity-50" />
              Failed to load Mojang patch notes. Please try again.
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-[#5a5a76] text-sm">
              No matching changelogs.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((entry, i) => (
                <motion.button
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3) }}
                  onClick={() => setSelected(entry)}
                  className="group text-left rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[#f59e0b]/30 hover:bg-[rgba(255,255,255,0.04)] overflow-hidden transition-all"
                >
                  <div className="relative aspect-video bg-[#07070b] overflow-hidden">
                    {entry.image?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={entry.image.url}
                        alt={entry.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#5a5a76]">
                        <ScrollText className="w-10 h-10 opacity-40" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0a0a0f]/80 backdrop-blur border border-[rgba(255,255,255,0.08)] text-[10px] font-medium text-[#f1f1f7] uppercase tracking-wide">
                      {(entry.type || 'release').replace(/_/g, ' ')}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#0a0a0f]/80 backdrop-blur border border-[rgba(255,255,255,0.08)] text-[10px] font-mono text-[#f59e0b]">
                      {entry.version || ''}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#f1f1f7] mb-1.5 line-clamp-1">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-[#8a8aa3] line-clamp-2 leading-relaxed mb-3">
                      {entry.shortText}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#5a5a76]">
                      <Calendar className="w-3 h-3" />
                      {entry.date ? timeAgo(entry.date) : '—'}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
          >
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl rounded-2xl bg-[#0a0a0f] border border-[rgba(255,255,255,0.08)] shadow-2xl mb-20"
            >
              {selected.image?.url && (
                <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-2xl bg-[#07070b]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.image.url}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                </div>
              )}

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#0a0a0f]/80 border border-[rgba(255,255,255,0.1)] text-[#8a8aa3] hover:text-[#f1f1f7] transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] font-mono">
                    {selected.version || ''}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#8a8aa3] uppercase tracking-wide">
                    {(selected.type || 'release').replace(/_/g, ' ')}
                  </span>
                  <span className="flex items-center gap-1 text-[#5a5a76]">
                    <Calendar className="w-3 h-3" />
                    {selected.date
                      ? new Date(selected.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f1f7] mb-6">
                  {selected.title}
                </h2>

                {loadingDetail ? (
                  <div className="flex items-center gap-2 text-[#8a8aa3] text-sm py-8">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading full patch notes...
                  </div>
                ) : detail?.body ? (
                  <div
                    className="wiki-rendered-content"
                    dangerouslySetInnerHTML={{ __html: detail.body }}
                  />
                ) : (
                  <p className="text-[#c0c0d0] leading-relaxed">{selected.shortText}</p>
                )}

                <a
                  href={`https://www.minecraft.net/en-us/article/minecraft-${(selected.version || '')
                    .replace(/[. ]/g, '-')
                    .toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] text-sm font-medium hover:bg-[#f59e0b]/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open on minecraft.net
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
