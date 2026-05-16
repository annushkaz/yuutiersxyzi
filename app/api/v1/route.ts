import { ok, preflight } from '@/lib/api-response'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const base = `${url.protocol}//${url.host}/api/v1`

  return ok(
    {
      name: 'YuuTiers Public API',
      version: 'v1',
      description:
        'Internal Minecraft API powering yuutiers.xyz. Resolves players, servers, skins, news, the wiki and live infrastructure status. CORS enabled.',
      statusUrl: `${url.protocol}//${url.host}/status`,
      rateLimit: {
        anonymous: { requests: 60, windowSeconds: 60 },
        note: 'Per-IP. Real, persisted with Redis. CORS enabled. Cache responses where you can.',
      },
      endpoints: [
        { path: '/api/v1/players/{username}', method: 'GET', example: `${base}/players/Notch`, description: 'Resolve a Minecraft player by username (or UUID).' },
        { path: '/api/v1/players/search?q={q}', method: 'GET', example: `${base}/players/search?q=Notch`, description: 'Search players by partial name.' },
        { path: '/api/v1/uuid/{uuid}/history', method: 'GET', example: `${base}/uuid/069a79f444e94726a5befca90e38aaf5/history`, description: 'Name history for a UUID (community-sourced).' },
        { path: '/api/v1/skins/{username}', method: 'GET', example: `${base}/skins/Notch`, description: 'Skin URL, variant and ready-to-use render URLs.' },
        { path: '/api/v1/skins/{username}/head', method: 'GET', example: `${base}/skins/Notch/head`, description: 'Direct PNG head render.' },
        { path: '/api/v1/servers/{ip}', method: 'GET', example: `${base}/servers/hypixel.net`, description: 'Live status of a Java Edition server.' },
        { path: '/api/v1/minecraft/versions', method: 'GET', example: `${base}/minecraft/versions`, description: 'Official Minecraft version manifest.' },
        { path: '/api/v1/news', method: 'GET', example: `${base}/news`, description: 'Aggregated official Minecraft & Mojang news.' },
        { path: '/api/v1/wiki?q={q}', method: 'GET', example: `${base}/wiki?q=Diamond`, description: 'Search Minecraft Wiki articles.' },
        { path: '/api/v1/status', method: 'GET', example: `${base}/status`, description: 'Live status of every upstream API. Real persisted uptime.' },
        { path: '/api/v1/incidents', method: 'GET', example: `${base}/incidents`, description: 'Real, historical incidents auto-detected.' },
        { path: '/api/v1/changelogs', method: 'GET', example: `${base}/changelogs`, description: 'YuuTiers product changelogs.' },
      ],
      conventions: {
        responseEnvelope: {
          success: 'boolean',
          data: 'response payload (only on success)',
          error: '{ code, message, details } (only on failure)',
          meta: '{ requestId, cached, timestamp, version }',
        },
        errors: [
          { code: 'invalid_input', http: 400 },
          { code: 'not_found', http: 404 },
          { code: 'rate_limited', http: 429 },
          { code: 'upstream_failure', http: 502 },
          { code: 'service_unavailable', http: 503 },
          { code: 'internal_error', http: 500 },
        ],
      },
    },
    { cacheControl: 'public, s-maxage=300' },
  )
}
