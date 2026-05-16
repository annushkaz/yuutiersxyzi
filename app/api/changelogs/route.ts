import { NextRequest, NextResponse } from 'next/server'

const PATCH_NOTES_BASE = 'https://launchercontent.mojang.com'

/**
 * Real Mojang patch notes proxy.
 *
 *  - GET /api/changelogs                  -> list of all entries (Java)
 *  - GET /api/changelogs?type=bedrock     -> list of all entries (Bedrock)
 *  - GET /api/changelogs?id=<contentPath> -> full entry body
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const type = searchParams.get('type') || 'java'
  const id = searchParams.get('id')

  try {
    if (id) {
      // id is the contentPath, e.g. javaPatchNotes/abc123.json
      const safeId = id.replace(/^\/+/, '')
      const url = `${PATCH_NOTES_BASE}/v2/${safeId}`
      const res = await fetch(url, {
        headers: { 'User-Agent': 'YuuTiers/1.0' },
        next: { revalidate: 300 },
      })
      if (!res.ok) throw new Error(`Patch note responded ${res.status}`)
      const data = await res.json()
      return NextResponse.json(data, {
        headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
      })
    }

    const file =
      type === 'bedrock' ? 'bedrockPatchNotes.json' : 'javaPatchNotes.json'
    const url = `${PATCH_NOTES_BASE}/v2/${file}`

    const res = await fetch(url, {
      headers: { 'User-Agent': 'YuuTiers/1.0' },
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error(`Patch notes index responded ${res.status}`)
    const data = await res.json()

    // Normalize image URLs to absolute paths
    const entries = (data.entries || []).map((e: any) => ({
      ...e,
      image: e.image
        ? {
            ...e.image,
            url: e.image.url?.startsWith('http')
              ? e.image.url
              : `${PATCH_NOTES_BASE}${e.image.url}`,
          }
        : null,
    }))

    return NextResponse.json(
      { ...data, entries },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
    )
  } catch (err) {
    console.error('Changelogs API error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch Mojang patch notes' },
      { status: 502 },
    )
  }
}
