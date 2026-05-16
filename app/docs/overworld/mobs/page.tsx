import Image from 'next/image'
import {
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  MobCard,
  StatGrid,
  WikiTable,
} from '@/components/docs/docs-ui'

export const metadata = { 
  title: 'Overworld Mobs · YuuTiers Wiki',
  description: 'Complete guide to all Overworld mobs in Minecraft — passive, neutral, and hostile creatures with stats, drops, and behaviors.'
}

const passive = [
  { name: 'Cow', type: 'Passive', health: '10 ♥', damage: 'None', drops: 'Raw beef, leather', notes: 'Found in grassy biomes. Breed with wheat. Mooshrooms are the mushroom variant.' },
  { name: 'Pig', type: 'Passive', health: '10 ♥', damage: 'None', drops: 'Raw porkchop', notes: 'Can be saddled and ridden using a carrot on a stick. Lightning turns them into Zombified Piglins.' },
  { name: 'Sheep', type: 'Passive', health: '8 ♥', damage: 'None', drops: 'Wool, raw mutton', notes: 'Shear for wool without killing. Comes in 16 dye colors. Eat grass to regrow wool.' },
  { name: 'Chicken', type: 'Passive', health: '4 ♥', damage: 'None', drops: 'Raw chicken, feather, egg', notes: 'Lays eggs every 5–10 min. Survives any fall damage by flapping wings.' },
  { name: 'Rabbit', type: 'Passive', health: '3 ♥', damage: 'None', drops: 'Rabbit hide, raw rabbit, rabbit foot (rare)', notes: 'Fast and skittish. Different colors per biome. Killer Bunny is a hostile variant.' },
  { name: 'Villager', type: 'Passive', health: '20 ♥', damage: 'None', drops: 'Nothing', notes: 'Trade emeralds for tools, food, books and enchanted gear. 15 different professions.' },
  { name: 'Wandering Trader', type: 'Passive', health: '20 ♥', damage: 'None', drops: 'Leads', notes: 'Spawns randomly with 2 llamas. Sells rare items like coral and blue ice.' },
  { name: 'Axolotl', type: 'Passive', health: '14 ♥', damage: '2 ♥', drops: 'Bucket only', notes: 'Found in lush caves. Plays dead to heal. Attacks drowned and guardians. 5 colors.' },
  { name: 'Glow Squid', type: 'Passive', health: '10 ♥', damage: 'None', drops: 'Glow ink sac', notes: 'Glows in the dark. Found in underground water. Makes signs glow.' },
  { name: 'Frog', type: 'Passive', health: '10 ♥', damage: 'None', drops: 'Nothing', notes: 'Eats small slimes and magma cubes. 3 colors based on birth biome temperature.' },
  { name: 'Allay', type: 'Passive', health: '20 ♥', damage: 'None', drops: 'Nothing', notes: 'Collects items matching what you give it. Found in pillager outposts and woodland mansions.' },
  { name: 'Sniffer', type: 'Passive', health: '14 ♥', damage: 'None', drops: 'Nothing', notes: 'Ancient mob hatched from suspicious sand eggs. Digs up unique ancient seeds.' },
]

const neutral = [
  { name: 'Wolf', type: 'Neutral', health: '8 ♥ (wild) / 20 ♥ (tamed)', damage: '2–4 ♥', drops: 'Nothing', notes: 'Tame with bones. Wears a colored collar. Attacks what you attack when tamed.' },
  { name: 'Iron Golem', type: 'Neutral', health: '100 ♥', damage: '7–21 ♥', drops: 'Iron ingots (3-5), poppies', notes: 'Spawns in villages to defend them. Can be built with 4 iron blocks and a pumpkin.' },
  { name: 'Bee', type: 'Neutral', health: '10 ♥', damage: '2 ♥ + poison', drops: 'Nothing', notes: 'Will sting if you break their hive or attack them. Stinger kills them after use.' },
  { name: 'Llama', type: 'Neutral', health: '15–30 ♥', damage: '1–3 ♥', drops: 'Leather', notes: 'Spits when threatened. Form caravans when leashed. Can wear carpets as decoration.' },
  { name: 'Trader Llama', type: 'Neutral', health: '22 ♥', damage: '1–3 ♥', drops: 'Leather, leads', notes: 'Accompanies wandering traders. Stronger than normal llamas.' },
  { name: 'Polar Bear', type: 'Neutral', health: '30 ♥', damage: '4–6 ♥', drops: 'Raw cod, raw salmon', notes: 'Mothers with cubs attack on sight. Adults swim fast.' },
  { name: 'Dolphin', type: 'Neutral', health: '10 ♥', damage: '2–3 ♥', drops: 'Raw cod', notes: 'Gives Dolphin\'s Grace speed buff when swimming nearby. Leads to shipwrecks when fed fish.' },
  { name: 'Fox', type: 'Neutral', health: '10 ♥', damage: '2 ♥', drops: 'Nothing (may drop held item)', notes: 'Nocturnal. Can pick up items. Bred foxes trust players. White foxes in snowy biomes.' },
  { name: 'Goat', type: 'Neutral', health: '10 ♥', damage: '1–2 ♥ (ramming)', drops: 'Nothing', notes: 'Rams players and mobs. Can jump 10 blocks high. Screaming goats are rare.' },
  { name: 'Panda', type: 'Neutral', health: '20 ♥', damage: '4 ♥', drops: 'Bamboo', notes: '7 personality types. Only aggressive pandas attack back. Breed with bamboo in jungle.' },
  { name: 'Enderman', type: 'Neutral', health: '40 ♥', damage: '7 ♥', drops: 'Ender pearl (0-1)', notes: 'Hostile when you look at their face. Teleports away from damage. Cannot enter water.' },
]

