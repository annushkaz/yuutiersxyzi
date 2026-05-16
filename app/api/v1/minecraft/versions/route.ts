import { ok, fail, preflight, rateLimit, tooManyRequests, withCache } from '@/lib/api-response'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

interface VersionEntry {
  id: string
  type: 'release' | 'snapshot' | 'old_beta' | 'old_alpha'
  url: string
  time: string
  releaseTime: string
}

/**
 * Returns the official Minecraft version manifest from Mojang's launchermeta.
 */
export async function GET(request: Request) {
  const rl = await rateLimit(request, 'v1:versions', 60, 60)
  if (!rl.ok) return tooManyRequests(rl.retryAfter)

  try {
    const { value, cached } = await withCache('v1:versions', 600, async () => {
      const res = await fetch('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json', {
        headers: { 'User-Agent': 'YuuTiers/1.0' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`mojang_${res.status}`)
      const json = (await res.json()) as {
        latest: { release: string; snapshot: string }
        versions: VersionEntry[]
      }

      return {
        latest: json.latest,
        counts: {
          total: json.versions.length,
          release: json.versions.filter((v) => v.type === 'release').length,
          snapshot: json.versions.filter((v) => v.type === 'snapshot').length,
          oldBeta: json.versions.filter((v) => v.type === 'old_beta').length,
          oldAlpha: json.versions.filter((v) => v.type === 'old_alpha').length,
        },
        versions: json.versions.slice(0, 100).map((v) => ({
          id: v.id,
          type: v.type,
          releaseTime: v.releaseTime,
        })),
      }
    })

    return ok(value, {
      cached,
      cacheControl: 'public, s-maxage=600, stale-while-revalidate=1800',
    })
  } catch (err) {
    return fail('upstream_failure', 'Failed to fetch version manifest.', 502, String(err))
  }
}
