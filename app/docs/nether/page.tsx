import Link from 'next/link'
import {
  DocsTitle,
  DocsSection,
  Callout,
  DocsPager,
  WikiHero,
  StatGrid,
} from '@/components/docs/docs-ui'

export const metadata = { title: 'The Nether · YuuTiers Wiki' }

export default function NetherPage() {
  return (
    <>
      <WikiHero
        image="/wiki/nether-hero.jpg"
        eyebrow="Dimension"
        title="The Nether"
        description="A scorched hellscape of lava oceans, soul-bound forests and ancient fortresses. Death waits in every direction — but so do the game's most powerful materials."
        accent="#ef4444"
      />

      <StatGrid
        items={[
          { label: 'Build height', value: '0 → 256', accent: '#ef4444' },
          { label: 'Travel ratio', value: '1 = 8 Overworld' },
          { label: 'Biomes', value: '5' },
          { label: 'Sky', value: 'None (cap)' },
        ]}
      />

      <DocsTitle
        eyebrow="The Nether"
        title="Overview"
        description="A fast-travel dimension full of dangers, riches and unique resources that exist nowhere else."
      />

      <DocsSection title="Getting in">
        <p>
          Build a portal frame out of <span className="text-[#f1f1f7]">obsidian</span>{' '}
          (minimum 4×5, corners optional, max 23×23) and ignite it with flint and
          steel. The portal opens a doorway to a randomly-generated location in
          the Nether.
        </p>
      </DocsSection>

      <DocsSection title="Why it matters">
        <ul className="list-disc pl-5 space-y-1 text-[#8a8aa3]">
          <li>
            <span className="text-[#f1f1f7]">Fast travel.</span> 1 block in the
            Nether equals 8 in the Overworld — perfect for highways between bases.
          </li>
          <li>
            <span className="text-[#f1f1f7]">Netherite.</span> The only place to
            find <span className="text-[#f1f1f7]">Ancient Debris</span>, the
            ore needed for end-game gear.
          </li>
          <li>
            <span className="text-[#f1f1f7]">Blaze rods.</span> Required for
            brewing potions and reaching the End.
          </li>
          <li>
            <span className="text-[#f1f1f7]">Piglin trading.</span> Throw gold
            ingots at piglins for ender pearls, fire resistance and more.
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="The hazards">
        <ul className="list-disc pl-5 space-y-1 text-[#8a8aa3]">
          <li><span className="text-[#f1f1f7]">No water.</span> Water evaporates on placement.</li>
          <li><span className="text-[#f1f1f7]">No beds.</span> Beds explode violently when used.</li>
          <li><span className="text-[#f1f1f7]">No sleep.</span> Phantoms can&apos;t spawn but you can&apos;t reset your spawn either.</li>
          <li><span className="text-[#f1f1f7]">Lava everywhere.</span> Bring Fire Resistance potions.</li>
        </ul>
      </DocsSection>

      <DocsSection title="What's in the Nether?">
        <ul className="list-disc pl-5 space-y-1 text-[#8a8aa3]">
          <li>
            <Link href="/docs/nether/biomes" className="text-[#60a5fa] hover:underline">5 distinct biomes</Link> — from blue Warped Forests to red Crimson ones.
          </li>
          <li>
            <Link href="/docs/nether/mobs" className="text-[#60a5fa] hover:underline">Unique mobs</Link> including Ghasts, Blazes, Piglins and Hoglins.
          </li>
          <li>
            <Link href="/docs/nether/structures" className="text-[#60a5fa] hover:underline">Fortresses and Bastions</Link> with high-tier loot.
          </li>
        </ul>
      </DocsSection>

      <Callout type="warning" title="Bring a backup portal">
        Ghasts can destroy obsidian. If your only portal home gets blown up,
        you&apos;ll need flint and steel — or worse, more obsidian.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/overworld/structures', label: 'Structures' }}
        next={{ href: '/docs/nether/biomes', label: 'Nether biomes' }}
      />
    </>
  )
}
