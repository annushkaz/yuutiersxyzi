'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export function CopyButton({ text, label, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#8888aa] hover:text-[#f0f0f8] hover:border-[rgba(255,255,255,0.14)] transition-all ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-[#22c55e]" />
          <span className="text-[#22c55e]">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  )
}
