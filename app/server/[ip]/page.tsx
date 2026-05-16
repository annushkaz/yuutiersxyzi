'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ArrowLeft, 
  Copy, 
  Check,
  Users, 
  Server, 
  Wifi,
  WifiOff,
  Clock,
  ExternalLink,
  RefreshCw,
  Loader2,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import type { ServerData } from '@/types/minecraft'

async function fetchServer(ip: string): Promise<ServerData | null> {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${ip}`)
    const data = await res.json()
    
    return {
      ip: data.ip || ip,
      port: data.port || 25565,
      online: data.online || false,
      players: {
        online: data.players?.online || 0,
        max: data.players?.max || 0,
        list: data.players?.list?.map((p: { name: string }) => p.name) || []
      },
      version: {
        name: data.version || 'Unknown',
        protocol: data.protocol || 0
      },
      motd: {
        raw: data.motd?.raw || [],
        clean: data.motd?.clean || [],
        html: data.motd?.html || []
      },
      icon: data.icon || null,
      software: data.software || null,
      plugins: data.plugins || [],
      mods: data.mods || [],
      hostname: data.hostname
    }
  } catch {
    return null
  }
}

function ServerSkeleton() {
  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] p-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 bg-[#16161f] rounded-xl animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-[#16161f] rounded animate-pulse w-1/2" />
                <div className="h-5 bg-[#16161f] rounded animate-pulse w-3/4" />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-[#16161f] rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ServerNotFound({ ip }: { ip: string }) {
  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#ef4444]/10 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-[#ef4444]" />
            </div>
            <h1 className="text-3xl font-bold text-[#f0f0f8] mb-4">Server Not Found</h1>
            <p className="text-[#8888aa] mb-8">
              We couldn&apos;t reach the server at <span className="text-[#f0f0f8] font-mono">{ip}</span>.
              The server may be offline or the IP may be incorrect.
            </p>
            <Link
              href="/server"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3b82f6] text-white font-medium hover:bg-[#2563eb] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#8888aa] hover:text-[#f0f0f8] hover:border-[rgba(255,255,255,0.14)] transition-all"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-[#22c55e]" />
          <span className="text-[#22c55e]">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy IP</span>
        </>
      )}
    </button>
  )
}

export default function ServerPage() {
  const params = useParams()
  const ip = params.ip as string

  const { data: server, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['server', ip],
    queryFn: () => fetchServer(decodeURIComponent(ip)),
    refetchInterval: 60 * 1000, // 1 minute
    retry: false,
  })

  if (isLoading) {
    return <ServerSkeleton />
  }

  if (!server || !server.online) {
    return <ServerNotFound ip={decodeURIComponent(ip)} />
  }

  const playerPercentage = Math.min((server.players.online / server.players.max) * 100, 100)

  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/server"
              className="inline-flex items-center gap-2 text-[#8888aa] hover:text-[#f0f0f8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Link>
          </motion.div>

          {/* Server Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-[#0f0f16] border border-[rgba(255,255,255,0.08)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-[rgba(255,255,255,0.08)]">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Server Icon */}
                <div className="relative shrink-0">
                  {server.icon ? (
                    <Image
                      src={server.icon}
                      alt={ip}
                      width={80}
                      height={80}
                      className="rounded-xl"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-[#16161f] flex items-center justify-center">
                      <Server className="w-10 h-10 text-[#4a4a6a]" />
                    </div>
                  )}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-[#0f0f16] flex items-center justify-center ${
                    server.online ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
                  }`}>
                    {server.online ? (
                      <Wifi className="w-3 h-3 text-white" />
                    ) : (
                      <WifiOff className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>

                {/* Server Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8]">
                      {server.hostname || decodeURIComponent(ip)}
                    </h1>
                    {server.online && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(34,197,94,0.1)] text-[#22c55e] text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                        ONLINE
                      </span>
                    )}
                  </div>
                  
                  {/* MOTD */}
                  <div className="text-[#8888aa] mb-4">
                    {server.motd.clean.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <CopyButton text={decodeURIComponent(ip)} />
                    <button
                      onClick={() => refetch()}
                      disabled={isFetching}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#8888aa] hover:text-[#f0f0f8] hover:border-[rgba(255,255,255,0.14)] transition-all disabled:opacity-50"
                    >
                      {isFetching ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-xl bg-[#16161f] p-4">
                  <div className="flex items-center gap-2 text-[#4a4a6a] mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Players</span>
                  </div>
                  <p className="text-2xl font-bold text-[#f0f0f8]">
                    {server.players.online.toLocaleString()}
                    <span className="text-[#4a4a6a] text-lg font-normal">
                      /{server.players.max.toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="rounded-xl bg-[#16161f] p-4">
                  <div className="flex items-center gap-2 text-[#4a4a6a] mb-2">
                    <Server className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Version</span>
                  </div>
                  <p className="text-[#f0f0f8] font-medium">{server.version.name}</p>
                </div>
                <div className="rounded-xl bg-[#16161f] p-4">
                  <div className="flex items-center gap-2 text-[#4a4a6a] mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide">Port</span>
                  </div>
                  <p className="text-[#f0f0f8] font-mono">{server.port}</p>
                </div>
              </div>

              {/* Player Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#8888aa] text-sm">Server Capacity</span>
                  <span className="text-[#f0f0f8] text-sm font-medium">{playerPercentage.toFixed(1)}%</span>
                </div>
                <div className="h-3 rounded-full bg-[#16161f] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${playerPercentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      playerPercentage > 90 ? 'bg-gradient-to-r from-[#ef4444] to-[#f97316]' :
                      playerPercentage > 70 ? 'bg-gradient-to-r from-[#f59e0b] to-[#eab308]' :
                      'bg-gradient-to-r from-[#22c55e] to-[#10b981]'
                    }`}
                  />
                </div>
              </div>

              {/* Online Players */}
              {server.players.list && server.players.list.length > 0 && (
                <div>
                  <h3 className="text-[#f0f0f8] font-semibold mb-4">Online Players ({server.players.list.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {server.players.list.slice(0, 50).map((player, i) => (
                      <Link
                        key={i}
                        href={`/player/${player}`}
                        className="px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#8888aa] hover:text-[#f0f0f8] hover:border-[#3b82f6] text-sm transition-all"
                      >
                        {player}
                      </Link>
                    ))}
                    {server.players.list.length > 50 && (
                      <span className="px-3 py-1.5 text-[#4a4a6a] text-sm">
                        +{server.players.list.length - 50} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
