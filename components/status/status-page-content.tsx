'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Wifi,
  WifiOff,
  RefreshCw,
  Zap,
  Shield,
  Globe,
  Server,
  ChevronDown,
  ChevronRight,
  Timer,
  BarChart3,
  Gauge,
  Radio,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Types ─── */
type ServiceStatus = 'operational' | 'degraded' | 'down' | 'timeout'

interface UptimeStats {
  slug: string
  uptimePercent24h: number
  uptimePercent7d: number
  uptimePercent30d: number
  avgResponseTime24h: number
  totalChecks24h: number
  lastIncidentAt: number | null
}

interface RecentHistoryPoint {
  status: ServiceStatus
  responseTime: number
  checkedAt: number
}

interface ServiceResult {
  name: string
  slug: string
  description: string
  category: string
  status: ServiceStatus
  responseTime: number
  statusCode: number | null
  checkedAt: string
  uptime?: UptimeStats
  recentHistory?: RecentHistoryPoint[]
}

interface Incident {
  id: string
  serviceSlug: string
  serviceName: string
  status: ServiceStatus
  startedAt: number
  resolvedAt: number | null
  durationMs: number | null
  description: string
}

interface StatusData {
  overallStatus: 'all-operational' | 'partial-outage' | 'major-outage' | 'degraded'
  summary: { total: number; operational: number; degraded: number; down: number }
  avgResponseTime: number
  overallUptime30d: number
  services: ServiceResult[]
  incidents: Incident[]
  checkedAt: string
  cached: boolean
}

/* ─── Constants ─── */
const CATEGORY_META: Record<string, { label: string; icon: typeof Activity; color: string; description: string }> = {
  core: { label: 'Mojang / Minecraft', icon: Shield, color: '#22c55e', description: 'Official Mojang services that power player data and authentication' },
  external: { label: 'Third-Party APIs', icon: Globe, color: '#3b82f6', description: 'External services for stats, search and wiki data' },
  cdn: { label: 'CDN & Renders', icon: ImageIcon, color: '#f59e0b', description: 'Avatar, skin and head rendering services' },
}

const STATUS_CONFIG = {
  operational: { label: 'Operational', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', icon: CheckCircle2 },
  degraded: { label: 'Degraded', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', icon: AlertTriangle },
  down: { label: 'Down', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', icon: XCircle },
  timeout: { label: 'Timeout', color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', icon: Clock },
}

const OVERALL_CONFIG = {
  'all-operational': { label: 'All Systems Operational', color: '#22c55e', bg: 'rgba(34,197,94,0.06)' },
  'degraded': { label: 'Performance Degraded', color: '#f59e0b', bg: 'rgba(245,158,11,0.06)' },
  'partial-outage': { label: 'Partial System Outage', color: '#f97316', bg: 'rgba(249,115,22,0.06)' },
  'major-outage': { label: 'Major System Outage', color: '#ef4444', bg: 'rgba(239,68,68,0.06)' },
}

/* ─── Helpers — REAL data thresholds ─── */
function getLatencyGrade(ms: number): { grade: string; color: string; label: string } {
  // Real, calibrated for HTTP API calls from edge functions
  if (ms < 200) return { grade: 'A+', color: '#22c55e', label: 'Excellent' }
  if (ms < 500) return { grade: 'A', color: '#4ade80', label: 'Good' }
  if (ms < 1000) return { grade: 'B', color: '#f59e0b', label: 'Acceptable' }
  if (ms < 2000) return { grade: 'C', color: '#f97316', label: 'Slow' }
  return { grade: 'D', color: '#ef4444', label: 'Poor' }
}

function formatTime(iso: string | number): string {
  const d = typeof iso === 'number' ? new Date(iso) : new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function formatRelative(timestamp: number): string {
  const diff = Date.now() - timestamp
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
  return `${Math.floor(diff / 86_400_000)}d ago`
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60_000) return `${Math.round(ms / 1000)}s`
  if (ms < 3_600_000) return `${Math.round(ms / 60_000)}m`
  if (ms < 86_400_000) return `${(ms / 3_600_000).toFixed(1)}h`
  return `${(ms / 86_400_000).toFixed(1)}d`
}

/* ─── Pulse ring ─── */
function PulseRing({ color, size = 40 }: { color: string; size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `2px solid ${color}` }}
        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `2px solid ${color}` }}
        animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
      />
      <div
        className="absolute inset-2 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}40` }}
      />
    </div>
  )
}

