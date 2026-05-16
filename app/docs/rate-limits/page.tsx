import { DocsTitle, DocsSection, DocsPager, InlineCode, Callout } from '@/components/docs/docs-ui'

export const metadata = { title: 'Rate limits & caching | YuuTiers Docs' }

export default function RateLimitsPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Developers"
        title="Rate limits & caching"
        description="How our edge cache works and what to expect when calling the public API in volume."
      />

      <DocsSection title="Caching strategy">
        <p>
          Every endpoint runs on Vercel&apos;s Edge Runtime and is cached
          globally. We use the{' '}
          <InlineCode>Cache-Control</InlineCode> header with{' '}
          <InlineCode>s-maxage</InlineCode> and{' '}
          <InlineCode>stale-while-revalidate</InlineCode>:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>Player profiles — fresh 5 min, SWR 1 h</li>
          <li>Skins / heads — fresh 1 h, SWR 24 h</li>
          <li>Server status — fresh 30 s, SWR 2 min</li>
          <li>News — fresh 60 s, SWR 5 min</li>
        </ul>
      </DocsSection>

      <DocsSection title="Soft rate limits">
        <p>
          There&apos;s no per-IP token bucket today. The cache is your friend —
          if your request matches a recent one, it&apos;s essentially free.
          Excessive traffic against uncached keys may be rate-limited by Vercel
          and our upstreams (Mojang and Crafatar both have their own limits).
        </p>
      </DocsSection>

      <Callout type="warning" title="Don't proxy as your own API">
        These endpoints are for the YuuTiers website and small community use.
        If you&apos;re building a service that needs millions of requests, run
        your own Mojang proxy with proper caching — both for your users and to
        be a good citizen of the ecosystem.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/api/news', label: 'News endpoint' }}
        next={{ href: '/docs/faq', label: 'FAQ' }}
      />
    </>
  )
}
