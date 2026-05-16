'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { DocsTitle, DocsPager } from '@/components/docs/docs-ui'

const faqs = [
  {
    q: 'Is YuuTiers affiliated with Mojang or Microsoft?',
    a: (
      <>
        <strong className="text-[#f1f1f7]">No.</strong> YuuTiers is an
        independent community project. We are not affiliated with, endorsed,
        sponsored or specifically approved by Mojang AB or Microsoft. Minecraft
        and the Minecraft logo are trademarks of Mojang Synergies AB.
      </>
    ),
  },
  {
    q: 'Do you store player data?',
    a: 'No. We only proxy public information from Mojang and partner services. We do not maintain a user database.',
  },
  {
    q: 'Do I need an account to use YuuTiers?',
    a: 'No. Every feature is fully accessible without signing in. There is no account system today.',
  },
  {
    q: 'How often is news updated?',
    a: 'Every 30 to 60 seconds while the page is open, and instantly when you refocus the tab.',
  },
  {
    q: 'How fast is the 3D skin viewer?',
    a: 'The viewer is powered by skinview3d and runs entirely on WebGL in your browser. Skin texture loading is edge-cached, so it usually starts rendering within a few hundred milliseconds.',
  },
  {
    q: 'Can I use the APIs in my own project?',
    a: 'Yes, as long as it’s reasonable use. Please don’t hammer the endpoints — they’re cached, so be kind. See the Rate limits page for details.',
  },
  {
    q: 'Will you ever add ads?',
    a: 'No. YuuTiers is a passion project; we do not plan to monetize it with display ads.',
  },
  {
    q: 'How can I report a bug or request a feature?',
    a: (
      <>
        Head to the{' '}
        <Link href="/docs/contact" className="text-[#60a5fa] hover:underline">
          contact page
        </Link>{' '}
        for all the available channels.
      </>
    ),
  },
  {
    q: 'Who runs YuuTiers?',
    a: (
      <>
        Two people: Annushkaz_Yuu and Dexy_Yuu. Meet them on the{' '}
        <Link href="/team" className="text-[#60a5fa] hover:underline">
          team page
        </Link>
        .
      </>
    ),
  },
]

export default function FaqPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Resources"
        title="Frequently asked questions"
        description="The questions we get the most, answered straight."
      />

      <div className="space-y-3">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4 open:border-[rgba(255,255,255,0.14)] transition-colors"
          >
            <summary className="cursor-pointer text-[#f1f1f7] font-medium text-sm list-none flex items-center justify-between gap-2">
              <span>{item.q}</span>
              <ChevronRight className="w-4 h-4 text-[#5a5a76] group-open:rotate-90 transition-transform shrink-0" />
            </summary>
            <div className="text-[#8a8aa3] text-sm mt-3 leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      <DocsPager
        prev={{ href: '/docs/rate-limits', label: 'Rate limits & caching' }}
        next={{ href: '/docs/privacy', label: 'Privacy & data' }}
      />
    </>
  )
}
