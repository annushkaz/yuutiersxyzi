import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  BiomeCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'Nether Biomes · YuuTiers Wiki' }

const biomes = [
  {
    name: 'Nether Wastes',
    climate: 'Default',
    description:
      'The classic Nether — orange netherrack, lava lakes and the iconic glowstone clusters hanging from the ceiling.',
    features: ['Zombified Piglins', 'Ghasts', 'Magma Cubes', 'Glowstone'],
  },
  {
    name: 'Crimson Forest',
    climate: 'Forest',
    description:
      'A red, fungal forest of giant crimson trees and weeping vines. Home to Piglins and Hoglins.',
    features: ['Piglins', 'Hoglins', 'Crimson stems', 'Shroomlight'],
  },
  {
    name: 'Warped Forest',
    climate: 'Forest',
    description:
      'A surreal teal-blue forest. The safest biome in the Nether — no mobs spawn naturally except Endermen.',
    features: ['Endermen', 'Warped fungi', 'Twisting vines', 'Sproutlight'],
  },
  {
    name: 'Soul Sand Valley',
    climate: 'Open',
    description:
      'A haunting valley of soul sand and soul soil, dotted with giant skeletons. Soul fire burns blue.',
    features: ['Skeletons', 'Ghasts', 'Soul soil', 'Nether fossils'],
  },
  {
    name: 'Basalt Deltas',
    climate: 'Volcanic',
    description:
      'Jagged basalt pillars, magma streams and constant ash. The most dangerous biome — Magma Cubes everywhere.',
    features: ['Magma Cubes', 'Basalt', 'Blackstone', 'Ash particles'],
  },
]

export default function NetherBiomesPage() {
  return (
    <>
      <WikiHero
        image="/wiki/nether-biomes.jpg"
        eyebrow="The Nether"
        title="Biomes"
        description="Five wildly different biomes inside one hellish dimension. Each has its own colour palette, mobs and resources."
        accent="#ef4444"
      />

      <DocsSection title="Featured biomes">
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {biomes.map((b) => (
            <BiomeCard key={b.name} {...b} accent="#ef4444" />
          ))}
        </div>
      </DocsSection>

      <Callout type="info" title="Warped Forest = safe haven">
        Place your portal entrance in a Warped Forest if possible. The natural
        lack of hostile mobs (besides Endermen who you can avoid) makes it the
        only &quot;chill&quot; place to build a Nether hub.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/nether', label: 'Overview' }}
        next={{ href: '/docs/nether/mobs', label: 'Mobs' }}
      />
    </>
  )
}
