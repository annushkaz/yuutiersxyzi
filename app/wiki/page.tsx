'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  ExternalLink,
  Loader2,
  Box,
  Sword,
  Skull,
  TreePine,
  Castle,
  Sparkles,
  FlaskConical,
  Cog,
  RefreshCw,
  TrendingUp,
  FileText,
  ChevronRight,
  History,
} from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { useTranslation } from '@/components/i18n-provider'

interface WikiSearchResult {
  pageid: number
  title: string
  snippet: string
  timestamp: string
  size: number
}

interface WikiRecentChange {
  title: string
  timestamp: string
  user: string
  comment: string
  newlen?: number
  oldlen?: number
}

interface WikiArticleSummary {
  title: string
  extract: string
  thumbnail?: { source: string; width: number; height: number }
  fullurl: string
}

const categories = [
  { id: 'blocks', label: 'Bloques', labelEn: 'Blocks', icon: Box, color: '#22c55e', wikiCategory: 'Bloques' },
  { id: 'items', label: 'Objetos', labelEn: 'Items', icon: Sword, color: '#3b82f6', wikiCategory: 'Objetos' },
  { id: 'mobs', label: 'Mobs', labelEn: 'Mobs', icon: Skull, color: '#ef4444', wikiCategory: 'Criaturas' },
  { id: 'biomes', label: 'Biomas', labelEn: 'Biomes', icon: TreePine, color: '#10b981', wikiCategory: 'Biomas' },
  { id: 'structures', label: 'Estructuras', labelEn: 'Structures', icon: Castle, color: '#f59e0b', wikiCategory: 'Estructuras_generadas' },
  { id: 'enchantments', label: 'Encantamientos', labelEn: 'Enchantments', icon: Sparkles, color: '#a78bfa', wikiCategory: 'Encantamientos' },
  { id: 'potions', label: 'Pociones', labelEn: 'Potions', icon: FlaskConical, color: '#ec4899', wikiCategory: 'Pociones' },
  { id: 'mechanics', label: 'Mecánicas', labelEn: 'Mechanics', icon: Cog, color: '#6366f1', wikiCategory: 'Mecánicas_de_juego' },
]

