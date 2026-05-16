import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  MobCard,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'Overworld Mobs · YuuTiers Wiki' }

const passive = [
  { name: 'Cow', type: 'Passive', health: '10 ♥', damage: 'None', drops: 'Raw beef, leather', notes: 'Found in grassy biomes. Breed with wheat.' },
  { name: 'Pig', type: 'Passive', health: '10 ♥', damage: 'None', drops: 'Raw porkchop', notes: 'Can be saddled and ridden using a carrot on a stick.' },
  { name: 'Sheep', type: 'Passive', health: '8 ♥', damage: 'None', drops: 'Wool, raw mutton', notes: 'Shear for wool without killing. Comes in 16 dye colours.' },
  { name: 'Chicken', type: 'Passive', health: '4 ♥', damage: 'None', drops: 'Raw chicken, feather, egg', notes: 'Lays eggs every 5–10 min. Survives any fall damage.' },
  { name: 'Villager', type: 'Passive', health: '20 ♥', damage: 'None', drops: 'Nothing', notes: 'Trade emeralds for tools, food, books and enchanted gear.' },
  { name: 'Axolotl', type: 'Passive', health: '14 ♥', damage: '2 ♥', drops: 'Bucket only', notes: 'Found in lush caves. Plays dead to heal underwater.' },
]

const neutral = [
  { name: 'Wolf', type: 'Neutral', health: '8 ♥', damage: '2–4 ♥', drops: 'Nothing', notes: 'Tame with bones. Wears a coloured collar.' },
  { name: 'Iron Golem', type: 'Neutral', health: '100 ♥', damage: '7–21 ♥', drops: 'Iron ingots, poppies', notes: 'Spawns in villages to defend them. Will not attack you unless provoked.' },
  { name: 'Bee', type: 'Neutral', health: '10 ♥', damage: '2 ♥', drops: 'Nothing', notes: 'Will sting if you break their hive. Stinger kills them.' },
  { name: 'Llama', type: 'Neutral', health: '15–30 ♥', damage: '1–3 ♥', drops: 'Leather', notes: 'Spits when threatened. Form caravans when leashed.' },
  { name: 'Polar Bear', type: 'Neutral', health: '30 ♥', damage: '4–6 ♥', drops: 'Raw fish', notes: 'Mothers with cubs attack on sight.' },
  { name: 'Enderman', type: 'Neutral', health: '40 ♥', damage: '7 ♥', drops: 'Ender pearl', notes: 'Hostile when you look at their head. Cannot enter water.' },
]

const hostile = [
  { name: 'Zombie', type: 'Hostile', health: '20 ♥', damage: '2–4 ♥', drops: 'Rotten flesh, rare iron', notes: 'Burns in sunlight. Breaks doors on Hard difficulty.' },
  { name: 'Skeleton', type: 'Hostile', health: '20 ♥', damage: '2–5 ♥', drops: 'Bones, arrows', notes: 'Excellent archer. Tame the wolf to fight back.' },
  { name: 'Creeper', type: 'Hostile', health: '20 ♥', damage: 'Explosion (up to 49 ♥)', drops: 'Gunpowder', notes: 'Silent — you only hear the hiss. Charged by lightning.' },
  { name: 'Spider', type: 'Hostile', health: '16 ♥', damage: '2–3 ♥', drops: 'String, spider eye', notes: 'Climbs walls. Becomes neutral in daylight.' },
  { name: 'Witch', type: 'Hostile', health: '26 ♥', damage: 'Splash potions', drops: 'Sticks, sugar, glowstone, redstone', notes: 'Throws harmful potions and drinks healing potions herself.' },
  { name: 'Drowned', type: 'Hostile', health: '20 ♥', damage: '2–6 ♥', drops: 'Rotten flesh, rare trident', notes: 'Skeletons turn into Strays in cold biomes.' },
  { name: 'Phantom', type: 'Hostile', health: '20 ♥', damage: '2–6 ♥', drops: 'Phantom membrane', notes: 'Spawns if you go 3+ days without sleeping.' },
  { name: 'Pillager', type: 'Hostile', health: '24 ♥', damage: '3–5 ♥', drops: 'Crossbow, arrow, emerald', notes: 'Spawn in raids and pillager outposts. Hostile to villagers.' },
  { name: 'Warden', type: 'Boss-tier', health: '500 ♥', damage: '15–30 ♥', drops: 'Sculk catalyst', notes: 'Blind. Senses vibration. Avoid at all costs.' },
]

export default function OverworldMobsPage() {
  return (
    <>
      <WikiHero
        image="/wiki/overworld-mobs.jpg"
        eyebrow="The Overworld"
        title="Mobs"
        description="From peaceful cows in the plains to the terrifying Warden in the Deep Dark — every creature that calls the Overworld home."
        accent="#22c55e"
      />

      <DocsSection title="Passive mobs">
        <p>
          Passive mobs never attack you. They&apos;re your main food source and
          provide essential resources like leather, wool and eggs.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3 not-prose">
          {passive.map((m) => <MobCard key={m.name} {...m} accent="#22c55e" />)}
        </div>
      </DocsSection>

      <DocsSection title="Neutral mobs">
        <p>
          Neutral mobs ignore you until provoked. Endermen in particular are
          dangerous if you look at their face — keep your cursor on their feet.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3 not-prose">
          {neutral.map((m) => <MobCard key={m.name} {...m} accent="#f59e0b" />)}
        </div>
      </DocsSection>

      <DocsSection title="Hostile mobs">
        <p>
          Hostile mobs spawn in the dark or in specific biomes and structures.
          Most burn in sunlight. The Warden is in a class of its own.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3 not-prose">
          {hostile.map((m) => <MobCard key={m.name} {...m} accent="#ef4444" />)}
        </div>
      </DocsSection>

      <Callout type="warning" title="Avoid the Warden">
        The Warden has the highest health pool in the game and can one-shot
        unarmored players. It spawns in the Deep Dark biome when sculk shriekers
        trigger four times. Sneak, place wool to muffle vibrations, and run.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld/biomes', label: 'Biomes' }}
        next={{ href: '/docs/overworld/ores', label: 'Resources & ores' }}
      />
    </>
  )
}
