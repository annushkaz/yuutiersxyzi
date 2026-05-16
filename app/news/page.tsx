'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Newspaper,
  Search,
  Filter,
  Clock,
  Radio,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Bell,
  BellOff,
} from 'lucide-react'
import Image from 'next/image'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

interface Article {
  id: string
  title: string
  subHeader: string
  image: string
  category: string
  publishDate: string
  url: string
  source: 'minecraft.net' | 'mojang-launcher'
}

interface NewsResponse {
  articles: Article[]
  fetchedAt: string
  count: number
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getTagColor(tag: string): string {
  const t = (tag || '').toLowerCase()
  if (t.includes('snapshot') || t.includes('beta')) return '#3b82f6'
  if (t.includes('release') || t.includes('update')) return '#22c55e'
  if (t.includes('community') || t.includes('event')) return '#7c3aed'
  if (t.includes('java')) return '#ef4444'
  if (t.includes('bedrock')) return '#f59e0b'
  if (t.includes('dungeons')) return '#f97316'
  if (t.includes('legends')) return '#ec4899'
  if (t.includes('marketplace') || t.includes('skin')) return '#10b981'
  return '#3b82f6'
}

export default function NewsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [notifications, setNotifications] = useState(false)
  const [lastSeenId, setLastSeenId] = useState<string | null>(null)

  const { data, isLoading, isFetching, refetch, dataUpdatedAt } = useQuery<NewsResponse>({
    queryKey: ['mojang-news-full'],
    queryFn: async () => {
      const res = await fetch('/api/mojang/news')
      if (!res.ok) throw new Error('Failed to fetch news')
      return res.json()
    },
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })

  const articles = useMemo(() => data?.articles || [], [data])

  useEffect(() => {
    if (!articles.length) return
    if (!lastSeenId) {
      setLastSeenId(articles[0].id)
      return
    }
    if (articles[0].id !== lastSeenId && notifications) {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('New Minecraft news', {
          body: articles[0].title,
          icon: '/favicon.ico',
        })
      }
      setLastSeenId(articles[0].id)
    }
  }, [articles, lastSeenId, notifications])

  const toggleNotifications = async () => {
    if (!notifications && typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') setNotifications(true)
    } else {
      setNotifications(false)
    }
  }

  const categories = useMemo(() => {
    const set = new Set<string>()
    articles.forEach(a => a.category && set.add(a.category))
    return ['all', ...Array.from(set)]
  }, [articles])

  const filtered = useMemo(() => {
    let out = articles
    if (category !== 'all') {
      out = out.filter(a => a.category === category)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      out = out.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.subHeader.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      )
    }
    return out
  }, [articles, search, category])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] flex items-center justify-center">
                  <Newspaper className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#f0f0f8]">News Center</h1>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-medium">
                      <Radio className="w-3 h-3 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-[#8888aa] mt-1 text-sm">
                    Real-time Minecraft news, snapshots & updates
                    {dataUpdatedAt && (
                      <span className="ml-2 text-[#4a4a6a]">
                        · Updated {timeAgo(new Date(dataUpdatedAt).toISOString())}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleNotifications}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                    notifications
                      ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]'
                      : 'bg-[#0f0f16] border-[rgba(255,255,255,0.08)] text-[#8888aa] hover:text-[#f0f0f8]'
                  }`}
                >
                  {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  <span className="hidden sm:inline text-sm font-medium">
                    {notifications ? 'Alerts on' : 'Get alerts'}
                  </span>
                </button>
                <button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] text-[#8888aa] hover:text-[#f0f0f8] transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline text-sm font-medium">Refresh</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a4a6a]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search news..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] text-[#f0f0f8] placeholder-[#4a4a6a] outline-none focus:border-[#3b82f6] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
              <div className="flex items-center gap-1.5 text-[#4a4a6a] text-xs uppercase tracking-wide whitespace-nowrap mr-2 shrink-0">
                <Filter className="w-3 h-3" />
                Filter
              </div>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    category === c
                      ? 'bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30'
                      : 'bg-[#0f0f16] text-[#8888aa] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)]'
                  }`}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3 aspect-[2/1] bg-[#0f0f16] rounded-2xl animate-pulse" />
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] h-72 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-12 h-12 text-[#4a4a6a] mx-auto mb-4" />
              <p className="text-[#8888aa]">No articles match your filters</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {featured && (
                <motion.a
                  layout
                  key={`featured-${featured.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block mb-8 rounded-3xl overflow-hidden bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] hover:border-[#3b82f6]/40 transition-all"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative aspect-video lg:aspect-auto overflow-hidden bg-[#16161f]">
                      {featured.image && (
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          unoptimized
                          priority
                        />
                      )}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-[#3b82f6] text-white text-xs font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          FEATURED
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        {featured.category && (
                          <span
                            className="px-2.5 py-0.5 rounded-md text-xs font-semibold"
                            style={{
                              backgroundColor: `${getTagColor(featured.category)}20`,
                              color: getTagColor(featured.category),
                            }}
                          >
                            {featured.category}
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-[#4a4a6a] text-xs">
                          <Clock className="w-3 h-3" />
                          {timeAgo(featured.publishDate)}
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#f0f0f8] mb-4 group-hover:text-[#3b82f6] transition-colors text-balance">
                        {featured.title}
                      </h2>
                      <p className="text-[#8888aa] mb-6 line-clamp-3">{featured.subHeader}</p>
                      <div className="inline-flex items-center gap-2 text-[#3b82f6] font-medium">
                        Read article
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((item, i) => {
                  const color = getTagColor(item.category)
                  return (
                    <motion.a
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.3) }}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl overflow-hidden bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] transition-all hover:-translate-y-1"
                    >
                      <div className="relative aspect-video overflow-hidden bg-[#16161f]">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Newspaper className="w-10 h-10 text-[#4a4a6a]" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          {item.category && (
                            <span
                              className="px-2 py-0.5 rounded text-xs font-medium"
                              style={{ backgroundColor: `${color}20`, color }}
                            >
                              {item.category}
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-[#4a4a6a] text-xs">
                            <Clock className="w-3 h-3" />
                            {timeAgo(item.publishDate)}
                          </div>
                        </div>
                        <h3 className="text-[#f0f0f8] font-semibold mb-2 line-clamp-2 group-hover:text-[#3b82f6] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[#8888aa] text-sm line-clamp-2">{item.subHeader}</p>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </AnimatePresence>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
