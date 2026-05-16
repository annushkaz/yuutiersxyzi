import { ok, fail, preflight, rateLimit, tooManyRequests } from '@/lib/api-response'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params

  const rl = await rateLimit(request, 'v1:skins', 60, 60)
  if (!rl.ok) return tooManyRequests(rl.retryAfter)

  if (!username || username.length < 2 || username.length > 16) {
    return fail('invalid_input', 'Username must be between 2 and 16 characters.', 400)
  }

  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  try {
    const res = await fetch(`${baseUrl}/api/player/${encodeURIComponent(username)}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      if (res.status === 404) return fail('not_found', 'Player not found.', 404)
      return fail('upstream_failure', 'Could not resolve skin data.', 502)
    }
    const data = (await res.json()) as {
      uuid: string
      uuidRaw: string
      name: string
      skin: { url: string; variant: 'classic' | 'slim' }
      cape: { url: string } | null
      renders: { avatar: string; head: string; body: string }
    }

    return ok(
      {
        uuid: data.uuid,
        username: data.name,
        skin: data.skin,
        cape: data.cape,
        renders: data.renders,
      },
      { cacheControl: 'public, s-maxage=600, stale-while-revalidate=1200' },
    )
  } catch (err) {
    return fail('internal_error', 'Failed to fetch skin.', 500, String(err))
  }
}
