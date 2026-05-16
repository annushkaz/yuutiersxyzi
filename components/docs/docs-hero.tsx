import { BookOpen } from 'lucide-react'

export function DocsHero() {
  return (
    <div className="relative pt-32 pb-12 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/minecraft-landscape.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/70 via-[#050508]/85 to-[#050508]" aria-hidden />
      <div className="absolute inset-0 laby-grid pointer-events-none opacity-60" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(59,130,246,0.18), transparent 60%)',
        }}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.22)] mb-5 backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span className="text-xs text-[#cbd5ff] font-medium">Documentation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.05] mb-5">
            <span className="text-gradient">The complete YuuTiers</span>
            <br />
            <span className="text-gradient-blue">handbook.</span>
          </h1>
          <p className="text-[#8a8aa3] text-lg leading-relaxed max-w-2xl text-pretty">
            Everything you need to know — every feature on the platform, every
            public API endpoint, and the philosophy behind the project.
          </p>
        </div>
      </div>
    </div>
  )
}
