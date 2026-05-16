import { DocsTitle, DocsSection, DocsPager, CodeBlock, EndpointCard, InlineCode } from '@/components/docs/docs-ui'

export const metadata = { title: 'Player endpoints | YuuTiers Docs' }

export default function ApiPlayersPage() {
  return (
    <>
      <DocsTitle
        eyebrow="API reference"
        title="Player endpoints"
        description="Resolve a Minecraft username into a full profile, or search for partial matches."
      />

      <DocsSection title="GET /api/player/{name}">
        <EndpointCard
          method="GET"
          path="/api/player/{name}"
          description="Returns a complete PlayerApiResponse, resolving the username through Mojang and enriching with Crafatar renders."
        />
        <p className="mt-4">Path parameters:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li><InlineCode>name</InlineCode> — the Minecraft username (case-insensitive).</li>
        </ul>
        <p className="mt-3">Example response:</p>
        <CodeBlock language="json">{`{
  "uuid": "069a79f4-44e9-4726-a5be-fca90e38aaf5",
  "uuidRaw": "069a79f444e94726a5befca90e38aaf5",
  "name": "Notch",
  "skin": {
    "url": "https://textures.minecraft.net/texture/...",
    "variant": "classic"
  },
  "cape": { "url": "https://textures.minecraft.net/texture/..." },
  "textureValue": "ewogICJ0aW1lc3R...",
  "nameHistory": [
    { "name": "Notch" }
  ],
  "renders": {
    "avatar": "https://crafatar.com/avatars/...",
    "head": "https://crafatar.com/renders/head/...",
    "body": "https://crafatar.com/renders/body/..."
  }
}`}</CodeBlock>
        <p>
          Returns <InlineCode>404</InlineCode> when the username does not exist
          on Mojang, <InlineCode>500</InlineCode> on upstream errors.
        </p>
      </DocsSection>

      <DocsSection title="GET /api/player/search?q={query}">
        <EndpointCard
          method="GET"
          path="/api/player/search?q={query}"
          description="Fuzzy search for player names. Returns an array of matching usernames with their head renders."
        />
        <p className="mt-3">Example response:</p>
        <CodeBlock language="json">{`{
  "results": [
    { "name": "Annushkaz_Yuu", "uuid": "..." },
    { "name": "Annushka", "uuid": "..." }
  ]
}`}</CodeBlock>
      </DocsSection>

      <DocsPager
        prev={{ href: '/docs/api', label: 'Public API' }}
        next={{ href: '/docs/api/skins', label: 'Skin endpoints' }}
      />
    </>
  )
}
