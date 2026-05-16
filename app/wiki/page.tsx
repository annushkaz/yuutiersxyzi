'use client'

import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  BookOpen,
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
  X,
  Clock,
  User,
  Hash,
  Layers,
  Gem,
  Flame,
  Zap,
  ShieldCheck,
  Pickaxe,
  Map,
  Compass,
  Star,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
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
  type?: string
}

interface WikiArticle {
  title: string
  extract: string
  fullExtract?: string
  thumbnail?: { source: string; width: number; height: number }
  fullurl: string
  categories?: { title: string }[]
  revisions?: { timestamp: string; user: string }[]
}

interface WikiParseResult {
  title: string
  text: { '*': string }
  sections: { level: string; line: string; number: string; index: string }[]
  categories: { '*': string }[]
  images: string[]
}

const categories = [
  { id: 'blocks', label: 'Bloques', labelEn: 'Blocks', icon: Box, color: '#22c55e', wikiCategory: 'Bloques', description: 'Todos los bloques del juego' },
  { id: 'items', label: 'Objetos', labelEn: 'Items', icon: Sword, color: '#3b82f6', wikiCategory: 'Objetos', description: 'Items y herramientas' },
  { id: 'mobs', label: 'Criaturas', labelEn: 'Mobs', icon: Skull, color: '#ef4444', wikiCategory: 'Criaturas', description: 'Mobs hostiles y pasivos' },
  { id: 'biomes', label: 'Biomas', labelEn: 'Biomes', icon: TreePine, color: '#10b981', wikiCategory: 'Biomas', description: 'Biomas del mundo' },
  { id: 'structures', label: 'Estructuras', labelEn: 'Structures', icon: Castle, color: '#f59e0b', wikiCategory: 'Estructuras_generadas', description: 'Estructuras generadas' },
  { id: 'enchantments', label: 'Encantamientos', labelEn: 'Enchantments', icon: Sparkles, color: '#a78bfa', wikiCategory: 'Encantamientos', description: 'Encantamientos disponibles' },
  { id: 'potions', label: 'Pociones', labelEn: 'Potions', icon: FlaskConical, color: '#ec4899', wikiCategory: 'Pociones', description: 'Pociones y efectos' },
  { id: 'ores', label: 'Minerales', labelEn: 'Ores', icon: Gem, color: '#06b6d4', wikiCategory: 'Minerales', description: 'Minerales y recursos' },
  { id: 'redstone', label: 'Redstone', labelEn: 'Redstone', icon: Zap, color: '#dc2626', wikiCategory: 'Redstone', description: 'Circuitos y mecanismos' },
  { id: 'combat', label: 'Combate', labelEn: 'Combat', icon: ShieldCheck, color: '#f97316', wikiCategory: 'Combate', description: 'Sistema de combate' },
  { id: 'dimensions', label: 'Dimensiones', labelEn: 'Dimensions', icon: Layers, color: '#8b5cf6', wikiCategory: 'Dimensiones', description: 'Overworld, Nether, End' },
  { id: 'mechanics', label: 'Mecánicas', labelEn: 'Mechanics', icon: Cog, color: '#6366f1', wikiCategory: 'Mecánicas_de_juego', description: 'Mecánicas del juego' },
]

const featuredArticles = [
  { title: 'Minecraft', desc: 'El juego principal', icon: Pickaxe },
  { title: 'Creeper', desc: 'El mob más icónico', icon: Skull },
  { title: 'Diamante', desc: 'El mineral más valioso', icon: Gem },
  { title: 'Ender Dragon', desc: 'El jefe final', icon: Flame },
  { title: 'Netherita', desc: 'El material más fuerte', icon: ShieldCheck },
  { title: 'Encantamiento', desc: 'Sistema de mejoras', icon: Sparkles },
  { title: 'Portal del Nether', desc: 'Acceso al Nether', icon: Layers },
  { title: 'Aldeano', desc: 'NPC comerciante', icon: User },
]

