import type { Metadata } from 'next'
import { ToolsIndex } from '@/components/tools/tools-index'

export const metadata: Metadata = {
  title: 'Tools — YuuTiers',
  description:
    'Free Minecraft tools powered by the YuuTiers public API. UUID lookup, server pinger, Hypixel stats, cape browser and more.',
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f0f0f8]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16">
        <ToolsIndex />
      </div>
    </main>
  )
}
