import { redis } from './redis'

/* ─── Types ─── */
export type ServiceStatus = 'operational' | 'degraded' | 'down' | 'timeout'

export interface ServiceCheckResult {
  slug: string
  name: string
  status: ServiceStatus
  responseTime: number
  statusCode: number | null
  checkedAt: number // unix ms
}

export interface Incident {
  id: string
  serviceSlug: string
  serviceName: string
  status: ServiceStatus
  startedAt: number
  resolvedAt: number | null
  durationMs: number | null
  description: string
}

export interface ServiceUptimeStats {
  slug: string
  uptimePercent24h: number
  uptimePercent7d: number
  uptimePercent30d: number
  avgResponseTime24h: number
  totalChecks24h: number
  lastIncidentAt: number | null
}

const CHECK_HISTORY_KEY = (slug: string) => `status:history:${slug}`
const CURRENT_STATUS_KEY = (slug: string) => `status:current:${slug}`
const INCIDENTS_KEY = 'status:incidents'
const ACTIVE_INCIDENT_KEY = (slug: string) => `status:active:${slug}`

const HISTORY_RETENTION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
const MAX_HISTORY_ITEMS = 5000

/* ─── Persist a single service check & detect incidents ─── */
export async function recordCheck(check: ServiceCheckResult): Promise<Incident | null> {
  const historyKey = CHECK_HISTORY_KEY(check.slug)
  const member = JSON.stringify({
    s: check.status,
    rt: check.responseTime,
    sc: check.statusCode,
    t: check.checkedAt,
  })

  // Append to sorted set scored by timestamp
  await redis.zadd(historyKey, { score: check.checkedAt, member })

  // Trim old entries (older than 30 days)
  const cutoff = Date.now() - HISTORY_RETENTION_MS
  await redis.zremrangebyscore(historyKey, 0, cutoff)

  // Cap by count too
  const count = await redis.zcard(historyKey)
  if (count > MAX_HISTORY_ITEMS) {
    await redis.zremrangebyrank(historyKey, 0, count - MAX_HISTORY_ITEMS - 1)
  }

  // Update current status snapshot
  await redis.set(
    CURRENT_STATUS_KEY(check.slug),
    JSON.stringify({
      slug: check.slug,
      name: check.name,
      status: check.status,
      responseTime: check.responseTime,
      statusCode: check.statusCode,
      checkedAt: check.checkedAt,
    }),
    { ex: 60 * 60 * 24 }, // 24h TTL
  )

  // Incident detection: check active incident for this service
  const activeRaw = await redis.get<string | Incident>(ACTIVE_INCIDENT_KEY(check.slug))
  const active: Incident | null =
    typeof activeRaw === 'string' ? (JSON.parse(activeRaw) as Incident) : (activeRaw ?? null)

  const isProblem = check.status === 'down' || check.status === 'timeout' || check.status === 'degraded'

  if (isProblem && !active) {
    // Open new incident
    const incident: Incident = {
      id: `inc_${check.checkedAt}_${check.slug}`,
      serviceSlug: check.slug,
      serviceName: check.name,
      status: check.status,
      startedAt: check.checkedAt,
      resolvedAt: null,
      durationMs: null,
      description: describeIncident(check),
    }
    await redis.set(ACTIVE_INCIDENT_KEY(check.slug), JSON.stringify(incident), { ex: 60 * 60 * 24 * 7 })
    await redis.zadd(INCIDENTS_KEY, { score: incident.startedAt, member: JSON.stringify(incident) })
    // Trim incidents to last 200
    const incCount = await redis.zcard(INCIDENTS_KEY)
    if (incCount > 200) {
      await redis.zremrangebyrank(INCIDENTS_KEY, 0, incCount - 201)
    }
    return incident
  }

  if (isProblem && active && active.status !== check.status) {
    // Update existing incident severity
    const updated: Incident = { ...active, status: check.status, description: describeIncident(check) }
    await redis.set(ACTIVE_INCIDENT_KEY(check.slug), JSON.stringify(updated), { ex: 60 * 60 * 24 * 7 })
    // Replace in zset (remove old member, add new)
    await redis.zremrangebyscore(INCIDENTS_KEY, active.startedAt, active.startedAt)
    await redis.zadd(INCIDENTS_KEY, { score: updated.startedAt, member: JSON.stringify(updated) })
    return updated
  }

  if (!isProblem && active) {
    // Resolve incident
    const resolved: Incident = {
      ...active,
      resolvedAt: check.checkedAt,
      durationMs: check.checkedAt - active.startedAt,
    }
    await redis.del(ACTIVE_INCIDENT_KEY(check.slug))
    // Replace in zset
    await redis.zremrangebyscore(INCIDENTS_KEY, active.startedAt, active.startedAt)
    await redis.zadd(INCIDENTS_KEY, { score: resolved.startedAt, member: JSON.stringify(resolved) })
    return resolved
  }

  return null
}

