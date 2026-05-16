'use client'

import Link from 'next/link'
import { ArrowLeft, Code2 } from 'lucide-react'

interface Props {
  title: string
  description: string
  endpoint: string
  color: string
  icon: React.ReactNode
}

export function ToolHeader({ title, description, endpoint, color, icon }: Props) {
  return (
    <div className="space-y-4 mb-6">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-[#8888aa] hover:text-[#f0f0f8] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All tools
      </Link>
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f0f8]">{title}</h1>
          <p className="text-[#9c9cb8] mt-1.5 leading-relaxed text-sm sm:text-base">{description}</p>
          <span className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[10px] font-mono text-[#22c55e]">
            <Code2 className="w-3 h-3" />
            GET {endpoint}
          </span>
        </div>
      </div>
    </div>
  )
}
