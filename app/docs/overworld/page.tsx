import Link from 'next/link'
import Image from 'next/image'
import {
  DocsTitle,
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  StatGrid,
  WikiTable,
} from '@/components/docs/docs-ui'
import { TreePine, Mountain, Droplets, Sun, Moon, Cloud, Compass, Pickaxe, Skull, Home } from 'lucide-react'

export const metadata = { 
  title: 'The Overworld · YuuTiers Wiki',
  description: 'Complete guide to the Overworld dimension in Minecraft — biomes, mobs, ores, structures, day/night cycle, and weather systems.'
}

export default function OverworldPage() {
  return (
    <>
      <WikiHero
        image="/minecraft-landscape.jpg"
        eyebrow="Dimension"
        title="The Overworld"
        description="The primary dimension where every Minecraft adventure begins. A vast world of forests, oceans, mountains, caves and over 60 unique biomes."
        accent="#22c55e"
      />

      <StatGrid
        items={[
          { label: 'Build height', value: '−64 → 320', accent: '#22c55e' },
          { label: 'Time cycle', value: '20 min day' },
          { label: 'Biomes', value: '60+' },
          { label: 'Sky', value: 'Yes' },
        ]}
      />

      <DocsTitle
        eyebrow="The Overworld"
        title="Overview"
        description="Everything you need to know about Minecraft's main dimension — its rules, its weather, and the resources you can harvest from it."
      />

      <DocsSection title="What is the Overworld?">
        <p>
          The <span className="text-[#f1f1f7]">Overworld</span> is the default dimension you spawn into when starting a new world. It&apos;s the largest and most diverse of the three dimensions and serves as the &quot;hub&quot; for the entire game — both the Nether and the End are reached from here.
        </p>
        <p>
          Worlds are practically infinite on the X/Z axes (about 30 million blocks each direction). The vertical world ranges from{' '}
          <span className="text-[#f1f1f7]">Y = −64</span> at bedrock to{' '}
          <span className="text-[#f1f1f7]">Y = 320</span> at build limit.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="w-4 h-4 text-[#22c55e]" />
              <h4 className="text-[#f1f1f7] font-semibold">Surface Level</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Y 62-100. Where biomes generate with grass, trees, villages, and most passive mobs.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Mountain className="w-4 h-4 text-[#9ca3af]" />
              <h4 className="text-[#f1f1f7] font-semibold">Mountains</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Y 100-256. High peaks with goats, powder snow, and emerald ore in stony biomes.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Pickaxe className="w-4 h-4 text-[#60a5fa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Caves</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Y 0 to -64. Where deepslate replaces stone and diamonds are most common at Y -59.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-[#3b82f6]" />
              <h4 className="text-[#f1f1f7] font-semibold">Oceans</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Sea level at Y 62. Contains coral reefs, shipwrecks, ocean monuments, and drowned.</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Day/night cycle">
        <p>
          A full Minecraft day lasts <span className="text-[#f1f1f7]">20 real-time minutes</span> (24,000 in-game ticks). Hostile mobs spawn at night when light level drops to 0, and undead mobs burn in direct sunlight the next morning — sleeping in a bed during night skips ahead to dawn.
        </p>
        
        <WikiTable
          headers={['Phase', 'Ticks', 'Real time', 'Light level']}
          rows={[
            ['Day', '0 – 12,000', '10 min', '15 (full)'],
            ['Sunset', '12,000 – 13,000', '~50 s', '15 → 4'],
            ['Night', '13,000 – 23,000', '~8 min', '4 (mobs spawn)'],
            ['Sunrise', '23,000 – 24,000', '~50 s', '4 → 15'],
          ]}
        />
        
        <div className="flex items-center gap-4 mt-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-[#8a8aa3] text-sm">6:00 AM</span>
          </div>
          <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-[#f59e0b] via-[#60a5fa] to-[#1e3a5f]" />
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-[#a78bfa]" />
            <span className="text-[#8a8aa3] text-sm">6:00 PM</span>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Weather">
        <p>
          The Overworld has dynamic weather that affects gameplay:
        </p>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <Cloud className="w-5 h-5 text-[#60a5fa] mt-0.5" />
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Rain</h4>
              <p className="text-[#8a8aa3] text-sm">Darkens the sky and douses fires. In cold biomes it falls as snow. Fish bite faster during rain.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <span className="text-xl">⚡</span>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Thunderstorms</h4>
              <p className="text-[#8a8aa3] text-sm">Adds lightning that can spawn <span className="text-[#f1f1f7]">Charged Creepers</span>, turn pigs into <span className="text-[#f1f1f7]">Zombified Piglins</span>, and set fires. Mobs spawn during day because light level drops.</p>
            </div>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="What&apos;s in the Overworld?">
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <Link 
            href="/docs/overworld/biomes"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9]"
          >
            <Image
              src="/wiki/overworld-biomes.jpg"
              alt="Overworld biomes"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                60+ biomes
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
              <p className="text-[#8a8aa3] text-sm">From icy peaks to lush jungles and mushroom islands.</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/overworld/mobs"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9]"
          >
            <Image
              src="/wiki/overworld-mobs.jpg"
              alt="Overworld mobs"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                Passive, neutral & hostile mobs
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
              <p className="text-[#8a8aa3] text-sm">With unique drops and behaviors.</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/overworld/ores"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9]"
          >
            <Image
              src="/wiki/overworld-ores.jpg"
              alt="Overworld ores"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                All progression ores
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
              <p className="text-[#8a8aa3] text-sm">From coal to ancient debris, hidden across cave layers.</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/overworld/structures"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9]"
          >
            <Image
              src="/wiki/overworld-structures.jpg"
              alt="Overworld structures"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                Generated structures
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
              <p className="text-[#8a8aa3] text-sm">Villages, temples, monuments, strongholds and more.</p>
            </div>
          </Link>
        </div>
      </DocsSection>

      <DocsSection title="Survival tips">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-4 h-4 text-[#f59e0b]" />
              <h4 className="text-[#f1f1f7] font-semibold">Set your spawn</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Sleep in a bed before exploring. If you die, you&apos;ll respawn there instead of the world spawn.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#60a5fa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Mark your base</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Build a tall pillar or write down coordinates. Getting lost is easy in the vast Overworld.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Skull className="w-4 h-4 text-[#ef4444]" />
              <h4 className="text-[#f1f1f7] font-semibold">Light up your area</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Mobs spawn in darkness (light level 0). Place torches everywhere to prevent hostile spawns.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-[#3b82f6]" />
              <h4 className="text-[#f1f1f7] font-semibold">Carry a water bucket</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Saves you from fall damage, extinguishes fire, and helps descend into caves safely.</p>
          </div>
        </div>
      </DocsSection>

      <Callout type="info" title="Did you know?">
        The Overworld&apos;s vertical scale was expanded in Minecraft 1.18 with the{' '}
        <span className="text-[#f1f1f7]">Caves &amp; Cliffs</span> update, doubling the depth of caves and the height of mountains. The deepslate layer below Y 0 contains different variants of all ores.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/quickstart', label: 'Quick start' }}
        next={{ href: '/docs/overworld/biomes', label: 'Biomes' }}
      />
    </>
  )
}
