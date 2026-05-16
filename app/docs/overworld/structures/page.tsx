import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  BiomeCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'Overworld Structures · YuuTiers Wiki' }

const structures = [
  {
    name: 'Village',
    climate: 'Plains/Desert/Savanna/Taiga/Snowy',
    description:
      'Communities of villagers with houses, farms and a meeting bell. The architecture changes per biome.',
    features: ['Villager trades', 'Iron golem', 'Loot chests', 'Beds'],
  },
  {
    name: 'Desert Temple',
    climate: 'Desert',
    description:
      'Sandstone pyramid with a hidden TNT trap on a pressure plate over four loot chests.',
    features: ['Diamonds (rare)', 'Enchanted books', 'Saddles'],
  },
  {
    name: 'Jungle Temple',
    climate: 'Jungle',
    description:
      'Mossy cobblestone pyramid with a redstone puzzle and tripwire traps guarding loot.',
    features: ['Diamonds', 'Iron', 'Bamboo'],
  },
  {
    name: 'Woodland Mansion',
    climate: 'Dark Forest',
    description:
      'Enormous multi-room mansion inhabited by Vindicators and Evokers. Extremely rare.',
    features: ['Totem of Undying', 'Vexes', 'Rare loot'],
  },
  {
    name: 'Ocean Monument',
    climate: 'Deep Ocean',
    description:
      'Prismarine pyramid guarded by Guardians and three Elder Guardians. Contains sponges and gold.',
    features: ['Sponge', '8 blocks of gold', 'Sea Lantern'],
  },
  {
    name: 'Stronghold',
    climate: 'Underground',
    description:
      'Mossy stone-brick complex deep underground. Houses the only End Portal in the world (well — one of three).',
    features: ['End Portal', 'Library', 'Storerooms'],
  },
  {
    name: 'Ancient City',
    climate: 'Deep Dark (Y ≈ −51)',
    description:
      'Massive sculk-themed ruined city. The Warden patrols here, alongside sculk shriekers that summon it.',
    features: ['Echo shard', 'Disc 5', 'Swift sneak books'],
  },
  {
    name: 'Pillager Outpost',
    climate: 'Plains/Desert/Savanna/Taiga',
    description:
      'Tall dark-oak tower guarded by Pillagers. Killing the captain gives Bad Omen, triggering village raids.',
    features: ['Crossbows', 'Iron golem (captive)', 'Allay (rare)'],
  },
  {
    name: 'Trail Ruins',
    climate: 'Jungle/Taiga/Snowy/Desert',
    description:
      'Half-buried ruins added in 1.20. Brush gravel and dirt with the Archaeology tool to find pottery shards.',
    features: ['Sniffer egg', 'Pottery shards', 'Trial Chambers'],
  },
]

export default function OverworldStructuresPage() {
  return (
    <>
      <WikiHero
        image="/wiki/overworld-structures.jpg"
        eyebrow="The Overworld"
        title="Generated Structures"
        description="Naturally-generated buildings, dungeons and ruins scattered across the world. Each has its own loot table and unique inhabitants."
        accent="#22c55e"
      />

      <DocsSection title="Why look for structures?">
        <p>
          Structures fast-track your progression. Villages give you instant
          access to villager trading, ocean monuments hide sponges and gold,
          and the only natural End Portal lives inside a Stronghold.
        </p>
      </DocsSection>

      <DocsSection title="Featured structures">
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {structures.map((s) => (
            <BiomeCard key={s.name} {...s} accent="#22c55e" />
          ))}
        </div>
      </DocsSection>

      <Callout type="info" title="Locate command (Java)">
        In creative mode you can run{' '}
        <span className="text-[#f1f1f7]">/locate structure minecraft:village</span>{' '}
        to find the nearest of any structure type.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld/ores', label: 'Resources & ores' }}
        next={{ href: '/docs/nether', label: 'The Nether' }}
      />
    </>
  )
}
