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
import { Sparkles, Trophy, Shield, Target, Eye, AlertTriangle, Compass, Gem } from 'lucide-react'

export const metadata = { 
  title: 'The End · YuuTiers Wiki',
  description: 'Complete guide to the End dimension in Minecraft — Ender Dragon boss fight, End Cities, Elytra, and exploration strategies.'
}

export default function EndPage() {
  return (
    <>
      <WikiHero
        image="/wiki/end-hero.jpg"
        eyebrow="Dimension"
        title="The End"
        description="A void-floating dimension of pale end-stone islands, home to the Ender Dragon and the final challenge of the main game."
        accent="#a78bfa"
      />

      <StatGrid
        items={[
          { label: 'Build height', value: '0 → 256', accent: '#a78bfa' },
          { label: 'Sky', value: 'None (void)' },
          { label: 'Biomes', value: '4' },
          { label: 'Boss', value: 'Ender Dragon' },
        ]}
      />

      <DocsTitle
        eyebrow="The End"
        title="Overview"
        description='Reach it, beat it, and you&apos;ve technically "won" Minecraft. Then come back for the loot.'
      />

      <DocsSection title="How to enter">
        <p>
          The End is the final dimension and home to the Ender Dragon boss. Getting there requires significant preparation.
        </p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#ef4444]/15 flex items-center justify-center shrink-0">
              <span className="text-[#ef4444] font-bold">1</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Kill Blazes for blaze rods</h4>
              <p className="text-[#8a8aa3] text-sm">Find a Nether Fortress and kill Blazes. You need at least 7 blaze rods (12 recommended for safety).</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center shrink-0">
              <span className="text-[#a78bfa] font-bold">2</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Collect Ender Pearls</h4>
              <p className="text-[#8a8aa3] text-sm">Kill Endermen or barter with Piglins using gold ingots. You need at least 12.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#60a5fa]/15 flex items-center justify-center shrink-0">
              <span className="text-[#60a5fa] font-bold">3</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Craft Eyes of Ender</h4>
              <p className="text-[#8a8aa3] text-sm">Combine blaze powder (from blaze rods) with ender pearls. Craft at least 12 eyes.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#22c55e]/15 flex items-center justify-center shrink-0">
              <span className="text-[#22c55e] font-bold">4</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Throw Eyes to find the Stronghold</h4>
              <p className="text-[#8a8aa3] text-sm">Throw Eyes of Ender — they fly toward the nearest stronghold. Follow until they go downward.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/15 flex items-center justify-center shrink-0">
              <span className="text-[#f59e0b] font-bold">5</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Dig down and find the End Portal room</h4>
              <p className="text-[#8a8aa3] text-sm">Strongholds are maze-like. Look for a room with silverfish spawner and 12 portal frames.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#ec4899]/15 flex items-center justify-center shrink-0">
              <span className="text-[#ec4899] font-bold">6</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Activate and enter</h4>
              <p className="text-[#8a8aa3] text-sm">Place Eyes in all 12 frames. The portal activates. Jump in — there&apos;s no return until you win or die.</p>
            </div>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="The Ender Dragon fight">
        <p>
          You spawn on a small obsidian platform on the main island. The Dragon circles between obsidian towers topped with <span className="text-[#f1f1f7]">End Crystals</span> that heal it. Your goals:
        </p>
        
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#ef4444]" />
              <h4 className="text-[#f1f1f7] font-semibold">Destroy End Crystals</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Shoot them with a bow or climb up to destroy them. Some are caged in iron bars.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#60a5fa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Avoid dragon breath</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">The purple clouds deal damage. Collect them in glass bottles for brewing.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚔️</span>
              <h4 className="text-[#f1f1f7] font-semibold">Attack during perch</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">The dragon lands on the fountain periodically. Sprint-hit with a sword for massive damage.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
              <h4 className="text-[#f1f1f7] font-semibold">Don&apos;t look at Endermen</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">The island is covered in Endermen. Wear a pumpkin or keep your cursor low.</p>
          </div>
        </div>
        
        <Callout type="info" title="Victory rewards">
          Defeating the dragon grants 12,000 XP (enough for 68 levels), spawns the exit portal home, opens a gateway to the Outer End, and activates a dragon egg on top of the fountain.
        </Callout>
      </DocsSection>

      <DocsSection title="The Outer End">
        <p>
          Beyond the central island lie thousands of small end-stone islands full of <span className="text-[#f1f1f7]">Chorus Trees</span>, Endermen, and the rare <span className="text-[#f1f1f7]">End City</span> structures. End Ships hold the Elytra — the only way to fly in survival mode.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Link 
            href="/docs/end/biomes"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9]"
          >
            <Image
              src="/wiki/end-biomes.jpg"
              alt="End biomes"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                The 4 End biomes
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
            </div>
          </Link>
          
          <Link 
            href="/docs/end/mobs"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9]"
          >
            <Image
              src="/wiki/end-mobs.jpg"
              alt="End mobs"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                Endermen, Shulkers & Dragon
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
            </div>
          </Link>
          
          <Link 
            href="/docs/end/structures"
            className="group relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all aspect-[16/9] sm:col-span-2"
          >
            <Image
              src="/wiki/end-structures.jpg"
              alt="End structures"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-[#f1f1f7] font-bold text-lg flex items-center gap-1.5">
                End Cities and End Ships
                <span className="text-[#5a5a76] group-hover:text-[#8a8aa3] transition-colors">→</span>
              </h4>
              <p className="text-[#8a8aa3] text-sm">Where the Elytra and shulker boxes are found.</p>
            </div>
          </Link>
        </div>
      </DocsSection>

      <DocsSection title="What to bring">
        <WikiTable
          headers={['Item', 'Amount', 'Purpose']}
          rows={[
            ['Diamond/Netherite armor', 'Full set', 'Survivability against dragon and fall damage'],
            ['Diamond/Netherite sword', '1', 'Melee damage during perch phase'],
            ['Bow + arrows', '1 + 128+', 'Destroy crystals and damage dragon'],
            ['Ender pearls', '16+', 'Emergency teleportation and bridging'],
            ['Building blocks', '3+ stacks', 'Towering, bridging, and safety platforms'],
            ['Golden apples', '8+', 'Emergency healing'],
            ['Food', '2 stacks', 'Hunger regeneration'],
            ['Water bucket', '1', 'Enderman safety and fall damage'],
            ['Pumpkin (optional)', '1', 'Prevents Enderman aggro when worn'],
            ['Beds (optional)', '4+', 'Explosive damage cheese strat'],
          ]}
        />
      </DocsSection>

      <DocsSection title="Respawning the Dragon">
        <p>
          After defeating the Ender Dragon once, you can respawn it for additional fights. Place 4 End Crystals on the edges of the exit portal (one on each side). This will:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-3 text-[#8a8aa3]">
          <li>Regenerate all obsidian towers and End Crystals</li>
          <li>Spawn a new dragon with full health</li>
          <li>Grant another 500 XP on defeat (not 12,000)</li>
          <li>Open a new End Gateway to unexplored areas</li>
        </ul>
      </DocsSection>

      <Callout type="warning" title="Don&apos;t fall into the void">
        Fall damage in the End equals instant death and total inventory loss if you fall off an island. Always bring blocks to pillar back up and ender pearls for emergency teleportation.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/nether/structures', label: 'Nether structures' }}
        next={{ href: '/docs/end/biomes', label: 'End biomes' }}
      />
    </>
  )
}
