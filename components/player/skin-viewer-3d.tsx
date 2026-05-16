'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as skinview3d from 'skinview3d'

interface SkinViewerProps {
  skinUrl: string
  capeUrl?: string
  className?: string
  width?: number
  height?: number
  walk?: boolean
  variant?: 'classic' | 'slim'
}

function getIdentifier(url: string): string {
  // Strip query string
  const noQuery = url.split('?')[0]
  // Get last path segment
  const segments = noQuery.split('/').filter(Boolean)
  return segments[segments.length - 1] || ''
}

export function SkinViewer3D({
  skinUrl,
  capeUrl,
  className = '',
  width = 300,
  height = 400,
  walk = true,
  variant,
}: SkinViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<skinview3d.SkinViewer | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const loadSkin = useCallback(
    async (viewer: skinview3d.SkinViewer, url: string, attempt: number) => {
      const model =
        variant === 'classic' ? 'default' : variant === 'slim' ? 'slim' : 'auto-detect'

      const identifier = getIdentifier(url)
      const cacheBuster = `t=${Date.now()}_${attempt}`

      // Try multiple skin sources in order. mc-heads.net is most reliable
      // and supports both UUIDs and usernames (with Steve fallback).
      const sources: string[] = [
        // Try original first (could be the Mojang texture URL)
        url.startsWith('http') ? url : `https://mc-heads.net/skin/${identifier}`,
        `https://mc-heads.net/skin/${identifier}`,
        `https://minotar.net/skin/${identifier}`,
        // Final fallback - default Steve
        `https://mc-heads.net/skin/MHF_Steve`,
      ]

      for (const src of sources) {
        try {
          const finalUrl = src.includes('?') ? `${src}&${cacheBuster}` : `${src}?${cacheBuster}`
          await viewer.loadSkin(finalUrl, { model })
          return true
        } catch {
          continue
        }
      }
      return false
    },
    [variant],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    setLoaded(false)
    setError(false)

    let disposed = false

    const viewer = new skinview3d.SkinViewer({
      canvas,
      width,
      height,
    })

    viewer.fov = 50
    viewer.zoom = 0.85
    viewer.autoRotate = true
    viewer.autoRotateSpeed = 0.6
    viewer.background = 0x0f0f16

    viewer.animation = walk
      ? new skinview3d.WalkingAnimation()
      : new skinview3d.IdleAnimation()
    if (viewer.animation) {
      viewer.animation.speed = walk ? 0.7 : 0.4
    }

    viewer.controls.enableRotate = true
    viewer.controls.enableZoom = false
    viewer.controls.enablePan = false

    viewerRef.current = viewer

    ;(async () => {
      const success = await loadSkin(viewer, skinUrl, retryCount)

      if (!disposed) {
        if (success) {
          setLoaded(true)
        } else {
          setError(true)
        }
      }

      if (capeUrl) {
        try {
          await viewer.loadCape(capeUrl)
        } catch {
          // Cape is optional
        }
      }
    })()

    return () => {
      disposed = true
      viewer.dispose()
      viewerRef.current = null
    }
  }, [skinUrl, capeUrl, width, height, walk, variant, retryCount, loadSkin])

  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        width,
        height,
        background:
          'radial-gradient(circle at 50% 30%, rgba(59,130,246,0.18) 0%, rgba(15,15,22,0.95) 55%, #0a0a0f 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-[#3b82f6]/30 border-t-[#3b82f6] animate-spin" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <p className="text-[#8888aa] text-sm">Could not load skin</p>
          <button
            onClick={() => setRetryCount((c) => c + 1)}
            className="px-3 py-1.5 text-xs rounded-lg bg-[#3b82f6]/20 text-[#60a5fa] hover:bg-[#3b82f6]/30 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
