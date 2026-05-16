import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  BiomeCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'End Biomes · YuuTiers Wiki' }

const biomes = [
  {
    name: 'The End (Central)',
    climate: 'Main island',
    description:
      'A flat pale-yellow island of end stone surrounded by obsidian pillars. Where the Ender Dragon boss fight happens.',
    features: ['Ender Dragon', 'End Crystals', 'Obsidian pillars', 'Bedrock fountain'],
  },
  {
    name: 'End Midlands',
    climate: 'Outer ring',
    description:
      'Large outer islands covered in Chorus Trees. The most common biome in the Outer End.',
    features: ['Chorus plants', 'Endermen', 'Chorus fruit'],
  },
  {
    name: 'End Highlands',
    climate: 'Outer ring',
    description:
      'Tall plateaus with steep cliffs. End Cities only generate here, on the elevated end-stone.',
    features: ['End Cities', 'End Ships', 'Shulkers', 'Elytra'],
  },
  {
    name: 'End Barrens',
    climate: 'Outer ring',
    description:
      'Flat empty stretches of end stone separating the Highlands. Quiet but eerie.',
    features: ['Endermen only', 'Mostly empty'],
  },
]

export default function EndBiomesPage() {
  return (
    <>
      <WikiHero
        image="/wiki/end-biomes.jpg"
        eyebrow="The End"
        title="Biomes"
        description="A central island, a long void gap, then thousands of outer islands. Just four biomes — but each plays a distinct role."
        accent="#a78bfa"
      />

      <DocsSection title="Featured biomes">
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {biomes.map((b) => (
            <BiomeCard key={b.name} {...b} accent="#a78bfa" />
          ))}
        </div>
      </DocsSection>

      <Callout type="info" title="The void gap">
        Between the central End and the outer islands lies ~1,000 blocks of
        pure void. Use the return gateway after killing the dragon — throw an
        ender pearl through it to teleport across instantly.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/end', label: 'Overview' }}
        next={{ href: '/docs/end/mobs', label: 'Mobs' }}
      />
    </>
  )
}
