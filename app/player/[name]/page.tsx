'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  Share2,
  Crown,
  ExternalLink,
  AlertCircle,
  Hash,
  Calendar,
  Shirt,
  Palette,
  History,
  Star,
  Sparkles,
  ShieldCheck,
  Copy,
  Globe,
  Eye,
  Trophy,
  Clock,
  TrendingUp,
  Gamepad2,
  Sword,
  Target,
  Skull,
  Bed,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SkinViewer3D } from '@/components/player/skin-viewer-3d'
import { CopyButton } from '@/components/shared/copy-button'
import { useTranslation } from '@/components/i18n-provider'

interface PlayerApiResponse {
  uuid: string
  uuidRaw: string
  name: string
  skin: { url: string; variant: 'classic' | 'slim' }
  cape: { url: string } | null
  textureValue: string | null
  nameHistory: { name: string; changedToAt?: number }[]
  renders: { avatar: string; head: string; body: string }
}

type TabId = 'overview' | 'skin' | 'cape' | 'names' | 'hypixel'

async function fetchPlayer(name: string): Promise<PlayerApiResponse> {
  const res = await fetch(`/api/player/${encodeURIComponent(name)}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error('not_found')
    throw new Error('server_error')
  }
  return res.json()
}

function PlayerSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="relative h-72 shimmer" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative">
          <div className="grid lg:grid-cols-[1fr,360px] gap-6">
            <div className="h-[640px] rounded-2xl shimmer" />
            <div className="space-y-4">
              <div className="h-48 rounded-2xl shimmer" />
              <div className="h-48 rounded-2xl shimmer" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function PlayerNotFound({ name }: { name: string }) {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-[#ef4444]" />
            </div>
            <h1 className="text-3xl font-bold text-[#f1f1f7] mb-3">{t('player.notFound.title')}</h1>
            <p className="text-[#8a8aa3] mb-8">
              {t('player.notFound.description')}{' '}
              <span className="text-[#f1f1f7] font-medium">{name}</span>.
            </p>
            <Link
              href="/player"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3b82f6] text-white font-medium hover:bg-[#2563eb] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('player.notFound.tryAnother')}
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function PlayerPage() {
  const params = useParams()
  const rawName = (params.name as string) || ''
  const name = decodeURIComponent(rawName)
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const { t } = useTranslation()

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: t('player.tabs.overview'), icon: Eye },
    { id: 'skin', label: t('player.tabs.skin'), icon: Palette },
    { id: 'cape', label: t('player.tabs.cape'), icon: Shirt },
    { id: 'names', label: t('player.tabs.nameHistory'), icon: History },
    { id: 'hypixel', label: 'Hypixel', icon: Gamepad2 },
  ]

  const { data: player, isLoading, error } = useQuery<PlayerApiResponse>({
    queryKey: ['player', name],
    queryFn: () => fetchPlayer(name),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  if (isLoading) return <PlayerSkeleton />
  if (error || !player) return <PlayerNotFound name={name} />

  const isOwner = player.name === 'Annushkaz_Yuu' || player.name === 'Dexy_Yuu'
  const ownerLabel =
    player.name === 'Annushkaz_Yuu' ? t('player.profile.founderOwner') : t('player.profile.coFounder')

  const downloadSkin = async () => {
    try {
      const url = `/api/skin/${player.uuidRaw}`
      const res = await fetch(url)
      const blob = await res.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${player.name}_skin.png`
      link.click()
      URL.revokeObjectURL(link.href)
    } catch (e) {
      console.error('Download failed', e)
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Minecraft-themed subtle background pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h32v32H0V0zm32 32h32v32H32V32z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />
      {/* Minecraft grass/dirt pattern at top */}
      <div 
        className="fixed top-0 left-0 right-0 h-2 pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(to right, #5D8C3D, #4A7A2E, #5D8C3D, #4A7A2E, #5D8C3D)',
          backgroundSize: '32px 100%',
        }}
        aria-hidden
      />
      
      <Navbar />

      {/* Banner */}
      <div className="relative pt-20">
        <div className="relative h-72 sm:h-80 overflow-hidden">
          {/* Skin-based blurred background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${player.renders.body})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(80px) saturate(180%) brightness(0.55)',
              transform: 'scale(1.4)',
              opacity: 0.75,
            }}
            aria-hidden
          />
          {/* Minecraft block pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' fill='none'/%3E%3Crect x='0' y='0' width='8' height='8' fill='%23ffffff' fill-opacity='0.3'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '16px 16px',
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background" />
          <div className="absolute inset-0 laby-dots opacity-50" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_70%)]" />
        </div>

        <div className="absolute inset-x-0 top-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/player"
            className="inline-flex items-center gap-2 text-[#8a8aa3] hover:text-[#f1f1f7] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('player.profile.backToSearch')}
          </Link>
        </div>
      </div>

      <main className="relative -mt-32 sm:-mt-36 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile header card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl bg-[#0e0e15]/95 backdrop-blur-xl border border-[rgba(255,255,255,0.07)] p-6 sm:p-8 mb-6 overflow-hidden"
          >
            {isOwner && (
              <div
                className="absolute inset-0 opacity-60 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at top right, rgba(59,130,246,0.18), transparent 60%), radial-gradient(ellipse at bottom left, rgba(124,58,237,0.16), transparent 60%)',
                }}
                aria-hidden
              />
            )}

            <div className="relative flex flex-col sm:flex-row sm:items-end gap-6">
              {/* 2D Avatar for all players including owners */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="relative shrink-0"
              >
                <div
                  className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ${
                    isOwner 
                      ? 'ring-2 ring-[#3b82f6]/50 shadow-[0_0_40px_-8px_rgba(59,130,246,0.5)]' 
                      : 'ring-1 ring-inset ring-white/10'
                  }`}
                  style={{ background: '#15151f' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={player.renders.avatar}
                    alt={player.name}
                    className="w-full h-full object-cover pixelated"
                    data-fb-index="0"
                    onError={(e) => {
                      const img = e.currentTarget
                      const fbs = [
                        `https://visage.surgeplay.com/face/256/${player.uuidRaw}`,
                        `https://minotar.net/avatar/${encodeURIComponent(player.name)}/256.png`,
                        `https://mc-heads.net/avatar/${encodeURIComponent(player.name)}/256`,
                      ]
                      const idx = parseInt(img.dataset.fbIndex || '0', 10)
                      if (idx < fbs.length) {
                        img.dataset.fbIndex = String(idx + 1)
                        img.src = fbs[idx]
                      }
                    }}
                  />
                </div>
                {isOwner && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] ring-4 ring-[#0e0e15] flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>

              {/* Name + chips */}
              <div className="flex-1 min-w-0">
                {isOwner && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-[#3b82f6]/15 to-[#7c3aed]/15 border border-[#3b82f6]/25 text-xs font-semibold">
                      <Crown className="w-3 h-3 text-[#f59e0b]" />
                      <span className="text-gradient-blue">{ownerLabel}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-[10px] font-semibold uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      {t('player.profile.verified')}
                    </span>
                  </div>
                )}
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
                    isOwner ? 'text-gradient' : 'text-[#f1f1f7]'
                  }`}
                >
                  {player.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#8a8aa3]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t('player.profile.javaPlayer')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" />
                    {t('player.profile.skinModel')}: <span className="text-[#f1f1f7] capitalize">{player.skin.variant}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5" />
                    {t('player.profile.cape')}: <span className="text-[#f1f1f7]">{player.cape ? t('player.profile.owned') : t('player.profile.none')}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 sm:flex-col">
                <button
                  onClick={downloadSkin}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold hover:bg-[#2563eb] transition-colors shadow-[0_4px_24px_-4px_rgba(59,130,246,0.5)]"
                >
                  <Download className="w-4 h-4" />
                  {t('player.profile.downloadSkin')}
                </button>
                <button
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.share) {
                      navigator
                        .share({
                          title: `${player.name} | YuuTiers`,
                          url: window.location.href,
                        })
                        .catch(() => {})
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#8a8aa3] hover:text-[#f1f1f7] hover:border-[rgba(255,255,255,0.16)] text-sm font-medium transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  {t('common.share')}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="relative mt-8 -mx-6 sm:-mx-8 px-6 sm:px-8 border-t border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-1 overflow-x-auto pt-3 scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const active = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        active
                          ? 'text-[#f1f1f7]'
                          : 'text-[#8a8aa3] hover:text-[#f1f1f7]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      {active && (
                        <motion.span
                          layoutId="player-tab"
                          className="absolute left-3 right-3 -bottom-px h-0.5 bg-[#3b82f6] rounded-full"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Tab content */}
          <div className="grid lg:grid-cols-[1fr,360px] gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                {activeTab === 'overview' && <OverviewTab player={player} />}
                {activeTab === 'skin' && <SkinTab player={player} />}
                {activeTab === 'cape' && <CapeTab player={player} />}
                {activeTab === 'names' && <NamesTab player={player} />}
                {activeTab === 'hypixel' && <HypixelTab player={player} />}
              </motion.div>
            </AnimatePresence>

            {/* Sidebar */}
            <aside className="space-y-4">
              <Sidebar player={player} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Card({
  title,
  icon: Icon,
  children,
  action,
}: {
  title: string
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[#60a5fa]" />}
          <h3 className="text-sm font-semibold text-[#f1f1f7] tracking-tight">{title}</h3>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function OverviewTab({ player }: { player: PlayerApiResponse }) {
  const { t } = useTranslation()
  const isOwner = player.name === 'Annushkaz_Yuu' || player.name === 'Dexy_Yuu'
  
  return (
    <div className="space-y-5">
      {/* 3D Viewer */}
      <Card title={t('player.overview.skinViewer')} icon={Palette} action={<span className="text-[10px] text-[#5a5a76] uppercase tracking-wider">{t('player.overview.dragToRotate')}</span>}>
        <div className="flex justify-center bg-[#07070b] rounded-xl border border-[rgba(255,255,255,0.04)] py-4">
          <SkinViewer3D
            skinUrl={`https://mc-heads.net/skin/${player.uuidRaw}`}
            capeUrl={player.cape?.url}
            width={320}
            height={420}
            variant={player.skin.variant}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <RenderPreview
            label={t('player.overview.avatar')}
            src={player.renders.avatar}
            fallbacks={[
              `https://visage.surgeplay.com/face/256/${player.uuidRaw}`,
              `https://minotar.net/avatar/${encodeURIComponent(player.name)}/256.png`,
              `https://mc-heads.net/avatar/${encodeURIComponent(player.name)}/256`,
            ]}
          />
          <RenderPreview
            label={t('player.overview.head')}
            src={player.renders.head}
            fallbacks={[
              `https://visage.surgeplay.com/head/256/${player.uuidRaw}`,
              `https://minotar.net/cube/${encodeURIComponent(player.name)}/256.png`,
              `https://mc-heads.net/head/${encodeURIComponent(player.name)}/256`,
            ]}
          />
          <RenderPreview
            label={t('player.overview.body')}
            src={player.renders.body}
            fallbacks={[
              `https://visage.surgeplay.com/full/512/${player.uuidRaw}`,
              `https://minotar.net/armor/body/${encodeURIComponent(player.name)}/256.png`,
              `https://mc-heads.net/body/${encodeURIComponent(player.name)}/256`,
            ]}
          />
        </div>
      </Card>

      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-3">
        <StatCard icon={Star} label={t('player.overview.status')} value={t('player.overview.active')} color="#22c55e" pulse />
        <StatCard icon={Calendar} label={t('player.overview.firstSeen')} value={t('player.overview.mojangEra')} color="#60a5fa" />
        <StatCard icon={History} label={t('player.overview.nameChanges')} value={String(Math.max(0, player.nameHistory.length - 1))} color="#a78bfa" />
      </div>

      {/* Player achievements for owners */}
      {isOwner && (
        <Card title="Achievements" icon={Trophy}>
          <div className="grid sm:grid-cols-2 gap-2">
            <AchievementCard icon={Crown} title="Site Founder" desc="Creator of YuuTiers.xyz" color="#f59e0b" />
            <AchievementCard icon={ShieldCheck} title="Verified" desc="Officially verified account" color="#22c55e" />
            <AchievementCard icon={TrendingUp} title="Top Contributor" desc="Most active contributor" color="#3b82f6" />
            <AchievementCard icon={Clock} title="Early Adopter" desc="Day one player" color="#a78bfa" />
          </div>
        </Card>
      )}

      {/* External profiles */}
      <Card title={t('player.overview.externalProfiles')} icon={Globe}>
        <div className="grid sm:grid-cols-2 gap-2">
          <ExternalLinkCard label="NameMC" href={`https://namemc.com/profile/${player.name}`} desc="Skin history" />
          <ExternalLinkCard label="LABY.net" href={`https://laby.net/@${player.name}`} desc="LabyMod profile" />
          <ExternalLinkCard label="Hypixel" href={`https://plancke.io/hypixel/player/stats/${player.name}`} desc="Hypixel stats" />
          <ExternalLinkCard label="Crafty.gg" href={`https://crafty.gg/players/${player.uuidRaw}`} desc="Server history" />
          <ExternalLinkCard label="Minecraft-Server" href={`https://minecraft-statistic.net/en/player/${player.name}.html`} desc="Global stats" />
          <ExternalLinkCard label="MCProHosting" href={`https://mcprohosting.com/players/${player.name}`} desc="Player lookup" />
        </div>
      </Card>
    </div>
  )
}

