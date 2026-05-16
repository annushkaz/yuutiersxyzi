import { DocsTitle, DocsSection, DocsPager, CodeBlock, EndpointCard, InlineCode } from '@/components/docs/docs-ui'

export const metadata = { title: 'Skin endpoints | YuuTiers Docs' }

export default function ApiSkinsPage() {
  return (
    <>
      <DocsTitle
        eyebrow="API reference"
        title="Skin endpoints"
        description="Stream raw skin textures and rendered head PNGs straight from our edge."
      />

      <DocsSection title="GET /api/skin/{uuid}">
        <EndpointCard
          method="GET"
          path="/api/skin/{uuid}"
          description="Returns the raw 64×64 PNG skin texture. Accepts either a UUID (dashed or trimmed) or a username — we'll resolve it."
        />
        <p className="mt-3">
          Content type: <InlineCode>image/png</InlineCode>. Caching:{' '}
          <InlineCode>s-maxage=3600</InlineCode> with stale-while-revalidate of 24h.
        </p>
        <p>Example usage in HTML:</p>
        <CodeBlock language="html">{`<img
  src="/api/skin/Notch"
  width="64"
  height="64"
  style="image-rendering: pixelated"
/>`}</CodeBlock>
        <p>
          On failure to resolve, we fall back to a static Steve skin so the
          response never breaks an embed.
        </p>
      </DocsSection>

      <DocsSection title="GET /api/skin/head/{name}">
        <EndpointCard
          method="GET"
          path="/api/skin/head/{name}"
          description="Returns a pre-rendered isometric head PNG for the given username. Perfect for chips, leaderboards and avatars."
        />
        <p className="mt-3">
          Content type: <InlineCode>image/png</InlineCode>. Cached for 1 hour.
        </p>
        <CodeBlock language="html">{`<img src="/api/skin/head/Annushkaz_Yuu" width="32" height="32" />`}</CodeBlock>
      </DocsSection>

      <DocsPager
        prev={{ href: '/docs/api/players', label: 'Player endpoints' }}
        next={{ href: '/docs/api/servers', label: 'Server endpoint' }}
      />
    </>
  )
}
