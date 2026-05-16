import { ok, fail, preflight } from '@/lib/api-response'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  try {
    const res = await fetch(`${baseUrl}/api/changelogs`, { cache: 'no-store' })
    if (!res.ok) return fail('upstream_failure', 'Changelogs unavailable.', 502)
    const data = await res.json()
    return ok(data, { cacheControl: 'public, s-maxage=600' })
  } catch (err) {
    return fail('internal_error', 'Failed to load changelogs.', 500, String(err))
  }
}
