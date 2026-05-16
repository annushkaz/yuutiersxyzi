import type { Metadata } from 'next'
import { VersionExplorerTool } from '@/components/tools/version-explorer-tool'

export const metadata: Metadata = {
  title: 'Version Explorer — YuuTiers Tools',
  description: 'Browse every Minecraft Java Edition version released by Mojang.',
}

export default function VersionExplorerPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f0f0f8]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
        <VersionExplorerTool />
      </div>
    </main>
  )
}
