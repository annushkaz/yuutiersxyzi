import Link from 'next/link'
import { DocsTitle, DocsSection, DocsPager, Callout } from '@/components/docs/docs-ui'

export const metadata = { title: 'Privacy & data | YuuTiers Docs' }

export default function PrivacyDocsPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Resources"
        title="Privacy & data"
        description="What we collect, what we don't, and how to reach the legal documents."
      />

      <DocsSection title="What we collect">
        <p>
          Nothing identifying. We do not run third-party analytics on personal
          queries. We don&apos;t use cookies for tracking, and we don&apos;t
          have a user database to leak.
        </p>
      </DocsSection>

      <DocsSection title="What we proxy">
        <p>
          When you use the site, your browser makes requests to our edge,
          which then queries:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>api.mojang.com &amp; sessionserver.mojang.com — for UUIDs and textures</li>
          <li>crafatar.com — for rendered head and body images</li>
          <li>mcsrvstat.us — for live server status</li>
          <li>minecraft.net — for the news feed</li>
        </ul>
        <p>
          These are all official or community-trusted sources. Their privacy
          policies apply to anything they collect about the request.
        </p>
      </DocsSection>

      <DocsSection title="Browser storage">
        <p>
          We may store a small list of recent searches in your{' '}
          <code className="text-[#60a5fa]">localStorage</code> to power the
          command palette. This never leaves your device.
        </p>
      </DocsSection>

      <Callout type="info" title="Full legal documents">
        Read the complete <Link className="text-[#60a5fa] hover:underline" href="/privacy">Privacy Policy</Link>{' '}
        and the <Link className="text-[#60a5fa] hover:underline" href="/terms">Terms of Service</Link>.
      </Callout>

      <DocsPager
        prev={{ href: '/docs/faq', label: 'FAQ' }}
        next={{ href: '/docs/changelog', label: 'Changelog' }}
      />
    </>
  )
}
