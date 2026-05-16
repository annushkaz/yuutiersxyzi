import { NextResponse } from 'next/server'
import {
  recordCheck,
  getServiceStats,
  getRecentHistory,
  getIncidents,
  type ServiceStatus,
  type ServiceUptimeStats,
  type Incident,
} from '@/lib/status-store'

// Use Node runtime so we can talk to Upstash via REST without edge-only constraints
export const runtime = 'nodejs'
export const revalidate = 0
export const dynamic = 'force-dynamic'

interface ServiceCheck {
  name: string
  slug: string
  description: string
  category: 'core' | 'external' | 'cdn' | 'internal'
  url: string
  method: 'GET' | 'HEAD'
  expectedStatus?: number[]
  timeout: number
  /** Latency over this means "degraded" (real threshold, not a percentage of timeout) */
  degradedThreshold: number
}

const SERVICES: ServiceCheck[] = [
  {
    name: 'Mojang API',
    slug: 'mojang-api',
    description: 'Player UUID lookups and profile resolution',
    category: 'core',
    url: 'https://api.mojang.com/users/profiles/minecraft/Notch',
    method: 'GET',
    expectedStatus: [200],
    timeout: 5000,
    degradedThreshold: 1500,
  },
  {
    name: 'Mojang Session Server',
    slug: 'mojang-session',
    description: 'Skin textures, capes and session profiles',
    category: 'core',
    url: 'https://sessionserver.mojang.com/session/minecraft/profile/069a79f444e94726a5befca90e38aaf5',
    method: 'GET',
    expectedStatus: [200],
    timeout: 5000,
    degradedThreshold: 1500,
  },
  {
    name: 'Mojang Launcher Content',
    slug: 'mojang-launcher',
    description: 'News feed, patch notes and launcher metadata',
    category: 'core',
    url: 'https://launchercontent.mojang.com/news.json',
    method: 'GET',
    expectedStatus: [200],
    timeout: 5000,
    degradedThreshold: 1500,
  },
  {
    name: 'Minecraft.net RSS',
    slug: 'minecraft-rss',
    description: 'Official Minecraft news articles feed',
    category: 'core',
    url: 'https://www.minecraft.net/en-us/feeds/community-content/rss',
    method: 'GET',
    expectedStatus: [200],
    timeout: 8000,
    degradedThreshold: 2500,
  },
  {
    name: 'Hypixel API',
    slug: 'hypixel-api',
    description: 'Player statistics, BedWars, SkyWars and game modes',
    category: 'external',
    url: 'https://api.hypixel.net/',
    method: 'GET',
    expectedStatus: [200, 400, 403],
    timeout: 5000,
    degradedThreshold: 1500,
  },
  {
    name: 'MCSRVSTAT API',
    slug: 'mcsrvstat',
    description: 'Minecraft server status and ping checker',
    category: 'external',
    url: 'https://api.mcsrvstat.us/3/hypixel.net',
    method: 'GET',
    expectedStatus: [200],
    timeout: 8000,
    degradedThreshold: 2500,
  },
  {
    name: 'PlayerDB',
    slug: 'playerdb',
    description: 'Fallback player lookup and UUID resolution',
    category: 'external',
    url: 'https://playerdb.co/api/player/minecraft/Notch',
    method: 'GET',
    expectedStatus: [200],
    timeout: 5000,
    degradedThreshold: 1500,
  },
  {
    name: 'Crafty.gg API',
    slug: 'crafty-api',
    description: 'Player search, name history and analytics',
    category: 'external',
    url: 'https://api.crafty.gg/api/v2/players/search?username=Notch',
    method: 'GET',
    expectedStatus: [200],
    timeout: 5000,
    degradedThreshold: 1500,
  },
  {
    name: 'Visage (SurgePlay)',
    slug: 'visage',
    description: 'Alternative face and skin rendering service',
    category: 'cdn',
    url: 'https://visage.surgeplay.com/face/64/Notch',
    method: 'GET',
    expectedStatus: [200],
    timeout: 5000,
    degradedThreshold: 1200,
  },
  {
    name: 'MC-Heads',
    slug: 'mc-heads',
    description: 'Fast avatar CDN and skin fallback provider',
    category: 'cdn',
    url: 'https://mc-heads.net/avatar/Notch/64',
    method: 'GET',
    expectedStatus: [200],
    timeout: 5000,
    degradedThreshold: 1200,
  },
  {
    name: 'Minecraft Wiki API',
    slug: 'minecraft-wiki',
    description: 'Wiki content, search and article data',
    category: 'external',
    url: 'https://es.minecraft.wiki/api.php?action=query&format=json&meta=siteinfo',
    method: 'GET',
    expectedStatus: [200],
    timeout: 5000,
    degradedThreshold: 1500,
  },
]

interface ServiceResult {
  name: string
  slug: string
  description: string
  category: string
  status: ServiceStatus
  responseTime: number
  statusCode: number | null
  checkedAt: string
  uptime?: ServiceUptimeStats
  recentHistory?: { status: ServiceStatus; responseTime: number; checkedAt: number }[]
}

