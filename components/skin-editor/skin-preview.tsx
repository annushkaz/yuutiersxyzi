'use client'

import { useEffect, useRef } from 'react'

interface SkinPreviewProps {
  skinUrl: string
  model: 'classic' | 'slim'
  showOverlay: boolean
}

export default function SkinPreview({ skinUrl, model, showOverlay }: SkinPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasElRef = useRef<HTMLCanvasElement | null>(null)
  const viewerRef = useRef<any>(null)
  const readyRef = useRef(false)
  const pendingRef = useRef<{ url: string; model: 'classic' | 'slim' } | null>(null)

  // One-time initialization of SkinViewer
  useEffect(() => {
    let disposed = false
    let ro: ResizeObserver | null = null

    ;(async () => {
      const skinview3d = await import('skinview3d')
      if (disposed) return
      const container = containerRef.current
      if (!container) return

      // Create the canvas ourselves so SkinViewer has a proper element to mount on
      const canvasEl = document.createElement('canvas')
      canvasEl.style.width = '100%'
      canvasEl.style.height = '100%'
      canvasEl.style.display = 'block'
      canvasElRef.current = canvasEl
      container.innerHTML = ''
      container.appendChild(canvasEl)

      const w = container.clientWidth || 320
      const h = container.clientHeight || 420

      const viewer = new skinview3d.SkinViewer({
        canvas: canvasEl,
        width: w,
        height: h,
        preserveDrawingBuffer: true,
      })

      viewer.fov = 50
      viewer.zoom = 0.85
      viewer.controls.enableRotate = true
      viewer.controls.enableZoom = true
      viewer.controls.enablePan = false
      viewer.autoRotate = true
      viewer.autoRotateSpeed = 0.6
      viewer.animation = new skinview3d.WalkingAnimation()
      viewer.animation.speed = 0.5

      viewerRef.current = viewer
      readyRef.current = true

      // Apply pending skin if it was set before initialization finished
      const pending = pendingRef.current
      if (pending && pending.url) {
        try {
          // loadSkin with a URL string returns a Promise<void>
          await viewer.loadSkin(pending.url, { model: pending.model })
        } catch (err) {
          console.log('[v0] SkinPreview initial loadSkin error:', err)
        }
      }

      const onResize = () => {
        if (!container || !viewerRef.current) return
        const cw = container.clientWidth
        const ch = container.clientHeight
        if (cw > 0 && ch > 0) viewerRef.current.setSize(cw, ch)
      }
      ro = new ResizeObserver(onResize)
      ro.observe(container)
      onResize()
    })()

    return () => {
      disposed = true
      readyRef.current = false
      ro?.disconnect()
      try {
        viewerRef.current?.dispose()
      } catch {}
      viewerRef.current = null
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [])

  // Load skin whenever the URL or model changes
  useEffect(() => {
    if (!skinUrl) return
    pendingRef.current = { url: skinUrl, model }

    const viewer = viewerRef.current
    if (!viewer || !readyRef.current) return

    let cancelled = false
    ;(async () => {
      try {
        // Pass the data URL string directly — skinview3d will load it asynchronously
        await viewer.loadSkin(skinUrl, { model })
        if (cancelled) return
      } catch (err) {
        console.log('[v0] SkinPreview loadSkin error:', err)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [skinUrl, model])

  // Toggle outer (second) layer visibility
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return
    const player = viewer.playerObject
    if (!player?.skin) return
    const parts = ['head', 'body', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg'] as const
    for (const p of parts) {
      const part = (player.skin as any)[p]
      if (part?.outerLayer) part.outerLayer.visible = showOverlay
    }
  }, [showOverlay])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: 320 }}
    />
  )
}
