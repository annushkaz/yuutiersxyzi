'use client'

import { useEffect, useState, useMemo } from 'react'
import { Box, Loader2, AlertCircle, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { ToolHeader } from './tool-header'

interface VersionsData {
  latest: { release: string; snapshot: string }
  counts: { total: number; release: number; snapshot: number; oldBeta: number; oldAlpha: number }
  versions: { id: string; type: string; releaseTime: string }[]
}

const TYPE_COLORS: Record<string, string> = {
  release: '#22c55e',
  snapshot: '#eab308',
  old_beta: '#a855f7',
  old_alpha: '#ef4444',
}

export function VersionExplorerTool() {
  const [data, setData] = useState<VersionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/v1/minecraft/versions')
        const json = await res.json()
        if (cancelled) return
        if (!json.success) {
          setError(json.error?.message ?? 'Failed to load.')
        } else {
          setData(json.data)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Network error.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    if (!data) return []
    return data.versions.filter((v) => {
      if (filter !== 'all' && v.type !== filter) return false
      if (query && !v.id.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [data, filter, query])

  return (
    <div>
      <ToolHeader
        title="Version Explorer"
        description="Every Minecraft Java Edition version released by Mojang, sourced live from the official version manifest."
        endpoint="/api/v1/minecraft/versions"
        color="#10b981"
        icon={<Box className="w-6 h-6" style={{ color: '#10b981' }} />}
      />

      {loading && (
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-12 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[#10b981]" />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.06)] px-4 py-3 flex items-center gap-2 text-sm text-[#ef4444]">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {data && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Latest banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Latest release" value={data.latest.release} color="#22c55e" />
            <Stat label="Latest snapshot" value={data.latest.snapshot} color="#eab308" />
            <Stat label="Total versions" value={data.counts.total.toString()} color="#10b981" />
            <Stat
              label="Showing"
              value={`${filtered.length} of ${data.versions.length}`}
              color="#3b82f6"
            />
          </div>

          {/* Filters */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] overflow-x-auto">
              {['all', 'release', 'snapshot', 'old_beta', 'old_alpha'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                    filter === f
                      ? 'bg-[#10b981] text-[#0a0a0f]'
                      : 'text-[#9c9cb8] hover:text-[#f0f0f8]'
                  }`}
                >
                  {f === 'all' ? 'All' : f.replace('_', ' ')}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Search className="w-4 h-4 text-[#5a5a76] ml-2 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search version ID..."
                className="flex-1 bg-transparent outline-none text-sm text-[#f0f0f8] placeholder:text-[#5a5a76] min-w-0"
              />
            </div>
          </div>

          {/* List */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] divide-y divide-[rgba(255,255,255,0.04)]">
            {filtered.slice(0, 60).map((v) => {
              const color = TYPE_COLORS[v.type] ?? '#9c9cb8'
              return (
                <div
                  key={v.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <span
                    className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded font-mono shrink-0 w-20 text-center"
                    style={{ background: `${color}18`, color }}
                  >
                    {v.type.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-sm text-[#f0f0f8] flex-1 truncate">{v.id}</span>
                  <span className="text-xs text-[#8888aa] shrink-0">
                    {new Date(v.releaseTime).toLocaleDateString()}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{ borderColor: `${color}25`, background: `${color}06` }}
    >
      <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color }}>
        {label}
      </div>
      <div className="text-base sm:text-lg font-bold text-[#f0f0f8] mt-0.5 truncate">{value}</div>
    </div>
  )
}