/* ─── Latency sparkline (uses persisted history) ─── */
function LatencySparkline({ history }: { history: RecentHistoryPoint[] }) {
  if (!history || history.length === 0) return <span className="text-[#5a5a76] text-xs">No history yet</span>
  const data = history.slice(-30)
  const max = Math.max(...data.map((d) => d.responseTime), 1)
  return (
    <div className="flex items-end gap-px h-6" title="Last 30 checks">
      {data.map((d, i) => {
        const pct = (d.responseTime / max) * 100
        const color =
          d.status === 'down' || d.status === 'timeout'
            ? '#ef4444'
            : d.status === 'degraded'
            ? '#f59e0b'
            : '#22c55e'
        return (
          <div
            key={i}
            className="rounded-sm transition-all duration-300"
            style={{
              width: 3,
              height: `${Math.max(pct, 8)}%`,
              backgroundColor: color,
              opacity: 0.7 + (i / data.length) * 0.3,
            }}
          />
        )
      })}
    </div>
  )
}

/* ─── Uptime dots (last 30 persisted checks) ─── */
function UptimeDots({ history }: { history: RecentHistoryPoint[] }) {
  if (!history || history.length === 0) {
    return <span className="text-[#5a5a76] text-xs">No data</span>
  }
  const entries = history.slice(-30)
  return (
    <div className="flex items-center gap-0.5" title="Last 30 persisted checks">
      {entries.map((h, i) => {
        const color =
          h.status === 'operational' ? '#22c55e' : h.status === 'degraded' ? '#f59e0b' : '#ef4444'
        return (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: 4,
              height: 16,
              backgroundColor: color,
              borderRadius: 2,
              opacity: 0.5 + (i / entries.length) * 0.5,
            }}
            title={`${formatTime(h.checkedAt)} · ${h.status} · ${h.responseTime}ms`}
          />
        )
      })}
    </div>
  )
}

