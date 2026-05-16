import { NextResponse } from 'next/server'

export const runtime = 'edge'

const UUID_RE = /^[0-9a-f]{32}$/i

async function resolveUuid(input: string): Promise<string | null> {
  const clean = input.replace(/-/g, '')
  if (UUID_RE.test(clean)) return clean

  // Username → UUID
  try {
    const res = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(input)}`,
      { headers: { 'User-Agent': 'YuuTiers/1.0' }, next: { revalidate: 600 } }
    )
    if (res.ok) {
      const data = await res.json()
      if (data?.id) return data.id.replace(/-/g, '')
    }
  } catch {
    // try fallback
  }

  try {
    const fallback = await fetch(
      `https://playerdb.co/api/player/minecraft/${encodeURIComponent(input)}`,
      { headers: { 'User-Agent': 'YuuTiers/1.0' }, next: { revalidate: 600 } }
    )
    if (fallback.ok) {
      const data = await fallback.json()
      if (data?.data?.player?.raw_id) return data.data.player.raw_id
      if (data?.data?.player?.id) return data.data.player.id.replace(/-/g, '')
    }
  } catch {
    // ignore
  }

  return null
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid: raw } = await params
  const input = decodeURIComponent(raw)

  try {
    const cleanUuid = await resolveUuid(input)
    if (!cleanUuid) {
      return new NextResponse('Player not found', { status: 404 })
    }

    let skinUrl: string | null = null

    const sessionRes = await fetch(
      `https://sessionserver.mojang.com/session/minecraft/profile/${cleanUuid}`,
      { headers: { 'User-Agent': 'YuuTiers/1.0' }, next: { revalidate: 600 } }
    )

    if (sessionRes.ok) {
      const session = await sessionRes.json()
      const texturesProp = session.properties?.find(
        (p: { name: string }) => p.name === 'textures'
      )
      if (texturesProp) {
        try {
          const decoded = JSON.parse(atob(texturesProp.value))
          if (decoded.textures?.SKIN?.url) {
            skinUrl = decoded.textures.SKIN.url.replace(/^http:/, 'https:')
          }
        } catch {
          // bad payload, fall through
        }
      }
    }

    if (!skinUrl) {
      skinUrl = `https://crafatar.com/skins/${cleanUuid}?default=MHF_Steve`
    }

    const imgRes = await fetch(skinUrl, {
      headers: { 'User-Agent': 'YuuTiers/1.0' },
    })

    if (!imgRes.ok) {
      // last-resort fallback to a static Steve skin
      const steve = await fetch(
        'https://crafatar.com/skins/c06f8906-4c8a-4911-9c29-ea1dbd1aab82'
      )
      if (steve.ok) {
        const buf = await steve.arrayBuffer()
        return new NextResponse(buf, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, s-maxage=3600',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }
      return new NextResponse('Skin not available', { status: 404 })
    }

    const buf = await imgRes.arrayBuffer()
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('[v0] skin-proxy error:', error)
    return new NextResponse('Error', { status: 500 })
  }
}
