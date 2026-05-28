'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Heart, Youtube, MessageCircle, Crown, HelpCircle, Bug, Lightbulb, Activity } from 'lucide-react'
import { useTranslation } from '@/components/i18n-provider'

export function Footer() {
  const { t } = useTranslation()

  const sections = [
    {
      title: t('footer.platform'),
      links: [
        { label: t('footer.players'), href: '/player' },
        { label: t('footer.servers'), href: '/server' },
        { label: t('footer.news'), href: '/news' },
        { label: t('footer.wiki'), href: '/wiki' },
        { label: 'Community', href: '/community' },
      ],
    },
    {
      title: t('footer.resources'),
      links: [
        { label: t('footer.documentation'), href: '/docs' },
        { label: t('footer.team'), href: '/team' },
        { label: t('footer.about'), href: '/about' },
        { label: t('footer.faq'), href: '/docs/faq' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.terms'), href: '/terms' },
        { label: t('footer.privacy'), href: '/privacy' },
        { label: t('footer.contact'), href: '/docs/contact' },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { label: t('footer.helpCenter'), href: '/docs' },
        { label: t('footer.reportBug'), href: '/docs/contact' },
        { label: t('footer.featureRequest'), href: '/docs/contact' },
        { label: t('footer.status'), href: '/' },
      ],
    },
  ]

  const importantProfiles = [
    {
      name: 'Shodzery',
      role: t('team.founder'),
      description: t('footer.shodzeryDesc'),
      href: '/player/Shodzery',
      color: '#f59e0b',
    },
    {
      name: 'Dexy_Yuu',
      role: t('team.coFounder'),
      description: t('footer.dexyDesc'),
      href: '/player/Dexy_Yuu',
      color: '#7c3aed',
    },
  ]

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#08080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top section with logo and description */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mb-10">
          {/* Logo and description - takes 2 columns */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="YuuTiers Logo"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
                <div 
                  className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] rounded-xl items-center justify-center hidden"
                >
                  <span className="text-white font-bold text-lg">Y</span>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] bg-clip-text text-transparent">
                YuuTiers
              </span>
            </Link>
            <p className="text-[#6a6a86] text-sm mb-5 leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2">
              <a
                href="https://discord.gg/yuutiers"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-[#5a5a76] hover:text-[#5865F2] hover:bg-[rgba(88,101,242,0.1)] transition-all"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/yuutiers"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-[#5a5a76] hover:text-[#1DA1F2] hover:bg-[rgba(29,161,242,0.1)] transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/yuutiers"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-[#5a5a76] hover:text-[#f0f0f8] hover:bg-[rgba(255,255,255,0.06)] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@yuutiers"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-[#5a5a76] hover:text-[#FF0000] hover:bg-[rgba(255,0,0,0.1)] transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation sections - takes 4 columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="text-[#f0f0f8] font-semibold mb-4 text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={`${section.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[#5a5a76] hover:text-[#f0f0f8] text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Important profiles section */}
        <div className="mb-10 pt-8 border-t border-[rgba(255,255,255,0.04)]">
          <h4 className="text-[#f0f0f8] font-semibold mb-4 text-sm flex items-center gap-2">
            <Crown className="w-4 h-4 text-[#f59e0b]" />
            {t('footer.importantProfiles')}
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {importantProfiles.map((profile) => (
              <Link
                key={profile.name}
                href={profile.href}
                className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.04)] transition-all group"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://visage.surgeplay.com/face/96/${profile.name}`}
                    alt={profile.name}
                    className="w-12 h-12 rounded-lg pixelated"
                    data-fb-index="0"
                    onError={(e) => {
                      const img = e.currentTarget
                      const fbs = [
                        `https://minotar.net/avatar/${profile.name}/96.png`,
                        `https://mc-heads.net/avatar/${profile.name}/96`,
                      ]
                      const idx = parseInt(img.dataset.fbIndex || '0', 10)
                      if (idx < fbs.length) {
                        img.dataset.fbIndex = String(idx + 1)
                        img.src = fbs[idx]
                      }
                    }}
                  />
                  <div 
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: profile.color }}
                  >
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[#f0f0f8] font-semibold text-sm group-hover:text-[#3b82f6] transition-colors">
                    {profile.name}
                  </p>
                  <p className="text-xs font-medium" style={{ color: profile.color }}>
                    {profile.role}
                  </p>
                  <p className="text-[#5a5a76] text-xs mt-0.5 truncate">
                    {profile.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-[rgba(255,255,255,0.04)] space-y-5">
          {/* Mojang disclaimer */}
          <div className="rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] px-4 py-3.5 text-center">
            <p className="text-[#6a6a86] text-xs leading-relaxed">
              <span className="text-[#f0f0f8] font-semibold">{t('footer.mojangDisclaimer')}</span>{' '}
              {t('footer.mojangDisclaimerFull')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#5a5a76] text-sm">
              © {new Date().getFullYear()} YuuTiers · {t('footer.copyright')}
            </p>
            <p className="text-[#5a5a76] text-sm flex items-center gap-1.5">
              {t('footer.madeWith')} <Heart className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444]" /> {t('footer.by')}{' '}
              <Link href="/player/Shodzery" className="text-[#f59e0b] font-medium hover:underline">
                Shodzery
              </Link>
              {' & '}
              <Link href="/player/Dexy_Yuu" className="text-[#7c3aed] font-medium hover:underline">
                Dexy_Yuu
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
