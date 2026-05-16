import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  MobCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'End Mobs · YuuTiers Wiki' }

const mobs = [
  {
    name: 'Ender Dragon',
    type: 'Boss',
    health: '200 ♥',
    damage: '6–15 ♥',
    drops: 'Dragon Egg, 12,000 XP, Dragon Breath',
    notes: 'The final boss. Heals from caged End Crystals atop obsidian towers — destroy them first.',
  },
  {
    name: 'Enderman',
    type: 'Neutral',
    health: '40 ♥',
    damage: '7 ♥',
    drops: 'Ender pearl',
    notes: 'The dominant species of the End. Wear a carved pumpkin to look at them safely.',
  },
  {
    name: 'Shulker',
    type: 'Hostile',
    health: '30 ♥',
    damage: '4 ♥ + Levitation',
    drops: 'Shulker shell',
    notes: 'Lives in End Cities. Two shells + a chest = shulker box, a portable inventory.',
  },
  {
    name: 'Endermite',
    type: 'Hostile',
    health: '8 ♥',
    damage: '2 ♥',
    drops: 'Nothing',
    notes: 'Tiny pests. Sometimes spawn when you throw an ender pearl. Despawn after 2 minutes.',
  },
]

export default function EndMobsPage() {
  return (
    <>
      <WikiHero
        image="/wiki/end-mobs.jpg"
        eyebrow="The End"
        title="Mobs"
        description="The End is sparsely populated — just four mobs. But two of them are the most strategically important creatures in the game."
        accent="#a78bfa"
      />

      <DocsSection title="The End roster">
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {mobs.map((m) => (
            <MobCard
              key={m.name}
              {...m}
              accent={m.type === 'Boss' ? '#a78bfa' : m.type === 'Neutral' ? '#f59e0b' : '#ef4444'}
            />
          ))}
        </div>
      </DocsSection>

      <Callout type="success" title="Why kill Shulkers?">
        Shulker shells craft into <span className="text-[#f1f1f7]">Shulker Boxes</span> —
        chests that keep their inventory when broken. They&apos;re game-changing
        for organising large bases and travel.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/end/biomes', label: 'Biomes' }}
        next={{ href: '/docs/end/structures', label: 'Structures' }}
      />
    </>
  )
}
