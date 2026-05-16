import Link from 'next/link'
import { ExternalLink, Server, Users, Newspaper, Palette, BookOpen, Activity, Globe2, Shield } from 'lucide-react'
import { DocsTitle, DocsSection, DocsPager, Callout } from '@/components/docs/docs-ui'

export const metadata = {
  title: 'Data Sources & APIs | YuuTiers Docs',
  description: 'All third-party APIs and data sources powering YuuTiers — Mojang, Crafatar, mc-heads, mcsrvstat.us, Minecraft Wiki and more.',
}

interface ApiSource {
  name: string
  url: string
  docs: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  category: string
  description: string
  endpoints: string[]
  rateLimit: string
  auth: string
}

const apiSources: ApiSource[] = [
  {
    name: 'Mojang API',
    url: 'https://api.mojang.com',
    docs: 'https://wiki.vg/Mojang_API',
    icon: Users,
    color: '#22c55e',
    category: 'Players',
    description:
      'Official Mojang API. We use it to resolve usernames to UUIDs, fetch profile data and the encoded texture properties needed to render skins and capes.',
    endpoints: [
      'GET https://api.mojang.com/users/profiles/minecraft/{name}',
      'GET https://sessionserver.mojang.com/session/minecraft/profile/{uuid}',
    ],
    rateLimit: '~600 requests / 10 min per IP',
    auth: 'None — public API',
  },
  {
    name: 'Crafatar',
    url: 'https://crafatar.com',
    docs: 'https://crafatar.com/#documentation',
    icon: Palette,
    color: '#a78bfa',
    category: 'Skins',
    description:
      'Free CDN that renders Minecraft avatars, heads and full-body images straight from Mojang textures. We proxy and cache its renders at the edge.',
    endpoints: [
      'GET https://crafatar.com/avatars/{uuid}',
      'GET https://crafatar.com/renders/head/{uuid}',
      'GET https://crafatar.com/renders/body/{uuid}',
      'GET https://crafatar.com/skins/{uuid}',
      'GET https://crafatar.com/capes/{uuid}',
    ],
    rateLimit: 'Soft — please cache aggressively',
    auth: 'None — public CDN',
  },
  {
    name: 'mc-heads.net',
    url: 'https://mc-heads.net',
    docs: 'https://mc-heads.net/',
    icon: Palette,
    color: '#3b82f6',
    category: 'Skins',
    description:
      'Fallback render service used when Crafatar is rate limited or returns 404. Supports both username and UUID lookups.',
    endpoints: [
      'GET https://mc-heads.net/avatar/{name|uuid}/{size}',
      'GET https://mc-heads.net/head/{name|uuid}/{size}',
      'GET https://mc-heads.net/body/{name|uuid}/{size}',
      'GET https://mc-heads.net/skin/{uuid}',
    ],
    rateLimit: 'Generous, no hard quota',
    auth: 'None — public CDN',
  },
  {
    name: 'Visage (SurgePlay)',
    url: 'https://visage.surgeplay.com',
    docs: 'https://github.com/prplz/visage',
    icon: Palette,
    color: '#ec4899',
    category: 'Skins',
    description:
      'High-quality Minecraft avatar renderer. Used as a primary source for sharper face and full-body renders.',
    endpoints: [
      'GET https://visage.surgeplay.com/face/{size}/{uuid}',
      'GET https://visage.surgeplay.com/head/{size}/{uuid}',
      'GET https://visage.surgeplay.com/full/{size}/{uuid}',
    ],
    rateLimit: 'Fair-use, edge cached',
    auth: 'None — public CDN',
  },
  {
    name: 'minotar.net',
    url: 'https://minotar.net',
    docs: 'https://minotar.net/',
    icon: Palette,
    color: '#f59e0b',
    category: 'Skins',
    description:
      'Lightweight legacy avatar service kept as a third fallback to keep skin loading bullet-proof on every search.',
    endpoints: [
      'GET https://minotar.net/avatar/{name}/{size}',
      'GET https://minotar.net/cube/{name}/{size}',
      'GET https://minotar.net/armor/body/{name}/{size}',
    ],
    rateLimit: 'Generous',
    auth: 'None',
  },
  {
    name: 'mcsrvstat.us',
    url: 'https://api.mcsrvstat.us',
    docs: 'https://api.mcsrvstat.us/',
    icon: Server,
    color: '#22c55e',
    category: 'Servers',
    description:
      'Live status, MOTD, version, player counts and server icons for any Java or Bedrock Minecraft server. We hit it directly from the client and cache responses.',
    endpoints: [
      'GET https://api.mcsrvstat.us/3/{ip}',
      'GET https://api.mcsrvstat.us/bedrock/3/{ip}',
      'GET https://api.mcsrvstat.us/icon/{ip}',
    ],
    rateLimit: '1 request / address every minute (cached on their side)',
    auth: 'None',
  },
  {
    name: 'Minecraft Wiki API',
    url: 'https://es.minecraft.wiki/api.php',
    docs: 'https://www.mediawiki.org/wiki/API:Main_page',
    icon: BookOpen,
    color: '#3b82f6',
    category: 'Wiki',
    description:
      'Official MediaWiki action API for the Spanish Minecraft Wiki. Powers our search, article rendering, recent changes feed and category browser.',
    endpoints: [
      'GET ?action=query&list=search&srsearch={q}',
      'GET ?action=parse&page={title}&prop=text|sections|images',
      'GET ?action=query&list=recentchanges',
      'GET ?action=query&list=categorymembers&cmtitle=Category:{cat}',
    ],
    rateLimit: 'Standard MediaWiki — please send a User-Agent',
    auth: 'None for read-only',
  },
  {
    name: 'Mojang News (RSS)',
    url: 'https://www.minecraft.net/en-us/feeds/community-content',
    docs: 'https://www.minecraft.net/',
    icon: Newspaper,
    color: '#f59e0b',
    category: 'News',
    description:
      'Aggregated official Minecraft news. We parse the public RSS / Atom feed and a community-content endpoint to populate the News section.',
    endpoints: [
      'GET https://www.minecraft.net/en-us/feeds/community-content',
      'GET https://www.minecraft.net/article-grid.json',
    ],
    rateLimit: 'Use SWR caching',
    auth: 'None',
  },
  {
    name: 'Hypixel API',
    url: 'https://api.hypixel.net',
    docs: 'https://api.hypixel.net/',
    icon: Activity,
    color: '#facc15',
    category: 'Players',
    description:
      'Per-player Hypixel statistics — Bedwars, Skywars, Duels, network level and more. Requires an API key obtained from developer.hypixel.net.',
    endpoints: [
      'GET https://api.hypixel.net/v2/player?uuid={uuid}',
      'GET https://api.hypixel.net/v2/status?uuid={uuid}',
    ],
    rateLimit: '120 requests / minute / key',
    auth: 'API key (header: API-Key)',
  },
]

