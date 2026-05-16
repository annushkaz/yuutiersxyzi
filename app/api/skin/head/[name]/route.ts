import { NextResponse } from "next/server"

export const runtime = "edge"
export const revalidate = 3600

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params
  const cleanName = name.replace(/[^a-zA-Z0-9_]/g, "")

  const fallbackUuid = "8667ba71b85a4004af54457a9734eed7"

  async function fetchAvatar(uuid: string): Promise<Response | null> {
    try {
      const r = await fetch(
        `https://crafatar.com/avatars/${uuid}?size=128&overlay&default=MHF_Steve`,
        { next: { revalidate: 3600 } },
      )
      if (!r.ok) return null
      const buf = await r.arrayBuffer()
      return new Response(buf, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        },
      })
    } catch {
      return null
    }
  }

  let uuid = fallbackUuid

  if (cleanName) {
    try {
      const profileRes = await fetch(
        `https://api.mojang.com/users/profiles/minecraft/${cleanName}`,
        { next: { revalidate: 3600 } },
      )
      if (profileRes.ok) {
        const profile = await profileRes.json()
        if (profile?.id) uuid = profile.id
      }
    } catch {
      // ignore, use fallback uuid
    }
  }

  const primary = await fetchAvatar(uuid)
  if (primary) return primary
  const fallback = await fetchAvatar(fallbackUuid)
  if (fallback) return fallback
  return NextResponse.redirect(
    "https://crafatar.com/avatars/8667ba71b85a4004af54457a9734eed7?size=128&overlay&default=MHF_Steve",
    302,
  )
}