// Parse MediaWiki markup to HTML/JSX
function parseWikiContent(text: string): string {
  if (!text) return ''
  
  let parsed = text
  
  // Headers: == Header == -> <h2>, === Header === -> <h3>, etc.
  parsed = parsed.replace(/^======\s*(.+?)\s*======$/gm, '<h6 class="text-sm font-semibold text-[#f1f1f7] mt-4 mb-2">$1</h6>')
  parsed = parsed.replace(/^=====\s*(.+?)\s*=====$/gm, '<h5 class="text-sm font-semibold text-[#f1f1f7] mt-4 mb-2">$1</h5>')
  parsed = parsed.replace(/^====\s*(.+?)\s*====$/gm, '<h4 class="text-base font-semibold text-[#f1f1f7] mt-5 mb-2">$1</h4>')
  parsed = parsed.replace(/^===\s*(.+?)\s*===$/gm, '<h3 class="text-lg font-semibold text-[#f1f1f7] mt-6 mb-3 pb-2 border-b border-[rgba(255,255,255,0.08)]">$1</h3>')
  parsed = parsed.replace(/^==\s*(.+?)\s*==$/gm, '<h2 class="text-xl font-bold text-[#f1f1f7] mt-8 mb-4 pb-2 border-b border-[rgba(255,255,255,0.1)]">$1</h2>')
  
  // Bold: '''text''' -> <strong>
  parsed = parsed.replace(/'''(.+?)'''/g, '<strong class="text-[#f1f1f7] font-semibold">$1</strong>')
  
  // Italic: ''text'' -> <em>
  parsed = parsed.replace(/''(.+?)''/g, '<em class="italic text-[#c0c0d0]">$1</em>')
  
  // Links: [[Link|Text]] or [[Link]]
  parsed = parsed.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<a href="#" class="text-[#3b82f6] hover:text-[#60a5fa] hover:underline">$2</a>')
  parsed = parsed.replace(/\[\[([^\]]+)\]\]/g, '<a href="#" class="text-[#3b82f6] hover:text-[#60a5fa] hover:underline">$1</a>')
  
  // External links: [url text]
  parsed = parsed.replace(/\[https?:\/\/[^\s\]]+\s+([^\]]+)\]/g, '<a href="#" class="text-[#3b82f6] hover:text-[#60a5fa] hover:underline" target="_blank" rel="noopener">$1</a>')
  
  // Lists: * item -> <li>
  parsed = parsed.replace(/^\*\s+(.+)$/gm, '<li class="ml-4 text-[#c0c0d0] list-disc">$1</li>')
  parsed = parsed.replace(/^#\s+(.+)$/gm, '<li class="ml-4 text-[#c0c0d0] list-decimal">$1</li>')
  
  // Clean up templates {{ }} - just remove them for now
  parsed = parsed.replace(/\{\{[^}]+\}\}/g, '')
  
  // Remove file/image references for now
  parsed = parsed.replace(/\[\[(Archivo|File|Imagen|Image):[^\]]+\]\]/gi, '')
  
  // Line breaks
  parsed = parsed.replace(/\n\n+/g, '</p><p class="text-[#c0c0d0] leading-relaxed mb-4">')
  
  // Wrap in paragraph
  if (parsed && !parsed.startsWith('<')) {
    parsed = '<p class="text-[#c0c0d0] leading-relaxed mb-4">' + parsed + '</p>'
  }
  
  return parsed
}

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

async function getFullArticle(title: string): Promise<WikiArticle | null> {
  const res = await fetch(`/api/wiki?action=fullsummary&titles=${encodeURIComponent(title)}`)
  if (!res.ok) throw new Error('Failed to fetch article')
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
    categories: page.categories,
    revisions: page.revisions,
  }
}

async function getArticleContent(title: string): Promise<WikiParseResult | null> {
  const res = await fetch(`/api/wiki?action=content&titles=${encodeURIComponent(title)}`)
  if (!res.ok) throw new Error('Failed to fetch content')
  const data = await res.json()
  return data.parse || null
}

async function getSectionContent(title: string, sectionIndex: string): Promise<string | null> {
  const res = await fetch(`/api/wiki?action=content&titles=${encodeURIComponent(title)}&section=${sectionIndex}`)
  if (!res.ok) throw new Error('Failed to fetch section')
  const data = await res.json()
  return data.parse?.text?.['*'] || null
}

