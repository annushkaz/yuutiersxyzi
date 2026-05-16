import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import StatusPageContent from '@/components/status/status-page-content'
import { Activity, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Service Status | YuuTiers.xyz',
  description:
    'Real-time monitoring dashboard for all APIs and services powering YuuTiers.xyz — Mojang, Hypixel, skin renderers and more.',
}

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 laby-grid opacity-30" />
          <div className="aurora opacity-40" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.15)]">
                <Activity className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span className="text-xs font-medium text-[#3b82f6]">Live Status Monitor</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient text-balance">
                Service Status
              </h1>
              <p className="text-[#8888aa] text-base sm:text-lg max-w-2xl text-pretty leading-relaxed">
                Real-time health monitoring of every API and service that powers YuuTiers.xyz.
                Live latency tracking, heatmaps, and auto-detected incident reports.
              </p>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-[#6a6a86]">
                  <Shield className="w-3.5 h-3.5 text-[#22c55e]" />
                  15 services monitored
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#6a6a86]">
                  <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
                  Auto-refresh every 60s
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatusPageContent />
        </section>
      </main>
      <Footer />
    </div>
  )
}
