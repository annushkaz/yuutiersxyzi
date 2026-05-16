import Link from 'next/link'
import Image from 'next/image'
import { Compass, Flame, Sparkles, BookOpen, Code2, MessageCircle, Pickaxe, Sword, Shield, Heart, Zap, Box, Map, Users, Gamepad2 } from 'lucide-react'
import {
  DocsTitle,
  DocsSection,
  Callout,
  DocsPager,
  StatGrid,
} from '@/components/docs/docs-ui'

export const metadata = { 
  title: 'Introduction · YuuTiers Wiki',
  description: 'The complete Minecraft wiki covering all three dimensions, biomes, mobs, structures, crafting, and gameplay mechanics.'
}

const pillars = [
  {
    href: '/docs/overworld',
    icon: Compass,
    title: 'The Overworld',
    color: '#22c55e',
    desc: 'The starting dimension. Forests, oceans, mountains, mobs, ores and structures.',
    image: '/minecraft-landscape.jpg',
  },
  {
    href: '/docs/nether',
    icon: Flame,
    title: 'The Nether',
    color: '#ef4444',
    desc: 'A hellish dimension of lava, fortresses, bastions and powerful mobs.',
    image: '/wiki/nether-hero.jpg',
  },
  {
    href: '/docs/end',
    icon: Sparkles,
    title: 'The End',
    color: '#a78bfa',
    desc: 'A void-floating dimension home to the Ender Dragon and End Cities.',
    image: '/wiki/end-hero.jpg',
  },
]

const quickLinks = [
  { href: '/docs/overworld/biomes', icon: Map, label: 'Biomes', desc: '60+ unique environments' },
  { href: '/docs/overworld/mobs', icon: Users, label: 'Mobs', desc: 'Creatures & enemies' },
  { href: '/docs/overworld/ores', icon: Pickaxe, label: 'Resources', desc: 'Mining & materials' },
  { href: '/docs/overworld/structures', icon: Box, label: 'Structures', desc: 'Generated buildings' },
  { href: '/docs/api', icon: Code2, label: 'API Docs', desc: 'Developer resources' },
  { href: '/docs/faq', icon: MessageCircle, label: 'FAQ', desc: 'Common questions' },
]

const gameStats = [
  { label: 'Dimensions', value: '3', accent: '#3b82f6' },
  { label: 'Biomes', value: '80+' },
  { label: 'Mobs', value: '70+' },
  { label: 'Blocks', value: '800+' },
]