// Parse and clean HTML from wiki to render properly
function cleanWikiHtml(html: string): string {
  if (!html) return ''

  let cleaned = html

  // Remove edit links / TOC / debug JSON / metadata wrappers
  cleaned = cleaned.replace(/<span class="mw-editsection">[\s\S]*?<\/span>/gi, '')
  cleaned = cleaned.replace(/<div[^>]*id="toc"[\s\S]*?<\/div>\s*<\/div>/gi, '')
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*toc[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi, '')
  cleaned = cleaned.replace(/<pre[^>]*class="[^"]*history-json[^"]*"[\s\S]*?<\/pre>/gi, '')
  cleaned = cleaned.replace(/<table[^>]*class="[^"]*navbox[^"]*"[\s\S]*?<\/table>/gi, '')
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*navigation-not-searchable[^"]*"[\s\S]*?<\/div>/gi, '')
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*mbox[^"]*"[\s\S]*?<\/div>/gi, '')
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*ambox[^"]*"[\s\S]*?<\/div>/gi, '')
  cleaned = cleaned.replace(/<div[^>]*class="[^"]*hatnote[^"]*"[\s\S]*?<\/div>/gi, '')
  cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, '')
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '')
  cleaned = cleaned.replace(/<link[^>]*\/?>/gi, '')

  // Remove "Esta página describe..." and similar disambig notes commonly at top
  cleaned = cleaned.replace(/<div[^>]*role="note"[\s\S]*?<\/div>/gi, '')

  // Fix image URLs — wiki returns various formats
  cleaned = cleaned.replace(/src="\/images\//g, 'src="https://es.minecraft.wiki/images/')
  cleaned = cleaned.replace(/src="\/\/(es\.)?minecraft\.wiki/g, 'src="https://$1minecraft.wiki')
  cleaned = cleaned.replace(/srcset="([^"]+)"/g, (_match, p1) => {
    const fixed = p1
      .replace(/(^|,\s*)\/images\//g, '$1https://es.minecraft.wiki/images/')
      .replace(/\/\/(es\.)?minecraft\.wiki/g, 'https://$1minecraft.wiki')
    return `srcset="${fixed}"`
  })
  cleaned = cleaned.replace(/data-src="\/images\//g, 'data-src="https://es.minecraft.wiki/images/')

  // Lazy-loaded images: promote data-src to src so they actually appear
  cleaned = cleaned.replace(/<img([^>]*?)data-src="([^"]+)"([^>]*?)>/gi, (_m, a, url, b) => {
    if (/\ssrc="/i.test(a + b)) return `<img${a}data-src="${url}"${b}>`
    return `<img${a}src="${url}"${b}>`
  })

  // YouTube
  cleaned = cleaned.replace(/src="\/\/www\.youtube\.com/g, 'src="https://www.youtube.com')
  cleaned = cleaned.replace(/src="\/\/youtube\.com/g, 'src="https://www.youtube.com')

  // Internal links to point to official wiki
  cleaned = cleaned.replace(/href="\/w\//g, 'href="https://es.minecraft.wiki/w/')
  cleaned = cleaned.replace(/href="\/wiki\//g, 'href="https://es.minecraft.wiki/wiki/')

  // Add target blank to external links
  cleaned = cleaned.replace(
    /<a([^>]*?)href="(https?:\/\/[^"]+)"([^>]*?)>/gi,
    (_m, a, url, b) => {
      if (/target=/i.test(a + b)) return `<a${a}href="${url}"${b}>`
      return `<a${a}target="_blank" rel="noopener noreferrer" href="${url}"${b}>`
    },
  )

  return cleaned
}

export default function WikiPage() {
  const { t, locale } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [showFullContent, setShowFullContent] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [sectionContents, setSectionContents] = useState<Record<string, string>>({})

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ['wiki-search', debouncedQuery],
    queryFn: () => searchWiki(debouncedQuery),
    enabled: debouncedQuery.length > 2,
    staleTime: 30000,
  })

  const { data: recentChanges, isLoading: recentLoading, refetch: refetchRecent } = useQuery({
    queryKey: ['wiki-recent'],
    queryFn: getRecentChanges,
    staleTime: 30000,
    refetchInterval: 30000,
  })

  const { data: categoryArticles, isLoading: categoryLoading } = useQuery({
    queryKey: ['wiki-category', selectedCategory],
    queryFn: () => getCategoryArticles(selectedCategory!),
    enabled: !!selectedCategory,
    staleTime: 60000,
  })

  const { data: articleData, isLoading: articleLoading } = useQuery({
    queryKey: ['wiki-article', selectedArticle],
    queryFn: () => getFullArticle(selectedArticle!),
    enabled: !!selectedArticle,
    staleTime: 60000,
  })

  const { data: articleContent, isLoading: contentLoading } = useQuery({
    queryKey: ['wiki-content', selectedArticle, showFullContent],
    queryFn: () => getArticleContent(selectedArticle!),
    enabled: !!selectedArticle && showFullContent,
    staleTime: 60000,
  })

  const isSearching = debouncedQuery.length > 2

  const toggleSection = async (index: string, sectionTitle: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
        // Fetch section content if not already loaded
        if (!sectionContents[index] && selectedArticle) {
          getSectionContent(selectedArticle, index).then(content => {
            if (content) {
              setSectionContents(prev => ({ ...prev, [index]: cleanWikiHtml(content) }))
            }
          })
        }
      }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-20">
        <div className="relative h-72 sm:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/20 via-[#3b82f6]/10 to-[#a78bfa]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
          <div className="absolute inset-0 laby-dots opacity-40" />
        </div>

        <div className="absolute inset-x-0 top-32 sm:top-36">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-semibold mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                {locale === 'es' ? 'Datos en tiempo real de es.minecraft.wiki' : 'Real-time data from es.minecraft.wiki'}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f1f1f7] mb-3">
                {locale === 'es' ? 'Wiki de Minecraft' : 'Minecraft Wiki'}
              </h1>
              <p className="text-[#8a8aa3] text-lg max-w-2xl mx-auto">
                {locale === 'es' 
                  ? 'Explora toda la información sobre Minecraft directamente desde la wiki oficial. Bloques, mobs, items, biomas y mucho más.'
                  : 'Explore all Minecraft information directly from the official wiki. Blocks, mobs, items, biomes and much more.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="relative -mt-6 pb-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                placeholder={locale === 'es' ? 'Buscar en la wiki... (ej: Creeper, Diamante, Nether)' : 'Search the wiki... (e.g., Creeper, Diamond, Nether)'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.08)] text-[#f1f1f7] placeholder-[#5a5a76] focus:outline-none focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
              />
              {searchLoading && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3b82f6] animate-spin" />
              )}
            </div>
          </motion.div>

          {/* Search Results */}
          <AnimatePresence mode="wait">
            {isSearching && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8"
              >
                <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div className="px-5 py-3 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-[#f1f1f7]">
                      {searchLoading ? (locale === 'es' ? 'Buscando...' : 'Searching...') : `${searchResults?.length || 0} ${locale === 'es' ? 'resultados' : 'results'}`}
                    </h2>
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-[#5a5a76] hover:text-[#f1f1f7]">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-[rgba(255,255,255,0.05)] max-h-[500px] overflow-y-auto">
                    {searchResults?.map((result) => (
                      <button
                        key={result.pageid}
                        onClick={() => {
                          setSelectedArticle(result.title)
                          setShowFullContent(false)
                          setSectionContents({})
                          setExpandedSections(new Set())
                        }}
                        className="w-full px-5 py-4 text-left hover:bg-[rgba(255,255,255,0.03)] transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[#f1f1f7] font-medium text-sm group-hover:text-[#3b82f6] transition-colors">
                              {result.title}
                            </h3>
                            <p 
                              className="text-[#5a5a76] text-xs mt-1 line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: result.snippet.replace(/<[^>]*>/g, ' ').substring(0, 150) + '...' }}
                            />
                            <div className="flex items-center gap-3 mt-2 text-[10px] text-[#4a4a6a]">
                              <span>{(result.size / 1024).toFixed(1)} KB</span>
                              <span>{new Date(result.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#5a5a76] group-hover:text-[#3b82f6] transition-colors" />
                        </div>
                      </button>
                    ))}
                    {!searchLoading && searchResults?.length === 0 && (
                      <div className="py-12 text-center text-[#5a5a76]">
                        {locale === 'es' ? 'No se encontraron resultados' : 'No results found'}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content when not searching */}
          {!isSearching && (
            <>
              {/* Featured Articles Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-8"
              >
                <h2 className="text-lg font-semibold text-[#f1f1f7] mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#f59e0b]" />
                  {locale === 'es' ? 'Artículos destacados' : 'Featured Articles'}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {featuredArticles.map((article) => {
                    const Icon = article.icon
                    return (
                      <button
                        key={article.title}
                        onClick={() => {
                          setSelectedArticle(article.title)
                          setShowFullContent(false)
                        }}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0e0e15]/50 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[#0e0e15] transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center group-hover:bg-[#3b82f6]/20 transition-colors">
                          <Icon className="w-5 h-5 text-[#3b82f6]" />
                        </div>
                        <span className="text-xs text-[#8a8aa3] group-hover:text-[#f1f1f7] text-center transition-colors">
                          {article.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Categories Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-lg font-semibold text-[#f1f1f7] mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#3b82f6]" />
                  {locale === 'es' ? 'Explorar por categoría' : 'Explore by Category'}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon
                    const isActive = selectedCategory === cat.wikiCategory
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(isActive ? null : cat.wikiCategory)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all min-w-0 ${
                          isActive
                            ? 'bg-[#0e0e15] border-[rgba(255,255,255,0.15)] ring-1 ring-[rgba(255,255,255,0.1)]'
                            : 'bg-[#0e0e15]/50 border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${cat.color}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: cat.color }} />
                        </div>
                        <div className="text-left min-w-0 flex-1">
                          <span className="text-sm font-medium text-[#f1f1f7] block truncate">
                            {locale === 'es' ? cat.label : cat.labelEn}
                          </span>
                          <span className="text-[10px] text-[#5a5a76] truncate block">
                            {cat.description}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Category Articles List */}
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
                          {locale === 'es' ? `Artículos en ${selectedCategory.replace(/_/g, ' ')}` : `Articles in ${selectedCategory.replace(/_/g, ' ')}`}
                          {categoryArticles && ` (${categoryArticles.length})`}
                        </h2>
                        <div className="flex items-center gap-2">
                          {categoryLoading && <Loader2 className="w-4 h-4 text-[#3b82f6] animate-spin" />}
                          <button onClick={() => setSelectedCategory(null)} className="text-[#5a5a76] hover:text-[#f1f1f7]">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto">
                        {categoryArticles?.slice(0, 60).map((article) => (
                          <button
                            key={article.title}
                            onClick={() => {
                              setSelectedArticle(article.title)
                              setShowFullContent(false)
                            }}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.05)] text-left transition-all group"
                          >
                            <FileText className="w-4 h-4 text-[#5a5a76] shrink-0" />
                            <span className="text-sm text-[#8a8aa3] group-hover:text-[#f1f1f7] truncate">
                              {article.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Two column layout: Info + Recent Changes */}
              <div className="grid lg:grid-cols-[1fr,380px] gap-6 overflow-hidden">
                {/* Left: Quick Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)]">
                      <Info className="w-4 h-4 text-[#3b82f6]" />
                      <h2 className="text-sm font-semibold text-[#f1f1f7]">
                        {locale === 'es' ? 'Información rápida' : 'Quick Information'}
                      </h2>
                    </div>
                    <div className="p-4 grid sm:grid-cols-2 gap-3">
                      <InfoCard
                        title={locale === 'es' ? 'Versión actual' : 'Current Version'}
                        value="1.21.4"
                        subtext={locale === 'es' ? 'Java Edition' : 'Java Edition'}
                        icon={Pickaxe}
                        color="#22c55e"
                      />
                      <InfoCard
                        title={locale === 'es' ? 'Última actualización' : 'Latest Update'}
                        value="Tricky Trials"
                        subtext="1.21"
                        icon={Sparkles}
                        color="#a78bfa"
                      />
                      <InfoCard
                        title={locale === 'es' ? 'Total de bloques' : 'Total Blocks'}
                        value="800+"
                        subtext={locale === 'es' ? 'Bloques únicos' : 'Unique blocks'}
                        icon={Box}
                        color="#3b82f6"
                      />
                      <InfoCard
                        title={locale === 'es' ? 'Total de mobs' : 'Total Mobs'}
                        value="80+"
                        subtext={locale === 'es' ? 'Criaturas' : 'Creatures'}
                        icon={Skull}
                        color="#ef4444"
                      />
                    </div>
                  </div>

                  {/* Dimensions quick access */}
                  <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)]">
                      <Map className="w-4 h-4 text-[#a78bfa]" />
                      <h2 className="text-sm font-semibold text-[#f1f1f7]">
                        {locale === 'es' ? 'Dimensiones' : 'Dimensions'}
                      </h2>
                    </div>
                    <div className="p-4 grid sm:grid-cols-3 gap-3">
                      <DimensionCard
                        title="Overworld"
                        desc={locale === 'es' ? 'El mundo principal' : 'The main world'}
                        color="#22c55e"
                        onClick={() => setSelectedArticle('El_Overworld')}
                      />
                      <DimensionCard
                        title="Nether"
                        desc={locale === 'es' ? 'Dimensión infernal' : 'Hellish dimension'}
                        color="#ef4444"
                        onClick={() => setSelectedArticle('El_Nether')}
                      />
                      <DimensionCard
                        title="The End"
                        desc={locale === 'es' ? 'Dimensión final' : 'Final dimension'}
                        color="#a78bfa"
                        onClick={() => setSelectedArticle('El_End')}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Right: Recent Changes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden sticky top-24 min-w-0">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)]">
                      <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-[#f59e0b]" />
                        <h2 className="text-sm font-semibold text-[#f1f1f7]">
                          {locale === 'es' ? 'Cambios recientes' : 'Recent Changes'}
                        </h2>
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-[10px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                          LIVE
                        </span>
                      </div>
                      <button
                        onClick={() => refetchRecent()}
                        className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                      >
                        <RefreshCw className={`w-4 h-4 text-[#5a5a76] ${recentLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                    <div className="divide-y divide-[rgba(255,255,255,0.05)] max-h-[500px] overflow-y-auto">
                      {recentChanges?.slice(0, 20).map((change, i) => (
                        <button
                          key={`${change.title}-${i}`}
                          onClick={() => {
                            setSelectedArticle(change.title)
                            setShowFullContent(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                        >
                                            <div className="flex items-start gap-2 min-w-0 max-w-full">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                              change.type === 'new' ? 'bg-[#22c55e]' : 'bg-[#3b82f6]'
                                            }`} />
                                            <div className="min-w-0 flex-1 overflow-hidden">
                                              <p className="text-sm text-[#f1f1f7] truncate max-w-full">{change.title}</p>
                              <div className="flex items-center gap-2 mt-1 text-[10px] text-[#5a5a76]">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {change.user}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTimeAgo(change.timestamp, locale)}
                                </span>
                              </div>
                                              {change.comment && (
                                                <p className="text-[10px] text-[#4a4a6a] mt-1 truncate max-w-full overflow-hidden text-ellipsis">{change.comment.substring(0, 100)}</p>
                                              )}
                            </div>
                          </div>
                        </button>
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
            </>
          )}

          {/* Article Modal */}
          <AnimatePresence>
            {selectedArticle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto"
              >
                <div
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => {
                    setSelectedArticle(null)
                    setShowFullContent(false)
                  }}
                />
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  className="relative w-full max-w-4xl rounded-2xl bg-[#0a0a0f] border border-[rgba(255,255,255,0.08)] shadow-2xl mb-20"
                >
                  {articleLoading ? (
                    <div className="flex items-center justify-center py-32">
                      <Loader2 className="w-8 h-8 text-[#3b82f6] animate-spin" />
                    </div>
                  ) : articleData ? (
                    <>
                      {/* Article Header */}
                      {articleData.thumbnail && (
                        <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-2xl bg-[#07070b]">
                          {/* Blurred background fill */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={articleData.thumbnail.source}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-125 blur-2xl"
                          />
                          {/* Main image - contained, not stretched */}
                          <div className="absolute inset-0 flex items-center justify-center p-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={articleData.thumbnail.source}
                              alt={articleData.title}
                              className="max-w-full max-h-full object-contain pixelated drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent pointer-events-none" />
                        </div>
                      )}

                      {/* Close button */}
                      <button
                        onClick={() => {
                          setSelectedArticle(null)
                          setShowFullContent(false)
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-[#0a0a0f]/80 border border-[rgba(255,255,255,0.1)] text-[#8a8aa3] hover:text-[#f1f1f7] transition-colors z-10"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="p-6 sm:p-8">
                        {/* Title and meta */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f1f7] mb-3">
                          {articleData.title}
                        </h2>

                        {articleData.revisions?.[0] && (
                          <div className="flex items-center gap-4 mb-6 text-xs text-[#5a5a76]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(articleData.revisions[0].timestamp).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {articleData.revisions[0].user}
                            </span>
                          </div>
                        )}

                        {/* Article content */}
                        <div className="prose prose-invert prose-sm max-w-none">
                          <div 
                            className="wiki-content"
                            dangerouslySetInnerHTML={{ 
                              __html: parseWikiContent(articleData.extract) || 
                                (locale === 'es' ? '<p class="text-[#c0c0d0]">No hay descripción disponible.</p>' : '<p class="text-[#c0c0d0]">No description available.</p>') 
                            }}
                          />
                        </div>

                        {/* Full content toggle */}
                        {!showFullContent && (
                          <button
                            onClick={() => setShowFullContent(true)}
                            className="mt-6 flex items-center gap-2 text-[#3b82f6] hover:text-[#60a5fa] text-sm font-medium transition-colors"
                          >
                            {contentLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                            {locale === 'es' ? 'Ver contenido completo' : 'View full content'}
                          </button>
                        )}

                        {/* Full parsed content */}
                        {showFullContent && articleContent && (
                          <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)]">
                            {/* Full HTML rendered content */}
                            {articleContent.text?.['*'] && (
                              <div className="mb-8">
                                <h3 className="text-sm font-semibold text-[#f1f1f7] mb-3 flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-[#22c55e]" />
                                  {locale === 'es' ? 'Contenido completo' : 'Full Content'}
                                </h3>
                                <div
                                  className="wiki-rendered-content"
                                  dangerouslySetInnerHTML={{ __html: cleanWikiHtml(articleContent.text['*']) }}
                                />
                              </div>
                            )}

                            {/* Sections (table of contents) */}
                            {articleContent.sections?.length > 0 && (
                              <div className="mb-6">
                                <h3 className="text-sm font-semibold text-[#f1f1f7] mb-3 flex items-center gap-2">
                                  <Hash className="w-4 h-4 text-[#3b82f6]" />
                                  {locale === 'es' ? 'Tabla de contenidos' : 'Table of Contents'}
                                </h3>
                                <div className="space-y-2">
                                  {articleContent.sections.filter(s => s.level === '2').map((section) => (
                                    <div key={section.index} className="rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden">
                                      <button
                                        onClick={() => toggleSection(section.index, section.line)}
                                        className="w-full flex items-center justify-between px-4 py-3 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] text-left transition-colors"
                                      >
                                        <span className="text-sm font-medium text-[#f1f1f7]">{section.line}</span>
                                        {expandedSections.has(section.index) ? (
                                          <ChevronUp className="w-4 h-4 text-[#3b82f6]" />
                                        ) : (
                                          <ChevronDown className="w-4 h-4 text-[#5a5a76]" />
                                        )}
                                      </button>
                                      {expandedSections.has(section.index) && (
                                        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.06)] bg-[#07070b]">
                                          {sectionContents[section.index] ? (
                                            <div
                                              className="wiki-rendered-content"
                                              dangerouslySetInnerHTML={{ __html: sectionContents[section.index] }}
                                            />
                                          ) : (
                                            <div className="flex items-center gap-2 text-[#5a5a76] text-sm py-2">
                                              <Loader2 className="w-4 h-4 animate-spin" />
                                              {locale === 'es' ? 'Cargando contenido...' : 'Loading content...'}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Categories */}
                            {articleContent.categories?.length > 0 && (
                              <div className="mb-6">
                                <h3 className="text-sm font-semibold text-[#f1f1f7] mb-3 flex items-center gap-2">
                                  <Layers className="w-4 h-4 text-[#a78bfa]" />
                                  {locale === 'es' ? 'Categorías' : 'Categories'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {articleContent.categories.slice(0, 10).map((cat) => (
                                    <span
                                      key={cat['*']}
                                      className="px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.05)] text-[#8a8aa3] text-xs"
                                    >
                                      {cat['*'].replace('Categoría:', '')}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Images */}
                            {articleContent.images?.length > 0 && (
                              <div>
                                <h3 className="text-sm font-semibold text-[#f1f1f7] mb-3 flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-[#22c55e]" />
                                  {locale === 'es' ? 'Imágenes relacionadas' : 'Related Images'}
                                </h3>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                  {articleContent.images.slice(0, 12).filter(img => 
                                    !img.includes('Sprite') && 
                                    !img.includes('Icon') &&
                                    (img.endsWith('.png') || img.endsWith('.gif') || img.endsWith('.jpg') || img.endsWith('.webp'))
                                  ).map((img) => {
                                    const cleanName = img.replace('Archivo:', '').replace('File:', '')
                                    const imageUrl = `https://es.minecraft.wiki/images/${encodeURIComponent(cleanName.replace(/ /g, '_'))}`
                                    return (
                                      <div
                                        key={img}
                                        className="aspect-square rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] overflow-hidden flex items-center justify-center p-1"
                                      >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                          src={imageUrl}
                                          alt={cleanName}
                                          className="max-w-full max-h-full object-contain pixelated"
                                          onError={(e) => {
                                            const target = e.currentTarget
                                            target.style.display = 'none'
                                            const parent = target.parentElement
                                            if (parent) {
                                              parent.innerHTML = `<span class="text-[8px] text-[#4a4a6a] text-center px-1 break-all">${cleanName.substring(0, 20)}...</span>`
                                            }
                                          }}
                                        />
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => setShowFullContent(false)}
                              className="mt-6 flex items-center gap-2 text-[#5a5a76] hover:text-[#f1f1f7] text-sm transition-colors"
                            >
                              <ChevronUp className="w-4 h-4" />
                              {locale === 'es' ? 'Ocultar contenido' : 'Hide content'}
                            </button>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)]">
                          <a
                            href={articleData.fullurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold hover:bg-[#2563eb] transition-colors"
                          >
                            {locale === 'es' ? 'Ver en Wiki oficial' : 'View on official Wiki'}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => {
                              setSelectedArticle(null)
                              setShowFullContent(false)
                            }}
                            className="px-5 py-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#8a8aa3] hover:text-[#f1f1f7] text-sm font-medium transition-all"
                          >
                            {locale === 'es' ? 'Cerrar' : 'Close'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-[#5a5a76]">{locale === 'es' ? 'Artículo no encontrado' : 'Article not found'}</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Source attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-[#5a5a76] text-sm">
              {locale === 'es' ? 'Datos obtenidos de ' : 'Data sourced from '}
              <a
                href="https://es.minecraft.wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3b82f6] hover:underline"
              >
                es.minecraft.wiki
              </a>
              {locale === 'es' ? ' en tiempo real' : ' in real-time'}
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function InfoCard({
  title,
  value,
  subtext,
  icon: Icon,
  color,
}: {
  title: string
  value: string
  subtext: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}) {
  return (
    <div className="rounded-xl bg-[#07070b] border border-[rgba(255,255,255,0.04)] p-4 min-w-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-wider text-[#5a5a76] truncate">{title}</p>
          <p className="text-lg font-bold text-[#f1f1f7] truncate">{value}</p>
          <p className="text-[10px] text-[#4a4a6a] truncate">{subtext}</p>
        </div>
      </div>
    </div>
  )
}

function DimensionCard({
  title,
  desc,
  color,
  onClick,
}: {
  title: string
  desc: string
  color: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#07070b] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)] transition-all group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15` }}
      >
        <Compass className="w-6 h-6" style={{ color }} />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-[#f1f1f7] group-hover:text-white">{title}</p>
        <p className="text-[10px] text-[#5a5a76]">{desc}</p>
      </div>
    </button>
  )
}

function formatTimeAgo(timestamp: string, locale: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return locale === 'es' ? 'ahora' : 'now'
  if (diffMins < 60) return locale === 'es' ? `hace ${diffMins}m` : `${diffMins}m ago`
  if (diffHours < 24) return locale === 'es' ? `hace ${diffHours}h` : `${diffHours}h ago`
  return locale === 'es' ? `hace ${diffDays}d` : `${diffDays}d ago`
}
