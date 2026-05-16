import { DocsTitle, DocsSection, DocsPager, InlineCode, Callout } from '@/components/docs/docs-ui'

export const metadata = { title: 'Quick start · YuuTiers Wiki' }

export default function QuickstartPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Getting started"
        title="Quick start"
        description="A 60-second tour through Minecraft's three dimensions and how to read this wiki."
      />

      <DocsSection title="Your first day in the Overworld">
        <p>
          You spawn in a random biome of the <InlineCode>Overworld</InlineCode> with no
          items. Your goals for the first in-game day:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-[#8a8aa3]">
          <li>Punch a tree to collect wood logs.</li>
          <li>Craft a <span className="text-[#f1f1f7]">crafting table</span>, then wooden tools.</li>
          <li>Mine stone to upgrade to stone tools.</li>
          <li>Kill a sheep, craft a bed, and sleep before night falls.</li>
        </ol>
      </DocsSection>

      <DocsSection title="Reaching the Nether">
        <p>
          To enter <InlineCode>The Nether</InlineCode>, build a portal frame from 10
          obsidian blocks (4 wide × 5 tall, corners optional) and light it with flint
          and steel.
        </p>
        <Callout type="info" title="Beware the Nether">
          Distance traveled in the Nether equals{' '}
          <span className="text-[#f1f1f7]">8 blocks in the Overworld</span>. It&apos;s
          the fastest way to travel — but everything there wants you dead.
        </Callout>
      </DocsSection>

      <DocsSection title="Reaching the End">
        <p>
          To find <InlineCode>The End</InlineCode>, throw{' '}
          <span className="text-[#f1f1f7]">Eyes of Ender</span> to locate a Stronghold,
          then activate the End Portal with 12 Eyes of Ender. There you&apos;ll meet
          the Ender Dragon.
        </p>
      </DocsSection>

      <Callout type="success" title="Ready">
        Browse any dimension from the sidebar. Each section has biomes, mobs and
        structures, all linked together.
      </Callout>

      <DocsPager
        prev={{ href: '/docs', label: 'Introduction' }}
        next={{ href: '/docs/overworld', label: 'The Overworld' }}
      />
    </>
  )
}
