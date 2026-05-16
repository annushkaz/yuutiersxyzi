import { DocsTitle, DocsSection, DocsPager, FeatureRow, Callout, EndpointCard } from '@/components/docs/docs-ui'

export const metadata = { title: 'Public API | YuuTiers Docs' }

export default function ApiIndexPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Developers"
        title="Public API"
        description="YuuTiers exposes a small set of read-only JSON endpoints that proxy public Mojang and Crafatar data with edge caching."
      />

      <DocsSection title="Base URL">
        <p>
          All endpoints are served from the root of the site. There is no
          versioning prefix yet — we&apos;ll add one before breaking anything.
        </p>
        <p>
          <strong className="text-[#f1f1f7]">Base:</strong>{' '}
          <code className="text-[#60a5fa]">https://yuutiers.xyz/api</code>
        </p>
      </DocsSection>

      <DocsSection title="Endpoint groups">
        <div className="space-y-2.5">
          <FeatureRow href="/docs/api/players" icon="users" title="Player endpoints" desc="Resolve usernames into full profiles with UUID, skin, cape and name history." color="#60a5fa" />
          <FeatureRow href="/docs/api/skins" icon="palette" title="Skin endpoints" desc="Stream skin textures and rendered head PNGs by name or UUID." color="#a78bfa" />
          <FeatureRow href="/docs/api/servers" icon="server" title="Server endpoint" desc="Live status for any Java or Bedrock server." color="#22c55e" />
          <FeatureRow href="/docs/api/news" icon="newspaper" title="News endpoint" desc="Aggregated Mojang articles feed." color="#f59e0b" />
        </div>
      </DocsSection>

      <DocsSection title="All endpoints at a glance">
        <div className="space-y-2.5">
          <EndpointCard method="GET" path="/api/player/{name}" description="Full player profile by username." />
          <EndpointCard method="GET" path="/api/player/search?q={query}" description="Fuzzy username search." />
          <EndpointCard method="GET" path="/api/skin/{uuid}" description="Raw 64×64 skin PNG." />
          <EndpointCard method="GET" path="/api/skin/head/{name}" description="Rendered head PNG." />
          <EndpointCard method="GET" path="/api/server/{ip}" description="Live server status." />
          <EndpointCard method="GET" path="/api/mojang/news" description="Aggregated news feed." />
        </div>
      </DocsSection>

      <Callout type="warning" title="Be kind">
        Endpoints are heavily cached at the edge but please don&apos;t hammer
        them. If you need millions of requests, run your own Mojang proxy.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/end/structures', label: 'End Structures' }}
        next={{ href: '/docs/api/players', label: 'Player endpoints' }}
      />
    </>
  )
}
