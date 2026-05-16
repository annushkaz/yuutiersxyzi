import Image from 'next/image'
import { DocsTitle, DocsSection, DocsPager, InlineCode, Callout, WikiTable, StatGrid } from '@/components/docs/docs-ui'
import { Pickaxe, Axe, Sword, Home, Beef, Moon, Sun, Shield, Compass } from 'lucide-react'

export const metadata = { 
  title: 'Quick start · YuuTiers Wiki',
  description: 'A complete beginner guide to surviving your first days in Minecraft. Learn crafting, shelter building, and dimension travel.'
}

export default function QuickstartPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Getting started"
        title="Quick start guide"
        description="Everything you need to know to survive your first days in Minecraft and begin your journey across all three dimensions."
      />

      <StatGrid
        items={[
          { label: 'Day length', value: '10 min', accent: '#f59e0b' },
          { label: 'Night length', value: '7 min' },
          { label: 'Mob spawn light', value: '≤ 0' },
          { label: 'Bed skip', value: '1 player' },
        ]}
      />

      <DocsSection title="Your first day in the Overworld">
        <p>
          You spawn in a random biome of the <InlineCode>Overworld</InlineCode> with absolutely nothing. 
          The clock is ticking — you have about <span className="text-[#f1f1f7] font-medium">10 real-time minutes</span> of 
          daylight to prepare for your first night, when hostile mobs will spawn.
        </p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#8b4513]/20 flex items-center justify-center shrink-0">
              <Axe className="w-5 h-5 text-[#cd853f]" />
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Step 1: Punch a tree</h4>
              <p className="text-[#8a8aa3] text-sm">Hold down the attack button on a tree trunk until the wood block breaks. Collect 6-10 logs.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#22c55e]/15 flex items-center justify-center shrink-0">
              <span className="text-xl">🔧</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Step 2: Craft a crafting table</h4>
              <p className="text-[#8a8aa3] text-sm">Open your inventory, convert logs to planks, then combine 4 planks into a crafting table. Place it down.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#60a5fa]/15 flex items-center justify-center shrink-0">
              <Pickaxe className="w-5 h-5 text-[#60a5fa]" />
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Step 3: Make wooden tools</h4>
              <p className="text-[#8a8aa3] text-sm">Craft sticks (2 planks vertically), then make a wooden pickaxe (3 planks + 2 sticks). Also make a wooden sword.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#9ca3af]/15 flex items-center justify-center shrink-0">
              <span className="text-xl">⛏️</span>
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Step 4: Mine stone</h4>
              <p className="text-[#8a8aa3] text-sm">Dig down or into a hillside to find stone. Mine 20+ cobblestone to upgrade to stone tools and build a furnace.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#ef4444]/15 flex items-center justify-center shrink-0">
              <Beef className="w-5 h-5 text-[#ef4444]" />
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Step 5: Find food</h4>
              <p className="text-[#8a8aa3] text-sm">Kill animals (cows, pigs, sheep, chickens) for raw meat. Cook it in your furnace for better hunger restoration.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]">
            <div className="w-10 h-10 rounded-lg bg-[#f472b6]/15 flex items-center justify-center shrink-0">
              <Moon className="w-5 h-5 text-[#f472b6]" />
            </div>
            <div>
              <h4 className="text-[#f1f1f7] font-semibold mb-1">Step 6: Make a bed</h4>
              <p className="text-[#8a8aa3] text-sm">Kill 3 sheep (same color) for wool. Combine with 3 planks to craft a bed. Sleep to skip the night and set your spawn point.</p>
            </div>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Essential crafting recipes">
        <WikiTable
          headers={['Item', 'Recipe', 'Use']}
          rows={[
            ['Crafting Table', '4 planks in a square', 'Access 3x3 crafting grid'],
            ['Furnace', '8 cobblestone in a ring', 'Smelt ores and cook food'],
            ['Chest', '8 planks in a ring', 'Store 27 stacks of items'],
            ['Torch', '1 coal + 1 stick', 'Light up areas, prevent mob spawns'],
            ['Bed', '3 wool + 3 planks', 'Sleep, skip night, set spawn'],
            ['Door', '6 planks in 2 columns', 'Block mobs from entering'],
          ]}
        />
      </DocsSection>

      <DocsSection title="Surviving the night">
        <p>
          Night in Minecraft is when <span className="text-[#f1f1f7] font-medium">hostile mobs spawn</span> — zombies, skeletons, spiders, and the dreaded creeper. Here are your options:
        </p>
        
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-4 h-4 text-[#a78bfa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Sleep in a bed</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">The best option. Skip to morning instantly and reset your spawn point.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-4 h-4 text-[#f59e0b]" />
              <h4 className="text-[#f1f1f7] font-semibold">Build a shelter</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">A simple dirt hut with a door will protect you. Mobs can&apos;t break most blocks.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Pickaxe className="w-4 h-4 text-[#60a5fa]" />
              <h4 className="text-[#f1f1f7] font-semibold">Mine underground</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Dig a staircase down and mine resources while waiting for dawn.</p>
          </div>
          
          <div className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sword className="w-4 h-4 text-[#ef4444]" />
              <h4 className="text-[#f1f1f7] font-semibold">Fight mobs</h4>
            </div>
            <p className="text-[#8a8aa3] text-sm">Risky but rewarding. Mobs drop useful items like bones, arrows, and gunpowder.</p>
          </div>
        </div>
      </DocsSection>

      <Callout type="warning" title="Watch out for Creepers">
        Creepers are silent, green mobs that explode when close to you. They don&apos;t burn in sunlight like zombies and skeletons, so they can ambush you during the day too!
      </Callout>

      <DocsSection title="Reaching the Nether">
        <p>
          After you&apos;ve established yourself in the Overworld with iron tools and armor, it&apos;s time to enter <InlineCode>The Nether</InlineCode>.
        </p>
        
        <ol className="list-decimal pl-5 space-y-3 mt-4 text-[#8a8aa3]">
          <li>
            <span className="text-[#f1f1f7] font-medium">Get a diamond pickaxe</span> — You need it to mine obsidian.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Find or create obsidian</span> — Pour water over lava sources, or find it naturally in caves.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Build a portal frame</span> — Minimum size is 4 wide × 5 tall (corners optional). You need 10 obsidian.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Light the portal</span> — Use flint and steel on the inside of the frame. Purple particles appear.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Step through</span> — Stand in the purple portal for 4 seconds to teleport.
          </li>
        </ol>
        
        <Callout type="info" title="Nether travel tip">
          Distance traveled in the Nether equals{' '}
          <span className="text-[#f1f1f7]">8 blocks in the Overworld</span>. It&apos;s the fastest way to travel long distances — but everything there wants you dead.
        </Callout>
      </DocsSection>

      <DocsSection title="Reaching the End">
        <p>
          The End is the final dimension, home to the Ender Dragon boss. Here&apos;s how to get there:
        </p>
        
        <ol className="list-decimal pl-5 space-y-3 mt-4 text-[#8a8aa3]">
          <li>
            <span className="text-[#f1f1f7] font-medium">Collect Ender Pearls</span> — Kill Endermen or trade with Piglins in the Nether.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Collect Blaze Powder</span> — Kill Blazes in Nether Fortresses for blaze rods, then craft into powder.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Craft Eyes of Ender</span> — Combine 1 ender pearl + 1 blaze powder. You need 12.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Locate the Stronghold</span> — Throw Eyes of Ender into the air. They fly toward the nearest stronghold.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Activate the End Portal</span> — Place Eyes of Ender in the 12 portal frame blocks.
          </li>
          <li>
            <span className="text-[#f1f1f7] font-medium">Jump in</span> — There&apos;s no way back until you defeat the dragon (or die).
          </li>
        </ol>
      </DocsSection>

      <DocsSection title="What to bring to boss fights">
        <WikiTable
          headers={['Item', 'Quantity', 'Purpose']}
          rows={[
            ['Diamond/Netherite Armor', 'Full set', 'Survivability'],
            ['Diamond/Netherite Sword', '1', 'Melee damage'],
            ['Bow + Arrows', '1 + 64+', 'Ranged combat'],
            ['Golden Apples', '8+', 'Emergency healing'],
            ['Cooked Food', '1 stack', 'Hunger regeneration'],
            ['Ender Pearls', '16+', 'Emergency teleportation'],
            ['Beds (Nether only)', '5+', 'Explosive damage trick'],
            ['Building Blocks', '2 stacks', 'Pillaring and bridging'],
            ['Water Bucket', '1', 'Fall damage, Endermen'],
          ]}
        />
      </DocsSection>

      <Callout type="success" title="You&apos;re ready!">
        You now know the basics of Minecraft survival and progression. Browse the sidebar to dive deeper into biomes, mobs, structures, and advanced mechanics!
      </Callout>

      <DocsPager
        prev={{ href: '/docs', label: 'Introduction' }}
        next={{ href: '/docs/overworld', label: 'The Overworld' }}
      />
    </>
  )
}