async function checkService(service: ServiceCheck, baseUrl: string): Promise<ServiceResult> {
  const url = service.url.startsWith('/') ? `${baseUrl}${service.url}` : service.url
  const start = performance.now()

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), service.timeout)

    const res = await fetch(url, {
      method: service.method,
      headers: { 'User-Agent': 'YuuTiers-StatusCheck/1.0' },
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timer)

    // Drain body so we measure the full response, not just headers
    try {
      await res.arrayBuffer()
    } catch {
      // ignore
    }

    const responseTime = Math.round(performance.now() - start)
    const expected = service.expectedStatus || [200]
    const isOk = expected.includes(res.status)

    let status: ServiceStatus
    if (!isOk) status = 'down'
    else if (responseTime > service.degradedThreshold) status = 'degraded'
    else status = 'operational'

    return {
      name: service.name,
      slug: service.slug,
      description: service.description,
      category: service.category,
      status,
      responseTime,
      statusCode: res.status,
      checkedAt: new Date().toISOString(),
    }
  } catch (error) {
    const responseTime = Math.round(performance.now() - start)
    const isTimeout = error instanceof Error && error.name === 'AbortError'
    return {
      name: service.name,
      slug: service.slug,
      description: service.description,
      category: service.category,
      status: isTimeout ? 'timeout' : 'down',
      responseTime,
      statusCode: null,
      checkedAt: new Date().toISOString(),
    }
  }
}

const REFRESH_LOCK_KEY = 'status:refresh-lock'
const REFRESH_LOCK_TTL = 25 // seconds — debounce concurrent refreshes

export async function GET(request: Request) {
  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`
  const force = url.searchParams.get('force') === 'true'

  // Try to acquire a soft lock so multiple users don't trigger 15 fetches each second.
  // If the lock exists, we serve the cached current snapshot from Redis.
  let didRunCheck = false
  if (!force) {
    const { redis } = await import('@/lib/redis')
    const acquired = await redis.set(REFRESH_LOCK_KEY, '1', { ex: REFRESH_LOCK_TTL, nx: true })
    didRunCheck = acquired === 'OK'
  } else {
    didRunCheck = true
  }

  let results: ServiceResult[]
  if (didRunCheck) {
    results = await Promise.all(SERVICES.map((s) => checkService(s, baseUrl)))
    // Persist every check in parallel
    await Promise.all(
      results.map((r) =>
        recordCheck({
          slug: r.slug,
          name: r.name,
          status: r.status,
          responseTime: r.responseTime,
          statusCode: r.statusCode,
          checkedAt: new Date(r.checkedAt).getTime(),
        }),
      ),
    )
  } else {
    // Read last cached current snapshots from redis
    const { redis } = await import('@/lib/redis')
    const snapshots = await Promise.all(
      SERVICES.map(async (s) => {
        const raw = await redis.get<string | Record<string, unknown>>(`status:current:${s.slug}`)
        if (!raw) {
          return {
            name: s.name,
            slug: s.slug,
            description: s.description,
            category: s.category,
            status: 'operational' as ServiceStatus,
            responseTime: 0,
            statusCode: null,
            checkedAt: new Date().toISOString(),
          }
        }
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
        return {
          name: s.name,
          slug: s.slug,
          description: s.description,
          category: s.category,
          status: (parsed.status as ServiceStatus) ?? 'operational',
          responseTime: Number(parsed.responseTime) || 0,
          statusCode: (parsed.statusCode as number | null) ?? null,
          checkedAt: new Date(Number(parsed.checkedAt) || Date.now()).toISOString(),
        }
      }),
    )
    results = snapshots
  }

  // Enrich with persisted uptime stats + recent history
  const enriched: ServiceResult[] = await Promise.all(
    results.map(async (r) => {
      const [uptime, recentHistory] = await Promise.all([
        getServiceStats(r.slug),
        getRecentHistory(r.slug, 30),
      ])
      return { ...r, uptime, recentHistory }
    }),
  )

  const incidents: Incident[] = await getIncidents(20)

  const operational = enriched.filter((r) => r.status === 'operational').length
  const degraded = enriched.filter((r) => r.status === 'degraded').length
  const down = enriched.filter((r) => r.status === 'down' || r.status === 'timeout').length

  let overallStatus: 'all-operational' | 'partial-outage' | 'major-outage' | 'degraded'
  if (down === 0 && degraded === 0) overallStatus = 'all-operational'
  else if (down >= enriched.length * 0.5) overallStatus = 'major-outage'
  else if (down > 0) overallStatus = 'partial-outage'
  else overallStatus = 'degraded'

  const avgResponseTime = enriched.length
    ? Math.round(enriched.reduce((sum, r) => sum + r.responseTime, 0) / enriched.length)
    : 0

  // Global 30-day uptime average
  const overallUptime30d =
    enriched.length === 0
      ? 100
      : Math.round(
          (enriched.reduce((s, r) => s + (r.uptime?.uptimePercent30d ?? 100), 0) / enriched.length) *
            100,
        ) / 100

  return NextResponse.json(
    {
      overallStatus,
      summary: { total: enriched.length, operational, degraded, down },
      avgResponseTime,
      overallUptime30d,
      services: enriched,
      incidents,
      checkedAt: new Date().toISOString(),
      cached: !didRunCheck,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    },
  )
}