function AchievementCard({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  title: string
  desc: string
  color: string
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all"
      style={{
        background: `${color}08`,
        borderColor: `${color}20`,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: `${color}15` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-[#f1f1f7] font-semibold text-sm">{title}</p>
        <p className="text-[#5a5a76] text-xs">{desc}</p>
      </div>
    </div>
  )
}

function SkinTab({ player }: { player: PlayerApiResponse }) {
  const { t } = useTranslation()
  return (
    <div className="space-y-5">
      <Card title={t('player.tabs.skin')} icon={Palette}>
        <div className="grid sm:grid-cols-[300px,1fr] gap-6 items-center">
          <div className="flex justify-center bg-[#07070b] rounded-xl border border-[rgba(255,255,255,0.04)] py-4">
            <SkinViewer3D
              skinUrl={`https://mc-heads.net/skin/${player.uuidRaw}`}
              capeUrl={player.cape?.url}
              width={260}
              height={360}
              variant={player.skin.variant}
            />
          </div>
          <div className="space-y-3">
            <KV label={t('player.account.model')} value={player.skin.variant} />
            <KV label="Texture URL" value={player.skin.url} mono truncate />
            <KV label={t('player.profile.cape')} value={player.cape ? t('player.profile.owned') : t('player.profile.none')} />
            <div className="pt-2 flex gap-2">
              <a
                href={`/api/skin/${player.uuidRaw}`}
                download
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold hover:bg-[#2563eb] transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </a>
            </div>
          </div>
        </div>
      </Card>

      <Card title={t('player.skinHistory.title')} icon={History}>
        <EmptyHint
          icon={Palette}
          title={t('player.skinHistory.comingSoon')}
          desc={t('player.skinHistory.comingSoonDesc')}
        />
      </Card>
    </div>
  )
}

function CapeTab({ player }: { player: PlayerApiResponse }) {
  const { t } = useTranslation()
  return (
    <Card title={t('player.tabs.cape')} icon={Shirt}>
      {player.cape ? (
        <div className="grid sm:grid-cols-[200px,1fr] gap-6 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={player.cape.url}
            alt="Cape"
            className="w-full rounded-xl pixelated bg-[#07070b] border border-[rgba(255,255,255,0.05)]"
          />
          <div className="space-y-3">
            <KV label={t('player.profile.cape')} value={t('player.profile.owned')} />
            <KV label="Texture" value={player.cape.url} mono truncate />
            <a
              href={player.cape.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold hover:bg-[#2563eb] transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('common.download')} cape
            </a>
          </div>
        </div>
      ) : (
        <EmptyHint
          icon={Shirt}
          title={t('player.profile.none')}
          desc={`${player.name} ${t('player.profile.none').toLowerCase()}`}
        />
      )}
    </Card>
  )
}

function NamesTab({ player }: { player: PlayerApiResponse }) {
  const { t } = useTranslation()
  const history = player.nameHistory.length
    ? player.nameHistory
    : [{ name: player.name }]

  return (
    <Card title={t('player.nameHistory.title')} icon={History}>
      <div className="space-y-2">
        {history.map((entry, i) => {
          const isCurrent = i === 0
          return (
            <div
              key={`${entry.name}-${i}`}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border ${
                isCurrent
                  ? 'bg-[#3b82f6]/8 border-[#3b82f6]/25'
                  : 'bg-[rgba(255,255,255,0.025)] border-[rgba(255,255,255,0.05)]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs text-[#5a5a76] w-6 text-right font-mono">
                  #{history.length - i}
                </span>
                <span
                  className={`font-mono text-sm truncate ${
                    isCurrent ? 'text-[#60a5fa] font-semibold' : 'text-[#f1f1f7]'
                  }`}
                >
                  {entry.name}
                </span>
                {isCurrent && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#22c55e]/15 text-[#22c55e] uppercase tracking-wider">
                    {t('player.nameHistory.current')}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#5a5a76] shrink-0">
                {entry.changedToAt
                  ? new Date(entry.changedToAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : t('player.nameHistory.original')}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}



interface HypixelStats {
  success: boolean
  error?: string
  message?: string
  planckeUrl?: string
  data?: {
    displayname: string
    uuid: string
    rank: string
    level: number
    karma: number
    achievementPoints: number
    firstLogin?: number
    lastLogin?: number
    lastLogout?: number
    online: boolean
    stats: {
      bedwars?: {
        level: number
        wins: number
        losses: number
        kills: number
        deaths: number
        finalKills: number
        finalDeaths: number
        bedsBroken: number
        bedsLost: number
        gamesPlayed: number
        winstreak: number
        coins: number
        kdr: string
        fkdr: string
        wlr: string
      }
      skywars?: {
        wins: number
        losses: number
        kills: number
        deaths: number
        souls: number
        coins: number
        gamesPlayed: number
        kdr: string
      }
      duels?: {
        wins: number
        losses: number
        kills: number
        deaths: number
        coins: number
        gamesPlayed: number
        kdr: string
      }
      murderMystery?: {
        wins: number
        kills: number
        deaths: number
        coins: number
        gamesPlayed: number
      }
      buildBattle?: {
        wins: number
        coins: number
        gamesPlayed: number
        score: number
      }
    }
  }
}

function HypixelTab({ player }: { player: PlayerApiResponse }) {
  const { locale } = useTranslation()
  const { data: hypixelData, isLoading, error } = useQuery<HypixelStats>({
    queryKey: ['hypixel', player.uuidRaw],
    queryFn: async () => {
      const res = await fetch(`/api/hypixel/${player.uuidRaw}`)
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <Card title="Hypixel Stats" icon={Gamepad2}>
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
        </div>
      </Card>
    )
  }

  if (error || !hypixelData) {
    return (
      <Card title="Hypixel Stats" icon={Gamepad2}>
        <EmptyHint
          icon={AlertCircle}
          title={locale === 'es' ? 'Error al cargar' : 'Failed to load'}
          desc={locale === 'es' ? 'No se pudieron cargar las estadísticas de Hypixel.' : 'Could not load Hypixel statistics.'}
        />
      </Card>
    )
  }

  // If no API key or player not found, show link to plancke.io
  if (!hypixelData.success || !hypixelData.data) {
    return (
      <Card title="Hypixel Stats" icon={Gamepad2}>
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
            <Gamepad2 className="w-8 h-8 text-[#f59e0b]" />
          </div>
          <h4 className="text-lg font-semibold text-[#f1f1f7] mb-2">
            {hypixelData.error === 'PLAYER_NOT_FOUND' 
              ? (locale === 'es' ? 'Jugador no encontrado' : 'Player not found')
              : (locale === 'es' ? 'Ver estadísticas de Hypixel' : 'View Hypixel Stats')}
          </h4>
          <p className="text-sm text-[#8a8aa3] mb-6 max-w-sm mx-auto">
            {hypixelData.error === 'PLAYER_NOT_FOUND'
              ? (locale === 'es' 
                  ? 'Este jugador nunca ha jugado en Hypixel.' 
                  : 'This player has never played on Hypixel.')
              : (locale === 'es' 
                  ? 'Haz clic en el botón para ver las estadísticas completas en Plancke.io' 
                  : 'Click the button to view full statistics on Plancke.io')}
          </p>
          {hypixelData.planckeUrl && (
            <a
              href={hypixelData.planckeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f59e0b] text-black font-semibold hover:bg-[#fbbf24] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {locale === 'es' ? 'Ver en Plancke.io' : 'View on Plancke.io'}
            </a>
          )}
        </div>
      </Card>
    )
  }

  const { data } = hypixelData

  return (
    <div className="space-y-5">
      {/* General Stats */}
      <Card title="Hypixel Profile" icon={Gamepad2}>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#07070b] border border-[rgba(255,255,255,0.04)]">
            <div className="w-16 h-16 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={player.renders.avatar}
                alt={player.name}
                className="w-full h-full object-cover pixelated"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  data.rank === 'MVP++' ? 'bg-[#ffaa00]/20 text-[#ffaa00]' :
                  data.rank === 'MVP+' ? 'bg-[#55ffff]/20 text-[#55ffff]' :
                  data.rank === 'MVP' ? 'bg-[#55ffff]/20 text-[#55ffff]' :
                  data.rank === 'VIP+' ? 'bg-[#55ff55]/20 text-[#55ff55]' :
                  data.rank === 'VIP' ? 'bg-[#55ff55]/20 text-[#55ff55]' :
                  data.rank === 'YOUTUBE' ? 'bg-[#ff5555]/20 text-[#ff5555]' :
                  'bg-[#aaaaaa]/20 text-[#aaaaaa]'
                }`}>
                  {data.rank}
                </span>
                {data.online && (
                  <span className="text-xs text-[#22c55e] flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                    Online
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-[#f1f1f7]">{data.displayname}</p>
              <p className="text-sm text-[#8a8aa3]">
                {locale === 'es' ? 'Nivel de red' : 'Network Level'}: <span className="text-[#f59e0b] font-semibold">{data.level}</span>
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <HypixelStatBox 
              label={locale === 'es' ? 'Nivel' : 'Level'} 
              value={data.level.toString()} 
              icon={<TrendingUp className="w-4 h-4" />}
              color="#f59e0b" 
            />
            <HypixelStatBox 
              label="Karma" 
              value={data.karma.toLocaleString()} 
              icon={<Star className="w-4 h-4" />}
              color="#ec4899" 
            />
            <HypixelStatBox 
              label={locale === 'es' ? 'Logros' : 'Achievement Points'} 
              value={data.achievementPoints.toLocaleString()} 
              icon={<Trophy className="w-4 h-4" />}
              color="#8b5cf6" 
            />
          </div>

          {data.firstLogin && (
            <div className="grid sm:grid-cols-2 gap-3">
              <HypixelStatBox 
                label={locale === 'es' ? 'Primera conexión' : 'First Login'} 
                value={new Date(data.firstLogin).toLocaleDateString()} 
                icon={<Calendar className="w-4 h-4" />}
                color="#3b82f6" 
              />
              {data.lastLogin && (
                <HypixelStatBox 
                  label={locale === 'es' ? 'Última conexión' : 'Last Login'} 
                  value={new Date(data.lastLogin).toLocaleDateString()} 
                  icon={<Clock className="w-4 h-4" />}
                  color="#22c55e" 
                />
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Bedwars Stats */}
      {data.stats.bedwars && (
        <Card title="Bed Wars" icon={Bed}>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-4 gap-3">
              <HypixelStatBox 
                label={locale === 'es' ? 'Nivel' : 'Level'} 
                value={`★ ${data.stats.bedwars.level}`} 
                icon={<Star className="w-4 h-4" />}
                color="#f59e0b" 
              />
              <HypixelStatBox 
                label={locale === 'es' ? 'Victorias' : 'Wins'} 
                value={data.stats.bedwars.wins.toLocaleString()} 
                icon={<Trophy className="w-4 h-4" />}
                color="#22c55e" 
              />
              <HypixelStatBox 
                label="FKDR" 
                value={data.stats.bedwars.fkdr} 
                icon={<Target className="w-4 h-4" />}
                color="#ef4444" 
              />
              <HypixelStatBox 
                label="WLR" 
                value={data.stats.bedwars.wlr} 
                icon={<TrendingUp className="w-4 h-4" />}
                color="#3b82f6" 
              />
            </div>
            <div className="grid sm:grid-cols-4 gap-3">
              <HypixelStatBox 
                label={locale === 'es' ? 'Kills finales' : 'Final Kills'} 
                value={data.stats.bedwars.finalKills.toLocaleString()} 
                icon={<Sword className="w-4 h-4" />}
                color="#ef4444" 
              />
              <HypixelStatBox 
                label={locale === 'es' ? 'Camas rotas' : 'Beds Broken'} 
                value={data.stats.bedwars.bedsBroken.toLocaleString()} 
                icon={<Bed className="w-4 h-4" />}
                color="#a78bfa" 
              />
              <HypixelStatBox 
                label={locale === 'es' ? 'Racha' : 'Winstreak'} 
                value={data.stats.bedwars.winstreak.toLocaleString()} 
                icon={<TrendingUp className="w-4 h-4" />}
                color="#f59e0b" 
              />
              <HypixelStatBox 
                label={locale === 'es' ? 'Partidas' : 'Games'} 
                value={data.stats.bedwars.gamesPlayed.toLocaleString()} 
                icon={<Gamepad2 className="w-4 h-4" />}
                color="#8a8aa3" 
              />
            </div>
          </div>
        </Card>
      )}

      {/* SkyWars Stats */}
      {data.stats.skywars && (
        <Card title="SkyWars" icon={Sword}>
          <div className="grid sm:grid-cols-4 gap-3">
            <HypixelStatBox 
              label={locale === 'es' ? 'Victorias' : 'Wins'} 
              value={data.stats.skywars.wins.toLocaleString()} 
              icon={<Trophy className="w-4 h-4" />}
              color="#22c55e" 
            />
            <HypixelStatBox 
              label="Kills" 
              value={data.stats.skywars.kills.toLocaleString()} 
              icon={<Sword className="w-4 h-4" />}
              color="#ef4444" 
            />
            <HypixelStatBox 
              label="KDR" 
              value={data.stats.skywars.kdr} 
              icon={<Target className="w-4 h-4" />}
              color="#f59e0b" 
            />
            <HypixelStatBox 
              label={locale === 'es' ? 'Almas' : 'Souls'} 
              value={data.stats.skywars.souls.toLocaleString()} 
              icon={<Skull className="w-4 h-4" />}
              color="#8b5cf6" 
            />
          </div>
        </Card>
      )}

      {/* Duels Stats */}
      {data.stats.duels && (
        <Card title="Duels" icon={Target}>
          <div className="grid sm:grid-cols-4 gap-3">
            <HypixelStatBox 
              label={locale === 'es' ? 'Victorias' : 'Wins'} 
              value={data.stats.duels.wins.toLocaleString()} 
              icon={<Trophy className="w-4 h-4" />}
              color="#22c55e" 
            />
            <HypixelStatBox 
              label="Kills" 
              value={data.stats.duels.kills.toLocaleString()} 
              icon={<Sword className="w-4 h-4" />}
              color="#ef4444" 
            />
            <HypixelStatBox 
              label="KDR" 
              value={data.stats.duels.kdr} 
              icon={<Target className="w-4 h-4" />}
              color="#f59e0b" 
            />
            <HypixelStatBox 
              label={locale === 'es' ? 'Partidas' : 'Games'} 
              value={data.stats.duels.gamesPlayed.toLocaleString()} 
              icon={<Gamepad2 className="w-4 h-4" />}
              color="#8a8aa3" 
            />
          </div>
        </Card>
      )}

      {/* View on Plancke.io */}
      {hypixelData.planckeUrl && (
        <div className="p-4 rounded-xl bg-[#f59e0b]/5 border border-[#f59e0b]/20 flex items-center justify-between">
          <p className="text-sm text-[#8a8aa3]">
            {locale === 'es' 
              ? 'Ver estadísticas completas y más modos de juego'
              : 'View complete stats and more game modes'}
          </p>
          <a
            href={hypixelData.planckeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b] text-black font-semibold text-sm hover:bg-[#fbbf24] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Plancke.io
          </a>
        </div>
      )}
    </div>
  )
}

function HypixelStatBox({ 
  label, 
  value, 
  icon,
  color 
}: { 
  label: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="rounded-xl bg-[#07070b] border border-[rgba(255,255,255,0.04)] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color }}>{icon}</span>
        <p className="text-[10px] uppercase tracking-wider text-[#5a5a76]">{label}</p>
      </div>
      <p className="text-xl font-bold" style={{ color }}>{value}</p>
    </div>
  )
}

function Sidebar({ player }: { player: PlayerApiResponse }) {
  const { t } = useTranslation()
  return (
    <>
      <Card title={t('player.identity.title')} icon={Hash}>
        <div className="space-y-3">
          <UUIDRow label={t('player.identity.uuid')} value={player.uuid} />
          <UUIDRow label={t('player.identity.uuidRaw')} value={player.uuidRaw} />
        </div>
      </Card>

      <Card title={t('player.account.title')} icon={ShieldCheck}>
        <dl className="space-y-2.5 text-sm">
          <Row label={t('player.account.username')} value={player.name} />
          <Row label={t('player.account.model')} value={player.skin.variant} capitalize />
          <Row label={t('player.profile.cape')} value={player.cape ? t('player.profile.owned') : t('player.profile.none')} />
          <Row label={t('player.account.edition')} value="Java" />
        </dl>
      </Card>

      <Card title={t('player.quickShare.title')} icon={Share2}>
        <button
          onClick={() => {
            if (typeof window === 'undefined') return
            navigator.clipboard.writeText(window.location.href)
          }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] transition-all text-sm group"
        >
          <span className="text-[#8a8aa3] group-hover:text-[#f1f1f7]">
            {t('player.quickShare.copyUrl')}
          </span>
          <Copy className="w-4 h-4 text-[#5a5a76]" />
        </button>
      </Card>
    </>
  )
}

function UUIDRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-[#5a5a76] mb-1">{label}</div>
      <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#07070b] border border-[rgba(255,255,255,0.05)]">
        <code className="text-[#f1f1f7] font-mono text-xs truncate">{value}</code>
        <CopyButton text={value} />
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string
  value: string
  capitalize?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[#5a5a76]">{label}</dt>
      <dd className={`text-[#f1f1f7] font-medium text-right ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </dd>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  pulse,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  color: string
  pulse?: boolean
}) {
  return (
    <div className="rounded-2xl bg-[#0e0e15] border border-[rgba(255,255,255,0.06)] p-4">
      <div className="flex items-center gap-2 mb-2 text-[#5a5a76]">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-[#f1f1f7] font-semibold">
        {pulse && (
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: color }}
          />
        )}
        <span style={{ color: pulse ? color : undefined }}>{value}</span>
      </div>
    </div>
  )
}

function RenderPreview({
  label,
  src,
  fallbacks = [],
}: {
  label: string
  src: string
  fallbacks?: string[]
}) {
  return (
    <div className="rounded-xl bg-[#07070b] border border-[rgba(255,255,255,0.04)] p-3 flex flex-col items-center">
      <div className="relative w-full aspect-square mb-2 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src || '/placeholder.svg'}
          alt={label}
          className="max-w-full max-h-full object-contain pixelated"
          loading="lazy"
          data-fb-index="0"
          onError={(e) => {
            const img = e.currentTarget
            const idx = parseInt(img.dataset.fbIndex || '0', 10)
            if (idx < fallbacks.length) {
              img.dataset.fbIndex = String(idx + 1)
              img.src = fallbacks[idx]
            }
          }}
        />
      </div>
      <span className="text-[10px] uppercase tracking-wider text-[#5a5a76]">{label}</span>
    </div>
  )
}

function KV({
  label,
  value,
  mono,
  truncate,
}: {
  label: string
  value: string
  mono?: boolean
  truncate?: boolean
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-[#5a5a76] mb-1">{label}</div>
      <div
        className={`text-sm text-[#f1f1f7] ${mono ? 'font-mono' : ''} ${
          truncate ? 'truncate' : ''
        } capitalize`}
      >
        {value}
      </div>
    </div>
  )
}

function ExternalLinkCard({
  label,
  desc,
  href,
}: {
  label: string
  desc: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.04)] transition-all group"
    >
      <div className="min-w-0">
        <div className="text-sm text-[#f1f1f7] font-medium">{label}</div>
        <div className="text-xs text-[#5a5a76]">{desc}</div>
      </div>
      <ExternalLink className="w-4 h-4 text-[#5a5a76] group-hover:text-[#60a5fa] transition-colors" />
    </a>
  )
}

function EmptyHint({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="py-10 text-center">
      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#5a5a76]" />
      </div>
      <p className="text-[#f1f1f7] font-medium text-sm mb-1">{title}</p>
      <p className="text-[#8a8aa3] text-xs max-w-xs mx-auto">{desc}</p>
    </div>
  )
}
