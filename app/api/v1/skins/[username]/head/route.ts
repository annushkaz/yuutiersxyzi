import { fail } from '@/lib/api-response'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params

  if (!username || username.length < 2 || username.length > 16) {
    return fail('invalid_input', 'Username must be between 2 and 16 characters.', 400)
  }

  try {
    const upstream = await fetch(
      `https://mc-heads.net/avatar/${encodeURIComponent(username)}/256`,
      { cache: 'force-cache' },
    )
    if (!upstream.ok) {
      return fail('upstream_failure', 'Could not fetch head render.', 502)
    }
    const buf = await upstream.arrayBuffer()
    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Type': upstream.headers.get('content-type') ?? 'image/png',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'Access-Control-Allow-Origin': '*',
        'X-API-Version': 'v1',
      },
    })
  } catch (err) {
    return fail('internal_error', 'Failed to stream head image.', 500, String(err))
  }
}
