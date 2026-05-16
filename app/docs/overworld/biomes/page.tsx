import Image from 'next/image'
import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  BiomeCard,
  StatGrid,
} from '@/components/docs/docs-ui'

export const metadata = { 
  title: 'Overworld Biomes · YuuTiers Wiki',
  description: 'Complete guide to all 60+ Overworld biomes in Minecraft — climate types, unique features, mobs, and resources.'
}

const climateGroups = [
  {
    name: 'Temperate',
    color: '#22c55e',
    description: 'Moderate temperatures with regular rain. The most common starting biomes.',
    biomes: [
      {
        name: 'Plains',
        climate: 'Temperate',
        description: 'Flat grassy fields with sparse oak trees. The most common starting biome — perfect for villages and horses.',
        features: ['Villages', 'Horses', 'Cows', 'Oak trees', 'Sunflowers'],
      },
      {
        name: 'Forest',
        climate: 'Temperate',
        description: 'Dense woodland with oak and birch trees. A reliable source of wood, mushrooms, and apples.',
        features: ['Wolves', 'Bees', 'Apples', 'Mushrooms', 'Flowers'],
      },
      {
        name: 'Dark Forest',
        climate: 'Temperate',
        description: 'Extremely dense forest with massive dark oak trees. So dark that hostile mobs can spawn during day.',
        features: ['Dark oak', 'Giant mushrooms', 'Woodland Mansion (rare)', 'Shade'],
      },
      {
        name: 'Swamp',
        climate: 'Temperate',
        description: 'Murky shallow water dotted with lily pads. Home to slimes, witches and the rare witch hut.',
        features: ['Slimes', 'Witches', 'Lily pads', 'Frogs', 'Blue orchids'],
      },
      {
        name: 'Mangrove Swamp',
        climate: 'Temperate',
        description: 'Tropical swamp biome with towering mangrove trees and muddy terrain.',
        features: ['Mangrove trees', 'Mud blocks', 'Frogs', 'Warm frogs', 'Propagules'],
      },
    ],
  },
  {
    name: 'Cold',
    color: '#60a5fa',
    description: 'Colder temperatures. Snow appears at high altitudes.',
    biomes: [
      {
        name: 'Taiga',
        climate: 'Cold',
        description: 'Coniferous forest of spruce trees, sometimes snow-covered. Wolves and foxes roam here.',
        features: ['Spruce', 'Wolves', 'Foxes', 'Sweet berries', 'Ferns'],
      },
      {
        name: 'Old Growth Taiga',
        climate: 'Cold',
        description: 'Ancient taiga with massive spruce trees and thick moss-covered rocks.',
        features: ['Giant spruces', 'Mossy cobblestone', 'Coarse dirt', 'Podzol'],
      },
      {
        name: 'Windswept Hills',
        climate: 'Cold',
        description: 'Dramatic cliffs and steep mountains with exposed stone and gravel.',
        features: ['Emeralds', 'Llamas', 'Extreme heights', 'Oak trees'],
      },
      {
        name: 'Cherry Grove',
        climate: 'Cold',
        description: 'Beautiful pink forests of cherry blossom trees. Added in 1.20.',
        features: ['Cherry trees', 'Pink petals', 'Bees', 'Rabbits', 'Pigs'],
      },
    ],
  },
  {
    name: 'Hot & Dry',
    color: '#f59e0b',
    description: 'No rain. Water is scarce but unique structures spawn.',
    biomes: [
      {
        name: 'Desert',
        climate: 'Hot / Dry',
        description: 'Endless sand under a cloudless sky. No rain, no surface water — but desert temples and villages are common.',
        features: ['Sand', 'Cacti', 'Desert temple', 'Husks', 'Dead bushes'],
      },
      {
        name: 'Badlands',
        climate: 'Hot / Dry',
        description: 'Colorful terracotta canyons with exposed gold ore. Also called Mesa.',
        features: ['Terracotta', 'Gold ore', 'Red sand', 'Mineshafts (surface)', 'Cacti'],
      },
      {
        name: 'Savanna',
        climate: 'Hot / Dry',
        description: 'Yellow rolling hills with acacia trees. Where the iconic horse-friendly villages spawn.',
        features: ['Acacia', 'Horses', 'Villages', 'Llamas', 'Donkeys'],
      },
      {
        name: 'Windswept Savanna',
        climate: 'Hot / Dry',
        description: 'Extreme terrain with floating cliffs and dramatic overhangs. Very rare.',
        features: ['Extreme terrain', 'Coarse dirt', 'Floating islands', 'Waterfalls'],
      },
    ],
  },
  {
    name: 'Tropical',
    color: '#10b981',
    description: 'Hot and humid with dense vegetation.',
    biomes: [
      {
        name: 'Jungle',
        climate: 'Hot / Humid',
        description: 'Towering jungle trees with vines. Home to ocelots, pandas, parrots and rare jungle temples.',
        features: ['Pandas', 'Parrots', 'Ocelots', 'Bamboo', 'Melons'],
      },
      {
        name: 'Bamboo Jungle',
        climate: 'Hot / Humid',
        description: 'Dense bamboo forest variant of the jungle. Pandas spawn more frequently here.',
        features: ['Bamboo', 'Pandas', 'Parrots', 'Dense vegetation'],
      },
      {
        name: 'Sparse Jungle',
        climate: 'Hot / Humid',
        description: 'Jungle edge biome with shorter trees and less dense vegetation.',
        features: ['Jungle trees', 'Cocoa beans', 'Melons', 'Ocelots'],
      },
    ],
  },
  {
    name: 'Frozen',
    color: '#93c5fd',
    description: 'Permanent snow and ice. Water freezes naturally.',
    biomes: [
      {
        name: 'Snowy Plains',
        climate: 'Frozen',
        description: 'A blanket of snow as far as the eye can see. Strays replace skeletons here, and igloos generate.',
        features: ['Strays', 'Polar bears', 'Igloos', 'Powder snow', 'Rabbits'],
      },
      {
        name: 'Snowy Taiga',
        climate: 'Frozen',
        description: 'Snow-covered spruce forest. Wolves and foxes have white fur here.',
        features: ['Snow', 'Spruce', 'White foxes', 'Wolves', 'Sweet berries'],
      },
      {
        name: 'Ice Spikes',
        climate: 'Frozen',
        description: 'Flat ice plains dotted with massive packed ice spikes reaching to the sky.',
        features: ['Ice spikes', 'Packed ice', 'Blue ice', 'Polar bears'],
      },
      {
        name: 'Frozen Ocean',
        climate: 'Frozen',
        description: 'Ocean surface frozen into ice. Polar bears and strays spawn on the ice.',
        features: ['Ice sheets', 'Icebergs', 'Polar bears', 'Drowned'],
      },
    ],
  },
  {
    name: 'Mountain',
    color: '#9ca3af',
    description: 'High altitude biomes above Y=100.',
    biomes: [
      {
        name: 'Meadow',
        climate: 'Mountain',
        description: 'Peaceful flower-covered meadows high in the mountains. Villages can spawn here.',
        features: ['Flowers', 'Bees', 'Villages', 'Rabbits', 'Donkeys'],
      },
      {
        name: 'Stony Peaks',
        climate: 'Mountain',
        description: 'Bare stone peaks with exposed ores. The highest non-snow mountains.',
        features: ['Calcite', 'Stone', 'Emeralds', 'Goats', 'No trees'],
      },
      {
        name: 'Jagged Peaks',
        climate: 'Mountain',
        description: 'Snow-capped mountain peaks with jagged terrain. Goats spawn here.',
        features: ['Snow', 'Goats', 'Extreme heights', 'Powder snow'],
      },
      {
        name: 'Frozen Peaks',
        climate: 'Mountain',
        description: 'The highest mountains covered in packed ice and snow.',
        features: ['Packed ice', 'Goats', 'Extreme cold', 'No vegetation'],
      },
    ],
  },
  {
    name: 'Aquatic',
    color: '#3b82f6',
    description: 'Water-based biomes covering vast areas.',
    biomes: [
      {
        name: 'Ocean',
        climate: 'Aquatic',
        description: 'Vast open water covering huge swathes of the world. Cold variants generate icebergs.',
        features: ['Squid', 'Drowned', 'Shipwrecks', 'Ruins', 'Dolphins'],
      },
      {
        name: 'Warm Ocean',
        climate: 'Aquatic',
        description: 'Tropical ocean with vibrant coral reefs and colorful fish.',
        features: ['Coral reefs', 'Tropical fish', 'Sea pickles', 'Pufferfish'],
      },
      {
        name: 'Deep Ocean',
        climate: 'Aquatic',
        description: 'Very deep ocean biome where Ocean Monuments can generate.',
        features: ['Ocean Monument', 'Guardians', 'Elder Guardian', 'Prismarine'],
      },
      {
        name: 'River',
        climate: 'Aquatic',
        description: 'Narrow waterways that cut through the landscape, connecting biomes.',
        features: ['Salmon', 'Squid', 'Sugar cane', 'Clay', 'Drowned'],
      },
    ],
  },
  {
    name: 'Underground',
    color: '#a78bfa',
    description: 'Cave biomes found below the surface.',
    biomes: [
      {
        name: 'Lush Caves',
        climate: 'Underground',
        description: 'Vibrant cave biome filled with moss, glow berries, azaleas and the friendly axolotl.',
        features: ['Axolotl', 'Glow berries', 'Moss', 'Dripleaf', 'Azalea'],
      },
      {
        name: 'Dripstone Caves',
        climate: 'Underground',
        description: 'Cave biome with stalactites and stalagmites made of pointed dripstone.',
        features: ['Dripstone', 'Drip water', 'Copper ore', 'Drowning pools'],
      },
      {
        name: 'Deep Dark',
        climate: 'Underground',
        description: 'Terrifying cave biome at Y -51. Home to the Warden and Ancient Cities.',
        features: ['Sculk', 'Warden', 'Ancient City', 'Sculk shriekers'],
      },
    ],
  },
  {
    name: 'Rare',
    color: '#ec4899',
    description: 'Extremely rare biomes with unique properties.',
    biomes: [
      {
        name: 'Mushroom Fields',
        climate: 'Rare',
        description: 'A surreal mycelium island with giant mushrooms and mooshrooms. No hostile mobs spawn here, ever.',
        features: ['Mooshrooms', 'Mycelium', 'Giant mushrooms', 'No hostile mobs'],
      },
      {
        name: 'Sunflower Plains',
        climate: 'Rare',
        description: 'Plains biome variant covered in sunflowers pointing east.',
        features: ['Sunflowers', 'Villages', 'Horses', 'Bees'],
      },
      {
        name: 'Flower Forest',
        climate: 'Rare',
        description: 'Forest variant with an explosion of flower varieties.',
        features: ['All flowers', 'Bees', 'Rabbits', 'Birch trees'],
      },
    ],
  },
]