const hostile = [
  { name: 'Zombie', type: 'Hostile', health: '20 ♥', damage: '2–4 ♥', drops: 'Rotten flesh, rare: iron, carrot, potato', notes: 'Burns in sunlight. Breaks doors on Hard difficulty. Baby zombies are faster.' },
  { name: 'Husk', type: 'Hostile', health: '20 ♥', damage: '2–4 ♥ + hunger', drops: 'Rotten flesh, rare: iron', notes: 'Desert zombie variant. Does not burn in sun. Inflicts Hunger effect.' },
  { name: 'Drowned', type: 'Hostile', health: '20 ♥', damage: '2–6 ♥', drops: 'Rotten flesh, rare: trident, nautilus shell', notes: 'Water zombie. Throws tridents. Only natural trident source. Spawns in oceans and rivers.' },
  { name: 'Skeleton', type: 'Hostile', health: '20 ♥', damage: '2–5 ♥ (arrow)', drops: 'Bones, arrows, rare: bow', notes: 'Excellent archer. Burns in sunlight. Can pick up armor and weapons.' },
  { name: 'Stray', type: 'Hostile', health: '20 ♥', damage: '2–5 ♥ + slowness', drops: 'Bones, arrows of slowness', notes: 'Frozen biome skeleton. Arrows cause Slowness. Doesn\'t burn in sun.' },
  { name: 'Bogged', type: 'Hostile', health: '16 ♥', damage: '2–4 ♥ + poison', drops: 'Bones, arrows of poison, mushrooms', notes: 'Swamp skeleton added in 1.21. Shoots poisoned arrows. Found in swamps and mangroves.' },
  { name: 'Creeper', type: 'Hostile', health: '20 ♥', damage: 'Explosion (up to 49 ♥)', drops: 'Gunpowder, music disc (if killed by skeleton)', notes: 'Silent until the hiss. Charged by lightning for 2x damage. Iconic mob.' },
  { name: 'Spider', type: 'Hostile', health: '16 ♥', damage: '2–3 ♥', drops: 'String, spider eye', notes: 'Climbs walls. Becomes neutral in daylight. Cave Spiders are smaller and poisonous.' },
  { name: 'Cave Spider', type: 'Hostile', health: '12 ♥', damage: '2 ♥ + poison', drops: 'String, spider eye', notes: 'Found in mineshafts. Small enough to fit through 0.5 block gaps. Always poisonous.' },
  { name: 'Witch', type: 'Hostile', health: '26 ♥', damage: 'Splash potions', drops: 'Glass bottles, sticks, redstone, glowstone, spider eyes, gunpowder, sugar, potions', notes: 'Throws harmful potions and drinks healing potions herself. Found in witch huts.' },
  { name: 'Slime', type: 'Hostile', health: '1-16 ♥', damage: '0-4 ♥', drops: 'Slimeball (small only)', notes: 'Splits into smaller slimes when killed. Spawns below Y=40 in slime chunks or in swamps.' },
  { name: 'Phantom', type: 'Hostile', health: '20 ♥', damage: '2–6 ♥', drops: 'Phantom membrane', notes: 'Spawns if you go 3+ days without sleeping. Burns in sunlight. Membrane repairs elytra.' },
  { name: 'Silverfish', type: 'Hostile', health: '8 ♥', damage: '1 ♥', drops: 'Nothing', notes: 'Hides in infested stone. Calls nearby silverfish when attacked. Found in strongholds.' },
  { name: 'Pillager', type: 'Hostile', health: '24 ♥', damage: '3–5 ♥', drops: 'Crossbow, arrows, ominous bottle', notes: 'Spawn in raids and outposts. Killing captain gives Bad Omen. Hostile to villagers.' },
  { name: 'Vindicator', type: 'Hostile', health: '24 ♥', damage: '7–19 ♥', drops: 'Emeralds, iron axe', notes: 'Powerful melee illager. Found in woodland mansions and raids. Very dangerous.' },
  { name: 'Evoker', type: 'Hostile', health: '24 ♥', damage: 'Fangs (6 ♥), Vexes', drops: 'Totem of Undying, emeralds', notes: 'Summons vexes and fangs. Found in mansions and raids. Drops guaranteed totem.' },
  { name: 'Ravager', type: 'Hostile', health: '100 ♥', damage: '12 ♥', drops: 'Saddle', notes: 'Massive beast that spawns in raids. Destroys crops and leaves. Can be stunned with shield.' },
  { name: 'Vex', type: 'Hostile', health: '14 ♥', damage: '5–9 ♥', drops: 'Nothing', notes: 'Summoned by Evokers. Flies through blocks. Attacks with iron sword. Times out eventually.' },
  { name: 'Guardian', type: 'Hostile', health: '30 ♥', damage: 'Laser (6 ♥)', drops: 'Prismarine shard/crystal, raw cod', notes: 'Found in Ocean Monuments. Laser attack charges up. Inflicts Mining Fatigue with Elder.' },
  { name: 'Elder Guardian', type: 'Boss-tier', health: '80 ♥', damage: 'Laser (8 ♥)', drops: 'Wet sponge, prismarine, cod', notes: '3 per monument. Inflicts Mining Fatigue III on nearby players. Mini-boss mob.' },
  { name: 'Warden', type: 'Boss-tier', health: '500 ♥', damage: '16–45 ♥', drops: 'Sculk catalyst', notes: 'Blind. Senses vibration and smell. Spawns from sculk shriekers. AVOID AT ALL COSTS.' },
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

      <StatGrid
        items={[
          { label: 'Passive mobs', value: `${passive.length}`, accent: '#22c55e' },
          { label: 'Neutral mobs', value: `${neutral.length}`, accent: '#f59e0b' },
          { label: 'Hostile mobs', value: `${hostile.length}`, accent: '#ef4444' },
          { label: 'Boss-tier', value: '3' },
        ]}
      />

      <DocsSection title="Mob behavior types">
        <div className="grid sm:grid-cols-3 gap-3 mt-2">
          <div className="rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/20 p-4">
            <h4 className="text-[#22c55e] font-semibold mb-1">Passive</h4>
            <p className="text-[#8a8aa3] text-sm">Never attack players under any circumstances. Primary food and resource source.</p>
          </div>
          <div className="rounded-xl bg-[#f59e0b]/5 border border-[#f59e0b]/20 p-4">
            <h4 className="text-[#f59e0b] font-semibold mb-1">Neutral</h4>
            <p className="text-[#8a8aa3] text-sm">Peaceful until provoked. Some defend their group or territory.</p>
          </div>
          <div className="rounded-xl bg-[#ef4444]/5 border border-[#ef4444]/20 p-4">
            <h4 className="text-[#ef4444] font-semibold mb-1">Hostile</h4>
            <p className="text-[#8a8aa3] text-sm">Attack players on sight. Most spawn in darkness or specific structures.</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Passive mobs">
        <p>
          Passive mobs never attack you. They&apos;re your main food source and provide essential resources like leather, wool, eggs, and trading goods.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3 not-prose">
          {passive.map((m) => <MobCard key={m.name} {...m} accent="#22c55e" />)}
        </div>
      </DocsSection>

      <DocsSection title="Neutral mobs">
        <p>
          Neutral mobs ignore you until provoked. <span className="text-[#f1f1f7]">Endermen</span> are particularly dangerous if you look at their face — keep your cursor on their feet.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3 not-prose">
          {neutral.map((m) => <MobCard key={m.name} {...m} accent="#f59e0b" />)}
        </div>
      </DocsSection>

      <DocsSection title="Hostile mobs">
        <p>
          Hostile mobs spawn in darkness (light level 0) or in specific biomes and structures. Most undead burn in sunlight. The Warden is in a class of its own.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3 not-prose">
          {hostile.map((m) => <MobCard key={m.name} {...m} accent="#ef4444" />)}
        </div>
      </DocsSection>

      <DocsSection title="Spawn mechanics">
        <WikiTable
          headers={['Condition', 'Effect']}
          rows={[
            ['Light level ≤ 0', 'Hostile mobs can spawn'],
            ['Light level > 0', 'No hostile spawns (except special cases)'],
            ['Distance from player', 'Mobs spawn 24-128 blocks away, despawn at 128+'],
            ['Mob cap', 'Limited mobs per area based on chunk count'],
            ['Peaceful mode', 'No hostile mobs spawn at all'],
          ]}
        />
      </DocsSection>

      <Callout type="warning" title="Avoid the Warden">
        The Warden has the highest health pool in the game and can one-shot unarmored players. It spawns in the Deep Dark biome when sculk shriekers trigger four times. Sneak, place wool to muffle vibrations, and run — do not fight it.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld/biomes', label: 'Biomes' }}
        next={{ href: '/docs/overworld/ores', label: 'Resources & ores' }}
      />
    </>
  )
}