const categories = ['Players', 'Skins', 'Servers', 'Wiki', 'News'] as const

export default function ApiIndexPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Data sources"
        title="APIs we use"
        description="YuuTiers is a thin, beautifully cached proxy on top of the public Minecraft data ecosystem. Below is every third-party API that powers the site."
      />

      <DocsSection title="The stack at a glance">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
          {apiSources.map((api) => {
            const Icon = api.icon
            return (
              <a
                key={api.name}
                href={api.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4 hover:border-[rgba(255,255,255,0.18)] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${api.color}1a`, border: `1px solid ${api.color}33` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: api.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-[#f1f1f7] font-semibold text-sm truncate">{api.name}</p>
                      <ExternalLink className="w-3 h-3 text-[#5a5a76] group-hover:text-[#60a5fa]" />
                    </div>
                    <p className="text-[#5a5a76] text-[11px] uppercase tracking-wider font-bold mt-0.5">
                      {api.category}
                    </p>
                  </div>
                </div>
                <p className="text-[#8a8aa3] text-xs mt-3 leading-relaxed line-clamp-2">{api.description}</p>
              </a>
            )
          })}
        </div>
      </DocsSection>

      {categories.map((cat) => {
        const items = apiSources.filter((a) => a.category === cat)
        if (items.length === 0) return null
        return (
          <DocsSection key={cat} title={cat}>
            <div className="space-y-3 mt-2">
              {items.map((api) => {
                const Icon = api.icon
                return (
                  <div
                    key={api.name}
                    className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden"
                  >
                    <div className="flex items-start gap-4 p-5 border-b border-[rgba(255,255,255,0.04)]">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${api.color}1a`, border: `1px solid ${api.color}33` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: api.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[#f1f1f7] font-bold text-base">{api.name}</h3>
                          <a
                            href={api.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#60a5fa] hover:underline"
                          >
                            <Globe2 className="w-3 h-3" />
                            base
                          </a>
                          <a
                            href={api.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#a78bfa] hover:underline"
                          >
                            <BookOpen className="w-3 h-3" />
                            docs
                          </a>
                        </div>
                        <p className="text-[#8a8aa3] text-sm mt-1.5 leading-relaxed">{api.description}</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-px bg-[rgba(255,255,255,0.04)]">
                      <div className="bg-[#0a0a10] p-4">
                        <p className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-bold mb-1.5 flex items-center gap-1.5">
                          <Activity className="w-3 h-3" /> Rate limit
                        </p>
                        <p className="text-[#f1f1f7] text-sm">{api.rateLimit}</p>
                      </div>
                      <div className="bg-[#0a0a10] p-4">
                        <p className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-bold mb-1.5 flex items-center gap-1.5">
                          <Shield className="w-3 h-3" /> Auth
                        </p>
                        <p className="text-[#f1f1f7] text-sm">{api.auth}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[#07070b] border-t border-[rgba(255,255,255,0.04)]">
                      <p className="text-[10px] uppercase tracking-wider text-[#5a5a76] font-bold mb-2">
                        Example endpoints
                      </p>
                      <div className="space-y-1.5">
                        {api.endpoints.map((ep) => (
                          <code
                            key={ep}
                            className="block text-[12px] font-mono text-[#a5d6ff] bg-[#050507] border border-[rgba(255,255,255,0.04)] rounded px-3 py-1.5 overflow-x-auto whitespace-nowrap"
                          >
                            {ep}
                          </code>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </DocsSection>
        )
      })}

      <Callout type="warning" title="Be a good citizen">
        Most of these APIs are free, community-run or rate-limited. Always set a meaningful{' '}
        <code className="text-[#60a5fa]">User-Agent</code> with contact info, cache responses
        aggressively at the edge and never proxy raw uncached traffic to your end users.
      </Callout>

      <DocsSection title="How YuuTiers stitches them together">
        <ul className="space-y-2.5 text-[#8a8aa3] text-[15px]">
          <li className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
            Username → Mojang API → UUID → Crafatar / Visage / mc-heads renders, with three
            independent fallbacks per render type.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
            Server IP → mcsrvstat.us → motd, players, version & icon, refreshed every 30s on the client.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#a78bfa] shrink-0" />
            Wiki search → MediaWiki action API → live HTML, sections, images and recent changes
            feed, all proxied through one Next.js route handler.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
            News section → minecraft.net feeds → SWR-cached on Vercel&apos;s edge for sub-100ms loads.
          </li>
        </ul>
      </DocsSection>

      <DocsPager
        prev={{ href: '/docs/end/structures', label: 'End Structures' }}
        next={{ href: '/docs/rate-limits', label: 'Rate limits' }}
      />
    </>
  )
}