/* ─── Heatmap (real persisted recent history per service) ─── */
function ResponseHeatmap({ services }: { services: ServiceResult[] }) {
  const longest = Math.max(...services.map((s) => s.recentHistory?.length ?? 0), 1)
  if (longest <= 1) {
    return (
      <p className="text-[#5a5a76] text-xs text-center py-6">
        Heatmap fills in as health checks accumulate. Data is persisted across all visitors.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px] space-y-1">
        {services.map((svc) => {
          const points = svc.recentHistory ?? []
          return (
            <div key={svc.slug} className="flex items-center gap-1">
              <span className="text-[11px] text-[#8888aa] w-32 truncate text-right pr-2 shrink-0">
                {svc.name}
              </span>
              {points.slice(-30).map((p, i) => {
                const intensity = Math.min(p.responseTime / 3000, 1)
                const color =
                  p.status === 'down' || p.status === 'timeout'
                    ? `rgba(239,68,68,${0.4 + intensity * 0.6})`
                    : p.status === 'degraded'
                    ? `rgba(245,158,11,${0.4 + intensity * 0.6})`
                    : `rgba(34,197,94,${0.2 + (1 - intensity) * 0.6})`
                return (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: color }}
                    title={`${formatTime(p.checkedAt)}: ${p.responseTime}ms (${p.status})`}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Real Incident Timeline (from server) ─── */
function IncidentTimeline({ incidents }: { incidents: Incident[] }) {
  if (incidents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <div className="w-12 h-12 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-[#22c55e]" />
        </div>
        <p className="text-[#f0f0f8] text-sm font-medium">No incidents on record</p>
        <p className="text-[#5a5a76] text-xs">All services have been healthy.</p>
      </div>
    )
  }

  const active = incidents.filter((i) => i.resolvedAt === null)
  const resolved = incidents.filter((i) => i.resolvedAt !== null)

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef4444]" />
            </span>
            <h4 className="text-[#f0f0f8] text-sm font-semibold">Active</h4>
            <span className="text-xs text-[#8888aa]">({active.length})</span>
          </div>
          <div className="space-y-2">
            {active.map((inc) => (
              <IncidentCard key={inc.id} incident={inc} active />
            ))}
          </div>
        </div>
      )}
      {resolved.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
            <h4 className="text-[#f0f0f8] text-sm font-semibold">Resolved</h4>
            <span className="text-xs text-[#8888aa]">({resolved.length})</span>
          </div>
          <div className="space-y-2">
            {resolved.slice(0, 15).map((inc) => (
              <IncidentCard key={inc.id} incident={inc} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function IncidentCard({ incident, active }: { incident: Incident; active?: boolean }) {
  const cfg = STATUS_CONFIG[incident.status]
  const Icon = cfg.icon
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-lg border bg-[rgba(255,255,255,0.02)] p-3"
      style={{ borderColor: active ? cfg.border : 'rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
          style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#f0f0f8] text-sm font-semibold">{incident.serviceName}</span>
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
              style={{ backgroundColor: cfg.bg, color: cfg.color }}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-xs text-[#9c9cb8] mt-1 leading-relaxed">{incident.description}</p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-[#5a5a76] font-mono flex-wrap">
            <span>Started {formatRelative(incident.startedAt)}</span>
            {incident.resolvedAt && (
              <>
                <span className="text-[#3a3a52]">·</span>
                <span>Resolved {formatRelative(incident.resolvedAt)}</span>
                <span className="text-[#3a3a52]">·</span>
                <span style={{ color: '#22c55e' }}>
                  Duration: {formatDuration(incident.durationMs ?? 0)}
                </span>
              </>
            )}
            {!incident.resolvedAt && (
              <span style={{ color: cfg.color }} className="font-semibold">
                Ongoing · {formatDuration(Date.now() - incident.startedAt)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Category group ─── */
function CategoryGroup({
  category,
  services,
}: {
  category: string
  services: ServiceResult[]
}) {
  const [expanded, setExpanded] = useState(true)
  const meta = CATEGORY_META[category] || CATEGORY_META.external
  const Icon = meta.icon
  const allOk = services.every((s) => s.status === 'operational')

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}
        >
          <Icon className="w-4 h-4" style={{ color: meta.color }} />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <span className="text-[#f0f0f8] font-semibold text-sm">{meta.label}</span>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                color: allOk ? '#22c55e' : '#f59e0b',
                backgroundColor: allOk ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
              }}
            >
              {services.filter((s) => s.status === 'operational').length}/{services.length} up
            </span>
          </div>
          <p className="text-[#5a5a76] text-xs truncate">{meta.description}</p>
        </div>
        <ChevronDown
          className={cn('w-4 h-4 text-[#5a5a76] transition-transform', expanded && 'rotate-180')}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 space-y-2">
              {services.map((svc) => (
                <ServiceRow key={svc.slug} service={svc} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Service row ─── */
function ServiceRow({ service }: { service: ServiceResult }) {
  const [showDetails, setShowDetails] = useState(false)
  const cfg = STATUS_CONFIG[service.status]
  const Icon = cfg.icon
  const latency = getLatencyGrade(service.responseTime)
  const uptime = service.uptime?.uptimePercent24h ?? 100

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.015)] overflow-hidden">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: cfg.color, boxShadow: `0 0 6px ${cfg.color}50` }}
        />
        <div className="flex-1 min-w-0 text-left">
          <span className="text-[#e0e0f0] text-sm font-medium">{service.name}</span>
        </div>

        <div className="hidden md:block">
          <UptimeDots history={service.recentHistory ?? []} />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-mono" style={{ color: latency.color }}>
            {service.responseTime}ms
          </span>
        </div>

        <span
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md shrink-0"
          style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          <Icon className="w-3 h-3" />
          <span className="hidden sm:inline">{cfg.label}</span>
        </span>

        <ChevronRight
          className={cn('w-3.5 h-3.5 text-[#5a5a76] transition-transform shrink-0', showDetails && 'rotate-90')}
        />
      </button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-[rgba(255,255,255,0.04)] space-y-3">
              <p className="text-[#8888aa] text-xs">{service.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <DetailCard label="Status Code" value={service.statusCode ? String(service.statusCode) : 'N/A'} />
                <DetailCard
                  label="Latency Grade"
                  value={latency.grade}
                  valueColor={latency.color}
                  sub={latency.label}
                />
                <DetailCard
                  label="Uptime 24h"
                  value={`${uptime.toFixed(2)}%`}
                  valueColor={uptime >= 99 ? '#22c55e' : uptime >= 95 ? '#f59e0b' : '#ef4444'}
                  sub={`${service.uptime?.totalChecks24h ?? 0} checks`}
                />
                <DetailCard
                  label="Avg 24h"
                  value={`${service.uptime?.avgResponseTime24h ?? 0}ms`}
                  valueColor="#3b82f6"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <DetailCard
                  label="Uptime 7d"
                  value={`${(service.uptime?.uptimePercent7d ?? 100).toFixed(2)}%`}
                  valueColor={(service.uptime?.uptimePercent7d ?? 100) >= 99 ? '#22c55e' : '#f59e0b'}
                />
                <DetailCard
                  label="Uptime 30d"
                  value={`${(service.uptime?.uptimePercent30d ?? 100).toFixed(2)}%`}
                  valueColor={(service.uptime?.uptimePercent30d ?? 100) >= 99 ? '#22c55e' : '#f59e0b'}
                />
                <DetailCard label="Last Check" value={formatTime(service.checkedAt)} />
              </div>

              <div>
                <p className="text-[10px] text-[#5a5a76] uppercase tracking-wider mb-1.5">
                  Recent Response History
                </p>
                <LatencySparkline history={service.recentHistory ?? []} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DetailCard({
  label,
  value,
  valueColor,
  sub,
}: {
  label: string
  value: string
  valueColor?: string
  sub?: string
}) {
  return (
    <div className="rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)] px-3 py-2">
      <p className="text-[10px] text-[#5a5a76] uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold font-mono mt-0.5" style={{ color: valueColor || '#f0f0f8' }}>
        {value}
      </p>
      {sub && <p className="text-[10px] text-[#6a6a86]">{sub}</p>}
    </div>
  )
}

/* ─── Latency Leaderboard ─── */
function LatencyLeaderboard({ services }: { services: ServiceResult[] }) {
  const sorted = [...services].sort((a, b) => a.responseTime - b.responseTime)
  const fastest = sorted[0]
  const slowest = sorted[sorted.length - 1]
  const maxMs = Math.max(...services.map((s) => s.responseTime), 1)

  return (
    <div className="space-y-2">
      {sorted.map((svc, i) => {
        const pct = (svc.responseTime / maxMs) * 100
        const isFastest = svc.slug === fastest?.slug
        const isSlowest = svc.slug === slowest?.slug
        const grade = getLatencyGrade(svc.responseTime)

        return (
          <div key={svc.slug} className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#5a5a76] w-5 text-right shrink-0">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[#c0c0d0] truncate">{svc.name}</span>
                {isFastest && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[rgba(34,197,94,0.1)] text-[#22c55e]">
                    FASTEST
                  </span>
                )}
                {isSlowest && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[rgba(239,68,68,0.1)] text-[#ef4444]">
                    SLOWEST
                  </span>
                )}
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded ml-auto"
                  style={{ background: `${grade.color}15`, color: grade.color }}
                >
                  {grade.grade}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: grade.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(pct, 2)}%` }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                />
              </div>
            </div>
            <span className="text-xs font-mono shrink-0" style={{ color: grade.color }}>
              {svc.responseTime}ms
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════ MAIN STATUS PAGE ═══════════════════ */
export default function StatusPageContent() {
  const [data, setData] = useState<StatusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [activeTab, setActiveTab] = useState<'services' | 'heatmap' | 'leaderboard' | 'incidents'>('services')
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [countdown, setCountdown] = useState(60)

  const fetchStatus = useCallback(async (isRefresh = false, force = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const res = await fetch(`/api/status${force ? '?force=true' : ''}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json: StatusData = await res.json()
      setData(json)
      setError(null)
      setCountdown(60)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load status')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  useEffect(() => {
    if (!autoRefresh) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      fetchStatus(true)
    }, 60_000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoRefresh, fetchStatus])

  useEffect(() => {
    if (!autoRefresh) return
    const tick = setInterval(() => {
      setCountdown((c) => (c <= 0 ? 60 : c - 1))
    }, 1000)
    return () => clearInterval(tick)
  }, [autoRefresh])

  const grouped = data
    ? Object.entries(
        data.services.reduce<Record<string, ServiceResult[]>>((acc, svc) => {
          ;(acc[svc.category] ??= []).push(svc)
          return acc
        }, {}),
      )
    : []

  const overall = data ? OVERALL_CONFIG[data.overallStatus] : null

  if (loading) {
    return <StatusSkeleton />
  }

  if (error && !data) {
    return (
      <div className="rounded-2xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.05)] p-8 text-center">
        <AlertCircle className="w-10 h-10 text-[#ef4444] mx-auto mb-3" />
        <h3 className="text-[#f0f0f8] font-semibold mb-1">Could not load status</h3>
        <p className="text-[#8888aa] text-sm">{error}</p>
        <button
          onClick={() => fetchStatus(true, true)}
          className="mt-4 px-4 py-2 rounded-lg bg-[#3b82f6] text-white text-sm font-medium hover:bg-[#2563eb] transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Overall banner */}
      {data && overall && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden"
          style={{ backgroundColor: overall.bg }}
        >
          <div className="px-6 py-8 sm:py-10 flex flex-col sm:flex-row items-center gap-6">
            <PulseRing color={overall.color} size={48} />
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: overall.color }}>
                {overall.label}
              </h2>
              <p className="text-[#8888aa] text-sm mt-1">
                {data.summary.operational} of {data.summary.total} services operational
                {data.summary.degraded > 0 && ` · ${data.summary.degraded} degraded`}
                {data.summary.down > 0 && ` · ${data.summary.down} down`}
              </p>
              {data.cached && (
                <p className="text-[10px] text-[#5a5a76] mt-1 uppercase tracking-wider">
                  Showing cached snapshot · next live check in {countdown}s
                </p>
              )}
            </div>
            <div className="flex flex-col sm:items-end gap-1 shrink-0">
              <p className="text-[10px] text-[#5a5a76] uppercase tracking-wider">30-day Uptime</p>
              <p className="text-2xl font-bold font-mono" style={{ color: overall.color }}>
                {data.overallUptime30d.toFixed(2)}%
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats cards */}
      {data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={Zap} label="Operational" value={String(data.summary.operational)} color="#22c55e" />
          <StatCard icon={AlertTriangle} label="Degraded" value={String(data.summary.degraded)} color="#f59e0b" />
          <StatCard icon={XCircle} label="Down / Timeout" value={String(data.summary.down)} color="#ef4444" />
          <StatCard icon={Timer} label="Avg Latency" value={`${data.avgResponseTime}ms`} color="#3b82f6" />
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-0.5 overflow-x-auto">
          {([
            { key: 'services', label: 'Services', icon: Server },
            { key: 'heatmap', label: 'Heatmap', icon: BarChart3 },
            { key: 'leaderboard', label: 'Latency', icon: Gauge },
            {
              key: 'incidents',
              label: `Incidents${data?.incidents?.length ? ` (${data.incidents.length})` : ''}`,
              icon: Radio,
            },
          ] as const).map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap',
                  activeTab === tab.key
                    ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                    : 'text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[rgba(255,255,255,0.04)]',
                )}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 ml-auto shrink-0">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all',
              autoRefresh
                ? 'border-[#22c55e]/30 text-[#22c55e] bg-[rgba(34,197,94,0.06)]'
                : 'border-[rgba(255,255,255,0.08)] text-[#8888aa] bg-[rgba(255,255,255,0.02)]',
            )}
          >
            {autoRefresh ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoRefresh ? `Live (${countdown}s)` : 'Paused'}</span>
          </button>

          <button
            onClick={() => fetchStatus(true, true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-[rgba(255,255,255,0.08)] text-[#8888aa] hover:text-[#f0f0f8] hover:bg-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] transition-all disabled:opacity-50"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', refreshing && 'animate-spin')} />
            <span className="hidden sm:inline">Force check</span>
          </button>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'services' && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {grouped.map(([category, services]) => (
              <CategoryGroup key={category} category={category} services={services} />
            ))}
          </motion.div>
        )}

        {activeTab === 'heatmap' && data && (
          <motion.div
            key="heatmap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
              <h3 className="text-[#f0f0f8] font-semibold text-sm">Response Time Heatmap</h3>
              <span className="text-[#5a5a76] text-xs ml-auto">
                Persisted across all visitors · Green = healthy, Red = down
              </span>
            </div>
            <ResponseHeatmap services={data.services} />
          </motion.div>
        )}

        {activeTab === 'leaderboard' && data && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="w-4 h-4 text-[#f59e0b]" />
              <h3 className="text-[#f0f0f8] font-semibold text-sm">Latency Leaderboard</h3>
              <span className="text-[#5a5a76] text-xs ml-auto">Real grades · A+ &lt; 200ms · D &gt; 2s</span>
            </div>
            <LatencyLeaderboard services={data.services} />
          </motion.div>
        )}

        {activeTab === 'incidents' && data && (
          <motion.div
            key="incidents"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-4 h-4 text-[#ef4444]" />
              <h3 className="text-[#f0f0f8] font-semibold text-sm">Incident History</h3>
              <span className="text-[#5a5a76] text-xs ml-auto">Real, persisted in Redis</span>
            </div>
            <IncidentTimeline incidents={data.incidents} />
          </motion.div>
        )}
      </AnimatePresence>

      {data && (
        <p className="text-center text-[#5a5a76] text-xs">
          Last checked at {formatTime(data.checkedAt)} · Data persists across all visitors
        </p>
      )}
    </div>
  )
}

/* ─── Stat card ─── */
function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Activity
  label: string
  value: string
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-4 py-3"
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5" style={{ color }} />
        <span className="text-[#8888aa] text-xs">{label}</span>
      </div>
      <p className="text-xl font-bold font-mono" style={{ color }}>
        {value}
      </p>
    </motion.div>
  )
}

/* ─── Skeleton ─── */
function StatusSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-28 rounded-2xl bg-[rgba(255,255,255,0.03)]" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-[rgba(255,255,255,0.03)]" />
        ))}
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-40 rounded-xl bg-[rgba(255,255,255,0.03)]" />
      ))}
    </div>
  )
}
