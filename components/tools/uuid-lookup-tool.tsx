'use client'

import { useState } from 'react'
import { Hash, Search, Loader2, Copy, Check, AlertCircle, History } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ToolHeader } from './tool-header'

interface PlayerData {
  uuid: string
  uuidRaw: string
  name: string
  renders: { avatar: string; head: string; body: string; bust: string }
}

interface HistoryData {
  uuid: string
  current: string
  history: { name: string; changedAt: string | null }[]
  source: string
}

export function UuidLookupTool() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [player, setPlayer] = useState<PlayerData | null>(null)
  const [history, setHistory] = useState<HistoryData | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const onSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = input.trim()
    if (!q) return

    setLoading(true)
    setError(null)
    setPlayer(null)
    setHistory(null)

    try {
      const playerRes = await fetch(`/api/v1/players/${encodeURIComponent(q)}`)
      const playerJson = await playerRes.json()
      if (!playerJson.success) {
        setError(playerJson.error?.message ?? 'Lookup failed.')
        setLoading(false)
        return
      }
      setPlayer(playerJson.data)

      // Fetch history in parallel
      const histRes = await fetch(`/api/v1/uuid/${playerJson.data.uuidRaw}/history`)
      const histJson = await histRes.json()
      if (histJson.success) setHistory(histJson.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error.')
    } finally {
      setLoading(false)
    }
  }

  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div>
      <ToolHeader
        title="UUID Lookup"
        description="Convert any Minecraft username to a UUID, see name history and copy ready-to-use formats."
        endpoint="/api/v1/players/{username}"
        color="#22c55e"
        icon={<Hash className="w-6 h-6" style={{ color: '#22c55e' }} />}
      />

      <form
        onSubmit={onSearch}
        className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 flex items-center gap-2"
      >
        <Search className="w-4 h-4 text-[#5a5a76] ml-2 shrink-0" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter username or UUID (e.g. Notch)"
          autoFocus
          className="flex-1 bg-transparent outline-none text-sm text-[#f0f0f8] placeholder:text-[#5a5a76]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#22c55e] text-[#0a0a0f] text-sm font-semibold hover:bg-[#16a34a] disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Lookup
        </button>
      </form>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-lg border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.06)] px-4 py-3 flex items-center gap-2 text-sm text-[#ef4444]"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        {player && (
          <motion.div
            key={player.uuidRaw}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 flex flex-col sm:flex-row gap-5">
              <img
                src={player.renders.bust || '/placeholder.svg'}
                alt={`${player.name} skin`}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-[rgba(255,255,255,0.04)] object-contain shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#5a5a76] font-semibold">Username</div>
                  <h2 className="text-2xl font-bold text-[#f0f0f8]">{player.name}</h2>
                </div>

                {[
                  { label: 'UUID (dashed)', value: player.uuid },
                  { label: 'UUID (raw)', value: player.uuidRaw },
                ].map((row) => (
                  <div key={row.label} className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-semibold">
                      {row.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono text-[#f0f0f8] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg px-3 py-2 truncate">
                        {row.value}
                      </code>
                      <button
                        onClick={() => copy(row.label, row.value)}
                        className="p-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-[#9c9cb8]"
                        aria-label={`Copy ${row.label}`}
                      >
                        {copied === row.label ? (
                          <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {history && history.history.length > 0 && (
              <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <History className="w-4 h-4 text-[#22c55e]" />
                  <h3 className="text-sm font-semibold text-[#f0f0f8]">Name History</h3>
                  <span className="text-[10px] text-[#5a5a76] uppercase tracking-wider ml-auto">
                    via {history.source}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {history.history.map((h, i) => (
                    <div
                      key={`${h.name}-${i}`}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
                    >
                      <span className="text-sm text-[#f0f0f8] font-mono">{h.name}</span>
                      <span className="text-xs text-[#8888aa]">
                        {h.changedAt ? new Date(h.changedAt).toLocaleDateString() : 'Original'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
