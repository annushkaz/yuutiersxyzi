import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 60

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ip: string }> }
) {
  const { ip } = await params

  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(ip)}`, {
      headers: { 'User-Agent': 'YuuTiers/1.0' },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      return NextResponse.json({ online: false, ip }, { status: 200 })
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    })
  } catch (error) {
    console.error('[server-api] error:', error)
    return NextResponse.json({ online: false, ip, error: 'Failed to fetch' }, { status: 200 })
  }
}
