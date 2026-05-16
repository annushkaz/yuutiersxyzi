import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 300 // 5 minutes

interface MojangProfile {
  id: string
  name: string
}

interface SessionProperty {
  name: string
  value: string
}

interface SessionProfile {
  id: string
  name: string
  properties?: SessionProperty[]
}

function formatUUID(uuid: string): string {
  const clean = uuid.replace(/-/g, '')
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params

  if (!name || name.length < 2 || name.length > 16) {
    return NextResponse.json(
      { error: 'Invalid username. Must be 2-16 characters.' },
      { status: 400 }
    )
  }

  try {
    // Try Mojang's official API first
    let profile: MojangProfile | null = null
    
    const mojangRes = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(name)}`,
      { 
        headers: { 'User-Agent': 'YuuTiers/1.0' },
        next: { revalidate: 300 }
      }
    )

    if (mojangRes.ok) {
      profile = await mojangRes.json()
    } else if (mojangRes.status === 204 || mojangRes.status === 404) {
      // Fallback to PlayerDB which has better CORS and uptime
      const fallbackRes = await fetch(
        `https://playerdb.co/api/player/minecraft/${encodeURIComponent(name)}`,
        { 
          headers: { 'User-Agent': 'YuuTiers/1.0' },
          next: { revalidate: 300 }
        }
      )
      
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json()
        if (fallbackData.success && fallbackData.data?.player) {
          profile = {
            id: fallbackData.data.player.raw_id || fallbackData.data.player.id.replace(/-/g, ''),
            name: fallbackData.data.player.username,
          }
        }
      }
    }

    if (!profile) {
      // Try PlayerDB as primary fallback
      const playerDbRes = await fetch(
        `https://playerdb.co/api/player/minecraft/${encodeURIComponent(name)}`,
        { 
          headers: { 'User-Agent': 'YuuTiers/1.0' },
          next: { revalidate: 300 }
        }
      )
      
      if (playerDbRes.ok) {
        const data = await playerDbRes.json()
        if (data.success && data.data?.player) {
          profile = {
            id: data.data.player.raw_id || data.data.player.id.replace(/-/g, ''),
            name: data.data.player.username,
          }
        }
      }
    }

    if (!profile) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      )
    }

    const cleanUuid = profile.id.replace(/-/g, '')

    // Get full profile with textures from session server
    let skinUrl: string | null = null
    let skinVariant: 'classic' | 'slim' = 'classic'
    let capeUrl: string | null = null
    let textureValue: string | null = null

    try {
      const sessionRes = await fetch(
        `https://sessionserver.mojang.com/session/minecraft/profile/${cleanUuid}`,
        { 
          headers: { 'User-Agent': 'YuuTiers/1.0' },
          next: { revalidate: 300 }
        }
      )

      if (sessionRes.ok) {
        const session: SessionProfile = await sessionRes.json()
        const texturesProp = session.properties?.find(p => p.name === 'textures')
        
        if (texturesProp) {
          textureValue = texturesProp.value
          const decoded = JSON.parse(atob(texturesProp.value))
          
          if (decoded.textures?.SKIN) {
            skinUrl = decoded.textures.SKIN.url
            skinVariant = decoded.textures.SKIN.metadata?.model === 'slim' ? 'slim' : 'classic'
          }
          if (decoded.textures?.CAPE) {
            capeUrl = decoded.textures.CAPE.url
          }
        }
      }
    } catch {
      // Continue without session data
    }

    // Try to get name history (via Crafty fallback)
    let nameHistory: { name: string; changedToAt?: number }[] = []
    try {
      const craftyRes = await fetch(
        `https://api.crafty.gg/api/v2/players/${cleanUuid}`,
        { 
          headers: { 'User-Agent': 'YuuTiers/1.0' },
          next: { revalidate: 600 }
        }
      )
      if (craftyRes.ok) {
        const craftyData = await craftyRes.json()
        if (craftyData.data?.usernames) {
          nameHistory = craftyData.data.usernames.map((u: { username: string; changed_at: string | null }) => ({
            name: u.username,
            changedToAt: u.changed_at ? new Date(u.changed_at).getTime() : undefined,
          }))
        }
      }
    } catch {
      // Optional data
    }

    return NextResponse.json({
      uuid: formatUUID(cleanUuid),
      uuidRaw: cleanUuid,
      name: profile.name,
      skin: {
        url: skinUrl || `https://mc-heads.net/skin/${cleanUuid}`,
        variant: skinVariant,
      },
      cape: capeUrl ? { url: capeUrl } : null,
      textureValue,
      nameHistory,
      renders: {
        // Crafatar is the most reliable source for owner skins (returns proper 404 on miss
        // so onError fallbacks fire correctly, unlike mc-heads which silently serves Steve).
        avatar: `https://crafatar.com/avatars/${cleanUuid}?size=256&overlay`,
        head: `https://crafatar.com/renders/head/${cleanUuid}?size=256&overlay`,
        body: `https://crafatar.com/renders/body/${cleanUuid}?size=256&overlay`,
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    })
  } catch (error) {
    console.error('[player-api] error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch player data' },
      { status: 500 }
    )
  }
}
