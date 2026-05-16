import { Mail, MessageCircle, Github, Twitter } from 'lucide-react'
import { DocsTitle, DocsSection, DocsPager } from '@/components/docs/docs-ui'

export const metadata = { title: 'Contact & support | YuuTiers Docs' }

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@yuutiers.xyz',
    href: 'mailto:hello@yuutiers.xyz',
    color: '#60a5fa',
    desc: 'Best for anything official, including legal.',
  },
  {
    icon: MessageCircle,
    label: 'Discord',
    value: 'discord.gg/yuutiers',
    href: 'https://discord.gg',
    color: '#7c3aed',
    desc: 'Hang out, get help, suggest features.',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/yuutiers',
    href: 'https://github.com',
    color: '#f1f1f7',
    desc: 'Bug reports and pull requests.',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    value: '@YuuTiers',
    href: 'https://twitter.com',
    color: '#22d3ee',
    desc: 'News and short updates.',
  },
]

export default function ContactPage() {
  return (
    <>
      <DocsTitle
        eyebrow="Resources"
        title="Contact & support"
        description="The fastest ways to reach the team behind YuuTiers."
      />

      <DocsSection title="Channels">
        <div className="grid sm:grid-cols-2 gap-3">
          {channels.map((c) => {
            const Icon = c.icon
            return (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-5 hover:border-[rgba(255,255,255,0.18)] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${c.color}14` }}
                >
                  <Icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <p className="text-[#f1f1f7] font-semibold text-sm">{c.label}</p>
                <p className="text-[#cbd5ff] font-mono text-xs mt-0.5">{c.value}</p>
                <p className="text-[#8a8aa3] text-xs mt-2 leading-relaxed">{c.desc}</p>
              </a>
            )
          })}
        </div>
      </DocsSection>

      <DocsSection title="Response time">
        <p>
          Email and GitHub are checked daily. Discord is the fastest channel
          for casual conversation. We&apos;re a two-person team, so please be
          patient — but we read everything.
        </p>
      </DocsSection>

      <DocsPager prev={{ href: '/docs/changelog', label: 'Changelog' }} />
    </>
  )
}
