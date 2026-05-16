import { NextResponse } from 'next/server'

export const runtime = 'edge'

const UUID_RE = /^[0-9a-f]{32}$/i
const UUID_DASHED_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function resolveUuid(input: string): Promise<string | null> {
  // Clean up input
  const clean = input.replace(/-/g, '').toLowerCase()
  
  // If it's already a valid UUID
  if (UUID_RE.test(clean)) return clean
  if (UUID_DASHED_RE.test(input)) return clean

  // Username → UUID via multiple services
  const services = [
    async () => {
      const res = await fetch(
        `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(input)}`,
        { headers: { 'User-Agent': 'YuuTiers/1.0' }, next: { revalidate: 300 } }
      )
      if (res.ok) {
        const data = await res.json()
        if (data?.id) return data.id.replace(/-/g, '')
      }
      return null
    },
    async () => {
      const res = await fetch(
        `https://playerdb.co/api/player/minecraft/${encodeURIComponent(input)}`,
        { headers: { 'User-Agent': 'YuuTiers/1.0' }, next: { revalidate: 300 } }
      )
      if (res.ok) {
        const data = await res.json()
        if (data?.success && data?.data?.player) {
          return (data.data.player.raw_id || data.data.player.id?.replace(/-/g, '')) || null
        }
      }
      return null
    },
    async () => {
      const res = await fetch(
        `https://api.ashcon.app/mojang/v2/user/${encodeURIComponent(input)}`,
        { headers: { 'User-Agent': 'YuuTiers/1.0' }, next: { revalidate: 300 } }
      )
      if (res.ok) {
        const data = await res.json()
        if (data?.uuid) return data.uuid.replace(/-/g, '')
      }
      return null
    },
  ]

  for (const service of services) {
    try {
      const result = await service()
      if (result) return result
    } catch {
      continue
    }
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
      // Force cache refresh with timestamp parameter
      skinUrl = `https://crafatar.com/skins/${cleanUuid}?default=MHF_Steve&overlay`
    }

    // Add cache busting parameter to force fresh fetch
    const skinUrlWithCache = skinUrl.includes('?') 
      ? `${skinUrl}&t=${Math.floor(Date.now() / 300000)}` // Cache bust every 5 minutes
      : `${skinUrl}?t=${Math.floor(Date.now() / 300000)}`

    const imgRes = await fetch(skinUrlWithCache, {
      headers: { 'User-Agent': 'YuuTiers/1.0' },
      cache: 'no-store',
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
