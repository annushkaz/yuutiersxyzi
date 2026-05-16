'use client'

import { motion } from 'framer-motion'
import {
  MessageCircle,
  Users,
  Shield,
  Sparkles,
  Calendar,
  Heart,
  Megaphone,
  HelpCircle,
  Trophy,
  Hash,
  Bell,
  ArrowRight,
  ExternalLink,
  Twitter,
  Youtube,
  Github,
  Zap,
  Star,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const DISCORD_INVITE = 'https://discord.gg/yuutiers'

const features = [
  {
    icon: Users,
    title: 'Active Community',
    description: 'Thousands of Minecraft players from around the world ready to chat, share, and play together.',
    color: '#3b82f6',
  },
  {
    icon: HelpCircle,
    title: 'Support & Help',
    description: 'Get answers to your questions about YuuTiers, Minecraft, and our APIs. Our team is always around.',
    color: '#22c55e',
  },
  {
    icon: Megaphone,
    title: 'News & Announcements',
    description: 'Be the first to know about new features, updates, partnerships, and special events.',
    color: '#f59e0b',
  },
  {
    icon: Trophy,
    title: 'Events & Giveaways',
    description: 'Participate in weekly events, build contests, tournaments, and exclusive Discord-only giveaways.',
    color: '#ec4899',
  },
  {
    icon: Bell,
    title: 'Early Access',
    description: 'Test new features before anyone else and help shape the future of YuuTiers.',
    color: '#a78bfa',
  },
  {
    icon: Shield,
    title: 'Safe & Friendly',
    description: 'Strict moderation and a friendly community where everyone is welcome and respected.',
    color: '#06b6d4',
  },
]

const channels = [
  { name: 'welcome', desc: 'Read the rules and introduce yourself' },
  { name: 'announcements', desc: 'Latest YuuTiers news and updates' },
  { name: 'general', desc: 'Chat with other Minecraft players' },
  { name: 'support', desc: 'Get help with the site or API' },
  { name: 'feedback', desc: 'Share your ideas and suggestions' },
  { name: 'showcase', desc: 'Show off your skins, builds, and screenshots' },
  { name: 'looking-for-group', desc: 'Find people to play with' },
  { name: 'memes', desc: 'Share funny Minecraft content' },
]



const rules = [
  'Be respectful to everyone, regardless of background.',
  'No hate speech, harassment, or discrimination.',
  'No spam, advertising, or self-promotion without permission.',
  'Keep conversations in the appropriate channels.',
  'No NSFW or inappropriate content.',
  'Listen to moderators and follow Discord ToS.',
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 0%, rgba(88,101,242,0.25) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(59,130,246,0.15) 0%, transparent 50%)',
              }}
            />
            <div className="absolute inset-0 laby-dots opacity-40" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] text-sm font-medium mb-6">
                <MessageCircle className="w-4 h-4" />
                <span>Join the conversation</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f1f1f7] mb-6 text-balance">
                Join our{' '}
                <span className="bg-gradient-to-r from-[#5865F2] via-[#7289DA] to-[#3b82f6] bg-clip-text text-transparent">
                  Discord
                </span>{' '}
                community
              </h1>

              <p className="text-lg sm:text-xl text-[#8a8aa3] max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
                Connect with thousands of Minecraft players, get exclusive access to features,
                events, and be part of the YuuTiers family.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#5865F2] text-white font-semibold hover:bg-[#4752C4] transition-all shadow-[0_8px_32px_-8px_rgba(88,101,242,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(88,101,242,0.8)] hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Discord
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f1f1f7] font-semibold hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)] transition-all"
                >
                  <Heart className="w-4 h-4" />
                  Meet the team
                </Link>
              </div>


            </motion.div>
          </div>
        </section>

        {/* What you'll find */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f1f7] mb-4">
                What you&apos;ll find inside
              </h2>
              <p className="text-[#8a8aa3] max-w-2xl mx-auto">
                More than just a Discord server — it&apos;s a home for Minecraft enthusiasts.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-6 hover:border-[rgba(255,255,255,0.12)] transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{
                        background: `${feature.color}15`,
                        border: `1px solid ${feature.color}30`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-[#f1f1f7] mb-2">{feature.title}</h3>
                    <p className="text-[#8a8aa3] text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="py-20 bg-[#08080c]/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] text-xs font-medium mb-4">
                  <Hash className="w-3 h-3" />
                  CHANNELS
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f1f7] mb-4 text-balance">
                  Channels for every interest
                </h2>
                <p className="text-[#8a8aa3] leading-relaxed mb-6">
                  Whether you want to chat, get help, show off your latest build, or find people
                  to play with, we have a dedicated channel for it.
                </p>
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#5865F2] font-medium hover:gap-3 transition-all"
                >
                  Explore all channels
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {channels.map((ch) => (
                  <div
                    key={ch.name}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] transition-all"
                  >
                    <Hash className="w-4 h-4 text-[#5a5a76] mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[#f1f1f7] font-medium text-sm font-mono">{ch.name}</p>
                      <p className="text-[#8a8aa3] text-xs">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-medium mb-4">
                <Shield className="w-3 h-3" />
                RULES
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f1f7] mb-4">
                A welcoming space for everyone
              </h2>
              <p className="text-[#8a8aa3] max-w-2xl mx-auto">
                Our community thrives because we care about each other. Please follow these simple rules.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {rules.map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#22c55e]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                  </div>
                  <p className="text-[#f1f1f7] text-sm leading-relaxed">{rule}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-20 bg-[#08080c]/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f1f7] mb-4">
                Follow us everywhere
              </h2>
              <p className="text-[#8a8aa3]">Stay updated across all our social channels.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <SocialCard
                icon={MessageCircle}
                label="Discord"
                handle="yuutiers"
                href={DISCORD_INVITE}
                color="#5865F2"
              />
              <SocialCard
                icon={Twitter}
                label="Twitter"
                handle="@yuutiers"
                href="https://twitter.com/yuutiers"
                color="#1DA1F2"
              />
              <SocialCard
                icon={Youtube}
                label="YouTube"
                handle="@yuutiers"
                href="https://youtube.com/@yuutiers"
                color="#FF0000"
              />
              <SocialCard
                icon={Github}
                label="GitHub"
                handle="yuutiers"
                href="https://github.com/yuutiers"
                color="#f1f1f7"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-gradient-to-br from-[#5865F2]/15 via-[#3b82f6]/10 to-transparent border border-[#5865F2]/20 p-10 sm:p-14 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    'radial-gradient(circle at 20% 20%, rgba(88,101,242,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.2) 0%, transparent 50%)',
                }}
              />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-[#5865F2]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#f1f1f7] mb-4 text-balance">
                  Ready to join us?
                </h2>
                <p className="text-[#8a8aa3] mb-8 max-w-md mx-auto">
                  Click the button below and become part of something special. We can&apos;t wait
                  to meet you!
                </p>
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5865F2] text-white font-bold text-lg hover:bg-[#4752C4] transition-all shadow-[0_8px_32px_-8px_rgba(88,101,242,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(88,101,242,0.8)] hover:-translate-y-1"
                >
                  <MessageCircle className="w-6 h-6" />
                  Join Discord Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function SocialCard({
  icon: Icon,
  label,
  handle,
  href,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  handle: string
  href: string
  color: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-4 rounded-xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-[#f1f1f7] font-semibold text-sm">{label}</p>
        <p className="text-[#5a5a76] text-xs truncate">{handle}</p>
      </div>
    </a>
  )
}
