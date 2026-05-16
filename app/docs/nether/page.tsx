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
import { Flame, Skull, Gem, ArrowRight, AlertTriangle, Compass } from 'lucide-react'

export const metadata = { 
  title: 'The Nether · YuuTiers Wiki',
  description: 'Complete guide to the Nether dimension in Minecraft — biomes, mobs, fortresses, bastions, ancient debris, and survival strategies.'
}

export default function NetherPage() {
  return (
    <>
      <WikiHero
        image="/wiki/nether-hero.jpg"
        eyebrow="Dimension"
        title="The Nether"
        description="A scorched hellscape of lava oceans, soul-bound forests and ancient fortresses. Death waits in every direction — but so do the game's most powerful materials."
        accent="#ef4444"
      />

      <StatGrid
        items={[
          { label: 'Build height', value: '0 → 256', accent: '#ef4444' },
          { label: 'Travel ratio', value: '1 = 8 Overworld' },
          { label: 'Biomes', value: '5' },
          { label: 'Sky', value: 'None (cap)' },
        ]}
      />

      <DocsTitle
        eyebrow="The Nether"
        title="Overview"
        description="A fast-travel dimension full of dangers, riches and unique resources that exist nowhere else."
      />

      <DocsSection title="Getting in">
        <p>
          Build a portal frame out of <span className="text-[#f1f1f7]">obsidian</span>{' '}
          (minimum 4 wide × 5 tall, corners optional, max 23×23) and ignite it with flint and steel. The portal opens a doorway to a randomly-generated location in the Nether.
        </p>
        
        <WikiTable
          headers={['Portal requirement', 'Value']}
          rows={[
            ['Minimum frame size', '4×5 (10 obsidian, no corners)'],
            ['Maximum frame size', '23×23'],
            ['Activation tool', 'Flint and steel, fire charge, or any fire'],
            ['Teleport time', '4 seconds standing in portal'],
            ['Cooldown', '~0.5 seconds before re-entry'],
          ]}
        />
      </DocsSection>

      <DocsSection title="Why it matters">
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="w-4 h-4 text-[#ef4444]" />
              <h4 className="text-[#f1f1f7] font-semibold">Fast travel</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">1 block in the Nether = 8 in the Overworld. Build highways to cross thousands of blocks in minutes.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Gem className="w-4 h-4 text-[#a78bfa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Netherite</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">The only place to find <span className="text-[#f1f1f7]">Ancient Debris</span>, needed for end-game netherite gear.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-[#f59e0b]" />
              <h4 className="text-[#f1f1f7] font-semibold">Blaze rods</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Required for brewing potions and crafting Eyes of Ender to reach the End.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🐷</span>
              <h4 className="text-[#f1f1f7] font-semibold">Piglin trading</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Throw gold ingots at Piglins for ender pearls, fire resistance potions, and rare items.</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="The hazards">
        <Callout type="warning" title="Critical survival rules">
          <ul className="space-y-2 mt-2">
            <li className="flex items-start gap-2">
              <span className="text-[#ef4444] font-bold">•</span>
              <span><span className="text-[#f1f1f7]">No water.</span> Water evaporates instantly when placed.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ef4444] font-bold">•</span>
              <span><span className="text-[#f1f1f7]">No beds.</span> Beds explode violently when you try to sleep.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ef4444] font-bold">•</span>
              <span><span className="text-[#f1f1f7]">No compasses.</span> Compasses spin randomly and maps are useless.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ef4444] font-bold">•</span>
              <span><span className="text-[#f1f1f7]">Lava everywhere.</span> Bring Fire Resistance potions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ef4444] font-bold">•</span>
              <span><span className="text-[#f1f1f7]">Ghasts.</span> Can destroy your portal. Bring flint and steel backup.</span>
            </li>
          </ul>
        </Callout>
      </DocsSection>

      <DocsSection title="What&apos;s in the Nether?">
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <Link 
            href="/docs/nether/biomes"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9]"
          >
            <Image
              src="/wiki/nether-biomes.jpg"
              alt="Nether biomes"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                5 distinct biomes
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
              <p className="text-[#8a8aa3] text-sm">From blue Warped Forests to red Crimson ones.</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/nether/mobs"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9]"
          >
            <Image
              src="/wiki/nether-mobs.jpg"
              alt="Nether mobs"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                Unique mobs
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
              <p className="text-[#8a8aa3] text-sm">Ghasts, Blazes, Piglins and Hoglins.</p>
            </div>
          </Link>
          
          <Link 
            href="/docs/nether/structures"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9] sm:col-span-2"
          >
            <Image
              src="/wiki/nether-structures.jpg"
              alt="Nether structures"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                Fortresses and Bastions
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
              <p className="text-[#8a8aa3] text-sm">High-tier loot including blaze rods, wither skulls, and netherite.</p>
            </div>
          </Link>
        </div>
      </DocsSection>

      <DocsSection title="Ancient Debris & Netherite">
        <p>
          <span className="text-[#f1f1f7]">Ancient Debris</span> is the rarest ore in the game, found between Y 8-22 (optimal at Y 15). It&apos;s blast-resistant and fireproof.
        </p>
        
        <WikiTable
          headers={['Step', 'Action']}
          rows={[
            ['1', 'Mine at Y 15 using TNT or beds to expose debris'],
            ['2', 'Smelt ancient debris into netherite scraps (4 needed)'],
            ['3', 'Combine 4 scraps + 4 gold ingots = 1 netherite ingot'],
            ['4', 'Use a smithing table to upgrade diamond gear to netherite'],
          ]}
        />
        
        <Callout type="info" title="Netherite benefits">
          Netherite gear floats in lava, is more durable than diamond, has knockback resistance, and provides higher damage and protection values.
        </Callout>
      </DocsSection>

      <DocsSection title="Nether survival tips">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#60a5fa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Use coordinates</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">F3 (Java) or coordinates setting (Bedrock). Write down your portal location!</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-[#f59e0b]" />
              <h4 className="text-[#f1f1f7] font-semibold">Bring fire resistance</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Craft or trade for Fire Resistance potions. They make lava harmless.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🪨</span>
              <h4 className="text-[#f1f1f7] font-semibold">Bring cobblestone</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Ghasts can&apos;t destroy it. Use for bridges and protecting your portal.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
              <h4 className="text-[#f1f1f7] font-semibold">Wear gold armor</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Piglins won&apos;t attack if you wear at least one piece of gold armor.</p>
          </div>
        </div>
      </DocsSection>

      <Callout type="warning" title="Bring a backup portal">
        Ghasts can destroy obsidian with their fireballs. If your only portal home gets blown up, you&apos;ll need flint and steel — or worse, more obsidian. Always carry extras!
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld/structures', label: 'Structures' }}
        next={{ href: '/docs/nether/biomes', label: 'Nether biomes' }}
      />
    </>
  )
}
