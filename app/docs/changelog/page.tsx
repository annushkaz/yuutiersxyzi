import { DocsTitle, DocsPager } from '@/components/docs/docs-ui'

export const metadata = { title: 'Changelog | YuuTiers Docs' }

const releases = [
  {
    version: '2.0.0',
    date: 'May 2026',
    tag: 'Major',
    items: [
      'Brand-new immersive Minecraft-themed homepage hero',
      'Full 3D skin viewer redesign with auto-rotate + walking animation',
      'Multi-page documentation with API reference',
      'Sitewide Mojang disclaimer for total transparency',
      'Fixed edge-runtime base64 decoding that was breaking skin loading',
    ],
  },
  {
    version: '1.4.0',
    date: 'April 2026',
    tag: 'Feature',
    items: [
      'Browser push notifications for new Mojang news',
      'Bedrock server detection in the server lookup',
      'Global command palette (⌘K)',
    ],
  },
  {
    version: '1.3.0',
    date: 'March 2026',
    tag: 'Feature',
    items: [
      'Cape gallery on player profiles',
      'External profile shortcuts (NameMC, LABY, Plancke, Crafty)',
      'Edge-cached skin proxy',
    ],
  },
  {
    version: '1.0.0',
    date: 'January 2026',
    tag: 'Launch',
    items: [
      'First public release',
      'Player lookup, server status, news feed',
      'Built and run by Annushkaz_Yuu and Dexy_Yuu',
    ],
  },
]

const tagStyles: Record<string, string> = {
  Major: 'bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/25',
  Feature: 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/25',
  Launch: 'bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/25',
}

export default function ChangelogPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Resources"
        title="Changelog"
        description="Every meaningful change shipped to YuuTiers, newest first."
      />

      <div className="space-y-6">
        {releases.map((r) => (
          <div
            key={r.version}
            className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-6"
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-lg font-bold text-[#f1f1f7]">v{r.version}</span>
              <span className={`px-2 py-0.5 rounded border text-[10px] font-bold tracking-wider uppercase ${tagStyles[r.tag]}`}>
                {r.tag}
              </span>
              <span className="text-[#5a5a76] text-xs">{r.date}</span>
            </div>
            <ul className="space-y-2">
              {r.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#8a8aa3] text-sm leading-relaxed">
                  <span className="mt-2 w-1 h-1 rounded-full bg-[#3b82f6] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <DocsPager
        prev={{ href: '/docs/privacy', label: 'Privacy & data' }}
        next={{ href: '/docs/contact', label: 'Contact & support' }}
      />
    </>
  )
}
