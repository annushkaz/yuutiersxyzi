import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  WikiTable,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'Overworld Ores & Resources · YuuTiers Wiki' }

export default function OverworldOresPage() {
  return (
    <>
      <WikiHero
        image="/wiki/overworld-ores.jpg"
        eyebrow="The Overworld"
        title="Resources & ores"
        description="The full ore progression — from coal at the surface to diamonds in the deepslate layer. Where they generate, what tools you need and what they're for."
        accent="#22c55e"
      />

      <DocsSection title="Ore progression">
        <p>
          Minecraft tools follow a strict tier system. You must mine each tier
          with the previous tier&apos;s pickaxe (or better).
        </p>
        <WikiTable
          headers={['Tier', 'Pickaxe required', 'Mines', 'Durability']}
          rows={[
            ['Wood', '—', 'Stone, coal', '60'],
            ['Stone', 'Wood+', 'Iron, copper, lapis', '132'],
            ['Iron', 'Stone+', 'Gold, diamond, emerald, redstone', '251'],
            ['Diamond', 'Iron+', 'Obsidian, ancient debris (Nether)', '1,562'],
            ['Netherite', 'Diamond+', 'Everything', '2,032'],
            ['Gold', 'Wood+', 'Only Nether gold ore', '33'],
          ]}
        />
      </DocsSection>

      <DocsSection title="Where ores generate">
        <p>
          With the 1.18 caves update, ores now follow{' '}
          <span className="text-[#f1f1f7]">triangular distributions</span> with
          a sweet-spot Y level. Below Y = 0 the world is made of{' '}
          <span className="text-[#f1f1f7]">deepslate</span>, where ore variants
          are slightly tougher.
        </p>
        <WikiTable
          headers={['Ore', 'Best Y level', 'Range', 'Tool', 'Drops']}
          rows={[
            ['Coal', '95', '0 → 320', 'Wood+', 'Coal'],
            ['Copper', '47', '−16 → 112', 'Stone+', 'Raw copper'],
            ['Iron', '15 / 232', '−63 → 320', 'Stone+', 'Raw iron'],
            ['Gold', '−16', '−63 → 32', 'Iron+', 'Raw gold'],
            ['Redstone', '−59', '−63 → 15', 'Iron+', 'Redstone dust'],
            ['Lapis Lazuli', '0', '−63 → 64', 'Stone+', 'Lapis'],
            ['Emerald', '236', 'Mountains only', 'Iron+', 'Emerald'],
            ['Diamond', '−59', '−63 → 14', 'Iron+', 'Diamond'],
          ]}
        />
      </DocsSection>

      <DocsSection title="Other key resources">
        <ul className="list-disc pl-5 space-y-1 text-[#8a8aa3]">
          <li><span className="text-[#f1f1f7]">Wood</span> — your starter material. Comes in 8 tree species.</li>
          <li><span className="text-[#f1f1f7]">Stone</span> — abundant under the surface. Smelt cobblestone in a furnace.</li>
          <li><span className="text-[#f1f1f7]">Sand &amp; clay</span> — smelt into glass and bricks.</li>
          <li><span className="text-[#f1f1f7]">String</span> — from spiders or fishing. Crafts bows and wool.</li>
          <li><span className="text-[#f1f1f7]">Sugar cane</span> — for paper, books and sugar.</li>
        </ul>
      </DocsSection>

      <Callout type="info" title="Pro tip: branch mining">
        At Y = −59, dig a tunnel 2 blocks tall and branch off every 3 blocks.
        You&apos;ll hit diamond, redstone and a lot of deepslate iron in
        roughly equal amounts.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld/mobs', label: 'Mobs' }}
        next={{ href: '/docs/overworld/structures', label: 'Structures' }}
      />
    </>
  )
}