export default function OverworldBiomesPage() {
  return (
    <>
      <WikiHero
        image="/wiki/overworld-biomes.jpg"
        eyebrow="The Overworld"
        title="Biomes"
        description="The Overworld is divided into 60+ unique biomes — each with its own terrain, climate, vegetation and mobs. Here are all the major biomes organized by climate."
        accent="#22c55e"
      />

      <StatGrid
        items={[
          { label: 'Total biomes', value: '60+', accent: '#22c55e' },
          { label: 'Climate zones', value: '9' },
          { label: 'Cave biomes', value: '3' },
          { label: 'Ocean biomes', value: '10+' },
        ]}
      />

      <DocsSection title="Climate system">
        <p>
          Biomes are grouped by <span className="text-[#f1f1f7] font-medium">climate</span>, which affects rain vs. snow, water freezing, vegetation density, and mob spawns. Adjacent biomes with similar climates blend together smoothly since 1.18.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {climateGroups.slice(0, 6).map((group) => (
            <div
              key={group.name}
              className="rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <h4 className="text-[#f1f1f7] font-semibold">{group.name}</h4>
              </div>
              <p className="text-[#8a8aa3] text-sm">{group.description}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      {climateGroups.map((group) => (
        <DocsSection key={group.name} title={`${group.name} biomes`}>
          <p className="mb-4">{group.description}</p>
          <div className="grid sm:grid-cols-2 gap-3 not-prose">
            {group.biomes.map((b) => (
              <BiomeCard key={b.name} {...b} accent={group.color} />
            ))}
          </div>
        </DocsSection>
      ))}

      <Callout type="info" title="Biome blending">
        Since Minecraft 1.18, the game uses{' '}
        <span className="text-[#f1f1f7]">3D noise terrain</span> and{' '}
        <span className="text-[#f1f1f7]">biome blending</span> to smoothly transition between biomes — giving rolling hills and natural-looking borders rather than sharp cuts.
      </Callout>

      <Callout type="success" title="Locating biomes">
        In Java Edition, use the command <code className="px-1.5 py-0.5 rounded bg-[#0e0e15] text-[#60a5fa] text-sm">/locate biome minecraft:cherry_grove</code> to find the nearest of any biome type.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld', label: 'Overview' }}
        next={{ href: '/docs/overworld/mobs', label: 'Mobs' }}
      />
    </>
  )
}
