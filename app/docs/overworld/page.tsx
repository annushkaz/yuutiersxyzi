import Link from 'next/link'
import {
  DocsTitle,
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  StatGrid,
  WikiTable,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'The Overworld · YuuTiers Wiki' }

export default function OverworldPage() {
  return (
    <>
      <WikiHero
        image="/minecraft-landscape.jpg"
        eyebrow="Dimension"
        title="The Overworld"
        description="The primary dimension where every Minecraft adventure begins. A vast world of forests, oceans, mountains, caves and over 60 unique biomes."
        accent="#22c55e"
      />

      <StatGrid
        items={[
          { label: 'Build height', value: '−64 → 320', accent: '#22c55e' },
          { label: 'Time cycle', value: '20 min day' },
          { label: 'Biomes', value: '60+' },
          { label: 'Sky', value: 'Yes' },
        ]}
      />

      <DocsTitle
        eyebrow="The Overworld"
        title="Overview"
        description="Everything you need to know about Minecraft's main dimension — its rules, its weather and the resources you can harvest from it."
      />

      <DocsSection title="What is the Overworld?">
        <p>
          The <span className="text-[#f1f1f7]">Overworld</span> is the default
          dimension you spawn into when starting a new world. It&apos;s the largest
          and most diverse of the three dimensions and serves as the &quot;hub&quot;
          for the entire game — both the Nether and the End are reached from here.
        </p>
        <p>
          Worlds are practically infinite on the X/Z axes (about 30 million blocks
          each direction). The vertical world ranges from{' '}
          <span className="text-[#f1f1f7]">Y = −64</span> at bedrock to{' '}
          <span className="text-[#f1f1f7]">Y = 320</span> at build limit.
        </p>
      </DocsSection>

      <DocsSection title="Day/night cycle">
        <p>
          A full Minecraft day lasts <span className="text-[#f1f1f7]">20 real-time
          minutes</span> (24,000 in-game ticks). Hostile mobs spawn at night and
          burn in sunlight the next morning — sleeping in a bed during night
          skips ahead to dawn.
        </p>
        <WikiTable
          headers={['Phase', 'Ticks', 'Real time']}
          rows={[
            ['Day', '0 – 12,000', '10 min'],
            ['Sunset', '12,000 – 13,000', '~50 s'],
            ['Night', '13,000 – 23,000', '~8 min'],
            ['Sunrise', '23,000 – 24,000', '~50 s'],
          ]}
        />
      </DocsSection>

      <DocsSection title="Weather">
        <p>
          Rain darkens the sky and douses fires. In cold biomes it falls as snow.
          Thunderstorms add lightning that can spawn{' '}
          <span className="text-[#f1f1f7]">Charged Creepers</span> and turn pigs
          into <span className="text-[#f1f1f7]">Zombified Piglins</span>.
        </p>
      </DocsSection>

      <DocsSection title="What's in the Overworld?">
        <ul className="list-disc pl-5 space-y-1 text-[#8a8aa3]">
          <li>
            <Link href="/docs/overworld/biomes" className="text-[#60a5fa] hover:underline">
              60+ biomes
            </Link>{' '}
            from icy peaks to lush jungles and mushroom islands.
          </li>
          <li>
            <Link href="/docs/overworld/mobs" className="text-[#60a5fa] hover:underline">
              Passive, neutral and hostile mobs
            </Link>{' '}
            with unique drops and behaviours.
          </li>
          <li>
            <Link href="/docs/overworld/ores" className="text-[#60a5fa] hover:underline">
              All progression ores
            </Link>{' '}
            from coal to ancient debris, hidden across cave layers.
          </li>
          <li>
            <Link href="/docs/overworld/structures" className="text-[#60a5fa] hover:underline">
              Generated structures
            </Link>{' '}
            — villages, temples, monuments, strongholds and more.
          </li>
        </ul>
      </DocsSection>

      <Callout type="info" title="Did you know?">
        The Overworld&apos;s vertical scale was expanded in Minecraft 1.18 with the{' '}
        <span className="text-[#f1f1f7]">Caves &amp; Cliffs</span> update,
        doubling the depth of caves and the height of mountains.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/quickstart', label: 'Quick start' }}
        next={{ href: '/docs/overworld/biomes', label: 'Biomes' }}
      />
    </>
  )
}
