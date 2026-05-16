'use client'

import { motion } from 'framer-motion'
import { Heart, Github, Twitter, MessageCircle, ExternalLink, Sparkles, Crown, Code2, Palette } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SkinViewer3D } from '@/components/player/skin-viewer-3d'

const team = [
  {
    name: 'Annushkaz_Yuu',
    uuid: 'Annushkaz_Yuu', // Username for skin lookup
    role: 'Founder · Owner · Lead Engineer · Designer',
    bio: "I built every line of YuuTiers from scratch — the backend, the APIs, the design system, the 3D skin viewer, the docs, everything. It's my love letter to the Minecraft community and to the person who inspires me every single day. Hours of late nights, gallons of coffee, and a lot of heart went into this.",
    accent: '#3b82f6',
    accentTo: '#60a5fa',
    badge: 'Owner',
    icon: Code2,
    skills: ['Next.js', 'TypeScript', 'Edge APIs', 'System Design', 'UI/UX', 'Caching', '3D Rendering'],
    socials: [
      { label: 'GitHub', icon: Github, href: 'https://github.com' },
      { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    ],
    discord: 'annushkaz_yuu',
  },
  {
    name: 'Dexy_Yuu',
    uuid: 'Dexy_Yuu', // Username for skin lookup
    role: 'Co-Owner · My other half',
    bio: "My beautiful girlfriend and the reason YuuTiers exists at all. She didn't write the code, but she's the muse behind it — the one I show every new feature to, the one who keeps me going on the hard days. She's listed as Co-Owner because none of this would be here without her.",
    accent: '#ec4899',
    accentTo: '#f472b6',
    badge: 'Co-Owner',
    icon: Heart,
    skills: ['Muse', 'Best supporter', 'Pixel critic', 'Idea generator', 'My favorite person'],
    socials: [
      { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    ],
    discord: 'dexy_yuu',
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(236,72,153,0.08)] border border-[rgba(236,72,153,0.18)] mb-6">
              <Heart className="w-3.5 h-3.5 text-[#ec4899] fill-[#ec4899]" />
              <span className="text-xs text-[#ec4899] font-medium">A love letter, in code</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-[#f0f0f8] mb-5 tracking-tight text-balance">
              Built by{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #3b82f6, #ec4899)',
                }}
              >
                a beautiful couple
              </span>
              .
            </h1>
            <p className="text-[#8888aa] text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
              YuuTiers is a passion project, born from love. Every pixel was crafted by{' '}
              <span className="text-[#f0f0f8] font-medium">Annushkaz_Yuu</span> for his
              girlfriend <span className="text-[#f0f0f8] font-medium">Dexy_Yuu</span>, and
              shared with the Minecraft community.
            </p>
          </motion.div>

          {/* Romantic banner (above founder) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative mb-16 rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.06)] aspect-[16/7] sm:aspect-[16/6]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/couple-banner.jpg"
              alt="A cinematic Minecraft scene of a couple watching the sunset together"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#ec4899] fill-[#ec4899]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#ec4899] font-bold">
                  Annushkaz_Yuu &amp; Dexy_Yuu
                </span>
              </div>
              <p className="text-[#f0f0f8] text-xl sm:text-2xl font-semibold max-w-xl leading-snug text-balance">
                Every block, every line, every late night — for you.
              </p>
            </div>
          </motion.div>

          {/* Owners */}
          <div className="space-y-16">
            {team.map((person, i) => {
              const Icon = person.icon
              const reverse = i % 2 === 1
              return (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4 }}
                  className={`grid grid-cols-1 gap-10 items-center ${
                    reverse
                      ? 'lg:grid-cols-[1fr_360px]'
                      : 'lg:grid-cols-[360px_1fr]'
                  }`}
                >
                  <div className={`flex justify-center ${reverse ? 'lg:order-2' : ''}`}>
                    <div className="relative">
                      <div
                        className="absolute -inset-6 rounded-full blur-3xl opacity-30"
                        style={{
                          background: `radial-gradient(circle, ${person.accent}, transparent 70%)`,
                        }}
                      />
                      <div
                        className="relative rounded-3xl p-1.5"
                        style={{
                          background: `linear-gradient(135deg, ${person.accent}, ${person.accentTo})`,
                        }}
                      >
                        <SkinViewer3D
                          skinUrl={`https://mc-heads.net/skin/${person.uuid}`}
                          width={340}
                          height={440}
                          className="rounded-2xl"
                        />
                      </div>
                      <div
                        className="absolute top-5 right-5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${person.accent}, ${person.accentTo})`,
                          color: 'white',
                        }}
                      >
                        <Crown className="w-3 h-3" />
                        {person.badge}
                      </div>
                    </div>
                  </div>

                  <div className={reverse ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${person.accent}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: person.accent }} />
                      </div>
                      <span className="text-[#8888aa] text-sm">{person.role}</span>
                    </div>

                    <h2
                      className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight"
                      style={{
                        background: `linear-gradient(135deg, ${person.accent}, ${person.accentTo})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {person.name}
                    </h2>

                    <p className="text-[#8888aa] text-base leading-relaxed mb-6 max-w-xl text-pretty">
                      {person.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {person.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[#8888aa] text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/player/${person.name}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, ${person.accent}, ${person.accentTo})`,
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        View profile
                      </Link>
                      {person.socials.map((s) => {
                        const SIcon = s.icon
                        return (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#8888aa] hover:text-[#f0f0f8] hover:border-[rgba(255,255,255,0.14)] transition-all text-sm"
                          >
                            <SIcon className="w-3.5 h-3.5" />
                            {s.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )
                      })}
                      <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(88,101,242,0.1)] border border-[rgba(88,101,242,0.2)] text-[#5865f2] text-sm">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {person.discord}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Closing love note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <Heart className="w-4 h-4 text-[#ec4899] fill-[#ec4899]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#ec4899] font-bold">
                From the developer
              </span>
              <Heart className="w-4 h-4 text-[#ec4899] fill-[#ec4899]" />
            </div>
            <p className="text-[#c5c5d6] text-lg leading-relaxed mb-8 italic text-pretty">
              &ldquo;I built this entire site alone, but I&apos;m not the only one
              who deserves a name on it. Dexy is the reason this exists, so she gets to
              be Co-Owner forever — even if all she did was steal the keyboard sometimes.&rdquo;
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f0f8] hover:border-[rgba(255,255,255,0.14)] transition-all"
            >
              Read the docs
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