function describeIncident(check: ServiceCheckResult): string {
  if (check.status === 'timeout') return `${check.name} did not respond within the timeout window.`
  if (check.status === 'down')
    return `${check.name} returned an unexpected status${
      check.statusCode ? ` (HTTP ${check.statusCode})` : ''
    }.`
  if (check.status === 'degraded')
    return `${check.name} is responding slowly (${check.responseTime}ms latency).`
  return `${check.name} is experiencing issues.`
}

/* ─── Read uptime stats from history ─── */
export async function getServiceStats(slug: string): Promise<ServiceUptimeStats> {
  const now = Date.now()
  const historyKey = CHECK_HISTORY_KEY(slug)

  const day = await redis.zrange<string[]>(historyKey, now - 24 * 60 * 60 * 1000, now, {
    byScore: true,
  })
  const week = await redis.zrange<string[]>(historyKey, now - 7 * 24 * 60 * 60 * 1000, now, {
    byScore: true,
  })
  const month = await redis.zrange<string[]>(historyKey, now - 30 * 24 * 60 * 60 * 1000, now, {
    byScore: true,
  })

  const parse = (arr: string[]) =>
    arr.map((s) => {
      try {
        return JSON.parse(s) as { s: ServiceStatus; rt: number; sc: number | null; t: number }
      } catch {
        return null
      }
    }).filter((x): x is { s: ServiceStatus; rt: number; sc: number | null; t: number } => x !== null)

  const dayParsed = parse(day)
  const weekParsed = parse(week)
  const monthParsed = parse(month)

  const upPct = (arr: { s: ServiceStatus }[]) => {
    if (arr.length === 0) return 100
    const up = arr.filter((x) => x.s === 'operational').length
    return Math.round((up / arr.length) * 10000) / 100
  }

  const avgRt = dayParsed.length
    ? Math.round(dayParsed.reduce((s, x) => s + x.rt, 0) / dayParsed.length)
    : 0

  const lastIncident = dayParsed.find((x) => x.s !== 'operational')

  return {
    slug,
    uptimePercent24h: upPct(dayParsed),
    uptimePercent7d: upPct(weekParsed),
    uptimePercent30d: upPct(monthParsed),
    avgResponseTime24h: avgRt,
    totalChecks24h: dayParsed.length,
    lastIncidentAt: lastIncident?.t ?? null,
  }
}

/* ─── Get recent history for sparklines / heatmap ─── */
export async function getRecentHistory(slug: string, limit = 60): Promise<
  { status: ServiceStatus; responseTime: number; checkedAt: number }[]
> {
  const historyKey = CHECK_HISTORY_KEY(slug)
  const items = await redis.zrange<string[]>(historyKey, -limit, -1)
  return items
    .map((s) => {
      try {
        const parsed = JSON.parse(s) as { s: ServiceStatus; rt: number; sc: number | null; t: number }
        return { status: parsed.s, responseTime: parsed.rt, checkedAt: parsed.t }
      } catch {
        return null
      }
    })
    .filter((x): x is { status: ServiceStatus; responseTime: number; checkedAt: number } => x !== null)
}

/* ─── Get all incidents (recent first) ─── */
export async function getIncidents(limit = 50): Promise<Incident[]> {
  const items = await redis.zrange<string[]>(INCIDENTS_KEY, -limit, -1)
  return items
    .map((s) => {
      try {
        return JSON.parse(s) as Incident
      } catch {
        return null
      }
    })
    .filter((x): x is Incident => x !== null)
    .reverse()
}
