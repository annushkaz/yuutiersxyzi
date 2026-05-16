import type { Metadata } from 'next'
import { UuidLookupTool } from '@/components/tools/uuid-lookup-tool'

export const metadata: Metadata = {
  title: 'UUID Lookup — YuuTiers Tools',
  description:
    'Convert any Minecraft username to a UUID and explore name history. Powered by the YuuTiers public API.',
}

export default function UuidLookupPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f0f0f8]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
        <UuidLookupTool />
      </div>
    </main>
  )
}
