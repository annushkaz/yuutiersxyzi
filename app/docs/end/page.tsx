import Link from 'next/link'
import {
  DocsTitle,
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  StatGrid,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'The End · YuuTiers Wiki' }

export default function EndPage() {
  return (
    <>
      <WikiHero
        image="/wiki/end-hero.jpg"
        eyebrow="Dimension"
        title="The End"
        description="A void-floating dimension of pale end-stone islands, home to the Ender Dragon and the final challenge of the main game."
        accent="#a78bfa"
      />

      <StatGrid
        items={[
          { label: 'Build height', value: '0 → 256', accent: '#a78bfa' },
          { label: 'Sky', value: 'None (void)' },
          { label: 'Biomes', value: '4' },
          { label: 'Boss', value: 'Ender Dragon' },
        ]}
      />

      <DocsTitle
        eyebrow="The End"
        title="Overview"
        description="Reach it, beat it, and you've technically &quot;won&quot; Minecraft. Then come back for the loot."
      />

      <DocsSection title="How to enter">
        <ol className="list-decimal pl-5 space-y-1.5 text-[#8a8aa3]">
          <li>Kill Blazes for blaze rods. Combine with ender pearls to craft Eyes of Ender.</li>
          <li>Throw Eyes of Ender — they fly toward the nearest stronghold.</li>
          <li>Dig down, find the End Portal room, and fill the 12 frames with eyes.</li>
          <li>Jump in. There is no way home until you defeat the dragon (or die).</li>
        </ol>
      </DocsSection>

      <DocsSection title="The Ender Dragon fight">
        <p>
          You spawn on the main island. The Dragon circles between obsidian
          towers topped with End Crystals that heal it. Destroy the crystals
          first (caged ones need to be hit through the bars), then attack the
          dragon during its perch phase.
        </p>
        <p>
          Defeating it spawns an exit portal back to the Overworld and a return
          gateway to the <span className="text-[#f1f1f7]">Outer End</span> —
          where End Cities and the Elytra live.
        </p>
      </DocsSection>

      <DocsSection title="The Outer End">
        <p>
          Beyond the central island lies thousands of small end-stone islands
          full of <span className="text-[#f1f1f7]">Chorus Trees</span>,
          Endermen, and the rare <span className="text-[#f1f1f7]">End City</span>{' '}
          structures. End Ships hold the Elytra — the only way to fly in
          survival mode.
        </p>
      </DocsSection>

      <DocsSection title="Explore further">
        <ul className="list-disc pl-5 space-y-1 text-[#8a8aa3]">
          <li>
            <Link href="/docs/end/biomes" className="text-[#60a5fa] hover:underline">
              The 4 End biomes
            </Link>
          </li>
          <li>
            <Link href="/docs/end/mobs" className="text-[#60a5fa] hover:underline">
              Endermen, Shulkers and the Ender Dragon
            </Link>
          </li>
          <li>
            <Link href="/docs/end/structures" className="text-[#60a5fa] hover:underline">
              End Cities and End Ships
            </Link>
          </li>
        </ul>
      </DocsSection>

      <Callout type="warning" title="Don't fall into the void">
        Fall damage in the End equals instant death and total inventory loss
        if you fall off an island. Always bring blocks to pillar back up.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/nether/structures', label: 'Nether structures' }}
        next={{ href: '/docs/end/biomes', label: 'End biomes' }}
      />
    </>
  )
}
