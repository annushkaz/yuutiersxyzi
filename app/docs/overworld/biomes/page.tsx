import {
  DocsTitle,
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  BiomeCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'Overworld Biomes · YuuTiers Wiki' }

const biomes = [
  {
    name: 'Plains',
    climate: 'Temperate',
    description:
      'Flat grassy fields with sparse oak trees. The most common starting biome — perfect for villages and horses.',
    features: ['Villages', 'Horses', 'Cows', 'Oak trees'],
  },
  {
    name: 'Forest',
    climate: 'Temperate',
    description:
      'Dense woodland with oak and birch trees. A reliable source of wood, mushrooms, and apples.',
    features: ['Wolves', 'Bees', 'Apples', 'Mushrooms'],
  },
  {
    name: 'Desert',
    climate: 'Hot / Dry',
    description:
      'Endless sand under a cloudless sky. No rain, no surface water — but desert temples and villages are common.',
    features: ['Sand', 'Cacti', 'Desert temple', 'Husks'],
  },
  {
    name: 'Jungle',
    climate: 'Hot / Humid',
    description:
      'Towering jungle trees with vines. Home to ocelots, pandas, parrots and rare jungle temples.',
    features: ['Pandas', 'Parrots', 'Ocelots', 'Bamboo'],
  },
  {
    name: 'Taiga',
    climate: 'Cold',
    description:
      'Coniferous forest of spruce trees, sometimes snow-covered. Wolves and foxes roam here.',
    features: ['Spruce', 'Wolves', 'Foxes', 'Sweet berries'],
  },
  {
    name: 'Savanna',
    climate: 'Hot / Dry',
    description:
      'Yellow rolling hills with acacia trees. Where the iconic horse-friendly villages spawn.',
    features: ['Acacia', 'Horses', 'Villages', 'Llamas'],
  },
  {
    name: 'Swamp',
    climate: 'Temperate',
    description:
      'Murky shallow water dotted with lily pads. Home to slimes, witches and the rare witch hut.',
    features: ['Slimes', 'Witches', 'Lily pads', 'Frogs'],
  },
  {
    name: 'Snowy Plains',
    climate: 'Frozen',
    description:
      'A blanket of snow as far as the eye can see. Strays replace skeletons here, and igloos generate.',
    features: ['Strays', 'Polar bears', 'Igloos', 'Powder snow'],
  },
  {
    name: 'Mountains',
    climate: 'Cold',
    description:
      'Towering peaks reaching the sky — emerald ore generates here. Goats and snow leopards (in some packs) roam.',
    features: ['Emerald ore', 'Goats', 'Powder snow', 'Stony peaks'],
  },
  {
    name: 'Ocean',
    climate: 'Aquatic',
    description:
      'Vast open water covering huge swathes of the world. Cold variants generate icebergs.',
    features: ['Squid', 'Drowned', 'Shipwrecks', 'Coral'],
  },
  {
    name: 'Lush Caves',
    climate: 'Underground',
    description:
      'Vibrant cave biome filled with moss, glow berries, azaleas and the friendly axolotl.',
    features: ['Axolotl', 'Glow berries', 'Moss', 'Tropical fish'],
  },
  {
    name: 'Mushroom Fields',
    climate: 'Rare',
    description:
      'A surreal mycelium island with giant mushrooms and mooshrooms. No hostile mobs spawn here, ever.',
    features: ['Mooshrooms', 'Mycelium', 'Giant mushrooms', 'No mobs'],
  },
]

export default function OverworldBiomesPage() {
  return (
    <>
      <WikiHero
        image="/wiki/overworld-biomes.jpg"
        eyebrow="The Overworld"
        title="Biomes"
        description="The Overworld is divided into 60+ unique biomes — each with its own terrain, climate, vegetation and mobs. Here are the most iconic."
        accent="#22c55e"
      />

      <DocsSection title="Climate categories">
        <p>
          Biomes are grouped by climate, which affects rain vs. snow, water
          freezing, vegetation and mob spawns. Within each climate group,
          biomes share themed mobs and weather.
        </p>
      </DocsSection>

      <DocsSection title="Featured biomes">
        <div className="grid sm:grid-cols-2 gap-3 mt-2 not-prose">
          {biomes.map((b) => (
            <BiomeCard key={b.name} {...b} accent="#22c55e" />
          ))}
        </div>
      </DocsSection>

      <Callout type="info" title="Biome blending">
        Since Minecraft 1.18, the game uses{' '}
        <span className="text-[#f1f1f7]">3D noise terrain</span> and{' '}
        <span className="text-[#f1f1f7]">biome blending</span> to smoothly
        transition between biomes — giving rolling hills and natural-looking
        borders rather than sharp cuts.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld', label: 'Overview' }}
        next={{ href: '/docs/overworld/mobs', label: 'Mobs' }}
      />
    </>
  )
}
