import { ok, fail, preflight, rateLimit, tooManyRequests } from '@/lib/api-response'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const rl = await rateLimit(request, 'v1:news', 30, 60)
  if (!rl.ok) return tooManyRequests(rl.retryAfter)

  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  try {
    const res = await fetch(`${baseUrl}/api/mojang/news`, { cache: 'no-store' })
    if (!res.ok) return fail('upstream_failure', 'News backend unavailable.', 502)
    const data = await res.json()
    return ok(data, { cacheControl: 'public, s-maxage=600, stale-while-revalidate=1800' })
  } catch (err) {
    return fail('internal_error', 'Failed to load news.', 500, String(err))
  }
}
