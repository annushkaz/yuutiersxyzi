import { ok, fail, preflight, rateLimit, tooManyRequests, withCache } from '@/lib/api-response'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

/**
 * UUID name history. Mojang officially deprecated this endpoint, so we
 * try Crafty.gg as a community-maintained source first, then fall back to
 * a single-name response from Mojang.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid: rawUuid } = await params

  const rl = await rateLimit(request, 'v1:uuid', 60, 60)
  if (!rl.ok) return tooManyRequests(rl.retryAfter)

  const uuid = rawUuid.replace(/-/g, '').toLowerCase()
  if (!/^[0-9a-f]{32}$/.test(uuid)) {
    return fail('invalid_input', 'UUID must be 32 hex chars (with or without dashes).', 400)
  }

  const cacheKey = `v1:history:${uuid}`

  try {
    const { value, cached } = await withCache(cacheKey, 600, async () => {
      // Try Crafty.gg
      const cr = await fetch(`https://api.crafty.gg/api/v2/players/${uuid}`, {
        headers: { 'User-Agent': 'YuuTiers/1.0' },
        cache: 'no-store',
      }).catch(() => null)

      if (cr && cr.ok) {
        const j = (await cr.json()) as {
          data?: {
            usernames?: { username: string; changed_at: string | null }[]
            username?: string
            uuid?: string
          }
        }
        if (j.data) {
          return {
            uuid,
            current: j.data.username ?? null,
            history:
              j.data.usernames?.map((u) => ({
                name: u.username,
                changedAt: u.changed_at,
              })) ?? [],
            source: 'crafty.gg',
          }
        }
      }

      // Fallback: Mojang current name only
      const m = await fetch(
        `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
        { headers: { 'User-Agent': 'YuuTiers/1.0' } },
      )
      if (!m.ok) throw new Error('not_found')
      const profile = (await m.json()) as { name: string }
      return {
        uuid,
        current: profile.name,
        history: [{ name: profile.name, changedAt: null }],
        source: 'mojang',
      }
    })

    return ok(value, {
      cached,
      cacheControl: 'public, s-maxage=600, stale-while-revalidate=1200',
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg === 'not_found') return fail('not_found', 'UUID not found.', 404)
    return fail('upstream_failure', 'Failed to fetch name history.', 502, msg)
  }
}
