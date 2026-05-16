import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  MobCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'Nether Mobs · YuuTiers Wiki' }

const mobs = [
  { name: 'Zombified Piglin', type: 'Neutral', health: '20 ♥', damage: '5–13 ♥', drops: 'Rotten flesh, gold nuggets, rare gold ingot', notes: 'Becomes hostile in a pack if you hit one. They never forget.' },
  { name: 'Piglin', type: 'Neutral', health: '16 ♥', damage: '3–8 ♥', drops: 'Crossbow, gold-tier loot', notes: 'Hostile unless you wear at least 1 piece of gold armour. Trade with gold ingots.' },
  { name: 'Hoglin', type: 'Hostile', health: '40 ♥', damage: '3–18 ♥', drops: 'Raw porkchop, leather', notes: 'Charges at the player. Repelled by warped fungi and respawn anchors.' },
  { name: 'Ghast', type: 'Hostile', health: '10 ♥', damage: '3–17 ♥ (fireball)', drops: 'Gunpowder, ghast tear', notes: 'Shoots fireballs you can deflect with a punch or arrow. Tears are needed for End Crystals.' },
  { name: 'Blaze', type: 'Hostile', health: '20 ♥', damage: '3–9 ♥', drops: 'Blaze rod', notes: 'Spawns at Blaze Spawners in fortresses. Rods are mandatory for the End.' },
  { name: 'Wither Skeleton', type: 'Hostile', health: '20 ♥', damage: '5–12 ♥ + wither', drops: 'Coal, bones, rare skull', notes: '3 skulls = summon the Wither. Inflicts Wither effect.' },
  { name: 'Magma Cube', type: 'Hostile', health: '4 / 8 / 16 ♥', damage: '3–6 ♥', drops: 'Magma cream', notes: 'Splits into smaller cubes on death, like a Slime.' },
  { name: 'Piglin Brute', type: 'Hostile', health: '50 ♥', damage: '7–13 ♥', drops: 'Golden axe', notes: 'Guard bastions. Cannot be distracted by gold. Always hostile.' },
  { name: 'Strider', type: 'Passive', health: '20 ♥', damage: 'None', drops: 'String', notes: 'Walks on lava. Saddle one and steer with a warped fungus on a stick.' },
]

export default function NetherMobsPage() {
  return (
    <>
      <WikiHero
        image="/wiki/nether-mobs.jpg"
        eyebrow="The Nether"
        title="Mobs"
        description="From friendly lava-walking Striders to the deadly Piglin Brute. Know your enemies before you step through the portal."
        accent="#ef4444"
      />

      <DocsSection title="Nether mob roster">
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {mobs.map((m) => (
            <MobCard
              key={m.name}
              {...m}
              accent={m.type === 'Passive' ? '#22c55e' : m.type === 'Neutral' ? '#f59e0b' : '#ef4444'}
            />
          ))}
        </div>
      </DocsSection>

      <Callout type="warning" title="Wear gold around Piglins">
        Just 1 piece of gold armour stops Piglins from attacking on sight. But
        don&apos;t mine gold in front of them — they will become hostile regardless
        of what you&apos;re wearing.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/nether/biomes', label: 'Biomes' }}
        next={{ href: '/docs/nether/structures', label: 'Structures' }}
      />
    </>
  )
}
