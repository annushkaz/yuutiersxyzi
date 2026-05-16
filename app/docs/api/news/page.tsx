import { DocsTitle, DocsSection, DocsPager, CodeBlock, EndpointCard, InlineCode } from '@/components/docs/docs-ui'

export const metadata = { title: 'News endpoint | YuuTiers Docs' }

export default function ApiNewsPage() {
  return (
    <>
      <DocsTitle
        eyebrow="API reference"
        title="News endpoint"
        description="Aggregated Minecraft news feed from official Mojang sources."
      />

      <DocsSection title="GET /api/mojang/news">
        <EndpointCard
          method="GET"
          path="/api/mojang/news"
          description="Returns an array of recent Minecraft news articles from minecraft.net."
        />
        <p className="mt-3">Example response:</p>
        <CodeBlock language="json">{`{
  "articles": [
    {
      "id": "minecraft-1-21-2",
      "title": "Minecraft 1.21.2 is out!",
      "date": "2024-10-22T00:00:00Z",
      "category": "News",
      "image": "https://www.minecraft.net/content/dam/games/minecraft/screenshots/...",
      "link": "https://www.minecraft.net/en-us/article/minecraft-1-21-2",
      "excerpt": "The latest Minecraft update brings new features and bug fixes..."
    },
    {
      "id": "mob-vote-2024",
      "title": "Mob Vote 2024 Results",
      "date": "2024-10-19T00:00:00Z",
      "category": "News",
      "image": "https://www.minecraft.net/content/dam/games/minecraft/screenshots/...",
      "link": "https://www.minecraft.net/en-us/article/mob-vote-2024",
      "excerpt": "The community has spoken! Meet the winner..."
    }
  ],
  "lastUpdated": "2024-10-22T14:30:00Z"
}`}</CodeBlock>
      </DocsSection>

      <DocsSection title="Article fields">
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li><InlineCode>id</InlineCode> — unique identifier derived from the article URL.</li>
          <li><InlineCode>title</InlineCode> — article headline.</li>
          <li><InlineCode>date</InlineCode> — ISO 8601 publication date.</li>
          <li><InlineCode>category</InlineCode> — article type (News, Deep Dives, Marketplace, etc.).</li>
          <li><InlineCode>image</InlineCode> — full-size header image URL.</li>
          <li><InlineCode>link</InlineCode> — direct link to the article on minecraft.net.</li>
          <li><InlineCode>excerpt</InlineCode> — short summary text when available.</li>
        </ul>
      </DocsSection>

      <DocsSection title="Caching">
        <p>
          News is cached for <InlineCode>60 seconds</InlineCode> with a
          stale-while-revalidate of 5 minutes. The feed typically updates once
          or twice per week during major announcements.
        </p>
      </DocsSection>

      <DocsPager
        prev={{ href: '/docs/api/servers', label: 'Server endpoint' }}
        next={{ href: '/docs/rate-limits', label: 'Rate limits' }}
      />
    </>
  )
}