async function searchWiki(query: string): Promise<WikiSearchResult[]> {
  const res = await fetch(`/api/wiki?action=search&search=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Failed to search')
  const data = await res.json()
  return data.query?.search || []
}

async function getRecentChanges(): Promise<WikiRecentChange[]> {
  const res = await fetch('/api/wiki?list=recentchanges')
  if (!res.ok) throw new Error('Failed to fetch recent changes')
  const data = await res.json()
  return data.query?.recentchanges || []
}

async function getCategoryArticles(category: string): Promise<{ title: string; timestamp: string }[]> {
  const res = await fetch(`/api/wiki?list=categorymembers&category=${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('Failed to fetch category')
  const data = await res.json()
  return data.query?.categorymembers || []
}

async function getArticleSummary(title: string): Promise<WikiArticleSummary | null> {
  const res = await fetch(`/api/wiki?action=summary&titles=${encodeURIComponent(title)}`)
  if (!res.ok) throw new Error('Failed to fetch summary')
  const data = await res.json()
  const pages = data.query?.pages
  if (!pages) return null
  const pageId = Object.keys(pages)[0]
  if (pageId === '-1') return null
  const page = pages[pageId]
  return {
    title: page.title,
    extract: page.extract || '',
    thumbnail: page.thumbnail,
    fullurl: page.fullurl || `https://es.minecraft.wiki/w/${encodeURIComponent(page.title)}`,
  }
}

export default function WikiPage() {
  const { t, locale } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Search results
  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ['wiki-search', debouncedQuery],
    queryFn: () => searchWiki(debouncedQuery),
    enabled: debouncedQuery.length > 2,
    staleTime: 30000,
  })

  // Recent changes
  const { data: recentChanges, isLoading: recentLoading, refetch: refetchRecent } = useQuery({
    queryKey: ['wiki-recent'],
    queryFn: getRecentChanges,
    staleTime: 60000,
    refetchInterval: 60000, // Auto-refresh every minute
  })

  // Category articles
  const { data: categoryArticles, isLoading: categoryLoading } = useQuery({
    queryKey: ['wiki-category', selectedCategory],
    queryFn: () => getCategoryArticles(selectedCategory!),
    enabled: !!selectedCategory,
    staleTime: 60000,
  })

  // Article summary
  const { data: articleSummary, isLoading: summaryLoading } = useQuery({
    queryKey: ['wiki-summary', selectedArticle],
    queryFn: () => getArticleSummary(selectedArticle!),
    enabled: !!selectedArticle,
    staleTime: 60000,
  })

  const isSearching = debouncedQuery.length > 2

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-20">
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/20 via-[#3b82f6]/10 to-[#a78bfa]/20"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
          <div className="absolute inset-0 laby-dots opacity-40" aria-hidden />
        </div>

        <div className="absolute inset-x-0 top-32 sm:top-36">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-semibold mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                {t('wiki.source')}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f1f1f7] mb-3">
                {t('wiki.title')}
              </h1>
              <p className="text-[#8a8aa3] text-lg max-w-2xl mx-auto">
                {t('wiki.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="relative -mt-8 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a5a76]" />
              <input
                type="text"
                placeholder={t('wiki.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.08)] text-[#f1f1f7] placeholder-[#5a5a76] focus:outline-none focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
              />
              {searchLoading && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3b82f6] animate-spin" />
              )}
            </div>
          </motion.div>

          {/* Search results */}
          <AnimatePresence mode="wait">
            {isSearching && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8"
              >
                <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.05)]">
                    <h2 className="text-sm font-semibold text-[#f1f1f7]">
                      {searchLoading ? t('common.loading') : `${searchResults?.length || 0} resultados`}
                    </h2>
                  </div>
                  <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                    {searchResults?.map((result) => (
                      <SearchResultItem
                        key={result.pageid}
                        result={result}
                        onClick={() => setSelectedArticle(result.title)}
                      />
                    ))}
                    {!searchLoading && searchResults?.length === 0 && (
                      <div className="py-12 text-center text-[#5a5a76]">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories grid */}
          {!isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-lg font-semibold text-[#f1f1f7] mb-4 flex items-center gap-2">
                <Box className="w-5 h-5 text-[#3b82f6]" />
                {locale === 'es' ? 'Categorías' : 'Categories'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  const isActive = selectedCategory === cat.wikiCategory
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(isActive ? null : cat.wikiCategory)}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-[#0e0e15] border-[rgba(255,255,255,0.15)]'
                          : 'bg-[#0e0e15]/50 border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${cat.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: cat.color }} />
                      </div>
                      <span className="text-sm font-medium text-[#f1f1f7]">
                        {locale === 'es' ? cat.label : cat.labelEn}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Category articles */}
          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.05)]">
                    <h2 className="text-sm font-semibold text-[#f1f1f7]">
                      {locale === 'es' ? 'Artículos en esta categoría' : 'Articles in this category'}
                    </h2>
                    {categoryLoading && <Loader2 className="w-4 h-4 text-[#3b82f6] animate-spin" />}
                  </div>
                  <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                    {categoryArticles?.slice(0, 30).map((article) => (
                      <button
                        key={article.title}
                        onClick={() => setSelectedArticle(article.title)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] text-left transition-all group"
                      >
                        <FileText className="w-4 h-4 text-[#5a5a76] shrink-0" />
                        <span className="text-sm text-[#8a8aa3] group-hover:text-[#f1f1f7] truncate">
                          {article.title}
                        </span>
                        <ChevronRight className="w-3 h-3 text-[#5a5a76] ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Article preview modal */}
          <AnimatePresence>
            {selectedArticle && articleSummary && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setSelectedArticle(null)}
                />
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.08)] shadow-2xl"
                >
                  {articleSummary.thumbnail && (
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={articleSummary.thumbnail.source}
                        alt={articleSummary.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#f1f1f7] mb-3">
                      {articleSummary.title}
                    </h2>
                    <p className="text-[#8a8aa3] leading-relaxed mb-6">
                      {articleSummary.extract || 'No hay descripción disponible.'}
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href={articleSummary.fullurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold hover:bg-[#2563eb] transition-colors"
                      >
                        {t('wiki.readMore')}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setSelectedArticle(null)}
                        className="px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#8a8aa3] hover:text-[#f1f1f7] text-sm font-medium transition-all"
                      >
                        {t('common.back')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading state for article */}
          {selectedArticle && summaryLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-[#3b82f6] animate-spin" />
            </div>
          )}

          {/* Main content grid */}
          {!isSearching && (
            <div className="grid lg:grid-cols-[1fr,380px] gap-6">
              {/* Popular articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)]">
                    <TrendingUp className="w-4 h-4 text-[#22c55e]" />
                    <h2 className="text-sm font-semibold text-[#f1f1f7]">{t('wiki.popular')}</h2>
                  </div>
                  <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                    {popularArticles.map((article, i) => (
                      <PopularArticleItem
                        key={article.title}
                        article={article}
                        rank={i + 1}
                        onClick={() => setSelectedArticle(article.title)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Recent changes sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden sticky top-24">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-[#f59e0b]" />
                      <h2 className="text-sm font-semibold text-[#f1f1f7]">{t('wiki.recent')}</h2>
                    </div>
                    <button
                      onClick={() => refetchRecent()}
                      className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                      title="Refresh"
                    >
                      <RefreshCw className={`w-4 h-4 text-[#5a5a76] ${recentLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  <div className="divide-y divide-[rgba(255,255,255,0.05)] max-h-[500px] overflow-y-auto">
                    {recentChanges?.slice(0, 15).map((change, i) => (
                      <RecentChangeItem
                        key={`${change.title}-${i}`}
                        change={change}
                        onClick={() => setSelectedArticle(change.title)}
                      />
                    ))}
                    {recentLoading && (
                      <div className="py-8 flex justify-center">
                        <Loader2 className="w-6 h-6 text-[#3b82f6] animate-spin" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Source attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-[#5a5a76] text-sm">
              {t('wiki.source')} •{' '}
              <a
                href="https://es.minecraft.wiki/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3b82f6] hover:underline"
              >
                es.minecraft.wiki
              </a>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Popular articles (static list of commonly searched articles)
const popularArticles = [
  { title: 'Minecraft', desc: 'El juego principal' },
  { title: 'Creeper', desc: 'El icónico mob explosivo' },
  { title: 'Diamante', desc: 'El mineral más valioso' },
  { title: 'Netherita', desc: 'El material más fuerte' },
  { title: 'Ender Dragon', desc: 'El jefe final' },
  { title: 'Aldeano', desc: 'NPCs de comercio' },
  { title: 'Encantamiento', desc: 'Mejoras mágicas' },
  { title: 'Poción', desc: 'Efectos temporales' },
  { title: 'Bioma', desc: 'Ecosistemas del juego' },
  { title: 'Redstone', desc: 'Circuitos y mecanismos' },
]

function SearchResultItem({
  result,
  onClick,
}: {
  result: WikiSearchResult
  onClick: () => void
}) {
  // Clean HTML from snippet
  const cleanSnippet = result.snippet
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center shrink-0">
        <FileText className="w-5 h-5 text-[#3b82f6]" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[#f1f1f7] font-semibold text-sm group-hover:text-[#3b82f6] transition-colors">
          {result.title}
        </h3>
        <p className="text-[#5a5a76] text-xs mt-0.5 line-clamp-2">{cleanSnippet}</p>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-[#4a4a6a]">
          <span>{new Date(result.timestamp).toLocaleDateString()}</span>
          <span>{Math.round(result.size / 1000)}KB</span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-[#5a5a76] group-hover:text-[#3b82f6] group-hover:translate-x-1 transition-all mt-1" />
    </button>
  )
}

function PopularArticleItem({
  article,
  rank,
  onClick,
}: {
  article: { title: string; desc: string }
  rank: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors group"
    >
      <span className="w-6 h-6 rounded-lg bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e] text-xs font-bold">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-[#f1f1f7] font-medium text-sm group-hover:text-[#3b82f6] transition-colors">
          {article.title}
        </h3>
        <p className="text-[#5a5a76] text-xs">{article.desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-[#5a5a76] group-hover:text-[#3b82f6] transition-colors" />
    </button>
  )
}

function RecentChangeItem({
  change,
  onClick,
}: {
  change: WikiRecentChange
  onClick: () => void
}) {
  const timeAgo = getTimeAgo(change.timestamp)
  const sizeDiff = change.newlen && change.oldlen ? change.newlen - change.oldlen : 0

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center shrink-0">
        <Clock className="w-4 h-4 text-[#f59e0b]" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[#f1f1f7] font-medium text-xs group-hover:text-[#3b82f6] transition-colors truncate">
          {change.title}
        </h3>
        <p className="text-[#5a5a76] text-[10px] mt-0.5 truncate">
          {change.user} • {timeAgo}
        </p>
        {sizeDiff !== 0 && (
          <span className={`text-[10px] ${sizeDiff > 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
            {sizeDiff > 0 ? '+' : ''}{sizeDiff} bytes
          </span>
        )}
      </div>
    </button>
  )
}

function getTimeAgo(timestamp: string): string {
  const now = new Date()
  const then = new Date(timestamp)
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (diff < 60) return 'Hace unos segundos'
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`
  return `Hace ${Math.floor(diff / 86400)} días`
}
