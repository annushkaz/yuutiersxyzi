import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    // Use Crafty.gg search API for fuzzy player search
    const craftyRes = await fetch(
      `https://api.crafty.gg/api/v2/players/search?username=${encodeURIComponent(query)}`,
      { 
        headers: { 'User-Agent': 'YuuTiers/1.0' },
        next: { revalidate: 60 }
      }
    )

    if (craftyRes.ok) {
      const data = await craftyRes.json()
      const results = (data.data || []).slice(0, 8).map((p: { username: string; uuid: string }) => ({
        name: p.username,
        uuid: p.uuid,
        avatar: `https://crafatar.com/avatars/${p.uuid.replace(/-/g, '')}?size=64&overlay=true`,
      }))
      return NextResponse.json({ results })
    }

    // Fallback: try direct Mojang lookup as exact match
    const directRes = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(query)}`,
      { headers: { 'User-Agent': 'YuuTiers/1.0' } }
    )

    if (directRes.ok) {
      const profile = await directRes.json()
      return NextResponse.json({
        results: [{
          name: profile.name,
          uuid: profile.id,
          avatar: `https://crafatar.com/avatars/${profile.id}?size=64&overlay=true`,
        }]
      })
    }

    return NextResponse.json({ results: [] })
  } catch (error) {
    console.error('[player-search] error:', error)
    return NextResponse.json({ results: [] })
  }
}
