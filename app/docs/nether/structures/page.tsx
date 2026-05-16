import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  BiomeCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'Nether Structures · YuuTiers Wiki' }

const structures = [
  {
    name: 'Nether Fortress',
    climate: 'Any Nether biome',
    description:
      'Dark nether-brick castles spanning huge areas. The only place Blazes spawn and a guaranteed source of Wither Skeletons.',
    features: ['Blaze spawner', 'Wither skeleton', 'Nether wart', 'Saddles & gold horse armor'],
  },
  {
    name: 'Bastion Remnant',
    climate: 'Crimson/Wastes/Basalt',
    description:
      'Massive Piglin-built strongholds with 4 variants: bridge, hoglin stable, housing units and treasure room.',
    features: ['Pigstep music disc', 'Diamonds', 'Gold blocks', 'Ancient debris'],
  },
  {
    name: 'Ruined Portal',
    climate: 'Any (both dimensions)',
    description:
      'Half-broken nether portals from a previous age. Each has a loot chest nearby — sometimes with enchanted golden gear.',
    features: ['Gold ingots', 'Enchanted armour', 'Obsidian', 'Flint & steel'],
  },
]

export default function NetherStructuresPage() {
  return (
    <>
      <WikiHero
        image="/wiki/nether-structures.jpg"
        eyebrow="The Nether"
        title="Structures"
        description="There are only three Nether structures, but every one is essential to game progression."
        accent="#ef4444"
      />

      <DocsSection title="Featured structures">
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {structures.map((s) => (
            <BiomeCard key={s.name} {...s} accent="#ef4444" />
          ))}
        </div>
      </DocsSection>

      <Callout type="success" title="Bastion strategy">
        Bring at least 64 cobblestone. Pillar up onto a roof to safely snipe
        Piglins with a bow. The treasure room contains 1–2 blocks of pure gold
        and a chance at Pigstep — the rarest music disc in the game.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/nether/mobs', label: 'Mobs' }}
        next={{ href: '/docs/end', label: 'The End' }}
      />
    </>
  )
}
