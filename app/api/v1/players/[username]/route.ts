import { ok, fail, preflight, rateLimit, tooManyRequests, withCache } from '@/lib/api-response'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface MojangProfile {
  id: string
  name: string
  properties?: { name: string; value: string }[]
}

interface DecodedTextures {
  timestamp?: number
  profileId?: string
  profileName?: string
  textures?: {
    SKIN?: { url: string; metadata?: { model?: 'slim' | 'classic' } }
    CAPE?: { url: string }
  }
}

interface PlayerPayload {
  uuid: string
  uuidRaw: string
  name: string
  skin: { url: string | null; variant: 'classic' | 'slim' }
  cape: { url: string } | null
  nameHistory: { name: string; changedAt: number | null }[]
  renders: {
    avatar: string
    head: string
    body: string
    bust: string
  }
}

const dashUuid = (raw: string) =>
  raw.length === 32
    ? `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`
    : raw

async function resolveUuidFromName(name: string): Promise<{ id: string; name: string } | null> {
  const res = await fetch(
    `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(name)}`,
    { headers: { 'User-Agent': 'YuuTiers/1.0' } },
  )
  if (res.status === 204 || res.status === 404) return null
  if (!res.ok) throw new Error(`mojang_${res.status}`)
  return (await res.json()) as { id: string; name: string }
}

async function fetchProfile(uuidRaw: string): Promise<MojangProfile | null> {
  const res = await fetch(
    `https://sessionserver.mojang.com/session/minecraft/profile/${uuidRaw}?unsigned=false`,
    { headers: { 'User-Agent': 'YuuTiers/1.0' } },
  )
  if (res.status === 204 || res.status === 404) return null
  if (!res.ok) throw new Error(`session_${res.status}`)
  return (await res.json()) as MojangProfile
}

function decodeTextures(profile: MojangProfile): DecodedTextures | null {
  const prop = profile.properties?.find((p) => p.name === 'textures')
  if (!prop) return null
  try {
    const json = Buffer.from(prop.value, 'base64').toString('utf-8')
    return JSON.parse(json) as DecodedTextures
  } catch {
    return null
  }
}

export async function OPTIONS() {
  return preflight()
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params

  const rl = await rateLimit(request, 'v1:players', 60, 60)
  if (!rl.ok) return tooManyRequests(rl.retryAfter)

  const isUuid = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(username)
  const cacheKey = `v1:player:${username.toLowerCase()}`

  try {
    const { value, cached } = await withCache<PlayerPayload>(cacheKey, 300, async () => {
      let uuidRaw: string
      let resolvedName: string

      if (isUuid) {
        uuidRaw = username.replace(/-/g, '').toLowerCase()
        const profile = await fetchProfile(uuidRaw)
        if (!profile) throw new Error('not_found')
        resolvedName = profile.name
      } else {
        if (username.length < 2 || username.length > 16) throw new Error('invalid_input')
        const resolved = await resolveUuidFromName(username)
        if (!resolved) throw new Error('not_found')
        uuidRaw = resolved.id
        resolvedName = resolved.name
      }

      const profile = await fetchProfile(uuidRaw)
      if (!profile) throw new Error('not_found')
      const decoded = decodeTextures(profile)
      const skinUrl = decoded?.textures?.SKIN?.url ?? null
      const variant: 'classic' | 'slim' =
        decoded?.textures?.SKIN?.metadata?.model === 'slim' ? 'slim' : 'classic'

      const dashed = dashUuid(uuidRaw)
      return {
        uuid: dashed,
        uuidRaw,
        name: resolvedName,
        skin: { url: skinUrl, variant },
        cape: decoded?.textures?.CAPE ? { url: decoded.textures.CAPE.url } : null,
        nameHistory: [],
        renders: {
          avatar: `https://mc-heads.net/avatar/${uuidRaw}/256`,
          head: `https://mc-heads.net/head/${uuidRaw}/256`,
          body: `https://mc-heads.net/body/${uuidRaw}/256`,
          bust: `https://mc-heads.net/bust/${uuidRaw}/256`,
        },
      }
    })

    return ok(value, {
      cached,
      cacheControl: 'public, s-maxage=300, stale-while-revalidate=600',
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg === 'not_found') return fail('not_found', 'Player not found.', 404)
    if (msg === 'invalid_input')
      return fail('invalid_input', 'Username must be between 2 and 16 characters.', 400)
    if (msg.startsWith('mojang_') || msg.startsWith('session_'))
      return fail('upstream_failure', `Mojang upstream error: ${msg}`, 502)
    return fail('internal_error', 'Unexpected error resolving player.', 500, msg)
  }
}
