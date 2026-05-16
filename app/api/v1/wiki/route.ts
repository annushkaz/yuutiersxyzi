import { ok, fail, preflight, rateLimit, tooManyRequests } from '@/lib/api-response'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const rl = await rateLimit(request, 'v1:wiki', 30, 60)
  if (!rl.ok) return tooManyRequests(rl.retryAfter)

  const url = new URL(request.url)
  const q = url.searchParams.get('q')?.trim()
  if (!q) return fail('invalid_input', 'Query parameter "q" is required.', 400)

  const baseUrl = `${url.protocol}//${url.host}`
  try {
    const res = await fetch(`${baseUrl}/api/wiki?q=${encodeURIComponent(q)}`, { cache: 'no-store' })
    if (!res.ok) return fail('upstream_failure', 'Wiki backend unavailable.', 502)
    const data = await res.json()
    return ok(data, { cacheControl: 'public, s-maxage=900, stale-while-revalidate=1800' })
  } catch (err) {
    return fail('internal_error', 'Wiki query failed.', 500, String(err))
  }
}
