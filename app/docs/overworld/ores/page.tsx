import Image from 'next/image'
import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  WikiTable,
  StatGrid,
} from '@/components/docs/docs-ui'
import { Pickaxe, Gem, Flame, Zap } from 'lucide-react'

export const metadata = { 
  title: 'Overworld Ores & Resources · YuuTiers Wiki',
  description: 'Complete guide to all ores and resources in the Minecraft Overworld — mining locations, tool requirements, and optimal Y-levels.'
}

const ores = [
  { name: 'Coal', bestY: '95', range: '0 → 320', tool: 'Wood+', drops: 'Coal', color: '#2a2a2a', xpRange: '0-2', features: ['Most common ore', 'Fuel source', 'Torches'] },
  { name: 'Copper', bestY: '47', range: '−16 → 112', tool: 'Stone+', drops: 'Raw copper (2-5)', color: '#b87333', xpRange: '0', features: ['Oxidizes over time', 'Lightning rod', 'Decorative blocks'] },
  { name: 'Iron', bestY: '15 / 232', range: '−63 → 320', tool: 'Stone+', drops: 'Raw iron', color: '#d4af89', xpRange: '0', features: ['Most important ore', 'Tools & armor', 'Required for progress'] },
  { name: 'Gold', bestY: '−16', range: '−63 → 32', tool: 'Iron+', drops: 'Raw gold', color: '#ffd700', xpRange: '0', features: ['Piglin trading', 'Powered rails', 'Golden apples'] },
  { name: 'Redstone', bestY: '−59', range: '−63 → 15', tool: 'Iron+', drops: 'Redstone dust (4-5)', color: '#ff0000', xpRange: '1-5', features: ['Circuitry', 'Potions', 'Compass & clocks'] },
  { name: 'Lapis Lazuli', bestY: '0', range: '−63 → 64', tool: 'Stone+', drops: 'Lapis (4-9)', color: '#1a4d9e', xpRange: '2-5', features: ['Enchanting fuel', 'Blue dye', 'Decorative'] },
  { name: 'Emerald', bestY: '236', range: 'Mountains only', tool: 'Iron+', drops: 'Emerald', color: '#50c878', xpRange: '3-7', features: ['Villager currency', 'Only in mountains', 'Very rare'] },
  { name: 'Diamond', bestY: '−59', range: '−63 → 14', tool: 'Iron+', drops: 'Diamond', color: '#00ffff', xpRange: '3-7', features: ['End-game tools', 'Enchanting table', 'Most valuable ore'] },
]

const toolTiers = [
  { tier: 'Wood', required: '—', mines: 'Stone, coal ore', durability: '60', speed: '1x' },
  { tier: 'Stone', required: 'Wood+', mines: 'Iron, copper, lapis', durability: '132', speed: '1.33x' },
  { tier: 'Iron', required: 'Stone+', mines: 'Gold, redstone, diamond, emerald', durability: '251', speed: '1.5x' },
  { tier: 'Diamond', required: 'Iron+', mines: 'Obsidian, ancient debris', durability: '1,562', speed: '2x' },
  { tier: 'Netherite', required: 'Diamond (upgraded)', mines: 'Everything + faster', durability: '2,032', speed: '2.25x' },
  { tier: 'Gold', required: 'Wood+', mines: 'Same as wood (very fast)', durability: '33', speed: '3x (fastest)' },
]

const otherResources = [
  { name: 'Wood', source: 'Trees (8 species)', use: 'Crafting, building, fuel', notes: 'Most fundamental resource. Different species have different colors.' },
  { name: 'Stone', source: 'Underground, mountains', use: 'Tools, building, furnaces', notes: 'Smelt cobblestone for smooth stone. Deepslate below Y=0.' },
  { name: 'Sand', source: 'Deserts, beaches, rivers', use: 'Glass, concrete, TNT', notes: 'Affected by gravity. Red sand in badlands.' },
  { name: 'Gravel', source: 'Underground, beaches', use: 'Flint (10%), concrete, paths', notes: 'Affected by gravity. Flint used for arrows.' },
  { name: 'Clay', source: 'Rivers, swamps, lush caves', use: 'Bricks, terracotta', notes: 'Smelt into bricks. Dye terracotta for colors.' },
  { name: 'Obsidian', source: 'Water + lava source', use: 'Nether portal, enchanting table', notes: 'Takes 9.4 seconds to mine with diamond pick.' },
  { name: 'Amethyst', source: 'Amethyst geodes', use: 'Spyglass, tinted glass', notes: 'Grows on budding amethyst blocks. Cannot be silk-touched.' },
  { name: 'Ancient Debris', source: 'Nether Y=8-22', use: 'Netherite gear', notes: 'Blast-resistant. Floats in lava. Smelt into scraps.' },
]

