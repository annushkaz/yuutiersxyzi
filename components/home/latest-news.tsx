'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Newspaper, ArrowRight, Clock, Sparkles, Radio } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/components/i18n-provider'

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

function getTagColor(tag: string | undefined | null): string {
  if (!tag) return '#8888aa'
  const t = tag.toLowerCase()
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

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function isNew(date: string): boolean {
  return Date.now() - new Date(date).getTime() < 7 * 24 * 60 * 60 * 1000
}

export function LatestNews() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery<NewsResponse>({
    queryKey: ['mojang-news-home'],
    queryFn: async () => {
      const res = await fetch('/api/mojang/news')
      if (!res.ok) throw new Error('Failed to fetch news')
      return res.json()
    },
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    staleTime: 30_000,
  })

  const articles = data?.articles?.slice(0, 6) || []

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Newspaper className="w-5 h-5 text-[#3b82f6]" />
              <span className="text-[#3b82f6] text-sm font-medium uppercase tracking-wide">
                Mojang News
              </span>
              <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs">
                <Radio className="w-3 h-3 animate-pulse" />
                Live
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f8]">
              {t('home.news.title')}
            </h2>
            <p className="text-[#8888aa] mt-2">
              Pulled live from minecraft.net and the Mojang launcher feed
            </p>
          </motion.div>
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors group"
          >
            {t('home.news.viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] overflow-hidden"
              >
                <div className="aspect-video bg-[#16161f] animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-[#16161f] rounded animate-pulse w-1/3" />
                  <div className="h-5 bg-[#16161f] rounded animate-pulse" />
                  <div className="h-5 bg-[#16161f] rounded animate-pulse w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item, i) => {
              const color = getTagColor(item.category)
              return (
                <motion.a
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#16161f]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Newspaper className="w-12 h-12 text-[#4a4a6a]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16] via-transparent to-transparent" />
                    {isNew(item.publishDate) && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-[#3b82f6]/90 backdrop-blur text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        NEW
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      {item.category && (
                        <span
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{
                            backgroundColor: `${color}20`,
                            color: color,
                          }}
                        >
                          {item.category}
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-[#4a4a6a] text-xs">
                        <Clock className="w-3 h-3" />
                        {timeAgo(item.publishDate)}
                      </div>
                    </div>
                    <h3 className="text-[#f0f0f8] font-semibold mb-2 line-clamp-2 group-hover:text-[#3b82f6] transition-colors text-balance">
                      {item.title}
                    </h3>
                    {item.subHeader && (
                      <p className="text-[#8888aa] text-sm line-clamp-2">{item.subHeader}</p>
                    )}
                  </div>
                </motion.a>
              )
            })}
          </div>
        )}

        <div className="mt-8 md:hidden text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
          >
            {t('home.news.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
