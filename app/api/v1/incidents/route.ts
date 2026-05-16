import { ok, fail, preflight } from '@/lib/api-response'
import { getIncidents } from '@/lib/status-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 50), 200)
  const onlyActive = url.searchParams.get('active') === 'true'

  try {
    const all = await getIncidents(limit)
    const filtered = onlyActive ? all.filter((i) => i.resolvedAt === null) : all

    return ok(
      {
        total: filtered.length,
        active: filtered.filter((i) => i.resolvedAt === null).length,
        resolved: filtered.filter((i) => i.resolvedAt !== null).length,
        incidents: filtered,
      },
      { cacheControl: 'public, s-maxage=30, stale-while-revalidate=60' },
    )
  } catch (err) {
    return fail('internal_error', 'Failed to read incidents.', 500, String(err))
  }
}