export default function DocsIntroPage() {
  return (
    <>
      {/* Hero Section */}
      <header className="relative -mt-2 mb-10 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] aspect-[16/7]">
        <Image
          src="/hero-bg.jpg"
          alt="Minecraft landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
        <div className="absolute inset-0 flex items-end p-6 sm:p-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold mb-3 bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6]/30">
              <Gamepad2 className="w-3 h-3" />
              Community Wiki
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f1f1f7] mb-3 leading-[1.05]">
              The YuuTiers Minecraft Wiki
            </h1>
            <p className="text-[#b5b5c8] text-base sm:text-lg leading-relaxed text-pretty">
              A comprehensive, community-maintained handbook covering every dimension, biome, mob, structure, and game mechanic in Minecraft.
            </p>
          </div>
        </div>
      </header>

      <StatGrid items={gameStats} />

      <DocsSection title="Three dimensions, one game">
        <p>
          Minecraft is structured around <span className="text-[#f1f1f7] font-medium">three unique dimensions</span>, each with its own rules, biomes, blocks, and inhabitants. This wiki dedicates a full section to each one, with detailed sub-pages on biomes, mobs, structures, and resources.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {pillars.map((p) => {
            const Icon = p.icon
            return (
              <Link
                key={p.href}
                href={p.href}
                className="group relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[4/3]"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${p.color}25`, border: `1px solid ${p.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <div className="text-[#f1f1f7] font-bold text-lg mb-1 flex items-center gap-1.5">
                    {p.title}
                    <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
                  </div>
                  <p className="text-[#8a8aa3] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </DocsSection>

      <DocsSection title="Quick navigation">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-3 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4 hover:border-[rgba(255,255,255,0.14)] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#60a5fa]" />
                </div>
                <div>
                  <p className="text-[#f1f1f7] font-semibold text-sm">{link.label}</p>
                  <p className="text-[#5a5a76] text-xs">{link.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </DocsSection>

      <DocsSection title="Game progression overview">
        <p>
          Minecraft has no fixed storyline, but there is a natural progression path that most players follow:
        </p>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-8 h-8 rounded-full bg-[#22c55e]/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#22c55e] font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Survive Your First Night</h4>
              <p className="text-[#8a8aa3] text-sm">Gather wood, craft tools, build shelter, and find food before hostile mobs spawn at nightfall.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-8 h-8 rounded-full bg-[#f59e0b]/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#f59e0b] font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Mine and Progress</h4>
              <p className="text-[#8a8aa3] text-sm">Dig deep to find iron, then diamond. Enchant your gear and build farms for sustainable resources.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-8 h-8 rounded-full bg-[#ef4444]/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#ef4444] font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Conquer the Nether</h4>
              <p className="text-[#8a8aa3] text-sm">Build a portal, collect blaze rods and ancient debris, and trade with piglins for rare items.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-8 h-8 rounded-full bg-[#a78bfa]/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#a78bfa] font-bold text-sm">4</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Defeat the Ender Dragon</h4>
              <p className="text-[#8a8aa3] text-sm">Find the stronghold, activate the End portal, and slay the dragon to &quot;beat&quot; the game.</p>
            </div>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Key game mechanics">
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-[#ef4444]" />
              <h4 className="text-[#f1f1f7] font-semibold">Health & Hunger</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">You have 20 health points (10 hearts) and a hunger bar. Eat food to regenerate health and sprint.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Pickaxe className="w-4 h-4 text-[#60a5fa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Tool Tiers</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Wood → Stone → Iron → Diamond → Netherite. Higher tiers mine faster and unlock new ores.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#a78bfa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Enchanting</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Use an enchanting table with lapis and XP to add powerful abilities to your gear.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#22c55e]" />
              <h4 className="text-[#f1f1f7] font-semibold">Combat</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Time your attacks for critical hits, use shields to block, and manage your armor durability.</p>
          </div>
        </div>
      </DocsSection>

      <Callout type="warning" title="Not affiliated with Mojang">
        YuuTiers is{' '}
        <span className="text-[#f1f1f7] font-medium">
          not affiliated with, endorsed, sponsored, or specifically approved by Mojang AB or Microsoft
        </span>
        . All Minecraft trademarks belong to their respective owners. This wiki is
        maintained by fans for educational and community use.
      </Callout>

      <DocsSection title="How to use this wiki">
        <ul className="space-y-2 text-[#8a8aa3] leading-relaxed list-none p-0">
          <li className="flex gap-3">
            <BookOpen className="w-4 h-4 mt-1 text-[#60a5fa] shrink-0" />
            Use the <span className="text-[#f1f1f7]">sidebar</span> to navigate between dimensions, biomes, mobs, and structures.
          </li>
          <li className="flex gap-3">
            <Code2 className="w-4 h-4 mt-1 text-[#60a5fa] shrink-0" />
            Developers can explore the public API under the{' '}
            <Link href="/docs/api" className="text-[#60a5fa] hover:underline">Developers</Link>{' '}
            section.
          </li>
          <li className="flex gap-3">
            <MessageCircle className="w-4 h-4 mt-1 text-[#60a5fa] shrink-0" />
            Found something missing or incorrect? Reach us via{' '}
            <Link href="/docs/contact" className="text-[#60a5fa] hover:underline">contact</Link>.
          </li>
        </ul>
      </DocsSection>

      <DocsPager next={{ href: '/docs/quickstart', label: 'Quick start' }} />
    </>
  )
}
