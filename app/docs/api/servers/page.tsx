import { DocsTitle, DocsSection, DocsPager, CodeBlock, EndpointCard, InlineCode } from '@/components/docs/docs-ui'

export const metadata = { title: 'Server endpoint | YuuTiers Docs' }

export default function ApiServersPage() {
  return (
    <>
      <DocsTitle
        eyebrow="API reference"
        title="Server endpoint"
        description="Query live status for any Minecraft Java or Bedrock server."
      />

      <DocsSection title="GET /api/server/{ip}">
        <EndpointCard
          method="GET"
          path="/api/server/{ip}"
          description="Returns the live status of a Minecraft server, including player count, MOTD, version and latency."
        />
        <p className="mt-4">Path parameters:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><InlineCode>ip</InlineCode> — the server address (e.g., <InlineCode>mc.hypixel.net</InlineCode> or <InlineCode>play.server.com:25565</InlineCode>).</li>
        </ul>
        <p className="mt-3">Example response:</p>
        <CodeBlock language="json">{`{
  "online": true,
  "host": "mc.hypixel.net",
  "port": 25565,
  "ip": "209.222.115.41",
  "version": "Requires MC 1.8 / 1.21",
  "protocol": 47,
  "players": {
    "online": 45892,
    "max": 200000,
    "list": []
  },
  "motd": {
    "raw": "§aHypixel Network §c[1.8-1.21]\\n§b§lSKYBLOCK 0.20.4 §7- §6§lSUMMER EVENT",
    "clean": "Hypixel Network [1.8-1.21]\\nSKYBLOCK 0.20.4 - SUMMER EVENT",
    "html": "<span style=\\"color:#55FF55\\">Hypixel Network</span>..."
  },
  "favicon": "data:image/png;base64,...",
  "software": "Paper",
  "debug": {
    "ping": true,
    "query": false,
    "srv": true
  }
}`}</CodeBlock>
      </DocsSection>

      <DocsSection title="Bedrock servers">
        <p>
          Bedrock servers are detected automatically when the port is{' '}
          <InlineCode>19132</InlineCode> or when Java ping fails. The response
          shape is identical, but some fields (like favicon) may be absent.
        </p>
      </DocsSection>

      <DocsSection title="Caching">
        <p>
          Server status is cached for <InlineCode>30 seconds</InlineCode> with
          a stale-while-revalidate of 2 minutes. This balances freshness with
          upstream load.
        </p>
      </DocsSection>

      <DocsPager
        prev={{ href: '/docs/api/skins', label: 'Skin endpoints' }}
        next={{ href: '/docs/api/news', label: 'News endpoint' }}
      />
    </>
  )
}