export default function OverworldOresPage() {
  return (
    <>
      <WikiHero
        image="/wiki/overworld-ores.jpg"
        eyebrow="The Overworld"
        title="Resources & Ores"
        description="The full ore progression — from coal at the surface to diamonds in the deepslate layer. Where they generate, what tools you need and what they're for."
        accent="#22c55e"
      />

      <StatGrid
        items={[
          { label: 'Ore types', value: '8', accent: '#22c55e' },
          { label: 'Best diamond Y', value: '−59' },
          { label: 'Tool tiers', value: '6' },
          { label: 'Deepslate starts', value: 'Y = 0' },
        ]}
      />

      <DocsSection title="Ore progression">
        <p>
          Minecraft tools follow a strict tier system. You must mine each tier with the previous tier&apos;s pickaxe (or better). Using the wrong tier will break the block but drop nothing.
        </p>
        <WikiTable
          headers={['Tier', 'Required', 'Can mine', 'Durability', 'Speed']}
          rows={toolTiers.map(t => [t.tier, t.required, t.mines, t.durability, t.speed])}
        />
      </DocsSection>

      <DocsSection title="Where ores generate">
        <p>
          With the 1.18 Caves &amp; Cliffs update, ores now follow{' '}
          <span className="text-[#f1f1f7]">triangular distributions</span> with a sweet-spot Y level. Below Y = 0 the world is made of{' '}
          <span className="text-[#f1f1f7]">deepslate</span>, where ore variants are slightly tougher to mine.
        </p>
        
        <div className="mt-6 space-y-3">
          {ores.map((ore) => (
            <div
              key={ore.name}
              className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${ore.color}20`, border: `1px solid ${ore.color}40` }}
                >
                  <Gem className="w-6 h-6" style={{ color: ore.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-[#f1f1f7] font-bold text-lg">{ore.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[#8a8aa3]">
                      Best: Y {ore.bestY}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-4 gap-x-4 gap-y-1 text-sm mb-2">
                    <div>
                      <span className="text-[#5a5a76]">Range: </span>
                      <span className="text-[#f1f1f7]">{ore.range}</span>
                    </div>
                    <div>
                      <span className="text-[#5a5a76]">Tool: </span>
                      <span className="text-[#f1f1f7]">{ore.tool}</span>
                    </div>
                    <div>
                      <span className="text-[#5a5a76]">Drops: </span>
                      <span className="text-[#f1f1f7]">{ore.drops}</span>
                    </div>
                    <div>
                      <span className="text-[#5a5a76]">XP: </span>
                      <span className="text-[#f1f1f7]">{ore.xpRange}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ore.features.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-md text-[11px]"
                        style={{ backgroundColor: `${ore.color}15`, color: ore.color, border: `1px solid ${ore.color}30` }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Mining techniques">
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Pickaxe className="w-5 h-5 text-[#60a5fa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Branch Mining</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm mb-2">
              At Y = −59, dig a main tunnel 2 blocks tall. Branch off every 3 blocks to maximize ore exposure while minimizing mining.
            </p>
            <span className="text-xs text-[#22c55e]">Best for: Diamonds, Redstone</span>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-[#ef4444]" />
              <h4 className="text-[#f1f1f7] font-semibold">TNT Mining</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm mb-2">
              Use TNT to clear large areas quickly. Works best in the Nether for ancient debris since it&apos;s blast-resistant.
            </p>
            <span className="text-xs text-[#f59e0b]">Best for: Ancient Debris</span>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🛏️</span>
              <h4 className="text-[#f1f1f7] font-semibold">Bed Mining (Nether)</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm mb-2">
              Beds explode in the Nether. Cheap alternative to TNT for finding ancient debris.
            </p>
            <span className="text-xs text-[#a78bfa]">Best for: Ancient Debris (budget)</span>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🕳️</span>
              <h4 className="text-[#f1f1f7] font-semibold">Cave Exploration</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm mb-2">
              Explore naturally generated caves. Less efficient but more fun. Watch for mobs and lava.
            </p>
            <span className="text-xs text-[#22c55e]">Best for: Variety, early game</span>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Other key resources">
        <WikiTable
          headers={['Resource', 'Source', 'Primary use', 'Notes']}
          rows={otherResources.map(r => [r.name, r.source, r.use, r.notes])}
        />
      </DocsSection>

      <DocsSection title="Enchantments for mining">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#a78bfa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Efficiency V</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Massively increases mining speed. Essential for large-scale mining.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gem className="w-4 h-4 text-[#60a5fa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Fortune III</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Multiplies ore drops. Average 2.2x diamonds. Does not work on iron/gold/copper.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🧱</span>
              <h4 className="text-[#f1f1f7] font-semibold">Silk Touch</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Drops the ore block itself. Store for later Fortune mining. Required for glass, ice.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔧</span>
              <h4 className="text-[#f1f1f7] font-semibold">Unbreaking III</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Tool lasts ~4x longer. Essential for expensive netherite tools.</p>
          </div>
        </div>
      </DocsSection>

      <Callout type="info" title="Pro tip: Fortune vs Silk Touch">
        Use Silk Touch to collect ore blocks, store them, then mine with Fortune III later. This maximizes returns and lets you use a single Fortune pick for all ores.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld/mobs', label: 'Mobs' }}
        next={{ href: '/docs/overworld/structures', label: 'Structures' }}
      />
    </>
  )
}
