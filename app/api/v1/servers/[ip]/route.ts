import { ok, fail, preflight, rateLimit, tooManyRequests, withCache } from '@/lib/api-response'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ServerPayload {
  online: boolean
  ip: string
  port: number | null
  hostname: string | null
  players: { online: number; max: number; sample?: { name: string; uuid: string }[] }
  version: string | null
  protocol: number | null
  software: string | null
  motd: { raw: string[]; clean: string[]; html: string[] } | null
  icon: string | null
  ping: number
  checkedAt: string
}

export async function OPTIONS() {
  return preflight()
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ip: string }> },
) {
  const { ip } = await params

  const rl = await rateLimit(request, 'v1:servers', 60, 60)
  if (!rl.ok) return tooManyRequests(rl.retryAfter)

  if (!ip || ip.length < 3 || ip.length > 253) {
    return fail('invalid_input', 'Invalid server IP/hostname.', 400)
  }

  const cacheKey = `v1:server:${ip.toLowerCase()}`

  try {
    const { value, cached } = await withCache<ServerPayload>(cacheKey, 60, async () => {
      const start = performance.now()
      const res = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(ip)}`, {
        headers: { 'User-Agent': 'YuuTiers/1.0' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`mcsrvstat_${res.status}`)
      const data = (await res.json()) as {
        online: boolean
        ip?: string
        port?: number
        hostname?: string
        players?: { online: number; max: number; list?: { name: string; uuid: string }[] }
        version?: string
        protocol?: { version: number; name?: string }
        software?: string
        motd?: { raw: string[]; clean: string[]; html: string[] }
        icon?: string
      }
      const ping = Math.round(performance.now() - start)
      return {
        online: data.online,
        ip: data.ip ?? ip,
        port: data.port ?? null,
        hostname: data.hostname ?? null,
        players: data.players
          ? { online: data.players.online, max: data.players.max, sample: data.players.list }
          : { online: 0, max: 0 },
        version: data.version ?? null,
        protocol: data.protocol?.version ?? null,
        software: data.software ?? null,
        motd: data.motd ?? null,
        icon: data.icon ?? null,
        ping,
        checkedAt: new Date().toISOString(),
      }
    })

    return ok(value, {
      cached,
      cacheControl: 'public, s-maxage=60, stale-while-revalidate=120',
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.startsWith('mcsrvstat_'))
      return fail('upstream_failure', `MCSRVSTAT upstream error: ${msg}`, 502)
    return fail('internal_error', 'Failed to ping server.', 500, msg)
  }
}
