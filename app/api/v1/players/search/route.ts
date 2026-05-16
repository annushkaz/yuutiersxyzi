import { ok, fail, preflight, rateLimit, tooManyRequests } from '@/lib/api-response'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const rl = await rateLimit(request, 'v1:players-search', 30, 60)
  if (!rl.ok) return tooManyRequests(rl.retryAfter)

  const url = new URL(request.url)
  const q = url.searchParams.get('q')?.trim()
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 10), 25)

  if (!q || q.length < 2) {
    return fail('invalid_input', 'Query parameter "q" must be at least 2 characters.', 400)
  }

  try {
    const baseUrl = `${url.protocol}//${url.host}`
    const res = await fetch(
      `${baseUrl}/api/player/search?q=${encodeURIComponent(q)}&limit=${limit}`,
      { cache: 'no-store' },
    )
    if (!res.ok) return fail('upstream_failure', 'Search backend unavailable.', 502)
    const data = await res.json()
    return ok(data, { cacheControl: 'public, s-maxage=120, stale-while-revalidate=300' })
  } catch (err) {
    return fail('internal_error', 'Search failed.', 500, String(err))
  }
}
