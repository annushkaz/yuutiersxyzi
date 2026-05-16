'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const groups = [
  {
    label: 'Getting started',
    items: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/quickstart', label: 'Quick start' },
    ],
  },
  {
    label: 'The Overworld',
    accent: '#22c55e',
    items: [
      { href: '/docs/overworld', label: 'Overview' },
      { href: '/docs/overworld/biomes', label: 'Biomes' },
      { href: '/docs/overworld/mobs', label: 'Mobs' },
      { href: '/docs/overworld/ores', label: 'Resources & ores' },
      { href: '/docs/overworld/structures', label: 'Structures' },
    ],
  },
  {
    label: 'The Nether',
    accent: '#ef4444',
    items: [
      { href: '/docs/nether', label: 'Overview' },
      { href: '/docs/nether/biomes', label: 'Biomes' },
      { href: '/docs/nether/mobs', label: 'Mobs' },
      { href: '/docs/nether/structures', label: 'Fortresses & Bastions' },
    ],
  },
  {
    label: 'The End',
    accent: '#a78bfa',
    items: [
      { href: '/docs/end', label: 'Overview' },
      { href: '/docs/end/biomes', label: 'Biomes' },
      { href: '/docs/end/mobs', label: 'Mobs' },
      { href: '/docs/end/structures', label: 'End Cities & Elytra' },
    ],
  },
  {
    label: 'Data & APIs',
    accent: '#3b82f6',
    items: [
      { href: '/docs/api', label: 'APIs we use' },
      { href: '/docs/rate-limits', label: 'Rate limits' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { href: '/docs/faq', label: 'FAQ' },
      { href: '/docs/privacy', label: 'Privacy & data' },
      { href: '/docs/changelog', label: 'Changelog' },
      { href: '/docs/contact', label: 'Contact' },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-2">
      <nav className="space-y-7">
        {groups.map((g) => (
          <div key={g.label}>
            <div
              className="text-[10px] uppercase tracking-wider font-semibold mb-2.5 px-3 flex items-center gap-1.5"
              style={{ color: g.accent ?? '#5a5a76' }}
            >
              {g.accent && (
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: g.accent, boxShadow: `0 0 8px ${g.accent}` }}
                />
              )}
              {g.label}
            </div>
            <ul className="space-y-0.5">
              {g.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative flex items-center px-3 py-1.5 rounded-md text-sm transition-all',
                        isActive
                          ? 'bg-[#3b82f6]/10 text-[#60a5fa] font-medium'
                          : 'text-[#8a8aa3] hover:text-[#f1f1f7] hover:bg-[rgba(255,255,255,0.03)]'
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[#3b82f6]" />
                      )}
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-8 rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4">
        <Heart className="w-4 h-4 text-[#ef4444] mb-2" />
        <p className="text-[#f1f1f7] text-sm font-semibold mb-1">Built with care</p>
        <p className="text-[#8a8aa3] text-xs leading-relaxed">
          A community-made Minecraft wiki by{' '}
          <Link href="/team" className="text-[#60a5fa] hover:underline">
            Annushkaz_Yuu
          </Link>{' '}
          &amp;{' '}
          <Link href="/team" className="text-[#a78bfa] hover:underline">
            Dexy_Yuu
          </Link>
          .
        </p>
      </div>
    </aside>
  )
}
