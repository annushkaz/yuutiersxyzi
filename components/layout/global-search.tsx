'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, Server, Palette, Loader2, ArrowRight } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'

interface SearchResult {
  type: 'player' | 'server'
  name: string
  uuid?: string
  ip?: string
  online?: boolean
  players?: { online: number; max: number }
}

export function GlobalSearch({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem('yuutiers_recent_searches')
    if (stored) {
      setRecentSearches(JSON.parse(stored))
    }
  }, [])

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  const saveSearch = useCallback((search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('yuutiers_recent_searches', JSON.stringify(updated))
  }, [recentSearches])

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    const newResults: SearchResult[] = []

    // Detect if it's a server IP
    const isServerIP = searchQuery.includes('.') || searchQuery.includes(':')

    if (isServerIP) {
      try {
        const res = await fetch(`/api/server/${encodeURIComponent(searchQuery)}`)
        const data = await res.json()
        if (data.online !== undefined) {
          newResults.push({
            type: 'server',
            name: data.hostname || searchQuery,
            ip: searchQuery,
            online: data.online,
            players: data.players
          })
        }
      } catch {
        // Server not found
      }
    } else {
      try {
        const res = await fetch(`/api/player/search?q=${encodeURIComponent(searchQuery)}`)
        if (res.ok) {
          const data = await res.json()
          for (const p of (data.results || []).slice(0, 6)) {
            newResults.push({
              type: 'player',
              name: p.name,
              uuid: p.uuid,
            })
          }
        }
      } catch {
        // Player not found
      }
    }

    setResults(newResults)
    setLoading(false)
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, handleSearch])

  const handleSelect = (result: SearchResult) => {
    saveSearch(result.name)
    onOpenChange(false)
    setQuery('')
    if (result.type === 'player') {
      router.push(`/player/${result.name}`)
    } else {
      router.push(`/server/${result.ip}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      saveSearch(query)
      onOpenChange(false)
      const isServerIP = query.includes('.') || query.includes(':')
      if (isServerIP) {
        router.push(`/server/${query}`)
      } else {
        router.push(`/player/${query}`)
      }
      setQuery('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 bg-[#0f0f16] border-[rgba(255,255,255,0.08)] overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 px-4 py-4 border-b border-[rgba(255,255,255,0.08)]">
            <Search className="w-5 h-5 text-[#8888aa]" />
            <input
              type="text"
              placeholder="Search players, servers, skins..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#f0f0f8] placeholder-[#4a4a6a] outline-none text-lg"
              autoFocus
            />
            {loading && <Loader2 className="w-5 h-5 text-[#3b82f6] animate-spin" />}
            <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-2 font-mono text-xs text-[#4a4a6a]">
              ESC
            </kbd>
          </div>
        </form>

        <div className="max-h-[400px] overflow-y-auto">
          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-2"
              >
                {results.map((result, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors text-left"
                  >
                    {result.type === 'player' && result.uuid ? (
                      <Image
                        src={`https://crafatar.com/avatars/${result.uuid}?size=40&overlay=true`}
                        alt={result.name}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                    ) : result.type === 'server' ? (
                      <div className="w-10 h-10 rounded-lg bg-[#16161f] flex items-center justify-center">
                        <Server className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[#16161f] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#8888aa]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#f0f0f8] font-medium truncate">{result.name}</p>
                      <p className="text-[#4a4a6a] text-sm truncate">
                        {result.type === 'player' 
                          ? `UUID: ${result.uuid?.slice(0, 8)}...` 
                          : `${result.players?.online || 0}/${result.players?.max || 0} players`}
                      </p>
                    </div>
                    {result.type === 'server' && (
                      <div className={`w-2 h-2 rounded-full ${result.online ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`} />
                    )}
                    <ArrowRight className="w-4 h-4 text-[#4a4a6a]" />
                  </motion.button>
                ))}
              </motion.div>
            ) : query ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <p className="text-[#4a4a6a]">
                  {loading ? 'Searching...' : 'Press Enter to search'}
                </p>
              </motion.div>
            ) : recentSearches.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4"
              >
                <p className="text-[#4a4a6a] text-xs uppercase tracking-wide mb-3 px-2">Recent Searches</p>
                {recentSearches.map((search, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(search)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors text-left"
                  >
                    <Search className="w-4 h-4 text-[#4a4a6a]" />
                    <span className="text-[#8888aa]">{search}</span>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <div className="flex justify-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-[#4a4a6a] text-sm">
                    <User className="w-4 h-4" /> Players
                  </div>
                  <div className="flex items-center gap-2 text-[#4a4a6a] text-sm">
                    <Server className="w-4 h-4" /> Servers
                  </div>
                  <div className="flex items-center gap-2 text-[#4a4a6a] text-sm">
                    <Palette className="w-4 h-4" /> Skins
                  </div>
                </div>
                <p className="text-[#4a4a6a] text-sm">Start typing to search...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
