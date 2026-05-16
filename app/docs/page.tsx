import Link from 'next/link'
import { Compass, Flame, Sparkles, BookOpen, Code2, MessageCircle } from 'lucide-react'
import {
  DocsTitle,
  DocsSection,
  Callout,
  DocsPager,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'Introduction · YuuTiers Wiki' }

const pillars = [
  {
    href: '/docs/overworld',
    icon: Compass,
    title: 'The Overworld',
    color: '#22c55e',
    desc: 'The starting dimension. Forests, oceans, mountains, mobs, ores and structures.',
  },
  {
    href: '/docs/nether',
    icon: Flame,
    title: 'The Nether',
    color: '#ef4444',
    desc: 'A hellish dimension of lava, fortresses, bastions and powerful mobs.',
  },
  {
    href: '/docs/end',
    icon: Sparkles,
    title: 'The End',
    color: '#a78bfa',
    desc: 'A void-floating dimension home to the Ender Dragon and End Cities.',
  },
]

export default function DocsIntroPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Welcome"
        title="The YuuTiers Minecraft Wiki"
        description="A community-maintained handbook covering every dimension, biome, mob, structure and resource in the game. Built for new players and veterans alike."
      />

      <DocsSection title="Three dimensions, one game">
        <p>
          Minecraft is structured around three dimensions, each with its own rules,
          biomes, blocks and inhabitants. This wiki dedicates a full section to each
          one, with sub-pages on biomes, mobs, structures and gameable resources.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          {pillars.map((p) => {
            const Icon = p.icon
            return (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5 hover:border-[rgba(255,255,255,0.14)] transition-all"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${p.color}1a`, border: `1px solid ${p.color}33` }}
                >
                  <Icon className="w-4 h-4" style={{ color: p.color }} />
                </div>
                <div className="text-[#f1f1f7] font-semibold mb-1 flex items-center gap-1.5">
                  {p.title}
                  <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
                </div>
                <p className="text-[#8a8aa3] text-sm leading-relaxed">{p.desc}</p>
              </Link>
            )
          })}
        </div>
      </DocsSection>

      <DocsSection title="Unofficial fan project">
        <Callout type="warning" title="Not affiliated with Mojang">
          YuuTiers is{' '}
          <span className="text-[#f1f1f7] font-medium">
            not affiliated with, endorsed, sponsored, or specifically approved by Mojang AB or Microsoft
          </span>
          . All Minecraft trademarks belong to their respective owners. This wiki is
          maintained by fans for educational and community use.
        </Callout>
      </DocsSection>

      <DocsSection title="How to navigate">
        <ul className="space-y-2 text-[#8a8aa3] leading-relaxed list-none p-0">
          <li className="flex gap-3">
            <BookOpen className="w-4 h-4 mt-1 text-[#60a5fa] shrink-0" />
            Use the <span className="text-[#f1f1f7]">sidebar</span> to jump between
            dimensions, mob lists, biomes and structures.
          </li>
          <li className="flex gap-3">
            <Code2 className="w-4 h-4 mt-1 text-[#60a5fa] shrink-0" />
            Developers can explore the public API under the{' '}
            <Link href="/docs/api" className="text-[#60a5fa] hover:underline">Developers</Link>{' '}
            section.
          </li>
          <li className="flex gap-3">
            <MessageCircle className="w-4 h-4 mt-1 text-[#60a5fa] shrink-0" />
            Spotted something missing? Reach us via{' '}
            <Link href="/docs/contact" className="text-[#60a5fa] hover:underline">contact</Link>.
          </li>
        </ul>
      </DocsSection>

      <DocsPager next={{ href: '/docs/quickstart', label: 'Quick start' }} />
    </>
  )
}
