import { ok, fail, preflight } from '@/lib/api-response'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  try {
    const res = await fetch(`${baseUrl}/api/status`, { cache: 'no-store' })
    if (!res.ok) return fail('upstream_failure', 'Status backend unavailable.', 502)
    const data = await res.json()
    return ok(data, { cached: data.cached === true, cacheControl: 'no-store' })
  } catch (err) {
    return fail('internal_error', 'Could not load status.', 500, String(err))
  }
}
