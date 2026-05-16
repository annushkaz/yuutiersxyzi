import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  BiomeCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'End Structures · YuuTiers Wiki' }

const structures = [
  {
    name: 'End City',
    climate: 'End Highlands',
    description:
      'Pale purpur towers reaching high into the void, full of Shulkers and loot chests with diamond gear.',
    features: ['Shulker shells', 'Diamond armour', 'Iron / gold blocks', 'Enchanted books'],
  },
  {
    name: 'End Ship',
    climate: 'Attached to End Cities',
    description:
      'A floating purpur galleon docked beside roughly 1 in 8 End Cities. Holds the Elytra in an item frame.',
    features: ['Elytra', 'Dragon Head', '2 loot chests'],
  },
  {
    name: 'End Gateway',
    climate: 'Edge of main island',
    description:
      'A tiny portal that spawns after killing the Dragon. Throw an ender pearl through to teleport to the Outer End.',
    features: ['One-way pearl teleport', 'Generates per dragon kill'],
  },
  {
    name: 'End Portal',
    climate: 'Inside Strongholds',
    description:
      'The structure that brought you here. Once activated it can be re-entered freely.',
    features: ['12 portal frames', 'Silverfish spawner', 'Library nearby'],
  },
]

export default function EndStructuresPage() {
  return (
    <>
      <WikiHero
        image="/wiki/end-structures.jpg"
        eyebrow="The End"
        title="Structures"
        description="The End is barren, but the structures it does have hold the game's most coveted loot: Elytra wings and Shulker boxes."
        accent="#a78bfa"
      />

      <DocsSection title="Featured structures">
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {structures.map((s) => (
            <BiomeCard key={s.name} {...s} accent="#a78bfa" />
          ))}
        </div>
      </DocsSection>

      <Callout type="success" title="The Elytra">
        Found in every End Ship, the Elytra lets you glide. Combine with
        rockets and you can fly indefinitely. After getting one, exploration
        is never the same.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/end/mobs', label: 'Mobs' }}
        next={{ href: '/docs/changelog', label: 'Changelog' }}
      />
    </>
  )
}
